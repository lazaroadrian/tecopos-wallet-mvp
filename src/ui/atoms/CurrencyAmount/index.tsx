// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { StyleSheet, type TextStyle } from 'react-native';

import { getCurrencySymbol } from '@/constants/currencies';
import { colors, typography } from '@/ui/theme/tokens';

import { Text } from '../Text';

export interface CurrencyAmountProps {
  amount: number;
  currency: string;
  /** When true, prepend + for positive amounts and show in income color. */
  showSign?: boolean;
  style?: TextStyle;
  variant?: 'body' | 'label' | 'caption' | 'heading';
}

/**
 * Atom: CurrencyAmount.
 * Formats a numeric amount with its ISO currency symbol (C2).
 * Color coding: positive (or income) = green, negative (or expense) = red, zero = default.
 * No cross-currency conversion — display only (ADR-1).
 */
export function CurrencyAmount({
  amount,
  currency,
  showSign = false,
  style,
  variant = 'body',
}: CurrencyAmountProps) {
  const symbol = getCurrencySymbol(currency);
  const absAmount = Math.abs(amount);
  const formatted = `${symbol}${absAmount.toFixed(2)}`;
  let display: string;
  if (amount < 0) {
    display = `-${formatted}`;
  } else if (showSign && amount > 0) {
    display = `+${formatted}`;
  } else {
    display = formatted;
  }

  const amountColor: TextStyle =
    amount > 0
      ? styles.positive
      : amount < 0
        ? styles.negative
        : styles.neutral;

  return (
    <Text variant={variant} style={[amountColor, style]}>
      {display}
    </Text>
  );
}

const styles = StyleSheet.create<Record<string, TextStyle>>({
  positive: {
    color: colors.income,
    fontWeight: typography.semibold,
  },
  negative: {
    color: colors.expense,
    fontWeight: typography.semibold,
  },
  neutral: {
    color: colors.textPrimary,
  },
});
