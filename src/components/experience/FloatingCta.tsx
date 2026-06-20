'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Calendar } from 'lucide-react';

/**
 * A subtle, persistent invitation that fades in once the journey begins and
 * steps aside near the finale, where the full CTA takes over. Never
 * interrupts the experience.
 */
export function FloatingCta() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setVisible(v > 0.06 && v < 0.86);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2"
        >
          <Link
            href="/demo"
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--cine-line)] bg-[rgba(16,14,10,0.7)] px-5 py-2.5 text-[0.875rem] font-medium text-cine backdrop-blur-md transition-colors duration-200 hover:border-[var(--cine-amber)] hover:text-[#f3e3a6]"
          >
            <Calendar className="h-4 w-4 text-[var(--cine-amber)]" />
            Book a Demo
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
