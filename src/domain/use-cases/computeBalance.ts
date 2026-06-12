// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { type Operation } from '@/domain/entities/Operation';

/**
 * Computes the derived balance for a list of operations (A2, C4).
 *
 * Balance = Σ income.amount − Σ expense.amount
 *
 * Pure function — no side effects, no I/O.
 * Deterministic: same input always produces the same output.
 *
 * @param operations - The full list of operations for an account.
 * @returns The net balance as a number (may be negative).
 */
export function computeBalance(operations: Operation[]): number {
  return operations.reduce((balance, op) => {
    if (op.type === 'income') {
      return balance + op.amount;
    }
    return balance - op.amount;
  }, 0);
}
