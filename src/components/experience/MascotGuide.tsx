'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  animate as animateMV,
  useAnimationControls,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useScroll,
  useVelocity,
} from 'framer-motion';
import { AliveMascot } from './Mascot';
import { useExperience } from './ExperienceContext';
import { scenes, type Trick, type Layout } from '@/lib/experience';

const EASE = [0.22, 1, 0.36, 1] as const;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const clamp01 = (v: number) => clamp(v, 0, 1);
// Smooth in/out so the guide eases into each mark rather than tracking the
// scroll linearly — it reads as an intentional guide, not a parallax sticker.
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const MOBILE_BREAKPOINT = 1024;
/** Matches the content frame's `lg:px-10` padding and `lg:max-w-[46%]` lane. */
const FRAME_PAD = 40;
const CONTENT_LANE = 0.46;

/** Horizontal arc bias per chapter — the path bows around the copy mid-travel. */
const CHAPTER_ARC = [0, -0.06, 0.05, 0];

/**
 * The vertical corridor (viewport fractions) the mascot may roam within a
 * chapter. `above` parks it high above the centered hero copy; every other
 * layout keeps a column that is clear top-to-bottom, so the guide simply glides
 * down it as you scroll — visibly following the scroll, never sitting on text.
 */
function bandFor(layout: Layout): [number, number] {
  return layout === 'above' ? [0.16, 0.26] : [0.4, 0.6];
}

/**
 * The mascot's safe horizontal center for a chapter, measured from the real
 * content frame so it tracks the centered container on any viewport width
 * (fixed fractions drift into the copy on wide screens). For side layouts it
 * sits in the middle of the empty gutter; for centered layouts, dead-center.
 */
function safeXFraction(frame: DOMRect, layout: Layout, vw: number): number {
  const padL = frame.left + FRAME_PAD;
  const padR = frame.right - FRAME_PAD;
  const padW = Math.max(1, padR - padL);
  let cx: number;
  if (layout === 'left') {
    // Copy occupies the right 46%; rest in the left gutter.
    const contentLeft = padR - CONTENT_LANE * padW;
    cx = (padL + contentLeft) / 2;
  } else if (layout === 'right') {
    // Copy occupies the left 46%; rest in the right gutter.
    const contentRight = padL + CONTENT_LANE * padW;
    cx = (contentRight + padR) / 2;
  } else {
    // `above` (over the hero) / `split` (the empty centre track) → dead-center.
    cx = (frame.left + frame.right) / 2;
  }
  return clamp(cx / vw, 0.05, 0.95);
}

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
 * The mascot glides down from its intro hand-off, sweeps left→right *above* the
 * headline (leading each word as it lights up in its trail), then floats up to
 * its roaming anchor. It stays clear of the copy throughout. Viewport fractions.
 */
function heroSweep(p: number): { x: number; y: number; scale: number } {
  // Phase A — drop from the hand-off point to the start of the sweep.
  if (p < 0.16) {
    const t = p / 0.16;
    return { x: lerp(0.5, 0.18, t), y: lerp(0.2, 0.31, t), scale: lerp(1.12, 1.18, t) };
  }
  // Phase B — sweep across the top of the headline, arcing gently above it.
  if (p < 0.7) {
    const t = (p - 0.16) / 0.54;
    return { x: lerp(0.18, 0.82, t), y: 0.31 - Math.sin(Math.PI * t) * 0.05, scale: 1.18 };
  }
  // Phase C — rise back up to the hero mark.
  const t = (p - 0.7) / 0.3;
  return { x: lerp(0.82, 0.5, t), y: lerp(0.31, 0.2, t), scale: lerp(1.18, 1.12, t) };
}

/** One short-lived particle explosion fired when the guide pops out / in. */
type BurstSpec = { id: number; cx: number; cy: number };

/**
 * The mascot guide. On desktop it is a continuous traveller: it opens the hero
 * with the headline sweep, then every scroll step glides it down the clear
 * gutter of the chapter it's in and weaves to the next chapter's gutter across
 * the boundary — always measured from the live layout, so it never overlaps the
 * copy. It is layered *behind* the text (z below the content) as a hard
 * guarantee it can never cover a word. When it steps aside for the dense product
 * act it pops out in a shower of particles, and pops back for the finale. On
 * phones it keeps one mark per chapter and portals between them. GPU-composited.
 */
