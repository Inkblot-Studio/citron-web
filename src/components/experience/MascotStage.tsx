'use client';

import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import {
  Bot,
  Compass,
  LayoutGrid,
  Layers,
  ListChecks,
  Megaphone,
  Network,
  ReceiptText,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { ExperienceMascot } from './ExperienceMascot';
import { useExperience } from './ExperienceContext';
import { scenes, checkpoints, contentIndex, type CheckpointVisual } from '@/lib/experience';

const SAT_ICON: Record<CheckpointVisual, LucideIcon> = {
  unification: Layers,
  platform: LayoutGrid,
  crm: Users,
  marketing: Megaphone,
  automations: Workflow,
  agents: Bot,
  finance: ReceiptText,
  operations: ListChecks,
  convergence: Network,
  future: Compass,
};

// Index → themed satellite icon (only on content scenes).
const SATELLITE_BY_INDEX = new Map<number, LucideIcon>(
  checkpoints.map((cp, i) => [contentIndex(i), SAT_ICON[cp.visual]])
);

function poseFor(active: number) {
  const scene = scenes[Math.min(active, scenes.length - 1)];
  switch (scene.kind) {
    case 'hero':
      return { xFactor: 0, scale: 1.34, opacity: 1 };
    case 'marker':
      return { xFactor: 0, scale: 0.74, opacity: 0.96 };
    case 'content':
      // Drift toward the visual (opposite the text column).
      return { xFactor: scene.side === 'left' ? 1 : -1, scale: 0.6, opacity: 0.92 };
    case 'citron':
      return { xFactor: 0, scale: 1.28, opacity: 1 };
    case 'inkblot':
      return { xFactor: 0, scale: 0.92, opacity: 1 };
    default:
      return { xFactor: 0, scale: 0.74, opacity: 0.95 };
  }
}

/**
 * The mascot — the companion that guides the whole journey. It welcomes the
 * visitor large and centered, then travels along the trunk: pausing centered
 * at each checkpoint, drifting toward each visual, and returning to full
 * scale at the climax. Cursor proximity adds springed 3D tilt and parallax.
 */
export function MascotStage() {
  const reduce = useReducedMotion();
  const { active } = useExperience();
  const [amp, setAmp] = useState(200);

  const pose = poseFor(active);
  const satellite = SATELLITE_BY_INDEX.get(active);

  // Cursor → tilt / parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-17, 17]), {
    stiffness: 110,
    damping: 18,
    mass: 0.6,
  });
  const rotateX = useSpring(useTransform(my, [-1, 1], [13, -13]), {
    stiffness: 110,
    damping: 18,
    mass: 0.6,
  });
  const parallaxX = useSpring(useTransform(mx, [-1, 1], [-24, 24]), {
    stiffness: 70,
    damping: 20,
    mass: 0.7,
  });
  const parallaxY = useSpring(useTransform(my, [-1, 1], [-18, 18]), {
    stiffness: 70,
    damping: 20,
    mass: 0.7,
  });

  // Active scene → travel + scale (springed for inertia)
  const x = useSpring(pose.xFactor * amp, { stiffness: 60, damping: 18, mass: 1 });
  const scale = useSpring(pose.scale, { stiffness: 60, damping: 16, mass: 1 });
  const opacity = useSpring(pose.opacity, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const setAmplitude = () => setAmp(Math.min(window.innerWidth * 0.17, 300));
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
        <div className="h-[min(74vw,28rem)] w-[min(74vw,28rem)]">
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
      <motion.div style={{ x, opacity }} className="flex">
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
            className="relative h-[min(86vw,34rem)] w-[min(86vw,34rem)]"
          >
            <ExperienceMascot />

            {/* Themed satellite — engaged with the active checkpoint */}
            <AnimatePresence mode="wait">
              {satellite && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
                  >
                    <div className="absolute left-1/2 top-[6%] -translate-x-1/2">
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
                        className="flex h-9 w-9 items-center justify-center rounded-full cine-card text-[var(--cine-amber)]"
                        style={{ boxShadow: '0 0 18px -4px rgba(var(--cine-particle),0.6)' }}
                      >
                        {(() => {
                          const Icon = satellite;
                          return <Icon className="h-4 w-4" strokeWidth={1.8} />;
                        })()}
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
