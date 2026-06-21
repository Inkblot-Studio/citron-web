'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * A warm light that follows the cursor across the whole page — a fast core
 * glow and a slower trailing halo, blended into the scene so it lifts dark
 * chapters and warms light ones without ever obscuring the content. Desktop,
 * fine-pointer only; disabled for reduced motion.
 */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);

  // Two springs of different weight → a soft light with a gentle trail.
  const coreX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.5 });
  const coreY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.5 });
  const trailX = useSpring(x, { stiffness: 42, damping: 22, mass: 1.1 });
  const trailY = useSpring(y, { stiffness: 42, damping: 22, mass: 1.1 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[35] hidden lg:block">
      {/* slow trailing halo */}
      <motion.div
        className="absolute h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: trailX,
          y: trailY,
          mixBlendMode: 'soft-light',
          background:
            'radial-gradient(circle, rgba(var(--cine-particle),0.55) 0%, rgba(var(--cine-particle),0.12) 38%, transparent 68%)',
        }}
      />
      {/* fast warm core */}
      <motion.div
        className="absolute h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: coreX,
          y: coreY,
          mixBlendMode: 'soft-light',
          background:
            'radial-gradient(circle, rgba(var(--cine-particle),0.6) 0%, transparent 62%)',
        }}
      />
    </div>
  );
}
