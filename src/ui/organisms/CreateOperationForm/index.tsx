// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { type Control, Controller, type FieldErrors } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { type CreateOperationFormValues } from '@/application/validation/createOperationSchema';
import { Button } from '@/ui/atoms/Button';
import { Input } from '@/ui/atoms/Input';
import { Text } from '@/ui/atoms/Text';
import { FormField } from '@/ui/molecules/FormField';
import { TypeSelector } from '@/ui/molecules/TypeSelector';
import { colors, spacing, typography } from '@/ui/theme/tokens';

export interface CreateOperationFormProps {
  // RHF bindings (injected by the container screen)
  control: Control<CreateOperationFormValues>;
  errors: FieldErrors<CreateOperationFormValues>;

  // Date picker open/close state (managed by the container)
  isDatePickerVisible: boolean;
  onDatePickerOpen: () => void;
  onDatePickerClose: () => void;

  // Derived display values computed by the container
  amountDisplayValue: string;
  dateDisplayValue: string;
  watchedDate: Date | undefined;

  // Over-balance warning (A1) — computed by useOverBalanceWarning in the container
  showOverBalanceWarning: boolean;

  // Submit state
  isSubmitting: boolean;
  isValid: boolean;
  onSubmit: () => void;
}

/**
 * Organism: CreateOperationForm.
 *
 * Renders all form fields for the Create Operation screen (M4).
 * Follows the container/presentational split:
 *  - Container (create.tsx): owns hooks, mutation, navigation, and RHF setup.
 *  - Organism (this): owns layout, field rendering, error display, warning banner,
 *    and submit button. Receives typed RHF bindings and derived values as props.
 *
 * Layer rules:
 *  - Only atoms/molecules/tokens from the UI layer.
 *  - Domain entity type (OperationType) for the TypeSelector prop type.
 *  - Application layer type (CreateOperationFormValues) for RHF generics.
 *  - No hooks, no router, no mutations.
 */
export function CreateOperationForm({
  control,
  errors,
  isDatePickerVisible,
  onDatePickerOpen,
  onDatePickerClose,
  amountDisplayValue,
  dateDisplayValue,
  watchedDate,
  showOverBalanceWarning,
  isSubmitting,
  isValid,
  onSubmit,
}: CreateOperationFormProps) {
  return (
    <View style={styles.container}>
      {/* Amount */}
      <Controller
        control={control}
        name="amount"
        render={({ field }) => (
          <FormField
            label="Monto"
            placeholder="0.00"
            keyboardType="decimal-pad"
            maxLength={13}
            value={amountDisplayValue}
            onChangeText={(raw) => {
              // Strip non-digit, non-period characters
              let sanitized = raw.replace(/[^0-9.]/g, '');
              // Keep only the first decimal separator
              const firstDot = sanitized.indexOf('.');
              if (firstDot !== -1) {
                sanitized =
                  sanitized.slice(0, firstDot + 1) +
                  sanitized.slice(firstDot + 1).replace(/\./g, '');
              }
              // Enforce max 2 decimal places
              if (firstDot !== -1 && sanitized.length > firstDot + 3) {
                sanitized = sanitized.slice(0, firstDot + 3);
              }
              field.onChange(sanitized);
            }}
            onBlur={field.onBlur}
            error={errors.amount?.message}
          />
        )}
      />

      {/* Type selector */}
      <View style={styles.field}>
        <Text variant="label" style={styles.fieldLabel}>
          Tipo
        </Text>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <TypeSelector
              value={field.value}
              onChange={field.onChange}
              error={errors.type?.message}
            />
          )}
        />
      </View>

      {/* Date picker */}
      <View style={styles.field}>
        <Text variant="label" style={styles.fieldLabel}>
          Fecha
        </Text>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <>
              <Input
                value={dateDisplayValue}
                onFocus={onDatePickerOpen}
                showSoftInputOnFocus={false}
                hasError={!!errors.date}
                placeholder="Seleccionar fecha"
                caretHidden
              />
              {errors.date ? (
                <Text variant="error" style={styles.errorText}>
                  {errors.date.message}
                </Text>
              ) : null}

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                maximumDate={new Date()}
                date={watchedDate ?? new Date()}
                onConfirm={(selectedDate) => {
                  onDatePickerClose();
                  field.onChange(selectedDate);
                }}
                onCancel={onDatePickerClose}
              />
            </>
          )}
        />
      </View>

      {/* Description */}
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <FormField
            label="Descripción"
            placeholder="¿Para qué fue esto?"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={errors.description?.message}
            multiline
            numberOfLines={3}
            style={styles.descriptionInput}
            autoCapitalize="sentences"
            autoCorrect
          />
        )}
      />

      {/* Over-balance warning (A1) — non-blocking */}
      {showOverBalanceWarning ? (
        <View style={styles.warningBanner}>
          <Text style={styles.warningText}>
            Advertencia: Este egreso supera el saldo actual de la cuenta. Puede guardarlo de todas formas.
          </Text>
        </View>
      ) : null}

      {/* Submit */}
      <Button
        title="Guardar operación"
        onPress={onSubmit}
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
        style={styles.submitBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  field: {
    gap: spacing.xs,
  },
  fieldLabel: {
    marginBottom: 2,
  },
  errorText: {
    marginTop: 2,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: spacing.sm,
  },
  warningBanner: {
    backgroundColor: colors.warningBackground,
    borderWidth: 1,
    borderColor: colors.warning,
    borderRadius: 8,
    padding: spacing.md,
  },
  warningText: {
    color: colors.warning,
    fontSize: typography.sm,
    fontWeight: '500' as const,
  },
  submitBtn: {
    marginTop: spacing.sm,
  },
});
