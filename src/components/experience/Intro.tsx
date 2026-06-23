'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  animate,
  type Variants,
} from 'framer-motion';
import { AliveMascot } from './Mascot';

const EASE = [0.22, 1, 0.36, 1] as const;
const STORAGE_KEY = 'citron-intro-seen-v5';

/**
 * CITRON GENESIS — a cinematic birth, not a splash screen.
 *
 * On a bright, premium stage the Citron intelligence assembles itself from
 * light. A glowing nucleus calls fragments in from the edges; the mascot's
 * three brand pieces (two eyes + a smile) fly in from different directions and
 * snap into place; it takes its first breath, blinks awake, notices the cursor,
 * then the wordmark and tagline resolve piece-by-piece before the whole stage
 * dissolves upward into the Hero. ~6.5s, GPU-only, always skippable, once per
 * session. Reduced-motion users skip straight to the page.
 */

type Phase =
  | 'void' //       (internal initial state — never in ORDER)
  | 'signals' //    (internal — never in ORDER)
  | 'assembly' //   1 · pieces fly in and snap together
  | 'breath' //     2 · first breath — it comes alive, blinks
  | 'discovery' //  3 · it looks around, notices the cursor
  | 'reveal' //     4 · the Citron wordmark assembles
  | 'tagline'; //   5 · the tagline resolves

const ORDER: Phase[] = [
  'assembly',
  'breath',
  'discovery',
  'reveal',
  'tagline',
];

// Phase → how long it holds before the next begins (ms).
const TIMING: Record<Phase, number> = {
  void: 0,
  signals: 0,
  assembly: 1100,
  breath: 600,
  discovery: 600,
  reveal: 520,
  tagline: 900,
};

/* ── The three brand pieces, each called in from a different direction ──────
   Geometry matches AliveMascot exactly so the cross-fade is seamless.
   `from` is where the piece is summoned from, `mid` is its in-flight apex /
   overshoot, and every piece settles to the identity transform (home). */
type Piece = {
  id: 'L' | 'R' | 'S';
  kind: 'eye' | 'smile';
  x?: number;
  origin: string;
  delay: number;
  from: { x: number; y: number; r: number; s: number };
  mid: { x: number; y: number; r: number; s: number };
};

const PIECES: Piece[] = [
  // left eye — summoned from the top-left, rotates in
  {
    id: 'L',
    kind: 'eye',
    x: 378,
    origin: '438px 265px',
    delay: 0,
    from: { x: -560, y: -380, r: -150, s: 0.5 },
    mid: { x: 26, y: -22, r: 14, s: 1.08 },
  },
  // right eye — orbits in over the top from the bottom-right
  {
    id: 'R',
    kind: 'eye',
    x: 602,
    origin: '662px 265px',
    delay: 0.12,
    from: { x: 560, y: 360, r: 150, s: 0.5 },
    mid: { x: 70, y: -240, r: -26, s: 1.05 },
  },
  // smile — emerges from depth, below
  {
    id: 'S',
    kind: 'smile',
    origin: '550px 430px',
    delay: 0.24,
    from: { x: 0, y: 560, r: 16, s: 0.32 },
    mid: { x: 0, y: -26, r: -6, s: 1.07 },
  },
];

const pieceVariants: Variants = {
  void: (p: Piece) => ({
    opacity: 0,
    x: p.from.x,
    y: p.from.y,
    rotate: p.from.r,
    scale: p.from.s,
  }),
  signals: (p: Piece) => ({
    opacity: 0.55,
    x: p.from.x,
    y: p.from.y,
    rotate: p.from.r,
    scale: p.from.s,
    transition: { duration: 0.55, ease: EASE },
  }),
  assembly: (p: Piece) => ({
    opacity: [0.55, 1, 1],
    x: [p.from.x, p.mid.x, 0],
    y: [p.from.y, p.mid.y, 0],
    rotate: [p.from.r, p.mid.r, 0],
    scale: [p.from.s, p.mid.s, 1],
    transition: { duration: 1.05, ease: EASE, delay: p.delay, times: [0, 0.62, 1] },
  }),
};

/** The mascot under construction — pure brand pieces, no idle life yet. */
function AssemblingMascot({ stage }: { stage: 'void' | 'signals' | 'assembly' }) {
  return (
    <svg
      viewBox="0 0 1100 800"
      aria-hidden
      className="h-full w-full"
      style={{ overflow: 'visible', color: 'var(--cine-amber-bright)' }}
    >
      {PIECES.map((p) => (
        <motion.g
          key={p.id}
          custom={p}
          variants={pieceVariants}
          initial="void"
          animate={stage}
          style={{ transformOrigin: p.origin }}
        >
          {p.kind === 'smile' ? (
            <path
              d="M 200 360 A 350 350 0 0 0 900 360"
              fill="none"
              stroke="currentColor"
              strokeWidth={96}
              strokeLinecap="round"
            />
          ) : (
            <rect x={p.x} y={96} width={120} height={338} rx={10} fill="currentColor" />
          )}
        </motion.g>
      ))}
    </svg>
  );
}

