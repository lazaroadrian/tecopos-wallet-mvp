// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

/**
 * Fake auth allow-list.
 * IMPORTANT: This is a simulated login — no real backend or password hashing.
 * Credentials are intentionally hardcoded per the technical spec (A5).
 * Never use this pattern in a production application.
 */
export interface AllowedUser {
  username: string;
  password: string;
}

export const ALLOWED_USERS: AllowedUser[] = [
  { username: 'admin', password: 'tecopos' },
  { username: 'user', password: 'tecopos' },
];
