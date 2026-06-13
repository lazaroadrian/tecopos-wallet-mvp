// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.

/**
 * ISO 4217 currency symbol map for currencies supported in the app.
 * Multi-currency display: amounts are formatted per the account's currency.
 * No cross-currency conversion is performed (by design — ADR-2 equivalent).
 */
export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  ARS: '$',
  BRL: 'R$',
  CLP: '$',
  COP: '$',
  MXN: '$',
  PEN: 'S/',
  UYU: '$U',
  JPY: '¥',
  CNY: '¥',
  CAD: 'CA$',
  AUD: 'A$',
  CHF: 'CHF',
};

/** Returns the symbol for a given ISO 4217 currency code, or the code itself as fallback. */
export function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency.toUpperCase()] ?? currency;
}
