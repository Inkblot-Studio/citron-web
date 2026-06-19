'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Sparkles, CornerDownLeft, Check } from 'lucide-react';
import { aiCommands } from '@/lib/site';

function useTypewriter(text: string, active: boolean, speed = 26) {
  const [out, setOut] = useState('');
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!active) {
      setOut('');
      return;
    }
    if (reduce) {
      setOut(text);
      return;
    }
    let i = 0;
    setOut('');
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed, reduce]);
  return out;
}

export function CommandConsole() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'thinking' | 'done'>('typing');
  const reduce = useReducedMotion();

  const cmd = aiCommands[index];
  const typed = useTypewriter(cmd.prompt, inView && phase === 'typing');

  useEffect(() => {
    if (!inView) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === 'typing') {
      const typeMs = reduce ? 200 : cmd.prompt.length * 26 + 400;
      t = setTimeout(() => setPhase('thinking'), typeMs);
    } else if (phase === 'thinking') {
      t = setTimeout(() => setPhase('done'), reduce ? 200 : 900);
    } else {
      t = setTimeout(
        () => {
          setPhase('typing');
          setIndex((i) => (i + 1) % aiCommands.length);
        },
        reduce ? 1200 : 3200
      );
    }
    return () => clearTimeout(t);
  }, [phase, inView, cmd.prompt.length, reduce]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[var(--shadow-xl)]"
    >
      <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] bg-[var(--bg-tertiary)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
        <span className="ml-3 flex items-center gap-1.5 text-[0.75rem] font-medium text-[var(--text-muted)]">
          <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
          Citron AI
        </span>
      </div>

      <div className="min-h-[260px] space-y-4 p-5 sm:p-7">
        <div className="flex items-start gap-3">
          <span className="mt-1 select-none font-mono text-[var(--accent)]">›</span>
          <p className="font-mono text-[0.9375rem] leading-relaxed text-[var(--text-primary)]">
            {phase === 'typing' ? typed : cmd.prompt}
            {phase === 'typing' && (
              <span className="ml-0.5 inline-block h-[1.05em] w-[2px] animate-pulse bg-[var(--accent)] align-middle" />
            )}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'thinking' && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 pl-6 text-[0.875rem] text-[var(--text-muted)]"
            >
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
                  />
                ))}
              </span>
              Working across your data…
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="ml-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-success)]/15 text-[var(--color-success)]">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  {cmd.module}
                </span>
              </div>
              <p className="text-[0.9375rem] leading-relaxed text-[var(--text-primary)]">{cmd.response}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[var(--border-subtle)] px-5 py-3">
        <span className="text-[0.8125rem] text-[var(--text-muted)]">
          Ask Citron anything about your business…
        </span>
        <span className="flex items-center gap-1 rounded-md border border-[var(--border-subtle)] px-1.5 py-1 text-[var(--text-muted)]">
          <CornerDownLeft className="h-3.5 w-3.5" />
        </span>
      </div>

      <div className="absolute right-5 top-16 flex flex-col gap-1.5">
        {aiCommands.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              i === index ? 'bg-[var(--accent)]' : 'bg-[var(--border-default)]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
