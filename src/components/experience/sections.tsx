'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
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
  Unplug,
  type LucideIcon,
} from 'lucide-react';
import {
  problemTools,
  crmFeatures,
  platformModules,
  platformPoints,
  aiActions,
  automationFlow,
  impactMetrics,
  impactQuote,
  comparison,
  inkblotPillars,
} from '@/lib/experience';
import { siteConfig } from '@/lib/site';
import { Stage, SplitStage, Card, SectionHead } from './kit';
import { Magnetic } from './ambient/Magnetic';

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

/* ---------- 1 · What is Citron? ---------- */
export function HeroSection() {
  return (
    <Stage index={0}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      >
        <span className="eyebrow-cine text-[0.72rem] font-semibold">
          The Business Operating System
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.04em] text-cine sm:text-[4.25rem]">
          Run your whole company on{' '}
          <span className="gradient-amber">one system.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[1.125rem] leading-relaxed text-cine-dim">
          Citron unifies sales, finance, and operations into a single
          intelligent platform — so your business runs as one, not as seven
          disconnected tools.
        </p>
        <div className="mt-9 flex justify-center">
          <Magnetic strength={0.45}>
            <Link
              href="/demo"
              className="group inline-flex h-[3.5rem] items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--cine-amber-bright)] px-8 text-[1.0625rem] font-semibold text-[#1d1c19] shadow-[0_10px_36px_-10px_rgba(var(--cine-particle),0.8)] transition-[filter,box-shadow,transform] duration-200 hover:brightness-105 hover:shadow-[0_18px_50px_-12px_rgba(var(--cine-particle),0.95)]"
            >
              Book a Demo
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </div>
      </motion.div>
    </Stage>
  );
}

/* ---------- 2 · Why are the old tools broken? ---------- */
export function ProblemSection() {
  return (
    <Stage index={1}>
      <SectionHead
        eyebrow="The problem"
        title={
          <>
            Your business is <span className="gradient-amber">fragmented.</span>
          </>
        }
        sub="Every tool holds a piece of the truth, and none of them talk. Teams lose hours to copy-paste, tab-switching, and numbers that never quite match."
      />
      <div className="mt-8 grid grid-cols-2 gap-3">
        {problemTools.map((tool, i) => (
          <Card key={tool} delay={i * 0.05} className="!p-4">
            <div className="flex items-center gap-2.5 text-cine-dim">
              <Unplug className="h-4 w-4 text-[var(--cine-amber)]" strokeWidth={1.8} />
              <span className="text-[0.9rem] font-medium">{tool}</span>
            </div>
          </Card>
        ))}
      </div>
    </Stage>
  );
}

/* ---------- 3 · What is Citron CRM? ---------- */
export function CrmSection() {
  return (
    <Stage index={2}>
      <SectionHead
        eyebrow="Citron CRM"
        title={
          <>
            The CRM your team will{' '}
            <span className="gradient-amber">actually use.</span>
          </>
        }
        sub="A focused, standalone product for the people who close the deals — built to be lived in, not fought with."
      />
      <div className="mt-8 grid grid-cols-2 gap-3">
        <Card className="col-span-2">
          <span className="text-[0.95rem] font-semibold text-cine">{crmFeatures[0].title}</span>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-cine-dim">{crmFeatures[0].desc}</p>
        </Card>
        {crmFeatures.slice(1).map((f, i) => (
          <Card key={f.title} delay={0.08 + i * 0.06} className="!p-5">
            <span className="text-[0.9rem] font-semibold text-cine">{f.title}</span>
            <p className="mt-1.5 text-[0.82rem] leading-relaxed text-cine-dim">{f.desc}</p>
          </Card>
        ))}
      </div>
    </Stage>
  );
}

/* ---------- 4 · What is Citron Platform? (centerpiece) ---------- */
export function PlatformSection() {
  return (
    <SplitStage
      index={3}
      left={
        <>
          <SectionHead
            eyebrow="Citron Platform"
            title={
              <>
                Bigger than a <span className="gradient-amber">CRM.</span>
              </>
            }
            sub="CRM is only where it starts. Citron Platform runs everything else your company does, too — on the very same foundation."
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
        <div className="grid grid-cols-2 gap-3">
          {platformModules.map((m, i) => {
            const Icon = ICONS[m.icon] ?? Boxes;
            return (
              <Card key={m.name} delay={i * 0.04} className="!p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(var(--cine-particle),0.14)] text-[var(--cine-amber)]">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span className="mt-3 block text-[0.88rem] font-semibold text-cine">{m.name}</span>
              </Card>
            );
          })}
        </div>
      }
    />
  );
}

