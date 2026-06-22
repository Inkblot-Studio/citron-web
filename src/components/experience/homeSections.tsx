'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import {
  Users,
  Bot,
  Workflow,
  Landmark,
  ListChecks,
  Megaphone,
  BarChart3,
  Unplug,
  Check,
  ArrowRight,
  Star,
  Layers,
  TrendingUp,
  Clock,
  DollarSign,
  type LucideIcon,
} from 'lucide-react';
import { modules, testimonials, caseStudies, stats } from '@/lib/site';
import { Magnetic } from './ambient/Magnetic';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  Users,
  Bot,
  Workflow,
  Landmark,
  ListChecks,
  Megaphone,
  BarChart3,
};

/* ---------- shared shell (clean, generous whitespace) ---------- */

function Section({
  id,
  tone = 'base',
  className,
  children,
}: {
  id?: string;
  tone?: 'base' | 'surface';
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full overflow-hidden py-24 sm:py-32',
        tone === 'surface' && 'border-y border-[var(--cine-line)]',
        className
      )}
      style={{ background: tone === 'surface' ? 'var(--cine-bg-1)' : 'var(--cine-bg-0)' }}
    >
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
   Trust bar — animated counters
   ============================================================ */

function parseStat(value: string) {
  const m = /^([^\d-]*)([\d.]+)(.*)$/.exec(value);
  if (!m) return { prefix: '', num: 0, suffix: value, decimals: 0 };
  const numStr = m[2];
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  return { prefix: m[1], num: parseFloat(numStr), suffix: m[3], decimals };
}

