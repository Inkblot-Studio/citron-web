'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { EASE_EXPO } from '@/lib/motion';

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  align = 'left',
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-40 lg:pt-44">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(110% 80% at 80% -20%, var(--hero-to) 0%, var(--bg-primary) 55%)',
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-50 mask-fade-b" />
      </div>
      <Container>
        <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
          >
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.06 }}
            className="mt-5 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--text-primary)] sm:text-[3.25rem] lg:text-[3.75rem]"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.14 }}
              className={
                align === 'center'
                  ? 'mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-[var(--text-secondary)] sm:text-[1.1875rem]'
                  : 'mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-[var(--text-secondary)] sm:text-[1.1875rem]'
              }
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.22 }}
              className={align === 'center' ? 'mt-8 flex flex-wrap justify-center gap-3' : 'mt-8 flex flex-wrap gap-3'}
            >
              {children}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
