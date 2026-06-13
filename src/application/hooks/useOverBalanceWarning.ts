// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.

import { computeBalance } from '@/domain/use-cases/computeBalance';

import { useOperations } from './useOperations';

/**
 * Hook: useOverBalanceWarning
 *
 * Computes whether a proposed expense would push the account balance negative (A1).
 * Returns a boolean `showWarning` that the UI layer reads — it never blocks submission.
 *
 * Layer rule: balance computation lives here (application/hooks), not inline
 * in the component, so the UI stays free of business logic.
 *
 * Algorithm:
 *  1. Fetch the current cached operations for the account.
 *  2. Derive the current balance via computeBalance (domain use-case).
 *  3. If type === 'expense' and amount > currentBalance, return showWarning = true.
 *
 * @param accountId - The account whose operations to check.
 * @param amount    - The proposed operation amount (numeric, > 0 per zod schema).
 * @param type      - 'income' | 'expense' | undefined (undefined = no warning).
 */
export function useOverBalanceWarning(
  accountId: string,
  amount: number | undefined,
  type: 'income' | 'expense' | undefined
): boolean {
  const { data: operations } = useOperations(accountId);

  if (type !== 'expense' || !amount || !operations) {
    return false;
  }

  const currentBalance = computeBalance(operations);
  return amount > currentBalance;
}
