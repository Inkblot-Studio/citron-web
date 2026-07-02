import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Rocket,
  Building2,
  Briefcase,
  Compass,
  TrendingUp,
  Cog,
  Check,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { solutions } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'How teams run on Citron: startups, agencies, professional services, consultancies, sales teams, and operations. One operating system, mapped to your outcomes.',
  alternates: { canonical: '/solutions' },
};

const ICON_BY_SLUG: Record<string, LucideIcon> = {
  startups: Rocket,
  agencies: Building2,
  'professional-services': Briefcase,
  consultancies: Compass,
  'sales-teams': TrendingUp,
  'operations-teams': Cog,
};

export default function SolutionsPage() {
  return (
    <section className="relative min-h-screen overflow-hidden pb-28 pt-32 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: 'var(--cine-bg-0)' }} />
        <div
          className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(var(--cine-particle),0.12), transparent 65%)',
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1120px] px-6 lg:px-10">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow-cine text-[0.72rem] font-semibold">Solutions</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-4 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.04em] text-cine sm:text-[3.4rem]">
              Built for how <span className="gradient-amber">your team works.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-cine-dim">
              One operating system, shaped to your outcomes. See how different
              teams put Citron to work, and what changes when they do.
            </p>
          </Reveal>
        </div>

        {/* solution cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {solutions.map((s, i) => {
            const Icon = ICON_BY_SLUG[s.slug] ?? Rocket;
            return (
              <Reveal key={s.slug} delay={(i % 2) * 0.08}>
                <article className="group flex h-full flex-col rounded-[var(--radius-2xl)] cine-card p-7 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[var(--shadow-xl)]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-lg)] bg-[rgba(var(--cine-particle),0.14)] text-[var(--cine-amber)]">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cine-faint">
                      {s.audience}
                    </span>
                  </div>

                  <h2 className="mt-5 text-[1.35rem] font-semibold leading-[1.18] tracking-[-0.02em] text-cine">
                    {s.headline}
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-cine-dim">
                    {s.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {s.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2.5 text-[0.875rem] text-cine">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cine-amber)]"
                          strokeWidth={3}
                        />
                        {o}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-[var(--cine-line)] pt-5">
                    {s.modules.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-[var(--cine-line)] px-2.5 py-1 text-[0.72rem] font-medium text-cine-dim"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* cta */}
        <Reveal>
          <div className="mt-20 rounded-[var(--radius-3xl)] cine-card px-8 py-14 text-center">
            <h2 className="mx-auto max-w-xl text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.03em] text-cine sm:text-[2.4rem]">
              Not sure where you fit?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-cine-dim">
              Tell us how your team works and we’ll show you exactly how Citron
              maps to it.
            </p>
            <Link
              href="/demo"
              className="group mt-8 inline-flex h-[3.5rem] items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--cine-amber-bright)] px-8 text-[1.0625rem] font-semibold text-[#1d1c19] shadow-[0_10px_36px_-10px_rgba(var(--cine-particle),0.8)] transition-[filter,box-shadow,transform] duration-200 hover:brightness-105 active:scale-[0.97]"
            >
              Book a Demo
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
