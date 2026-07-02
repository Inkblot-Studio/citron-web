'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

/**
 * Citron mark — two vertical bars and a wide smile. The exact brand mascot
 * geometry, drawn in currentColor so it inherits the surrounding text color.
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
      viewBox="0 0 1100 800"
      aria-hidden="true"
      focusable="false"
      className={cn('block', className)}
    >
      <g fill="currentColor" stroke="none">
        <motion.rect
          x="378"
          y="96"
          width="120"
          height="338"
          rx="8"
          initial={false}
          animate={shouldAnimate ? { scaleY: [1, 0.1, 1] } : undefined}
          transition={
            shouldAnimate
              ? { duration: 0.24, ease: 'easeInOut', repeat: Infinity, repeatDelay: 4.4 }
              : undefined
          }
          style={{ transformOrigin: '438px 265px' }}
        />
        <motion.rect
          x="602"
          y="96"
          width="120"
          height="338"
          rx="8"
          initial={false}
          animate={shouldAnimate ? { scaleY: [1, 0.1, 1] } : undefined}
          transition={
            shouldAnimate
              ? { duration: 0.24, ease: 'easeInOut', repeat: Infinity, repeatDelay: 4.4, delay: 0.05 }
              : undefined
          }
          style={{ transformOrigin: '662px 265px' }}
        />
      </g>
      <path
        d="M 200 360 A 350 350 0 0 0 900 360"
        fill="none"
        stroke="currentColor"
        strokeWidth="96"
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
      aria-label="Citron home"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <span className="text-[var(--cine-amber-bright)] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:rotate-[-6deg]">
        <Mascot className="h-6 w-6" animate={false} />
      </span>
      {showWordmark && (
        <span className="text-[1.15rem] font-semibold tracking-[-0.02em] text-[var(--cine-ink)]">
          Citron
        </span>
      )}
    </Link>
  );
}
