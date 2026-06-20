'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { useTheme } from '@/components/effects/ThemeProvider';

const LEVELS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
const FRAGMENTS = [
  { t: '{ }', top: '13%', dx: 70, d: 7 },
  { t: '01', top: '24%', dx: -90, d: 8.5 },
  { t: 'sync()', top: '37%', dx: 96, d: 7.5 },
  { t: 'AI', top: '49%', dx: -64, d: 9 },
  { t: '→', top: '61%', dx: 80, d: 8 },
  { t: 'agent.run()', top: '72%', dx: -96, d: 8.2 },
  { t: '{…}', top: '85%', dx: 58, d: 7.8 },
];

/**
 * The digital intelligence trunk — a massive, living AI spine you travel
 * through. A luminous core fills with scroll; parallel strands give depth;
 * branch circuits reach outward and ignite as you pass; particles stream
 * down it; code fragments drift up from the data; pulses race the depths.
 */
export function IntelligenceTrunk() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const headTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-1/2 z-10 w-[clamp(160px,26vw,360px)] -translate-x-1/2 opacity-90"
    >
      {/* Soft luminous mass */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(var(--cine-particle),0.06) 12%, rgba(var(--cine-particle),0.06) 88%, transparent 100%)',
          filter: 'blur(34px)',
        }}
      />

      {/* Flowing data particles */}
      <TrunkParticles reduce={!!reduce} />

      {/* Depth strands */}
      <Strand offset={-58} variant="faint" reduce={!!reduce} />
      <Strand offset={58} variant="faint" reduce={!!reduce} />
      <Strand offset={-28} variant="mid" reduce={!!reduce} />
      <Strand offset={28} variant="mid" reduce={!!reduce} />
      <Strand offset={0} variant="core" reduce={!!reduce} progress={scrollYProgress} />

      {/* Branch circuits */}
      {LEVELS.map((p) => (
        <TrunkLevel key={p} p={p} progress={scrollYProgress} />
      ))}

      {/* Rising code fragments */}
      {!reduce &&
        FRAGMENTS.map((f) => (
          <span
            key={f.t + f.top}
            className="absolute font-mono text-[0.6rem] text-[var(--cine-amber)]"
            style={{
              left: `calc(50% + ${f.dx}px)`,
              top: f.top,
              transform: 'translateX(-50%)',
              ['--rise-distance' as string]: '-110px',
              ['--rise-opacity' as string]: '0.24',
              animation: `data-rise ${f.d}s ease-out ${(f.d % 3).toFixed(1)}s infinite`,
            }}
          >
            {f.t}
          </span>
        ))}

      {/* Descending system pulses */}
      {!reduce &&
        [0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
            style={{
              background: 'var(--cine-amber-bright)',
              boxShadow: '0 0 12px 3px rgba(var(--cine-particle),0.7)',
              animation: `pulse-down ${5 + i * 1.4}s linear ${i * 1.8}s infinite`,
            }}
          />
        ))}

      {/* Travelling luminous head */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ top: headTop }}
      >
        <div className="relative">
          <div
            className="h-4 w-4 rounded-full"
            style={{
              background: 'var(--cine-amber-soft)',
              boxShadow: '0 0 28px 8px rgba(var(--cine-particle),0.85)',
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
    </div>
  );
}

