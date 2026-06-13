// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.

/**
 * Query-key factory for operation-related queries.
 *
 * DESIGN ADAPTATION: the key uses 'byAccount' (flat filter pattern) instead
 * of a nested path segment, reflecting the actual mockapi flat resource layout.
 *
 * Usage:
 *   useQuery({ queryKey: operationKeys.byAccount(accountId) })
 *   queryClient.invalidateQueries({ queryKey: operationKeys.byAccount(id) })
 */
export const operationKeys = {
  all: ['operations'] as const,
  byAccount: (accountId: string) =>
    [...operationKeys.all, 'byAccount', accountId] as const,
} as const;
