// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { StyleSheet, View } from 'react-native';

import { type Account } from '@/domain/entities/Account';
import { type Operation } from '@/domain/entities/Operation';
import { computeBalance } from '@/domain/use-cases/computeBalance';
import { colors, radii, spacing, typography } from '@/ui/theme/tokens';

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
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  name: {
    flex: 1,
    fontSize: typography.xl,
  },
  currencyBadge: {
    backgroundColor: colors.background,
    borderRadius: radii.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  currencyText: {
    color: colors.textSecondary,
    fontWeight: typography.semibold,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  balanceLabel: {
    fontSize: typography.sm,
  },
  balanceAmount: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
  },
});
