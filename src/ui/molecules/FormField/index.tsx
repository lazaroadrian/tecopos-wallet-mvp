// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { View, StyleSheet } from 'react-native';

import { Input, type InputProps } from '@/ui/atoms/Input';
import { Text } from '@/ui/atoms/Text';
import { spacing } from '@/ui/theme/tokens';

export interface FormFieldProps extends InputProps {
  label: string;
  error?: string;
}

/**
 * Molecule: FormField.
 * Composes label + Input + inline error message.
 * Binds naturally to react-hook-form Controller renders.
 * Reused by LoginScreen and CreateOperationForm.
 */
export function FormField({ label, error, ...inputProps }: FormFieldProps) {
  return (
    <View style={styles.container}>
      <Text variant="label" style={styles.label}>
        {label}
      </Text>
      <Input hasError={!!error} {...inputProps} />
      {error ? (
        <Text variant="error" style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  label: {
    marginBottom: 2,
  },
  errorText: {
    marginTop: 2,
  },
});