function Strand({
  offset,
  variant,
  reduce,
  progress,
}: {
  offset: number;
  variant: 'core' | 'mid' | 'faint';
  reduce: boolean;
  progress?: MotionValue<number>;
}) {
  const left = `calc(50% + ${offset}px)`;

  if (variant === 'core' && progress) {
    return (
      <motion.div
        className="absolute top-0 w-[2px] origin-top -translate-x-1/2 overflow-hidden"
        style={{ left, height: '100%', scaleY: progress }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, var(--cine-amber-bright) 12%, var(--cine-amber-deep) 100%)',
            boxShadow: '0 0 16px 1px rgba(var(--cine-particle),0.6)',
          }}
        />
        {!reduce && (
          <div
            className="absolute inset-x-[-1px] top-0 h-[300%]"
            style={{
              background:
                'repeating-linear-gradient(to bottom, transparent 0 16px, rgba(var(--cine-particle),0.9) 16px 22px, transparent 22px 60px)',
              animation: 'trunk-flow 1.5s linear infinite',
            }}
          />
        )}
      </motion.div>
    );
  }

  const speed = variant === 'mid' ? 2.2 : 3;
  const op = variant === 'mid' ? 0.7 : 0.45;
  return (
    <div
      className="absolute top-0 h-full w-px -translate-x-1/2"
      style={{
        left,
        opacity: op,
        background:
          'linear-gradient(to bottom, transparent 6%, var(--cine-line) 14%, var(--cine-line) 86%, transparent 94%)',
      }}
    >
      {!reduce && (
        <div
          className="absolute inset-x-[-1px] top-0 h-[300%]"
          style={{
            background:
              'repeating-linear-gradient(to bottom, transparent 0 24px, rgba(var(--cine-particle),0.45) 24px 28px, transparent 28px 84px)',
            animation: `trunk-flow ${speed}s linear infinite`,
          }}
        />
      )}
    </div>
  );
}

function TrunkLevel({ p, progress }: { p: number; progress: MotionValue<number> }) {
  const glow = useTransform(progress, [p - 0.05, p], [0.12, 1]);
  const draw = useTransform(progress, [p - 0.04, p + 0.02], [0, 1]);
  const scale = useTransform(progress, [p - 0.05, p], [0.6, 1]);

  return (
    <div
      className="absolute left-0 w-full -translate-y-1/2"
      style={{ top: `${p * 100}%` }}
    >
      {/* circuit traces */}
      <motion.span
        className="absolute right-1/2 top-1/2 h-px w-[42%] origin-right -translate-y-1/2"
        style={{
          scaleX: draw,
          background: 'linear-gradient(to left, rgba(var(--cine-particle),0.6), transparent)',
        }}
      />
      <motion.span
        className="absolute left-1/2 top-1/2 h-px w-[42%] origin-left -translate-y-1/2"
        style={{
          scaleX: draw,
          background: 'linear-gradient(to right, rgba(var(--cine-particle),0.6), transparent)',
        }}
      />
      {/* end nodes */}
      <motion.span
        className="absolute left-[8%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[var(--cine-amber-soft)]"
        style={{ opacity: glow, scale, boxShadow: '0 0 10px 2px rgba(var(--cine-particle),0.55)' }}
      />
      <motion.span
        className="absolute right-[8%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[var(--cine-amber-soft)]"
        style={{ opacity: glow, scale, boxShadow: '0 0 10px 2px rgba(var(--cine-particle),0.55)' }}
      />
      {/* core node */}
      <motion.span
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--cine-amber-bright)]"
        style={{ opacity: glow, scale, boxShadow: '0 0 16px 3px rgba(var(--cine-particle),0.7)' }}
      />
    </div>
  );
}

/** Confined particle stream flowing down the trunk. */
function TrunkParticles({ reduce }: { reduce: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rgb = theme === 'dark' ? '217,188,88' : '176,138,30';
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;

    type P = { x: number; y: number; r: number; v: number; a: number };
    let parts: P[] = [];

    function seed() {
      const count = Math.min(34, Math.round((w * h) / 24000));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.4,
        v: Math.random() * 0.9 + 0.4,
        a: Math.random() * 0.5 + 0.15,
      }));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function frame() {
      if (!running) return;
      ctx!.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y += p.v;
        if (p.y > h + 8) {
          p.y = -8;
          p.x = Math.random() * w;
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${rgb},${p.a.toFixed(3)})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    frame();

    const onVis = () => {
      running = !document.hidden;
      if (running) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [reduce, theme]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
