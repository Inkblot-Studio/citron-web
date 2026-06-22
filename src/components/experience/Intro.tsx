'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AliveMascot } from './Mascot';

const EASE = [0.22, 1, 0.36, 1] as const;
const STORAGE_KEY = 'citron-intro-seen-v4';

/**
 * The Citron entrance — a calm, dark, cinematic open. A warm glow blooms from
 * black, the mascot eases in and settles, a single ring breathes outward, the
 * wordmark resolves over a drawn gold line, and the whole stage dissolves
 * upward into the page. ~2.4s, always skippable, plays once per session.
 */
export function Intro() {
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduce) return;
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    if (seen) return;

    setArmed(true);
    setVisible(true);
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';

    const dismiss = () => setVisible(false);
    const timer = window.setTimeout(dismiss, 2600);

    // Skip on intent, but ignore the very first events (browsers sometimes fire
    // a synthetic scroll on load that would dismiss before anything plays).
    const armSkip = window.setTimeout(() => {
      window.addEventListener('wheel', dismiss, { passive: true, once: true });
      window.addEventListener('touchstart', dismiss, { passive: true, once: true });
      window.addEventListener('keydown', dismiss, { once: true });
      window.addEventListener('pointerdown', dismiss, { once: true });
    }, 250);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(armSkip);
      root.style.overflow = prev;
      window.removeEventListener('wheel', dismiss);
      window.removeEventListener('touchstart', dismiss);
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('pointerdown', dismiss);
    };
  }, [reduce]);

  const onExitComplete = () => {
    document.documentElement.style.overflow = '';
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
  };

  if (!armed) return null;

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: '#070605' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* warm glow blooming from black */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
            style={{
              background:
                'radial-gradient(50% 50% at 50% 46%, rgba(236,205,116,0.20), rgba(236,205,116,0.05) 45%, transparent 72%)',
            }}
          />
          {/* deep vignette to frame the stage */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(0,0,0,0.7) 100%)',
            }}
          />

          {/* center stage */}
          <div className="relative flex flex-col items-center justify-center">
            {/* single breathing ring on reveal */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute rounded-full border border-[rgba(236,205,116,0.5)]"
              initial={{ width: 120, height: 120, opacity: 0 }}
              animate={{ width: 560, height: 560, opacity: [0, 0.55, 0] }}
              transition={{ duration: 1.8, ease: EASE, delay: 0.4, times: [0, 0.3, 1] }}
            />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute rounded-full"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: 360, height: 360, opacity: [0, 0.4, 0] }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
              style={{
                background:
                  'radial-gradient(circle, rgba(236,205,116,0.18), transparent 70%)',
              }}
            />

            {/* mascot — eases in and settles, smooth and weightless */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 14 }}
              animate={{ scale: [0.7, 1.05, 1], opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: -8 }}
              transition={{ duration: 1.15, ease: EASE, times: [0, 0.62, 1] }}
              style={{ transformOrigin: '50% 50%' }}
            >
              <AliveMascot className="h-[clamp(10rem,26vw,14rem)] w-[clamp(10rem,26vw,14rem)]" />
            </motion.div>

            {/* wordmark over a drawn gold line */}
            <motion.div
              className="mt-7 flex flex-col items-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.95 }}
            >
              <span className="text-[2.1rem] font-semibold tracking-[-0.03em] text-[#f4efe2] sm:text-[2.7rem]">
                Citron
              </span>
              <motion.span
                aria-hidden
                className="mt-2 block h-px w-40 origin-center"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE, delay: 1.1 }}
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(236,205,116,0.9), transparent)',
                }}
              />
              <motion.span
                className="mt-3 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[rgba(236,205,116,0.9)]"
                initial={{ opacity: 0, letterSpacing: '0.14em' }}
                animate={{ opacity: 1, letterSpacing: '0.34em' }}
                transition={{ duration: 0.7, ease: EASE, delay: 1.25 }}
              >
                The Business Operating System
              </motion.span>
            </motion.div>
          </div>

          <motion.button
            type="button"
            onClick={() => setVisible(false)}
            className="absolute bottom-7 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[rgba(244,239,226,0.45)] transition-colors hover:text-[#f4efe2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.6 }}
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
