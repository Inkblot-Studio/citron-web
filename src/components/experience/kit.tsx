'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
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
      className="relative w-full overflow-hidden"
    >
      <SectionBackground mood={scene.mood} />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-10">
        {/* Mobile mascot — the fixed guide is desktop-only */}
        <div className="flex justify-center pt-28 lg:hidden">
          <AliveMascot className="h-28 w-28" />
        </div>

        <div
          className={cn(
            'flex min-h-[80vh] flex-col py-16 lg:min-h-screen',
            center ? 'items-center justify-end pb-[12vh] text-center lg:pb-[14vh]' : 'justify-center'
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

export function SectionBackground({ mood }: { mood: Mood }) {
  if (mood === 'plain') {
    return <div aria-hidden className="absolute inset-0" style={{ background: 'var(--cine-bg-0)' }} />;
  }
  if (mood === 'surface') {
    return (
      <div
        aria-hidden
        className="absolute inset-0 border-y border-[var(--cine-line)]"
        style={{ background: 'var(--cine-bg-1)' }}
      />
    );
  }
  if (mood === 'wash') {
    return (
      <div aria-hidden className="absolute inset-0" style={{ background: 'var(--cine-bg-0)' }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 80% at 50% 50%, rgba(var(--cine-particle),0.07), transparent 62%)',
          }}
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
          background:
            'linear-gradient(180deg, var(--cine-bg-0) 0%, var(--cine-bg-1) 100%)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-1/2"
          style={{
            background:
              'radial-gradient(60% 70% at 50% 0%, rgba(var(--cine-particle),0.12), transparent 65%)',
          }}
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
            'radial-gradient(70% 60% at 50% 0%, rgba(var(--cine-particle),0.12), transparent 62%)',
        }}
      />
    </div>
  );
}

/** A premium Bento card with an on-scroll reveal. */
export function Card({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={cn(
        'rounded-[var(--radius-2xl)] cine-card p-6 transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1',
        className
      )}
    >
      {children}
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
