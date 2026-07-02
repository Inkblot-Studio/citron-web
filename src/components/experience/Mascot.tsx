'use client';

import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { cn } from '@/lib/cn';

/**
 * Blink choreography — one shared timeline keeps both eyes perfectly in sync.
 * The cadence reads as life: a quick single blink, then a little while later a
 * natural double blink, then calm. Eyes close almost fully (scaleY → 0.05).
 */
const BLINK_KEYFRAMES = [1, 0.05, 1, 1, 0.05, 1, 0.05, 1, 1];
const BLINK_TIMES = [0, 0.018, 0.04, 0.5, 0.516, 0.534, 0.55, 0.568, 1];
const BLINK_TRANSITION = {
  duration: 6.4,
  ease: 'easeInOut',
  times: BLINK_TIMES,
  repeat: Infinity,
} as const;

/**
 * The Citron mascot, alive. Exact brand geometry (two bars + a wide smile),
 * never modified — only given life through layered, handcrafted motion:
 *
 *   · floats gently up and down (idle presence)
 *   · squashes and stretches with the float (weight + life)
 *   · breathes (a slow scale pulse)
 *   · sways its head (a soft tilt)
 *   · blinks every ~4 seconds (both eyes, with an occasional double-blink)
 *   · its eyes track a look target and the smile follows with secondary motion
 *
 * Charisma moments (spins, flips, pops) are reserved for chapter transitions,
 * triggered by the guide — idle life stays calm and premium, never cartoonish.
 *
 * Color follows the brand gold via currentColor.
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
  const eyeX = useTransform(lx, [-1, 1], [-36, 36]);
  const eyeY = useTransform(ly, [-1, 1], [-24, 24]);
  // Smile lags the gaze a touch more than the eyes → secondary motion.
  const smileX = useTransform(lx, [-1, 1], [-14, 14]);
  const smileY = useTransform(ly, [-1, 1], [-12, 12]);

  return (
    <div className={cn('relative text-[var(--cine-amber-bright)]', className)}>
      {/* soft premium halo */}
      <div
        aria-hidden
        className="absolute inset-[-24%] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--cine-particle),0.20) 0%, transparent 66%)',
        }}
      />

      <div className="relative h-full w-full">
        {/* gentle head sway (tilt) */}
        <motion.div
          className="h-full w-full"
          animate={reduce ? undefined : { rotate: [0, 3, 0, -3, 0] }}
          transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
          style={{ transformOrigin: '50% 70%' }}
        >
          {/* float + squash & stretch (shared timeline, grounded origin) */}
          <motion.div
            className="h-full w-full"
            animate={
              reduce
                ? undefined
                : {
                    y: [0, -18, 0],
                    scaleY: [0.97, 1.035, 0.97],
                    scaleX: [1.03, 0.98, 1.03],
                  }
            }
            transition={{
              duration: 5,
              ease: 'easeInOut',
              times: [0, 0.5, 1],
              repeat: Infinity,
            }}
            style={{ transformOrigin: '50% 92%' }}
          >
            {/* slow breathing pulse */}
            <motion.svg
              viewBox="0 0 1100 800"
              aria-hidden="true"
              focusable="false"
              className="relative block h-full w-full"
              animate={reduce ? undefined : { scale: [1, 1.02, 1] }}
              transition={{ duration: 6.5, ease: 'easeInOut', repeat: Infinity }}
              style={{ transformOrigin: '550px 400px' }}
            >
              {/* eyes — track the gaze + blink */}
              <motion.g style={{ x: eyeX, y: eyeY }} fill="currentColor" stroke="none">
                <motion.rect
                  x="378"
                  y="96"
                  width="120"
                  height="338"
                  rx="10"
                  initial={false}
                  animate={reduce ? undefined : { scaleY: BLINK_KEYFRAMES }}
                  transition={BLINK_TRANSITION}
                  style={{ transformOrigin: '438px 265px' }}
                />
                <motion.rect
                  x="602"
                  y="96"
                  width="120"
                  height="338"
                  rx="10"
                  initial={false}
                  animate={reduce ? undefined : { scaleY: BLINK_KEYFRAMES }}
                  transition={BLINK_TRANSITION}
                  style={{ transformOrigin: '662px 265px' }}
                />
              </motion.g>
              {/* smile — follows the gaze with a softer, lagging motion */}
              <motion.path
                d="M 200 360 A 350 350 0 0 0 900 360"
                fill="none"
                stroke="currentColor"
                strokeWidth="96"
                strokeLinecap="round"
                style={{ x: smileX, y: smileY }}
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
