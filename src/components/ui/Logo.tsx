'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

/**
 * Citron mascot — geometric face mark.
 * Two pause-bar eyes and a confident arc smile. Built from the brand SVG geometry.
 */
export function Mascot({
  className,
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;

  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={cn('block', className)}
    >
      <g fill="currentColor" stroke="none">
        <motion.rect
          x="31"
          y="17"
          width="13"
          height="34"
          rx="1.5"
          initial={false}
          animate={shouldAnimate ? { scaleY: [1, 0.12, 1] } : undefined}
          transition={
            shouldAnimate
              ? { duration: 0.22, ease: 'easeInOut', repeat: Infinity, repeatDelay: 4.4 }
              : undefined
          }
          style={{ transformOrigin: '37px 34px' }}
        />
        <motion.rect
          x="56"
          y="17"
          width="13"
          height="34"
          rx="1.5"
          initial={false}
          animate={shouldAnimate ? { scaleY: [1, 0.12, 1] } : undefined}
          transition={
            shouldAnimate
              ? { duration: 0.22, ease: 'easeInOut', repeat: Infinity, repeatDelay: 4.4, delay: 0.04 }
              : undefined
          }
          style={{ transformOrigin: '62px 34px' }}
        />
      </g>
      <path
        d="M 12 40 A 38 38 0 0 0 88 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="butt"
      />
    </svg>
  );
}

export function Logo({
  className,
  showWordmark = true,
  href = '/',
}: {
  className?: string;
  showWordmark?: boolean;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Citron — home"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <span className="text-[var(--accent)] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:rotate-[-6deg]">
        <Mascot className="h-7 w-7" />
      </span>
      {showWordmark && (
        <span className="text-[1.15rem] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
          Citron
        </span>
      )}
    </Link>
  );
}
