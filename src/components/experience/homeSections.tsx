'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from 'framer-motion';
import {
  Users,
  Sparkles,
  Workflow,
  ReceiptText,
  BarChart3,
  Globe,
  Check,
  ArrowRight,
  Star,
  Clock,
  DollarSign,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { testimonials, caseStudies } from '@/lib/site';
import { bentoTiles, surfaces, proofMetrics, type Surface as SurfaceType } from '@/lib/experience';
import { Card, BrowserFrame, MeshBackdrop, SectionPhotoBg } from './kit';
import { Magnetic } from './ambient/Magnetic';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  Users,
  Sparkles,
  Workflow,
  ReceiptText,
  BarChart3,
  Globe,
};

/* ---------- shared shell ---------- */

function Section({
  id,
  tone = 'base',
  snap = true,
  bgImage,
  bgOverlay = 'light',
  className,
  children,
}: {
  id?: string;
  tone?: 'base' | 'surface' | 'dark';
  snap?: boolean;
  bgImage?: string;
  bgOverlay?: 'light' | 'dark';
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full overflow-hidden py-24 sm:py-32',
        snap && 'snap-section',
        tone === 'surface' && 'border-y border-[var(--cine-line)]',
        tone === 'dark' && 'cine-section-dark',
        className
      )}
      style={
        bgImage || tone === 'dark'
          ? undefined
          : { background: tone === 'surface' ? 'var(--cine-bg-1)' : 'var(--cine-bg-0)' }
      }
    >
      {bgImage && <SectionPhotoBg src={bgImage} overlay={bgOverlay} />}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-10">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow-cine text-[0.7rem] font-semibold">{children}</span>;
}

function Title({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        'mt-4 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.03] tracking-[-0.035em] text-cine',
        className
      )}
    >
      {children}
    </h2>
  );
}

/* ============================================================
   Bento mini-visuals — small, live product moments
   ============================================================ */

function MiniBars({ values, animate = true }: { values: number[]; animate?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className="flex h-full items-end gap-2">
      {values.map((v, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-[4px]"
          style={{
            background: 'linear-gradient(180deg, var(--cine-amber-bright), rgba(var(--cine-particle),0.22))',
          }}
          initial={{ height: animate ? 0 : `${v}%` }}
          animate={{ height: inView || !animate ? `${v}%` : 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.06 }}
        />
      ))}
    </div>
  );
}

/** A cropped product screenshot that fills the rest of a bento tile. */
function BentoShot({ src, pos }: { src: string; pos?: string }) {
  return (
    <div className="relative mt-5 min-h-[150px] flex-1 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--cine-card-border)] bg-[var(--cine-bg-2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition: pos ?? '50% 0%' }}
        sizes="(max-width: 1024px) 100vw, 720px"
        quality={90}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: 'inset 0 0 0 1px var(--cine-card-border)' }}
      />
    </div>
  );
}

function BentoVisual({ kind }: { kind: string }) {
  if (kind === 'chart') {
    return (
      <div className="mt-5 flex-1">
        <div className="flex h-full min-h-[88px] items-end">
          <MiniBars values={[44, 68, 52, 88, 72]} />
        </div>
      </div>
    );
  }
  if (kind === 'flow') {
    const nodes = ['Deal won', 'Invoice', 'Onboard'];
    return (
      <div className="mt-5 flex flex-1 flex-wrap content-end items-center gap-1.5">
        {nodes.map((node, i) => (
          <Fragmentish key={node} last={i === nodes.length - 1}>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.12 }}
              className="rounded-full border border-[var(--cine-line)] bg-[var(--cine-bg-2)] px-2.5 py-1 text-[0.7rem] font-medium text-cine"
            >
              {node}
            </motion.span>
          </Fragmentish>
        ))}
      </div>
    );
  }
  // finance
  return (
    <div className="mt-5 flex flex-1 flex-col justify-end">
      <div className="rounded-[var(--radius-lg)] border border-[var(--cine-line)] bg-[var(--cine-bg-2)] p-4">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[1.6rem] font-semibold leading-none tracking-[-0.02em] text-cine">$63,400</span>
          <span className="text-[0.72rem] text-cine-faint">collected</span>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[rgba(var(--cine-particle),0.1)] px-2.5 py-1 text-[0.7rem] font-medium text-[var(--cine-amber)]">
          <Check className="h-3 w-3" strokeWidth={3} /> 9 invoices · paid
        </div>
      </div>
    </div>
  );
}

