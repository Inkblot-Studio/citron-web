'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useScene } from './ExperienceContext';
import { CITRON_INDEX } from '@/lib/experience';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The climax. The journey converges: the mascot returns to full scale at
 * center (via MascotStage) and resolves into the Citron wordmark and the one
 * destination the whole experience leads to — Book a Demo.
 */
export function CitronFinale() {
  const ref = useScene<HTMLElement>(CITRON_INDEX);
  const reduce = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative z-30 flex min-h-[110svh] flex-col items-center justify-end pb-[12vh] text-center"
    >
      {/* convergent burst */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: EASE }}
        style={{
          background:
            'radial-gradient(circle, rgba(var(--cine-particle),0.2), transparent 62%)',
        }}
      />

      <motion.div
        className="scrim px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="eyebrow-cine text-[0.72rem] font-medium">Everything, unified</p>

        <h2 className="mt-5 text-[3.5rem] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-[6rem] lg:text-[8rem]">
          <span className="gradient-amber amber-glow">Citron</span>
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-[1.25rem] font-medium tracking-[-0.01em] text-cine sm:text-[1.6rem]">
          The Business Operating System.
        </p>

        <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-cine-dim">
          You’ve seen the whole company in one place. Now see it on yours.
        </p>

        {/* extraordinary CTA */}
        <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <div className="relative">
            {!reduce && (
              <span
                aria-hidden
                className="absolute inset-0 rounded-[var(--radius-lg)]"
                style={{
                  boxShadow: '0 0 0 1px rgba(var(--cine-particle),0.5)',
                  animation: 'pulse-glow 2.6s var(--ease-in-out-soft) infinite',
                }}
              />
            )}
            <Link
              href="/demo"
              className="group relative inline-flex h-[3.75rem] items-center justify-center gap-2 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--cine-amber-bright)] px-9 text-[1.125rem] font-semibold text-[#1d1c19] shadow-[0_10px_40px_-8px_rgba(var(--cine-particle),0.8)] transition-all duration-200 hover:brightness-105"
            >
              <span className="shimmer pointer-events-none absolute inset-0 opacity-60" />
              <span className="relative">Book a Demo</span>
              <ArrowRight className="relative h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
          <Link
            href="#why"
            className="inline-flex h-[3.75rem] items-center justify-center rounded-[var(--radius-lg)] border border-[var(--cine-line)] px-8 text-[1.0625rem] font-medium text-cine transition-colors duration-200 hover:border-[var(--cine-amber-bright)]"
          >
            Explore again
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
