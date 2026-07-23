import { Suspense } from 'react';
import LogoutClient from './LogoutClient';

export default function LogoutPage() {
  return (
    <Suspense fallback={<main className="p-10 text-center text-sm text-cine-dim">Signing out…</main>}>
      <LogoutClient />
    </Suspense>
  );
}