// tiny helper to render a connector between flow nodes
function Fragmentish({ children, last }: { children: ReactNode; last: boolean }) {
  return (
    <>
      {children}
      {!last && <ArrowRight className="h-3 w-3 shrink-0 text-cine-faint" />}
    </>
  );
}

const BENTO_SPAN: Record<string, string> = {
  lg: 'sm:col-span-2 lg:col-span-2 lg:row-span-2',
  tall: 'lg:row-span-2',
  wide: 'sm:col-span-2 lg:col-span-3',
  sm: '',
};

export function BentoSection() {
  return (
    <Section id="platform-overview" tone="surface">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
        <div>
          <Eyebrow>One system, every function</Eyebrow>
          <Title>Everything your business runs on.</Title>
          <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-cine-dim">
            Not a bundle of apps — one platform where every module shares the same
            data, the same automations, and the same intelligence.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 rounded-[var(--radius-2xl)] cine-card p-5">
          {[
            { v: '12+', l: 'modules' },
            { v: '1', l: 'login' },
            { v: '∞', l: 'workflows' },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-mono text-[1.75rem] font-semibold tracking-[-0.03em] text-[var(--cine-amber)] sm:text-[2rem]">
                {s.v}
              </div>
              <div className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-cine-faint">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid auto-rows-[minmax(168px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bentoTiles.map((tile, i) => {
          const Icon = ICONS[tile.icon] ?? Sparkles;
          const isShot = tile.visual === 'shot';
          return (
            <Card
              key={tile.id}
              delay={0.04 * i}
              className={cn('flex flex-col !p-5', BENTO_SPAN[tile.span])}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[rgba(var(--cine-particle),0.12)] text-[var(--cine-amber)]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cine-faint">
                  {tile.eyebrow}
                </span>
              </div>
              <h3 className="mt-4 text-[1.2rem] font-semibold leading-tight tracking-[-0.02em] text-cine">
                {tile.title}
              </h3>
              <p className="mt-2 max-w-[44ch] text-[0.9rem] leading-relaxed text-cine-dim">{tile.desc}</p>
              {isShot && tile.image ? (
                <BentoShot src={tile.image} pos={tile.imagePos} />
              ) : (
                <BentoVisual kind={tile.visual} />
              )}
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

/* ============================================================
   Horizontal showcase — product surfaces that scroll sideways
   ============================================================ */

function SurfaceMock({ kind }: { kind: SurfaceType['kind'] }) {
  if (kind === 'dashboard') {
    return (
      <div className="grid h-full grid-cols-3 gap-3">
        <div className="col-span-3 grid grid-cols-3 gap-3">
          {[
            { k: 'Revenue', v: '$1.24M' },
            { k: 'Pipeline', v: '$3.8M' },
            { k: 'Cash', v: '$612k' },
          ].map((m) => (
            <div key={m.k} className="rounded-[var(--radius-md)] border border-[var(--cine-line)] bg-[var(--cine-bg-1)] p-3">
              <div className="text-[0.65rem] uppercase tracking-[0.14em] text-cine-faint">{m.k}</div>
              <div className="mt-1 font-mono text-[1.1rem] font-semibold tracking-[-0.02em] text-cine">{m.v}</div>
            </div>
          ))}
        </div>
        <div className="col-span-2 rounded-[var(--radius-md)] border border-[var(--cine-line)] bg-[var(--cine-bg-1)] p-3">
          <div className="text-[0.7rem] font-medium text-cine-dim">Revenue · last 6 months</div>
          <div className="mt-2 h-[calc(100%-1.5rem)]">
            <MiniBars values={[40, 58, 50, 72, 66, 90]} />
          </div>
        </div>
        <div className="rounded-[var(--radius-md)] border border-[var(--cine-line)] bg-[var(--cine-bg-1)] p-3">
          <div className="text-[0.7rem] font-medium text-cine-dim">Today</div>
          <div className="mt-2 space-y-1.5">
            {['3 invoices sent', 'Acme moved to Won', '2 tasks due'].map((t) => (
              <div key={t} className="flex items-center gap-1.5 text-[0.72rem] text-cine-dim">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--cine-amber)]" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (kind === 'board') {
    const cols = [
      { name: 'Qualified', deals: ['Atlas Co', 'Vega'] },
      { name: 'Proposal', deals: ['Meridian'] },
      { name: 'Won', deals: ['Helix', 'Acme'] },
    ];
    return (
      <div className="grid h-full grid-cols-3 gap-3">
        {cols.map((c) => (
          <div key={c.name} className="flex flex-col rounded-[var(--radius-md)] border border-[var(--cine-line)] bg-[var(--cine-bg-1)] p-2.5">
            <div className="mb-2 flex items-center justify-between text-[0.7rem] font-semibold text-cine">
              {c.name}
              <span className="text-cine-faint">{c.deals.length}</span>
            </div>
            <div className="space-y-2">
              {c.deals.map((d) => (
                <div key={d} className="rounded-[var(--radius-sm)] border border-[var(--cine-line)] bg-[var(--cine-bg-2)] px-2.5 py-2">
                  <div className="text-[0.75rem] font-medium text-cine">{d}</div>
                  <div className="mt-1 h-1 w-2/3 rounded-full bg-[rgba(var(--cine-particle),0.25)]" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'agent') {
    return (
      <div className="flex h-full flex-col justify-center gap-3">
        <div className="rounded-[var(--radius-md)] border border-[var(--cine-line)] bg-[var(--cine-bg-1)] p-4 font-mono text-[0.85rem] text-cine">
          <span className="text-[var(--cine-amber)]">›</span> Build this month’s revenue report
        </div>
        {['Pulled revenue, churn & runway', 'Generated 4-page summary', 'Shared with #leadership'].map((s, i) => (
          <div key={s} className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[rgba(var(--cine-particle),0.2)] bg-[rgba(var(--cine-particle),0.07)] px-3 py-2 text-[0.8rem] text-cine-dim">
            <span className="font-mono text-[0.7rem] text-[var(--cine-amber)]">{i + 1}</span>
            <Check className="h-3.5 w-3.5 text-[var(--cine-amber)]" strokeWidth={3} />
            {s}
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'analytics') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-baseline gap-3">
          <div className="font-mono text-[2rem] font-semibold leading-none tracking-[-0.03em] text-cine">4.2x</div>
          <div className="text-[0.75rem] text-cine-faint">ROAS · up 19% MoM</div>
        </div>
        <div className="mt-4 flex-1">
          <MiniBars values={[36, 52, 44, 70, 60, 82, 96]} />
        </div>
        <div className="mt-3 flex gap-3 text-[0.7rem] text-cine-dim">
          {['Organic', 'Paid', 'Email'].map((l) => (
            <span key={l} className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-[var(--cine-amber)]" /> {l}
            </span>
          ))}
        </div>
      </div>
    );
  }
  // automation
  const steps = [
    { t: 'When a deal is won', kind: 'trigger' },
    { t: 'Generate & send invoice', kind: 'action' },
    { t: 'Alert the delivery team', kind: 'action' },
    { t: 'Start customer onboarding', kind: 'action' },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {steps.map((s, i) => (
        <div key={s.t} className="flex items-center gap-3">
          <span
            className={cn(
              'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold',
              s.kind === 'trigger'
                ? 'bg-[var(--cine-amber-bright)] text-[#1d1c19]'
                : 'border border-[var(--cine-line)] text-[var(--cine-amber)]'
            )}
          >
            {i + 1}
          </span>
          <div
            className={cn(
              'flex-1 rounded-[var(--radius-md)] border px-3 py-2 text-[0.8rem]',
              s.kind === 'trigger'
                ? 'border-[rgba(var(--cine-particle),0.3)] bg-[rgba(var(--cine-particle),0.08)] font-medium text-cine'
                : 'border-[var(--cine-line)] bg-[var(--cine-bg-1)] text-cine-dim'
            )}
          >
            {s.t}
          </div>
        </div>
      ))}
    </div>
  );
}

function ShowcasePanel({ surface, index }: { surface: SurfaceType; index: number }) {
  return (
    <div className="flex h-full w-[min(88vw,1040px)] shrink-0 flex-col px-3 sm:px-5">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.75rem] text-cine-faint">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--cine-line)] bg-[var(--cine-card)] px-3 py-1 text-[0.72rem] font-medium text-[var(--cine-amber)]">
          {surface.label}
        </span>
      </div>
      <h3 className="mt-3 max-w-[20ch] text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-cine">
        {surface.title}
      </h3>
      <p className="mt-2 max-w-[42ch] text-[0.95rem] leading-relaxed text-cine-dim">{surface.desc}</p>
      <div className="mt-5 min-h-0 flex-1">
        <BrowserFrame url={`app.citron.com/${surface.id}`}>
          <SurfaceMock kind={surface.kind} />
        </BrowserFrame>
      </div>
    </div>
  );
}

export function HorizontalShowcase() {
  const reduce = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setMaxScroll(Math.max(0, el.scrollWidth - window.innerWidth + 48));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [reduce]);

  // Reduced motion / no-pin fallback: a normal swipeable row.
  if (reduce) {
    return (
      <Section id="showcase" snap={false} className="!py-24">
        <Eyebrow>See it in motion</Eyebrow>
        <Title className="max-w-2xl">One platform, every surface.</Title>
        <div className="mt-10 flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {surfaces.map((s, i) => (
            <div key={s.id} className="h-[34rem]">
              <ShowcasePanel surface={s} index={i} />
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <section
      ref={outerRef}
      id="showcase"
      className="relative w-full"
      style={{ height: `calc(100vh + ${maxScroll}px)` }}
    >
      <div
        className="sticky top-0 flex h-screen flex-col overflow-hidden"
        style={{ background: 'var(--cine-bg-0)' }}
      >
        <MeshBackdrop className="opacity-70" />

        {/* Fixed header band — sits above the reel, never overlaps it */}
        <div className="relative z-10 mx-auto w-full max-w-[1200px] shrink-0 px-6 pt-24 pb-2 sm:pt-28 lg:px-10">
          <Eyebrow>See it in motion</Eyebrow>
          <Title className="max-w-2xl">One platform, every surface.</Title>
        </div>

        {/* The reel — fills the space below the header, vertically centered */}
        <div className="relative z-10 flex min-h-0 flex-1 items-center">
          <motion.div
            ref={trackRef}
            className="flex h-[min(62vh,30rem)] items-stretch gap-6 px-6 lg:px-10"
            style={{ x }}
          >
            {surfaces.map((s, i) => (
              <ShowcasePanel key={s.id} surface={s} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="relative z-10 mx-auto w-full max-w-[1200px] shrink-0 px-6 pb-8 lg:px-10">
          <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--cine-line)]">
            <motion.div
              className="h-full rounded-full bg-[var(--cine-amber-bright)]"
              style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Proof — numbers that rise on scroll + the ROI calculator
   ============================================================ */

/* ============================================================
   Proof — numbers that count up on scroll + the ROI calculator
   ============================================================ */

function parseProofValue(value: string) {
  if (value.includes('→')) return { kind: 'static' as const, text: value };
  const lt = /^<([\d.]+)\s*(.*)$/.exec(value);
  if (lt) {
    return {
      kind: 'count' as const,
      prefix: '<',
      num: parseFloat(lt[1]),
      suffix: lt[2] ? ` ${lt[2]}` : '',
      decimals: 0,
    };
  }
  const m = /^([+\u2212-]?)([\d.]+)(.*)$/.exec(value);
  if (!m) return { kind: 'static' as const, text: value };
  const numStr = m[2];
  return {
    kind: 'count' as const,
    prefix: m[1],
    num: parseFloat(numStr),
    suffix: m[3],
    decimals: numStr.includes('.') ? numStr.split('.')[1].length : 0,
  };
}

function ProofCounter({ value, run }: { value: string; run: boolean }) {
  const parsed = parseProofValue(value);
  const [display, setDisplay] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const p = parseProofValue(value);
    if (p.kind === 'static') return;
    if (!run) {
      setDisplay(0);
      return;
    }
    if (reduce) {
      setDisplay(p.num);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const prog = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      setDisplay(p.num * eased);
      if (prog < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value, reduce]);

  if (parsed.kind === 'static') return <>{parsed.text}</>;

  return (
    <span className="font-mono tabular-nums">
      {parsed.prefix}
      {display.toFixed(parsed.decimals)}
      {parsed.suffix}
    </span>
  );
}

function ProofMetric({ metric, index }: { metric: (typeof proofMetrics)[number]; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const range = 60 + index * 22;
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [range, -range]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
      className="rounded-[var(--radius-2xl)] cine-card p-6"
    >
      <div className="font-mono text-[2.6rem] font-semibold leading-none tracking-[-0.03em] text-[var(--cine-amber)] sm:text-[3rem]">
        <ProofCounter value={metric.value} run={inView} />
      </div>
      <div className="mt-3 text-[0.95rem] font-semibold text-cine">{metric.label}</div>
      <div className="mt-1 text-[0.82rem] text-cine-dim">{metric.sub}</div>
    </motion.div>
  );
}

const PER_SEAT_TOOL_COST = 92;
const PER_SEAT_CITRON = 57;
const HOURS_SAVED_PER_PERSON_WEEK = 6.4;
const HOURLY_VALUE = 55;

function RoiCalculator() {
  const [team, setTeam] = useState(18);
  const monthlySavings = team * (PER_SEAT_TOOL_COST - PER_SEAT_CITRON);
  const yearlySavings = monthlySavings * 12;
  const hoursPerYear = Math.round(team * HOURS_SAVED_PER_PERSON_WEEK * 48);
  const valueOfTime = hoursPerYear * HOURLY_VALUE;
  const totalImpact = yearlySavings + valueOfTime;

  return (
    <div className="mx-auto mt-16 max-w-3xl rounded-[var(--radius-3xl)] cine-card p-8 sm:p-10">
      <div className="text-center">
        <Eyebrow>Run the math</Eyebrow>
        <h3 className="mt-3 text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-cine">
          See what Citron saves your team.
        </h3>
      </div>

      <label className="mt-8 block">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cine-faint">
            Your team size
          </span>
          <span className="font-mono text-[2rem] font-semibold tabular-nums text-cine">{team}</span>
        </div>
        <input
          type="range"
          min={5}
          max={120}
          value={team}
          onChange={(e) => setTeam(parseInt(e.target.value, 10))}
          className="roi-slider mt-4 w-full"
          style={{ ['--val' as string]: team }}
          aria-label="Team size"
        />
        <div className="mt-1.5 flex justify-between text-[0.7rem] text-cine-faint">
          <span>5</span>
          <span>120+</span>
        </div>
      </label>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <RoiTile icon={DollarSign} label="Saved on software" value={`$${yearlySavings.toLocaleString()}`} sub="/ year" />
        <RoiTile icon={Clock} label="Hours back to your team" value={hoursPerYear.toLocaleString()} sub="hrs / year" />
        <RoiTile
          icon={TrendingUp}
          label="Total annual impact"
          value={`$${totalImpact.toLocaleString()}`}
          sub="incl. time value"
          highlight
        />
      </div>

      <div className="mt-7 flex justify-center">
        <Magnetic strength={0.4}>
          <Link
            href="/demo"
            className="group inline-flex h-[3rem] items-center gap-2 rounded-[var(--radius-lg)] bg-[var(--cine-amber-bright)] px-6 text-[0.95rem] font-semibold text-[#1d1c19] shadow-[0_10px_36px_-12px_rgba(var(--cine-particle),0.7)] transition hover:brightness-105"
          >
            See your real numbers
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Magnetic>
      </div>
    </div>
  );
}

function RoiTile({
  icon: Icon,
  label,
  value,
  sub,
  highlight,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        'relative rounded-[var(--radius-2xl)] border p-5 transition-colors ' +
        (highlight
          ? 'border-[var(--cine-amber-bright)] bg-[rgba(var(--cine-particle),0.1)]'
          : 'border-[var(--cine-line)] bg-[var(--cine-bg-2)]')
      }
    >
      <div className="flex items-center gap-2 text-cine-faint">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em]">{label}</span>
      </div>
      <div
        className={
          'mt-3 font-mono text-[1.55rem] font-semibold leading-none tracking-[-0.02em] tabular-nums ' +
          (highlight ? 'text-[var(--cine-amber)]' : 'text-cine')
        }
      >
        {value}
      </div>
      <div className="mt-1 text-[0.72rem] text-cine-faint">{sub}</div>
    </div>
  );
}

export function ProofSection() {
  return (
    <Section id="roi" tone="dark">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>The numbers</Eyebrow>
        <Title className="mx-auto">Results teams feel in the first week.</Title>
        <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-cine-dim">
          One system instead of seven means less spend, less busywork, and a team
          that moves on its data instead of maintaining it.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {proofMetrics.map((m, i) => (
          <ProofMetric key={m.label} metric={m} index={i} />
        ))}
      </div>

      <RoiCalculator />
    </Section>
  );
}

/* ============================================================
   Testimonials — continuous, self-moving marquee
   ============================================================ */

type Quote = { quote: string; name: string; sub: string; metric?: string };

const ROW_A: Quote[] = testimonials.map((t) => ({
  quote: t.quote,
  name: t.name,
  sub: `${t.role}, ${t.company}`,
}));

const ROW_B: Quote[] = caseStudies.map((c) => ({
  quote: c.summary,
  name: c.company,
  sub: c.industry,
  metric: `${c.metric} ${c.metricLabel}`,
}));

function QuoteCard({ c }: { c: Quote }) {
  return (
    <figure className="flex w-[20rem] shrink-0 flex-col rounded-[var(--radius-2xl)] cine-card p-6 sm:w-[24rem]">
      {c.metric ? (
        <div className="text-[1.4rem] font-semibold tracking-[-0.02em] text-[var(--cine-amber)]">{c.metric}</div>
      ) : (
        <div className="flex gap-0.5 text-[var(--cine-amber)]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </div>
      )}
      <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-cine">{c.quote}</blockquote>
      <figcaption className="mt-4 text-[0.8125rem] text-cine-faint">
        <span className="font-semibold text-cine">{c.name}</span> · {c.sub}
      </figcaption>
    </figure>
  );
}

function MarqueeRow({ cards, duration, reverse }: { cards: Quote[]; duration: number; reverse?: boolean }) {
  const doubled = [...cards, ...cards];
  return (
    <div className="group flex overflow-hidden mask-fade-edges">
      <div
        className="flex shrink-0 gap-4 pr-4 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((c, i) => (
          <QuoteCard key={i} c={c} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <Section id="customers">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Why teams switch</Eyebrow>
        <Title>Loved by the people who run the business.</Title>
      </div>
      <div className="mt-12 space-y-4">
        <MarqueeRow cards={ROW_A} duration={46} />
        <MarqueeRow cards={ROW_B} duration={54} reverse />
      </div>
    </Section>
  );
}
