'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

type Ctx = {
  active: number;
  total: number;
  /** True while at least one mascot chapter is on screen (hides the guide over the product act). */
  mascotVisible: boolean;
  setActive: (i: number) => void;
  setVisibleIndex: (i: number, visible: boolean) => void;
  /**
   * 0 → 1 timeline for the hero reveal. The mascot sweeps the headline as this
   * advances; each headline word lights up in its trail. Shared so the guide's
   * motion and the text reveal stay perfectly in sync.
   */
  heroReveal: MotionValue<number>;
  /** Kick off the hero reveal once (after the intro hands off). Idempotent. */
  playHeroReveal: () => void;
};

const ExperienceCtx = createContext<Ctx | null>(null);

export function ExperienceProvider({
  total,
  children,
}: {
  total: number;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const visibleRef = useRef<Set<number>>(new Set());
  const [mascotVisible, setMascotVisible] = useState(true);

  const heroReveal = useMotionValue(0);
  const playedRef = useRef(false);

  const setVisibleIndex = useCallback((i: number, visible: boolean) => {
    const s = visibleRef.current;
    if (visible) s.add(i);
    else s.delete(i);
    setMascotVisible(s.size > 0);
  }, []);

  const playHeroReveal = useCallback(() => {
    if (playedRef.current) return;
    playedRef.current = true;
    if (reduce) {
      heroReveal.set(1);
      return;
    }
    animate(heroReveal, 1, { duration: 2.7, ease: EASE });
  }, [reduce, heroReveal]);

  return (
    <ExperienceCtx.Provider
      value={{ active, total, mascotVisible, setActive, setVisibleIndex, heroReveal, playHeroReveal }}
    >
      {children}
    </ExperienceCtx.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(ExperienceCtx);
  if (!ctx) throw new Error('useExperience must be used within ExperienceProvider');
  return ctx;
}

/**
 * Registers a mascot chapter: when its element is centered in the viewport it
 * becomes the active scene (which the guide travels to) and marks the guide
 * visible. Returns a ref to attach to the chapter's root element.
 */
export function useScene<T extends Element = HTMLDivElement>(
  index: number
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const { setActive, setVisibleIndex } = useExperience();

  useEffect(() => {
    if (inView) setActive(index);
    setVisibleIndex(index, inView);
  }, [inView, index, setActive, setVisibleIndex]);

  return ref;
}
