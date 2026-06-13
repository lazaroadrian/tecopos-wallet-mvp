// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

/**
 * Composition root for the data layer.
 * Exports singleton instances typed as domain interfaces (DIP).
 * Application hooks import from here — never from the concrete Impl classes.
 *
 * Swap the real API for an in-memory stub (for tests or demos) by replacing
 * the concrete class instantiated below; the rest of the codebase is unaffected.
 */

import { type AccountRepository } from '@/domain/repositories/AccountRepository';
import { type OperationRepository } from '@/domain/repositories/OperationRepository';

import { AccountRepositoryImpl } from './AccountRepositoryImpl';
import { OperationRepositoryImpl } from './OperationRepositoryImpl';

export const accountRepository: AccountRepository = new AccountRepositoryImpl();
export const operationRepository: OperationRepository = new OperationRepositoryImpl();
