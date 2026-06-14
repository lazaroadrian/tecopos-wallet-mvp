// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  type TouchableOpacityProps,
} from 'react-native';

import { Text } from '@/ui/atoms/Text';
import { colors, spacing, radii, typography } from '@/ui/theme/tokens';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'ghost';
}

/**
 * Atom: Button.
 * Primary action button with loading state and disabled styling.
 * Reusable across Login and forms.
 */
export function Button({
  title,
  loading = false,
  disabled,
  variant = 'primary',
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === 'primary' ? styles.primary : styles.ghost,
        isDisabled && styles.disabled,
        style,
      ]}
      disabled={isDisabled}
      activeOpacity={0.75}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.textOnPrimary : colors.primary}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.label,
            variant === 'primary' ? styles.labelPrimary : styles.labelGhost,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 50,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  primary: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.45,
    shadowOpacity: 0,
    elevation: 0,
  },
  label: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    letterSpacing: 0.2,
  },
  labelPrimary: {
    color: colors.textOnPrimary,
  },
  labelGhost: {
    color: colors.primary,
  },
});
