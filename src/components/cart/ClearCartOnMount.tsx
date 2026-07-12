'use client';

import { useEffect } from 'react';
import { useCart } from '@/components/cart/CartProvider';

/** Empties the cart after a successful checkout. Renders nothing. */
export function ClearCartOnMount() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
