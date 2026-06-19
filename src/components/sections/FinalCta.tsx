'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Mascot } from '@/components/ui/Logo';

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ['20%', reduce ? '20%' : '-20%']);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-[var(--bg-inverse)] py-28 text-[var(--text-inverse)] sm:py-36"
    >
      {/* animated background */}
      <motion.div
        aria-hidden
        style={{ y: glowY, scale: glowScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(217,188,88,0.30),rgba(196,160,48,0.08)_45%,transparent_70%)] blur-2xl" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-[0.15]" />

      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-[var(--radius-xl)] border border-[var(--accent)]/30 bg-white/5 text-[var(--accent-bright)] backdrop-blur-sm"
        >
          <Mascot className="h-8 w-8" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[3.25rem]"
        >
          Run your entire business
          <br />
          from <span className="gradient-citron">one intelligence</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-[#c7c5bd]"
        >
          See Citron in action with a personalized walkthrough. We’ll map it to
          how your team actually works.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button href="/demo" size="lg">
            Book a Demo
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            href="/pricing"
            variant="secondary"
            size="lg"
            className="border-white/20 text-[var(--text-inverse)] hover:bg-white/10"
          >
            View Pricing
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
