'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationControls,
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
import { scenes, type CheckpointVisual } from '@/lib/experience';

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

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The mascot — a living companion that performs the journey. It welcomes the
 * visitor large and centered, then travels the trunk: drifting diagonally
 * toward each discovery, leaning to "look" at the content, pausing while the
 * visitor reads, and celebrating major reveals with spins, flips, and pops.
 * Cursor proximity adds springed 3D tilt and parallax on top.
 */
export function MascotStage() {
  const reduce = useReducedMotion();
  const { active } = useExperience();
  const [amp, setAmp] = useState({ x: 220, y: 130 });

  const pose = scenes[Math.min(active, scenes.length - 1)];
  const satellite = pose.visual ? SAT_ICON[pose.visual] : null;

  // Cursor → tilt / parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-18, 18]), {
    stiffness: 110,
    damping: 18,
    mass: 0.6,
  });
  const rotateX = useSpring(useTransform(my, [-1, 1], [14, -14]), {
    stiffness: 110,
    damping: 18,
    mass: 0.6,
  });
  const parallaxX = useSpring(useTransform(mx, [-1, 1], [-26, 26]), {
    stiffness: 70,
    damping: 20,
    mass: 0.7,
  });
  const parallaxY = useSpring(useTransform(my, [-1, 1], [-20, 20]), {
    stiffness: 70,
    damping: 20,
    mass: 0.7,
  });

  // Active scene → travel, scale, lean (springed for inertia + acceleration)
  const x = useSpring(pose.x * amp.x, { stiffness: 55, damping: 17, mass: 1 });
  const y = useSpring(pose.y * amp.y, { stiffness: 55, damping: 17, mass: 1 });
  const scale = useSpring(pose.scale, { stiffness: 60, damping: 15, mass: 1 });
  const rotate = useSpring(pose.rotate, { stiffness: 90, damping: 14, mass: 0.8 });
  const opacity = useSpring(pose.opacity, { stiffness: 80, damping: 20 });

  // Trick layer — celebratory moves on arrival
  const trick = useAnimationControls();
  const firstRun = useRef(true);

  useEffect(() => {
    const setAmplitude = () =>
      setAmp({
        x: Math.min(window.innerWidth * 0.17, 300),
        y: Math.min(window.innerHeight * 0.13, 150),
      });
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

  // Play the trick when arriving at a new scene
  useEffect(() => {
    if (reduce) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const t = scenes[Math.min(active, scenes.length - 1)].trick;
    if (t === 'spin') trick.start({ rotate: [0, 360], transition: { duration: 1.1, ease: EASE } });
    else if (t === 'flip') trick.start({ rotateY: [0, 360], transition: { duration: 1.1, ease: EASE } });
    else if (t === 'pop') trick.start({ scale: [1, 1.18, 1], transition: { duration: 0.6, ease: EASE } });
  }, [active, reduce, trick]);

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
      <motion.div style={{ x, y, opacity }} className="flex">
        <motion.div
          style={{
            rotateX,
            rotateY,
            x: parallaxX,
            y: parallaxY,
            transformPerspective: 1100,
          }}
        >
          <motion.div style={{ scale, rotate }}>
            <motion.div animate={trick} style={{ transformPerspective: 900 }}>
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
                className="relative h-[min(86vw,34rem)] w-[min(86vw,34rem)]"
              >
                <ExperienceMascot />

                <AnimatePresence mode="wait">
                  {satellite && (
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute inset-0"
                    >
                      <motion.div
                        className="absolute inset-0"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
                      >
                        <div className="absolute left-1/2 top-[6%] -translate-x-1/2">
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
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
        </motion.div>
      </motion.div>
    </div>
  );
}
