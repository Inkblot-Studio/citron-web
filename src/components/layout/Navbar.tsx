'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { NavLink } from '@/components/ui/NavLink';
import { CartButton } from '@/components/cart/CartButton';
import { identityUrl } from '@/lib/site';
import { useSession } from '@/lib/useSession';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { label: 'Product', href: '/#modules' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Build your own', href: '/build' },
];

const EASE = [0.32, 0.72, 0, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useSession();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 16));
  // Pages can load mid-scroll (refresh, anchor) — sync the initial state.
  useEffect(() => setScrolled(scrollY.get() > 16), [scrollY]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5">
      {/* floating island */}
      <div
        className={cn(
          'relative z-10 mx-auto mt-3 flex h-[3.5rem] max-w-[1200px] items-center justify-between gap-3 rounded-full border border-[var(--cine-card-border)] bg-[rgba(255,255,255,0.82)] pl-5 pr-2 backdrop-blur-xl transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] sm:mt-4 sm:pl-6',
          scrolled
            ? 'shadow-[0_1px_2px_rgba(29,28,25,0.04),0_20px_48px_-20px_rgba(29,28,25,0.18)]'
            : 'shadow-[0_1px_2px_rgba(29,28,25,0.03)]'
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label} />
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <CartButton />

          {user ? (
            <Link
              href="/account"
              className="btn btn-ghost hidden h-10 items-center gap-1.5 px-3.5 text-[0.8125rem] font-medium lg:inline-flex"
            >
              <User className="h-3.5 w-3.5" strokeWidth={1.75} />
              Account
            </Link>
          ) : (
            <a
              href={identityUrl('login')}
              className="btn btn-ghost hidden h-10 px-3.5 text-[0.8125rem] font-medium lg:inline-flex"
            >
              Log in
            </a>
          )}

          <a
            href={user ? '/pricing' : identityUrl('signup')}
            className="btn btn-primary hidden h-10 pl-5 pr-1.5 text-[0.8125rem] sm:inline-flex"
          >
            {user ? 'Upgrade' : 'Start free trial'}
            <span className="btn-orb">
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
          </a>

          {/* hamburger — morphs into an X */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-cine transition-colors hover:bg-[rgba(29,28,25,0.05)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span
              className={cn(
                'absolute h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                open ? 'rotate-45' : '-translate-y-[3.5px]'
              )}
            />
            <span
              className={cn(
                'absolute h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                open ? '-rotate-45' : 'translate-y-[3.5px]'
              )}
            />
          </button>
        </div>
      </div>

      {/* mobile overlay — full-screen glass with staggered reveal */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="fixed inset-0 z-0 flex flex-col justify-between bg-[rgba(250,250,247,0.92)] px-6 pb-10 pt-28 backdrop-blur-3xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex flex-col gap-1">
              {[...NAV_LINKS, { label: 'Cart', href: '/cart' }].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.08 + i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={close}
                    className="block py-3 font-display text-[2rem] font-semibold tracking-[-0.02em] text-cine transition-colors hover:text-[var(--cine-amber)]"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.38 }}
            >
              <a
                href={user ? '/pricing' : identityUrl('signup')}
                onClick={close}
                className="btn btn-primary h-13 w-full py-3.5 pl-6 pr-2 text-[0.9375rem]"
              >
                {user ? 'Upgrade' : 'Start free trial'}
                <span className="btn-orb">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </a>
              {user ? (
                <Link href="/account" onClick={close} className="btn btn-secondary h-13 w-full py-3.5 text-[0.9375rem]">
                  Your account
                </Link>
              ) : (
                <a href={identityUrl('login')} className="btn btn-secondary h-13 w-full py-3.5 text-[0.9375rem]">
                  Log in
                </a>
              )}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
