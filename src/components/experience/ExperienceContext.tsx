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
import { useInView } from 'framer-motion';

type Ctx = {
  active: number;
  total: number;
  /** True while at least one mascot chapter is on screen (hides the guide over Act 2). */
  mascotVisible: boolean;
  setActive: (i: number) => void;
  setVisibleIndex: (i: number, visible: boolean) => void;
};

const ExperienceCtx = createContext<Ctx | null>(null);

export function ExperienceProvider({
  total,
  children,
}: {
  total: number;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const visibleRef = useRef<Set<number>>(new Set());
  const [mascotVisible, setMascotVisible] = useState(true);

  const setVisibleIndex = useCallback((i: number, visible: boolean) => {
    const s = visibleRef.current;
    if (visible) s.add(i);
    else s.delete(i);
    setMascotVisible(s.size > 0);
  }, []);

  return (
    <ExperienceCtx.Provider value={{ active, total, mascotVisible, setActive, setVisibleIndex }}>
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
