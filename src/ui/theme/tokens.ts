// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.

/**
 * Design tokens: spacing, colors, radii, typography, shadows.
 * Single source of truth — all components read from here.
 */
export const colors = {
  /** Brand */
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  primaryLight: '#dbeafe',
  /** Semantic */
  income: '#16a34a',
  incomeBackground: '#dcfce7',
  expense: '#dc2626',
  expenseBackground: '#fee2e2',
  /** Neutrals */
  background: '#f3f4f6',
  surface: '#ffffff',
  surfaceElevated: '#ffffff',
  border: '#e5e7eb',
  borderSubtle: '#f3f4f6',
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
  lg: 14,
  xl: 20,
  full: 9999,
} as const;

export const typography = {
  /** Font sizes */
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 26,
  /** Font weights (as string to match RN StyleSheet) */
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

/** Reusable card shadow tokens. */
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;
