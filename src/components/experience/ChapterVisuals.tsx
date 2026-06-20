'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import {
  Users,
  Megaphone,
  Workflow,
  Bot,
  ReceiptText,
  ListChecks,
  Sparkles,
} from 'lucide-react';
import { agentPrompts, fragmentedTools } from '@/lib/experience';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Square stage that every chapter visual lives inside. */
function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-square w-full max-w-[26rem]">{children}</div>
  );
}

/* ============================================================
   01 — Unification: scattered tools absorbed into one core
   ============================================================ */
// Start positions as percentages of the stage (centering handled by a
// constant translate(-50%,-50%); convergence animates left/top to center).
const TOOL_POS = [
  { l: 18, t: 14 },
  { l: 78, t: 12 },
  { l: 8, t: 44 },
  { l: 90, t: 40 },
  { l: 22, t: 82 },
  { l: 74, t: 84 },
  { l: 50, t: 6 },
  { l: 48, t: 94 },
  { l: 90, t: 72 },
  { l: 10, t: 70 },
];

export function UnificationVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  return (
    <Stage>
      <div ref={ref} className="absolute inset-0">
        {/* central core */}
        <motion.div
          className="absolute left-1/2 top-1/2 -ml-12 -mt-12 flex h-24 w-24 items-center justify-center rounded-full"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: reduce ? 0 : 0.6 }}
          style={{
            background:
              'radial-gradient(circle, rgba(217,188,88,0.35), rgba(196,160,48,0.08) 70%)',
            boxShadow: '0 0 50px 6px rgba(217,188,88,0.4)',
          }}
        >
          <Sparkles className="h-8 w-8 text-[#f3e3a6]" strokeWidth={1.6} />
        </motion.div>

        {fragmentedTools.map((tool, i) => {
          const pos = TOOL_POS[i % TOOL_POS.length];
          return (
            <motion.span
              key={tool}
              className="absolute cine-card whitespace-nowrap rounded-full px-3 py-1.5 text-[0.72rem] font-medium text-cine-dim"
              style={{ transform: 'translate(-50%, -50%)' }}
              initial={{ left: `${pos.l}%`, top: `${pos.t}%`, opacity: 0 }}
              animate={
                inView
                  ? reduce
                    ? { left: `${pos.l}%`, top: `${pos.t}%`, opacity: 1 }
                    : { left: '50%', top: '50%', opacity: [0, 1, 1, 0] }
                  : {}
              }
              transition={{
                duration: reduce ? 0.5 : 1.5,
                ease: EASE,
                delay: reduce ? i * 0.03 : i * 0.09,
                times: reduce ? undefined : [0, 0.22, 0.7, 1],
              }}
            >
              {tool}
            </motion.span>
          );
        })}
      </div>
    </Stage>
  );
}

/* ============================================================
   02 — CRM: pipeline with a deal flowing through stages
   ============================================================ */
const STAGES = ['Lead', 'Qualified', 'Proposal', 'Won'];
const CONTACTS = [
  { initials: 'MO', x: '6%', y: '12%' },
  { initials: 'DR', x: '74%', y: '30%' },
  { initials: 'SL', x: '12%', y: '74%' },
];

export function CrmVisual() {
  const reduce = useReducedMotion();
  return (
    <Stage>
      <div className="absolute inset-0">
        {/* floating contacts */}
        {CONTACTS.map((c, i) => (
          <motion.div
            key={c.initials}
            className="absolute flex h-11 w-11 items-center justify-center rounded-full cine-card text-[0.7rem] font-semibold text-[#f3e3a6]"
            style={{ left: c.x, top: c.y }}
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 4 + i, ease: 'easeInOut', repeat: Infinity, delay: i * 0.5 }}
          >
            {c.initials}
            <Users className="absolute -right-1 -top-1 h-3.5 w-3.5 text-[var(--cine-amber)]" />
          </motion.div>
        ))}

        {/* pipeline */}
        <div className="absolute left-1/2 top-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2 space-y-3">
          {STAGES.map((s, i) => (
            <motion.div
              key={s}
              className="relative flex items-center justify-between rounded-[var(--radius-md)] cine-card px-4 py-3"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
            >
              <span className="text-[0.8rem] font-medium text-cine">{s}</span>
              <span className="text-[0.7rem] text-cine-faint">{[42, 28, 12, 6][i]}</span>
            </motion.div>
          ))}

          {/* travelling deal */}
          {!reduce && (
            <motion.div
              className="absolute left-[-10px] top-3 h-3 w-3 rounded-full bg-[#fff4cd]"
              style={{ boxShadow: '0 0 16px 4px rgba(217,188,88,0.8)' }}
              animate={{ top: ['6%', '34%', '62%', '90%'] }}
              transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
            />
          )}
        </div>
      </div>
    </Stage>
  );
}

