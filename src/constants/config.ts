// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.

/**
 * Application configuration — reads from Expo public env vars.
 * Set EXPO_PUBLIC_MOCKAPI_URL in your .env file before running.
 * See .env.example for the expected format.
 */
export const MOCKAPI_URL = process.env.EXPO_PUBLIC_MOCKAPI_URL ?? '';

if (__DEV__ && !MOCKAPI_URL) {
  console.warn(
    '[config] EXPO_PUBLIC_MOCKAPI_URL is not set. ' +
      'Copy .env.example to .env and fill in your mockapi URL.',
  );
}
