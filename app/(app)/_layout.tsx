// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by Lázaro Adrian.
import { Redirect, Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import { useAuthStore } from '@/application/store/auth.store';
import { Text } from '@/ui/atoms/Text';
import { colors } from '@/ui/theme/tokens';

/**
 * Protected app group layout (C1).
 * - While not hydrated: renders null (splash gate handled by root layout, so this is a safety net).
 * - If no session: redirects to Login.
 * - If authenticated: renders the Stack with a Logout header button (T2.8).
 */
export default function AppLayout() {
  const session = useAuthStore((s) => s.session);
  const hydrated = useAuthStore((s) => s.hydrated);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  // Safety net: root layout gates on hydrated, but guard here too.
  if (!hydrated) {
    return null;
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 8 }}>
            <Text style={{ color: colors.primary, fontWeight: '600' }}>
              Logout
            </Text>
          </TouchableOpacity>
        ),
      }}
    />
  );
}
