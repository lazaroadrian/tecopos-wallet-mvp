// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { type Account, toCurrency } from '@/domain/entities/Account';
import { type Operation } from '@/domain/entities/Operation';

import { summarizeByCurrency } from '../summarizeByCurrency';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeAccount(id: string, currencyCode: string): Account {
  return {
    id,
    name: `Account ${id}`,
    currency: toCurrency(currencyCode),
    description: '',
    createdAt: new Date('2026-01-01'),
  };
}

function makeOp(
  id: string,
  accountId: string,
  type: Operation['type'],
  amount: number,
  dateStr: string,
): Operation {
  return {
    id,
    accountId,
    type,
    amount,
    description: 'test',
    date: new Date(dateStr),
    createdAt: new Date(dateStr),
  };
}

const OPEN_RANGE = { start: null, end: null };

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('summarizeByCurrency', () => {
  test('returns empty array when there are no accounts', () => {
    expect(summarizeByCurrency([], {}, OPEN_RANGE)).toHaveLength(0);
  });

  test('returns empty array when operationsByAccount is empty (no ops)', () => {
    const accounts = [makeAccount('1', 'USD')];
    expect(summarizeByCurrency(accounts, {}, OPEN_RANGE)).toHaveLength(0);
  });

  test('returns empty array when operations exist but none fall in the date range', () => {
    const accounts = [makeAccount('1', 'USD')];
    const ops = [makeOp('op1', '1', 'income', 100, '2026-01-15')];
    const range = {
      start: new Date('2026-06-01'),
      end: new Date('2026-06-30'),
    };
    expect(
      summarizeByCurrency(accounts, { '1': ops }, range),
    ).toHaveLength(0);
  });

  test('single currency: correctly sums income and expense, computes net', () => {
    const accounts = [makeAccount('1', 'USD')];
    const ops = [
      makeOp('op1', '1', 'income', 500, '2026-01-10'),
      makeOp('op2', '1', 'expense', 200, '2026-01-20'),
      makeOp('op3', '1', 'income', 100, '2026-01-25'),
    ];
    const [summary] = summarizeByCurrency(accounts, { '1': ops }, OPEN_RANGE);

    expect(summary.currency).toBe('USD');
    expect(summary.totalIncome).toBeCloseTo(600);
    expect(summary.totalExpense).toBeCloseTo(200);
    expect(summary.net).toBeCloseTo(400);
  });

  test('multiple currencies: totals are isolated per currency (no cross-currency total)', () => {
    const usdAccount = makeAccount('1', 'USD');
    const eurAccount = makeAccount('2', 'EUR');
    const accounts = [usdAccount, eurAccount];

    const ops = {
      '1': [
        makeOp('op1', '1', 'income', 300, '2026-01-10'),
        makeOp('op2', '1', 'expense', 100, '2026-01-15'),
      ],
      '2': [
        makeOp('op3', '2', 'income', 200, '2026-01-10'),
        makeOp('op4', '2', 'expense', 50, '2026-01-20'),
      ],
    };

    const result = summarizeByCurrency(accounts, ops, OPEN_RANGE);
    expect(result).toHaveLength(2);

    const usd = result.find((s) => s.currency === 'USD');
    const eur = result.find((s) => s.currency === 'EUR');

    expect(usd).toBeDefined();
    expect(usd?.totalIncome).toBeCloseTo(300);
    expect(usd?.totalExpense).toBeCloseTo(100);
    expect(usd?.net).toBeCloseTo(200);

    expect(eur).toBeDefined();
    expect(eur?.totalIncome).toBeCloseTo(200);
    expect(eur?.totalExpense).toBeCloseTo(50);
    expect(eur?.net).toBeCloseTo(150);
  });

  test('two accounts with same currency: their operations are aggregated into one group', () => {
    const acc1 = makeAccount('1', 'USD');
    const acc2 = makeAccount('2', 'USD');
    const accounts = [acc1, acc2];

    const ops = {
      '1': [makeOp('op1', '1', 'income', 100, '2026-01-10')],
      '2': [makeOp('op2', '2', 'income', 200, '2026-01-20')],
    };

    const result = summarizeByCurrency(accounts, ops, OPEN_RANGE);
    expect(result).toHaveLength(1);
    expect(result[0].totalIncome).toBeCloseTo(300);
    expect(result[0].net).toBeCloseTo(300);
  });

  test('all expenses: net is negative', () => {
    const accounts = [makeAccount('1', 'USD')];
    const ops = [
      makeOp('op1', '1', 'expense', 80, '2026-01-10'),
      makeOp('op2', '1', 'expense', 20, '2026-01-15'),
    ];
    const [summary] = summarizeByCurrency(accounts, { '1': ops }, OPEN_RANGE);

    expect(summary.totalIncome).toBe(0);
    expect(summary.totalExpense).toBeCloseTo(100);
    expect(summary.net).toBeCloseTo(-100);
  });

  test('all income: net equals totalIncome', () => {
    const accounts = [makeAccount('1', 'EUR')];
    const ops = [
      makeOp('op1', '1', 'income', 500, '2026-01-10'),
      makeOp('op2', '1', 'income', 300, '2026-01-20'),
    ];
    const [summary] = summarizeByCurrency(accounts, { '1': ops }, OPEN_RANGE);

    expect(summary.totalExpense).toBe(0);
    expect(summary.totalIncome).toBeCloseTo(800);
    expect(summary.net).toBeCloseTo(800);
  });

  test('date range filtering is applied: operations outside range are excluded', () => {
    const accounts = [makeAccount('1', 'USD')];
    const ops = [
      makeOp('op1', '1', 'income', 100, '2026-01-10'),  // in range (January)
      makeOp('op2', '1', 'income', 999, '2026-03-01'),  // outside range
    ];
    const januaryRange = {
      start: new Date('2026-01-01'),
      end: new Date('2026-01-31'),
    };

    const result = summarizeByCurrency(accounts, { '1': ops }, januaryRange);
    expect(result).toHaveLength(1);
    expect(result[0].totalIncome).toBeCloseTo(100); // only the January income
  });

  test('account with no matching operations in operationsByAccount contributes nothing', () => {
    // acc1 has ops, acc2 has no entry in the map
    const acc1 = makeAccount('1', 'USD');
    const acc2 = makeAccount('2', 'EUR');
    const accounts = [acc1, acc2];

    const ops = {
      '1': [makeOp('op1', '1', 'income', 100, '2026-01-10')],
      // '2' is intentionally absent
    };

    const result = summarizeByCurrency(accounts, ops, OPEN_RANGE);
    expect(result).toHaveLength(1);
    expect(result[0].currency).toBe('USD');
  });
});
