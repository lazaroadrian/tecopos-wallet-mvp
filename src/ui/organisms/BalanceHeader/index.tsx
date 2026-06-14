// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { StyleSheet, View } from 'react-native';

import { type Account } from '@/domain/entities/Account';
import { type Operation } from '@/domain/entities/Operation';
import { computeBalance } from '@/domain/use-cases/computeBalance';
import { colors, radii, shadows, spacing, typography } from '@/ui/theme/tokens';

import { CurrencyAmount } from '../../atoms/CurrencyAmount';
import { Text } from '../../atoms/Text';

export interface BalanceHeaderProps {
  account: Account;
  /** Operations for this account — balance is derived here (A2). */
  operations: Operation[];
}

/**
 * Organism: BalanceHeader.
 * Displays the account name, currency badge, and derived balance (A2).
 *
 * Balance = Σincome − Σexpense via computeBalance domain use-case.
 * Never stored — always computed from the cached operations list.
 * Used as the top header of OperationsScreen (M3).
 */
export function BalanceHeader({ account, operations }: BalanceHeaderProps) {
  const balance = computeBalance(operations);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text variant="heading" style={styles.name} numberOfLines={1}>
          {account.name}
        </Text>
        <View style={styles.currencyBadge}>
          <Text variant="caption" style={styles.currencyText}>
            {account.currency}
          </Text>
        </View>
      </View>

      <View style={styles.balanceRow}>
        <Text variant="label" style={styles.balanceLabel}>
          Saldo actual
        </Text>
        <CurrencyAmount
          amount={balance}
          currency={account.currency}
          variant="heading"
          style={styles.balanceAmount}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    gap: spacing.xs,
    ...shadows.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  name: {
    flex: 1,
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.textOnPrimary,
  },
  currencyBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: radii.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  currencyText: {
    color: colors.textOnPrimary,
    fontWeight: typography.bold,
    fontSize: typography.xs,
    letterSpacing: 0.5,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  balanceLabel: {
    fontSize: typography.sm,
    color: 'rgba(255,255,255,0.75)',
  },
  balanceAmount: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.textOnPrimary,
  },
});
