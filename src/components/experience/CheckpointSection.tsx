'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Checkpoint } from '@/lib/experience';
import { markerIndex, contentIndex } from '@/lib/experience';
import { useScene } from './ExperienceContext';
import { CheckpointMarker } from './CheckpointMarker';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

/**
 * One checkpoint: the milestone marker (a centered pause) followed by the
 * discovery itself — a short headline, a single floating insight, and a
 * bespoke visual — laid out around the central spine.
 */
export function CheckpointSection({
  cp,
  position,
  visual,
}: {
  cp: Checkpoint;
  position: number;
  visual: ReactNode;
}) {
  const markerRef = useScene(markerIndex(position));
  const contentRef = useScene(contentIndex(position));
  const textRight = cp.side === 'right';

  return (
    <section id={cp.id} aria-label={cp.title}>
      <div ref={markerRef}>
        <CheckpointMarker number={cp.number} title={cp.title} />
      </div>

      <div
        ref={contentRef}
        className="relative z-30 flex min-h-[92svh] items-center py-16"
      >
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:px-10">
          {/* Text */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
            className={cn(
              'scrim max-w-md',
              textRight ? 'lg:order-2 lg:justify-self-end' : 'lg:order-1'
            )}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.72rem] tabular-nums tracking-[0.2em] text-[var(--cine-amber)]">
                {cp.number}
              </span>
              <span className="h-px w-8 bg-[var(--cine-line)]" />
              <span className="eyebrow-cine text-[0.66rem] font-medium">{cp.title}</span>
            </div>

            <h3 className="mt-5 text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.03em] text-cine sm:text-[2.9rem]">
              <span className="gradient-amber">{cp.headline}</span>
            </h3>

            <p className="mt-4 text-[1.0625rem] leading-relaxed text-cine-dim">
              {cp.tagline}
            </p>

            {/* Floating insight */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
              className="mt-7 inline-flex items-center gap-3 rounded-full cine-card px-4 py-2"
            >
              <span className="font-mono text-[1.15rem] font-semibold tabular-nums text-[var(--cine-amber)]">
                {cp.insight.value}
              </span>
              <span className="text-[0.8rem] text-cine-dim">{cp.insight.label}</span>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <div
            className={cn(
              'relative flex items-center justify-center',
              textRight ? 'lg:order-1' : 'lg:order-2'
            )}
          >
            {visual}
          </div>
        </div>
      </div>
    </section>
  );
}
