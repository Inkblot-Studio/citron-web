import type { Metadata } from 'next';
import { Check, ShieldCheck, Star } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { DemoScheduler } from '@/components/sections/DemoScheduler';
import { Reveal } from '@/components/ui/Reveal';
import { testimonials, stats } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Book a Demo',
  description:
    'See Citron in action with a personalized 30-minute walkthrough mapped to how your team works. No commitment, no pressure.',
  alternates: { canonical: '/demo' },
};

const willSee = [
  'A live tour of the unified platform — CRM to finance',
  'AI agents acting across your real workflows',
  'How automations build themselves from plain language',
  'A migration path from your current stack',
];

export default function DemoPage() {
  const t = testimonials[0];
  return (
    <>
      <PageHero
        eyebrow="Book a Demo"
        title={
          <>
            See your business, <span className="gradient-citron">unified.</span>
          </>
        }
        description="A personalized 30-minute walkthrough with a product specialist — mapped to how your team actually works. No slides for the sake of slides."
      />

      <Section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] !pt-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* value prop */}
            <div>
              <Reveal>
                <h2 className="text-[1.5rem] font-semibold tracking-[-0.01em] text-[var(--text-primary)]">
                  What you’ll see
                </h2>
              </Reveal>
              <ul className="mt-6 space-y-4">
                {willSee.map((item, i) => (
                  <Reveal key={item} delay={i * 0.06}>
                    <li className="flex items-start gap-3 text-[0.9375rem] text-[var(--text-secondary)]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent-hover)]">
                        <Check className="h-3 w-3" strokeWidth={3.5} />
                      </span>
                      {item}
                    </li>
                  </Reveal>
                ))}
              </ul>

              {/* trust indicators */}
              <Reveal delay={0.3}>
                <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[var(--border-subtle)] pt-8">
                  {stats.slice(0, 2).map((s) => (
                    <div key={s.label}>
                      <div className="text-[1.75rem] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                        {s.value}
                      </div>
                      <div className="text-[0.8125rem] text-[var(--text-muted)]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.36}>
                <figure className="mt-8 rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
                  <div className="flex gap-0.5 text-[var(--accent)]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--text-primary)]">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-3 text-[0.8125rem] text-[var(--text-muted)]">
                    {t.name} · {t.role}, {t.company}
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal delay={0.42}>
                <p className="mt-6 flex items-center gap-2 text-[0.8125rem] text-[var(--text-muted)]">
                  <ShieldCheck className="h-4 w-4 text-[var(--color-success)]" />
                  Your data stays yours. No commitment, no pressure.
                </p>
              </Reveal>
            </div>

            {/* scheduler */}
            <Reveal delay={0.12}>
              <DemoScheduler />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
