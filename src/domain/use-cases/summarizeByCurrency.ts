// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { type Account, type Currency } from '@/domain/entities/Account';
import { type Operation } from '@/domain/entities/Operation';

import { filterOperationsByRange, type DateRange } from './filterOperationsByRange';

/**
 * Summary totals for one currency group.
 */
export interface CurrencySummary {
  currency: Currency;
  totalIncome: number;
  totalExpense: number;
  /** net = totalIncome − totalExpense (may be negative) */
  net: number;
}

/**
 * Computes income/expense/net totals grouped by currency (C2, C3, C4).
 *
 * Algorithm:
 * 1. For each account, filter its operations to the given date range.
 * 2. Group filtered operations by the account's currency.
 * 3. Sum income and expense per currency group.
 * 4. Compute net = totalIncome − totalExpense per group.
 *
 * No cross-currency conversion is performed (ADR, C2).
 * No combined cross-currency total is returned.
 *
 * Pure function — no side effects, no I/O.
 *
 * @param accounts - All accounts (provides currency per account).
 * @param operationsByAccount - Map of accountId → operations array.
 * @param range - The date range to filter operations within.
 * @returns Array of per-currency summaries; empty if no operations fall in range.
 */
export function summarizeByCurrency(
  accounts: Account[],
  operationsByAccount: Record<string, Operation[]>,
  range: DateRange,
): CurrencySummary[] {
  const accumulator = new Map<
    Currency,
    { totalIncome: number; totalExpense: number }
  >();

  for (const account of accounts) {
    const rawOps = operationsByAccount[account.id] ?? [];
    const filteredOps = filterOperationsByRange(rawOps, range);

    for (const op of filteredOps) {
      const current = accumulator.get(account.currency) ?? {
        totalIncome: 0,
        totalExpense: 0,
      };

      if (op.type === 'income') {
        current.totalIncome += op.amount;
      } else {
        current.totalExpense += op.amount;
      }

      accumulator.set(account.currency, current);
    }
  }

  return Array.from(accumulator.entries()).map(([currency, totals]) => ({
    currency,
    totalIncome: totals.totalIncome,
    totalExpense: totals.totalExpense,
    net: totals.totalIncome - totals.totalExpense,
  }));
}
