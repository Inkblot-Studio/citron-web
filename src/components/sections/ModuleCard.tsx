'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import type { Module } from '@/lib/site';
import { cn } from '@/lib/cn';

export function ModuleCard({
  module,
  className,
  large = false,
}: {
  module: Module;
  className?: string;
  large?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    ref.current.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 shadow-[var(--shadow-xs)] transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-[var(--border-default)] hover:shadow-[var(--shadow-lg)]',
        large && 'sm:p-8',
        className
      )}
    >
      {/* spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(360px circle at var(--mx,50%) var(--my,0%), rgba(217,188,88,0.10), transparent 65%)',
        }}
      />
      <div className="relative flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] text-[var(--accent-hover)] transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
          <Icon name={module.icon} className="h-5 w-5" />
        </span>
        <span className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
          {module.category}
        </span>
      </div>

      <h3 className="relative mt-5 text-[1.25rem] font-semibold tracking-[-0.01em] text-[var(--text-primary)]">
        {module.name}
      </h3>
      <p className="relative mt-1 text-[0.9375rem] font-medium text-[var(--accent-hover)]">
        {module.tagline}
      </p>
      <p className="relative mt-3 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
        {module.description}
      </p>

      {large && (
        <ul className="relative mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {module.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-[0.8125rem] text-[var(--text-secondary)]">
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              {f}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
