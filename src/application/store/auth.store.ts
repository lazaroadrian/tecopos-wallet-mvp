// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

import { ALLOWED_USERS } from '@/constants/auth';
import { type Session, type LoginCredentials } from '@/domain/entities/Auth';

import { useFiltersStore } from './filters.store';

/**
 * Secure storage key for the persisted session.
 * Stored as JSON: { username: string }.
 */
const SESSION_KEY = 'wallet_session';

interface AuthState {
  /** The active session, or null when unauthenticated. */
  session: Session | null;
  /**
   * True once hydrate() has completed (even if no session was found).
   * Guards against route flicker: layouts render null until this is true.
   */
  hydrated: boolean;
  /**
   * Validates credentials against the hardcoded allow-list (A5 — fake auth).
   * Returns an error string on failure, or null on success.
   * On success, persists the session to expo-secure-store (A9).
   */
  login: (credentials: LoginCredentials) => Promise<string | null>;
  /**
   * Clears the session from state and secure storage.
   * Also resets the date-range filter (A9, C1 spec: logout clears filter).
   */
  logout: () => Promise<void>;
  /**
   * Reads a previously persisted session from expo-secure-store.
   * Called once on app cold start (from root _layout).
   * Sets hydrated=true when done, regardless of whether a session was found.
   */
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  session: null,
  hydrated: false,

  login: async (credentials: LoginCredentials): Promise<string | null> => {
    const match = ALLOWED_USERS.find(
      (u) =>
        u.username === credentials.username.trim() &&
        u.password === credentials.password,
    );

    if (!match) {
      return 'Invalid credentials. Please try again.';
    }

    const session: Session = { username: match.username };
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
    set({ session });
    return null;
  },

  logout: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    useFiltersStore.getState().reset();
    set({ session: null });
  },

  hydrate: async (): Promise<void> => {
    try {
      const raw = await SecureStore.getItemAsync(SESSION_KEY);
      if (raw) {
        const session: Session = JSON.parse(raw) as Session;
        set({ session, hydrated: true });
      } else {
        set({ hydrated: true });
      }
    } catch {
      // Corrupted storage: clear and continue unauthenticated.
      await SecureStore.deleteItemAsync(SESSION_KEY);
      set({ session: null, hydrated: true });
    }
  },
}));
