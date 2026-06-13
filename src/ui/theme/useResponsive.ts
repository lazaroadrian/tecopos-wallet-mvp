// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { useWindowDimensions } from 'react-native';

/**
 * Responsive breakpoint hook (NFR1).
 *
 * Breakpoint: width >= 600 dp → isTablet (wider layout).
 * Value 600 comes from the spec's NFR1 requirement ("tablet layout at 600 dp").
 * Recomputes automatically on orientation change or window resize.
 *
 * Usage:
 *   const { isTablet } = useResponsive();
 *   // isTablet → 2-column grid, wider content, side-by-side panels
 *   // !isTablet → single column (phone default)
 */

/** Tablet breakpoint in dp, per spec NFR1. */
const TABLET_BREAKPOINT_DP = 600;

export function useResponsive() {
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT_DP;
  return { isTablet, width };
}
