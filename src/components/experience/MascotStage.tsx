'use client';

import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ExperienceMascot } from './ExperienceMascot';

// Orbit shape across the journey: hero (center) → 7 chapters → finale (center).
// Values are a -1..1 factor, scaled to a responsive pixel amplitude.
const STOPS = [0, 0.055, 0.165, 0.275, 0.385, 0.5, 0.61, 0.72, 0.83, 0.945, 1];
const ORBIT = [0, 0, 1, -1, 0.92, -0.92, 1, -1, 0.92, 0, 0];
const SCALE = [1.16, 1.16, 0.82, 0.82, 0.82, 0.8, 0.82, 0.82, 0.82, 1.2, 1.26];
const OPACITY = [1, 1, 0.72, 0.72, 0.72, 0.7, 0.72, 0.72, 0.72, 1, 1];

/**
 * Fixed layer that holds the mascot at the center of the viewport and gives
 * it life across the whole journey:
 *  - cursor proximity → 3D tilt + parallax (springed, with inertia)
 *  - scroll progress  → orbital travel (x), scale, and presence (opacity)
 *
 * Sits behind chapter content so text always stays legible on top of it.
 */
export function MascotStage() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [amp, setAmp] = useState(180);

  // Cursor → tilt / parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-16, 16]), {
    stiffness: 120,
    damping: 18,
    mass: 0.6,
  });
  const rotateX = useSpring(useTransform(my, [-1, 1], [12, -12]), {
    stiffness: 120,
    damping: 18,
    mass: 0.6,
  });
  const parallaxX = useSpring(useTransform(mx, [-1, 1], [-22, 22]), {
    stiffness: 80,
    damping: 20,
    mass: 0.7,
  });
  const parallaxY = useSpring(useTransform(my, [-1, 1], [-16, 16]), {
    stiffness: 80,
    damping: 20,
    mass: 0.7,
  });

  // Scroll → orbital travel (numeric px, then springed)
  const orbitFactor = useTransform(scrollYProgress, STOPS, ORBIT);
  const orbitX = useSpring(
    useTransform(orbitFactor, (f) => f * amp),
    { stiffness: 60, damping: 20, mass: 0.8 }
  );
  const scale = useSpring(useTransform(scrollYProgress, STOPS, SCALE), {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
  });
  const opacity = useTransform(scrollYProgress, STOPS, OPACITY);

  useEffect(() => {
    const setAmplitude = () => setAmp(Math.min(window.innerWidth * 0.16, 280));
    setAmplitude();
    window.addEventListener('resize', setAmplitude);
    return () => window.removeEventListener('resize', setAmplitude);
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

  if (reduce) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center overflow-hidden"
      >
        <div className="h-[min(70vw,26rem)] w-[min(70vw,26rem)] opacity-80">
          <ExperienceMascot />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ x: orbitX, opacity }} className="flex">
        <motion.div
          style={{
            rotateX,
            rotateY,
            x: parallaxX,
            y: parallaxY,
            scale,
            transformPerspective: 1100,
          }}
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
            className="h-[min(78vw,30rem)] w-[min(78vw,30rem)]"
          >
            <ExperienceMascot />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
