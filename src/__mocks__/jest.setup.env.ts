// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

/**
 * Jest environment setup — runs before any test module is loaded (setupFiles).
 *
 * Sets EXPO_PUBLIC_MOCKAPI_URL so that src/constants/config.ts's dev
 * console.warn ("EXPO_PUBLIC_MOCKAPI_URL is not set") is never triggered
 * during the test run. This does not affect runtime behavior. (FIX-4 / S3)
 */
process.env['EXPO_PUBLIC_MOCKAPI_URL'] = 'http://localhost/mock';
