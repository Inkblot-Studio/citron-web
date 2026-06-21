'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { AliveMascot } from './Mascot';
import { useExperience } from './ExperienceContext';
import { scenes, ANCHOR_POS, type Trick } from '@/lib/experience';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The mascot guide — desktop only. It anchors to a dedicated spot in each
 * chapter (always the half opposite the content, so it never overlaps), and
 * travels there with a weighty spring whenever the active chapter changes —
 * so it glides across the screen as you scroll, then settles, perfectly
 * centered on its mark, where it stays alive.
 */
export function MascotGuide() {
  const reduce = useReducedMotion();
  const { active } = useExperience();
  const [vp, setVp] = useState({ w: 1440, h: 900 });

  // Travel to the active chapter's anchor (exact centering on settle).
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetScale = useMotionValue(1);
  const x = useSpring(targetX, { stiffness: 52, damping: 18, mass: 1.05 });
  const y = useSpring(targetY, { stiffness: 46, damping: 18, mass: 1.1 });
  const scale = useSpring(targetScale, { stiffness: 60, damping: 17, mass: 1 });

  useEffect(() => {
    const idx = Math.min(active, scenes.length - 1);
    const scene = scenes[idx];
    const pos = ANCHOR_POS[scene.anchor];
    targetX.set(pos.x * vp.w);
    targetY.set(pos.y * vp.h);
    targetScale.set(scene.scale);
  }, [active, vp, targetX, targetY, targetScale]);

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
              className="h-[clamp(18rem,26vw,30rem)] w-[clamp(18rem,26vw,30rem)]"
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
