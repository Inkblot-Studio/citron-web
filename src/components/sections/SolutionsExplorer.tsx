'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { solutions } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

export function SolutionsExplorer() {
  const [active, setActive] = useState(0);
  const sol = solutions[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
      {/* tabs */}
      <div
        className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
        role="tablist"
        aria-label="Solutions by team"
      >
        {solutions.map((s, i) => (
          <button
            key={s.slug}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              'relative shrink-0 rounded-[var(--radius-lg)] px-4 py-3 text-left text-[0.9375rem] font-medium transition-colors duration-200 lg:shrink',
              i === active
                ? 'text-[var(--text-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
          >
            {i === active && (
              <motion.span
                layoutId="sol-active"
                className="absolute inset-0 -z-10 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-[var(--shadow-xs)]"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            {s.audience}
          </button>
        ))}
      </div>

      {/* panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={sol.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-7 shadow-[var(--shadow-sm)] sm:p-10"
        >
          <span className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[var(--accent-hover)]">
            For {sol.audience}
          </span>
          <h3 className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-[var(--text-primary)] sm:text-[2rem]">
            {sol.headline}
          </h3>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-[var(--text-secondary)]">
            {sol.description}
          </p>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                Outcomes
              </h4>
              <ul className="mt-3 space-y-2.5">
                {sol.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-[0.9375rem] text-[var(--text-secondary)]">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent-hover)]">
                      <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                Key modules
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {sol.modules.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] px-3 py-1.5 text-[0.8125rem] font-medium text-[var(--text-secondary)]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-9">
            <Button href="/demo">
              Book a demo for {sol.audience.toLowerCase()}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
