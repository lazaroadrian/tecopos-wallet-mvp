// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { StyleSheet, View } from 'react-native';

import { spacing } from '@/ui/theme/tokens';

import { SkeletonBlock } from '../../atoms/SkeletonBlock';

export interface SkeletonListProps {
  /** Number of skeleton rows to render. Default: 4. */
  count?: number;
}

/**
 * Molecule: SkeletonList.
 * Renders N SkeletonBlock rows to indicate a loading list (NFR3).
 * Each row approximates an AccountCard's visual weight.
 */
export function SkeletonList({ count = 4 }: SkeletonListProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={styles.card}>
          <SkeletonBlock width="60%" height={18} />
          <SkeletonBlock width="40%" height={14} style={styles.sub} />
          <SkeletonBlock width="30%" height={22} style={styles.amount} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    padding: spacing.md,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: spacing.md,
    gap: spacing.xs,
  },
  sub: {
    marginTop: spacing.xs,
  },
  amount: {
    marginTop: spacing.sm,
  },
});
