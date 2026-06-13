// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

import { useAccounts } from '@/application/hooks/useAccounts';
import { useAccountsWithBalances } from '@/application/hooks/useAccountsWithBalances';
import { useFiltersStore } from '@/application/store/filters.store';
import { type CurrencySummary, summarizeByCurrency } from '@/domain/use-cases/summarizeByCurrency';

/**
 * Application hook: useSummary.
 *
 * Aggregates ALL operations across ALL accounts and computes per-currency
 * income/expense/net totals for the selected date range (C2, C3).
 *
 * Data flow:
 *  1. useAccounts() → list of all accounts (TanStack Query, cached 5m).
 *  2. useAccountsWithBalances(accounts) → parallel useQueries, one per account.
 *     Reuses the operationKeys.byAccount(id) cache populated by earlier screens.
 *     Each individual query is staleTime 5m; once fetched the data is warm for 30m.
 *  3. If ANY per-account query is still pending → isLoading=true.
 *     A partial summary (some accounts loaded, others not) is NEVER shown as complete.
 *  4. filters.store.dateRange provides the date range (persisted across navigation).
 *  5. summarizeByCurrency(accounts, operationsByAccountId, dateRange) →
 *     Array<CurrencySummary> — pure domain use-case, no side effects.
 *
 * isLoading semantics:
 *  - true when accounts list is loading OR any account's operations query is pending.
 *  - false only when the entire dataset is ready.
 *  - Consumers must show a skeleton while isLoading is true (NFR3).
 *
 * @returns { summaries, isLoading, dateRange, setRange }
 */
export function useSummary(): {
  summaries: CurrencySummary[];
  isLoading: boolean;
  dateRange: { start: Date | null; end: Date | null };
  setRange: (range: { start: Date | null; end: Date | null }) => void;
} {
  const { data: accounts = [], isLoading: isLoadingAccounts } = useAccounts();
  const { operationsByAccountId, isLoadingOperations } = useAccountsWithBalances(accounts);
  const dateRange = useFiltersStore((s) => s.dateRange);
  const setRange = useFiltersStore((s) => s.setRange);

  const isLoading = isLoadingAccounts || (accounts.length > 0 && isLoadingOperations);

  const summaries: CurrencySummary[] = isLoading
    ? []
    : summarizeByCurrency(accounts, operationsByAccountId, dateRange);

  return { summaries, isLoading, dateRange, setRange };
}
