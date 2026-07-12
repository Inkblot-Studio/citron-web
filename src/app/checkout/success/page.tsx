import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { getStripe } from '@/lib/stripe';
import { identityUrl } from '@/lib/site';
import { ClearCartOnMount } from '@/components/cart/ClearCartOnMount';

export const metadata: Metadata = {
  title: 'Order confirmed',
  robots: { index: false },
};

export const dynamic = 'force-dynamic';

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  // Enrich the confirmation when we can; the page works without it.
  let email: string | null = null;
  const stripe = getStripe();
  if (stripe && sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      email = session.customer_details?.email ?? null;
    } catch {
      // Unknown or expired session id — show the generic confirmation.
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-[640px] flex-col items-center justify-center px-5 pb-24 pt-32 text-center">
      <ClearCartOnMount />
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(var(--cine-particle),0.12)] text-[var(--cine-amber)]">
        <CheckCircle2 className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-[2.2rem] font-semibold tracking-[-0.03em] text-cine">
        You&rsquo;re in. Welcome to Citron.
      </h1>
      <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-cine-dim">
        Your order is confirmed{email ? <> — a receipt is on its way to <span className="font-medium text-cine">{email}</span></> : ' and a receipt is on its way to your inbox'}.
        Create your account to activate your workspace.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <a href={identityUrl('signup', '/account')} className="btn btn-primary h-12 pl-6 pr-1.5 text-[0.9rem]">
          Set up your workspace
          <span className="btn-orb">
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        </a>
        <Link href="/account" className="btn btn-secondary h-12 px-6 text-[0.9rem]">
          Go to your account
        </Link>
      </div>
    </section>
  );
}
