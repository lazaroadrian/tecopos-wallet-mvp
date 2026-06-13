// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { type Operation } from '@/domain/entities/Operation';

import { computeBalance } from '../computeBalance';

// ─── Helpers ────────────────────────────────────────────────────────────────

function makeOp(
  overrides: Partial<Operation> & { type: Operation['type']; amount: number },
): Operation {
  return {
    id: 'op-1',
    accountId: 'acc-1',
    description: 'test',
    date: new Date('2026-01-15'),
    createdAt: new Date('2026-01-15'),
    ...overrides,
  };
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('computeBalance', () => {
  test('returns 0 for an empty operations list', () => {
    expect(computeBalance([])).toBe(0);
  });

  test('returns the sum of all income amounts when there are no expenses', () => {
    const ops = [
      makeOp({ type: 'income', amount: 100 }),
      makeOp({ type: 'income', amount: 250.5 }),
    ];
    expect(computeBalance(ops)).toBeCloseTo(350.5);
  });

  test('returns a negative balance when all operations are expenses', () => {
    const ops = [
      makeOp({ type: 'expense', amount: 80 }),
      makeOp({ type: 'expense', amount: 20 }),
    ];
    expect(computeBalance(ops)).toBe(-100);
  });

  test('correctly nets income and expense: income=300, expense=120 → 180', () => {
    const ops = [
      makeOp({ type: 'income', amount: 300 }),
      makeOp({ type: 'expense', amount: 50 }),
      makeOp({ type: 'expense', amount: 70 }),
    ];
    expect(computeBalance(ops)).toBeCloseTo(180);
  });

  test('handles a single income operation', () => {
    expect(computeBalance([makeOp({ type: 'income', amount: 42 })])).toBe(42);
  });

  test('handles a single expense operation', () => {
    expect(computeBalance([makeOp({ type: 'expense', amount: 42 })])).toBe(-42);
  });

  test('handles large values without integer overflow issues', () => {
    const ops = [
      makeOp({ type: 'income', amount: 999_999_999.99 }),
      makeOp({ type: 'expense', amount: 1 }),
    ];
    expect(computeBalance(ops)).toBeCloseTo(999_999_998.99);
  });

  test('handles fractional amounts correctly', () => {
    const ops = [
      makeOp({ type: 'income', amount: 10.55 }),
      makeOp({ type: 'expense', amount: 0.55 }),
    ];
    expect(computeBalance(ops)).toBeCloseTo(10.0);
  });

  test('negative balance when expenses exceed income', () => {
    const ops = [
      makeOp({ type: 'income', amount: 50 }),
      makeOp({ type: 'expense', amount: 200 }),
    ];
    expect(computeBalance(ops)).toBe(-150);
  });

  test('balance of zero when income equals expense', () => {
    const ops = [
      makeOp({ type: 'income', amount: 100 }),
      makeOp({ type: 'expense', amount: 100 }),
    ];
    expect(computeBalance(ops)).toBe(0);
  });
});
