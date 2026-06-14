// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { MotiView } from 'moti';
import { StyleSheet, View } from 'react-native';

import { type Operation } from '@/domain/entities/Operation';
import { colors, radii, shadows, spacing, typography } from '@/ui/theme/tokens';

import { CurrencyAmount } from '../../atoms/CurrencyAmount';
import { Text } from '../../atoms/Text';

export interface OperationRowProps {
  operation: Operation;
  /** Account currency — operations inherit the parent account's currency (A7/C2). */
  currency: string;
  /** Index in the list for staggered entrance animation. */
  index?: number;
}

/**
 * Molecule: OperationRow.
 * Displays a single operation with:
 *  - Type badge (income = green, expense = red) for visual distinction (C4).
 *  - Amount via CurrencyAmount in the account's currency (A7/C2).
 *  - Date (formatted as locale date string).
 *  - Description.
 *  - Moti entrance animation (fade + slide up, staggered by index) (NFR1/WU-9).
 *
 * Income/expense visual distinction satisfies M3 "income and expense visually distinguished".
 */
export function OperationRow({ operation, currency, index = 0 }: OperationRowProps) {
  const isIncome = operation.type === 'income';
  const displayAmount = isIncome ? operation.amount : -operation.amount;
  const formattedDate = operation.date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 250, delay: Math.min(index * 40, 400) }}
    >
      <View
        style={styles.row}
        accessibilityLabel={`${isIncome ? 'Ingreso' : 'Egreso'}: ${operation.description}, ${currency} ${operation.amount}, ${formattedDate}`}
      >
        {/* Type badge — income/expense visual distinction (C4) */}
        <View style={[styles.badge, isIncome ? styles.badgeIncome : styles.badgeExpense]}>
          <Text style={[styles.badgeText, isIncome ? styles.badgeTextIncome : styles.badgeTextExpense]}>
            {isIncome ? 'ING' : 'EGR'}
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
    </MotiView>
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
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badge: {
    width: 42,
    height: 42,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  badgeIncome: {
    backgroundColor: colors.incomeBackground,
  },
  badgeExpense: {
    backgroundColor: colors.expenseBackground,
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
    fontSize: typography.md,
    color: colors.textPrimary,
  },
  date: {
    marginTop: 2,
    fontSize: typography.xs,
    color: colors.textMuted,
  },
  amount: {
    flexShrink: 0,
    textAlign: 'right',
  },
});
