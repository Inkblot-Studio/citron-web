'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Chapter } from '@/lib/experience';
import { cn } from '@/lib/cn';

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

/**
 * Lays out a single chapter as a discovery around the central spine:
 * a scrimmed text column on one side, a bespoke visual on the other.
 * Collapses to a centered stack on mobile. Text reveals on enter.
 */
export function ChapterShell({
  chapter,
  children,
}: {
  chapter: Chapter;
  children: ReactNode;
}) {
  const [before, after] = splitAccent(chapter.title, chapter.accent);
  const textRight = chapter.side === 'right';

  return (
    <section
      id={chapter.id}
      className="relative z-30 flex min-h-[100svh] items-center py-24"
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-10">
        {/* Text column */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'scrim max-w-xl',
            textRight ? 'lg:order-2 lg:justify-self-end' : 'lg:order-1'
          )}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.75rem] tracking-[0.2em] text-[var(--cine-amber)]">
              {chapter.index}
            </span>
            <span className="h-px w-8 bg-[var(--cine-line)]" />
            <span className="eyebrow-cine text-[0.7rem] font-medium">{chapter.eyebrow}</span>
          </div>

          <h2 className="mt-5 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-cine sm:text-[2.6rem]">
            {before}
            <span className="gradient-amber">{after}</span>
          </h2>

          <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-cine-dim">
            {chapter.line}
          </p>
        </motion.div>

        {/* Visual column */}
        <div
          className={cn(
            'relative flex items-center justify-center',
            textRight ? 'lg:order-1' : 'lg:order-2'
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

/** Split a title so the accent phrase can be highlighted. */
function splitAccent(title: string, accent: string): [string, string] {
  const i = title.indexOf(accent);
  if (i === -1) return [title, ''];
  return [title.slice(0, i), title.slice(i)];
}
