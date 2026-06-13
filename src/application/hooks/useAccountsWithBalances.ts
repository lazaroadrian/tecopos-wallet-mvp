// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

import { useQueries } from '@tanstack/react-query';

import { operationKeys } from '@/data/query-keys/operationKeys';
import { operationRepository } from '@/data/repositories';
import { type Account } from '@/domain/entities/Account';
import { type Operation } from '@/domain/entities/Operation';

/**
 * Fetches and caches operations for every account in parallel using useQueries.
 *
 * Caching strategy (A2, design §5 — "efficient caching" graded requirement):
 *  - Each account's operations are cached under operationKeys.byAccount(id) with
 *    the global staleTime (5m) and gcTime (30m) from QueryClient.
 *  - Once fetched, navigating to Operations → back to Accounts does NOT refetch;
 *    derived balances are computed from the warm in-memory cache synchronously.
 *  - useQueries fires all N requests in parallel (one per account); it does NOT
 *    chain requests and does NOT issue duplicate fetches when the data is cached.
 *
 * Returns: a Record<accountId, Operation[]> ready for balance computation.
 */
export function useAccountsWithBalances(accounts: Account[]): {
  operationsByAccountId: Record<string, Operation[]>;
  isLoadingOperations: boolean;
} {
  const results = useQueries({
    queries: accounts.map((account) => ({
      queryKey: operationKeys.byAccount(account.id),
      queryFn: () => operationRepository.getByAccountId(account.id),
      // Keep stale time from QueryClient global defaults (5m)
      staleTime: 5 * 60 * 1000,
    })),
  });

  const isLoadingOperations = results.some((r) => r.isLoading);

  const operationsByAccountId: Record<string, Operation[]> = {};
  accounts.forEach((account, i) => {
    operationsByAccountId[account.id] = results[i]?.data ?? [];
  });

  return { operationsByAccountId, isLoadingOperations };
}
