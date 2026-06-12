// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { Redirect } from 'expo-router';

import { useAuthStore } from '@/application/store/auth.store';

/**
 * Root index: redirects to the correct initial screen based on session state.
 * The root layout already gates rendering until hydrated=true,
 * so by the time this renders, session is the authoritative value.
 */
export default function Index() {
  const session = useAuthStore((s) => s.session);

  if (session) {
    return <Redirect href="/(app)/accounts" />;
  }

  return <Redirect href="/(auth)/login" />;
}
