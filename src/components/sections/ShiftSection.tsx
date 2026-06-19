'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { Mascot } from '@/components/ui/Logo';
import { Eyebrow } from '@/components/ui/SectionHeading';

const SCATTER = [
  { x: -260, y: -150 }, { x: 240, y: -180 }, { x: -300, y: 60 },
  { x: 300, y: 30 }, { x: -180, y: 190 }, { x: 200, y: 200 },
  { x: -80, y: -230 }, { x: 90, y: -210 }, { x: -340, y: -40 },
  { x: 340, y: 150 },
];

function ConvergingNode({
  target,
  progress,
  index,
}: {
  target: { x: number; y: number };
  progress: MotionValue<number>;
  index: number;
}) {
  const x = useTransform(progress, [0, 0.85], [target.x, 0]);
  const y = useTransform(progress, [0, 0.85], [target.y, 0]);
  const opacity = useTransform(progress, [0, 0.55, 0.85], [0.9, 0.7, 0]);
  const scale = useTransform(progress, [0, 0.85], [1, 0.3]);

  return (
    <motion.span
      className="absolute left-1/2 top-1/2 h-3 w-3 rounded-[4px] border border-[var(--border-strong)] bg-[var(--surface-card)]"
      style={{ x, y, opacity, scale, translateX: '-50%', translateY: '-50%' }}
      aria-hidden
      transition={{ delay: index * 0.01 }}
    />
  );
}

export function ShiftSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const coreScale = useTransform(scrollYProgress, [0.4, 0.95], [0.4, 1]);
  const coreOpacity = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);
  const labelOpacity = useTransform(scrollYProgress, [0.7, 0.95], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.7, 0.95], [20, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  if (reduce) {
    return (
      <section className="relative bg-[var(--bg-primary)] py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Eyebrow>The shift</Eyebrow>
          <h2 className="mt-4 text-[2.5rem] font-semibold leading-tight tracking-[-0.03em]">
            From many tools to one intelligence.
          </h2>
          <div className="mx-auto mt-10 flex h-28 w-28 items-center justify-center rounded-[var(--radius-2xl)] border border-[var(--border-default)] bg-[var(--surface-elevated)] text-[var(--accent)] shadow-[var(--shadow-xl)]">
            <Mascot className="h-12 w-12" animate={false} />
          </div>
          <p className="mt-8 text-lg text-[var(--text-secondary)]">
            Disconnected systems collapse into a single, intelligent core.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[280vh] bg-[var(--bg-primary)]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* intro line */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="absolute top-[18%] left-1/2 -translate-x-1/2 text-center"
        >
          <Eyebrow>The shift</Eyebrow>
        </motion.div>

        {/* converging field */}
        <div className="relative h-0 w-0">
          {SCATTER.map((t, i) => (
            <ConvergingNode key={i} target={t} progress={scrollYProgress} index={i} />
          ))}

          {/* core */}
          <motion.div
            style={{ scale: coreScale, opacity: coreOpacity }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative flex h-32 w-32 items-center justify-center rounded-[var(--radius-2xl)] border border-[var(--border-default)] bg-[var(--surface-elevated)] text-[var(--accent)] shadow-[var(--shadow-xl)] glow-citron">
              <Mascot className="h-14 w-14" />
            </div>
          </motion.div>
        </div>

        {/* resolution label */}
        <motion.div
          style={{ opacity: labelOpacity, y: labelY }}
          className="absolute bottom-[16%] left-1/2 w-full max-w-2xl -translate-x-1/2 px-6 text-center"
        >
          <h2 className="text-[2.25rem] font-semibold leading-tight tracking-[-0.03em] text-[var(--text-primary)] sm:text-[3rem]">
            One system. <span className="gradient-citron">One intelligence.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[1.0625rem] text-[var(--text-secondary)]">
            Everything your business does, unified into a single core that
            understands the whole picture — and acts on it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
