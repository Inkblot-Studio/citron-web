'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

const tools = [
  { name: 'CRM', x: 12, y: 18 },
  { name: 'Slack', x: 70, y: 10 },
  { name: 'Notion', x: 42, y: 30 },
  { name: 'Trello', x: 84, y: 40 },
  { name: 'HubSpot', x: 22, y: 58 },
  { name: 'Sheets', x: 58, y: 64 },
  { name: 'Zapier', x: 8, y: 80 },
  { name: 'Analytics', x: 80, y: 78 },
  { name: 'Email', x: 46, y: 86 },
];

// connections by index — the tangled web
const links: [number, number][] = [
  [0, 2], [2, 1], [1, 3], [2, 4], [4, 5], [5, 6], [5, 7], [3, 7], [4, 8], [8, 7], [0, 4], [2, 5],
];

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // chaos grows: links fade in and jitter as you scroll through
  const linkOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0.15, 0.85]);
  const drift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 14]);

  return (
    <Section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <div ref={ref} className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="The problem"
            title={<>Your business runs on chaos you’ve learned to tolerate.</>}
            description="The average company juggles more than a hundred disconnected applications. Data fragments. Context evaporates between tabs. Every new tool adds another seam where work falls through."
          />
          <ul className="mt-8 space-y-4">
            {[
              'Five versions of the same customer, none of them current.',
              'Workflows that break the moment one tool changes.',
              'Knowledge trapped in the gaps between apps.',
            ].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 text-[0.9375rem] text-[var(--text-secondary)]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-error)]" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* tangled tool graph */}
        <div className="relative aspect-square w-full rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] p-2">
          <div className="bg-dots absolute inset-0 rounded-[var(--radius-2xl)] opacity-50" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {links.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={tools[a].x}
                y1={tools[a].y}
                x2={tools[b].x}
                y2={tools[b].y}
                stroke="var(--color-error)"
                strokeWidth="0.3"
                strokeDasharray="1.5 1.5"
                style={{ opacity: linkOpacity }}
              />
            ))}
          </svg>
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${tool.x}%`, top: `${tool.y}%`, y: i % 2 === 0 ? drift : undefined }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="whitespace-nowrap rounded-full border border-[var(--border-default)] bg-[var(--surface-card)] px-2.5 py-1 text-[0.6875rem] font-medium text-[var(--text-secondary)] shadow-[var(--shadow-xs)]">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
