'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { stats } from '@/lib/site';
import { viewportOnce } from '@/lib/motion';

export function StatsStrip() {
  return (
    <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-12">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <dt className="order-2 mt-1.5 text-[0.8125rem] text-[var(--text-muted)]">{s.label}</dt>
              <dd className="order-1 text-[2.25rem] font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-[2.75rem]">
                {s.value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
