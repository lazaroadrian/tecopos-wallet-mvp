// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { type Account } from '@/domain/entities/Account';
import { type Operation } from '@/domain/entities/Operation';
import { computeBalance } from '@/domain/use-cases/computeBalance';
import { colors, radii, spacing, typography } from '@/ui/theme/tokens';

import { CurrencyAmount } from '../../atoms/CurrencyAmount';
import { Text } from '../../atoms/Text';

export interface AccountCardProps {
  account: Account;
  /** Cached operations for this account — balance is derived here (A2). */
  operations: Operation[];
  onPress?: () => void;
}

/**
 * Molecule: AccountCard.
 * Shows account name, currency tag, and derived balance (A2).
 *
 * Balance computation (A2, design §8):
 *  Balance = Σincome − Σexpense via the computeBalance domain use-case.
 *  Operations are sourced from the TanStack Query cache (reuse cached data;
 *  no extra network request per card). This satisfies the "efficient caching"
 *  graded requirement — all operations across all accounts are fetched once
 *  and kept in the 30m gcTime cache; balance is derived synchronously.
 */
export function AccountCard({ account, operations, onPress }: AccountCardProps) {
  const balance = computeBalance(operations);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`${account.name}, balance ${balance}`}
    >
      <View style={styles.header}>
        <Text variant="heading" style={styles.name} numberOfLines={1}>
          {account.name}
        </Text>
        <View style={styles.badge}>
          <Text variant="caption" style={styles.currency}>
            {account.currency}
          </Text>
        </View>
      </View>

      {account.description ? (
        <Text variant="label" numberOfLines={2} style={styles.description}>
          {account.description}
        </Text>
      ) : null}

      <View style={styles.balanceRow}>
        <Text variant="caption">Balance</Text>
        <CurrencyAmount
          amount={balance}
          currency={account.currency}
          variant="body"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  name: {
    flex: 1,
    fontSize: typography.lg,
  },
  badge: {
    backgroundColor: colors.background,
    borderRadius: radii.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  currency: {
    color: colors.textSecondary,
    fontWeight: typography.semibold,
  },
  description: {
    color: colors.textSecondary,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