/* ---------- 5 · How does AI help? ---------- */
export function AiSection() {
  return (
    <Stage index={4}>
      <SectionHead
        eyebrow="AI in action"
        title={
          <>
            Just <span className="gradient-amber">ask.</span>
          </>
        }
        sub="Citron AI lives inside every workflow — drafting, summarizing, and doing real work across your whole business. Plain language in, finished work out."
      />
      <AiConsole />
    </Stage>
  );
}

/** A live console: the AI types a request, then shows the outcome — on a loop. */
function AiConsole() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setTyped(aiActions[0].prompt);
      setDone(true);
      return;
    }
    const current = aiActions[i];
    setTyped('');
    setDone(false);
    let c = 0;
    let timer: number;
    const type = () => {
      if (c <= current.prompt.length) {
        setTyped(current.prompt.slice(0, c));
        c += 1;
        timer = window.setTimeout(type, 36);
      } else {
        timer = window.setTimeout(() => {
          setDone(true);
          timer = window.setTimeout(() => setI((p) => (p + 1) % aiActions.length), 2600);
        }, 450);
      }
    };
    timer = window.setTimeout(type, 320);
    return () => window.clearTimeout(timer);
  }, [i, reduce]);

  return (
    <Card className="mt-8 !p-6">
      <div className="flex items-center gap-2 text-[var(--cine-amber)]">
        <Sparkles className="h-4 w-4" />
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cine-dim">
          Citron AI
        </span>
      </div>

      <p className="mt-4 min-h-[3rem] font-mono text-[0.9rem] leading-relaxed text-cine">
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
        transition={{ duration: 0.45, ease: EASE }}
      >
        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--cine-amber)]" strokeWidth={3} />
        <span className="text-[0.85rem] leading-relaxed text-cine-dim">{aiActions[i].outcome}</span>
      </motion.div>

      <div className="mt-4 flex gap-1.5">
        {aiActions.map((_, k) => (
          <span
            key={k}
            className="h-1 flex-1 rounded-full transition-colors duration-300"
            style={{ background: k === i ? 'var(--cine-amber-bright)' : 'rgba(var(--cine-particle),0.2)' }}
          />
        ))}
      </div>
    </Card>
  );
}

/* ---------- 6 · How does automation help? ---------- */
export function AutomationsSection() {
  return (
    <Stage index={5}>
      <SectionHead
        eyebrow="Automations"
        title={
          <>
            Work that <span className="gradient-amber">runs itself.</span>
          </>
        }
        sub="Connect a trigger to the work that should follow. Set it once, and Citron handles the rest — every time, without a missed step."
      />
      <div className="mt-8 space-y-2">
        {automationFlow.map((step, i) => (
          <div key={step.label}>
            <Card delay={i * 0.08} className="!p-4">
              <div className="flex items-center gap-3">
                <span
                  className={
                    step.kind === 'trigger'
                      ? 'rounded-full bg-[var(--cine-amber-bright)] px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#1d1c19]'
                      : 'rounded-full border border-[var(--cine-line)] px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[var(--cine-amber)]'
                  }
                >
                  {step.kind}
                </span>
                <span className="text-[0.9rem] font-medium text-cine">{step.label}</span>
              </div>
            </Card>
            {i < automationFlow.length - 1 && (
              <div className="ml-7 h-4 w-px bg-[var(--cine-line)]" aria-hidden />
            )}
          </div>
        ))}
      </div>
    </Stage>
  );
}

/* ---------- 7 · How does it impact businesses? (centerpiece) ---------- */
export function ImpactSection() {
  return (
    <SplitStage
      index={6}
      left={
        <>
          <SectionHead
            eyebrow="Real impact"
            title={
              <>
                Fewer tools.{' '}
                <span className="gradient-amber">More momentum.</span>
              </>
            }
            sub="What changes when a company finally runs on one system."
          />
          <div className="mt-7 grid grid-cols-3 gap-3 text-center">
            {impactMetrics.map((m, i) => (
              <Card key={m.label} delay={0.1 + i * 0.06} className="!p-4">
                <div className="font-mono text-[1.5rem] font-semibold tabular-nums text-[var(--cine-amber)]">
                  {m.value}
                </div>
                <div className="mt-1 text-[0.7rem] leading-snug text-cine-faint">{m.label}</div>
              </Card>
            ))}
          </div>
        </>
      }
      right={
        <Card className="!p-7">
          <div className="text-[2.5rem] leading-none text-[var(--cine-amber)]">“</div>
          <blockquote className="mt-1 text-[1.05rem] leading-relaxed text-cine">
            {impactQuote.quote}
          </blockquote>
          <figcaption className="mt-4 text-[0.8125rem] text-cine-faint">
            <span className="font-semibold text-cine">{impactQuote.name}</span> · {impactQuote.role}
          </figcaption>
        </Card>
      }
    />
  );
}

