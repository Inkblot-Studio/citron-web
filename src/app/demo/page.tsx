import type { Metadata } from 'next';
import { Check, ShieldCheck, Star } from 'lucide-react';
import { DemoScheduler } from '@/components/sections/DemoScheduler';
import { Reveal } from '@/components/ui/Reveal';
import { Mascot } from '@/components/ui/Logo';
import { testimonials, stats } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Book a Demo',
  description:
    'See Citron in action — a personalized 30-minute walkthrough mapped to how your team actually works. One platform, one intelligence.',
  alternates: { canonical: '/demo' },
};

const willSee = [
  'A live tour of the unified system — CRM to finance',
  'AI agents acting across your real workflows',
  'How automations build themselves from plain language',
  'A clear migration path from your current stack',
];

export default function DemoPage() {
  const t = testimonials[0];

  return (
    <section className="relative min-h-screen overflow-hidden pb-24 pt-32 sm:pt-36">
      {/* cinematic backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 50% -10%, #16130d 0%, #0e0c08 45%, #0a0907 100%)',
          }}
        />
        <div
          className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(217,188,88,0.14), transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'linear-gradient(rgba(217,188,88,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(217,188,88,0.05) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(70% 50% at 50% 25%, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(70% 50% at 50% 25%, black, transparent 80%)',
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-8 lg:px-10">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span
              className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-[var(--radius-xl)] border border-[var(--cine-line)] bg-[rgba(20,18,13,0.7)] text-[var(--cine-amber)]"
              style={{ boxShadow: '0 0 40px -8px rgba(217,188,88,0.5)' }}
            >
              <Mascot className="h-7 w-7" animate={false} />
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="eyebrow-cine text-[0.72rem] font-medium">Book a Demo</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] text-cine sm:text-[3.25rem]">
              See your business, <span className="gradient-amber">unified.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-cine-dim">
              A personalized 30-minute walkthrough with a product specialist —
              mapped to how your team actually works. No slides for the sake of
              slides.
            </p>
          </Reveal>
        </div>

        {/* content */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h2 className="text-[1.5rem] font-semibold tracking-[-0.01em] text-cine">
                What you’ll see
              </h2>
            </Reveal>
            <ul className="mt-6 space-y-4">
              {willSee.map((item, i) => (
                <Reveal key={item} delay={i * 0.06} as="li">
                  <span className="flex items-start gap-3 text-[0.9375rem] text-cine-dim">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(217,188,88,0.16)] text-[var(--cine-amber)]">
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                    {item}
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.3}>
              <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[var(--cine-line)] pt-8">
                {stats.slice(0, 2).map((s) => (
                  <div key={s.label}>
                    <div className="text-[1.75rem] font-semibold tracking-[-0.02em] text-cine">
                      {s.value}
                    </div>
                    <div className="text-[0.8125rem] text-[var(--cine-ink-faint)]">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.36}>
              <figure className="mt-8 rounded-[var(--radius-xl)] cine-card p-6">
                <div className="flex gap-0.5 text-[var(--cine-amber)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-3 text-[0.9375rem] leading-relaxed text-cine">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-3 text-[0.8125rem] text-[var(--cine-ink-faint)]">
                  {t.name} · {t.role}, {t.company}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.42}>
              <p className="mt-6 flex items-center gap-2 text-[0.8125rem] text-[var(--cine-ink-faint)]">
                <ShieldCheck className="h-4 w-4 text-[var(--color-success)]" />
                Your data stays yours. No commitment, no pressure.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <DemoScheduler />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
