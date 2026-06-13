// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { useWindowDimensions } from 'react-native';

/**
 * Responsive breakpoint hook (design §9 — NFR1).
 *
 * Breakpoint: width >= 768 → isTablet (wider layout).
 * Recomputes automatically on orientation change or window resize.
 *
 * Usage:
 *   const { isTablet } = useResponsive();
 *   // isTablet → 2-column grid, wider content, side-by-side panels
 *   // !isTablet → single column (phone default)
 */
export function useResponsive() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  return { isTablet, width };
}
