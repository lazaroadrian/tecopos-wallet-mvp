// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.

import { AccountRepositoryImpl } from '../AccountRepositoryImpl';

// Mock fetch — do not hit the real network in unit tests.
const mockFetch = jest.fn();
(globalThis as { fetch: unknown }).fetch = mockFetch;

const MOCK_ACCOUNT_DTO = {
  id: '1',
  name: 'General Expenses',
  currency: 'USD',
  description: 'Day-to-day spend',
  createdAt: '2026-01-02T10:00:00.000Z',
};

function makeFetchResponse(body: unknown, status = 200) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
    text: () => Promise.resolve(String(body)),
    statusText: 'OK',
  } as Response);
}

describe('AccountRepositoryImpl', () => {
  let repo: AccountRepositoryImpl;

  beforeEach(() => {
    repo = new AccountRepositoryImpl();
    mockFetch.mockReset();
  });

  describe('getAll()', () => {
    it('returns a mapped list of Account entities', async () => {
      mockFetch.mockReturnValueOnce(
        makeFetchResponse([MOCK_ACCOUNT_DTO]),
      );

      const accounts = await repo.getAll();

      expect(accounts).toHaveLength(1);
      expect(accounts[0].id).toBe('1');
      expect(accounts[0].currency).toBe('USD');
      expect(accounts[0].createdAt).toEqual(
        new Date('2026-01-02T10:00:00.000Z'),
      );
    });

    it('throws ApiError on non-2xx response', async () => {
      mockFetch.mockReturnValueOnce(
        makeFetchResponse('Not Found', 404),
      );

      await expect(repo.getAll()).rejects.toThrow('API request failed [404]');
    });
  });

  describe('getById()', () => {
    it('returns a single mapped Account entity', async () => {
      mockFetch.mockReturnValueOnce(
        makeFetchResponse(MOCK_ACCOUNT_DTO),
      );

      const account = await repo.getById('1');

      expect(account.id).toBe('1');
      expect(account.name).toBe('General Expenses');
    });

    it('throws ApiError when the server returns 500', async () => {
      mockFetch.mockReturnValueOnce(
        makeFetchResponse('Internal Server Error', 500),
      );

      await expect(repo.getById('1')).rejects.toThrow(
        'API request failed [500]',
      );
    });
  });
});
