'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTime,
  useTransform,
  useVelocity,
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
import { scenes, type CheckpointVisual, type Trick } from '@/lib/experience';

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
 * The mascot — a living companion that performs the whole journey.
 *
 * It welcomes the visitor large and centered, then shrinks gradually as they
 * begin to scroll and sets off to guide them: travelling to a fresh corner of
 * the viewport for every reveal, leaning to "look" at the content, and
 * celebrating with anticipation-led spins, flips and pops. Between moves it
 * settles into a calm reading state — gentle float, breathing, aware eyes —
 * driven by scroll velocity, so it's energetic while you scroll and patient
 * while you read. Never static, never distracting.
 */
export function MascotStage() {
  const reduce = useReducedMotion();
  const { active } = useExperience();
  const [amp, setAmp] = useState({ x: 240, y: 150 });

  const idx = Math.min(active, scenes.length - 1);
  const pose = scenes[idx];
  const satellite = pose.visual ? SAT_ICON[pose.visual] : null;

  const { scrollY } = useScroll();

  // Energy: how fast the visitor is scrolling (0 = reading, 1 = travelling).
  const velocity = useVelocity(scrollY);
  const energy = useSpring(
    useTransform(velocity, (v) => Math.min(Math.abs(v) / 1200, 1)),
    { stiffness: 40, damping: 18, mass: 0.6 }
  );

  // Cursor → tilt / parallax / gaze
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-18, 18]), { stiffness: 110, damping: 18, mass: 0.6 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [14, -14]), { stiffness: 110, damping: 18, mass: 0.6 });
  const parallaxX = useSpring(useTransform(mx, [-1, 1], [-26, 26]), { stiffness: 70, damping: 20, mass: 0.7 });
  const parallaxY = useSpring(useTransform(my, [-1, 1], [-20, 20]), { stiffness: 70, damping: 20, mass: 0.7 });
  const lookX = useSpring(mx, { stiffness: 90, damping: 16, mass: 0.5 });
  const lookY = useSpring(my, { stiffness: 90, damping: 16, mass: 0.5 });

  // Active scene → travel + lean (weighty springs for momentum, accel/decel)
  const posX = useSpring(pose.x * amp.x, { stiffness: 46, damping: 16, mass: 1.15 });
  const posY = useSpring(pose.y * amp.y, { stiffness: 46, damping: 16, mass: 1.15 });
  const lean = useSpring(pose.rotate, { stiffness: 80, damping: 13, mass: 0.8 });
  const opacity = useSpring(pose.opacity, { stiffness: 80, damping: 20 });

  // Scale: gradual hero shrink on first scroll, then per-scene depth.
  const activeRef = useRef(active);
  const scaleTarget = useMotionValue(scenes[0].scale);
  const heroScale = useTransform(scrollY, [0, 640], [scenes[0].scale, 0.66], { clamp: true });
  useMotionValueEvent(heroScale, 'change', (v) => {
    if (activeRef.current === 0) scaleTarget.set(v);
  });
  const scale = useSpring(scaleTarget, { stiffness: 56, damping: 16, mass: 1 });

  // Idle life — calm while reading, livelier while travelling.
  const time = useTime();
  const floatY = useTransform(time, (t) => Math.sin(t / 1400) * (5 + energy.get() * 13));
  const sway = useTransform(time, (t) => Math.sin(t / 1750) * energy.get() * 5);
  const orbitX = useTransform(time, (t) => Math.cos(t / 2100) * energy.get() * 15);
  const orbitY = useTransform(time, (t) => Math.sin(t / 1050) * energy.get() * 9);
  const breathe = useTransform(time, (t) => 1 + Math.sin(t / 2400) * 0.015);

  // Tricks
  const trick = useAnimationControls();
  const firstRun = useRef(true);

  useEffect(() => {
    const setAmplitude = () =>
      setAmp({
        x: Math.min(window.innerWidth * 0.18, 320),
        y: Math.min(window.innerHeight * 0.16, 170),
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

  // Update scale target on scene change (hero stays scroll-driven).
  useEffect(() => {
    activeRef.current = active;
    if (active !== 0) scaleTarget.set(pose.scale);
  }, [active, pose.scale, scaleTarget]);

  // Perform the arrival trick — with anticipation and overshoot.
  useEffect(() => {
    if (reduce) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    playTrick(trick, scenes[Math.min(active, scenes.length - 1)].trick);
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
      {/* Entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.82, y: 36 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        className="flex"
      >
        {/* Travel across the viewport */}
        <motion.div style={{ x: posX, y: posY, opacity }} className="flex">
          {/* Cursor tilt + parallax */}
          <motion.div
            style={{ rotateX, rotateY, x: parallaxX, y: parallaxY, transformPerspective: 1100 }}
          >
            {/* Lively orbital drift (figure-eight) — scales with energy */}
            <motion.div style={{ x: orbitX, y: orbitY }}>
              {/* Scene scale (depth) + lean to look at content */}
              <motion.div style={{ scale, rotate: lean }}>
                {/* Trick layer */}
                <motion.div animate={trick} style={{ transformPerspective: 900 }}>
                  {/* Breathing + gentle float + sway */}
                  <motion.div
                    style={{ y: floatY, scale: breathe, rotate: sway }}
                    className="relative h-[min(86vw,34rem)] w-[min(86vw,34rem)]"
                  >
                    <ExperienceMascot lookX={lookX} lookY={lookY} />

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
        </motion.div>
      </motion.div>
    </div>
  );
}

function playTrick(controls: ReturnType<typeof useAnimationControls>, t: Trick) {
  if (t === 'spin') {
    controls.start({
      rotate: [0, -22, 372, 360],
      transition: { duration: 1.25, ease: EASE, times: [0, 0.12, 0.82, 1] },
    });
  } else if (t === 'flip') {
    controls.start({
      rotateY: [0, -18, 375, 360],
      transition: { duration: 1.25, ease: EASE, times: [0, 0.12, 0.82, 1] },
    });
  } else if (t === 'pop') {
    controls.start({
      scale: [1, 0.9, 1.16, 1],
      transition: { duration: 0.7, ease: EASE, times: [0, 0.25, 0.6, 1] },
    });
  }
}
