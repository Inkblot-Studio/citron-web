'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';

export function CartButton({ onNavigate }: { onNavigate?: () => void }) {
  const { count, ready } = useCart();

  return (
    <Link
      href="/cart"
      onClick={onNavigate}
      aria-label={`Cart${ready && count > 0 ? ` (${count} item${count === 1 ? '' : 's'})` : ''}`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-cine-dim transition-colors duration-300 hover:bg-[rgba(29,28,25,0.05)] hover:text-cine active:scale-95"
    >
      <ShoppingCart className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} />
      {ready && count > 0 && (
        <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--cine-ink)] px-1 text-[0.62rem] font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
