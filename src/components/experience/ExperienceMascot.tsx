'use client';

import { motion, useMotionValue, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';

/**
 * The Citron mascot as a living digital being.
 *
 * Layered for depth: ambient halo, two counter-rotating orbital rings, and
 * the geometric face mark (two pause-bar eyes + an arc smile). The eyes are
 * *aware* — they track a look target (the cursor) and dart with small idle
 * saccades — while the face breathes and blinks. All intrinsic life; travel
 * and tricks are applied by MascotStage.
 */
export function ExperienceMascot({
  lookX,
  lookY,
}: {
  lookX?: MotionValue<number>;
  lookY?: MotionValue<number>;
}) {
  const reduce = useReducedMotion();

  // Fallbacks so hooks stay unconditional when no look target is provided.
  const fx = useMotionValue(0);
  const fy = useMotionValue(0);
  const lx = lookX ?? fx;
  const ly = lookY ?? fy;
  const eyeTX = useTransform(lx, [-1, 1], [-8, 8]);
  const eyeTY = useTransform(ly, [-1, 1], [-5, 5]);
  const smileTY = useTransform(ly, [-1, 1], [-2, 2]);

  return (
    <div className="relative h-full w-full">
      {/* Ambient halo */}
      <motion.div
        aria-hidden
        className="absolute inset-[-30%] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--cine-particle),0.30) 0%, rgba(var(--cine-particle),0.10) 38%, transparent 68%)',
        }}
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
      />

      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        focusable="false"
        className="relative block h-full w-full"
      >
        <defs>
          <radialGradient id="cm-core" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="var(--cine-mascot-0)" />
            <stop offset="62%" stopColor="var(--cine-mascot-1)" />
            <stop offset="100%" stopColor="var(--cine-mascot-2)" />
          </radialGradient>
          <linearGradient id="cm-face" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--cine-amber-bright)" />
            <stop offset="55%" stopColor="var(--cine-amber-soft)" />
            <stop offset="100%" stopColor="var(--cine-amber-deep)" />
          </linearGradient>
          <filter id="cm-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
        </defs>

        {/* Core disc */}
        <circle cx="100" cy="100" r="58" fill="url(#cm-core)" />
        <circle
          cx="100"
          cy="100"
          r="58"
          fill="none"
          stroke="rgba(var(--cine-particle),0.4)"
          strokeWidth="1"
        />

        {/* Outer rotating ring (clockwise) */}
        <motion.g
          style={{ originX: '100px', originY: '100px' }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
        >
          <circle
            cx="100"
            cy="100"
            r="84"
            fill="none"
            stroke="rgba(var(--cine-particle),0.22)"
            strokeWidth="1"
            strokeDasharray="2 10"
          />
          <circle cx="100" cy="16" r="2.4" fill="var(--cine-amber-bright)" />
          <circle cx="184" cy="100" r="1.6" fill="var(--cine-amber-soft)" />
        </motion.g>

        {/* Inner rotating ring (counter-clockwise) */}
        <motion.g
          style={{ originX: '100px', originY: '100px' }}
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
        >
          <circle
            cx="100"
            cy="100"
            r="72"
            fill="none"
            stroke="rgba(var(--cine-particle),0.16)"
            strokeWidth="1"
          />
          <circle cx="100" cy="172" r="1.8" fill="var(--cine-amber-bright)" />
          <circle cx="28" cy="100" r="1.4" fill="var(--cine-amber-deep)" />
        </motion.g>

        {/* The face — breathing */}
        <motion.g
          style={{ originX: '100px', originY: '100px' }}
          animate={reduce ? undefined : { scale: [1, 1.035, 1] }}
          transition={{ duration: 5.5, ease: 'easeInOut', repeat: Infinity }}
        >
          {/* Eyes — aware: track the look target + idle saccades + blink */}
          <motion.g style={{ x: eyeTX, y: eyeTY }}>
            <motion.g
              animate={reduce ? undefined : { x: [0, 3, -2, 0, 2, 0], y: [0, -1, 1, 0, -1, 0] }}
              transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity, times: [0, 0.2, 0.32, 0.5, 0.8, 1] }}
            >
              {/* soft glow under eyes */}
              <g filter="url(#cm-soft)" opacity="0.7">
                <rect x="62" y="64" width="22" height="58" rx="3" fill="var(--cine-amber-soft)" />
                <rect x="116" y="64" width="22" height="58" rx="3" fill="var(--cine-amber-soft)" />
              </g>

              <motion.rect
                x="62"
                y="64"
                width="22"
                height="58"
                rx="3"
                fill="url(#cm-face)"
                initial={false}
                animate={reduce ? undefined : { scaleY: [1, 1, 0.1, 1, 1, 0.1, 0.1, 1] }}
                transition={{
                  duration: 6,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  times: [0, 0.45, 0.48, 0.51, 0.7, 0.73, 0.76, 0.79],
                }}
                style={{ originX: '73px', originY: '93px' }}
              />
              <motion.rect
                x="116"
                y="64"
                width="22"
                height="58"
                rx="3"
                fill="url(#cm-face)"
                initial={false}
                animate={reduce ? undefined : { scaleY: [1, 1, 0.1, 1, 1, 0.1, 0.1, 1] }}
                transition={{
                  duration: 6,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  times: [0, 0.45, 0.485, 0.515, 0.7, 0.735, 0.765, 0.795],
                }}
                style={{ originX: '127px', originY: '93px' }}
              />
            </motion.g>
          </motion.g>

          {/* Smile — shifts subtly with the gaze */}
          <motion.path
            d="M 36 104 A 64 64 0 0 0 164 104"
            fill="none"
            stroke="url(#cm-face)"
            strokeWidth="17"
            strokeLinecap="round"
            className="amber-glow"
            style={{ y: smileTY }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
