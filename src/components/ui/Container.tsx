import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Container({
  children,
  className,
  size = 'page',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  size?: 'prose' | 'page' | 'wide';
  as?: ElementType;
}) {
  const max = {
    prose: 'max-w-[768px]',
    page: 'max-w-[1200px]',
    wide: 'max-w-[1440px]',
  }[size];

  return (
    <Tag className={cn('mx-auto w-full px-5 sm:px-8 lg:px-10', max, className)}>
      {children}
    </Tag>
  );
}
