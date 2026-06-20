'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;
const R = 46;
const C = 2 * Math.PI * R;

/**
 * A milestone the visitor reaches. Calm, centered, and slow — the motion
 * settles, a progress ring completes, and the layer is named before the
 * journey continues deeper.
 */
export function CheckpointMarker({
  number,
  title,
  total = '10',
}: {
  number: string;
  title: string;
  total?: string;
}) {
  const reduce = useReducedMotion();
  const frac = parseInt(number, 10) / parseInt(total, 10);

  return (
    <div className="relative z-30 flex min-h-[72svh] flex-col items-center justify-center text-center">
      <motion.div
        className="scrim flex flex-col items-center px-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <span className="eyebrow-cine text-[0.7rem] font-medium">Checkpoint</span>

        <div className="relative mt-6 flex h-32 w-32 items-center justify-center">
          <svg viewBox="0 0 110 110" className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              cx="55"
              cy="55"
              r={R}
              fill="none"
              stroke="var(--cine-line)"
              strokeWidth="2"
            />
            <motion.circle
              cx="55"
              cy="55"
              r={R}
              fill="none"
              stroke="var(--cine-amber-bright)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              whileInView={{ strokeDashoffset: C * (1 - frac) }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduce ? 0 : 1.2, ease: EASE, delay: 0.2 }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(var(--cine-particle),0.5))' }}
            />
          </svg>
          <div className="flex items-baseline font-mono tabular-nums">
            <span className="text-[2.5rem] font-semibold tracking-tight text-cine">
              {number}
            </span>
            <span className="ml-1 text-[0.9rem] text-cine-faint">/ {total}</span>
          </div>
        </div>

        <h2 className="mt-7 text-[1.75rem] font-semibold tracking-[-0.02em] text-cine sm:text-[2.25rem]">
          {title}
        </h2>
      </motion.div>
    </div>
  );
}
