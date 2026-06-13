// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { StyleSheet, View } from 'react-native';

import { type Operation } from '@/domain/entities/Operation';
import { colors, radii, spacing, typography } from '@/ui/theme/tokens';

import { CurrencyAmount } from '../../atoms/CurrencyAmount';
import { Text } from '../../atoms/Text';

export interface OperationRowProps {
  operation: Operation;
  /** Account currency — operations inherit the parent account's currency (A7/C2). */
  currency: string;
}

/**
 * Molecule: OperationRow.
 * Displays a single operation with:
 *  - Type badge (income = green, expense = red) for visual distinction (C4).
 *  - Amount via CurrencyAmount in the account's currency (A7/C2).
 *  - Date (formatted as locale date string).
 *  - Description.
 *
 * Income/expense visual distinction satisfies M3 "income and expense visually distinguished".
 */
export function OperationRow({ operation, currency }: OperationRowProps) {
  const isIncome = operation.type === 'income';
  const displayAmount = isIncome ? operation.amount : -operation.amount;
  const formattedDate = operation.date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.row}>
      {/* Type badge — income/expense visual distinction (C4) */}
      <View style={[styles.badge, isIncome ? styles.badgeIncome : styles.badgeExpense]}>
        <Text style={[styles.badgeText, isIncome ? styles.badgeTextIncome : styles.badgeTextExpense]}>
          {isIncome ? 'INC' : 'EXP'}
        </Text>
      </View>

      {/* Description + date */}
      <View style={styles.details}>
        <Text variant="body" numberOfLines={1} style={styles.description}>
          {operation.description}
        </Text>
        <Text variant="caption" style={styles.date}>
          {formattedDate}
        </Text>
      </View>

      {/* Amount — signed and color-coded by type (C2) */}
      <CurrencyAmount
        amount={displayAmount}
        currency={currency}
        showSign
        variant="body"
        style={styles.amount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  badgeIncome: {
    backgroundColor: '#dcfce7', // light green
  },
  badgeExpense: {
    backgroundColor: '#fee2e2', // light red
  },
  badgeText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    letterSpacing: 0.5,
  },
  badgeTextIncome: {
    color: colors.income,
  },
  badgeTextExpense: {
    color: colors.expense,
  },
  details: {
    flex: 1,
    gap: 2,
  },
  description: {
    fontWeight: typography.medium,
  },
  date: {
    marginTop: 2,
  },
  amount: {
    flexShrink: 0,
    textAlign: 'right',
  },
});
