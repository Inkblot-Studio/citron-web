'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[55] h-0.5 w-full origin-left bg-gradient-to-r from-[var(--accent)] to-[var(--accent-bright)]"
      style={{ scaleX }}
    />
  );
}
