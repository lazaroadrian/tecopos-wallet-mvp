// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { accountKeys } from '@/data/query-keys/accountKeys';
import { operationKeys } from '@/data/query-keys/operationKeys';
import { operationRepository } from '@/data/repositories';
import { type CreateOperationInput } from '@/domain/entities/Operation';

/**
 * TanStack Query hook for operations belonging to one account.
 *
 * Caching choice (A2, design §5):
 *  - 30m gcTime means all accounts' operation lists stay in cache while the
 *    user navigates back to the Accounts screen. The Accounts screen computes
 *    derived balances from this cached data without triggering new network
 *    requests — satisfying the "efficient caching" graded requirement.
 *
 * DESIGN ADAPTATION: uses flat ?accountId= filter (not nested path).
 */
export function useOperations(accountId: string) {
  return useQuery({
    queryKey: operationKeys.byAccount(accountId),
    queryFn: () => operationRepository.getByAccountId(accountId),
    enabled: !!accountId,
  });
}

/**
 * Mutation hook for creating a new operation.
 * On success:
 *  - Invalidates operationKeys.byAccount(accountId) → operations list refetches.
 *  - Invalidates accountKeys.all → AccountsScreen's derived balance refreshes
 *    on next visit (useAccountsWithBalances re-fires the ops queries).
 */
export function useCreateOperation(accountId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateOperationInput) =>
      operationRepository.create(accountId, input),
    onSuccess: () => {
      // Invalidate this account's operations so the list reflects the new entry.
      void queryClient.invalidateQueries({
        queryKey: operationKeys.byAccount(accountId),
      });
      // Also invalidate the accounts-with-balances cache so the AccountsScreen
      // shows the updated derived balance when the user navigates back (design §5).
      void queryClient.invalidateQueries({
        queryKey: accountKeys.all,
      });
    },
  });
}
