'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/cn';

/**
 * Minimal, near-invisible chrome. The journey is the interface — the nav only
 * offers the brand, the light/dark switch, and the one destination that
 * matters.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 transition-all duration-300 ease-[var(--ease-out-expo)] sm:px-8',
          scrolled &&
            'mt-2.5 h-14 max-w-[1140px] rounded-full border border-[var(--cine-line)] bg-[var(--cine-card)] px-4 backdrop-blur-xl sm:px-5'
        )}
      >
        <Logo />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/demo"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--cine-amber-bright)] px-4 py-2 text-[0.8125rem] font-semibold text-[#1d1c19] shadow-[0_2px_16px_-6px_rgba(var(--cine-particle),0.7)] transition-all duration-200 hover:brightness-105 sm:px-5"
          >
            Book a Demo
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