/* ============================================================
   03 — Marketing: signals radiating, audiences lighting up
   ============================================================ */
const AUDIENCE = [0, 60, 120, 180, 240, 300];

export function MarketingVisual() {
  const reduce = useReducedMotion();
  return (
    <Stage>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* expanding signal rings */}
        {!reduce &&
          [0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 -ml-12 -mt-12 h-24 w-24 rounded-full border border-[var(--cine-amber)]"
              style={{ animation: `ring-expand 3s ease-out ${i}s infinite` }}
            />
          ))}

        {/* hub */}
        <div
          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full cine-card"
          style={{ boxShadow: '0 0 36px 4px rgba(217,188,88,0.35)' }}
        >
          <Megaphone className="h-6 w-6 text-[#f3e3a6]" strokeWidth={1.6} />
        </div>

        {/* audience nodes */}
        {AUDIENCE.map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const R = 150;
          return (
            <motion.span
              key={deg}
              className="absolute h-3.5 w-3.5 rounded-full bg-[var(--cine-amber)]"
              style={{
                left: `calc(50% + ${Math.cos(rad) * R}px)`,
                top: `calc(50% + ${Math.sin(rad) * R}px)`,
                marginLeft: -7,
                marginTop: -7,
                boxShadow: '0 0 12px 2px rgba(217,188,88,0.6)',
              }}
              animate={reduce ? undefined : { opacity: [0.25, 1, 0.25], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 3,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          );
        })}
      </div>
    </Stage>
  );
}

/* ============================================================
   04 — Automations: a workflow drawing itself
   ============================================================ */
export function AutomationsVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  const node: Variants = {
    hidden: { opacity: 0, scale: 0.6 },
    show: (d: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: EASE, delay: d },
    }),
  };

  return (
    <Stage>
      <div ref={ref} className="absolute inset-0">
        <svg viewBox="0 0 360 360" className="absolute inset-0 h-full w-full">
          <motion.path
            d="M180 60 L180 150 M180 150 L90 230 M180 150 L270 230"
            fill="none"
            stroke="rgba(217,188,88,0.5)"
            strokeWidth="2"
            strokeDasharray="0 1"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: reduce ? 0 : 1.2, ease: EASE, delay: 0.3 }}
          />
        </svg>

        {/* trigger */}
        <Flow node={node} inView={inView} delay={0} x="50%" y="16%" label="Trigger" sub="New lead">
          <Sparkles className="h-4 w-4" />
        </Flow>
        {/* condition */}
        <Flow node={node} inView={inView} delay={0.5} x="50%" y="42%" label="Condition" sub="If score > 80">
          <Workflow className="h-4 w-4" />
        </Flow>
        {/* actions */}
        <Flow node={node} inView={inView} delay={1.1} x="25%" y="66%" label="Notify" sub="Slack">
          <Bot className="h-4 w-4" />
        </Flow>
        <Flow node={node} inView={inView} delay={1.3} x="75%" y="66%" label="Create" sub="Task">
          <ListChecks className="h-4 w-4" />
        </Flow>
      </div>
    </Stage>
  );
}

function Flow({
  node,
  inView,
  delay,
  x,
  y,
  label,
  sub,
  children,
}: {
  node: Variants;
  inView: boolean;
  delay: number;
  x: string;
  y: string;
  label: string;
  sub: string;
  children: React.ReactNode;
}) {
  // Static wrapper owns the centering transform; the inner motion node owns
  // the animated transform (scale) so the two never collide.
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      <motion.div
        className="flex items-center gap-2 rounded-[var(--radius-md)] cine-card px-3 py-2"
        variants={node}
        custom={delay}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        <span className="text-[var(--cine-amber)]">{children}</span>
        <span className="leading-tight">
          <span className="block text-[0.72rem] font-medium text-cine">{label}</span>
          <span className="block text-[0.62rem] text-cine-faint">{sub}</span>
        </span>
      </motion.div>
    </div>
  );
}

/* ============================================================
   05 — AI Agents: prompts being executed
   ============================================================ */
