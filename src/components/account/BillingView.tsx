'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CreditCard, ExternalLink, Loader2, ReceiptText, Repeat } from 'lucide-react';
import { siteConfig } from '@/lib/site';

export function BillingView() {
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openPortal() {
    setOpening(true);
    setError(null);
    try {
      const res = await fetch('/api/billing/portal', { method: 'POST' });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? 'Could not open the billing portal.');
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError('Could not open the billing portal.');
    } finally {
      setOpening(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[var(--radius-xl)] cine-card p-6">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-[var(--cine-amber)]" />
          <h2 className="text-[1rem] font-semibold text-cine">Subscription & payment</h2>
        </div>
        <p className="mt-2 max-w-xl text-[0.875rem] leading-relaxed text-cine-dim">
          Your subscription, seats, payment methods, and invoices are managed in the
          secure Stripe billing portal. Changes are prorated and take effect
          immediately.
        </p>

        {error && (
          <p role="alert" className="mt-4 max-w-xl rounded-[var(--radius-lg)] bg-[rgba(220,60,60,0.08)] p-3 text-[0.8125rem] text-[var(--color-error)]">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={openPortal}
          disabled={opening}
          className="btn btn-primary mt-5 h-11 px-6 text-[0.875rem]"
        >
          {opening ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Manage billing <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} /></>}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[var(--radius-xl)] cine-card p-6">
          <div className="flex items-center gap-2">
            <Repeat className="h-4 w-4 text-[var(--cine-amber)]" />
            <h2 className="text-[0.9375rem] font-semibold text-cine">Change plan or seats</h2>
          </div>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-cine-dim">
            Upgrade, downgrade, or adjust seat count — or switch to a custom module
            bundle built for your team.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/pricing" className="inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-[var(--cine-amber)] hover:underline">
              View plans <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link href="/build" className="inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-[var(--cine-amber)] hover:underline">
              Build custom <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="rounded-[var(--radius-xl)] cine-card p-6">
          <div className="flex items-center gap-2">
            <ReceiptText className="h-4 w-4 text-[var(--cine-amber)]" />
            <h2 className="text-[0.9375rem] font-semibold text-cine">Need help?</h2>
          </div>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-cine-dim">
            Questions about an invoice, VAT details, or procurement paperwork — our
            team answers within one business day.
          </p>
          <a
            href={`mailto:${siteConfig.contact.support}`}
            className="mt-4 inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-[var(--cine-amber)] hover:underline"
          >
            {siteConfig.contact.support}
          </a>
        </div>
      </div>
    </div>
  );
}
