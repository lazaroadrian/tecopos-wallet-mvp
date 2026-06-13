// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

import { type Account } from '@/domain/entities/Account';
import { type AccountRepository } from '@/domain/repositories/AccountRepository';

import { fetchAccountById, fetchAccounts } from '../api/accounts.api';
import { mapAccountDTOToEntity } from '../mappers/account.mapper';

/**
 * Concrete implementation of the AccountRepository interface (DIP).
 * Only this file and the composition root know about the HTTP transport.
 * Swap the entire API backend by replacing this file — domain stays unchanged.
 */
export class AccountRepositoryImpl implements AccountRepository {
  async getAll(): Promise<Account[]> {
    const dtos = await fetchAccounts();
    return dtos.map(mapAccountDTOToEntity);
  }

  async getById(id: string): Promise<Account> {
    const dto = await fetchAccountById(id);
    return mapAccountDTOToEntity(dto);
  }
}
