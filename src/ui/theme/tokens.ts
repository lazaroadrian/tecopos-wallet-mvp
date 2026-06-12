// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

/**
 * Design tokens: spacing, colors, radii, typography.
 * Single source of truth — all components read from here.
 */
export const colors = {
  /** Brand */
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  /** Semantic */
  income: '#16a34a',
  expense: '#dc2626',
  /** Neutrals */
  background: '#f9fafb',
  surface: '#ffffff',
  border: '#e5e7eb',
  textPrimary: '#111827',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  textOnPrimary: '#ffffff',
  /** States */
  error: '#dc2626',
  errorBackground: '#fef2f2',
  warning: '#d97706',
  warningBackground: '#fffbeb',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const typography = {
  /** Font sizes */
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  /** Font weights (as string to match RN StyleSheet) */
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;
