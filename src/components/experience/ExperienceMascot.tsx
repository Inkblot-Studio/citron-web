'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * The Citron mascot as a living digital entity.
 *
 * Layered for depth: ambient halo, two counter-rotating orbital rings,
 * a small constellation of orbiting nodes, and the geometric face mark
 * (two pause-bar eyes + an arc smile) that breathes and blinks.
 *
 * Cursor-driven 3D tilt and travel are applied by the parent MascotStage;
 * this component owns only its intrinsic life (rotation, blink, glow).
 */
export function ExperienceMascot() {
  const reduce = useReducedMotion();

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
            stroke="rgba(217,188,88,0.22)"
            strokeWidth="1"
            strokeDasharray="2 10"
          />
          <circle cx="100" cy="16" r="2.4" fill="#d9bc58" />
          <circle cx="184" cy="100" r="1.6" fill="#e8d38a" />
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
            stroke="rgba(217,188,88,0.16)"
            strokeWidth="1"
          />
          <circle cx="100" cy="172" r="1.8" fill="#d9bc58" />
          <circle cx="28" cy="100" r="1.4" fill="#c4a030" />
        </motion.g>

        {/* The face mark — breathing */}
        <motion.g
          style={{ originX: '100px', originY: '100px' }}
          animate={reduce ? undefined : { scale: [1, 1.035, 1] }}
          transition={{ duration: 5.5, ease: 'easeInOut', repeat: Infinity }}
        >
          {/* soft glow under the face */}
          <g filter="url(#cm-soft)" opacity="0.7">
            <rect x="62" y="64" width="22" height="58" rx="3" fill="#d9bc58" />
            <rect x="116" y="64" width="22" height="58" rx="3" fill="#d9bc58" />
          </g>

          {/* eyes (blink) */}
          <motion.rect
            x="62"
            y="64"
            width="22"
            height="58"
            rx="3"
            fill="url(#cm-face)"
            initial={false}
            animate={reduce ? undefined : { scaleY: [1, 0.1, 1] }}
            transition={{ duration: 0.24, ease: 'easeInOut', repeat: Infinity, repeatDelay: 4.2 }}
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
            animate={reduce ? undefined : { scaleY: [1, 0.1, 1] }}
            transition={{
              duration: 0.24,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 4.2,
              delay: 0.05,
            }}
            style={{ originX: '127px', originY: '93px' }}
          />

          {/* smile */}
          <path
            d="M 36 104 A 64 64 0 0 0 164 104"
            fill="none"
            stroke="url(#cm-face)"
            strokeWidth="17"
            strokeLinecap="round"
            className="amber-glow"
          />
        </motion.g>
      </svg>
    </div>
  );
}
