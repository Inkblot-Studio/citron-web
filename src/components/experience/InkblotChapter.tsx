'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useScene } from './ExperienceContext';
import { INKBLOT_INDEX } from '@/lib/experience';
import { siteConfig } from '@/lib/site';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The origin. The trunk reaches its source and the journey reveals its
 * maker — not a footer, but a final discovery: Citron was created by Inkblot
 * Studio. Quiet, premium, and signed.
 */
export function InkblotChapter() {
  const ref = useScene<HTMLElement>(INKBLOT_INDEX);
  const year = new Date().getFullYear();

  return (
    <section
      ref={ref}
      className="relative z-30 flex min-h-[100svh] flex-col items-center justify-center py-24 text-center"
    >
      {/* origin glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--cine-particle),0.16), transparent 65%)',
        }}
      />

      <motion.div
        className="scrim flex flex-col items-center px-6"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <span className="eyebrow-cine text-[0.7rem] font-medium">The origin</span>

        <h2 className="mt-5 text-[2rem] font-semibold tracking-[-0.03em] text-cine sm:text-[2.75rem]">
          Created by <span className="gradient-amber">Inkblot Studio</span>
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-cine-dim">
          A product studio building calm, intelligent software for modern
          business. We design the systems companies actually want to use — and
          Citron is the one we believe in most.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.875rem] text-cine-dim">
          <span>Design-led</span>
          <span aria-hidden className="text-[var(--cine-line)]">·</span>
          <span>AI-native</span>
          <span aria-hidden className="text-[var(--cine-line)]">·</span>
          <span>Built to last</span>
        </div>

        <Link
          href={siteConfig.studio.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-9 inline-flex items-center gap-2 rounded-full border border-[var(--cine-line)] bg-[var(--cine-card)] px-6 py-3 text-[0.9375rem] font-medium text-cine backdrop-blur-md transition-colors duration-200 hover:border-[var(--cine-amber-bright)] hover:text-[var(--cine-amber)]"
        >
          Visit Inkblot Studio
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        <div className="mt-12 flex flex-col items-center gap-4 text-[0.8125rem] text-cine-faint">
          <div className="flex items-center gap-6">
            <Link href="/legal/privacy" className="transition-colors hover:text-cine">
              Privacy
            </Link>
            <Link href="/legal/terms" className="transition-colors hover:text-cine">
              Terms
            </Link>
            <Link href="/legal/cookies" className="transition-colors hover:text-cine">
              Cookies
            </Link>
          </div>
          <p>© {year} Citron · Crafted by Inkblot Studio</p>
        </div>
      </motion.div>
    </section>
  );
}
