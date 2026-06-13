// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

import { useQuery } from '@tanstack/react-query';

import { accountKeys } from '@/data/query-keys/accountKeys';
import { accountRepository } from '@/data/repositories';

/**
 * TanStack Query hook for the accounts list.
 *
 * Caching config (from design §5):
 *  - staleTime / gcTime are set globally on the QueryClient (5m / 30m).
 *  - 30m gcTime keeps all accounts warm while the user navigates between screens,
 *    so derived balance computations (A2) never wait on a refetch.
 */
export function useAccounts() {
  return useQuery({
    queryKey: accountKeys.lists(),
    queryFn: () => accountRepository.getAll(),
  });
}

/** Hook for a single account by ID. */
export function useAccount(id: string) {
  return useQuery({
    queryKey: accountKeys.detail(id),
    queryFn: () => accountRepository.getById(id),
    enabled: !!id,
  });
}
