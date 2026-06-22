'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AliveMascot } from './Mascot';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A short, magical entrance. The mascot arrives alone, looks around, gives a
 * playful turn, the Citron wordmark resolves beneath it — then the curtain
 * lifts to reveal the Hero. Plays once per session, never blocks: any scroll,
 * tap, or key dismisses it instantly. Skipped entirely for reduced motion.
 */
export function Intro() {
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduce) return;
    let seen = false;
    try {
      seen = !!sessionStorage.getItem('citron-intro-seen');
    } catch {
      /* storage unavailable — show once */
    }
    if (seen) return;

    setArmed(true);
    setVisible(true);
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';

    const dismiss = () => setVisible(false);
    const timer = window.setTimeout(dismiss, 3200);
    window.addEventListener('wheel', dismiss, { passive: true, once: true });
    window.addEventListener('touchstart', dismiss, { passive: true, once: true });
    window.addEventListener('keydown', dismiss, { once: true });
    window.addEventListener('pointerdown', dismiss, { once: true });

    return () => {
      window.clearTimeout(timer);
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
      sessionStorage.setItem('citron-intro-seen', '1');
    } catch {
      /* ignore */
    }
  };

  if (!armed) return null;

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: 'var(--cine-bg-0)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(6px)' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {/* warm wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-2/3"
            style={{
              background:
                'radial-gradient(60% 60% at 50% 30%, rgba(var(--cine-particle),0.16), transparent 65%)',
            }}
          />

          {/* mascot entrance + playful turn */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 18 }}
            animate={{
              opacity: 1,
              scale: [0.6, 1.06, 1, 1, 1.08, 1],
              y: 0,
              rotate: [0, 0, -9, 9, 0, 0],
            }}
            transition={{
              duration: 2.4,
              ease: EASE,
              times: [0, 0.18, 0.32, 0.5, 0.7, 0.86],
            }}
          >
            <AliveMascot className="h-[clamp(11rem,30vw,17rem)] w-[clamp(11rem,30vw,17rem)]" />
          </motion.div>

          {/* wordmark resolves */}
          <motion.div
            className="mt-8 overflow-hidden"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.5 }}
          >
            <span className="text-[2rem] font-semibold tracking-[-0.03em] text-cine sm:text-[2.6rem]">
              Citron
            </span>
          </motion.div>
          <motion.span
            className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-[var(--cine-amber)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.85 }}
          >
            The Business Operating System
          </motion.span>

          <motion.button
            type="button"
            onClick={() => setVisible(false)}
            className="absolute bottom-8 text-[0.75rem] font-medium tracking-wide text-cine-faint transition-colors hover:text-cine"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            Skip intro
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
