// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { Stack } from 'expo-router';

/**
 * Root layout — WU-1 placeholder.
 * WU-2 will add: QueryClientProvider, SafeAreaProvider, auth hydration, splash gate.
 */
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
}
