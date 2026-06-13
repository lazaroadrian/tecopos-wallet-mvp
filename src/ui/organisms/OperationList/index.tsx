// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { FlatList, StyleSheet, View } from 'react-native';

import { type Operation } from '@/domain/entities/Operation';
import { spacing } from '@/ui/theme/tokens';

import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import { EmptyState } from '../../molecules/EmptyState';
import { OperationRow } from '../../molecules/OperationRow';
import { SkeletonList } from '../../molecules/SkeletonList';

export interface OperationListProps {
  operations: Operation[];
  /** Account currency — passed to each OperationRow (A7/C2). */
  currency: string;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onCreateOperation?: () => void;
}

/**
 * Organism: OperationList.
 * Full-featured FlatList wrapper for operations with:
 *  - Skeleton loading state (NFR3).
 *  - Empty state when the account has no operations.
 *  - Error state with retry action (NFR3).
 *  - OperationRow per item, sorted most-recent-first (M3 — caller must sort before passing).
 */
export function OperationList({
  operations,
  currency,
  isLoading,
  isError,
  onRetry,
  onCreateOperation,
}: OperationListProps) {
  if (isLoading) {
    return <SkeletonList count={5} />;
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text variant="error" style={styles.errorText}>
          Failed to load operations. Check your connection and try again.
        </Text>
        <Button title="Retry" onPress={onRetry} variant="ghost" style={styles.retryBtn} />
      </View>
    );
  }

  if (operations.length === 0) {
    return (
      <EmptyState
        title="No operations yet"
        subtitle="Add your first operation to start tracking this account."
        ctaLabel={onCreateOperation ? 'Add Operation' : undefined}
        onCta={onCreateOperation}
      />
    );
  }

  return (
    <FlatList
      data={operations}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <OperationRow operation={item} currency={currency} />
      )}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  separator: {
    height: spacing.sm,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  errorText: {
    textAlign: 'center',
  },
  retryBtn: {
    minWidth: 120,
  },
});
