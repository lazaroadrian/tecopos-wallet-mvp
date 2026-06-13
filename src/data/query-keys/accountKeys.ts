// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.

/**
 * Query-key factory for account-related queries.
 * Centralising keys prevents typos and makes invalidation safe.
 *
 * Usage:
 *   useQuery({ queryKey: accountKeys.lists() })         // all accounts list
 *   useQuery({ queryKey: accountKeys.detail(id) })      // one account
 *   queryClient.invalidateQueries({ queryKey: accountKeys.all })  // nuke all
 */
export const accountKeys = {
  all: ['accounts'] as const,
  lists: () => [...accountKeys.all, 'list'] as const,
  detail: (id: string) => [...accountKeys.all, 'detail', id] as const,
} as const;
