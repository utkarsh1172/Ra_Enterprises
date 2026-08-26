import type { NextAuthConfig } from 'next-auth';

// Edge-safe config (no bcrypt / Node-only imports).
// The full config in src/lib/auth.ts extends this with the Credentials provider.
// Route protection for /admin/** is enforced in src/proxy.ts via getToken(),
// which only needs AUTH_SECRET and stays edge-compatible independent of this file.
export const authConfig: NextAuthConfig = {
  pages: { signIn: '/admin/login' },
  session: { strategy: 'jwt' },
  providers: [],
};
