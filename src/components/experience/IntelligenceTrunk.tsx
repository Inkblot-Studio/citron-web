'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';

const NODES = [0.12, 0.24, 0.36, 0.48, 0.6, 0.72, 0.84, 0.94];
const FRAGMENTS = [
  { t: '{ }', top: '15%', dx: 34, d: 7 },
  { t: '01', top: '28%', dx: -42, d: 8.5 },
  { t: 'sync()', top: '43%', dx: 48, d: 7.5 },
  { t: 'AI', top: '57%', dx: -38, d: 9 },
  { t: '→', top: '70%', dx: 40, d: 8 },
  { t: '{…}', top: '85%', dx: -46, d: 7.8 },
];

/**
 * The digital intelligence trunk — a living AI spine down the center of the
 * experience. Faint until you travel; scrolling fills it with light, energy
 * streams downward, code fragments drift up from the data, system pulses
 * race the depths, and nodes ignite as you pass them.
 */
export function IntelligenceTrunk() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const headTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-1/2 z-10 w-0 -translate-x-1/2 opacity-80 sm:opacity-100"
    >
      {/* Faint base rail */}
      <div
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, var(--cine-line) 8%, var(--cine-line) 92%, transparent 100%)',
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
              'linear-gradient(to bottom, transparent 0%, var(--cine-amber-bright) 14%, var(--cine-amber-deep) 100%)',
            boxShadow: '0 0 14px 1px rgba(var(--cine-particle),0.55)',
          }}
        />
        {!reduce && (
          <div
            className="absolute inset-x-[-1px] top-0 h-[300%]"
            style={{
              background:
                'repeating-linear-gradient(to bottom, transparent 0 16px, rgba(var(--cine-particle),0.9) 16px 22px, transparent 22px 60px)',
              animation: 'trunk-flow 1.6s linear infinite',
            }}
          />
        )}
      </motion.div>

      {/* Descending system pulses */}
      {!reduce &&
        [0, 1].map((i) => (
          <span
            key={i}
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
            style={{
              background: 'var(--cine-amber-bright)',
              boxShadow: '0 0 12px 3px rgba(var(--cine-particle),0.7)',
              animation: `pulse-down ${5 + i * 1.5}s linear ${i * 2.4}s infinite`,
            }}
          />
        ))}

      {/* Rising code fragments from the data */}
      {!reduce &&
        FRAGMENTS.map((f) => (
          <span
            key={f.t + f.top}
            className="absolute font-mono text-[0.6rem] text-[var(--cine-amber)]"
            style={{
              left: `calc(50% + ${f.dx}px)`,
              top: f.top,
              transform: 'translateX(-50%)',
              ['--rise-distance' as string]: '-90px',
              ['--rise-opacity' as string]: '0.22',
              animation: `data-rise ${f.d}s ease-out ${(f.d % 3).toFixed(1)}s infinite`,
            }}
          >
            {f.t}
          </span>
        ))}

      {/* Travelling luminous head */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ top: headTop }}
      >
        <div className="relative">
          <div
            className="h-3 w-3 rounded-full"
            style={{
              background: 'var(--cine-amber-soft)',
              boxShadow: '0 0 24px 6px rgba(var(--cine-particle),0.85)',
            }}
          />
          {!reduce && (
            <span
              className="absolute inset-0 rounded-full border border-[var(--cine-amber-bright)]"
              style={{ animation: 'ring-expand 1.8s ease-out infinite' }}
            />
          )}
        </div>
      </motion.div>

      {/* Igniting nodes */}
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
      <motion.span
        className="absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 origin-center"
        style={{
          scaleX: branch,
          background:
            'linear-gradient(to right, transparent, rgba(var(--cine-particle),0.5), transparent)',
        }}
      />
      <motion.span
        className="block h-2.5 w-2.5 rounded-full bg-[var(--cine-amber-soft)]"
        style={{
          opacity: glow,
          scale,
          boxShadow: '0 0 16px 3px rgba(var(--cine-particle),0.7)',
        }}
      />
    </div>
  );
}
