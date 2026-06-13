// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { MotiView } from 'moti';
import { StyleSheet, type ViewStyle } from 'react-native';

import { colors, radii } from '@/ui/theme/tokens';

export interface SkeletonBlockProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

/**
 * Atom: SkeletonBlock.
 * Moti-animated shimmer placeholder for loading states (NFR3).
 * Uses animated opacity (pulse) — does not require expo-linear-gradient.
 */
export function SkeletonBlock({
  width = '100%',
  height = 20,
  borderRadius = radii.sm,
  style,
}: SkeletonBlockProps) {
  return (
    <MotiView
      from={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{
        type: 'timing',
        duration: 700,
        loop: true,
      }}
      style={[styles.block, { width, height, borderRadius }, style]}
    />
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.border,
  },
});
