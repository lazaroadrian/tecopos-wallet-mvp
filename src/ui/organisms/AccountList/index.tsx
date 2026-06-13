// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { MotiView } from 'moti';
import { FlatList, StyleSheet, View } from 'react-native';

import { type Account } from '@/domain/entities/Account';
import { type Operation } from '@/domain/entities/Operation';
import { spacing } from '@/ui/theme/tokens';
import { useResponsive } from '@/ui/theme/useResponsive';

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
 *  - Error state with retry action (NFR3)
 *  - AccountCard per item with derived balance
 *  - Responsive: 2-column grid on tablet, single column on phone (NFR1, design §9)
 *  - Moti animated item entrance on mount (tasteful fade+slide per spec)
 */
export function AccountList({
  accounts,
  operationsByAccountId,
  isLoading,
  isError,
  onRetry,
  onPressAccount,
}: AccountListProps) {
  const { isTablet } = useResponsive();

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
      numColumns={isTablet ? 2 : 1}
      key={isTablet ? 'tablet' : 'phone'}
      renderItem={({ item, index }) => (
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 280, delay: index * 60 }}
          style={isTablet ? styles.tabletItem : styles.phoneItem}
        >
          <AccountCard
            account={item}
            operations={operationsByAccountId[item.id] ?? []}
            onPress={() => onPressAccount(item.id)}
          />
        </MotiView>
      )}
      contentContainerStyle={styles.list}
      columnWrapperStyle={isTablet ? styles.columnWrapper : undefined}
      ItemSeparatorComponent={isTablet ? undefined : () => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    gap: 0,
  },
  separator: {
    height: spacing.sm,
  },
  columnWrapper: {
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  phoneItem: {
    flex: 1,
  },
  tabletItem: {
    flex: 1,
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
