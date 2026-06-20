'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, Sparkles, Layers } from 'lucide-react';
import { useScene } from './ExperienceContext';
import { INKBLOT_INDEX } from '@/lib/experience';
import { siteConfig } from '@/lib/site';

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } };

const pillars = [
  {
    icon: Sparkles,
    title: 'AI-native by default',
    body: 'Every product we build starts with intelligence woven through it — not bolted on.',
  },
  {
    icon: Layers,
    title: 'Ambitious software',
    body: 'We build complete systems, not features. Citron is our most ambitious yet.',
  },
  {
    icon: Compass,
    title: 'Design-led, built to last',
    body: 'Calm, considered interfaces companies actually want to live inside every day.',
  },
];

/**
 * The origin. The trunk reaches its source and the journey reveals its maker —
 * not a footer, but a final discovery: Citron is built by Inkblot Studio. A
 * short story, three pillars, an invitation, then a quiet signature.
 */
export function InkblotChapter() {
  const ref = useScene<HTMLElement>(INKBLOT_INDEX);
  const year = new Date().getFullYear();

  return (
    <section
      ref={ref}
      className="relative z-30 flex min-h-[120svh] flex-col items-center justify-center py-28 text-center"
    >
      {/* origin glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--cine-particle),0.16), transparent 65%)',
        }}
      />

      <motion.div
        className="scrim flex flex-col items-center px-6"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <span className="eyebrow-cine text-[0.7rem] font-medium">The origin</span>

        <h2 className="mt-5 max-w-2xl text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-cine sm:text-[2.9rem]">
          Citron is built by <span className="gradient-amber">Inkblot Studio</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-cine-dim">
          Every great product has a source. Citron’s is a small studio with a
          large ambition: to build the intelligent software modern companies
          actually deserve — and to sweat every detail until it feels alive.
        </p>
      </motion.div>

      {/* pillars */}
      <div className="mt-14 grid w-full max-w-[1000px] gap-4 px-6 sm:grid-cols-3">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
            className="flex flex-col items-center rounded-[var(--radius-xl)] cine-card p-6 text-center"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(var(--cine-particle),0.14)] text-[var(--cine-amber)]">
              <p.icon className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <h3 className="mt-4 text-[1rem] font-semibold text-cine">{p.title}</h3>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-cine-dim">{p.body}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
      >
        <Link
          href={siteConfig.studio.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-12 inline-flex items-center gap-2 rounded-full border border-[var(--cine-line)] bg-[var(--cine-card)] px-7 py-3.5 text-[0.9375rem] font-semibold text-cine backdrop-blur-md transition-colors duration-200 hover:border-[var(--cine-amber-bright)] hover:text-[var(--cine-amber)]"
        >
          Explore Inkblot Studio
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        <div className="mt-14 flex flex-col items-center gap-4 text-[0.8125rem] text-cine-faint">
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
