import { NextResponse } from 'next/server';

/** Clear the shared Identity session cookie. */
export async function POST() {
  const cookieName = process.env.SESSION_COOKIE_NAME ?? 'citron_session';
  const res = NextResponse.json({ ok: true });
  const cleared = {
    name: cookieName,
    value: '',
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  };
  // Clear both host-only and parent-domain variants.
  res.cookies.set(cleared);
  res.cookies.set({ ...cleared, domain: '.citronos.com' });
  return res;
}
