'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, Minus, ShoppingCart, Sparkles } from 'lucide-react';
import {
  ANNUAL_DISCOUNT_LABEL,
  creditPacks,
  formatUSD,
  launchOffer,
  modelRates,
  CREDITS_EXPLAINER,
  plans,
  type BillingCadence,
} from '@/lib/catalog';
import { identityUrl } from '@/lib/site';
import { useCart } from '@/components/cart/CartProvider';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

const PLAN_NAMES = ['Starter', 'Growth', 'Enterprise'] as const;

const MATRIX: { group: string; rows: { label: string; plans: [string | boolean, string | boolean, string | boolean] }[] }[] = [
  {
    group: 'Core',
    rows: [
      { label: 'CRM & Lead Management', plans: [true, true, true] },
      { label: 'Sales Pipelines & forecasting', plans: [true, true, true] },
      { label: 'Seats', plans: ['Up to 10', 'Unlimited', 'Unlimited'] },
      { label: 'Local Citron AI', plans: ['Unlimited', 'Unlimited', 'Unlimited'] },
      { label: 'Hosted-model AI credits / month', plans: ['500', '2,500', 'Custom'] },
      { label: 'Core automations', plans: [true, true, true] },
    ],
  },
  {
    group: 'The full platform',
    rows: [
      { label: 'Marketing & Analytics', plans: [false, true, true] },
      { label: 'Invoicing & Accounting', plans: [false, true, true] },
      { label: 'Unlimited AI agents', plans: [false, true, true] },
      { label: 'Advanced automations', plans: [false, true, true] },
      { label: 'Knowledge engine', plans: [false, true, true] },
      { label: 'Priority support', plans: [false, true, true] },
    ],
  },
  {
    group: 'Enterprise controls',
    rows: [
      { label: 'SSO & SCIM provisioning', plans: [false, false, true] },
      { label: 'Custom AI models & credit pools', plans: [false, false, true] },
      { label: 'SLA & uptime guarantees', plans: [false, false, true] },
      { label: 'Security review & audit logs', plans: [false, false, true] },
      { label: 'Dedicated success manager', plans: [false, false, true] },
    ],
  },
];

const FAQS = [
  {
    q: 'How do AI credits work?',
    a: `${CREDITS_EXPLAINER} Each plan includes a monthly credit allowance; one-time top-up packs are available anytime and roll over until used.`,
  },
  {
    q: 'Is local Citron AI really unlimited?',
    a: 'Yes. Local Citron AI runs privately for your workspace and never consumes credits, on every plan — including Starter. Credits only apply to hosted frontier models like Claude, GPT, and Gemini.',
  },
  {
    q: 'Can I buy only the modules I need?',
    a: 'Yes — the build-your-own option lets you combine the base platform with exactly the modules you need, priced per seat. It’s the B2B-friendly way to adopt Citron gradually.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most teams are live in a day. There’s no integration project: Citron is one system, so there’s nothing to wire together. Import your contacts and you’re running.',
  },
  {
    q: 'Is my data used to train shared AI models?',
    a: 'Never. Your data stays yours and is never used to train models shared with other companies. Enterprise plans can run on isolated, custom models.',
  },
  {
    q: 'Can I change plans later?',
    a: 'Anytime. Upgrade, downgrade, or adjust seats in a click. Changes are prorated and take effect immediately.',
  },
  {
    q: 'What does annual billing save?',
    a: `Annual billing is roughly 17% cheaper than monthly, billed once per year. You can switch billing cadence whenever you like.`,
  },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true)
    return <Check className="mx-auto h-4 w-4 text-[var(--cine-amber)]" strokeWidth={3} />;
  if (value === false)
    return <Minus className="mx-auto h-4 w-4 text-cine-faint" strokeWidth={2} />;
  return <span className="text-[0.8125rem] text-cine-dim">{value}</span>;
}

