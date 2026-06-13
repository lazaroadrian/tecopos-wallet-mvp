// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { useAccounts } from '@/application/hooks/useAccounts';
import { useAccountsWithBalances } from '@/application/hooks/useAccountsWithBalances';
import { Text } from '@/ui/atoms/Text';
import { AccountList } from '@/ui/organisms/AccountList';
import { colors, spacing, typography } from '@/ui/theme/tokens';

/**
 * AccountsScreen — M2: Accounts list with derived balance per account.
 *
 * Architecture:
 *  - useAccounts() fetches the accounts list (TanStack Query, cached 5m).
 *  - useAccountsWithBalances() fires parallel useQueries for each account's
 *    operations, all cached under operationKeys.byAccount(id) (30m gcTime).
 *  - Balances are derived client-side via computeBalance (A2) inside AccountCard.
 *  - All state (loading, error, empty) is delegated to AccountList organism (NFR3).
 *  - Tap an account → navigate to app/(app)/accounts/[id] (WU-6 ops screen).
 */
export default function AccountsScreen() {
  const router = useRouter();
  const { data: accounts = [], isLoading, isError, refetch } = useAccounts();
  const { operationsByAccountId, isLoadingOperations } = useAccountsWithBalances(accounts);

  const showSkeleton = isLoading || (accounts.length > 0 && isLoadingOperations);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text variant="heading" style={styles.title}>
          Accounts
        </Text>
      </View>

      <AccountList
        accounts={accounts}
        operationsByAccountId={operationsByAccountId}
        isLoading={showSkeleton}
        isError={isError}
        onRetry={refetch}
        onPressAccount={(id) => router.push(`/(app)/accounts/${id}`)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
  },
});