function Counter({ value, run }: { value: string; run: boolean }) {
  const { prefix, num, suffix, decimals } = parseStat(value);
  const [display, setDisplay] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!run) return;
    if (reduce) {
      setDisplay(num);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(num * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, num, reduce]);

  return (
    <span className="font-mono tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <Section tone="surface">
      <div ref={ref} className="text-center">
        <Eyebrow>Trusted to run the business</Eyebrow>
        <Title className="mx-auto max-w-2xl">Numbers teams feel in the first week.</Title>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
            >
              <div className="text-[2.6rem] font-semibold tracking-[-0.03em] text-[var(--cine-amber)] sm:text-[3.2rem]">
                <Counter value={s.value} run={inView} />
              </div>
              <div className="mt-1 text-[0.85rem] text-cine-dim">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   Product showcase — interactive slider
   ============================================================ */

const SHOWCASE: { slug: string; label: string; kpi: [string, string]; bars: number[] }[] = [
  { slug: 'crm', label: 'CRM', kpi: ['1,248', 'active accounts'], bars: [62, 80, 48, 92] },
  { slug: 'ai-agents', label: 'AI Agents', kpi: ['18', 'tasks done today'], bars: [40, 70, 95, 60] },
  { slug: 'automations', label: 'Automations', kpi: ['34', 'flows running'], bars: [55, 88, 72, 40] },
  { slug: 'accounting', label: 'Finance', kpi: ['$1.2M', 'cash in'], bars: [70, 52, 84, 66] },
  { slug: 'tasks', label: 'Tasks', kpi: ['92%', 'on time'], bars: [48, 60, 90, 75] },
  { slug: 'marketing', label: 'Marketing', kpi: ['4.2x', 'ROAS'], bars: [38, 64, 80, 96] },
  { slug: 'analytics', label: 'Analytics', kpi: ['312', 'MQLs'], bars: [80, 50, 68, 88] },
];

export function ProductShowcase() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setTimeout(() => setActive((p) => (p + 1) % SHOWCASE.length), 4800);
    return () => window.clearTimeout(t);
  }, [active, paused, reduce]);

  const item = SHOWCASE[active];
  const mod = modules.find((m) => m.slug === item.slug)!;
  const Icon = ICONS[mod.icon] ?? Layers;

  return (
    <Section id="product">
      <div className="max-w-2xl">
        <Eyebrow>One system, every surface</Eyebrow>
        <Title>Explore what runs on Citron.</Title>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-cine-dim">
          Every module shares the same data, the same automations, and the same
          intelligence. Pick one to see it in motion.
        </p>
      </div>

      {/* tabs */}
      <div
        className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Citron modules"
      >
        {SHOWCASE.map((s, i) => (
          <button
            key={s.slug}
            role="tab"
            aria-selected={i === active}
            onClick={() => {
              setActive(i);
              setPaused(true);
            }}
            className={cn(
              'shrink-0 rounded-full border px-4 py-2 text-[0.85rem] font-medium transition-colors duration-200',
              i === active
                ? 'border-transparent bg-[var(--cine-amber-bright)] text-[#1d1c19]'
                : 'border-[var(--cine-line)] text-cine-dim hover:text-cine'
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div
        className="mt-6 grid items-stretch gap-6 lg:grid-cols-2"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* copy */}
        <div className="flex flex-col justify-center rounded-[var(--radius-2xl)] cine-card p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-[rgba(var(--cine-particle),0.14)] text-[var(--cine-amber)]">
                <Icon className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 text-[1.5rem] font-semibold tracking-[-0.02em] text-cine">
                {item.label}
              </h3>
              <p className="mt-1 text-[0.95rem] font-medium text-[var(--cine-amber)]">{mod.tagline}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-cine-dim">{mod.description}</p>
              <ul className="mt-5 grid grid-cols-2 gap-2">
                {mod.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[0.8125rem] text-cine-dim">
                    <Check className="h-3.5 w-3.5 shrink-0 text-[var(--cine-amber)]" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* faux product surface */}
        <div className="relative min-h-[20rem] overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--cine-card-border)] bg-[var(--cine-bg-2)] p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cine">
                  <Icon className="h-4 w-4 text-[var(--cine-amber)]" strokeWidth={1.8} />
                  <span className="text-[0.85rem] font-semibold">{item.label}</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[var(--cine-line)]" />
                  <span className="h-2 w-2 rounded-full bg-[var(--cine-line)]" />
                  <span className="h-2 w-2 rounded-full bg-[var(--cine-amber-soft)]" />
                </div>
              </div>

              <div className="mt-6 flex items-end gap-3">
                <div className="text-[2.4rem] font-semibold leading-none tracking-[-0.03em] text-cine">
                  {item.kpi[0]}
                </div>
                <div className="pb-1 text-[0.8rem] text-cine-faint">{item.kpi[1]}</div>
              </div>

              {/* animated bar chart */}
              <div className="mt-6 flex h-28 items-end gap-3">
                {item.bars.map((b, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-md"
                    style={{
                      background:
                        'linear-gradient(180deg, var(--cine-amber-bright), rgba(var(--cine-particle),0.25))',
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${b}%` }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.06 }}
                  />
                ))}
              </div>

              <div className="mt-5 space-y-2">
                {mod.features.slice(0, 2).map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--cine-card-border)] bg-[var(--cine-card)] px-3 py-2 text-[0.8rem] text-cine-dim"
                  >
                    <Check className="h-3.5 w-3.5 text-[var(--cine-amber)]" strokeWidth={3} />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   Stack comparison — the messy stack collapses into one
   ============================================================ */

const OLD_STACK = ['CRM', 'Marketing tool', 'Automation tool', 'Spreadsheets', 'Project mgmt', 'Reporting', 'Accounting'];
const CITRON_TRUTHS = ['One platform', 'One login', 'One intelligence', 'One workflow'];

export function StackComparison() {
  return (
    <Section tone="surface" id="compare">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>The difference</Eyebrow>
        <Title>Seven tools, or one system.</Title>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-cine-dim">
          The traditional stack is a tax you pay every day — in logins, in
          exports, in things that fall through the cracks.
        </p>
      </div>

      <div className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        {/* the old stack */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="mb-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cine-faint lg:text-left">
            The traditional stack
          </p>
          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {OLD_STACK.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--cine-line)] bg-[var(--cine-card)] px-3 py-1.5 text-[0.8rem] text-cine-dim"
              >
                <Unplug className="h-3.5 w-3.5 text-cine-faint" strokeWidth={1.8} />
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* connector */}
        <motion.div
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--cine-amber-bright)] text-[#1d1c19] lg:h-14 lg:w-14"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
        >
          <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={2.4} />
        </motion.div>

        {/* citron */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="rounded-[var(--radius-2xl)] cine-card p-6"
          style={{ boxShadow: '0 0 50px -16px rgba(var(--cine-particle),0.6)' }}
        >
          <div className="flex items-center gap-2 text-cine">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(var(--cine-particle),0.16)] text-[var(--cine-amber)]">
              <Layers className="h-4 w-4" strokeWidth={1.9} />
            </span>
            <span className="text-[1.05rem] font-semibold">Citron</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {CITRON_TRUTHS.map((t) => (
              <div key={t} className="flex items-center gap-2 text-[0.9rem] font-medium text-cine">
                <Check className="h-4 w-4 shrink-0 text-[var(--cine-amber)]" strokeWidth={3} />
                {t}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ============================================================
   Testimonials — continuous, self-moving marquee
   ============================================================ */

type Card = { quote: string; name: string; sub: string; metric?: string };

const ROW_A: Card[] = testimonials.map((t) => ({
  quote: t.quote,
  name: t.name,
  sub: `${t.role}, ${t.company}`,
}));

const ROW_B: Card[] = caseStudies.map((c) => ({
  quote: c.summary,
  name: c.company,
  sub: c.industry,
  metric: `${c.metric} ${c.metricLabel}`,
}));

function TestimonialCard({ c }: { c: Card }) {
  return (
    <figure className="flex w-[20rem] shrink-0 flex-col rounded-[var(--radius-2xl)] cine-card p-6 sm:w-[24rem]">
      {c.metric ? (
        <div className="text-[1.4rem] font-semibold tracking-[-0.02em] text-[var(--cine-amber)]">
          {c.metric}
        </div>
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

function MarqueeRow({ cards, duration, reverse }: { cards: Card[]; duration: number; reverse?: boolean }) {
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
          <TestimonialCard key={i} c={c} />
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

/* ============================================================
   ROI calculator — interactive slider, live savings readout
   ============================================================ */

const PER_SEAT_TOOL_COST = 92; // average / seat / month, traditional stack
const PER_SEAT_CITRON = 57; // Growth plan, annual
const HOURS_SAVED_PER_PERSON_WEEK = 6.4;
const HOURLY_VALUE = 55;

export function RoiCalculator() {
  const [team, setTeam] = useState(18);
  const monthlySavings = team * (PER_SEAT_TOOL_COST - PER_SEAT_CITRON);
  const yearlySavings = monthlySavings * 12;
  const hoursPerYear = Math.round(team * HOURS_SAVED_PER_PERSON_WEEK * 48);
  const valueOfTime = hoursPerYear * HOURLY_VALUE;
  const totalImpact = yearlySavings + valueOfTime;

  return (
    <Section id="roi">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>The math</Eyebrow>
        <Title>See what Citron saves your team.</Title>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-cine-dim">
          Move the slider. Watch what one system replaces — in software bills
          and in the time your team gets back.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl rounded-[var(--radius-3xl)] cine-card p-8 sm:p-10">
        <label className="block">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cine-faint">
              Your team size
            </span>
            <span className="font-mono text-[2rem] font-semibold tabular-nums text-cine">
              {team}
            </span>
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
          <RoiTile
            icon={DollarSign}
            label="Saved on software"
            value={`$${yearlySavings.toLocaleString()}`}
            sub="/ year"
          />
          <RoiTile
            icon={Clock}
            label="Hours back to your team"
            value={hoursPerYear.toLocaleString()}
            sub="hrs / year"
          />
          <RoiTile
            icon={TrendingUp}
            label="Total annual impact"
            value={`$${totalImpact.toLocaleString()}`}
            sub="incl. time value"
            highlight
          />
        </div>

        <p className="mt-6 text-center text-[0.75rem] text-cine-faint">
          Based on industry averages. Most teams see results within the first
          month.
        </p>

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
    </Section>
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

/* ============================================================
   Final CTA band
   ============================================================ */

export function FinalCta() {
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto max-w-3xl text-center"
      >
        <Title className="mx-auto max-w-3xl">
          Run your whole company on <span className="gradient-amber">one system.</span>
        </Title>
        <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-cine-dim">
          See Citron mapped to how your team actually works — a focused
          30-minute walkthrough, no slides for the sake of slides.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
      </motion.div>
    </Section>
  );
}