export function PricingView() {
  const [cadence, setCadence] = useState<BillingCadence>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [addedPack, setAddedPack] = useState<string | null>(null);
  const { addItem } = useCart();
  const router = useRouter();

  const annual = cadence === 'annual';

  function buyPlan(planId: 'starter' | 'growth') {
    addItem({ kind: 'plan', planId, seats: planId === 'starter' ? 3 : 5, cadence });
    router.push('/cart');
  }

  return (
    <div className="mx-auto w-full max-w-[1120px] px-6 lg:px-10">
      {/* header */}
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="eyebrow-pill">Pricing</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-4 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.04em] text-cine sm:text-[3.4rem]">
            One system. <span className="gradient-amber">Simple pricing.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-cine-dim">
            Replace your entire stack for less than you spend on it today.
            Unlimited local AI on every plan.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-[rgba(160,125,28,0.25)] bg-[rgba(var(--cine-particle),0.07)] px-4 py-1.5 text-[0.78rem] font-medium text-[var(--cine-amber)]">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
            {launchOffer.headline} — code{' '}
            <span className="font-mono font-bold">{launchOffer.code}</span>
          </p>
        </Reveal>

        {/* billing toggle */}
        <Reveal delay={0.18}>
          <div className="mt-7 inline-flex items-center gap-1 rounded-full border border-[var(--cine-line)] bg-[var(--cine-card)] p-1">
            {(['monthly', 'annual'] as const).map((c) => {
              const activeTab = cadence === c;
              return (
                <button
                  key={c}
                  onClick={() => setCadence(c)}
                  className={cn(
                    'relative rounded-full px-4 py-1.5 text-[0.8125rem] font-semibold capitalize transition-colors duration-200',
                    activeTab ? 'text-white' : 'text-cine-dim hover:text-cine'
                  )}
                >
                  {activeTab && (
                    <motion.span
                      layoutId="billing-pill"
                      className="absolute inset-0 rounded-full bg-[var(--cine-ink)]"
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                  <span className="relative">{c}</span>
                  {c === 'annual' && (
                    <span className="relative ml-1 text-[0.7rem] opacity-80">{ANNUAL_DISCOUNT_LABEL}</span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* plan cards */}
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {plans.map((plan, i) => {
          const price = plan.seatPrice ? plan.seatPrice[cadence] : null;
          const selfServe = plan.id === 'starter' || plan.id === 'growth';
          return (
            <Reveal key={plan.name} delay={i * 0.08}>
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-[1.5rem] p-7 cine-card',
                  plan.highlighted &&
                    'border-transparent ring-2 ring-[var(--cine-ink)] shadow-[0_1px_2px_rgba(29,28,25,0.04),0_32px_64px_-32px_rgba(29,28,25,0.28)]'
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-7 rounded-full bg-[var(--cine-ink)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white">
                    Most popular
                  </span>
                )}
                <h2 className="text-[1.25rem] font-semibold text-cine">{plan.name}</h2>
                <p className="mt-1.5 min-h-[2.5rem] text-[0.875rem] leading-relaxed text-cine-dim">
                  {plan.description}
                </p>

                <div className="mt-5 flex items-end gap-1.5">
                  {price === null ? (
                    <span className="text-[2.4rem] font-semibold tracking-[-0.03em] text-cine">
                      Custom
                    </span>
                  ) : (
                    <>
                      <span className="text-[2.6rem] font-semibold leading-none tracking-[-0.04em] text-cine">
                        {formatUSD(price)}
                      </span>
                      <span className="pb-1 text-[0.8rem] text-cine-faint">
                        per seat / month{annual ? ', billed annually' : ''}
                      </span>
                    </>
                  )}
                </div>

                {selfServe ? (
                  <div className="mt-6 space-y-2.5">
                    <a
                      href={identityUrl('signup')}
                      className={cn(
                        'btn h-[3rem] w-full text-[0.9rem]',
                        plan.highlighted ? 'btn-primary pl-5 pr-1.5' : 'btn-secondary px-5'
                      )}
                    >
                      Start free trial
                      {plan.highlighted && (
                        <span className="btn-orb">
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                      )}
                    </a>
                    <button
                      type="button"
                      onClick={() => buyPlan(plan.id as 'starter' | 'growth')}
                      className="btn btn-ghost h-[2.5rem] w-full text-[0.85rem]"
                    >
                      <ShoppingCart className="h-4 w-4" strokeWidth={1.75} /> Buy now
                    </button>
                  </div>
                ) : (
                  <Link href="/demo" className="btn btn-secondary mt-6 h-[3rem] w-full px-5 text-[0.9rem]">
                    Talk to sales
                  </Link>
                )}

                <ul className="mt-7 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.875rem] text-cine-dim">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cine-amber)]" strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* build-your-own strip */}
      <Reveal>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[var(--radius-2xl)] cine-card px-7 py-6 sm:flex-row">
          <div>
            <h2 className="text-[1.0625rem] font-semibold text-cine">Need a different shape?</h2>
            <p className="mt-1 text-[0.875rem] text-cine-dim">
              Combine the base platform with exactly the modules you need — priced per seat, built for procurement.
            </p>
          </div>
          <Link
            href="/build"
            className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-[var(--radius-lg)] border border-[var(--cine-line)] px-5 text-[0.875rem] font-semibold text-cine transition hover:border-[var(--cine-amber-bright)] hover:text-[var(--cine-amber)]"
          >
            Build your own
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>

      {/* credits */}
      <div id="credits" className="mt-24 scroll-mt-28">
        <Reveal>
          <h2 className="text-center text-[1.9rem] font-semibold tracking-[-0.03em] text-cine sm:text-[2.4rem]">
            AI usage, priced honestly
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[0.9375rem] leading-relaxed text-cine-dim">
            {CREDITS_EXPLAINER}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-[var(--radius-2xl)] cine-card">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--cine-line)] text-[0.72rem] uppercase tracking-[0.08em] text-cine-faint">
                    <th className="px-5 py-3.5 font-medium">Provider</th>
                    <th className="px-3 py-3.5 font-medium">Model</th>
                    <th className="px-5 py-3.5 text-right font-medium">Credits / action</th>
                  </tr>
                </thead>
                <tbody>
                  {modelRates.map((r) => (
                    <tr key={`${r.provider}-${r.model}`} className="border-b border-[var(--cine-line)] last:border-0">
                      <td className="px-5 py-3 text-[0.875rem] font-medium text-cine">{r.provider}</td>
                      <td className="px-3 py-3 text-[0.875rem] text-cine-dim">{r.model}</td>
                      <td className="px-5 py-3 text-right text-[0.875rem] font-semibold tabular-nums">
                        {r.creditsPerAction === 0 ? (
                          <span className="text-[var(--cine-amber)]">Unlimited</span>
                        ) : (
                          <span className="text-cine">{r.creditsPerAction}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col rounded-[var(--radius-2xl)] cine-card p-6">
              <h3 className="text-[1rem] font-semibold text-cine">Top-up packs</h3>
              <p className="mt-1 text-[0.8125rem] text-cine-dim">
                One-time purchases. Unused credits roll over.
              </p>
              <div className="mt-4 space-y-3">
                {creditPacks.map((pack) => (
                  <button
                    key={pack.id}
                    type="button"
                    onClick={() => {
                      addItem({ kind: 'credits', packId: pack.id, quantity: 1 });
                      setAddedPack(pack.id);
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-[var(--radius-lg)] border px-4 py-3.5 text-left transition',
                      addedPack === pack.id
                        ? 'border-[var(--cine-amber-bright)] bg-[rgba(var(--cine-particle),0.08)]'
                        : 'border-[var(--cine-line)] hover:border-[var(--cine-amber-bright)]'
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[0.9rem] font-semibold text-cine">
                        {pack.name}
                        {pack.bestValue && (
                          <span className="rounded-full bg-[var(--cine-amber-bright)] px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-[#1d1c19]">
                            Best value
                          </span>
                        )}
                      </div>
                      <div className="text-[0.75rem] text-cine-faint">
                        {addedPack === pack.id ? 'Added to cart ✓' : pack.blurb}
                      </div>
                    </div>
                    <span className="text-[0.9375rem] font-semibold text-cine tabular-nums">
                      {formatUSD(pack.price)}
                    </span>
                  </button>
                ))}
              </div>
              {addedPack && (
                <Link href="/cart" className="btn btn-primary mt-4 h-10 w-full pl-4 pr-1.5 text-[0.85rem]">
                  Go to cart
                  <span className="btn-orb">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* comparison matrix */}
      <div className="mt-24">
        <Reveal>
          <h2 className="text-center text-[1.9rem] font-semibold tracking-[-0.03em] text-cine sm:text-[2.4rem]">
            Compare every plan
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 overflow-x-auto rounded-[var(--radius-2xl)] cine-card">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--cine-line)]">
                  <th className="px-5 py-4 text-[0.8rem] font-medium text-cine-faint" />
                  {PLAN_NAMES.map((n) => (
                    <th
                      key={n}
                      className="px-3 py-4 text-center text-[0.85rem] font-semibold text-cine"
                    >
                      {n}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((group) => (
                  <FragmentGroup key={group.group} group={group} />
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>

      {/* faq */}
      <div className="mx-auto mt-24 max-w-3xl">
        <Reveal>
          <h2 className="text-center text-[1.9rem] font-semibold tracking-[-0.03em] text-cine sm:text-[2.4rem]">
            Questions, answered
          </h2>
        </Reveal>
        <div className="mt-10 divide-y divide-[var(--cine-line)] border-y border-[var(--cine-line)]">
          {FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="text-[1.0625rem] font-medium text-cine">{f.q}</span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 text-cine-faint transition-transform duration-300',
                      open && 'rotate-180 text-[var(--cine-amber)]'
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-[0.95rem] leading-relaxed text-cine-dim">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* cta */}
      <Reveal>
        <div className="bezel mt-24">
          <div className="cine-card px-8 py-16 text-center">
            <h2 className="mx-auto max-w-xl text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.03em] text-cine sm:text-[2.4rem]">
              See it on your own workflows.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-cine-dim">
              A focused 30-minute walkthrough, mapped to how your team actually works.
            </p>
            <Link href="/demo" className="btn btn-primary mt-9 h-[3.25rem] pl-7 pr-2 text-[0.9875rem]">
              Book a demo
              <span className="btn-orb">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function FragmentGroup({
  group,
}: {
  group: { group: string; rows: { label: string; plans: [string | boolean, string | boolean, string | boolean] }[] };
}) {
  return (
    <>
      <tr>
        <td
          colSpan={4}
          className="bg-[rgba(var(--cine-particle),0.05)] px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--cine-amber)]"
        >
          {group.group}
        </td>
      </tr>
      {group.rows.map((row) => (
        <tr key={row.label} className="border-b border-[var(--cine-line)] last:border-0">
          <td className="px-5 py-3.5 text-[0.875rem] text-cine">{row.label}</td>
          {row.plans.map((p, i) => (
            <td key={i} className="px-3 py-3.5 text-center">
              <Cell value={p} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
