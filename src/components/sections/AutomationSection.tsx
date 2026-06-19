'use client';

import { motion } from 'framer-motion';
import { Zap, GitBranch, Play, CheckCircle2, ArrowDown } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { viewportOnce } from '@/lib/motion';

const steps = [
  {
    kind: 'Trigger',
    icon: Zap,
    title: 'A new lead fills out the demo form',
    tint: 'var(--accent)',
  },
  {
    kind: 'Condition',
    icon: GitBranch,
    title: 'If company size is over 50 employees',
    tint: 'var(--color-info)',
  },
  {
    kind: 'Action',
    icon: Play,
    title: 'Route to enterprise rep · draft a tailored intro · create a deal',
    tint: 'var(--color-warning)',
  },
  {
    kind: 'Outcome',
    icon: CheckCircle2,
    title: 'Meeting booked, pipeline updated, team notified',
    tint: 'var(--color-success)',
  },
];

export function AutomationSection() {
  return (
    <Section className="border-t border-[var(--border-subtle)]">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-2">
          <SectionHeading
            eyebrow="Automation"
            title={<>Describe the outcome. Citron builds the workflow.</>}
            description="No flowchart spaghetti. State what you want in plain language and Citron assembles the triggers, conditions, and actions — across every module — then runs them while you sleep."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {['Triggers', 'Conditions', 'Actions', 'Outcomes', 'Human-in-the-loop'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-1.5 text-[0.8125rem] font-medium text-[var(--text-secondary)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative lg:order-1">
          <div className="rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 shadow-[var(--shadow-lg)] sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[0.8125rem] font-medium text-[var(--text-secondary)]">
                Lead routing
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-success)]/12 px-2.5 py-1 text-[0.6875rem] font-medium text-[var(--color-success)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
                Live
              </span>
            </div>

            <div className="flex flex-col">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.kind}>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewportOnce}
                      transition={{ delay: i * 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-3.5"
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)]"
                        style={{ backgroundColor: 'color-mix(in srgb, ' + step.tint + ' 14%, transparent)', color: step.tint }}
                      >
                        <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em]" style={{ color: step.tint }}>
                          {step.kind}
                        </p>
                        <p className="mt-0.5 text-[0.875rem] leading-snug text-[var(--text-primary)]">
                          {step.title}
                        </p>
                      </div>
                    </motion.div>
                    {i < steps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        whileInView={{ opacity: 1, scaleY: 1 }}
                        viewport={viewportOnce}
                        transition={{ delay: i * 0.18 + 0.12, duration: 0.3 }}
                        className="flex justify-center py-1.5"
                        style={{ transformOrigin: 'top' }}
                      >
                        <ArrowDown className="h-4 w-4 text-[var(--border-strong)]" />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
