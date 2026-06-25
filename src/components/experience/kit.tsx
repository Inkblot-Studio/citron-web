'use client';

import { useRef, type ReactNode } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import { scenes, type Mood } from '@/lib/experience';
import { useScene } from './ExperienceContext';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

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
      {scene.bgImage && (
        <SectionPhotoBg src={scene.bgImage} overlay={scene.bgOverlay ?? 'light'} />
      )}
      <SectionBackground mood={scene.mood} soft={!!scene.bgImage} />
      {/* `data-frame` lets the mascot guide measure the real content column so it
          can sit in the true gutter and never overlap the copy. */}
      <div data-frame className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-10">
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

export function SectionBackground({ mood, soft = false }: { mood: Mood; soft?: boolean }) {
  const orbOpacity = soft ? 0.14 : undefined;
  if (mood === 'plain') {
    return (
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden"
        style={{ background: soft ? 'transparent' : 'var(--cine-bg-0)' }}
      >
        <Orb size={560} opacity={orbOpacity ?? 0.28} className="-left-40 top-1/4" />
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
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{ background: soft ? 'transparent' : 'var(--cine-bg-0)' }}
    >
      <div
        className="absolute inset-x-0 top-0 h-2/3"
        style={{
          background:
            'radial-gradient(70% 58% at 50% 0%, rgba(var(--cine-particle),0.14), transparent 64%)',
        }}
      />
      <Orb size={640} opacity={soft ? 0.2 : 0.36} className="left-1/2 -top-36 -translate-x-1/2" />
      {!soft && <Particles />}
    </div>
  );
}

/** Full-bleed photographic background with a legibility scrim. */
export function SectionPhotoBg({
  src,
  overlay = 'light',
}: {
  src: string;
  overlay?: 'light' | 'dark';
}) {
  return (
    <div aria-hidden className="absolute inset-0">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        quality={90}
      />
      <div
        className={cn(
          'absolute inset-0',
          overlay === 'dark'
            ? 'bg-gradient-to-b from-[rgba(11,10,8,0.88)] via-[rgba(11,10,8,0.78)] to-[rgba(11,10,8,0.92)]'
            : 'bg-gradient-to-b from-[var(--cine-bg-0)]/82 via-[var(--cine-bg-0)]/74 to-[var(--cine-bg-0)]/88'
        )}
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

/* ============================================================
   MeshBackdrop — a premium, slow-drifting warm gradient mesh.
   Pure CSS gradients on the GPU; the hero's quiet "wow" layer.
   ============================================================ */
export function MeshBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div
        className="absolute -left-[12%] -top-[18%] h-[60vmax] w-[60vmax] rounded-full animate-aura"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--cine-particle),0.30) 0%, rgba(var(--cine-particle),0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute -right-[14%] top-[8%] h-[48vmax] w-[48vmax] rounded-full animate-aura"
        style={{
          animationDelay: '-7s',
          background:
            'radial-gradient(circle, rgba(217,188,88,0.22) 0%, transparent 68%)',
          filter: 'blur(56px)',
        }}
      />
      <div
        className="absolute bottom-[-22%] left-1/3 h-[44vmax] w-[44vmax] -translate-x-1/2 rounded-full animate-aura"
        style={{
          animationDelay: '-13s',
          background:
            'radial-gradient(circle, rgba(var(--cine-particle),0.18) 0%, transparent 66%)',
          filter: 'blur(64px)',
        }}
      />
      {/* faint dot grid, masked to the centre for depth */}
      <div
        className="absolute inset-0 bg-dots opacity-50"
        style={{
          WebkitMaskImage: 'radial-gradient(70% 60% at 50% 38%, black, transparent 78%)',
          maskImage: 'radial-gradient(70% 60% at 50% 38%, black, transparent 78%)',
        }}
      />
    </div>
  );
}

/* ============================================================
   BrowserFrame — a calm window chrome around a mock product
   surface. Used by the horizontal showcase reel.
   ============================================================ */
export function BrowserFrame({
  url = 'app.citron.com',
  accent,
  children,
  className,
}: {
  url?: string;
  accent?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--cine-card-border)] bg-[var(--cine-bg-2)] shadow-[var(--shadow-xl)]',
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-[var(--cine-line)] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--cine-line)' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--cine-line)' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent ?? 'var(--cine-amber-soft)' }} />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--cine-line)] bg-[var(--cine-bg-1)] px-3 py-1 text-[0.68rem] font-medium text-cine-faint">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--cine-amber)' }} />
            {url}
          </span>
        </div>
        <div className="w-8" />
      </div>
      <div className="relative flex-1 overflow-hidden p-5">{children}</div>
    </div>
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
