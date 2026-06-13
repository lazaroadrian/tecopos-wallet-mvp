// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { ScrollView, StyleSheet, View } from 'react-native';

import { type CurrencySummary } from '@/domain/use-cases/summarizeByCurrency';
import { colors, spacing } from '@/ui/theme/tokens';
import { useResponsive } from '@/ui/theme/useResponsive';

import { Text } from '../../atoms/Text';
import { DateRangePicker, type DateRange } from '../../molecules/DateRangePicker';
import { EmptyState } from '../../molecules/EmptyState';
import { SkeletonList } from '../../molecules/SkeletonList';
import { SummaryByCurrency } from '../../molecules/SummaryByCurrency';

export interface SummaryPanelProps {
  summaries: CurrencySummary[];
  isLoading: boolean;
  dateRange: DateRange;
  onRangeChange: (range: DateRange) => void;
}

/**
 * Organism: SummaryPanel.
 * Renders the DateRangePicker and per-currency summary cards (C2, C3, C4).
 *
 * Layout (NFR1, design §9):
 *  - Phone: vertical single-column list of currency cards.
 *  - Tablet (width >= 768): currency cards shown in a 2-column flexWrap row.
 *    DateRangePicker spans full width above the cards on tablet too.
 *
 * States:
 *  - isLoading: SkeletonList while ANY account's operations are pending (NFR3).
 *  - Empty: EmptyState when no operations fall in the selected range.
 *  - Data: one SummaryByCurrency card per currency.
 *
 * "No cross-currency total" is communicated on each card (by design, ADR/C2).
 */
export function SummaryPanel({
  summaries,
  isLoading,
  dateRange,
  onRangeChange,
}: SummaryPanelProps) {
  const { isTablet } = useResponsive();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Date range filter — always visible */}
      <View style={styles.pickerContainer}>
        <Text variant="label" style={styles.pickerLabel}>
          Date Range
        </Text>
        <DateRangePicker value={dateRange} onChange={onRangeChange} />
      </View>

      {/* Currency cards */}
      {isLoading ? (
        <SkeletonList count={3} />
      ) : summaries.length === 0 ? (
        <EmptyState
          title="No operations in range"
          subtitle="Try adjusting the date range to see your summary."
        />
      ) : (
        <View style={[styles.cards, isTablet && styles.cardsTablet]}>
          {summaries.map((summary) => (
            <View
              key={summary.currency}
              style={[styles.cardWrapper, isTablet && styles.cardWrapperTablet]}
            >
              <SummaryByCurrency summary={summary} />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
    flexGrow: 1,
  },
  pickerContainer: {
    gap: spacing.xs,
  },
  pickerLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: colors.textMuted,
  },
  cards: {
    gap: spacing.sm,
  },
  cardsTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardWrapper: {
    // phone: full width (default flex column)
  },
  cardWrapperTablet: {
    // tablet: ~50% width with some gap
    width: '48%',
    marginRight: '2%',
  },
});