/* ---------- 8 · Why is Citron different? ---------- */
export function WhySection() {
  return (
    <Stage index={7}>
      <SectionHead
        eyebrow="Why Citron"
        title={
          <>
            The same business, without the{' '}
            <span className="gradient-amber">chaos.</span>
          </>
        }
        sub="One system instead of ten. AI by default. Your data, truly yours. Live in a day."
      />
      <Card className="mt-8 overflow-hidden !p-0">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--cine-line)] text-[0.66rem] uppercase tracking-[0.14em] text-cine-faint">
              <th className="px-4 py-3 font-medium" />
              <th className="px-4 py-3 font-medium">The old way</th>
              <th className="px-4 py-3 font-medium text-[var(--cine-amber)]">With Citron</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row, i) => (
              <motion.tr
                key={row.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                className="border-b border-[var(--cine-line)] last:border-0"
              >
                <td className="px-4 py-3 text-[0.85rem] font-semibold text-cine">{row.label}</td>
                <td className="px-4 py-3 text-[0.85rem] text-cine-dim">{row.before}</td>
                <td className="px-4 py-3 text-[0.85rem] text-cine">
                  <span className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 shrink-0 text-[var(--cine-amber)]" strokeWidth={3} />
                    {row.after}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Stage>
  );
}

/* ---------- 9 · Who built it & how to start? (closing centerpiece) ---------- */
export function InkblotSection() {
  const year = new Date().getFullYear();
  return (
    <Stage index={8}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <span className="eyebrow-cine text-[0.72rem] font-semibold">The makers</span>
        <h2 className="mx-auto mt-4 max-w-2xl text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-cine sm:text-[2.6rem]">
          Built by <span className="gradient-amber">Inkblot Studio</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[1rem] leading-relaxed text-cine-dim">
          A small studio with a large ambition — building the intelligent
          software modern companies actually deserve.
        </p>
      </motion.div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
        {inkblotPillars.map((p, i) => {
          const Icon = ICONS[p.icon] ?? Sparkles;
          return (
            <motion.span
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              className="inline-flex items-center gap-2 rounded-full cine-card px-3.5 py-1.5 text-[0.8rem] font-medium text-cine"
            >
              <Icon className="h-3.5 w-3.5 text-[var(--cine-amber)]" strokeWidth={1.8} />
              {p.title}
            </motion.span>
          );
        })}
      </div>

      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Magnetic strength={0.4}>
          <Link
            href="/demo"
            className="group inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--cine-amber-bright)] px-7 text-[0.9375rem] font-semibold text-[#1d1c19] shadow-[0_10px_36px_-10px_rgba(var(--cine-particle),0.8)] transition-[filter,box-shadow,transform] duration-200 hover:brightness-105 hover:shadow-[0_18px_50px_-12px_rgba(var(--cine-particle),0.95)]"
          >
            Get started
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Magnetic>
        <Magnetic strength={0.35}>
          <Link
            href={siteConfig.studio.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-[3.25rem] items-center gap-2 rounded-full border border-[var(--cine-line)] bg-[var(--cine-card)] px-6 text-[0.9375rem] font-semibold text-cine backdrop-blur-md transition-colors duration-200 hover:border-[var(--cine-amber-bright)] hover:text-[var(--cine-amber)]"
          >
            Explore Inkblot Studio
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Magnetic>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-[0.8125rem] text-cine-faint">
        <div className="flex items-center gap-6">
          <Link href="/legal/privacy" className="transition-colors hover:text-cine">Privacy</Link>
          <Link href="/legal/terms" className="transition-colors hover:text-cine">Terms</Link>
          <Link href="/legal/cookies" className="transition-colors hover:text-cine">Cookies</Link>
        </div>
        <p>© {year} Citron · Crafted by Inkblot Studio</p>
      </div>
    </Stage>
  );
}
