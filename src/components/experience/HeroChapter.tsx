'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The entry point of the journey. The mascot floats at center (rendered by
 * MascotStage); the hero contributes only a whispered headline below it and
 * an invitation to descend. Minimal by design.
 */
export function HeroChapter() {
  const reduce = useReducedMotion();

  return (
    <section className="relative z-30 flex min-h-[100svh] flex-col items-center justify-end pb-[16vh] text-center">
      <div className="scrim px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="eyebrow-cine text-[0.72rem] font-medium"
        >
          The Business Operating System
        </motion.p>

        <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.04em] text-cine sm:text-[4rem] lg:text-[4.75rem]">
          <Line delay={0.5}>Your company.</Line>
          <Line delay={0.68} className="gradient-amber">
            One intelligence.
          </Line>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="mx-auto mt-6 max-w-md text-[1.0625rem] leading-relaxed text-cine-dim"
        >
          One living system for everything your business runs on. Scroll to
          descend through the mind of Citron.
        </motion.p>
      </div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-[1.35rem] items-start justify-center rounded-full border border-[var(--cine-line)] p-1">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-[var(--cine-amber)]"
            animate={reduce ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function Line({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={className ? `inline-block ${className}` : 'inline-block'}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
