// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useAccount } from '@/application/hooks/useAccounts';
import { useOperations } from '@/application/hooks/useOperations';
import { Text } from '@/ui/atoms/Text';
import { BalanceHeader } from '@/ui/organisms/BalanceHeader';
import { OperationList } from '@/ui/organisms/OperationList';
import { colors, spacing } from '@/ui/theme/tokens';

/**
 * OperationsScreen — M3: Operations list for a specific account.
 *
 * Architecture:
 *  - useAccount(id) fetches account metadata (name, currency) from cache.
 *  - useOperations(id) fetches the operations list (TanStack Query, cached).
 *  - Operations are sorted most-recent-first by date descending before rendering (M3).
 *  - Balance is derived in BalanceHeader via computeBalance domain use-case (A2).
 *  - useFocusEffect triggers a refetch on screen re-focus (freshness on return from create).
 *  - FAB (+ button) navigates to CreateOperationScreen (M4).
 */
export default function OperationsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const accountId = id ?? '';

  const {
    data: account,
    isLoading: isLoadingAccount,
  } = useAccount(accountId);

  const {
    data: rawOperations,
    isLoading: isLoadingOps,
    isError,
    refetch,
  } = useOperations(accountId);

  // Refetch operations when the screen regains focus (e.g. returning from create).
  useFocusEffect(
    useCallback(() => {
      void refetch();
    }, [refetch])
  );

  // Sort operations most-recent-first (M3 requirement).
  const operations = rawOperations
    ? [...rawOperations].sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      )
    : [];

  const isLoading = isLoadingAccount || isLoadingOps;
  const currency = account?.currency ?? '';

  const handleCreateOperation = () => {
    router.push(`/(app)/accounts/${accountId}/create`);
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Balance header — shows account name, currency, and derived balance (A2) */}
      {account ? (
        <BalanceHeader account={account} operations={operations} />
      ) : isLoadingAccount ? (
        <View style={styles.headerPlaceholder} />
      ) : null}

      {/* Operations list — skeleton on load, empty state, error + retry (NFR3, M3) */}
      <OperationList
        operations={operations}
        currency={currency}
        isLoading={isLoading}
        isError={isError && !isLoadingOps}
        onRetry={refetch}
        onCreateOperation={handleCreateOperation}
      />

      {/* FAB — navigate to create operation screen (M4) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleCreateOperation}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Add new operation"
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerPlaceholder: {
    height: 90,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 28,
    color: colors.textOnPrimary,
    lineHeight: 32,
    textAlign: 'center',
  },
});
