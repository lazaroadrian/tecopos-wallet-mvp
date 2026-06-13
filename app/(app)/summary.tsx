// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { useSummary } from '@/application/hooks/useSummary';
import { Text } from '@/ui/atoms/Text';
import { SummaryPanel } from '@/ui/organisms/SummaryPanel';
import { colors, spacing, typography } from '@/ui/theme/tokens';

/**
 * SummaryScreen — C3 / C2 / C4: Date-range summary with per-currency aggregation.
 *
 * Architecture:
 *  - useSummary() gathers all accounts' cached operations via useAccountsWithBalances,
 *    applies filterOperationsByRange, then summarizeByCurrency (domain use-cases).
 *  - isLoading=true while ANY account's operations query is pending (never shows partial data).
 *  - Default date range: 1st of current month → today, initialized here on first mount.
 *  - Range persisted in filters.store (Zustand) so navigating away and back keeps selection.
 *
 * Navigation entry: header button on AccountsScreen ("Summary" link in header).
 */
export default function SummaryScreen() {
  const { summaries, isLoading, dateRange, setRange } = useSummary();

  // Initialize to "current month" (1st → today) on first mount if range is null/null.
  // Per spec: default range = current month. Only set once; leaving preserves the user's choice.
  useEffect(() => {
    if (dateRange.start === null && dateRange.end === null) {
      const now = new Date();
      const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      setRange({ start: firstOfMonth, end: now });
    }
    // Intentionally run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <Text variant="heading" style={styles.title}>
        Summary
      </Text>

      <SummaryPanel
        summaries={summaries}
        isLoading={isLoading}
        dateRange={dateRange}
        onRangeChange={setRange}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
});
