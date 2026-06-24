'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { AliveMascot } from './Mascot';
import { useExperience } from './ExperienceContext';
import { scenes, type Trick } from '@/lib/experience';

const EASE = [0.22, 1, 0.36, 1] as const;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const clamp01 = (v: number) => clamp(v, 0, 1);
// Smooth in/out so the guide eases into each mark rather than tracking the
// scroll linearly — it reads as an intentional guide, not a parallax sticker.
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const MOBILE_BREAKPOINT = 1024;

/** Horizontal arc bias per chapter — the path bows around the copy mid-travel. */
const CHAPTER_ARC = [0, -0.06, 0.05, 0];

/**
 * On phones the guide can't share a row with the copy, so it gets one carefully
 * chosen spot per chapter and "portals" between them — a dissolve where it is,
 * then it re-forms at the new mark. Clearly travelling, never covering text
 * (the wrapper is pointer-events-none, and these anchors sit clear of the copy).
 */
const mobileAnchors: { x: number; y: number; scale: number }[] = [
  { x: 0.78, y: 0.8, scale: 0.52 }, // hero
  { x: 0.22, y: 0.82, scale: 0.48 }, // command
  { x: 0.8, y: 0.82, scale: 0.48 }, // platform
  { x: 0.78, y: 0.8, scale: 0.52 }, // finale
];

/**
 * The hero choreography, expressed as a function of the 0→1 reveal timeline.
 * The mascot glides down from its intro hand-off, sweeps left→right across the
 * headline band (lighting up the words in its trail), then floats up to its
 * roaming anchor. Returned positions are viewport fractions.
 */
function heroSweep(p: number): { x: number; y: number; scale: number } {
  // Phase A — drop from the hand-off point to the start of the sweep.
  if (p < 0.16) {
    const t = p / 0.16;
    return { x: lerp(0.5, 0.17, t), y: lerp(0.2, 0.47, t), scale: lerp(1.12, 1.18, t) };
  }
  // Phase B — sweep across the headline, arcing gently over the type.
  if (p < 0.7) {
    const t = (p - 0.16) / 0.54;
    return { x: lerp(0.17, 0.83, t), y: 0.47 - Math.sin(Math.PI * t) * 0.045, scale: 1.18 };
  }
  // Phase C — rise back up to the hero mark.
  const t = (p - 0.7) / 0.3;
  return { x: lerp(0.83, 0.5, t), y: lerp(0.47, 0.2, t), scale: lerp(1.18, 1.12, t) };
}

/**
 * The mascot guide. On desktop it is a continuous traveller: it opens the hero
 * with the headline sweep, then every scroll step glides it along a bowed path
 * between the chapter marks — resting in each chapter's safe zone and only
 * crossing the gaps in between, never cutting through the copy. It steps aside
 * (fades) for the dense product act and returns for the finale. On phones it
 * keeps one mark per chapter and portals between them. GPU-composited; calm.
 */
