// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { create } from 'zustand';

/**
 * Date range for the summary filter (C3).
 * Both bounds are optional: null = open-ended.
 */
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface FiltersState {
  dateRange: DateRange;
  setRange: (range: DateRange) => void;
  /** Resets to default (null/null). Called by auth.store.logout() per A9. */
  reset: () => void;
}

const DEFAULT_RANGE: DateRange = { start: null, end: null };

export const useFiltersStore = create<FiltersState>()((set) => ({
  dateRange: DEFAULT_RANGE,
  setRange: (range) => set({ dateRange: range }),
  reset: () => set({ dateRange: DEFAULT_RANGE }),
}));
