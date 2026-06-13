// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.

import { type CreateOperationDTO, type OperationDTO } from '../dtos';

import { apiFetch } from './mockapi.client';

/**
 * Fetch all operations for a given account.
 *
 * DESIGN ADAPTATION: original design assumed /accounts/:id/operations (nested).
 * Actual mockapi.io exposes a FLAT /operations resource. We use the native
 * ?accountId= query filter instead of a nested path.
 */
export function fetchOperationsByAccount(
  accountId: string,
): Promise<OperationDTO[]> {
  return apiFetch<OperationDTO[]>(`/operations?accountId=${accountId}`);
}

/**
 * Create a new operation via POST /operations.
 * The accountId is included in the request body (flat resource pattern).
 */
export function createOperation(
  payload: CreateOperationDTO,
): Promise<OperationDTO> {
  return apiFetch<OperationDTO>('/operations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
