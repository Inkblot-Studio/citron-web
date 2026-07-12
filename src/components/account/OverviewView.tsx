'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CreditCard, Gauge, Loader2, Sparkles } from 'lucide-react';
import type { UsageSummary } from '@/lib/usage';

const fmt = (n: number) => n.toLocaleString('en-US');

export function OverviewView() {
  const [usage, setUsage] = useState<UsageSummary | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch('/api/usage')
      .then((r) => (r.ok ? (r.json() as Promise<UsageSummary>) : Promise.reject()))
      .then(setUsage)
      .catch(() => setFailed(true));
  }, []);

  if (!usage && !failed) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-cine-faint" />
      </div>
    );
  }

  const totalCredits = usage ? usage.includedCredits + usage.bonusCredits : 0;
  const remaining = usage ? Math.max(0, totalCredits - usage.usedCredits) : 0;

  return (
    <div className="space-y-6">
      {usage && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-[var(--radius-xl)] cine-card p-5">
            <h2 className="text-[0.8125rem] font-medium text-cine-dim">Plan</h2>
            <div className="mt-2 text-[1.4rem] font-semibold tracking-[-0.02em] text-cine">{usage.plan}</div>
            <p className="mt-1 text-[0.75rem] text-cine-faint">{usage.workspace}</p>
          </div>
          <div className="rounded-[var(--radius-xl)] cine-card p-5">
            <h2 className="text-[0.8125rem] font-medium text-cine-dim">Credits remaining</h2>
            <div className="mt-2 text-[1.4rem] font-semibold tracking-[-0.02em] text-cine tabular-nums">
              {fmt(remaining)}
            </div>
            <p className="mt-1 text-[0.75rem] text-cine-faint">of {fmt(totalCredits)} this period</p>
          </div>
          <div className="rounded-[var(--radius-xl)] cine-card p-5">
            <h2 className="text-[0.8125rem] font-medium text-cine-dim">Local AI actions</h2>
            <div className="mt-2 text-[1.4rem] font-semibold tracking-[-0.02em] text-cine tabular-nums">
              {fmt(usage.localAi.requests)}
            </div>
            <p className="mt-1 text-[0.75rem] font-medium text-[var(--cine-amber)]">Unlimited, always</p>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            href: '/account/usage',
            icon: Gauge,
            title: 'Usage',
            blurb: 'Credits by model and provider, daily trends, top-ups.',
          },
          {
            href: '/account/billing',
            icon: CreditCard,
            title: 'Billing',
            blurb: 'Subscription, seats, invoices, and payment methods.',
          },
          {
            href: '/build',
            icon: Sparkles,
            title: 'Expand Citron',
            blurb: 'Add modules or credits as your team grows.',
          },
        ].map(({ href, icon: Icon, title, blurb }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-[var(--radius-xl)] cine-card p-5 transition hover:border-[var(--cine-amber-bright)]"
          >
            <Icon className="h-5 w-5 text-[var(--cine-amber)]" />
            <h2 className="mt-3 flex items-center gap-1.5 text-[0.9375rem] font-semibold text-cine">
              {title}
              <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
            </h2>
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-cine-dim">{blurb}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
