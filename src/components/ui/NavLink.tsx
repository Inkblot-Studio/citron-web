'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';

type Props = {
  href: string;
  label: string;
  onNavigate?: () => void;
  className?: string;
};

/** Nav link with a slide-flip hover and pressed feedback. */
export function NavLink({ href, label, onNavigate, className }: Props) {
  const pathname = usePathname();
  const isHash = href.startsWith('/#');
  const active =
    href === '/'
      ? pathname === '/'
      : !isHash && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group relative block h-9 overflow-hidden rounded-full px-3.5',
        className
      )}
    >
      <span className="relative flex h-full flex-col transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1/2 group-active:scale-[0.97]">
        <span
          className={cn(
            'flex h-9 items-center text-[0.8125rem] font-medium transition-colors',
            active ? 'text-[var(--cine-amber)]' : 'text-cine-dim group-hover:text-cine'
          )}
        >
          {label}
        </span>
        <span className="flex h-9 items-center text-[0.8125rem] font-semibold text-[var(--cine-amber)]">
          {label}
        </span>
      </span>
    </Link>
  );
}
