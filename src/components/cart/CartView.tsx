'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Loader2,
  Minus,
  Plus,
  ShoppingCart,
  Tag,
  Trash2,
} from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import {
  ANNUAL_DISCOUNT_LABEL,
  basePlatform,
  cartItemLabel,
  customSeatPrice,
  formatUSD,
  getCreditPack,
  getModuleAddon,
  getPlan,
  itemMonthlyPrice,
  itemOneTimePrice,
  launchOffer,
  type BillingCadence,
  type CartItem,
} from '@/lib/catalog';
import { cn } from '@/lib/cn';

function Stepper({
  value,
  min,
  max,
  onChange,
  label,
}: {
  value: number;
  min: number;
  max: number | null;
  onChange: (v: number) => void;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[var(--cine-line)] p-1">
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-7 w-7 items-center justify-center rounded-full text-cine-dim transition-colors hover:bg-[rgba(var(--cine-particle),0.1)] disabled:opacity-30"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-[2.5rem] text-center text-[0.875rem] font-semibold text-cine tabular-nums">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Increase ${label}`}
        disabled={max !== null && value >= max}
        onClick={() => onChange(max !== null ? Math.min(max, value + 1) : value + 1)}
        className="flex h-7 w-7 items-center justify-center rounded-full text-cine-dim transition-colors hover:bg-[rgba(var(--cine-particle),0.1)] disabled:opacity-30"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function ItemRow({
  item,
  onUpdate,
  onRemove,
}: {
  item: CartItem;
  onUpdate: (item: CartItem) => void;
  onRemove: () => void;
}) {
  const monthly = itemMonthlyPrice(item);
  const oneTime = itemOneTimePrice(item);

  let detail: string;
  if (item.kind === 'plan') {
    const plan = getPlan(item.planId);
    detail = `${formatUSD(plan?.seatPrice?.[item.cadence] ?? 0)} per seat / month · billed ${item.cadence === 'annual' ? 'annually' : 'monthly'}`;
  } else if (item.kind === 'custom') {
    const names = item.moduleIds
      .map((id) => getModuleAddon(id)?.name)
      .filter(Boolean)
      .join(', ');
    detail = `${basePlatform.name}${names ? ` + ${names}` : ''} · ${formatUSD(customSeatPrice(item.moduleIds, item.cadence))} per seat / month`;
  } else {
    const pack = getCreditPack(item.packId);
    detail = pack ? `${pack.credits.toLocaleString()} AI credits per pack · one-time` : 'AI credits';
  }

  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-xl)] cine-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-[1rem] font-semibold text-cine">{cartItemLabel(item)}</h3>
          {item.kind !== 'credits' && item.cadence === 'annual' && (
            <span className="rounded-full bg-[rgba(var(--cine-particle),0.14)] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--cine-amber)]">
              Annual {ANNUAL_DISCOUNT_LABEL}
            </span>
          )}
        </div>
        <p className="mt-1 text-[0.8125rem] leading-relaxed text-cine-dim">{detail}</p>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        {item.kind === 'plan' && (
          <Stepper
            label="seats"
            value={item.seats}
            min={getPlan(item.planId)?.minSeats ?? 1}
            max={getPlan(item.planId)?.maxSeats ?? null}
            onChange={(seats) => onUpdate({ ...item, seats })}
          />
        )}
        {item.kind === 'custom' && (
          <Stepper
            label="seats"
            value={item.seats}
            min={1}
            max={null}
            onChange={(seats) => onUpdate({ ...item, seats })}
          />
        )}
        {item.kind === 'credits' && (
          <Stepper
            label="quantity"
            value={item.quantity}
            min={1}
            max={20}
            onChange={(quantity) => onUpdate({ ...item, quantity })}
          />
        )}

        <div className="min-w-[6rem] text-right">
          <div className="text-[1.0625rem] font-semibold text-cine tabular-nums">
            {item.kind === 'credits' ? formatUSD(oneTime) : formatUSD(monthly)}
          </div>
          <div className="text-[0.7rem] text-cine-faint">
            {item.kind === 'credits' ? 'one-time' : '/ month'}
          </div>
        </div>

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${cartItemLabel(item)}`}
          className="flex h-9 w-9 items-center justify-center rounded-full text-cine-faint transition-colors hover:bg-[rgba(220,60,60,0.08)] hover:text-[var(--color-error)]"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function CartView() {
  const { items, totals, ready, updateItem, removeItem, setCadence } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recurring = items.find((i) => i.kind !== 'credits');
  const cadence: BillingCadence = recurring?.cadence ?? 'monthly';

  async function checkout() {
    setCheckingOut(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? 'Checkout is temporarily unavailable. Please try again.');
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError('Checkout is temporarily unavailable. Please try again.');
    } finally {
      setCheckingOut(false);
    }
  }

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-cine-faint" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--cine-line)] bg-[rgba(var(--cine-particle),0.08)] text-[var(--cine-amber)]">
          <ShoppingCart className="h-6 w-6" />
        </span>
        <h1 className="mt-6 text-[1.75rem] font-semibold tracking-[-0.02em] text-cine">
          Your cart is empty
        </h1>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-cine-dim">
          Pick a plan, build a custom platform, or top up AI credits.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/pricing" className="btn btn-primary h-11 pl-5 pr-1.5 text-[0.875rem]">
            View plans
            <span className="btn-orb">
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
          </Link>
          <Link href="/build" className="btn btn-secondary h-11 px-5 text-[0.875rem]">
            Build your own
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-cine sm:text-[2.4rem]">
        Your cart
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        {/* items */}
        <div className="space-y-4">
          {recurring && (
            <div className="flex items-center justify-between rounded-[var(--radius-xl)] border border-[var(--cine-line)] px-5 py-3">
              <span className="text-[0.875rem] font-medium text-cine">Billing cadence</span>
              <div className="inline-flex items-center gap-1 rounded-full border border-[var(--cine-line)] bg-[var(--cine-card)] p-1">
                {(['monthly', 'annual'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCadence(c)}
                    className={cn(
                      'rounded-full px-3.5 py-1 text-[0.8125rem] font-semibold capitalize transition-colors',
                      cadence === c ? 'bg-[var(--cine-ink)] text-white' : 'text-cine-dim hover:text-cine'
                    )}
                  >
                    {c}
                    {c === 'annual' && <span className="ml-1 text-[0.7rem] opacity-80">{ANNUAL_DISCOUNT_LABEL}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {items.map((item, i) => (
            <ItemRow
              key={`${item.kind}-${item.kind === 'credits' ? item.packId : 'sub'}-${i}`}
              item={item}
              onUpdate={(next) => updateItem(i, next)}
              onRemove={() => removeItem(i)}
            />
          ))}
        </div>

        {/* summary */}
        <aside className="h-fit rounded-[var(--radius-2xl)] cine-card p-6 lg:sticky lg:top-24">
          <h2 className="text-[1.0625rem] font-semibold text-cine">Summary</h2>

          <dl className="mt-5 space-y-3 text-[0.875rem]">
            {totals.hasRecurring && (
              <div className="flex items-center justify-between">
                <dt className="text-cine-dim">
                  Subscription{totals.hasAnnual ? ' (billed annually)' : ''}
                </dt>
                <dd className="font-semibold text-cine tabular-nums">
                  {formatUSD(totals.monthlyRecurring)} / mo
                </dd>
              </div>
            )}
            {totals.hasAnnual && (
              <div className="flex items-center justify-between">
                <dt className="text-cine-dim">Charged today (12 months)</dt>
                <dd className="font-semibold text-cine tabular-nums">
                  {formatUSD(totals.monthlyRecurring * 12)}
                </dd>
              </div>
            )}
            {totals.oneTime > 0 && (
              <div className="flex items-center justify-between">
                <dt className="text-cine-dim">AI credit packs (one-time)</dt>
                <dd className="font-semibold text-cine tabular-nums">{formatUSD(totals.oneTime)}</dd>
              </div>
            )}
          </dl>

          <div className="mt-5 flex items-start gap-2.5 rounded-[var(--radius-lg)] bg-[rgba(var(--cine-particle),0.08)] p-3.5">
            <Tag className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cine-amber)]" />
            <p className="text-[0.8125rem] leading-relaxed text-cine-dim">
              Have a promo code (like{' '}
              <span className="font-mono font-semibold text-[var(--cine-amber)]">{launchOffer.code}</span>
              )? You can apply it on the secure checkout page.
            </p>
          </div>

          {error && (
            <p role="alert" className="mt-4 rounded-[var(--radius-lg)] bg-[rgba(220,60,60,0.08)] p-3 text-[0.8125rem] text-[var(--color-error)]">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={checkout}
            disabled={checkingOut}
            className="btn btn-primary mt-5 h-12 w-full pl-5 pr-1.5 text-[0.9rem]"
          >
            {checkingOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Proceed to checkout
                <span className="btn-orb">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </>
            )}
          </button>

          <p className="mt-3 text-center text-[0.75rem] text-cine-faint">
            Secure payment via Stripe. Cancel or change plans anytime.
          </p>
        </aside>
      </div>
    </div>
  );
}
