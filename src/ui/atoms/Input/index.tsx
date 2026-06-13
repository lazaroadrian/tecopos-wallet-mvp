// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import {
  TextInput,
  StyleSheet,
  type TextInputProps,
  View,
} from 'react-native';

import { colors, spacing, radii, typography } from '@/ui/theme/tokens';

export interface InputProps extends TextInputProps {
  hasError?: boolean;
}

/**
 * Atom: Input.
 * Styled text input with optional error state border.
 * Reusable across Login and CreateOperation forms.
 */
export function Input({ hasError = false, style, ...props }: InputProps) {
  return (
    <View>
      <TextInput
        style={[styles.input, hasError && styles.inputError, style]}
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.md,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
  inputError: {
    borderColor: colors.error,
    backgroundColor: colors.errorBackground,
  },
});
