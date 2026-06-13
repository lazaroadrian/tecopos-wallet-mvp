// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { FlatList, StyleSheet, View } from 'react-native';

import { type Account } from '@/domain/entities/Account';
import { type Operation } from '@/domain/entities/Operation';
import { spacing } from '@/ui/theme/tokens';

import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import { AccountCard } from '../../molecules/AccountCard';
import { EmptyState } from '../../molecules/EmptyState';
import { SkeletonList } from '../../molecules/SkeletonList';

export interface AccountListProps {
  accounts: Account[];
  /** Map of accountId → cached operations. Used to derive balance per card (A2). */
  operationsByAccountId: Record<string, Operation[]>;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onPressAccount: (accountId: string) => void;
}

/**
 * Organism: AccountList.
 * Full-featured FlatList wrapper with:
 *  - Skeleton loading state (NFR3)
 *  - Empty state when no accounts exist
 *  - Error state with retry action (NFR)
 *  - AccountCard per item with derived balance
 */
export function AccountList({
  accounts,
  operationsByAccountId,
  isLoading,
  isError,
  onRetry,
  onPressAccount,
}: AccountListProps) {
  if (isLoading) {
    return <SkeletonList count={4} />;
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text variant="error" style={styles.errorText}>
          Failed to load accounts. Check your connection and try again.
        </Text>
        <Button title="Retry" onPress={onRetry} variant="ghost" style={styles.retryBtn} />
      </View>
    );
  }

  if (accounts.length === 0) {
    return (
      <EmptyState
        title="No accounts yet"
        subtitle="Your accounts will appear here once they are set up."
      />
    );
  }

  return (
    <FlatList
      data={accounts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AccountCard
          account={item}
          operations={operationsByAccountId[item.id] ?? []}
          onPress={() => onPressAccount(item.id)}
        />
      )}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  separator: {
    height: spacing.sm,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  errorText: {
    textAlign: 'center',
  },
  retryBtn: {
    minWidth: 120,
  },
});
