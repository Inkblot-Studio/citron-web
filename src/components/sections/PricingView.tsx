'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, ArrowRight, ChevronDown } from 'lucide-react';
import { pricingPlans } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';
import { Magnetic } from '@/components/experience/ambient/Magnetic';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

const PLAN_NAMES = ['Starter', 'Growth', 'Enterprise'] as const;

const MATRIX: { group: string; rows: { label: string; plans: [string | boolean, string | boolean, string | boolean] }[] }[] = [
  {
    group: 'Core',
    rows: [
      { label: 'CRM & Lead Management', plans: [true, true, true] },
      { label: 'Sales Pipelines & forecasting', plans: [true, true, true] },
      { label: 'Team members', plans: ['Up to 10', 'Unlimited', 'Unlimited'] },
      { label: 'AI agents', plans: ['5', 'Unlimited', 'Unlimited'] },
      { label: 'Core automations', plans: [true, true, true] },
    ],
  },
  {
    group: 'The full platform',
    rows: [
      { label: 'Marketing & Analytics', plans: [false, true, true] },
      { label: 'Invoicing & Accounting', plans: [false, true, true] },
      { label: 'Advanced automations', plans: [false, true, true] },
      { label: 'Knowledge engine', plans: [false, true, true] },
      { label: 'Priority support', plans: [false, true, true] },
    ],
  },
  {
    group: 'Enterprise controls',
    rows: [
      { label: 'SSO & SCIM provisioning', plans: [false, false, true] },
      { label: 'Custom AI models', plans: [false, false, true] },
      { label: 'SLA & uptime guarantees', plans: [false, false, true] },
      { label: 'Security review & audit logs', plans: [false, false, true] },
      { label: 'Dedicated success manager', plans: [false, false, true] },
    ],
  },
];

const FAQS = [
  {
    q: 'Can I start with just the CRM?',
    a: 'Yes. Citron CRM is a complete, standalone product. Start there, and turn on the rest of the platform whenever you’re ready. Your data carries over instantly because it was never separate to begin with.',
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
    a: 'Anytime. Upgrade or downgrade in a click. Changes are prorated and take effect immediately.',
  },
  {
    q: 'What does annual billing save?',
    a: 'Annual billing is roughly 17% cheaper than monthly, billed once per year. You can switch billing cadence whenever you like.',
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
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-6 lg:px-10">
      {/* header */}
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="eyebrow-cine text-[0.72rem] font-semibold">Pricing</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-4 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.04em] text-cine sm:text-[3.4rem]">
            One system. <span className="gradient-amber">Simple pricing.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-cine-dim">
            Replace your entire stack for less than you spend on it today. Start
            with the CRM, or run the whole business on Citron.
          </p>
        </Reveal>

        {/* billing toggle */}
        <Reveal delay={0.18}>
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-[var(--cine-line)] bg-[var(--cine-card)] p-1">
            {(['Monthly', 'Annual'] as const).map((label, i) => {
              const isAnnual = i === 1;
              const activeTab = annual === isAnnual;
              return (
                <button
                  key={label}
                  onClick={() => setAnnual(isAnnual)}
                  className={cn(
                    'relative rounded-full px-4 py-1.5 text-[0.8125rem] font-semibold transition-colors duration-200',
                    activeTab ? 'text-[#1d1c19]' : 'text-cine-dim hover:text-cine'
                  )}
                >
                  {activeTab && (
                    <motion.span
                      layoutId="billing-pill"
                      className="absolute inset-0 rounded-full bg-[var(--cine-amber-bright)]"
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                  <span className="relative">{label}</span>
                  {isAnnual && (
                    <span className="relative ml-1 text-[0.7rem] opacity-80">−17%</span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* plan cards */}
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {pricingPlans.map((plan, i) => {
          const price = annual ? plan.price.annual : plan.price.monthly;
          const href = plan.cta.href === '/contact' ? '/demo' : plan.cta.href;
          return (
            <Reveal key={plan.name} delay={i * 0.08}>
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-[var(--radius-2xl)] p-7',
                  plan.highlighted
                    ? 'cine-card ring-1 ring-[var(--cine-amber-bright)]'
                    : 'cine-card'
                )}
                style={
                  plan.highlighted
                    ? { boxShadow: '0 0 60px -18px rgba(var(--cine-particle),0.7)' }
                    : undefined
                }
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-7 rounded-full bg-[var(--cine-amber-bright)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#1d1c19]">
                    Most popular
                  </span>
                )}
                <h3 className="text-[1.25rem] font-semibold text-cine">{plan.name}</h3>
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
                        ${price}
                      </span>
                      <span className="pb-1 text-[0.8rem] text-cine-faint">{plan.cadence}</span>
                    </>
                  )}
                </div>

                <Magnetic strength={0.3} className="mt-6 block">
                  <Link
                    href={href}
                    className={cn(
                      'group flex h-[3rem] w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] text-[0.9375rem] font-semibold transition-[filter,border-color,color,transform] duration-200 active:scale-[0.98]',
                      plan.highlighted
                        ? 'bg-[var(--cine-amber-bright)] text-[#1d1c19] hover:brightness-105'
                        : 'border border-[var(--cine-line)] text-cine hover:border-[var(--cine-amber-bright)] hover:text-[var(--cine-amber)]'
                    )}
                  >
                    {plan.cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </Magnetic>

                <ul className="mt-7 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.875rem] text-cine-dim">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cine-amber)]"
                        strokeWidth={3}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
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
        <div className="mt-24 rounded-[var(--radius-3xl)] cine-card px-8 py-14 text-center">
          <h2 className="mx-auto max-w-xl text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.03em] text-cine sm:text-[2.4rem]">
            See it on your own workflows.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-cine-dim">
            A focused 30-minute walkthrough, mapped to how your team actually
            works.
          </p>
          <Magnetic strength={0.4} className="mt-8 inline-block">
            <Link
              href="/demo"
              className="group inline-flex h-[3.5rem] items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--cine-amber-bright)] px-8 text-[1.0625rem] font-semibold text-[#1d1c19] shadow-[0_10px_36px_-10px_rgba(var(--cine-particle),0.8)] transition-[filter,box-shadow,transform] duration-200 hover:brightness-105 active:scale-[0.97]"
            >
              Book a Demo
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Magnetic>
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
