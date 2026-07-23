'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { siteConfig } from '@/lib/site';

/**
 * 1) Clear the shared HttpOnly cookie on this site.
 * 2) Clear Identity localStorage via /logout (without re-attaching a token).
 * 3) Land on `next` (home by default).
 */
export default function LogoutClient() {
  const search = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const next = search.get('next') || '/';
    const dest = next.startsWith('http') ? next : `${siteConfig.url}${next.startsWith('/') ? next : `/${next}`}`;

    (async () => {
      try {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      } catch {
        /* still proceed to Identity logout */
      }

      // Identity must clear its own JWT in localStorage. Pass redirect_uri so
      // we come back here signed out — never through /auth/callback.
      const identityLogout = `${siteConfig.identity.url}/logout?redirect_uri=${encodeURIComponent(dest)}`;
      window.location.replace(identityLogout);
    })().catch((e) => {
      setError(e instanceof Error ? e.message : 'Sign-out failed');
      window.location.replace(dest);
    });
  }, [search]);

  return (
    <main className="mx-auto flex min-h-[40vh] items-center justify-center px-5">
      <p className="text-sm text-cine-dim">{error ?? 'Signing out…'}</p>
    </main>
  );
}
