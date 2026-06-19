'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { pricingPlans } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

export function PricingCards() {
  const [annual, setAnnual] = useState(true);

  return (
    <div>
      {/* billing toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className={cn('text-[0.875rem] font-medium', !annual ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]')}>
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={annual}
          aria-label="Toggle annual billing"
          onClick={() => setAnnual((v) => !v)}
          className={cn(
            'relative h-7 w-12 rounded-full border border-[var(--border-default)] transition-colors duration-200',
            annual ? 'bg-[var(--accent)]' : 'bg-[var(--bg-tertiary)]'
          )}
        >
          <motion.span
            className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow-sm"
            animate={{ left: annual ? '1.6rem' : '0.2rem' }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          />
        </button>
        <span className={cn('text-[0.875rem] font-medium', annual ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]')}>
          Annual
        </span>
        <span className="rounded-full bg-[var(--accent)]/15 px-2 py-0.5 text-[0.6875rem] font-semibold text-[var(--accent-hover)]">
          Save 20%
        </span>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {pricingPlans.map((plan, i) => {
          const price = annual ? plan.price.annual : plan.price.monthly;
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'relative flex flex-col rounded-[var(--radius-2xl)] border p-7 transition-all duration-300',
                plan.highlighted
                  ? 'border-[var(--accent)]/50 bg-[var(--surface-card)] shadow-[var(--shadow-lg)] glow-citron lg:-mt-4 lg:mb-4'
                  : 'border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-[var(--shadow-xs)]'
              )}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#1d1c19]">
                  Most popular
                </span>
              )}
              <h3 className="text-[1.25rem] font-semibold text-[var(--text-primary)]">{plan.name}</h3>
              <p className="mt-1.5 min-h-[2.5rem] text-[0.875rem] leading-snug text-[var(--text-secondary)]">
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline gap-1.5">
                {price === null ? (
                  <span className="text-[2.5rem] font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                    Custom
                  </span>
                ) : (
                  <>
                    <span className="text-[2.75rem] font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                      ${price}
                    </span>
                    <span className="text-[0.875rem] text-[var(--text-muted)]">{plan.cadence}</span>
                  </>
                )}
              </div>

              <div className="mt-6">
                <Button
                  href={plan.cta.href}
                  variant={plan.highlighted ? 'primary' : 'secondary'}
                  className="w-full"
                  magnetic={false}
                >
                  {plan.cta.label}
                </Button>
              </div>

              <ul className="mt-7 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[0.875rem] text-[var(--text-secondary)]">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent-hover)]">
                      <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
