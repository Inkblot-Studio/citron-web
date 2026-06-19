'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealGroup, RevealItem, Reveal } from '@/components/ui/Reveal';
import { caseStudies, testimonials } from '@/lib/site';

export function SocialProof() {
  return (
    <Section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <SectionHeading
        eyebrow="Proof"
        align="center"
        title={<>Teams run their entire business on Citron.</>}
        description="From first hire to enterprise scale, companies replace their stack and never look back."
        className="mx-auto"
      />

      {/* case study cards */}
      <RevealGroup className="mt-14 grid gap-4 md:grid-cols-3" stagger={0.08}>
        {caseStudies.map((cs) => (
          <RevealItem key={cs.company}>
            <div className="flex h-full flex-col rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-7 shadow-[var(--shadow-xs)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
              <div className="flex items-baseline gap-2">
                <span className="text-[2.75rem] font-semibold leading-none tracking-[-0.03em] gradient-citron">
                  {cs.metric}
                </span>
              </div>
              <span className="mt-2 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
                {cs.metricLabel}
              </span>
              <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
                {cs.summary}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
                <span className="text-[0.875rem] font-semibold text-[var(--text-primary)]">
                  {cs.company}
                </span>
                <span className="text-[0.75rem] text-[var(--text-muted)]">{cs.industry}</span>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* testimonials */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <motion.figure className="flex h-full flex-col rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] p-7">
              <Quote className="h-6 w-6 text-[var(--accent)]" />
              <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-[var(--text-primary)]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[0.875rem] font-semibold text-[var(--accent-hover)]">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </span>
                <span className="flex flex-col">
                  <span className="text-[0.875rem] font-semibold text-[var(--text-primary)]">{t.name}</span>
                  <span className="text-[0.8125rem] text-[var(--text-muted)]">
                    {t.role}, {t.company}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
