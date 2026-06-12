// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { Redirect, Stack } from 'expo-router';

import { useAuthStore } from '@/application/store/auth.store';

/**
 * Auth group layout.
 * If the user already has a valid session, bounce them to the protected area (C1).
 * The root layout already ensures hydrated=true before this renders,
 * so no extra hydration guard is needed here.
 */
export default function AuthLayout() {
  const session = useAuthStore((s) => s.session);

  if (session) {
    return <Redirect href="/(app)/accounts" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
