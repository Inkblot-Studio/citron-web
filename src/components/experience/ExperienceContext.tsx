'use client';

import {
  createContext,
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
  setActive: (i: number) => void;
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
  return (
    <ExperienceCtx.Provider value={{ active, total, setActive }}>
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
 * Registers a scene: when its element is centered in the viewport it becomes
 * the active scene, which the mascot and trunk respond to. Returns a ref to
 * attach to the scene's root element.
 */
export function useScene<T extends Element = HTMLDivElement>(
  index: number
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.55, margin: '-20% 0px -20% 0px' });
  const { setActive } = useExperience();

  useEffect(() => {
    if (inView) setActive(index);
  }, [inView, index, setActive]);

  return ref;
}
