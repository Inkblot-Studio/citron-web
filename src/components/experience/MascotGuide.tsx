'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { AliveMascot } from './Mascot';
import { useExperience } from './ExperienceContext';
import { scenes, ANCHOR_POS, type Trick } from '@/lib/experience';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The mascot guide — desktop only. It travels continuously across the screen
 * as you scroll, flowing from each chapter's dedicated anchor to the next
 * (always in the half opposite the content, so it never overlaps anything),
 * performing an elegant move on arrival and staying alive throughout.
 */
export function MascotGuide() {
  const reduce = useReducedMotion();
  const { active } = useExperience();
  const [vp, setVp] = useState({ w: 1440, h: 900 });
  const { scrollYProgress } = useScroll();

  const n = scenes.length;
  const stops = scenes.map((_, i) => (n === 1 ? 0 : i / (n - 1)));
  const xr = scenes.map((s) => ANCHOR_POS[s.anchor].x * vp.w);
  const yr = scenes.map((s) => ANCHOR_POS[s.anchor].y * vp.h);
  const sr = scenes.map((s) => s.scale);

  // Continuous, scroll-linked travel across the viewport.
  const x = useSpring(useTransform(scrollYProgress, stops, xr), { stiffness: 60, damping: 18, mass: 0.85 });
  const y = useSpring(useTransform(scrollYProgress, stops, yr), { stiffness: 52, damping: 18, mass: 0.95 });
  const scale = useSpring(useTransform(scrollYProgress, stops, sr), { stiffness: 60, damping: 18, mass: 0.85 });

  // Cursor → subtle tilt + gaze
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 110, damping: 18, mass: 0.6 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 110, damping: 18, mass: 0.6 });
  const lookX = useSpring(mx, { stiffness: 90, damping: 16, mass: 0.5 });
  const lookY = useSpring(my, { stiffness: 90, damping: 16, mass: 0.5 });

  const trick = useAnimationControls();
  const firstRun = useRef(true);

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    function onMove(e: MouseEvent) {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my, reduce]);

  // Elegant move when settling into a new chapter.
  useEffect(() => {
    if (reduce) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    playTrick(trick, scenes[Math.min(active, scenes.length - 1)].trick);
  }, [active, reduce, trick]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-20 hidden lg:block">
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2"
          style={{ scale, rotateX, rotateY, transformPerspective: 1000 }}
        >
          <motion.div animate={trick} style={{ transformPerspective: 900 }}>
            <AliveMascot
              className="h-[clamp(15rem,21vw,23rem)] w-[clamp(15rem,21vw,23rem)]"
              lookX={reduce ? undefined : lookX}
              lookY={reduce ? undefined : lookY}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function playTrick(controls: ReturnType<typeof useAnimationControls>, t: Trick) {
  if (t === 'spin') {
    controls.start({ rotate: [0, -18, 372, 360], transition: { duration: 1.2, ease: EASE, times: [0, 0.12, 0.82, 1] } });
  } else if (t === 'flip') {
    controls.start({ rotateY: [0, -16, 375, 360], transition: { duration: 1.2, ease: EASE, times: [0, 0.12, 0.82, 1] } });
  } else if (t === 'pop') {
    controls.start({ scale: [1, 0.9, 1.14, 1], transition: { duration: 0.65, ease: EASE, times: [0, 0.25, 0.6, 1] } });
  }
}
