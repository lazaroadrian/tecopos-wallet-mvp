// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { StyleSheet, View } from 'react-native';

import { type CurrencySummary } from '@/domain/use-cases/summarizeByCurrency';
import { colors, radii, shadows, spacing, typography } from '@/ui/theme/tokens';

import { CurrencyAmount } from '../../atoms/CurrencyAmount';
import { Text } from '../../atoms/Text';

export interface SummaryByCurrencyProps {
  summary: CurrencySummary;
}

/**
 * Molecule: SummaryByCurrency.
 * Displays a single currency group card with total income, total expense, and net (C2, C3).
 *
 * No cross-currency total is shown; each card is self-contained (ADR, C2).
 * Net is color-coded: positive = income green, negative = expense red, zero = neutral.
 */
export function SummaryByCurrency({ summary }: SummaryByCurrencyProps) {
  const { currency, totalIncome, totalExpense, net } = summary;

  return (
    <View
      style={styles.card}
      accessibilityLabel={`Resumen ${currency}: ingresos ${totalIncome}, egresos ${totalExpense}, neto ${net}`}
    >
      {/* Currency header */}
      <View style={styles.header}>
        <View style={styles.currencyBadge}>
          <Text variant="caption" style={styles.currencyText}>
            {currency}
          </Text>
        </View>
      </View>

      {/* Per-currency disclaimer — explains why there's no grand total */}
      <Text variant="caption" style={styles.noConversionNote}>
        Cada moneda se totaliza por separado (no se convierten ni se suman entre sí).
      </Text>

      {/* Income / Expense / Net rows */}
      <View style={styles.rows}>
        <View style={styles.row}>
          <Text variant="label" style={styles.rowLabel}>
            Ingresos
          </Text>
          <CurrencyAmount
            amount={totalIncome}
            currency={currency}
            showSign
            variant="body"
          />
        </View>

        <View style={styles.row}>
          <Text variant="label" style={styles.rowLabel}>
            Egresos
          </Text>
          {/* Show expense as negative for color-coding */}
          <CurrencyAmount
            amount={-totalExpense}
            currency={currency}
            variant="body"
          />
        </View>

        <View style={[styles.row, styles.netRow]}>
          <Text variant="body" style={styles.netLabel}>
            Neto
          </Text>
          <CurrencyAmount
            amount={net}
            currency={currency}
            showSign
            variant="body"
            style={styles.netAmount}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyBadge: {
    backgroundColor: colors.primaryLight,
    borderRadius: radii.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  currencyText: {
    color: colors.primary,
    fontWeight: typography.bold,
    fontSize: typography.sm,
    letterSpacing: 0.5,
  },
  noConversionNote: {
    color: colors.textMuted,
    fontSize: typography.xs,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  rows: {
    gap: spacing.xs,
    backgroundColor: colors.borderSubtle,
    borderRadius: radii.md,
    padding: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  rowLabel: {
    color: colors.textSecondary,
    fontSize: typography.sm,
  },
  netRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xs,
    marginTop: spacing.xs,
  },
  netLabel: {
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    fontSize: typography.md,
  },
  netAmount: {
    fontWeight: typography.bold,
  },
});
