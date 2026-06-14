// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { colors, radii, spacing, typography } from '@/ui/theme/tokens';

import { Text } from '../../atoms/Text';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

/**
 * Molecule: DateRangePicker.
 * Two tappable date fields (From / To) backed by DateTimePickerModal (C3).
 *
 * Default range is the current month (1st → today) — set by the parent
 * (SummaryScreen initializes filters.store on mount).
 * Persists via filters.store; this component is purely presentational.
 *
 * Constraint: "To" date is capped at today; "From" date is capped at "To" date.
 */
export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [activeField, setActiveField] = useState<'start' | 'end' | null>(null);

  const formatDate = (date: Date | null): string => {
    if (!date) return 'Seleccionar fecha';
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleConfirm = (date: Date) => {
    if (activeField === 'start') {
      // Clamp: start must be <= end
      const clampedEnd =
        value.end && date > value.end ? date : value.end;
      onChange({ start: date, end: clampedEnd });
    } else if (activeField === 'end') {
      // Clamp: end must be >= start
      const clampedStart =
        value.start && date < value.start ? date : value.start;
      onChange({ start: clampedStart, end: date });
    }
    setActiveField(null);
  };

  const handleCancel = () => setActiveField(null);

  const maxDate =
    activeField === 'end'
      ? new Date()
      : activeField === 'start' && value.end
        ? value.end
        : new Date();

  const currentPickerDate =
    activeField === 'start'
      ? (value.start ?? new Date())
      : (value.end ?? new Date());

  return (
    <View style={styles.container}>
      {/* Desde field */}
      <TouchableOpacity
        style={styles.field}
        onPress={() => setActiveField('start')}
        accessibilityRole="button"
        accessibilityLabel={`Desde: ${formatDate(value.start)}`}
      >
        <Text variant="caption" style={styles.fieldLabel}>
          Desde
        </Text>
        <Text variant="body" style={styles.fieldValue}>
          {formatDate(value.start)}
        </Text>
      </TouchableOpacity>

      <Text variant="caption" style={styles.separator}>
        –
      </Text>

      {/* Hasta field */}
      <TouchableOpacity
        style={styles.field}
        onPress={() => setActiveField('end')}
        accessibilityRole="button"
        accessibilityLabel={`Hasta: ${formatDate(value.end)}`}
      >
        <Text variant="caption" style={styles.fieldLabel}>
          Hasta
        </Text>
        <Text variant="body" style={styles.fieldValue}>
          {formatDate(value.end)}
        </Text>
      </TouchableOpacity>

      {/* Modal date picker — shared for both fields */}
      <DateTimePickerModal
        isVisible={activeField !== null}
        mode="date"
        date={currentPickerDate}
        maximumDate={maxDate}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  field: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 2,
  },
  fieldLabel: {
    fontSize: typography.xs,
    color: colors.textMuted,
    fontWeight: typography.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: typography.sm,
    color: colors.textPrimary,
    fontWeight: typography.medium,
  },
  separator: {
    color: colors.textMuted,
    fontSize: typography.lg,
  },
});
