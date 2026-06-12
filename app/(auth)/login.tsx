// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { Text, View, StyleSheet } from 'react-native';

/**
 * Login screen — WU-1 placeholder.
 * WU-2 will implement the full login form (react-hook-form + zod + AuthTemplate).
 */
export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet MVP</Text>
      <Text style={styles.subtitle}>Login screen — coming in WU-2</Text>
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
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
});
