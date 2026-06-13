// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.

import { type Operation, type OperationType } from '@/domain/entities/Operation';

import { type OperationDTO } from '../dtos';

/**
 * Maps an OperationDTO (raw API shape) to the domain Operation entity.
 *
 * Guards against malformed values:
 *  - amount: coerced to a positive number; defaults to 0 if missing or NaN.
 *  - type: validated against 'income' | 'expense'; defaults to 'expense'.
 *  - date/createdAt: epoch fallback for unparseable strings.
 *
 * DESIGN ADAPTATION: The API is FLAT — operations live at /operations with
 * ?accountId= filter, not nested under /accounts/:id/operations.
 * The accountId field is therefore always present on the DTO.
 */
export function mapOperationDTOToEntity(dto: OperationDTO): Operation {
  return {
    id: dto.id,
    accountId: dto.accountId ?? '',
    type: parseOperationType(dto.type),
    amount: parseAmount(dto.amount),
    description: dto.description ?? '',
    date: parseDate(dto.date),
    createdAt: parseDate(dto.createdAt),
  };
}

function parseOperationType(value: string | undefined | null): OperationType {
  if (value === 'income' || value === 'expense') return value;
  return 'expense';
}

function parseAmount(value: number | string | undefined | null): number {
  const n = typeof value === 'string' ? parseFloat(value) : Number(value);
  if (isNaN(n) || n < 0) return 0;
  return n;
}

function parseDate(value: string | undefined | null): Date {
  if (!value) return new Date(0);
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
}
