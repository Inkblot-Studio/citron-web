'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';

/**
 * Minimal, near-invisible chrome. The journey is the interface — the nav
 * only ever offers the brand and the one destination that matters.
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
            'mt-2.5 h-13 max-w-[1140px] rounded-full border border-[var(--cine-line)] bg-[rgba(14,12,8,0.6)] px-4 py-2 backdrop-blur-xl sm:px-5'
        )}
      >
        <Logo />

        <Link
          href="/demo"
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--cine-amber)] px-4 py-2 text-[0.8125rem] font-semibold text-[#1d1c19] shadow-[0_2px_16px_-4px_rgba(217,188,88,0.6)] transition-all duration-200 hover:bg-[var(--cine-amber-soft)] sm:px-5"
        >
          Book a Demo
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </header>
  );
}
