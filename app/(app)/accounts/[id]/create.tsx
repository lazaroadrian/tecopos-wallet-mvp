// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { useCreateOperation } from '@/application/hooks/useOperations';
import { useOverBalanceWarning } from '@/application/hooks/useOverBalanceWarning';
import {
  createOperationSchema,
  type CreateOperationFormValues,
} from '@/domain/validation/createOperationSchema';
import { Button } from '@/ui/atoms/Button';
import { Input } from '@/ui/atoms/Input';
import { Text } from '@/ui/atoms/Text';
import { FormField } from '@/ui/molecules/FormField';
import { TypeSelector } from '@/ui/molecules/TypeSelector';
import { colors, spacing, typography } from '@/ui/theme/tokens';

/**
 * CreateOperationScreen — M4: Create a new operation for the current account.
 *
 * Features:
 *  - react-hook-form + zodResolver wired to createOperationSchema (all M4 rules).
 *  - TypeSelector molecule for income/expense segmented control.
 *  - react-native-modal-datetime-picker for date selection (date only, no future).
 *  - Over-balance warning (A1): non-blocking inline banner when expense > balance.
 *    Computed in useOverBalanceWarning hook (application layer — not inline here).
 *  - Submit: useCreateOperation mutation → on success invalidates operationKeys cache
 *    and accountKeys (so derived balance refreshes) → navigate back to operations list.
 *  - Pending state: submit button loading until mutation settles.
 *  - Error state: Alert shown with message; form data preserved for retry.
 *  - Presented as modal per design (Stack presentation managed by router config).
 */
export default function CreateOperationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const accountId = id ?? '';

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateOperationFormValues>({
    resolver: zodResolver(createOperationSchema),
    mode: 'onChange',
    defaultValues: {
      type: 'expense',
      date: new Date(),
      amount: '' as unknown as number, // TextInput starts empty; coerce handles it
      description: '',
    },
  });

  // Watch live values for over-balance warning (A1).
  const watchedAmount = watch('amount');
  const watchedType = watch('type');

  const showOverBalanceWarning = useOverBalanceWarning(
    accountId,
    typeof watchedAmount === 'number' ? watchedAmount : Number(watchedAmount),
    watchedType
  );

  const { mutateAsync: createOperation } = useCreateOperation(accountId);

  const onSubmit = async (values: CreateOperationFormValues) => {
    try {
      await createOperation({
        type: values.type,
        amount: values.amount,
        description: values.description,
        date: values.date,
      });

      // Navigate back after success; cache invalidation is handled inside useCreateOperation.
      router.back();
    } catch {
      Alert.alert(
        'Submission failed',
        'Could not save the operation. Please check your connection and try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Amount */}
        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <FormField
              label="Amount"
              placeholder="0.00"
              keyboardType="decimal-pad"
              value={field.value !== undefined && field.value !== ('' as unknown as number)
                ? String(field.value)
                : ''}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={errors.amount?.message}
            />
          )}
        />

        {/* Type selector */}
        <View style={styles.field}>
          <Text variant="label" style={styles.fieldLabel}>
            Type
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
            Date
          </Text>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <>
                <Input
                  value={field.value
                    ? field.value.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : ''}
                  onFocus={() => setDatePickerVisible(true)}
                  showSoftInputOnFocus={false}
                  hasError={!!errors.date}
                  placeholder="Select a date"
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
                  date={field.value ?? new Date()}
                  onConfirm={(selectedDate) => {
                    setDatePickerVisible(false);
                    field.onChange(selectedDate);
                  }}
                  onCancel={() => setDatePickerVisible(false)}
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
              label="Description"
              placeholder="What was this for?"
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
              Warning: This expense exceeds the current account balance. You can still submit.
            </Text>
          </View>
        ) : null}

        {/* Submit */}
        <Button
          title="Save Operation"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
          style={styles.submitBtn}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
    paddingBottom: spacing.xxl,
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
