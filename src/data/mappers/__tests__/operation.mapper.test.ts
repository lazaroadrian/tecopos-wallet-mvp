// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.

import { mapOperationDTOToEntity } from '../operation.mapper';

describe('mapOperationDTOToEntity', () => {
  it('maps a well-formed DTO to an Operation entity', () => {
    const dto = {
      id: '10',
      accountId: '1',
      type: 'expense',
      amount: 42.5,
      description: 'Office supplies',
      date: '2026-03-04T00:00:00.000Z',
      createdAt: '2026-03-04T12:30:00.000Z',
    };

    const result = mapOperationDTOToEntity(dto);

    expect(result.id).toBe('10');
    expect(result.accountId).toBe('1');
    expect(result.type).toBe('expense');
    expect(result.amount).toBe(42.5);
    expect(result.description).toBe('Office supplies');
    expect(result.date).toEqual(new Date('2026-03-04T00:00:00.000Z'));
    expect(result.createdAt).toEqual(new Date('2026-03-04T12:30:00.000Z'));
  });

  it('maps type "income" correctly', () => {
    const dto = {
      id: '1',
      accountId: '2',
      type: 'income',
      amount: 1000,
      description: 'Salary',
      date: '2026-05-01T00:00:00.000Z',
      createdAt: '2026-05-01T08:00:00.000Z',
    };

    const result = mapOperationDTOToEntity(dto);
    expect(result.type).toBe('income');
  });

  it('defaults unknown type to "expense"', () => {
    const dto = {
      id: '2',
      accountId: '1',
      type: 'unknown-value',
      amount: 10,
      description: '',
      date: '2026-01-01T00:00:00.000Z',
      createdAt: '2026-01-01T00:00:00.000Z',
    };

    const result = mapOperationDTOToEntity(dto);
    expect(result.type).toBe('expense');
  });

  it('coerces string amount to number', () => {
    const dto = {
      id: '3',
      accountId: '1',
      type: 'income',
      amount: '99.99' as unknown as number,
      description: '',
      date: '2026-01-01T00:00:00.000Z',
      createdAt: '2026-01-01T00:00:00.000Z',
    };

    const result = mapOperationDTOToEntity(dto);
    expect(result.amount).toBe(99.99);
  });

  it('defaults amount to 0 when unparseable', () => {
    const dto = {
      id: '4',
      accountId: '1',
      type: 'expense',
      amount: 'bad' as unknown as number,
      description: '',
      date: '2026-01-01T00:00:00.000Z',
      createdAt: '2026-01-01T00:00:00.000Z',
    };

    const result = mapOperationDTOToEntity(dto);
    expect(result.amount).toBe(0);
  });

  it('defaults amount to 0 for negative values', () => {
    const dto = {
      id: '5',
      accountId: '1',
      type: 'expense',
      amount: -50,
      description: '',
      date: '2026-01-01T00:00:00.000Z',
      createdAt: '2026-01-01T00:00:00.000Z',
    };

    const result = mapOperationDTOToEntity(dto);
    expect(result.amount).toBe(0);
  });

  it('falls back to epoch when date is unparseable', () => {
    const dto = {
      id: '6',
      accountId: '1',
      type: 'expense',
      amount: 10,
      description: '',
      date: 'not-a-date',
      createdAt: 'also-bad',
    };

    const result = mapOperationDTOToEntity(dto);
    expect(result.date).toEqual(new Date(0));
    expect(result.createdAt).toEqual(new Date(0));
  });
});