export function MascotGuide({ introHold = false }: { introHold?: boolean }) {
  const reduce = useReducedMotion();
  const { active, mascotVisible, heroReveal } = useExperience();
  const [vp, setVp] = useState({ w: 1440, h: 900 });

  // Travel target → smoothed by springs.
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetScale = useMotionValue(1);
  const x = useSpring(targetX, { stiffness: 82, damping: 22, mass: 0.9 });
  const y = useSpring(targetY, { stiffness: 82, damping: 22, mass: 0.9 });
  const scale = useSpring(targetScale, { stiffness: 78, damping: 20, mass: 0.9 });

  // Opacity is the product of two tracks: `vis` fades the guide out when it
  // steps aside for the product act, and `portal` drives the mobile dissolve.
  const portal = useMotionValue(1);
  const portalSpring = useSpring(portal, { stiffness: 140, damping: 24, mass: 0.5 });
  const vis = useMotionValue(1);
  const visSpring = useSpring(vis, { stiffness: 120, damping: 26, mass: 0.5 });
  const opacity = useTransform([visSpring, portalSpring], ([a, b]: number[]) => a * b);

  useEffect(() => {
    vis.set(mascotVisible ? 1 : 0);
  }, [mascotVisible, vis]);

  // Cursor → a restrained tilt + gaze (small, so it reads calm).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 90, damping: 20, mass: 0.6 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [7, -7]), { stiffness: 90, damping: 20, mass: 0.6 });
  const lookX = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.5 });
  const lookY = useSpring(my, { stiffness: 80, damping: 18, mass: 0.5 });

  const trick = useAnimationControls();
  const firstRun = useRef(true);

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ----- MOBILE: one mark per chapter, with a dissolve → reform portal -----
  useEffect(() => {
    if (vp.w >= MOBILE_BREAKPOINT) return;
    const idx = Math.min(active, mobileAnchors.length - 1);
    const m = mobileAnchors[idx] ?? mobileAnchors[mobileAnchors.length - 1];

    if (reduce) {
      x.jump(m.x * vp.w);
      y.jump(m.y * vp.h);
      scale.jump(m.scale);
      targetX.set(m.x * vp.w);
      targetY.set(m.y * vp.h);
      targetScale.set(m.scale);
      portal.set(1);
      return;
    }

    // Dissolve where it is, jump to the new mark while invisible, then re-form.
    portal.set(0);
    const t = window.setTimeout(() => {
      x.jump(m.x * vp.w);
      y.jump(m.y * vp.h);
      scale.jump(m.scale * 0.7);
      targetX.set(m.x * vp.w);
      targetY.set(m.y * vp.h);
      targetScale.set(m.scale);
      portal.set(1);
    }, 240);
    return () => window.clearTimeout(t);
  }, [active, vp, reduce, x, y, scale, targetX, targetY, targetScale, portal]);

  // ----- DESKTOP: continuous, scroll-driven travel between chapter marks -----
  useEffect(() => {
    if (vp.w < MOBILE_BREAKPOINT) return;
    portal.set(1);

    const w = vp.w;
    const h = vp.h;
    const heroHandoff = { x: 0.5, y: 0.2, scale: 1.12 };

    // Resolve the live bounds + mark of every chapter that's mounted.
    type Node = { x: number; y: number; scale: number; arc: number; top: number; bottom: number };
    const collect = (): Node[] => {
      const out: Node[] = [];
      scenes.forEach((s, idx) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        out.push({
          x: s.pos.x,
          y: s.pos.y,
          scale: s.scale,
          arc: CHAPTER_ARC[idx] ?? 0,
          top: r.top,
          bottom: r.bottom,
        });
      });
      return out;
    };

    // Rest in each chapter's mark; travel only across the boundary band.
    const travel = (nodes: Node[]): { x: number; y: number; scale: number } => {
      if (nodes.length === 0) return heroHandoff;
      const focus = h / 2;
      const lastN = nodes.length - 1;
      const boundary = (k: number) => (nodes[k].bottom + nodes[k + 1].top) / 2;

      let i = 0;
      while (i < lastN && focus >= boundary(i)) i++;

      let fx = nodes[i].x;
      let fy = nodes[i].y;
      let fs = nodes[i].scale;

      const BAND = Math.min(h * 0.4, 360);
      const cross = (k: number) => {
        const raw = clamp01((focus - (boundary(k) - BAND)) / (2 * BAND));
        const te = easeInOut(raw);
        const a = nodes[k];
        const b = nodes[k + 1];
        const bow = Math.sin(Math.PI * raw);
        fx = lerp(a.x, b.x, te) + bow * lerp(a.arc, b.arc, te);
        fy = lerp(a.y, b.y, te) - bow * 0.03;
        fs = lerp(a.scale, b.scale, te);
      };

      if (i < lastN && focus > boundary(i) - BAND) cross(i);
      else if (i > 0 && focus < boundary(i - 1) + BAND) cross(i - 1);
      else {
        // Resting — a whisper of scroll-linked drift so it never feels frozen.
        const span = Math.max(1, nodes[i].bottom - nodes[i].top);
        const p = clamp01((focus - nodes[i].top) / span);
        fy += (p - 0.5) * 0.04;
      }

      return { x: clamp(fx, 0.05, 0.95), y: clamp(fy, 0.1, 0.9), scale: fs };
    };

    const apply = () => {
      if (introHold) {
        targetX.set(heroHandoff.x * w);
        targetY.set(heroHandoff.y * h);
        targetScale.set(heroHandoff.scale);
        return;
      }
      const reveal = heroReveal.get();
      if (reveal < 0.999) {
        const s = heroSweep(reveal);
        targetX.set(s.x * w);
        targetY.set(s.y * h);
        targetScale.set(s.scale);
        return;
      }
      const t = travel(collect());
      targetX.set(t.x * w);
      targetY.set(t.y * h);
      targetScale.set(t.scale);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        apply();
      });
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    const unsub = heroReveal.on('change', apply);
    return () => {
      window.removeEventListener('scroll', onScroll);
      unsub();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [vp, introHold, heroReveal, targetX, targetY, targetScale, portal]);

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

  // A small flourish when settling into a new chapter.
  useEffect(() => {
    if (reduce) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    playTrick(trick, scenes[Math.min(active, scenes.length - 1)].trick);
  }, [active, reduce, trick]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-20"
      style={{ opacity }}
    >
      <motion.div className="absolute left-0 top-0" style={{ x, y, willChange: 'transform' }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2"
          style={{ scale, rotateX, rotateY, transformPerspective: 1000, willChange: 'transform' }}
        >
          <motion.div animate={trick} style={{ transformPerspective: 900 }}>
            <AliveMascot
              className="h-[clamp(12rem,25vmin,19rem)] w-[clamp(12rem,25vmin,19rem)]"
              lookX={reduce ? undefined : lookX}
              lookY={reduce ? undefined : lookY}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function playTrick(controls: ReturnType<typeof useAnimationControls>, t: Trick) {
  if (t === 'spin') {
    controls.start({ rotate: [0, -14, 360], transition: { duration: 1.1, ease: EASE, times: [0, 0.12, 1] } });
  } else if (t === 'flip') {
    controls.start({ rotateY: [0, -12, 360], transition: { duration: 1.1, ease: EASE, times: [0, 0.12, 1] } });
  } else if (t === 'pop') {
    controls.start({ scale: [1, 0.92, 1.1, 1], transition: { duration: 0.6, ease: EASE, times: [0, 0.25, 0.6, 1] } });
  }
}
