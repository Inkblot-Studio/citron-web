'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;
const STORAGE_KEY = 'citron-auth-v1';
const CORRECT = 'admin1234@';

/**
 * Blank password gate — a single centered input on a clean white surface.
 * Stores the authenticated state in sessionStorage so it survives page
 * refreshes within the same tab. Nothing is rendered (and children are
 * mounted) until the correct password is entered.
 */
export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null); // null = checking
  const [unlocked, setUnlocked] = useState(false); // just entered correctly
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check session on mount.
  useEffect(() => {
    let ok = false;
    try {
      ok = sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      /* storage unavailable */
    }
    setAuthed(ok);
  }, []);

  // Focus the input as soon as the gate is visible.
  useEffect(() => {
    if (authed === false && !unlocked) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [authed, unlocked]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (value === CORRECT) {
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* ignore */
      }
      // Mount the experience immediately (the intro paints white underneath)
      // and dissolve the gate over it — no blank gap, no flash of the page.
      setUnlocked(true);
    } else {
      setError(true);
      setValue('');
      inputRef.current?.focus();
      window.setTimeout(() => setError(false), 820);
    }
  };

  // Still checking sessionStorage — hold a plain white cover (matches SSR, so
  // no hydration mismatch) so the page chrome never flashes underneath.
  if (authed === null) {
    return <div aria-hidden className="fixed inset-0 z-[200]" style={{ background: '#ffffff' }} />;
  }

  const passed = authed === true || unlocked;

  return (
    <>
      {/* The experience mounts as soon as access is granted, beneath the gate. */}
      {passed && children}

      <AnimatePresence>
        {!passed && (
          <motion.div
            key="gate"
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: '#ffffff' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {/* subtle ambient wash */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(56% 48% at 50% 46%, rgba(196,160,48,0.07), transparent 68%)',
              }}
            />

            <motion.form
              onSubmit={submit}
              className="relative z-10 flex flex-col items-center gap-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              {/* small citron mark — two bars + smile, inline SVG */}
              <svg
                viewBox="0 0 1100 800"
                aria-hidden
                className="mb-1 h-10 w-14"
                style={{ color: 'var(--cine-amber-bright)' }}
              >
                <rect x="378" y="96" width="120" height="338" rx="10" fill="currentColor" />
                <rect x="602" y="96" width="120" height="338" rx="10" fill="currentColor" />
                <path
                  d="M 200 360 A 350 350 0 0 0 900 360"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={96}
                  strokeLinecap="round"
                />
              </svg>

              <div className="relative">
                <motion.input
                  ref={inputRef}
                  type="password"
                  value={value}
                  onChange={(e) => { setValue(e.target.value); setError(false); }}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  spellCheck={false}
                  className="w-[18rem] rounded-[var(--radius-lg)] border bg-white px-4 py-3 text-[0.9375rem] text-[#1d1c19] outline-none placeholder:text-[#93928a] focus:border-[var(--cine-amber-bright)] sm:w-[22rem]"
                  style={{
                    borderColor: error
                      ? 'rgba(190,62,53,0.6)'
                      : 'var(--border-default)',
                    boxShadow: error
                      ? '0 0 0 3px rgba(190,62,53,0.1)'
                      : 'none',
                    transition: 'border-color 0.18s, box-shadow 0.18s',
                  }}
                  animate={error ? { x: [-6, 6, -5, 5, -3, 3, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <button
                type="submit"
                disabled={value.length === 0}
                className="inline-flex h-[2.75rem] w-[18rem] items-center justify-center rounded-[var(--radius-lg)] bg-[var(--cine-amber-bright)] text-[0.9375rem] font-semibold text-[#1d1c19] shadow-[0_6px_24px_-8px_rgba(196,160,48,0.6)] transition-[filter,opacity] duration-150 hover:brightness-105 disabled:opacity-40 sm:w-[22rem]"
              >
                Continue
              </button>

              <AnimatePresence>
                {error && (
                  <motion.p
                    key="err"
                    className="text-[0.8rem] text-[#be3e35]"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    Incorrect password. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
