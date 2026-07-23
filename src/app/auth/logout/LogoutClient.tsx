'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { siteConfig } from '@/lib/site';

export default function LogoutClient() {
  const router = useRouter();
  const search = useSearchParams();

  useEffect(() => {
    const next = search.get('next') || '/';
    (async () => {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch {
        /* ignore */
      }
      // Also clear Identity portal localStorage by hitting their logout if available.
      const identityLogout = `${siteConfig.identity.url}/logout?redirect_uri=${encodeURIComponent(
        next.startsWith('http') ? next : `${siteConfig.url}${next}`
      )}`;
      window.location.href = identityLogout;
    })();
  }, [router, search]);

  return (
    <main className="mx-auto flex min-h-[40vh] items-center justify-center px-5">
      <p className="text-sm text-cine-dim">Signing out…</p>
    </main>
  );
}
