'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { OrbitalCore } from './OrbitalCore';
import { EASE_EXPO } from '@/lib/motion';

const headline = ['Your', 'Company.', 'One', 'Intelligence.'];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 lg:pt-32"
    >
      {/* layered background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 80% -10%, var(--hero-to) 0%, var(--hero-from) 55%)',
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-60 mask-fade-b" />
        <div className="absolute left-[8%] top-[20%] h-72 w-72 animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(217,188,88,0.18),transparent_70%)] blur-2xl" />
        <div className="absolute right-[6%] bottom-[12%] h-80 w-80 animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(196,160,48,0.12),transparent_70%)] blur-2xl [animation-delay:-3s]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <motion.div style={{ y: textY, opacity: textOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_EXPO }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-glass)] px-3.5 py-1.5 text-[0.8125rem] font-medium text-[var(--text-secondary)] backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" strokeWidth={2} />
              The AI-native Business Operating System
            </motion.div>

            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.03] tracking-[-0.04em] text-[var(--text-primary)] sm:text-[3.5rem] lg:text-[4rem]">
              {headline.map((word, i) => (
                <span key={word + i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
                  <motion.span
                    className={
                      i >= 2
                        ? 'inline-block gradient-citron'
                        : 'inline-block'
                    }
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.15 + i * 0.08 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.55 }}
              className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-[var(--text-secondary)] sm:text-[1.1875rem]"
            >
              Replace dozens of disconnected tools with one AI-powered operating
              system built for modern business. Sales, marketing, finance, and
              automation — unified under a single intelligence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.68 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="/demo" size="lg">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/platform" variant="secondary" size="lg">
                Explore the Platform
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-6 text-[0.8125rem] text-[var(--text-muted)]"
            >
              No credit card required · 14-day trial · Set up in minutes
            </motion.p>
          </motion.div>

          <motion.div
            style={{ scale: visualScale, y: visualY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE_EXPO, delay: 0.3 }}
            className="relative"
          >
            <OrbitalCore />
          </motion.div>
        </div>
      </Container>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-5.5 items-start justify-center rounded-full border border-[var(--border-default)] p-1">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-[var(--accent)]"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
