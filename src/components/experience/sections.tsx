'use client';

import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from 'framer-motion';
import {
  Users,
  Sparkles,
  Workflow,
  ReceiptText,
  ListChecks,
  Megaphone,
  Building2,
  MessagesSquare,
  Boxes,
  Layers,
  Compass,
  ArrowRight,
  ArrowUpRight,
  Check,
  type LucideIcon,
} from 'lucide-react';
import {
  crmStages,
  platformPoints,
  aiActions,
  inkblotPillars,
  heroHeadline,
} from '@/lib/experience';
import { siteConfig } from '@/lib/site';
import { Stage, SplitStage, Card, SectionHead } from './kit';
import { Magnetic } from './ambient/Magnetic';
import { useExperience } from './ExperienceContext';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  Users,
  Sparkles,
  Workflow,
  ReceiptText,
  ListChecks,
  Megaphone,
  Building2,
  MessagesSquare,
  Boxes,
  Layers,
  Compass,
};

/* ============================================================
   1 · HERO — the mascot sweeps the headline and lights it up
   ============================================================ */

/** A single headline word, revealed as the reveal timeline passes its window. */
function RevealWord({
  progress,
  from,
  to,
  accent,
  children,
}: {
  progress: MotionValue<number>;
  from: number;
  to: number;
  accent?: boolean;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, [from, to], [0, 1]);
  const y = useTransform(progress, [from, to - 0.02], [26, 0]);
  const blurN = useTransform(progress, [from, to], [12, 0]);
  const filter = useMotionTemplate`blur(${blurN}px)`;
  // A brief amber "ignition" glow as the word switches on.
  const glow = useTransform(progress, [from, (from + to) / 2, to], [0, 0.55, 0]);
  const textShadow = useMotionTemplate`0 0 28px rgba(var(--cine-particle), ${glow})`;

  return (
    <motion.span
      className={cn('relative inline-block', accent && 'gradient-amber')}
      style={{ opacity, y, filter, textShadow }}
    >
      {children}
    </motion.span>
  );
}

/** Reveal a block (eyebrow, sub, CTAs) across a window of the timeline. */
function RevealBlock({
  progress,
  from,
  to,
  className,
  children,
}: {
  progress: MotionValue<number>;
  from: number;
  to: number;
  className?: string;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, [from, to], [0, 1]);
  const y = useTransform(progress, [from, to], [16, 0]);
  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const { heroReveal } = useExperience();
  const n = heroHeadline.length;

  return (
    <Stage index={0}>
      <div className="relative">
        <RevealBlock progress={heroReveal} from={0.04} to={0.16}>
          <span className="eyebrow-cine text-[0.72rem] font-semibold">
            The Business Operating System
          </span>
        </RevealBlock>

        <h1 className="mx-auto mt-5 max-w-[15ch] text-[clamp(2.7rem,8.4vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-cine">
          {heroHeadline.map((w, i) => {
            const from = 0.2 + (i / n) * 0.46;
            const to = from + 0.14;
            return (
              <Fragment key={i}>
                <RevealWord progress={heroReveal} from={from} to={to} accent={w.accent}>
                  {w.text}
                </RevealWord>{' '}
              </Fragment>
            );
          })}
        </h1>

        <RevealBlock progress={heroReveal} from={0.76} to={0.9}>
          <p className="mx-auto mt-7 max-w-xl text-[1.1875rem] leading-relaxed text-cine-dim">
            Citron replaces seven disconnected tools with one intelligent
            platform — calm, connected, and built to scale.
          </p>
        </RevealBlock>

        <RevealBlock progress={heroReveal} from={0.82} to={0.96}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Magnetic strength={0.45}>
              <Link
                href="/demo"
                className="group inline-flex h-[3.5rem] items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--cine-amber-bright)] px-8 text-[1.0625rem] font-semibold text-[#1d1c19] shadow-[0_10px_36px_-10px_rgba(var(--cine-particle),0.8)] transition-[filter,box-shadow,transform] duration-200 hover:brightness-105 hover:shadow-[0_18px_50px_-12px_rgba(var(--cine-particle),0.95)]"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Link
              href="/pricing"
              className="inline-flex h-[3.5rem] items-center gap-2 rounded-[var(--radius-lg)] border border-[var(--cine-line)] px-7 text-[1rem] font-semibold text-cine-dim transition-colors duration-200 hover:border-[var(--cine-amber-bright)] hover:text-[var(--cine-amber)]"
            >
              Try it free
            </Link>
          </div>
          <p className="mt-5 text-[0.8125rem] text-cine-faint">
            No credit card · Live in a day · Cancel anytime
          </p>
        </RevealBlock>
      </div>
    </Stage>
  );
}