export function MascotGuide({ introHold = false }: { introHold?: boolean }) {
  const reduce = useReducedMotion();
  const { active, mascotVisible, heroReveal } = useExperience();
  const [vp, setVp] = useState({ w: 1440, h: 900 });

  // Travel target → smoothed by springs.
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetScale = useMotionValue(1);
  const x = useSpring(targetX, { stiffness: 90, damping: 24, mass: 0.9 });
  const y = useSpring(targetY, { stiffness: 90, damping: 24, mass: 0.9 });
  const baseScale = useSpring(targetScale, { stiffness: 82, damping: 22, mass: 0.9 });

  // Visibility = a pop (punch + shrink/grow) for the desktop step-aside, times
  // the mobile dissolve `portal`. The pop fires a particle burst as it leaves.
  const popScale = useMotionValue(1);
  const popOpacity = useMotionValue(1);
  const portal = useMotionValue(1);
  const portalSpring = useSpring(portal, { stiffness: 140, damping: 24, mass: 0.5 });
  const opacity = useTransform([popOpacity, portalSpring], ([a, b]: number[]) => a * b);
  const scale = useTransform([baseScale, popScale], ([s, p]: number[]) => s * p);

  // Scroll velocity → a gentle lean, so the guide reacts to the scroll and
  // never reads as frozen, even while it's resting in a gutter.
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const leanRaw = useTransform(scrollVelocity, [-2600, 0, 2600], [7, 0, -7]);
  const lean = useSpring(leanRaw, { stiffness: 110, damping: 18, mass: 0.7 });

  // Cursor → a restrained tilt + gaze (small, so it reads calm).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 90, damping: 20, mass: 0.6 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [7, -7]), { stiffness: 90, damping: 20, mass: 0.6 });
  const lookX = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.5 });
  const lookY = useSpring(my, { stiffness: 80, damping: 18, mass: 0.5 });

  const trick = useAnimationControls();
  const firstRun = useRef(true);

  // Particle bursts (keyed, auto-expiring).
  const [bursts, setBursts] = useState<BurstSpec[]>([]);
  const burstSeq = useRef(0);
  const spawnBurst = (cx: number, cy: number) => {
    const id = burstSeq.current++;
    setBursts((b) => [...b, { id, cx, cy }]);
    window.setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 900);
  };

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ----- DISAPPEAR / RETURN — pop + particle burst -----
  const visFirst = useRef(true);
  useEffect(() => {
    // Skip the initial mount: the guide starts visible, no pop owed.
    if (visFirst.current) {
      visFirst.current = false;
      return;
    }
    if (reduce) {
      popScale.set(1);
      popOpacity.set(mascotVisible ? 1 : 0);
      return;
    }
    if (!mascotVisible) {
      // Pop OUT — a quick punch, then collapse into a shower of particles.
      spawnBurst(x.get(), y.get());
      animateMV(popScale, [1, 1.22, 0], { duration: 0.5, ease: EASE, times: [0, 0.32, 1] });
      animateMV(popOpacity, [1, 1, 0], { duration: 0.5, ease: 'easeIn', times: [0, 0.42, 1] });
    } else {
      // Pop IN — reform with a soft overshoot.
      animateMV(popScale, [0, 1.12, 1], { duration: 0.56, ease: EASE, times: [0, 0.62, 1] });
      animateMV(popOpacity, [0, 1, 1], { duration: 0.42, ease: 'easeOut', times: [0, 0.5, 1] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mascotVisible, reduce]);

  // ----- MOBILE: one mark per chapter, with a dissolve → reform portal -----
  useEffect(() => {
    if (vp.w >= MOBILE_BREAKPOINT) return;
    const idx = Math.min(active, mobileAnchors.length - 1);
    const m = mobileAnchors[idx] ?? mobileAnchors[mobileAnchors.length - 1];

    if (reduce) {
      x.jump(m.x * vp.w);
      y.jump(m.y * vp.h);
      baseScale.jump(m.scale);
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
      baseScale.jump(m.scale * 0.7);
      targetX.set(m.x * vp.w);
      targetY.set(m.y * vp.h);
      targetScale.set(m.scale);
      portal.set(1);
    }, 240);
    return () => window.clearTimeout(t);
  }, [active, vp, reduce, x, y, baseScale, targetX, targetY, targetScale, portal]);

  // ----- DESKTOP: continuous, scroll-driven travel down the safe gutters -----
  useEffect(() => {
    if (vp.w < MOBILE_BREAKPOINT) return;
    portal.set(1);

    const w = vp.w;
    const h = vp.h;
    const heroHandoff = { x: 0.5, y: 0.2, scale: 1.12 };

    // Static per-chapter data, measured once per layout/resize: the safe gutter
    // center (horizontal) and the vertical corridor. Only the chapter's top/
    // bottom is read per frame on scroll.
    type Mark = { id: string; xFrac: number; yTop: number; yBot: number; scale: number; arc: number };
    const marks: Mark[] = scenes.map((s, idx) => {
      const el = document.getElementById(s.id);
      let xFrac = s.pos.x;
      if (el) {
        const frameEl = el.querySelector('[data-frame]') as HTMLElement | null;
        const frame = (frameEl ?? el).getBoundingClientRect();
        xFrac = safeXFraction(frame, s.layout, w);
      }
      const [yTop, yBot] = bandFor(s.layout);
      return { id: s.id, xFrac, yTop, yBot, scale: s.scale, arc: CHAPTER_ARC[idx] ?? 0 };
    });

    type Node = Mark & { top: number; bottom: number; height: number };
    const collect = (): Node[] => {
      const out: Node[] = [];
      marks.forEach((m) => {
        const el = document.getElementById(m.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        out.push({ ...m, top: r.top, bottom: r.bottom, height: Math.max(1, r.height) });
      });
      return out;
    };

    // Glide down the chapter's corridor with scroll, weaving across boundaries.
    const travel = (nodes: Node[]): { x: number; y: number; scale: number } => {
      if (nodes.length === 0) return heroHandoff;
      const focus = h / 2;
      const lastN = nodes.length - 1;
      const boundary = (k: number) => (nodes[k].bottom + nodes[k + 1].top) / 2;

      let i = 0;
      while (i < lastN && focus >= boundary(i)) i++;

      const here = nodes[i];
      // Resting: descend the gutter as the chapter scrolls through the viewport.
      const p = clamp01((focus - here.top) / here.height);
      let fx = here.xFrac;
      let fy = lerp(here.yTop, here.yBot, easeInOut(p));
      let fs = here.scale;

      const BAND = Math.min(h * 0.42, 380);
      const cross = (k: number) => {
        const a = nodes[k];
        const b = nodes[k + 1];
        const raw = clamp01((focus - (boundary(k) - BAND)) / (2 * BAND));
        const te = easeInOut(raw);
        const bow = Math.sin(Math.PI * raw);
        fx = lerp(a.xFrac, b.xFrac, te) + bow * lerp(a.arc, b.arc, te);
        fy = lerp(a.yBot, b.yTop, te) - bow * 0.05;
        fs = lerp(a.scale, b.scale, te);
      };

      if (i < lastN && focus > boundary(i) - BAND) cross(i);
      else if (i > 0 && focus < boundary(i - 1) + BAND) cross(i - 1);

      return { x: clamp(fx, 0.04, 0.96), y: clamp(fy, 0.08, 0.92), scale: fs };
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
    // z-[5]: above the chapter backgrounds (z-0), below the copy (z-10) — a hard
    // guarantee the guide can never render in front of any text.
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[5]">
      <motion.div className="absolute inset-0" style={{ opacity }}>
        <motion.div className="absolute left-0 top-0" style={{ x, y, willChange: 'transform' }}>
          <motion.div
            className="-translate-x-1/2 -translate-y-1/2"
            style={{
              scale,
              rotateX,
              rotateY,
              rotateZ: reduce ? 0 : lean,
              transformPerspective: 1000,
              willChange: 'transform',
            }}
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

      {bursts.map((b) => (
        <ParticleBurst key={b.id} cx={b.cx} cy={b.cy} />
      ))}
    </div>
  );
}

/**
 * A radial particle explosion + expanding ring, anchored at (cx, cy) in
 * viewport pixels. Self-contained and short-lived; the parent unmounts it.
 * Each particle is centered with negative margins so framer can own its
 * transform without fighting a Tailwind centering translate.
 */
function ParticleBurst({ cx, cy }: { cx: number; cy: number }) {
  const particles = useMemo(() => {
    const N = 16;
    return Array.from({ length: N }, (_, i) => {
      const angle = (i / N) * Math.PI * 2 + (i % 2 ? 0.22 : 0);
      const dist = 52 + (i % 5) * 15;
      return {
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        size: 4 + (i % 3) * 2,
        delay: (i % 4) * 0.012,
      };
    });
  }, []);

  return (
    <div className="absolute" style={{ left: cx, top: cy }}>
      {/* expanding ring */}
      <motion.span
        className="absolute rounded-full"
        style={{
          left: 0,
          top: 0,
          width: 64,
          height: 64,
          marginLeft: -32,
          marginTop: -32,
          border: '2px solid rgba(var(--cine-particle), 0.6)',
        }}
        initial={{ scale: 0.4, opacity: 0.7 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      />
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: 0,
            top: 0,
            width: p.size,
            height: p.size,
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2,
            background: 'var(--cine-amber-bright)',
            boxShadow: '0 0 8px rgba(var(--cine-particle), 0.85)',
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.72, ease: [0.22, 0.7, 0.3, 1], delay: p.delay }}
        />
      ))}
    </div>
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
