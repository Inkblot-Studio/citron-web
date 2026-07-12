'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, Minus, Plus, ShieldCheck } from 'lucide-react';
import {
  ANNUAL_DISCOUNT_LABEL,
  basePlatform,
  customSeatPrice,
  formatUSD,
  moduleAddons,
  type BillingCadence,
} from '@/lib/catalog';
import { useCart } from '@/components/cart/CartProvider';
import { cn } from '@/lib/cn';

const CATEGORIES = ['Revenue', 'Operations', 'Finance', 'Intelligence'] as const;

export function Configurator() {
  const [cadence, setCadence] = useState<BillingCadence>('annual');
  const [seats, setSeats] = useState(5);
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(['crm', 'sales', 'automations'])
  );
  const { addItem } = useCart();
  const router = useRouter();

  const moduleIds = useMemo(() => [...selected], [selected]);
  const perSeat = customSeatPrice(moduleIds, cadence);
  const monthly = perSeat * seats;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function addToCart() {
    addItem({ kind: 'custom', seats, cadence, moduleIds });
    router.push('/cart');
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      {/* left: configuration */}
      <div className="space-y-6">
        {/* base platform */}
        <div className="rounded-[var(--radius-2xl)] cine-card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[1.0625rem] font-semibold text-cine">{basePlatform.name}</h2>
                <span className="rounded-full bg-[rgba(var(--cine-particle),0.14)] px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--cine-amber)]">
                  Included
                </span>
              </div>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-cine-dim">{basePlatform.blurb}</p>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-[1.25rem] font-semibold text-cine tabular-nums">
                {formatUSD(basePlatform.seatPrice[cadence])}
              </div>
              <div className="text-[0.7rem] text-cine-faint">per seat / month</div>
            </div>
          </div>
        </div>

        {/* modules by category */}
        {CATEGORIES.map((cat) => (
          <div key={cat}>
            <h3 className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cine-faint">
              {cat}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {moduleAddons
                .filter((m) => m.category === cat)
                .map((m) => {
                  const active = selected.has(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => toggle(m.id)}
                      aria-pressed={active}
                      className={cn(
                        'flex items-start justify-between gap-3 rounded-[var(--radius-xl)] border p-4 text-left transition',
                        active
                          ? 'border-[var(--cine-amber-bright)] bg-[rgba(var(--cine-particle),0.07)]'
                          : 'border-[var(--cine-line)] hover:border-[var(--cine-amber-bright)]'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition',
                            active
                              ? 'border-[var(--cine-amber-bright)] bg-[var(--cine-amber-bright)] text-[#1d1c19]'
                              : 'border-[var(--cine-line)]'
                          )}
                        >
                          {active && <Check className="h-3.5 w-3.5" strokeWidth={3.5} />}
                        </span>
                        <div>
                          <div className="text-[0.9rem] font-semibold text-cine">{m.name}</div>
                          <div className="mt-0.5 text-[0.78rem] leading-relaxed text-cine-dim">{m.blurb}</div>
                        </div>
                      </div>
                      <div className="shrink-0 text-right text-[0.85rem] font-semibold text-cine tabular-nums">
                        +{formatUSD(m.seatPrice[cadence])}
                        <div className="text-[0.65rem] font-normal text-cine-faint">/seat/mo</div>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {/* right: summary */}
      <aside className="h-fit rounded-[var(--radius-2xl)] cine-card p-6 lg:sticky lg:top-24">
        <h2 className="text-[1.0625rem] font-semibold text-cine">Your platform</h2>

        {/* cadence */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[0.8125rem] font-medium text-cine-dim">Billing</span>
          <div className="inline-flex items-center gap-1 rounded-full border border-[var(--cine-line)] p-1">
            {(['monthly', 'annual'] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCadence(c)}
                className={cn(
                  'rounded-full px-3 py-1 text-[0.75rem] font-semibold capitalize transition-colors',
                  cadence === c ? 'bg-[var(--cine-ink)] text-white' : 'text-cine-dim hover:text-cine'
                )}
              >
                {c}
                {c === 'annual' && <span className="ml-1 text-[0.65rem] opacity-80">{ANNUAL_DISCOUNT_LABEL}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* seats */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[0.8125rem] font-medium text-cine-dim">Seats</span>
          <div className="inline-flex items-center gap-1 rounded-full border border-[var(--cine-line)] p-1">
            <button
              type="button"
              aria-label="Fewer seats"
              disabled={seats <= 1}
              onClick={() => setSeats((s) => Math.max(1, s - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full text-cine-dim transition-colors hover:bg-[rgba(var(--cine-particle),0.1)] disabled:opacity-30"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-[2.5rem] text-center text-[0.875rem] font-semibold text-cine tabular-nums">
              {seats}
            </span>
            <button
              type="button"
              aria-label="More seats"
              onClick={() => setSeats((s) => Math.min(500, s + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full text-cine-dim transition-colors hover:bg-[rgba(var(--cine-particle),0.1)]"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* line items */}
        <dl className="mt-5 space-y-2 border-t border-[var(--cine-line)] pt-4 text-[0.8125rem]">
          <div className="flex justify-between">
            <dt className="text-cine-dim">{basePlatform.name}</dt>
            <dd className="text-cine tabular-nums">{formatUSD(basePlatform.seatPrice[cadence])}</dd>
          </div>
          {moduleIds.map((id) => {
            const m = moduleAddons.find((x) => x.id === id);
            if (!m) return null;
            return (
              <div key={id} className="flex justify-between">
                <dt className="text-cine-dim">{m.name}</dt>
                <dd className="text-cine tabular-nums">+{formatUSD(m.seatPrice[cadence])}</dd>
              </div>
            );
          })}
          <div className="flex justify-between border-t border-[var(--cine-line)] pt-2 font-medium">
            <dt className="text-cine">Per seat / month</dt>
            <dd className="text-cine tabular-nums">{formatUSD(perSeat)}</dd>
          </div>
        </dl>

        {/* total */}
        <div className="mt-5 rounded-[var(--radius-lg)] bg-[rgba(var(--cine-particle),0.08)] p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-[0.875rem] font-medium text-cine">
              {seats} seat{seats === 1 ? '' : 's'} · {cadence}
            </span>
            <span className="text-[1.5rem] font-semibold tracking-[-0.02em] text-cine tabular-nums">
              {formatUSD(monthly)}
              <span className="text-[0.78rem] font-normal text-cine-faint"> / mo</span>
            </span>
          </div>
          {cadence === 'annual' && (
            <p className="mt-1 text-right text-[0.72rem] text-cine-faint">
              {formatUSD(monthly * 12)} billed annually
            </p>
          )}
        </div>

        <button type="button" onClick={addToCart} className="btn btn-primary mt-5 h-12 w-full pl-5 pr-1.5 text-[0.9rem]">
          Add to cart
          <span className="btn-orb">
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        </button>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[0.72rem] text-cine-faint">
          <ShieldCheck className="h-3.5 w-3.5" />
          Unlimited local AI & {basePlatform.includedCredits} credits/mo included
        </p>
        <p className="mt-2 text-center text-[0.72rem] text-cine-faint">
          Prefer a simple tier?{' '}
          <Link href="/pricing" className="font-semibold text-[var(--cine-amber)] hover:underline">
            See plans
          </Link>
        </p>
      </aside>
    </div>
  );
}
