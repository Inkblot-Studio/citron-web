'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';

const NODES = [0.1, 0.21, 0.32, 0.43, 0.54, 0.65, 0.76, 0.9];

/**
 * The digital intelligence trunk — a vertical AI spine running down the
 * center of the experience. It is faint until you travel: scrolling fills
 * it with light from the top, energy flows downward through the active
 * span, nodes ignite as you pass them, and a luminous head leads the way.
 */
export function IntelligenceTrunk() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const headTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-1/2 z-10 w-0 -translate-x-1/2 opacity-70 sm:opacity-100"
    >
      {/* Faint base rail */}
      <div
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(217,188,88,0.18) 8%, rgba(217,188,88,0.18) 92%, transparent 100%)',
        }}
      />

      {/* Bright fill that grows from the top with scroll */}
      <motion.div
        className="absolute left-1/2 top-0 w-px -translate-x-1/2 origin-top overflow-hidden"
        style={{ height: '100%', scaleY: scrollYProgress }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(232,211,138,0.0) 0%, rgba(217,188,88,0.9) 14%, rgba(196,160,48,0.7) 100%)',
            boxShadow: '0 0 14px 1px rgba(217,188,88,0.55)',
          }}
        />
        {/* downward energy flow */}
        {!reduce && (
          <div
            className="absolute inset-x-[-1px] top-0 h-[300%]"
            style={{
              background:
                'repeating-linear-gradient(to bottom, transparent 0 16px, rgba(255,244,205,0.85) 16px 22px, transparent 22px 60px)',
              animation: 'trunk-flow 1.6s linear infinite',
            }}
          />
        )}
      </motion.div>

      {/* Travelling luminous head */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ top: headTop }}
      >
        <div className="relative">
          <div
            className="h-3 w-3 rounded-full bg-[#fff4cd]"
            style={{ boxShadow: '0 0 24px 6px rgba(217,188,88,0.85)' }}
          />
          {!reduce && (
            <span
              className="absolute inset-0 rounded-full border border-[#e8d38a]"
              style={{ animation: 'ring-expand 1.8s ease-out infinite' }}
            />
          )}
        </div>
      </motion.div>

      {/* Igniting chapter nodes */}
      {NODES.map((p) => (
        <TrunkNode key={p} p={p} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function TrunkNode({ p, progress }: { p: number; progress: MotionValue<number> }) {
  const glow = useTransform(progress, [p - 0.05, p], [0.16, 1]);
  const scale = useTransform(progress, [p - 0.05, p], [0.7, 1]);
  const branch = useTransform(progress, [p - 0.04, p + 0.02], [0, 1]);

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ top: `${p * 100}%` }}
    >
      {/* branch ticks */}
      <motion.span
        className="absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 origin-center"
        style={{
          scaleX: branch,
          background:
            'linear-gradient(to right, transparent, rgba(217,188,88,0.5), transparent)',
        }}
      />
      <motion.span
        className="block h-2.5 w-2.5 rounded-full bg-[#e8d38a]"
        style={{
          opacity: glow,
          scale,
          boxShadow: '0 0 16px 3px rgba(217,188,88,0.7)',
        }}
      />
    </div>
  );
}
