// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { z } from 'zod';

import { useAuthStore } from '@/application/store/auth.store';
import { Button } from '@/ui/atoms/Button';
import { Text } from '@/ui/atoms/Text';
import { FormField } from '@/ui/molecules/FormField';
import { AuthTemplate } from '@/ui/templates/AuthTemplate';
import { colors, spacing, typography } from '@/ui/theme/tokens';

/** Login form validation schema (M1 — required fields only). */
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * Login screen (M1, A5, C1).
 * Fake auth against ALLOWED_USERS allow-list.
 * On success: session persisted + navigated to /(app)/accounts.
 * On failure: inline error shown, user stays on this screen.
 */
export default function LoginScreen() {
  const login = useAuthStore((s) => s.login);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = async (values: LoginFormValues) => {
    setAuthError(null);
    const error = await login(values);
    if (error) {
      setAuthError(error);
    }
    // On success the auth layout / root index redirect automatically via session state.
  };

  return (
    <AuthTemplate>
      <Text variant="heading" style={styles.title}>
        Wallet MVP
      </Text>
      <Text variant="label" style={styles.subtitle}>
        Sign in to continue
      </Text>

      <View style={styles.form}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Username"
              placeholder="Enter your username"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.username?.message}
              returnKeyType="next"
              testID="input-username"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Password"
              placeholder="Enter your password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry
              error={errors.password?.message}
              returnKeyType="done"
              onSubmitEditing={handleSubmit(onSubmit)}
              testID="input-password"
            />
          )}
        />

        {authError ? (
          <Text variant="error" style={styles.authError}>
            {authError}
          </Text>
        ) : null}

        <Button
          title="Sign In"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={!isValid}
          testID="btn-login"
        />
      </View>
    </AuthTemplate>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: spacing.xs,
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  form: {
    gap: spacing.md,
  },
  authError: {
    textAlign: 'center',
    backgroundColor: colors.errorBackground,
    padding: spacing.sm,
    borderRadius: 6,
  },
});
