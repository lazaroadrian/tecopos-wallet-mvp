// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

import { type Account, toCurrency } from '@/domain/entities/Account';

import { type AccountDTO } from '../dtos';

/**
 * Maps an AccountDTO (raw API shape) to the domain Account entity.
 * Guards against malformed values: invalid dates fall back to epoch.
 */
export function mapAccountDTOToEntity(dto: AccountDTO): Account {
  return {
    id: dto.id,
    name: dto.name ?? '',
    currency: toCurrency(dto.currency || 'USD'),
    description: dto.description ?? '',
    createdAt: parseDate(dto.createdAt),
  };
}

/**
 * Parses an ISO date string to a Date.
 * Returns epoch (new Date(0)) if the string is missing or unparseable.
 */
function parseDate(value: string | undefined | null): Date {
  if (!value) return new Date(0);
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
}
