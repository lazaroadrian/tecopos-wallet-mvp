// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { type Operation } from '@/domain/entities/Operation';

/**
 * Date range for filtering. Both bounds are optional.
 * null = open-ended (no lower / no upper bound).
 */
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

/**
 * Filters a list of operations to those whose `date` falls within the given range.
 *
 * Bounds are INCLUSIVE: an operation whose date equals start or end is included.
 * A null start means "from the beginning of time".
 * A null end means "through now and beyond".
 *
 * Pure function — no side effects, no I/O.
 *
 * @param operations - Source list of operations.
 * @param range - The inclusive date range to filter by.
 * @returns A new array containing only the operations within the range.
 */
export function filterOperationsByRange(
  operations: Operation[],
  range: DateRange,
): Operation[] {
  return operations.filter((op) => {
    const opTime = op.date.getTime();

    if (range.start !== null && opTime < range.start.getTime()) {
      return false;
    }
    if (range.end !== null && opTime > range.end.getTime()) {
      return false;
    }
    return true;
  });
}
