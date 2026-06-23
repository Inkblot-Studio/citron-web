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
import { scenes, type Trick } from '@/lib/experience';

const EASE = [0.22, 1, 0.36, 1] as const;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * The hero choreography, expressed as a function of the 0→1 reveal timeline.
 * The mascot glides down from its intro hand-off, sweeps left→right across the
 * headline band (lighting up the words in its trail), then floats up to its
 * roaming anchor. Returned positions are viewport fractions.
 */
function heroSweep(p: number): { x: number; y: number; scale: number } {
  // Phase A — drop from the hand-off point to the start of the sweep.
  if (p < 0.16) {
    const t = p / 0.16;
    return { x: lerp(0.5, 0.17, t), y: lerp(0.2, 0.47, t), scale: lerp(1.12, 1.18, t) };
  }
  // Phase B — sweep across the headline, arcing gently over the type.
  if (p < 0.7) {
    const t = (p - 0.16) / 0.54;
    return { x: lerp(0.17, 0.83, t), y: 0.47 - Math.sin(Math.PI * t) * 0.045, scale: 1.18 };
  }
  // Phase C — rise back up to the roaming anchor.
  const t = (p - 0.7) / 0.3;
  return { x: lerp(0.83, 0.5, t), y: lerp(0.47, 0.2, t), scale: lerp(1.18, 1.12, t) };
}

/**
 * The mascot guide — desktop only. It opens the hero by sweeping the headline,
 * then roams calmly above it; for every other chapter it glides to a dedicated
 * mark on the half opposite the content and settles there, alive. Motion is
 * GPU-composited and intentionally smooth: no scroll-velocity jitter, no
 * fighting the scroll-snap.
 */
export function MascotGuide({ introHold = false }: { introHold?: boolean }) {
  const reduce = useReducedMotion();
  const { active, mascotVisible, heroReveal } = useExperience();
  const [vp, setVp] = useState({ w: 1440, h: 900 });

  // Travel target (anchor or live roam point) → smoothed by springs.
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetScale = useMotionValue(1);
  const x = useSpring(targetX, { stiffness: 64, damping: 20, mass: 1 });
  const y = useSpring(targetY, { stiffness: 64, damping: 20, mass: 1 });
  const scale = useSpring(targetScale, { stiffness: 64, damping: 18, mass: 1 });

  // Cursor → a restrained tilt + gaze (small, so it reads calm).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 90, damping: 20, mass: 0.6 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [7, -7]), { stiffness: 90, damping: 20, mass: 0.6 });
  const lookX = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.5 });
  const lookY = useSpring(my, { stiffness: 80, damping: 18, mass: 0.5 });

  const trick = useAnimationControls();
  const firstRun = useRef(true);
  const roamRef = useRef<number | null>(null);

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Anchor to the active chapter. The hero (index 0) sweeps, then roams.
  useEffect(() => {
    const idx = Math.min(active, scenes.length - 1);
    const scene = scenes[idx];

    if (roamRef.current) {
      cancelAnimationFrame(roamRef.current);
      roamRef.current = null;
    }

    const isHero = idx === 0;

    // The gentle roam loop the hero settles into once the sweep finishes.
    const startRoam = () => {
      if (reduce) {
        targetX.set(0.5 * vp.w);
        targetY.set(0.2 * vp.h);
        targetScale.set(scene.scale);
        return;
      }
      const start = performance.now();
      const baseX = 0.5 * vp.w;
      const baseY = 0.2 * vp.h;
      const ampX = Math.min(0.2 * vp.w, 280);
      const ampY = Math.min(0.05 * vp.h, 52);
      const roam = (t: number) => {
        const e = (t - start) / 1000;
        const nx = baseX + Math.sin(e * 0.34) * ampX + Math.cos(e * 0.21) * ampX * 0.22;
        const ny = baseY + Math.sin(e * 0.47 + 1.2) * ampY;
        targetX.set(nx);
        targetY.set(ny);
        roamRef.current = requestAnimationFrame(roam);
      };
      roamRef.current = requestAnimationFrame(roam);
    };

    if (isHero && introHold) {
      // Intro still playing — sit on the hand-off anchor so the intro mascot can
      // dissolve into this exact spot. The sweep begins once the intro is done.
      targetScale.set(1.12);
      targetX.set(0.5 * vp.w);
      targetY.set(0.2 * vp.h);
      return;
    }

    if (isHero) {
      if (reduce) {
        startRoam();
        return;
      }
      // Drive the sweep from the shared reveal timeline; hand off to the roam
      // loop the moment it completes.
      const apply = (p: number) => {
        if (p >= 0.999) {
          if (!roamRef.current) startRoam();
          return;
        }
        const s = heroSweep(p);
        targetX.set(s.x * vp.w);
        targetY.set(s.y * vp.h);
        targetScale.set(s.scale);
      };
      apply(heroReveal.get());
      const unsub = heroReveal.on('change', apply);
      return () => {
        unsub();
        if (roamRef.current) {
          cancelAnimationFrame(roamRef.current);
          roamRef.current = null;
        }
      };
    }

    // Every other chapter — settle onto its dedicated mark.
    targetScale.set(scene.scale);
    targetX.set(scene.pos.x * vp.w);
    targetY.set(scene.pos.y * vp.h);

    return () => {
      if (roamRef.current) {
        cancelAnimationFrame(roamRef.current);
        roamRef.current = null;
      }
    };
  }, [active, vp, reduce, introHold, heroReveal, targetX, targetY, targetScale]);

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

  // A small flourish when settling into a new chapter.
  useEffect(() => {
    if (reduce) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    playTrick(trick, scenes[Math.min(active, scenes.length - 1)].trick);
  }, [active, reduce, trick]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-20 hidden lg:block"
      animate={{ opacity: mascotVisible ? 1 : 0 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <motion.div className="absolute left-0 top-0" style={{ x, y, willChange: 'transform' }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2"
          style={{ scale, rotateX, rotateY, transformPerspective: 1000, willChange: 'transform' }}
        >
          <motion.div animate={trick} style={{ transformPerspective: 900 }}>
            <AliveMascot
              className="h-[clamp(11rem,24vmin,18rem)] w-[clamp(11rem,24vmin,18rem)]"
              lookX={reduce ? undefined : lookX}
              lookY={reduce ? undefined : lookY}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function playTrick(controls: ReturnType<typeof useAnimationControls>, t: Trick) {
  if (t === 'spin') {
    controls.start({ rotate: [0, -14, 360], transition: { duration: 1.1, ease: EASE, times: [0, 0.12, 1] } });
  } else if (t === 'flip') {
    controls.start({ rotateY: [0, -12, 360], transition: { duration: 1.1, ease: EASE, times: [0, 0.12, 1] } });
  } else if (t === 'pop') {
    controls.start({ scale: [1, 0.92, 1.1, 1], transition: { duration: 0.6, ease: EASE, times: [0, 0.25, 0.6, 1] } });
  }
}
