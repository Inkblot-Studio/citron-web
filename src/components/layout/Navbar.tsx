'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { NavLink } from '@/components/ui/NavLink';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-3 px-4 transition-all duration-300 ease-[var(--ease-out-expo)] sm:px-6 md:px-8',
          scrolled &&
            'mt-2.5 h-14 max-w-[1140px] rounded-full border border-[var(--cine-line)] bg-[var(--cine-card)] px-3 backdrop-blur-xl sm:px-4 md:px-5'
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/demo"
            className="group hidden items-center gap-2 rounded-full bg-[var(--cine-amber-bright)] px-4 py-2 text-[0.8125rem] font-semibold text-[#1d1c19] shadow-[0_2px_16px_-6px_rgba(var(--cine-particle),0.7)] transition-all duration-200 hover:brightness-105 active:scale-[0.97] sm:inline-flex sm:px-5"
          >
            Book a Demo
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--cine-line)] text-cine transition-colors hover:border-[var(--cine-amber-bright)] hover:text-[var(--cine-amber)] active:scale-95 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-[rgba(11,10,8,0.45)] backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              className="fixed inset-x-4 top-[4.5rem] z-50 overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--cine-line)] bg-[var(--cine-card)] p-4 shadow-[var(--shadow-xl)] backdrop-blur-xl md:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((l) => (
                  <NavLink
                    key={l.href}
                    href={l.href}
                    label={l.label}
                    onNavigate={close}
                    className="h-11 px-4"
                  />
                ))}
              </div>
              <Link
                href="/demo"
                onClick={close}
                className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--cine-amber-bright)] text-[0.9rem] font-semibold text-[#1d1c19] transition active:scale-[0.98]"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
