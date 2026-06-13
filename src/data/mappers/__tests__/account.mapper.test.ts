// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.

import { mapAccountDTOToEntity } from '../account.mapper';

describe('mapAccountDTOToEntity', () => {
  it('maps a well-formed DTO to an Account entity', () => {
    const dto = {
      id: '1',
      name: 'General Expenses',
      currency: 'USD',
      description: 'Day-to-day spend',
      createdAt: '2026-01-02T10:00:00.000Z',
    };

    const result = mapAccountDTOToEntity(dto);

    expect(result.id).toBe('1');
    expect(result.name).toBe('General Expenses');
    expect(result.currency).toBe('USD');
    expect(result.description).toBe('Day-to-day spend');
    expect(result.createdAt).toEqual(new Date('2026-01-02T10:00:00.000Z'));
  });

  it('defaults currency to "USD" when missing', () => {
    const dto = {
      id: '2',
      name: 'Test',
      currency: '',
      description: '',
      createdAt: '2026-01-01T00:00:00.000Z',
    };

    const result = mapAccountDTOToEntity(dto);
    expect(result.currency).toBe('USD');
  });

  it('falls back to epoch date when createdAt is an unparseable string', () => {
    const dto = {
      id: '3',
      name: 'Broken',
      currency: 'EUR',
      description: '',
      createdAt: 'not-a-date',
    };

    const result = mapAccountDTOToEntity(dto);
    expect(result.createdAt).toEqual(new Date(0));
  });

  it('falls back to epoch date when createdAt is missing', () => {
    const dto = {
      id: '4',
      name: 'Missing date',
      currency: 'ARS',
      description: '',
      createdAt: '',
    };

    const result = mapAccountDTOToEntity(dto);
    expect(result.createdAt).toEqual(new Date(0));
  });

  it('defaults name and description to empty string when absent', () => {
    const dto = {
      id: '5',
      name: undefined as unknown as string,
      currency: 'EUR',
      description: undefined as unknown as string,
      createdAt: '2026-01-01T00:00:00.000Z',
    };

    const result = mapAccountDTOToEntity(dto);
    expect(result.name).toBe('');
    expect(result.description).toBe('');
  });
});
