// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.

import { OperationRepositoryImpl } from '../OperationRepositoryImpl';

// Mock fetch — do not hit the real network in unit tests.
const mockFetch = jest.fn();
(globalThis as { fetch: unknown }).fetch = mockFetch;

const MOCK_OP_DTO = {
  id: '10',
  accountId: '1',
  type: 'expense',
  amount: 42.5,
  description: 'Office supplies',
  date: '2026-03-04T00:00:00.000Z',
  createdAt: '2026-03-04T12:30:00.000Z',
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

describe('OperationRepositoryImpl', () => {
  let repo: OperationRepositoryImpl;

  beforeEach(() => {
    repo = new OperationRepositoryImpl();
    mockFetch.mockReset();
  });

  describe('getByAccountId()', () => {
    it('fetches operations via ?accountId= filter and returns mapped entities', async () => {
      mockFetch.mockReturnValueOnce(makeFetchResponse([MOCK_OP_DTO]));

      const ops = await repo.getByAccountId('1');

      expect(ops).toHaveLength(1);
      expect(ops[0].id).toBe('10');
      expect(ops[0].type).toBe('expense');
      expect(ops[0].amount).toBe(42.5);

      // Verify the flat ?accountId= filter was used (not a nested path)
      const calledUrl = mockFetch.mock.calls[0][0] as string;
      expect(calledUrl).toContain('/operations?accountId=1');
    });

    it('throws ApiError on non-2xx response', async () => {
      mockFetch.mockReturnValueOnce(makeFetchResponse('Forbidden', 403));

      await expect(repo.getByAccountId('1')).rejects.toThrow(
        'API request failed [403]',
      );
    });
  });

  describe('create()', () => {
    it('posts to /operations with accountId in body and returns mapped entity', async () => {
      mockFetch.mockReturnValueOnce(makeFetchResponse({ ...MOCK_OP_DTO, id: '99' }));

      const input = {
        type: 'expense' as const,
        amount: 42.5,
        description: 'Office supplies',
        date: new Date('2026-03-04T00:00:00.000Z'),
      };

      const result = await repo.create('1', input);

      expect(result.id).toBe('99');
      expect(result.accountId).toBe('1');

      // Verify POST to /operations (flat resource) with accountId in body
      const calledUrl = mockFetch.mock.calls[0][0] as string;
      expect(calledUrl).toContain('/operations');
      expect(calledUrl).not.toContain('/accounts/');

      const callOptions = mockFetch.mock.calls[0][1] as RequestInit;
      expect(callOptions.method).toBe('POST');

      const parsedBody = JSON.parse(callOptions.body as string) as Record<string, unknown>;
      expect(parsedBody.accountId).toBe('1');
      expect(parsedBody.amount).toBe(42.5);
    });

    it('throws ApiError on failed create', async () => {
      mockFetch.mockReturnValueOnce(makeFetchResponse('Bad Request', 400));

      await expect(
        repo.create('1', {
          type: 'income',
          amount: 100,
          description: '',
          date: new Date(),
        }),
      ).rejects.toThrow('API request failed [400]');
    });
  });
});