/** Citron — assembled letter by letter, each snapping in with a little life. */
function Wordmark() {
  return (
    <div className="relative flex items-end" style={{ perspective: 600 }}>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -inset-x-10"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(var(--cine-particle),0.20), transparent)',
        }}
        initial={{ x: '-60%', opacity: 0 }}
        animate={{ x: '60%', opacity: [0, 1, 0] }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
      />
      {'Citron'.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="text-[clamp(2.5rem,7vw,3.6rem)] font-semibold tracking-[-0.03em] text-cine"
          initial={false}
          animate={{
            opacity: [0, 1, 1],
            y: [24, -3, 0],
            scale: [0.55, 1.1, 1],
            rotate: [i % 2 ? -10 : 10, 2, 0],
          }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.03 + i * 0.04, times: [0, 0.6, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </div>
  );
}

/** "One Intelligence." — a beat — "For Your Entire Business." */
function Tagline() {
  return (
    <div className="mt-4 flex flex-col items-center gap-1 text-center">
      <motion.span
        className="text-[0.95rem] font-medium tracking-[0.01em] text-cine-dim sm:text-[1.0625rem]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        One Intelligence.
      </motion.span>
      <motion.span
        className="text-[0.95rem] font-semibold tracking-[0.01em] text-[var(--cine-amber)] sm:text-[1.0625rem]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.38 }}
      >
        For Your Entire Business.
      </motion.span>
    </div>
  );
}

/** Whether the intro should play on this client (once per session, motion ok). */
export function introWillPlay(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (sessionStorage.getItem(STORAGE_KEY)) return false;
  } catch {
    /* storage unavailable */
  }
  return true;
}

export function Intro({ onDone }: { onDone?: () => void }) {
  const reduce = useReducedMotion();
  // Decide synchronously on the very first render so the overlay paints before
  // the page is ever visible — no flash of the hero before the animation.
  const [armed] = useState(introWillPlay);
  const [visible, setVisible] = useState(armed);
  const [phase, setPhase] = useState<Phase>('assembly');
  // Where the mascot flies to on exit — measured at hand-off, defaults safe.
  const [exitT, setExitT] = useState({ x: 0, y: -80, scale: 1.12 });

  // Cursor → gaze. Fed to the live mascot once it has woken (discovery).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const lookX = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.5 });
  const lookY = useSpring(my, { stiffness: 80, damping: 18, mass: 0.5 });
  const glanceRef = useRef<{ stop: () => void }[]>([]);

  const timerRef = useRef<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const pi = ORDER.indexOf(phase);
  const at = (p: Phase) => pi >= ORDER.indexOf(p);

  // End the intro: measure the mascot, aim it at the hero anchor, then dissolve.
  const finish = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    const el = boxRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // Matches the hero mascot guide's anchor: scene.pos = { x: 0.5, y: 0.2 }.
      const tx = window.innerWidth * 0.5;
      const ty = window.innerHeight * 0.2;
      setExitT({ x: tx - cx, y: ty - cy, scale: 1.12 });
    }
    setVisible(false);
  }, []);

  // Lock scroll while the intro plays.
  useEffect(() => {
    if (!armed) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = prevOverflow;
    };
  }, [armed]);

  // Drive the phase machine.
  useEffect(() => {
    if (!armed) return;
    let i = 0;
    const run = () => {
      if (i >= ORDER.length) {
        finish();
        return;
      }
      const p = ORDER[i];
      setPhase(p);
      i += 1;
      timerRef.current = window.setTimeout(run, TIMING[p]);
    };
    run();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [armed, finish]);

  // Skip on intent — but ignore the first instants (browsers can fire a
  // synthetic scroll on load that would dismiss before anything plays).
  useEffect(() => {
    if (!armed) return;
    const dismiss = () => finish();
    let armSkip = 0;
    const add = () => {
      window.addEventListener('wheel', dismiss, { passive: true, once: true });
      window.addEventListener('touchstart', dismiss, { passive: true, once: true });
      window.addEventListener('keydown', dismiss, { once: true });
    };
    armSkip = window.setTimeout(add, 350);
    return () => {
      window.clearTimeout(armSkip);
      window.removeEventListener('wheel', dismiss);
      window.removeEventListener('touchstart', dismiss);
      window.removeEventListener('keydown', dismiss);
    };
  }, [armed, finish]);

  // Discovery — a scripted curious glance, then the cursor takes over.
  useEffect(() => {
    if (phase !== 'discovery' || reduce) return;
    const a1 = animate(mx, [0, 0.55, -0.45, 0.12, 0], { duration: 1.7, ease: EASE });
    const a2 = animate(my, [0, -0.18, 0.22, 0], { duration: 1.7, ease: EASE });
    glanceRef.current = [a1, a2];
    return () => {
      a1.stop();
      a2.stop();
    };
  }, [phase, reduce, mx, my]);

  // Once awake, follow the cursor (and cancel the scripted glance on first move).
  useEffect(() => {
    if (!at('discovery') || reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: MouseEvent) => {
      glanceRef.current.forEach((a) => a.stop());
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, reduce, mx, my]);

  const onExitComplete = () => {
    document.documentElement.style.overflow = '';
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    // Hand control to the live hero mascot guide (it begins roaming from here).
    onDone?.();
  };

  if (!armed) return null;

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {visible && (
        <motion.div
          key="citron-genesis"
          className="fixed inset-0 z-[110] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          {/* ── Bright, premium stage ─────────────────────────────────── */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, #ffffff 0%, var(--cine-bg-0) 58%, var(--cine-void-to) 100%)',
            }}
          />
          {/* faint dot grid for premium depth, masked to the centre */}
          <div
            aria-hidden
            className="absolute inset-0 bg-dots opacity-60"
            style={{
              WebkitMaskImage:
                'radial-gradient(58% 58% at 50% 44%, black, transparent 76%)',
              maskImage: 'radial-gradient(58% 58% at 50% 44%, black, transparent 76%)',
            }}
          />
          {/* slow breathing amber light */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(58% 52% at 50% 44%, rgba(var(--cine-particle),0.12), transparent 70%)',
            }}
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
            transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
          />
          {/* soft framing vignette */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 120% at 50% 50%, transparent 58%, var(--cine-vignette) 100%)',
            }}
          />

          {/* ── Centre stage ──────────────────────────────────────────── */}
          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
            {/* mascot zone — flies to its hero anchor on exit */}
            <motion.div
              ref={boxRef}
              className="relative"
              exit={{ x: exitT.x, y: exitT.y, scale: exitT.scale }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <div className="relative h-[clamp(10rem,24vw,14rem)] w-[clamp(10rem,24vw,14rem)]">
                {/* behind-glow — blooms in as the mascot assembles */}
                <motion.div
                  aria-hidden
                  className="absolute inset-[-30%] rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(var(--cine-particle),0.22), transparent 65%)',
                  }}
                  initial={{ opacity: 0.2, scale: 0.8 }}
                  animate={{ opacity: 0.9, scale: 1 }}
                  transition={{ duration: 1, ease: EASE }}
                />

                {/* first breath — a glow bloom + a ring, masking the
                    hand-off from the constructed pieces to the living mascot */}
                {at('breath') && (
                  <>
                    <motion.span
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 50%, rgba(var(--cine-particle),0.38), transparent 60%)',
                      }}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: [0, 0.85, 0.25], scale: [0.7, 1.12, 1] }}
                      transition={{ duration: 1.2, ease: EASE, times: [0, 0.4, 1] }}
                    />
                    <motion.span
                      aria-hidden
                      className="absolute left-1/2 top-1/2 rounded-full"
                      style={{
                        marginLeft: -80,
                        marginTop: -80,
                        width: 160,
                        height: 160,
                        border: '1px solid rgba(var(--cine-particle),0.5)',
                      }}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: [0.4, 1, 2.4], opacity: [0, 0.6, 0] }}
                      transition={{ duration: 1.4, ease: EASE, times: [0, 0.25, 1] }}
                    />
                  </>
                )}

                {/* the constructed mascot — flies in and snaps together */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: at('breath') ? 0 : 1 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <AssemblingMascot stage="assembly" />
                </motion.div>

                {/* the living mascot (breath, blink, gaze) */}
                {at('breath') && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <AliveMascot
                      className="absolute inset-0 h-full w-full"
                      lookX={reduce ? undefined : lookX}
                      lookY={reduce ? undefined : lookY}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* text zone — reserved so mounting copy never shifts the mascot */}
            <motion.div
              className="relative mt-7 flex h-[8rem] w-full flex-col items-center"
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {at('reveal') && <Wordmark />}
              {at('tagline') && <Tagline />}
            </motion.div>
          </div>

          <motion.button
            type="button"
            onClick={finish}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-cine-faint transition-colors hover:text-cine"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Skip intro
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
