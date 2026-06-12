// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { Text, View, StyleSheet } from 'react-native';

/**
 * Accounts list screen — WU-1 placeholder.
 * WU-5 will implement the full AccountsScreen with AccountList, skeletons, and empty states.
 */
export default function AccountsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accounts</Text>
      <Text style={styles.subtitle}>Accounts list — coming in WU-5</Text>
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
