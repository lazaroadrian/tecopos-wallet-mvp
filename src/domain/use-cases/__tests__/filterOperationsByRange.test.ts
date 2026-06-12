// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { type Operation } from '@/domain/entities/Operation';

import { filterOperationsByRange } from '../filterOperationsByRange';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeOp(id: string, dateStr: string): Operation {
  return {
    id,
    accountId: 'acc-1',
    type: 'expense',
    amount: 10,
    description: 'test',
    date: new Date(dateStr),
    createdAt: new Date(dateStr),
  };
}

const JAN_1 = makeOp('op-jan1', '2026-01-01');
const JAN_15 = makeOp('op-jan15', '2026-01-15');
const JAN_31 = makeOp('op-jan31', '2026-01-31');
const FEB_1 = makeOp('op-feb1', '2026-02-01');
const MAR_1 = makeOp('op-mar1', '2026-03-01');

const ALL = [JAN_1, JAN_15, JAN_31, FEB_1, MAR_1];

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('filterOperationsByRange', () => {
  test('returns all operations when both bounds are null (open range)', () => {
    const result = filterOperationsByRange(ALL, { start: null, end: null });
    expect(result).toHaveLength(5);
  });

  test('returns an empty array for an empty operations list', () => {
    expect(
      filterOperationsByRange([], {
        start: new Date('2026-01-01'),
        end: new Date('2026-12-31'),
      }),
    ).toHaveLength(0);
  });

  test('returns no operations when none fall within the range', () => {
    const result = filterOperationsByRange(ALL, {
      start: new Date('2026-04-01'),
      end: new Date('2026-04-30'),
    });
    expect(result).toHaveLength(0);
  });

  test('start bound is inclusive: operation exactly on start date is included', () => {
    const result = filterOperationsByRange(ALL, {
      start: new Date('2026-01-31'),
      end: null,
    });
    expect(result.map((o) => o.id)).toEqual(
      expect.arrayContaining(['op-jan31', 'op-feb1', 'op-mar1']),
    );
    expect(result).toHaveLength(3);
  });

  test('end bound is inclusive: operation exactly on end date is included', () => {
    const result = filterOperationsByRange(ALL, {
      start: null,
      end: new Date('2026-01-31'),
    });
    expect(result.map((o) => o.id)).toEqual(
      expect.arrayContaining(['op-jan1', 'op-jan15', 'op-jan31']),
    );
    expect(result).toHaveLength(3);
  });

  test('correctly filters a bounded range (January only)', () => {
    const result = filterOperationsByRange(ALL, {
      start: new Date('2026-01-01'),
      end: new Date('2026-01-31'),
    });
    expect(result.map((o) => o.id)).toEqual(
      expect.arrayContaining(['op-jan1', 'op-jan15', 'op-jan31']),
    );
    expect(result).toHaveLength(3);
  });

  test('open start bound includes operations before an end date', () => {
    const result = filterOperationsByRange(ALL, {
      start: null,
      end: new Date('2026-02-01'),
    });
    expect(result).toHaveLength(4);
    expect(result.map((o) => o.id)).not.toContain('op-mar1');
  });

  test('open end bound includes operations after a start date', () => {
    const result = filterOperationsByRange(ALL, {
      start: new Date('2026-02-01'),
      end: null,
    });
    expect(result.map((o) => o.id)).toEqual(
      expect.arrayContaining(['op-feb1', 'op-mar1']),
    );
    expect(result).toHaveLength(2);
  });

  test('single-day range: only the operation on that exact date is returned', () => {
    const result = filterOperationsByRange(ALL, {
      start: new Date('2026-01-15'),
      end: new Date('2026-01-15'),
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('op-jan15');
  });

  test('does not mutate the original operations array', () => {
    const ops = [...ALL];
    filterOperationsByRange(ops, {
      start: new Date('2026-02-01'),
      end: new Date('2026-03-01'),
    });
    expect(ops).toHaveLength(5);
  });
});
