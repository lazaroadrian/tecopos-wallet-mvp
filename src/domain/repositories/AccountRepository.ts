// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { type Account } from '@/domain/entities/Account';

/**
 * DIP seam: domain owns this interface; data layer implements it.
 * Application hooks depend on this abstraction, never on a concrete HTTP client.
 * Swapping mockapi for a real API only touches data/repositories — domain stays put.
 */
export interface AccountRepository {
  /** Fetch all accounts for the authenticated user. */
  getAll(): Promise<Account[]>;
  /** Fetch a single account by its ID. Throws if not found. */
  getById(id: string): Promise<Account>;
}
