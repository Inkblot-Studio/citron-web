'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import { scenes, type Mood, type Side } from '@/lib/experience';
import { useScene } from './ExperienceContext';
import { AliveMascot } from './Mascot';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A chapter shell. Reserves the mascot's half of the stage (desktop) so
 * content never overlaps it, sets the chapter's background mood, and shows an
 * in-flow mascot on mobile where the fixed guide is hidden.
 */
export function Stage({ index, children }: { index: number; children: ReactNode }) {
  const scene = scenes[index];
  const ref = useScene<HTMLElement>(index);
  const center = scene.side === 'center';

  return (
    <section
      ref={ref}
      id={scene.id}
      aria-label={scene.id}
      data-theme={scene.dark ? 'dark' : undefined}
      className="snap-section relative w-full overflow-hidden"
    >
      <SectionBackground mood={scene.mood} />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-10">
        {/* Mobile mascot — the fixed guide is desktop-only */}
        <div className="flex justify-center pt-28 lg:hidden">
          <AliveMascot className="h-36 w-36" />
        </div>

        <div
          className={cn(
            'flex min-h-[80vh] flex-col py-16 lg:min-h-screen',
            center
              ? 'items-center justify-center text-center lg:justify-end lg:pb-[12vh] lg:pt-[36vh]'
              : 'justify-center'
          )}
        >
          <div className={cn('w-full', sideInner(scene.side))}>{children}</div>
        </div>
      </div>
    </section>
  );
}

function sideInner(side: Side) {
  if (side === 'left') return 'lg:max-w-[46%]';
  if (side === 'right') return 'lg:ml-auto lg:max-w-[46%]';
  return 'mx-auto max-w-[760px]';
}

/* ============================================================
   Ambient — floating orbs + drifting particles. Gives every
   chapter depth and life so nothing reads as empty or flat-white.
   ============================================================ */

// Deterministic so server and client render identically (no hydration drift).
const PARTICLES = [
  { x: 8, y: 18, s: 4, dur: 9, delay: 0, o: 0.5 },
  { x: 22, y: 64, s: 3, dur: 11, delay: 1.4, o: 0.35 },
  { x: 34, y: 32, s: 5, dur: 8, delay: 0.7, o: 0.45 },
  { x: 47, y: 78, s: 3, dur: 12, delay: 2.1, o: 0.3 },
  { x: 58, y: 22, s: 4, dur: 10, delay: 0.4, o: 0.5 },
  { x: 66, y: 56, s: 6, dur: 9, delay: 1.8, o: 0.4 },
  { x: 73, y: 84, s: 3, dur: 13, delay: 0.2, o: 0.3 },
  { x: 81, y: 38, s: 5, dur: 8.5, delay: 1.1, o: 0.5 },
  { x: 89, y: 70, s: 4, dur: 11.5, delay: 2.6, o: 0.4 },
  { x: 14, y: 88, s: 3, dur: 10.5, delay: 0.9, o: 0.32 },
  { x: 41, y: 12, s: 4, dur: 9.5, delay: 1.6, o: 0.45 },
  { x: 94, y: 16, s: 3, dur: 12.5, delay: 0.5, o: 0.34 },
] as const;

function Ambient({ orbs, particles }: { orbs: ReactNode; particles: boolean }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {orbs}
      {particles && (
        <div className="absolute inset-0">
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
                  p.dur * 0.6
                }s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Orb({
  className,
  size,
  opacity = 0.5,
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
          'radial-gradient(circle, rgba(var(--cine-particle),0.5) 0%, rgba(var(--cine-particle),0.12) 40%, transparent 70%)',
        filter: 'blur(40px)',
      }}
    />
  );
}

export function SectionBackground({ mood }: { mood: Mood }) {
  if (mood === 'plain') {
    return (
      <div aria-hidden className="absolute inset-0" style={{ background: 'var(--cine-bg-0)' }}>
        <Ambient
          particles
          orbs={
            <>
              <Orb size={520} opacity={0.4} className="-left-32 top-10" />
              <Orb size={460} opacity={0.32} className="-right-24 bottom-0" />
            </>
          }
        />
      </div>
    );
  }
  if (mood === 'surface') {
    return (
      <div
        aria-hidden
        className="absolute inset-0 border-y border-[var(--cine-line)]"
        style={{ background: 'var(--cine-bg-1)' }}
      >
        <div className="absolute inset-0 bg-dots opacity-60" />
        <Ambient
          particles
          orbs={
            <>
              <Orb size={560} opacity={0.4} className="left-1/4 -top-24" />
              <Orb size={420} opacity={0.3} className="right-0 bottom-10" />
            </>
          }
        />
      </div>
    );
  }
  if (mood === 'wash') {
    return (
      <div aria-hidden className="absolute inset-0" style={{ background: 'var(--cine-bg-0)' }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 80% at 50% 50%, rgba(var(--cine-particle),0.09), transparent 62%)',
          }}
        />
        <Ambient
          particles
          orbs={
            <>
              <Orb size={640} opacity={0.5} className="left-1/2 top-1/3 -translate-x-1/2" />
              <Orb size={380} opacity={0.32} className="right-10 top-16" />
            </>
          }
        />
      </div>
    );
  }
  if (mood === 'deep') {
    return (
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, var(--cine-bg-0) 0%, var(--cine-bg-1) 100%)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-1/2"
          style={{
            background:
              'radial-gradient(60% 70% at 50% 0%, rgba(var(--cine-particle),0.16), transparent 65%)',
          }}
        />
        <Ambient
          particles
          orbs={
            <>
              <Orb size={620} opacity={0.6} className="left-1/3 -top-20" />
              <Orb size={480} opacity={0.45} className="-right-20 bottom-0" />
              <Orb size={320} opacity={0.4} className="left-10 bottom-16" />
            </>
          }
        />
      </div>
    );
  }
  // dawn (hero)
  return (
    <div aria-hidden className="absolute inset-0" style={{ background: 'var(--cine-bg-0)' }}>
      <div
        className="absolute inset-x-0 top-0 h-2/3"
        style={{
          background:
            'radial-gradient(70% 60% at 50% 0%, rgba(var(--cine-particle),0.16), transparent 62%)',
        }}
      />
      <Ambient
        particles
        orbs={
          <>
            <Orb size={680} opacity={0.55} className="left-1/2 -top-32 -translate-x-1/2" />
            <Orb size={420} opacity={0.4} className="left-8 bottom-24" />
            <Orb size={420} opacity={0.4} className="right-8 bottom-24" />
          </>
        }
      />
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
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
      <h2 className="mt-4 text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.03em] text-cine sm:text-[2.9rem]">
        {title}
      </h2>
      {sub && <p className="mt-4 text-[1.0625rem] leading-relaxed text-cine-dim">{sub}</p>}
    </motion.div>
  );
}
