// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { type Operation, type CreateOperationInput } from '@/domain/entities/Operation';

/**
 * DIP seam for operations (design ADR-5).
 * Keeps hooks decoupled from the HTTP transport.
 */
export interface OperationRepository {
  /** Fetch all operations for an account, ordered most-recent-first. */
  getByAccountId(accountId: string): Promise<Operation[]>;
  /** Persist a new operation to the remote data source. Returns the created operation. */
  create(accountId: string, input: CreateOperationInput): Promise<Operation>;
}
