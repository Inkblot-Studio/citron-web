'use client';

import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'relative inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap rounded-[var(--radius-lg)] transition-[background-color,box-shadow,color,border-color] duration-200 ease-[var(--ease-out-expo)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-40 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--accent)] text-[#1d1c19] shadow-[0_2px_16px_-4px_rgba(196,160,48,0.5)] hover:bg-[var(--accent-hover)] hover:shadow-[0_6px_28px_-6px_rgba(196,160,48,0.6)]',
  secondary:
    'bg-transparent text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-strong)]',
  ghost:
    'bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.8125rem]',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-7 text-[1.0625rem]',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

function MagneticWrap({
  children,
  magnetic,
  className,
}: {
  children: ReactNode;
  magnetic: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.3 });

  const active = magnetic && !reduce;

  function onMove(e: React.MouseEvent<HTMLSpanElement>) {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.25);
    y.set(my * 0.35);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={active ? { x: sx, y: sy } : undefined}
      className={cn('inline-flex', className)}
    >
      {children}
    </motion.span>
  );
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  magnetic = true,
  className,
  children,
  ...rest
}: CommonProps & {
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const external = href.startsWith('http');
    const inner = (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    );
    return (
      <MagneticWrap magnetic={magnetic}>{inner}</MagneticWrap>
    );
  }

  return (
    <MagneticWrap magnetic={magnetic}>
      <button className={classes} {...rest}>
        {children}
      </button>
    </MagneticWrap>
  );
}
