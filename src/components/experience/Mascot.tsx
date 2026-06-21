'use client';

import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The Citron mascot, alive. Exact brand geometry (two bars + a wide smile),
 * never modified — only given life: it breathes, blinks, sways gently, and
 * its eyes track a look target. Color follows the brand gold via currentColor.
 */
export function AliveMascot({
  className,
  lookX,
  lookY,
}: {
  className?: string;
  lookX?: MotionValue<number>;
  lookY?: MotionValue<number>;
}) {
  const reduce = useReducedMotion();

  const fx = useMotionValue(0);
  const fy = useMotionValue(0);
  const lx = lookX ?? fx;
  const ly = lookY ?? fy;
  const eyeX = useTransform(lx, [-1, 1], [-34, 34]);
  const eyeY = useTransform(ly, [-1, 1], [-22, 22]);
  const smileY = useTransform(ly, [-1, 1], [-10, 10]);

  return (
    <div className={cn('relative text-[var(--cine-amber-bright)]', className)}>
      {/* soft premium halo */}
      <div
        aria-hidden
        className="absolute inset-[-22%] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--cine-particle),0.16) 0%, transparent 68%)',
        }}
      />

      {/* occasional playful spin while parked */}
      <motion.div
        className="relative h-full w-full"
        animate={reduce ? undefined : { rotate: [0, 0, 360] }}
        transition={{ duration: 15, ease: EASE, times: [0, 0.86, 1], repeat: Infinity }}
        style={{ transformOrigin: '50% 50%' }}
      >
        {/* gentle continuous sway */}
        <motion.div
          className="h-full w-full"
          animate={reduce ? undefined : { rotate: [0, 4.5, 0, -4.5, 0] }}
          transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
          style={{ transformOrigin: '50% 50%' }}
        >
          <motion.svg
            viewBox="0 0 1100 800"
            aria-hidden="true"
            focusable="false"
            className="relative block h-full w-full"
            animate={reduce ? undefined : { scale: [1, 1.025, 1] }}
            transition={{ duration: 5.5, ease: 'easeInOut', repeat: Infinity }}
            style={{ transformOrigin: '550px 400px' }}
          >
            {/* eyes — track the gaze + blink */}
            <motion.g style={{ x: eyeX, y: eyeY }} fill="currentColor" stroke="none">
              <motion.rect
                x="378"
                y="96"
                width="120"
                height="338"
                rx="8"
                initial={false}
                animate={reduce ? undefined : { scaleY: [1, 1, 0.1, 1, 1, 0.1, 0.1, 1] }}
                transition={{
                  duration: 6.5,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  times: [0, 0.45, 0.48, 0.51, 0.72, 0.75, 0.78, 0.81],
                }}
                style={{ transformOrigin: '438px 265px' }}
              />
              <motion.rect
                x="602"
                y="96"
                width="120"
                height="338"
                rx="8"
                initial={false}
                animate={reduce ? undefined : { scaleY: [1, 1, 0.1, 1, 1, 0.1, 0.1, 1] }}
                transition={{
                  duration: 6.5,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  times: [0, 0.45, 0.485, 0.515, 0.72, 0.755, 0.785, 0.815],
                }}
                style={{ transformOrigin: '662px 265px' }}
              />
            </motion.g>
            {/* smile — shifts subtly with the gaze */}
            <motion.path
              d="M 200 360 A 350 350 0 0 0 900 360"
              fill="none"
              stroke="currentColor"
              strokeWidth="96"
              strokeLinecap="butt"
              style={{ y: smileY }}
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
