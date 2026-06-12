// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { Text, View, StyleSheet } from 'react-native';

/**
 * Summary screen — WU-1 placeholder.
 * WU-8 will implement the full SummaryScreen with date-range filtering and per-currency aggregation.
 */
export default function SummaryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary</Text>
      <Text style={styles.subtitle}>Date-range summary — coming in WU-8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
});
