// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.

/**
 * Domain types for authentication.
 * Framework-agnostic — no React/Expo imports.
 */

/** An authenticated session. Contains only what the app needs post-login. */
export interface Session {
  username: string;
}

/** Credentials submitted by the user on the Login screen. */
export interface LoginCredentials {
  username: string;
  password: string;
}
