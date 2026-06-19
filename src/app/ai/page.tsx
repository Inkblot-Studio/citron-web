import type { Metadata } from 'next';
import { ArrowRight, Bot, Workflow, MessagesSquare, BookOpen, LineChart, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CommandConsole } from '@/components/sections/CommandConsole';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'AI',
  description:
    'Citron AI acts across your business — autonomous agents, AI workflows, chatbots, a knowledge engine, and predictive analytics, all grounded in your real data.',
  alternates: { canonical: '/ai' },
};

const capabilities = [
  {
    icon: Bot,
    name: 'AI Agents',
    desc: 'Autonomous teammates that qualify leads, draft replies, update records, and close loops — inside your guardrails.',
  },
  {
    icon: Workflow,
    name: 'AI Workflows',
    desc: 'Describe an outcome and Citron assembles the automation across every module. Logic that writes itself.',
  },
  {
    icon: MessagesSquare,
    name: 'AI Chatbots',
    desc: 'Customer-facing assistants that answer from your knowledge and your data, then hand off cleanly when needed.',
  },
  {
    icon: BookOpen,
    name: 'Knowledge Engine',
    desc: 'Everything your company knows, searchable and surfaced in context. Onboard faster, decide sharper.',
  },
  {
    icon: LineChart,
    name: 'Predictive Analytics',
    desc: 'Forecast revenue, flag deals at risk, and spot anomalies before they cost you — explained in plain language.',
  },
  {
    icon: ShieldCheck,
    name: 'Governed & Safe',
    desc: 'Permissions, approvals, and full audit trails. AI acts with leverage you can actually trust.',
  },
];

const principles = [
  {
    n: '01',
    title: 'Grounded, not guessing',
    body: 'Every action runs on your real records — customers, pipeline, books, knowledge. Outputs trace back to their source.',
  },
  {
    n: '02',
    title: 'Acts, not just answers',
    body: 'Citron AI does the work: it creates the invoice, drafts the follow-ups, updates the deal. Conversation is only the start.',
  },
  {
    n: '03',
    title: 'Guardrails by design',
    body: 'You decide what runs automatically and what waits for a human. Consequential actions require explicit approval.',
  },
];

export default function AiPage() {
  return (
    <>
      <PageHero
        eyebrow="The AI layer"
        title={
          <>
            Intelligence that doesn’t just answer.{' '}
            <span className="gradient-citron">It acts.</span>
          </>
        }
        description="Citron AI lives inside every module, grounded in your real data. Ask in plain language and watch it execute across your entire business — safely, and at the speed of thought."
      >
        <Button href="/demo" size="lg">
          See it live
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button href="/platform" variant="secondary" size="lg">
          Explore the platform
        </Button>
      </PageHero>

      <Section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="mb-8 text-center text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
              A real conversation with your business
            </p>
          </Reveal>
          <CommandConsole />
        </div>
      </Section>

      <Section className="border-t border-[var(--border-subtle)]">
        <SectionHeading
          eyebrow="Capabilities"
          align="center"
          title={<>One intelligence, many forms.</>}
          description="From autonomous agents to predictive insight, every expression of AI in Citron draws on the same unified understanding of your company."
          className="mx-auto"
        />
        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <RevealItem key={c.name}>
                <div className="flex h-full flex-col rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-7 shadow-[var(--shadow-xs)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-md)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-tertiary)] text-[var(--accent-hover)]">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-[1.125rem] font-semibold text-[var(--text-primary)]">{c.name}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">{c.desc}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <Section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <SectionHeading
          eyebrow="How it works"
          title={<>Responsibility you can hand over.</>}
          description="Useful AI isn’t measured by how well it talks. It’s measured by how much it does — safely."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <div className="border-t-2 border-[var(--accent)] pt-5">
                <span className="font-mono text-[0.8125rem] text-[var(--accent-hover)]">{p.n}</span>
                <h3 className="mt-2 text-[1.125rem] font-semibold text-[var(--text-primary)]">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Put your business on autopilot."
        description="See how Citron AI works across your real workflows in a personalized demo."
      />
    </>
  );
}
