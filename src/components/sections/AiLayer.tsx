'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CommandConsole } from './CommandConsole';

function NeuralField() {
  // lightweight decorative neural mesh
  const nodes = [
    [10, 20], [30, 12], [52, 28], [74, 16], [90, 34],
    [18, 60], [40, 72], [62, 58], [84, 70], [50, 90],
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [2, 6], [6, 7], [7, 8], [4, 8], [6, 9], [7, 9],
  ];
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.5]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="var(--accent)"
          strokeWidth="0.15"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: i * 0.06, ease: 'easeInOut' }}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="0.6"
          fill="var(--accent)"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
    </svg>
  );
}

export function AiLayer() {
  return (
    <Section
      id="ai"
      className="relative overflow-hidden border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <NeuralField />
      </div>

      <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="The AI layer"
            title={
              <>
                Every module, powered by an intelligence that{' '}
                <span className="gradient-citron">acts</span>.
              </>
            }
            description="Citron’s AI doesn’t just store your data — it understands it and does the work. Ask in plain language. Watch it execute across CRM, finance, marketing, and more, grounded in your real records."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              'Grounded in your data',
              'Acts across every module',
              'Guardrails & approvals',
              'Always learning',
            ].map((f) => (
              <li
                key={f}
                className="flex items-center gap-2.5 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3.5 py-2.5 text-[0.875rem] font-medium text-[var(--text-secondary)]"
              >
                <Sparkles className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <CommandConsole />
      </div>
    </Section>
  );
}