export function AgentsVisual() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    if (reduce) {
      setTyped(agentPrompts[0].prompt);
      setShowReply(true);
      return;
    }
    let cancelled = false;
    const current = agentPrompts[idx];
    setTyped('');
    setShowReply(false);

    let i = 0;
    const type = () => {
      if (cancelled) return;
      if (i <= current.prompt.length) {
        setTyped(current.prompt.slice(0, i));
        i += 1;
        timer = window.setTimeout(type, 34);
      } else {
        timer = window.setTimeout(() => {
          if (cancelled) return;
          setShowReply(true);
          timer = window.setTimeout(() => {
            if (!cancelled) setIdx((p) => (p + 1) % agentPrompts.length);
          }, 2600);
        }, 500);
      }
    };
    let timer = window.setTimeout(type, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [idx, reduce]);

  const reply = agentPrompts[idx].reply;

  return (
    <Stage>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full rounded-[var(--radius-xl)] cine-card p-5">
          <div className="flex items-center gap-2 text-[var(--cine-amber)]">
            <Bot className="h-4 w-4" />
            <span className="text-[0.72rem] font-medium tracking-wide text-cine-dim">
              Citron Agent
            </span>
          </div>

          <div className="mt-4 min-h-[3.5rem] font-mono text-[0.82rem] leading-relaxed text-cine">
            <span className="text-[var(--cine-amber)]">›</span> {typed}
            {!showReply && !reduce && (
              <span
                className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-[var(--cine-amber)]"
                style={{ animation: 'caret-blink 1s step-end infinite' }}
              />
            )}
          </div>

          <motion.div
            className="mt-3 flex items-start gap-2 rounded-[var(--radius-md)] border border-[rgba(217,188,88,0.18)] bg-[rgba(217,188,88,0.06)] p-3"
            initial={{ opacity: 0, y: 8 }}
            animate={showReply ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--cine-amber)]" />
            <span className="text-[0.8rem] leading-relaxed text-cine-dim">{reply}</span>
          </motion.div>

          <div className="mt-4 flex gap-1.5">
            {agentPrompts.map((_, i) => (
              <span
                key={i}
                className="h-1 flex-1 rounded-full transition-colors duration-300"
                style={{
                  background:
                    i === idx ? 'var(--cine-amber)' : 'rgba(217,188,88,0.18)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ============================================================
   06 — Finance: invoices emerging, revenue rising
   ============================================================ */
const BARS = [38, 52, 46, 68, 60, 82, 74];

export function FinanceVisual() {
  return (
    <Stage>
      <div className="absolute inset-0">
        {/* invoice cards */}
        <div className="absolute left-0 top-[8%] w-[58%] space-y-2.5">
          {['#1042 · Acme', '#1043 · Northwind', '#1044 · Atlas'].map((inv, i) => (
            <motion.div
              key={inv}
              className="flex items-center justify-between rounded-[var(--radius-md)] cine-card px-3 py-2.5"
              initial={{ opacity: 0, y: 18, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.14 }}
            >
              <span className="flex items-center gap-2 text-[0.72rem] text-cine-dim">
                <ReceiptText className="h-3.5 w-3.5 text-[var(--cine-amber)]" />
                {inv}
              </span>
              <span className="font-mono text-[0.68rem] text-[#f3e3a6]">paid</span>
            </motion.div>
          ))}
        </div>

        {/* revenue bars */}
        <div className="absolute bottom-[8%] right-0 flex h-[42%] w-[40%] items-end gap-1.5">
          {BARS.map((h, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                background:
                  'linear-gradient(to top, rgba(196,160,48,0.4), rgba(232,211,138,0.95))',
              }}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.07 }}
            />
          ))}
        </div>
      </div>
    </Stage>
  );
}

/* ============================================================
   07 — Operations: everything converging into one grid
   ============================================================ */
const TILES = [
  { label: 'Tasks', from: { x: -60, y: -60 } },
  { label: 'Teams', from: { x: 60, y: -50 } },
  { label: 'Projects', from: { x: -50, y: 60 } },
  { label: 'Docs', from: { x: 55, y: 55 } },
  { label: 'Chat', from: { x: 0, y: -80 } },
  { label: 'Calendar', from: { x: 0, y: 80 } },
];

export function OperationsVisual() {
  return (
    <Stage>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-3">
          {TILES.map((t, i) => (
            <motion.div
              key={t.label}
              className="flex h-20 w-20 flex-col items-center justify-center gap-1.5 rounded-[var(--radius-lg)] cine-card text-[0.68rem] font-medium text-cine-dim sm:h-24 sm:w-24"
              initial={{ opacity: 0, x: t.from.x, y: t.from.y, scale: 0.7 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            >
              <ListChecks className="h-4 w-4 text-[var(--cine-amber)]" />
              {t.label}
            </motion.div>
          ))}
        </div>
      </div>
    </Stage>
  );
}
