// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

/**
 * Operation type: income adds to balance, expense subtracts (A2, C4).
 * No other values are valid.
 */
export type OperationType = 'income' | 'expense';

/**
 * A financial operation linked to an account.
 * Currency is inherited from the parent account — not stored here (A7).
 */
export interface Operation {
  id: string;
  accountId: string;
  type: OperationType;
  /** Positive value. Sign contribution is determined by `type`. */
  amount: number;
  description: string;
  /** The business date of the operation (user-provided). */
  date: Date;
  /** Server-assigned creation timestamp. */
  createdAt: Date;
}

/**
 * Input for creating a new operation.
 * Omits server-assigned fields (id, accountId, createdAt).
 */
export interface CreateOperationInput {
  type: OperationType;
  amount: number;
  description: string;
  date: Date;
}
