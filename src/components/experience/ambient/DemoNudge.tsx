'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { X, ArrowRight, Sparkles } from 'lucide-react';

/**
 * A quiet, contextual nudge. It slides in once the visitor is genuinely
 * engaged (past ~55% of the page), offers a couple of useful next steps, and
 * never returns once dismissed this session. Not a marketing interruption —
 * an offer of help at the right moment.
 */
export function DemoNudge() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    let done = false;
    try {
      done = !!sessionStorage.getItem('citron-nudge-dismissed');
    } catch {
      /* ignore */
    }
    if (!done) setDismissed(false);
  }, []);

  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (!dismissed && !open && p > 0.55) setOpen(true);
  });

  const close = () => {
    setOpen(false);
    setDismissed(true);
    try {
      sessionStorage.setItem('citron-nudge-dismissed', '1');
    } catch {
      /* ignore */
    }
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 sm:left-auto sm:right-5 sm:translate-x-0"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-[var(--radius-2xl)] cine-card p-5 shadow-[var(--shadow-xl)]">
            <button
              type="button"
              onClick={close}
              aria-label="Dismiss"
              className="absolute right-3 top-3 text-cine-faint transition-colors hover:text-cine"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 text-[var(--cine-amber)]">
              <Sparkles className="h-4 w-4" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cine-dim">
                Seeing the bigger picture?
              </span>
            </div>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-cine">
              Get a feel for Citron mapped to your own workflows.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/demo"
                onClick={close}
                className="group inline-flex items-center gap-1.5 rounded-full bg-[var(--cine-amber-bright)] px-4 py-2 text-[0.8125rem] font-semibold text-[#1d1c19] transition hover:brightness-105"
              >
                Book a Demo
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/pricing"
                onClick={close}
                className="inline-flex items-center rounded-full border border-[var(--cine-line)] px-4 py-2 text-[0.8125rem] font-medium text-cine-dim transition-colors hover:text-cine"
              >
                See pricing
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
