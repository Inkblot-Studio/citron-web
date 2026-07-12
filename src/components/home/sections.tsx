import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarClock,
  Check,
  Infinity as InfinityIcon,
  Landmark,
  ListChecks,
  Lock,
  MessagesSquare,
  Megaphone,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { aiCommands, caseStudies, modules, identityUrl, testimonials } from '@/lib/site';
import {
  ANNUAL_DISCOUNT_LABEL,
  CREDITS_EXPLAINER,
  formatUSD,
  plans,
} from '@/lib/catalog';
import { cn } from '@/lib/cn';

const MODULE_ICONS: Record<string, LucideIcon> = {
  Users,
  TrendingUp,
  Megaphone,
  Target,
  Workflow,
  ListChecks,
  MessagesSquare,
  CalendarClock,
  ReceiptText,
  Landmark,
  BarChart3,
  Bot,
};

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal>
        <span className="eyebrow-pill">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-5 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-cine sm:text-[2.6rem]">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-relaxed text-cine-dim">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Modules
// ---------------------------------------------------------------------------

export function ModulesSection() {
  return (
    <section id="modules" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="The platform"
          title={
            <>
              Everything your business runs on. <span className="gradient-amber">Connected.</span>
            </>
          }
          sub="Twelve modules, one data model, one intelligence. No integrations to wire, no data to reconcile."
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.04}>
          {modules.map((m) => {
            const Icon = MODULE_ICONS[m.icon] ?? Sparkles;
            return (
              <RevealItem key={m.slug}>
                <div className="group flex h-full flex-col rounded-[1.25rem] cine-card p-6 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(29,28,25,0.03),0_28px_56px_-28px_rgba(29,28,25,0.2)]">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-lg)] bg-[rgba(var(--cine-particle),0.1)] text-[var(--cine-amber)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-cine-faint">
                      {m.category}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[1.0625rem] font-semibold text-cine">{m.name}</h3>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-cine-dim">{m.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {m.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[0.78rem] text-cine-faint">
                        <Check className="h-3 w-3 shrink-0 text-[var(--cine-amber)]" strokeWidth={3} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal>
          <p className="mt-10 text-center text-[0.9rem] text-cine-dim">
            Need only some of it?{' '}
            <Link href="/build" className="font-semibold text-[var(--cine-amber)] hover:underline">
              Build your own platform
            </Link>{' '}
            from individual modules.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// AI: local unlimited + hosted frontier models
// ---------------------------------------------------------------------------

const HOSTED_MODELS = [
  { provider: 'Anthropic', model: 'Claude' },
  { provider: 'OpenAI', model: 'GPT' },
  { provider: 'Google', model: 'Gemini' },
  { provider: 'Mistral', model: 'Mistral' },
];

export function AiSection() {
  return (
    <section id="ai" className="scroll-mt-24 border-y border-[var(--cine-line)] bg-[var(--cine-bg-1)] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Intelligence"
          title={
            <>
              Every model. <span className="gradient-amber">Your data stays yours.</span>
            </>
          }
          sub="Citron ships with private local AI you can use without limits — and meters frontier models with simple credits when you want more power."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* local */}
          <Reveal>
            <div className="flex h-full flex-col rounded-[1.5rem] cine-card p-8">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[rgba(var(--cine-particle),0.14)] px-3 py-1 text-[0.72rem] font-semibold text-[var(--cine-amber)]">
                <InfinityIcon className="h-3.5 w-3.5" /> Unlimited on every plan
              </span>
              <h3 className="mt-4 text-[1.35rem] font-semibold text-cine">Citron Local AI</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-cine-dim">
                Runs privately on your workspace. Drafts follow-ups, scores leads,
                categorizes transactions, and answers questions about your business —
                with no per-request cost and no data leaving your control.
              </p>
              <ul className="mt-5 space-y-2.5">
                {['Zero credits, ever', 'Private by design — never trains shared models', 'Fast, always-on assistance in every module'].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[0.875rem] text-cine-dim">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cine-amber)]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* hosted */}
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col rounded-[1.5rem] cine-card p-8">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[rgba(var(--cine-particle),0.14)] px-3 py-1 text-[0.72rem] font-semibold text-[var(--cine-amber)]">
                <Sparkles className="h-3.5 w-3.5" /> Metered with credits
              </span>
              <h3 className="mt-4 text-[1.35rem] font-semibold text-cine">Frontier models, on tap</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-cine-dim">
                {CREDITS_EXPLAINER}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {HOSTED_MODELS.map((m) => (
                  <div key={m.provider} className="rounded-[var(--radius-lg)] border border-[var(--cine-line)] px-4 py-3">
                    <div className="text-[0.9rem] font-semibold text-cine">{m.model}</div>
                    <div className="text-[0.75rem] text-cine-faint">{m.provider}</div>
                  </div>
                ))}
              </div>
              <Link
                href="/pricing#credits"
                className="mt-5 inline-flex items-center gap-1 text-[0.875rem] font-semibold text-[var(--cine-amber)] hover:underline"
              >
                See credit rates & packs <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* command examples */}
        <Reveal>
          <div className="mx-auto mt-12 max-w-[820px] overflow-hidden rounded-[1.5rem] cine-card">
            <div className="border-b border-[var(--cine-line)] px-6 py-4">
              <p className="text-[0.8125rem] font-semibold text-cine">Ask Citron to do the work</p>
            </div>
            <div className="divide-y divide-[var(--cine-line)]">
              {aiCommands.slice(0, 3).map((c) => (
                <div key={c.prompt} className="px-6 py-4">
                  <p className="text-[0.875rem] font-medium text-cine">“{c.prompt}”</p>
                  <p className="mt-1.5 flex items-start gap-2 text-[0.8125rem] text-cine-dim">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--cine-amber)]" strokeWidth={3} />
                    {c.response}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// How it works
// ---------------------------------------------------------------------------

const STEPS = [
  {
    title: 'Import in a day',
    body: 'Bring your contacts, deals, and books. No integration project — Citron is one system, so there is nothing to wire together.',
  },
  {
    title: 'The AI learns your business',
    body: 'Every module shares one data model, so Citron understands your customers, cash, and pipeline from day one.',
  },
  {
    title: 'Replace the stack',
    body: 'Retire the seven tools you were paying for. One subscription, one source of truth, one place your team works.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow-pill">How it works</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-cine sm:text-[2.4rem]">
                From tool sprawl to one system, in a day.
              </h2>
            </Reveal>
            <div className="mt-8 space-y-6">
              {STEPS.map((s, i) => (
                <Reveal key={s.title} delay={0.1 + i * 0.06}>
                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(var(--cine-particle),0.12)] text-[0.85rem] font-bold text-[var(--cine-amber)]">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-[1.0625rem] font-semibold text-cine">{s.title}</h3>
                      <p className="mt-1 text-[0.9rem] leading-relaxed text-cine-dim">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.12}>
            <div className="bezel">
              <div className="overflow-hidden border border-[var(--cine-card-border)] bg-white">
                <Image
                  src="/shots/shot-crm.png"
                  alt="Citron CRM: unified contact timelines with AI lead scoring"
                  width={1536}
                  height={1024}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Proof: testimonials + case studies
// ---------------------------------------------------------------------------

export function ProofSection() {
  return (
    <section className="border-y border-[var(--cine-line)] bg-[var(--cine-bg-1)] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Customers"
          title="Teams replace their stack and don't look back."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {caseStudies.map((c, i) => (
            <Reveal key={c.company} delay={i * 0.06}>
              <div className="rounded-[var(--radius-xl)] cine-card p-6 text-center">
                <div className="text-[2.2rem] font-semibold tracking-[-0.03em] text-[var(--cine-amber)]">
                  {c.metric}
                </div>
                <div className="text-[0.8125rem] font-medium text-cine">{c.metricLabel}</div>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-cine-dim">{c.summary}</p>
                <p className="mt-3 text-[0.72rem] uppercase tracking-[0.12em] text-cine-faint">
                  {c.company} · {c.industry}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-[var(--radius-xl)] cine-card p-6">
                <div className="flex gap-0.5 text-[var(--cine-amber)]">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-cine">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-[0.8125rem] text-cine-faint">
                  {t.name} · {t.role}, {t.company}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Pricing teaser
// ---------------------------------------------------------------------------

export function PricingTeaserSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing. Serious value."
          sub={`Per-seat plans with unlimited local AI on every tier. Annual billing saves ${ANNUAL_DISCOUNT_LABEL}.`}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div
                className={cn(
                  'flex h-full flex-col rounded-[var(--radius-2xl)] cine-card p-6',
                  p.highlighted && 'ring-1 ring-[var(--cine-amber-bright)]'
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[1.125rem] font-semibold text-cine">{p.name}</h3>
                  {p.highlighted && (
                    <span className="rounded-full bg-[var(--cine-amber-bright)] px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#1d1c19]">
                      Popular
                    </span>
                  )}
                </div>
                <div className="mt-3 flex items-end gap-1.5">
                  {p.seatPrice ? (
                    <>
                      <span className="text-[2rem] font-semibold leading-none tracking-[-0.03em] text-cine">
                        {formatUSD(p.seatPrice.monthly)}
                      </span>
                      <span className="pb-0.5 text-[0.78rem] text-cine-faint">per seat / month</span>
                    </>
                  ) : (
                    <span className="text-[2rem] font-semibold leading-none tracking-[-0.03em] text-cine">
                      Custom
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-cine-dim">{p.description}</p>
                <p className="mt-3 text-[0.78rem] font-medium text-[var(--cine-amber)]">
                  {p.includedCredits
                    ? `${p.includedCredits.toLocaleString()} AI credits / month + unlimited local AI`
                    : 'Custom credit pools + unlimited local AI'}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/pricing" className="btn btn-primary h-12 pl-6 pr-1.5 text-[0.9rem]">
              Compare plans
              <span className="btn-orb">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </Link>
            <Link href="/build" className="btn btn-secondary h-12 px-6 text-[0.9rem]">
              Build your own
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Final CTA
// ---------------------------------------------------------------------------

export function FinalCtaSection() {
  return (
    <section className="pb-28 pt-4">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-10">
        <Reveal>
          <div className="bezel">
          <div className="cine-card px-8 py-20 text-center">
            <h2 className="mx-auto max-w-2xl text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-cine sm:text-[2.6rem]">
              Your business, running on <span className="gradient-amber">one intelligence.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[1rem] leading-relaxed text-cine-dim">
              Start free today, or talk to us about rolling Citron out across your organization.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={identityUrl('signup')}
                className="btn btn-primary h-[3.25rem] pl-7 pr-2 text-[0.9875rem]"
              >
                Start free trial
                <span className="btn-orb">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </a>
              <Link href="/demo" className="btn btn-secondary h-[3.25rem] px-7 text-[0.9875rem]">
                Book a demo
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.8125rem] text-cine-faint">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" /> Encrypted in transit & at rest
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Never trains shared models
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" /> Cancel anytime
              </span>
            </div>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
