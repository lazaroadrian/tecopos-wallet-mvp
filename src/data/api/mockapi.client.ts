// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

import { MOCKAPI_URL } from '@/constants/config';

/**
 * Typed API error with HTTP status and a human-readable message.
 * Thrown by all api modules when the server returns a non-2xx status.
 */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Core fetch wrapper for the mockapi.io backend.
 * - Prepends MOCKAPI_URL to every path.
 * - Throws ApiError on non-2xx responses.
 * - Returns parsed JSON typed as T.
 */
export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${MOCKAPI_URL}${path}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText);
    throw new ApiError(
      response.status,
      `API request failed [${response.status}]: ${text}`,
    );
  }

  return response.json() as Promise<T>;
}
