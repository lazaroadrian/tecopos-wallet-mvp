// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

import { type AccountDTO } from '../dtos';

import { apiFetch } from './mockapi.client';

/** Fetch all accounts from the API. */
export function fetchAccounts(): Promise<AccountDTO[]> {
  return apiFetch<AccountDTO[]>('/accounts');
}

/** Fetch a single account by ID. */
export function fetchAccountById(id: string): Promise<AccountDTO> {
  return apiFetch<AccountDTO>(`/accounts/${id}`);
}
