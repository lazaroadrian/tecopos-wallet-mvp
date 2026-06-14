// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { type OperationType } from '@/domain/entities/Operation';
import { colors, radii, spacing, typography } from '@/ui/theme/tokens';

import { Text } from '../../atoms/Text';

export interface TypeSelectorProps {
  value: OperationType | undefined;
  onChange: (type: OperationType) => void;
  error?: string;
}

const OPTIONS: { label: string; value: OperationType }[] = [
  { label: 'Ingreso', value: 'income' },
  { label: 'Egreso', value: 'expense' },
];

/**
 * Molecule: TypeSelector.
 * Segmented-control style selector for operation type (income | expense).
 * Reuses Text atom; visual distinction uses the income/expense color tokens (C4).
 * Binds to react-hook-form Controller via onChange/value props.
 */
export function TypeSelector({ value, onChange, error }: TypeSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.track}>
        {OPTIONS.map((option) => {
          const isSelected = value === option.value;
          const isIncome = option.value === 'income';
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.segment,
                isSelected && (isIncome ? styles.selectedIncome : styles.selectedExpense),
              ]}
              onPress={() => onChange(option.value)}
              activeOpacity={0.7}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              accessibilityLabel={option.label}
            >
              <Text
                style={[
                  styles.segmentText,
                  isSelected && styles.segmentTextSelected,
                  isSelected && (isIncome ? styles.textIncome : styles.textExpense),
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error ? (
        <Text variant="error" style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  track: {
    flexDirection: 'row',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIncome: {
    backgroundColor: '#dcfce7',
  },
  selectedExpense: {
    backgroundColor: '#fee2e2',
  },
  segmentText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.textSecondary,
  },
  segmentTextSelected: {
    fontWeight: typography.semibold,
  },
  textIncome: {
    color: colors.income,
  },
  textExpense: {
    color: colors.expense,
  },
  errorText: {
    marginTop: 2,
  },
});
