import type { Metadata } from 'next';
import { ArrowUpRight, Compass, Eye, Heart, Layers, Sparkles, Zap } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/sections/CtaBand';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Citron is built by Inkblot Studio to become the operating system for modern business. Our mission, vision, values, and the story so far.',
  alternates: { canonical: '/about' },
};

const timeline = [
  { year: '2023', title: 'A simple frustration', body: 'Inkblot Studio kept watching great teams drown in disconnected tools. The work of running a business had become the work of moving data between apps.' },
  { year: '2024', title: 'The first principle', body: 'We asked a different question: what if every capability shared one data core and one intelligence? Citron began as an answer.' },
  { year: '2025', title: 'Intelligence that acts', body: 'We moved beyond chatbots. Citron’s agents started doing real work across modules — grounded, governed, and trusted.' },
  { year: '2026', title: 'The operating system', body: 'Citron unifies the modern company into a single system. This is just the beginning of what one intelligence can do.' },
];

const values = [
  { icon: Layers, title: 'One system', body: 'We refuse fragmentation. Everything belongs together, sharing one truth.' },
  { icon: Sparkles, title: 'Intelligence first', body: 'AI isn’t a feature we bolt on. It’s the layer everything is built around.' },
  { icon: Heart, title: 'Calm by design', body: 'Software should be quiet and confident — capability without noise.' },
  { icon: Zap, title: 'Imperceptible speed', body: 'Every millisecond is respect for your attention. Citron feels instant.' },
  { icon: Eye, title: 'Radical clarity', body: 'No ambiguity, no clutter. One correct interpretation of every decision.' },
  { icon: Compass, title: 'Built to last', body: 'We’re building the foundation companies will run on for a decade.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            We’re building where business software{' '}
            <span className="gradient-citron">is going.</span>
          </>
        }
        description="Citron is the operating system for modern business — one platform, one intelligence, everything a company needs. It’s crafted by Inkblot Studio, a design and engineering studio obsessed with the future of work."
      />

      {/* mission */}
      <Section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[var(--accent-hover)]">
                Mission
              </span>
              <p className="mt-4 text-[1.5rem] font-medium leading-snug tracking-[-0.01em] text-[var(--text-primary)] sm:text-[1.75rem]">
                To replace the chaos of disconnected tools with a single, intelligent system that runs the whole business.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[var(--accent-hover)]">
                Vision
              </span>
              <p className="mt-4 text-[1.5rem] font-medium leading-snug tracking-[-0.01em] text-[var(--text-primary)] sm:text-[1.75rem]">
                A world where every company runs on one intelligence — and the software finally understands the business it serves.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* timeline */}
      <Section className="border-t border-[var(--border-subtle)]">
        <SectionHeading eyebrow="The story" title={<>From frustration to operating system.</>} />
        <div className="relative mt-14 max-w-3xl">
          <div className="absolute left-0 top-2 h-full w-px bg-[var(--border-default)] sm:left-[88px]" aria-hidden />
          <div className="space-y-10">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.05}>
                <div className="relative flex flex-col gap-2 pl-8 sm:flex-row sm:gap-8 sm:pl-0">
                  <span className="font-mono text-[1.125rem] font-semibold text-[var(--accent-hover)] sm:w-[72px] sm:text-right">
                    {t.year}
                  </span>
                  <span
                    className="absolute left-[-5px] top-2 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-primary)] sm:left-[82px]"
                    aria-hidden
                  />
                  <div className="sm:flex-1 sm:pl-8">
                    <h3 className="text-[1.125rem] font-semibold text-[var(--text-primary)]">{t.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">{t.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* values */}
      <Section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <SectionHeading
          eyebrow="Values"
          align="center"
          title={<>The principles behind every decision.</>}
          className="mx-auto"
        />
        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <RevealItem key={v.title}>
                <div className="flex h-full flex-col rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-tertiary)] text-[var(--accent-hover)]">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-[1.0625rem] font-semibold text-[var(--text-primary)]">{v.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">{v.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* inkblot */}
      <Section className="border-t border-[var(--border-subtle)]">
        <div className="relative overflow-hidden rounded-[var(--radius-3xl)] border border-[var(--border-subtle)] bg-[var(--bg-inverse)] px-7 py-14 text-[var(--text-inverse)] sm:px-12 sm:py-16">
          <div aria-hidden className="absolute inset-0 bg-grid opacity-[0.12]" />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(217,188,88,0.2),transparent_70%)] blur-2xl"
          />
          <div className="relative max-w-2xl">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[var(--accent-bright)]">
              Built by Inkblot Studio
            </span>
            <h2 className="mt-4 text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[2.25rem]">
              A studio building the future of business software.
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#c7c5bd]">
              Inkblot Studio designs and engineers products at the intersection
              of craft and intelligence. Citron is our flagship — the system we
              believe every modern company will run on.
            </p>
            <a
              href={siteConfig.studio.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-[var(--accent-bright)] transition-colors hover:text-white"
            >
              Visit Inkblot Studio
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