/* ============================================================
   2 · COMMAND — mascot left, the living pipeline on the right
   ============================================================ */
export function CommandSection() {
  return (
    <Stage index={1}>
      <SectionHead
        eyebrow="Citron CRM"
        title={
          <>
            The CRM your team{' '}
            <span className="gradient-amber">actually uses.</span>
          </>
        }
        sub="A focused product for the people who close the deals. Pipelines that move themselves, leads routed in seconds, forecasting you can trust."
      />
      <PipelineDemo />
    </Stage>
  );
}

function PipelineDemo() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(() => setStage((p) => (p + 1) % crmStages.length), 2400);
    return () => window.clearTimeout(t);
  }, [stage, reduce]);

  const total = crmStages.reduce((sum, s) => sum + s.deals.length, 0);

  return (
    <div className="mt-8 rounded-[var(--radius-2xl)] cine-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--cine-line)] px-5 py-3.5">
        <div className="flex items-center gap-2 text-cine">
          <Users className="h-4 w-4 text-[var(--cine-amber)]" strokeWidth={1.8} />
          <span className="text-[0.82rem] font-semibold">Pipeline · Q3</span>
        </div>
        <span className="font-mono text-[0.72rem] tabular-nums text-cine-faint">
          {total} open · $208k
        </span>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {crmStages.map((s, i) => {
            const active = i === stage;
            return (
              <button
                key={s.name}
                type="button"
                onClick={() => setStage(i)}
                className={
                  'rounded-full border px-3.5 py-1.5 text-[0.78rem] font-medium transition-all duration-200 ' +
                  (active
                    ? 'border-transparent bg-[var(--cine-amber-bright)] text-[#1d1c19] shadow-[0_8px_22px_-10px_rgba(var(--cine-particle),0.8)]'
                    : 'border-[var(--cine-line)] text-cine-dim hover:text-cine')
                }
              >
                {s.name}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={crmStages[stage].name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="space-y-2"
            >
              {crmStages[stage].deals.map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: EASE, delay: i * 0.06 }}
                  className="flex items-center justify-between rounded-[var(--radius-lg)] border border-[var(--cine-line)] bg-[var(--cine-bg-2)] px-3 py-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(var(--cine-particle),0.14)] text-[0.7rem] font-semibold text-[var(--cine-amber)]">
                      {d.name[0]}
                    </span>
                    <span className="text-[0.85rem] font-medium text-cine">{d.name}</span>
                  </div>
                  <span className="font-mono text-[0.8rem] tabular-nums text-cine-dim">{d.value}</span>
                </motion.div>
              ))}
              <p className="flex items-center gap-1.5 pt-2 text-[0.72rem] text-cine-faint">
                <Sparkles className="h-3 w-3 text-[var(--cine-amber)]" />
                {crmStages[stage].name === 'Won'
                  ? 'Invoice and onboarding kick off automatically.'
                  : 'AI suggests the next move for each deal in this stage.'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   3 · PLATFORM — centerpiece (split), modules flank the mascot
   ============================================================ */
export function PlatformSection() {
  return (
    <SplitStage
      index={2}
      left={
        <>
          <SectionHead
            eyebrow="Platform + AI"
            title={
              <>
                Bigger than a CRM.{' '}
                <span className="gradient-amber">Driven by AI.</span>
              </>
            }
            sub="CRM is where it starts. Citron runs everything else your company does — on one foundation, with intelligence woven through every module."
          />
          <div className="mt-7 space-y-3">
            {platformPoints.map((p, i) => {
              const Icon = ICONS[p.icon] ?? Boxes;
              return (
                <Card key={p.title} delay={0.1 + i * 0.08} className="!p-5">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-[0.9rem] font-semibold text-cine">{p.title}</span>
                    <Icon className="h-4 w-4 text-[var(--cine-amber)]" strokeWidth={1.8} />
                  </div>
                  <p className="mt-1.5 text-[0.82rem] leading-relaxed text-cine-dim">{p.desc}</p>
                </Card>
              );
            })}
          </div>
        </>
      }
      right={
        <div>
          <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cine-faint">
            Just ask — finished work out
          </p>
          <AiConsole />
        </div>
      }
    />
  );
}

export function AiConsole() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) {
      setTyped(aiActions[i].prompt);
      setDone(true);
      return;
    }
    const current = aiActions[i];
    setTyped('');
    setDone(false);
    let c = 0;
    const clear = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
    const type = () => {
      if (c <= current.prompt.length) {
        setTyped(current.prompt.slice(0, c));
        c += 1;
        timerRef.current = window.setTimeout(type, 32);
      } else {
        timerRef.current = window.setTimeout(() => {
          setDone(true);
          timerRef.current = window.setTimeout(
            () => setI((p) => (p + 1) % aiActions.length),
            2600
          );
        }, 360);
      }
    };
    timerRef.current = window.setTimeout(type, 240);
    return clear;
  }, [i, reduce]);

  return (
    <div className="rounded-[var(--radius-2xl)] cine-card overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 text-[var(--cine-amber)]">
          <Sparkles className="h-4 w-4" />
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cine-dim">
            Citron AI · {aiActions[i].outcome.split(' ')[0]}
          </span>
        </div>

        <p className="mt-4 min-h-[3.25rem] font-mono text-[0.92rem] leading-relaxed text-cine">
          <span className="text-[var(--cine-amber)]">›</span> {typed}
          {!done && !reduce && (
            <span
              className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-[var(--cine-amber)]"
              style={{ animation: 'caret-blink 1s step-end infinite' }}
            />
          )}
        </p>

        <motion.div
          className="mt-3 flex items-start gap-2 rounded-[var(--radius-md)] border border-[rgba(var(--cine-particle),0.2)] bg-[rgba(var(--cine-particle),0.07)] p-3"
          initial={{ opacity: 0, y: 8 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--cine-amber)]" strokeWidth={3} />
          <span className="text-[0.85rem] leading-relaxed text-cine-dim">{aiActions[i].outcome}</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================
   4 · FINALE — the close; the guide returns and floats above
   ============================================================ */
export function FinaleSection() {
  const year = new Date().getFullYear();
  return (
    <Stage index={3}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="max-w-xl lg:max-w-none"
      >
        <span className="eyebrow-cine text-[0.72rem] font-semibold">Start today</span>
        <h2 className="mt-4 max-w-[16ch] text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-cine">
          Run your whole company on{' '}
          <span className="gradient-amber">one system.</span>
        </h2>
        <p className="mt-5 max-w-[42ch] text-[1.0625rem] leading-relaxed text-cine-dim">
          See Citron mapped to how your team actually works — a focused
          30-minute walkthrough, no slides for the sake of slides.
        </p>
      </motion.div>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Magnetic strength={0.45}>
          <Link
            href="/demo"
            className="group inline-flex h-[3.5rem] items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--cine-amber-bright)] px-8 text-[1.0625rem] font-semibold text-[#1d1c19] shadow-[0_10px_36px_-10px_rgba(var(--cine-particle),0.8)] transition-[filter,box-shadow,transform] duration-200 hover:brightness-105 hover:shadow-[0_18px_50px_-12px_rgba(var(--cine-particle),0.95)]"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Magnetic>
        <Link
          href="/pricing"
          className="inline-flex h-[3.5rem] items-center gap-2 rounded-[var(--radius-lg)] border border-[var(--cine-line)] px-7 text-[1rem] font-semibold text-cine transition-colors duration-200 hover:border-[var(--cine-amber-bright)] hover:text-[var(--cine-amber)]"
        >
          Compare plans
        </Link>
      </div>

      <div className="mt-12 border-t border-[var(--cine-line)] pt-8">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cine-faint">
          Built by Inkblot Studio
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {inkblotPillars.map((p, i) => {
            const Icon = ICONS[p.icon] ?? Sparkles;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                className="rounded-[var(--radius-xl)] cine-card p-4"
              >
                <Icon className="h-4 w-4 text-[var(--cine-amber)]" strokeWidth={1.8} />
                <p className="mt-2 text-[0.88rem] font-semibold text-cine">{p.title}</p>
                <p className="mt-1 text-[0.78rem] leading-relaxed text-cine-dim">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-7">
          <Magnetic strength={0.35}>
            <Link
              href={siteConfig.studio.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-[3rem] items-center gap-2 rounded-full border border-[var(--cine-line)] bg-[var(--cine-card)] px-6 text-[0.9375rem] font-semibold text-cine backdrop-blur-md transition-colors duration-200 hover:border-[var(--cine-amber-bright)] hover:text-[var(--cine-amber)]"
            >
              Explore Inkblot Studio
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Magnetic>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-[0.8125rem] text-cine-faint sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
          <Link href="/legal/privacy" className="transition-colors hover:text-cine">Privacy</Link>
          <Link href="/legal/terms" className="transition-colors hover:text-cine">Terms</Link>
          <Link href="/legal/cookies" className="transition-colors hover:text-cine">Cookies</Link>
          <p className="sm:ml-auto">© {year} Citron · Crafted by Inkblot Studio</p>
        </div>
      </div>
    </Stage>
  );
}
