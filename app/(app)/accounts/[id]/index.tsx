// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

/**
 * Operations screen for a given account — WU-1 placeholder.
 * WU-6 will implement the full OperationsScreen.
 */
export default function OperationsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Operations</Text>
      <Text style={styles.subtitle}>Account: {id} — coming in WU-6</Text>
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
