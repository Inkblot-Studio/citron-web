'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/effects/ThemeProvider';

/** Accessible, animated light/dark switch. 44×44 hit area, icon crossfade. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--cine-line)] text-[var(--cine-ink)] transition-colors duration-200 hover:bg-[var(--cine-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cine-amber-bright)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex"
        >
          {isDark ? (
            <Moon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.8} />
          ) : (
            <Sun className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.8} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
