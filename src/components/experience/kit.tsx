'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import { scenes, type Mood } from '@/lib/experience';
import { useScene } from './ExperienceContext';
import { AliveMascot } from './Mascot';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

/** The mobile, in-flow mascot — the fixed desktop guide is hidden < lg. */
function MobileMascot() {
  return (
    <div className="flex justify-center pt-28 lg:hidden">
      <AliveMascot className="h-36 w-36 sm:h-44 sm:w-44" />
    </div>
  );
}

/** Shared <section> wrapper: mood background + snap target. */
function Chapter({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const scene = scenes[index];
  const ref = useScene<HTMLElement>(index);
  return (
    <section
      ref={ref}
      id={scene.id}
      aria-label={scene.id}
      className={cn(
        'snap-section relative w-full overflow-hidden',
        scene.theme === 'dark' && 'cine-section-dark'
      )}
    >
      <SectionBackground mood={scene.mood} />
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-10">
        {children}
      </div>
    </section>
  );
}

/**
 * A chapter shell for the `above` / `left` / `right` layouts. Reserves the
 * mascot's region (desktop) so content never overlaps it.
 */
export function Stage({ index, children }: { index: number; children: ReactNode }) {
  const layout = scenes[index].layout;
  const above = layout === 'above';

  return (
    <Chapter index={index}>
      <MobileMascot />
      <div
        className={cn(
          'flex min-h-[80vh] flex-col py-16 lg:min-h-screen',
          above
            ? 'items-center justify-start text-center lg:justify-start lg:pb-[10vh] lg:pt-[46vh]'
            : 'justify-center'
        )}
      >
        <div className={cn('w-full', laneFor(layout))}>{children}</div>
      </div>
    </Chapter>
  );
}

function laneFor(layout: string) {
  if (layout === 'left') return 'lg:ml-auto lg:max-w-[46%]'; // mascot left → content right
  if (layout === 'right') return 'lg:max-w-[46%]'; //            mascot right → content left
  return 'mx-auto max-w-[760px]'; //                            above → centered column
}

/**
 * The centerpiece (`split`) layout — the mascot sits dead-center and is flanked
 * by two balanced content columns, keynote-style. The center grid track is left
 * empty so the fixed mascot has the stage to itself.
 */
export function SplitStage({
  index,
  left,
  right,
}: {
  index: number;
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <Chapter index={index}>
      <MobileMascot />
      <div className="flex min-h-[80vh] flex-col justify-center gap-12 py-16 lg:grid lg:min-h-screen lg:grid-cols-[1fr_clamp(17rem,23vw,25rem)_1fr] lg:items-center lg:gap-6">
        <div className="lg:pr-4 lg:text-right">{left}</div>
        <div aria-hidden className="hidden lg:block" />
        <div className="lg:pl-4">{right}</div>
      </div>
    </Chapter>
  );
}

/* ============================================================
   Ambient — restrained depth. A soft orb or two and, only on the
   dark chapters where it earns its place, a few drifting motes.
   Whitespace is the default; activity is the exception.
   ============================================================ */

// Deterministic so server and client render identically (no hydration drift).
const PARTICLES = [
  { x: 18, y: 26, s: 3, dur: 11, delay: 0, o: 0.32 },
  { x: 38, y: 70, s: 4, dur: 13, delay: 1.6, o: 0.26 },
  { x: 64, y: 34, s: 3, dur: 12, delay: 0.7, o: 0.3 },
  { x: 82, y: 64, s: 4, dur: 14, delay: 2.2, o: 0.24 },
  { x: 50, y: 16, s: 3, dur: 12.5, delay: 1.1, o: 0.28 },
] as const;

function Particles() {
  return (
    <div aria-hidden className="absolute inset-0">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            background: 'rgba(var(--cine-particle),1)',
            opacity: p.o,
            filter: 'blur(0.5px)',
            animation: `float-slow ${p.dur}s var(--ease-in-out-soft) ${p.delay}s infinite, twinkle ${
              p.dur * 0.7
            }s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Orb({
  className,
  size,
  opacity = 0.4,
}: {
  className?: string;
  size: number;
  opacity?: number;
}) {
  return (
    <div
      className={cn('absolute rounded-full animate-aura', className)}
      style={{
        width: size,
        height: size,
        opacity,
        background:
          'radial-gradient(circle, rgba(var(--cine-particle),0.45) 0%, rgba(var(--cine-particle),0.1) 42%, transparent 72%)',
        filter: 'blur(48px)',
      }}
    />
  );
}

export function SectionBackground({ mood }: { mood: Mood }) {
  if (mood === 'plain') {
    return (
      <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ background: 'var(--cine-bg-0)' }}>
        <Orb size={560} opacity={0.28} className="-left-40 top-1/4" />
      </div>
    );
  }
  if (mood === 'surface') {
    return (
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden border-y border-[var(--cine-line)]"
        style={{ background: 'var(--cine-bg-1)' }}
      >
        <Orb size={520} opacity={0.26} className="right-0 -top-24" />
      </div>
    );
  }
  if (mood === 'wash') {
    return (
      <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ background: 'var(--cine-bg-0)' }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 70% at 50% 45%, rgba(var(--cine-particle),0.07), transparent 64%)',
          }}
        />
        <Orb size={600} opacity={0.32} className="left-1/2 top-1/3 -translate-x-1/2" />
      </div>
    );
  }
  if (mood === 'deep') {
    return (
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, var(--cine-bg-0) 0%, var(--cine-bg-1) 100%)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-1/2"
          style={{
            background:
              'radial-gradient(58% 68% at 50% 0%, rgba(var(--cine-particle),0.14), transparent 66%)',
          }}
        />
        <Orb size={620} opacity={0.42} className="left-1/3 -top-24" />
        <Orb size={420} opacity={0.3} className="-right-20 bottom-0" />
        <Particles />
      </div>
    );
  }
  // dawn (hero)
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ background: 'var(--cine-bg-0)' }}>
      <div
        className="absolute inset-x-0 top-0 h-2/3"
        style={{
          background:
            'radial-gradient(70% 58% at 50% 0%, rgba(var(--cine-particle),0.14), transparent 64%)',
        }}
      />
      <Orb size={640} opacity={0.36} className="left-1/2 -top-36 -translate-x-1/2" />
      <Particles />
    </div>
  );
}

/* ============================================================
   Card — a premium Bento card: on-scroll reveal, 3D tilt toward
   the cursor, a soft light that follows the pointer, hover lift.
   ============================================================ */
export function Card({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18, mass: 0.6 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18, mass: 0.6 });
  const hx = useMotionValue(50);
  const hy = useMotionValue(50);
  const highlight = useMotionTemplate`radial-gradient(circle at ${hx}% ${hy}%, rgba(var(--cine-particle),0.18), transparent 55%)`;

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rotateY.set((px - 0.5) * 10);
    rotateX.set(-(py - 0.5) * 10);
    hx.set(px * 100);
    hy.set(py * 100);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      whileHover={reduce ? undefined : { scale: 1.015 }}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      className={cn(
        'group relative overflow-hidden rounded-[var(--radius-2xl)] cine-card p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-xl)]',
        className
      )}
    >
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: highlight }}
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}

/** Chapter header: eyebrow, title, optional supporting line. */
export function SectionHead({
  eyebrow,
  title,
  sub,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={className}
    >
      <span className="eyebrow-cine text-[0.7rem] font-semibold">{eyebrow}</span>
      <h2 className="mt-4 text-[clamp(2.1rem,4.6vw,3.4rem)] font-semibold leading-[1.03] tracking-[-0.035em] text-cine">
        {title}
      </h2>
      {sub && <p className="mt-5 max-w-[42ch] text-[1.0625rem] leading-relaxed text-cine-dim">{sub}</p>}
    </motion.div>
  );
}
