// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { Text as RNText, StyleSheet, type TextStyle, type TextProps } from 'react-native';

import { colors, typography } from '@/ui/theme/tokens';

export interface AppTextProps extends TextProps {
  variant?: 'body' | 'label' | 'caption' | 'heading' | 'error';
}

/**
 * Atom: Text.
 * Wraps RN Text with design-system variants.
 */
export function Text({ variant = 'body', style, ...props }: AppTextProps) {
  const variantStyle: TextStyle = styles[variant];
  return (
    <RNText style={[styles.base, variantStyle, style as TextStyle]} {...props} />
  );
}

const styles = StyleSheet.create<Record<string, TextStyle>>({
  base: {
    color: colors.textPrimary,
    fontSize: typography.md,
    fontWeight: typography.regular,
  },
  body: {
    fontSize: typography.md,
  },
  label: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.textSecondary,
  },
  caption: {
    fontSize: typography.xs,
    color: colors.textMuted,
  },
  heading: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
  },
  error: {
    fontSize: typography.sm,
    color: colors.error,
  },
});
