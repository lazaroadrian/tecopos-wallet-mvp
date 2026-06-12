// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

/**
 * ISO 4217 currency code branded type.
 * Using a string brand to distinguish plain strings from validated currency codes.
 * Framework-agnostic — zero React/Expo imports.
 */
export type Currency = string & { readonly __brand: 'Currency' };

/**
 * Creates a Currency branded type from a string.
 * Use at API boundary (mappers) when converting from DTO strings.
 */
export function toCurrency(code: string): Currency {
  return code as Currency;
}

/**
 * A wallet account owned by the user.
 * Currency is fixed at account creation time (A7 — no per-operation currency).
 */
export interface Account {
  id: string;
  name: string;
  /** ISO 4217 currency code. All operations on this account use this currency. */
  currency: Currency;
  description: string;
  createdAt: Date;
}
