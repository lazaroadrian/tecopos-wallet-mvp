// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { useCreateOperation } from '@/application/hooks/useOperations';
import { useOverBalanceWarning } from '@/application/hooks/useOverBalanceWarning';
import {
  createOperationSchema,
  type CreateOperationFormValues,
} from '@/application/validation/createOperationSchema';
import { CreateOperationForm } from '@/ui/organisms/CreateOperationForm';
import { colors, spacing } from '@/ui/theme/tokens';

/**
 * CreateOperationScreen — M4: Create a new operation for the current account.
 *
 * Container responsibility:
 *  - Wires react-hook-form + zodResolver to createOperationSchema (all M4 rules).
 *  - Feeds the useOverBalanceWarning hook (A1) with live-watched form values.
 *  - Calls useCreateOperation mutation on submit; shows success Alert before
 *    navigating back (M4 — "success confirmation is shown to the user").
 *  - On error: shows Alert with message; form data preserved for retry.
 *  - Delegates ALL rendering to the CreateOperationForm organism.
 *
 * Presentational responsibility is fully owned by CreateOperationForm (organism).
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

  // Watch live values for the over-balance warning (A1) and organism display values.
  const watchedAmount = watch('amount');
  const watchedType = watch('type');
  const watchedDate = watch('date');

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

      // Show explicit success confirmation before navigating away (M4 spec scenario).
      Alert.alert(
        'Operación creada',
        'La operación se guardó correctamente.',
        [{ text: 'Aceptar', onPress: () => router.back() }]
      );
    } catch {
      Alert.alert(
        'Error al guardar',
        'No se pudo guardar la operación. Verifique su conexión e intente de nuevo.',
        [{ text: 'Aceptar' }]
      );
    }
  };

  // Derive display value for the amount TextInput (shows empty string until touched).
  const amountDisplayValue =
    watchedAmount !== undefined && watchedAmount !== ('' as unknown as number)
      ? String(watchedAmount)
      : '';

  // Derive display value for the date Input (formatted locale string).
  const dateDisplayValue = watchedDate
    ? watchedDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

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
        <CreateOperationForm
          control={control}
          errors={errors}
          isDatePickerVisible={isDatePickerVisible}
          onDatePickerOpen={() => setDatePickerVisible(true)}
          onDatePickerClose={() => setDatePickerVisible(false)}
          amountDisplayValue={amountDisplayValue}
          dateDisplayValue={dateDisplayValue}
          watchedDate={watchedDate}
          showOverBalanceWarning={showOverBalanceWarning}
          isSubmitting={isSubmitting}
          isValid={isValid}
          onSubmit={handleSubmit(onSubmit)}
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
    paddingBottom: spacing.xxl,
  },
});
