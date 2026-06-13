// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.

import { type CreateOperationInput, type Operation } from '@/domain/entities/Operation';
import { type OperationRepository } from '@/domain/repositories/OperationRepository';

import { createOperation, fetchOperationsByAccount } from '../api/operations.api';
import { mapOperationDTOToEntity } from '../mappers/operation.mapper';

/**
 * Concrete implementation of the OperationRepository interface (DIP).
 *
 * DESIGN ADAPTATION: original design assumed /accounts/:id/operations (nested).
 * Actual mockapi.io resource is FLAT — operations live at /operations with
 * ?accountId= query filter. The create() method includes accountId in the
 * POST body (not in the URL path) for the same reason.
 */
export class OperationRepositoryImpl implements OperationRepository {
  async getByAccountId(accountId: string): Promise<Operation[]> {
    const dtos = await fetchOperationsByAccount(accountId);
    return dtos.map(mapOperationDTOToEntity);
  }

  async create(accountId: string, input: CreateOperationInput): Promise<Operation> {
    const dto = await createOperation({
      accountId,
      type: input.type,
      amount: input.amount,
      description: input.description,
      date: input.date.toISOString(),
    });
    return mapOperationDTOToEntity(dto);
  }
}
