// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

/**
 * Create operation modal screen — WU-1 placeholder.
 * WU-7 will implement the full CreateOperationScreen with form and mutation.
 */
export default function CreateOperationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Operation</Text>
      <Text style={styles.subtitle}>Account: {id} — coming in WU-7</Text>
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
