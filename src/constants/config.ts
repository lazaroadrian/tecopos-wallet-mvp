// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.

/**
 * Application configuration — reads from Expo public env vars.
 *
 * EXPO_PUBLIC_MOCKAPI_URL is read from .env at build time when present.
 * It falls back to the public mockapi.io instance so the distributed APK
 * works out-of-the-box without requiring a local .env file. The fallback
 * URL points to a public, throwaway mock API and is safe to ship.
 */
const FALLBACK_MOCKAPI_URL =
  'https://6a2c70d53e2b60ab038fbfb8.mockapi.io/api/prueba';

export const MOCKAPI_URL =
  process.env.EXPO_PUBLIC_MOCKAPI_URL || FALLBACK_MOCKAPI_URL;
