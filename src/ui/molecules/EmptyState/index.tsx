// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/ui/theme/tokens';

import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';

export interface EmptyStateProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onCta?: () => void;
}

/**
 * Molecule: EmptyState.
 * Displayed when a query succeeds but returns an empty list.
 * Optional CTA button for user action (e.g. create first operation).
 */
export function EmptyState({ title, subtitle, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>○</Text>
      </View>
      <Text variant="heading" style={styles.title}>
        {title}
      </Text>
      {subtitle ? (
        <Text variant="label" style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
      {ctaLabel && onCta ? (
        <Button title={ctaLabel} onPress={onCta} style={styles.cta} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: radii.full,
    backgroundColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  iconText: {
    fontSize: 28,
    color: colors.textMuted,
    lineHeight: 34,
  },
  title: {
    textAlign: 'center',
    color: colors.textPrimary,
    fontWeight: typography.semibold,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.textMuted,
    lineHeight: 20,
  },
  cta: {
    marginTop: spacing.md,
    minWidth: 160,
  },
});
