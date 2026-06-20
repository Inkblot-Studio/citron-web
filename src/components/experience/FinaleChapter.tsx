'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The arrival. Everything converges on the core: the mascot returns to
 * center at full scale (via MascotStage) and the experience resolves into
 * the Citron wordmark, its promise, and the single destination — Book a Demo.
 */
export function FinaleChapter() {
  return (
    <section className="relative z-30 flex min-h-[110svh] flex-col items-center justify-end pb-[12vh] text-center">
      {/* convergent burst */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: EASE }}
        style={{
          background:
            'radial-gradient(circle, rgba(217,188,88,0.18), transparent 62%)',
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

        <h2 className="mt-5 text-[3.5rem] font-semibold leading-[0.95] tracking-[-0.05em] text-cine sm:text-[6rem] lg:text-[8rem]">
          <span className="gradient-amber amber-glow">Citron</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-[1.25rem] font-medium tracking-[-0.01em] text-cine sm:text-[1.6rem]">
          The Business Operating System.
        </p>

        <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-cine-dim">
          One platform. One intelligence. Everything a company needs — and a
          single place to begin.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/demo"
            className="group inline-flex h-[3.5rem] items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--cine-amber)] px-8 text-[1.0625rem] font-semibold text-[#1d1c19] shadow-[0_6px_30px_-6px_rgba(217,188,88,0.7)] transition-all duration-200 hover:bg-[var(--cine-amber-soft)] hover:shadow-[0_10px_40px_-8px_rgba(217,188,88,0.8)]"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href="#unification"
            className="inline-flex h-[3.5rem] items-center justify-center rounded-[var(--radius-lg)] border border-[var(--cine-line)] px-8 text-[1.0625rem] font-medium text-cine transition-colors duration-200 hover:border-[var(--cine-amber)] hover:text-[#f3e3a6]"
          >
            Explore again
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
