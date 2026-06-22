'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AliveMascot } from './Mascot';

const EASE = [0.22, 1, 0.36, 1] as const;
const STORAGE_KEY = 'citron-intro-seen-v3';

/**
 * The Citron entrance. A pitch-warm iris opens, the mascot zooms from far,
 * lands with a light-burst, the wordmark resolves underneath, and a tall
 * vertical curtain wipes upward to reveal the Hero. ~2.2s of cinema, then
 * the page takes over. Always skippable, plays once per session.
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
    const timer = window.setTimeout(dismiss, 2400);

    // Skip on intent, but ignore the very first events (some browsers fire a
    // synthetic scroll on load that would dismiss before anything plays).
    const armSkip = window.setTimeout(() => {
      window.addEventListener('wheel', dismiss, { passive: true, once: true });
      window.addEventListener('touchstart', dismiss, { passive: true, once: true });
      window.addEventListener('keydown', dismiss, { once: true });
      window.addEventListener('pointerdown', dismiss, { once: true });
    }, 200);

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
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ background: 'var(--cine-bg-0)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {/* warm vignette */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              background:
                'radial-gradient(60% 60% at 50% 42%, rgba(var(--cine-particle),0.22), transparent 70%)',
            }}
          />

          {/* curtain wipe — slides upward to reveal the page */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 top-0 origin-top"
            style={{
              background: 'var(--cine-bg-0)',
              height: '100%',
            }}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          />

          {/* center stage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* expanding light rings — fire as the mascot lands */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute rounded-full border-2 border-[var(--cine-amber-bright)]"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: 480, height: 480, opacity: [0, 0.7, 0] }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.55, times: [0, 0.25, 1] }}
            />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute rounded-full border border-[var(--cine-amber-bright)]"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: 760, height: 760, opacity: [0, 0.4, 0] }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.65, times: [0, 0.3, 1] }}
            />

            {/* radial particle burst at the landing moment */}
            <Burst />

            {/* mascot: rushes in from far, lands with a punch, then settles */}
            <motion.div
              initial={{ scale: 0.08, opacity: 0, filter: 'blur(14px)', y: -20 }}
              animate={{
                scale: [0.08, 1.18, 0.96, 1.04, 1],
                opacity: [0, 1, 1, 1, 1],
                filter: ['blur(14px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
                y: [-20, 0, 0, 0, 0],
                rotate: [-22, 6, -3, 1, 0],
              }}
              transition={{
                duration: 1.5,
                ease: EASE,
                times: [0, 0.42, 0.62, 0.82, 1],
              }}
              exit={{ scale: 0.92, opacity: 0, y: -10 }}
              style={{ transformOrigin: '50% 50%' }}
            >
              <AliveMascot className="h-[clamp(11rem,28vw,15rem)] w-[clamp(11rem,28vw,15rem)]" />
            </motion.div>

            {/* wordmark resolves underneath */}
            <motion.div
              className="mt-6 flex flex-col items-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.95 }}
            >
              <span className="text-[2rem] font-semibold tracking-[-0.03em] text-cine sm:text-[2.6rem]">
                Citron
              </span>
              <motion.span
                className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-[var(--cine-amber)]"
                initial={{ opacity: 0, letterSpacing: '0.12em' }}
                animate={{ opacity: 1, letterSpacing: '0.34em' }}
                transition={{ duration: 0.7, ease: EASE, delay: 1.2 }}
              >
                The Business Operating System
              </motion.span>
            </motion.div>

            <motion.button
              type="button"
              onClick={() => setVisible(false)}
              className="absolute bottom-6 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-cine-faint transition-colors hover:text-cine"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.6 }}
            >
              Skip
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** A radial burst of tiny amber sparks fired the instant the mascot lands. */
function Burst() {
  const sparks = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    return { dx: Math.cos(angle) * 220, dy: Math.sin(angle) * 220 };
  });
  return (
    <div aria-hidden className="pointer-events-none absolute">
      {sparks.map((s, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-[var(--cine-amber-bright)]"
          initial={{ x: 0, y: 0, opacity: 0, scale: 1 }}
          animate={{ x: s.dx, y: s.dy, opacity: [0, 1, 0], scale: [1, 1, 0.4] }}
          transition={{ duration: 1, ease: EASE, delay: 0.55, times: [0, 0.25, 1] }}
        />
      ))}
    </div>
  );
}
