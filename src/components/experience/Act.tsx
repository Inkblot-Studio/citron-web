'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Act as ActData } from '@/lib/experience';
import { actIndex, useCases, proofs } from '@/lib/experience';
import { useScene } from './ExperienceContext';
import { VISUALS } from './ChapterVisuals';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } };

/**
 * A single act of the journey. Content settles into a sticky "arrival" frame
 * while the mascot pauses, then releases as the visitor scrolls on — cinematic
 * pacing without any visible checkpoint UI.
 */
export function Act({ act, position }: { act: ActData; position: number }) {
  const ref = useScene<HTMLElement>(actIndex(position));
  const long = act.dwell === 'long';
  const centered = act.kind === 'cases' || act.kind === 'testimonials';

  return (
    <section
      ref={ref}
      id={act.id}
      aria-label={act.headline}
      className={cn(
        'relative z-30',
        centered ? 'min-h-screen' : 'min-h-screen',
        !centered && (long ? 'lg:min-h-[210vh]' : 'lg:min-h-[175vh]')
      )}
    >
      <div
        className={cn(
          'flex min-h-screen items-center px-5 py-16 sm:px-8 lg:px-10',
          !centered && 'lg:sticky lg:top-0 lg:h-screen'
        )}
      >
        {act.kind === 'feature' || act.kind === 'product' ? (
          <FeatureLayout act={act} />
        ) : act.kind === 'ai' ? (
          <AiLayout act={act} />
        ) : act.kind === 'cases' ? (
          <CasesLayout act={act} />
        ) : (
          <TestimonialsLayout act={act} />
        )}
      </div>
    </section>
  );
}

/* ---------- feature & product ---------- */
function FeatureLayout({ act }: { act: ActData }) {
  const Visual = act.visual ? VISUALS[act.visual] : null;
  const textRight = act.side === 'right';

  return (
    <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-12">
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={cn('scrim max-w-lg', textRight ? 'lg:order-2 lg:justify-self-end' : 'lg:order-1')}
      >
        {act.product ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--cine-line)] bg-[var(--cine-card)] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--cine-amber)] backdrop-blur-md">
            Citron {act.product}
          </span>
        ) : (
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--cine-line)]" />
            <span className="eyebrow-cine text-[0.68rem] font-medium">{act.eyebrow}</span>
          </div>
        )}

        <h2 className="mt-5 text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[2.9rem]">
          <span className="gradient-amber">{act.headline}</span>
        </h2>

        {act.body && (
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-cine-dim">{act.body}</p>
        )}

        {act.points && (
          <ul className="mt-6 space-y-3">
            {act.points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.08 }}
                className="flex items-start gap-3 text-[0.95rem] text-cine-dim"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(var(--cine-particle),0.16)] text-[var(--cine-amber)]">
                  <Check className="h-3 w-3" strokeWidth={3.5} />
                </span>
                {p}
              </motion.li>
            ))}
          </ul>
        )}

        {act.chips && (
          <div className="mt-6 flex flex-wrap gap-2">
            {act.chips.map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.05 }}
                className="rounded-full cine-card px-3 py-1.5 text-[0.78rem] font-medium text-cine-dim"
              >
                {c}
              </motion.span>
            ))}
          </div>
        )}

        {act.note && (
          <p className="mt-6 border-l-2 border-[var(--cine-amber-bright)] pl-4 text-[0.9rem] font-medium text-cine">
            {act.note}
          </p>
        )}
      </motion.div>

      {Visual && (
        <div
          className={cn(
            'relative flex items-center justify-center',
            textRight ? 'lg:order-1' : 'lg:order-2'
          )}
        >
          <Visual />
        </div>
      )}
    </div>
  );
}

/* ---------- ai in action ---------- */
function AiLayout({ act }: { act: ActData }) {
  const Visual = act.visual ? VISUALS[act.visual] : null;
  return (
    <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="scrim max-w-md"
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--cine-line)]" />
          <span className="eyebrow-cine text-[0.68rem] font-medium">{act.eyebrow}</span>
        </div>
        <h2 className="mt-5 text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[3.25rem]">
          <span className="gradient-amber">{act.headline}</span>
        </h2>
        {act.body && (
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-cine-dim">{act.body}</p>
        )}
      </motion.div>

      {Visual && (
        <div className="relative flex items-center justify-center">
          <Visual />
        </div>
      )}
    </div>
  );
}

/* ---------- use cases ---------- */
function CasesLayout({ act }: { act: ActData }) {
  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="scrim mx-auto max-w-2xl text-center"
      >
        <span className="eyebrow-cine text-[0.68rem] font-medium">{act.eyebrow}</span>
        <h2 className="mt-4 text-[2.25rem] font-semibold tracking-[-0.03em] sm:text-[2.9rem]">
          <span className="gradient-amber">{act.headline}</span>
        </h2>
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((c, i) => (
          <motion.div
            key={c.role}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
            className="flex flex-col rounded-[var(--radius-xl)] cine-card p-5"
          >
            <span className="text-[0.95rem] font-semibold text-cine">{c.role}</span>
            <span className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-cine-dim">
              {c.outcome}
            </span>
            <span className="mt-4 inline-flex w-fit items-center rounded-full bg-[rgba(var(--cine-particle),0.14)] px-3 py-1 font-mono text-[0.8rem] font-semibold tabular-nums text-[var(--cine-amber)]">
              {c.metric}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------- testimonials ---------- */
function TestimonialsLayout({ act }: { act: ActData }) {
  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="scrim mx-auto max-w-2xl text-center"
      >
        <span className="eyebrow-cine text-[0.68rem] font-medium">{act.eyebrow}</span>
        <h2 className="mt-4 text-[2.25rem] font-semibold tracking-[-0.03em] sm:text-[2.9rem]">
          <span className="gradient-amber">{act.headline}</span>
        </h2>
      </motion.div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {proofs.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
            className="flex flex-col rounded-[var(--radius-xl)] cine-card p-6"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[1.75rem] font-semibold tabular-nums text-[var(--cine-amber)]">
                {t.metric}
              </span>
              <span className="text-[0.75rem] text-cine-faint">{t.metricLabel}</span>
            </div>
            <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-cine">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 text-[0.8125rem] text-cine-faint">
              {t.name} · {t.role}, {t.company}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
