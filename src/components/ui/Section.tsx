import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

export function Section({
  children,
  className,
  containerClassName,
  size = 'page',
  id,
  bleed = false,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  size?: 'prose' | 'page' | 'wide';
  id?: string;
  bleed?: boolean;
}) {
  return (
    <section id={id} className={cn('relative py-20 sm:py-24 lg:py-32', className)}>
      {bleed ? children : <Container size={size} className={containerClassName}>{children}</Container>}
    </section>
  );
}
