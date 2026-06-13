// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

/**
 * Data Transfer Objects (DTOs) — shapes returned by the mockapi.io API.
 * These types live at the data boundary; mappers convert them to domain entities.
 */

export interface AccountDTO {
  id: string;
  name: string;
  currency: string;
  description: string;
  createdAt: string;
}

/**
 * DESIGN ADAPTATION: original design assumed nested /accounts/:id/operations.
 * Actual mockapi has a FLAT /operations resource with ?accountId= filter.
 * The accountId field is therefore always present on the DTO.
 */
export interface OperationDTO {
  id: string;
  accountId: string;
  type: string;
  amount: number | string;
  description: string;
  date: string;
  createdAt: string;
}

/** Input DTO for POST /operations */
export interface CreateOperationDTO {
  accountId: string;
  type: string;
  amount: number;
  description: string;
  date: string;
}
