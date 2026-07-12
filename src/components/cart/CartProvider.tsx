'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  cartTotals,
  type BillingCadence,
  type CartItem,
  type CartTotals,
} from '@/lib/catalog';

const STORAGE_KEY = 'citron.cart.v1';

type CartContextValue = {
  items: CartItem[];
  totals: CartTotals;
  count: number;
  /** True once the cart has been read from localStorage (avoids hydration flicker). */
  ready: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, item: CartItem) => void;
  setCadence: (cadence: BillingCadence) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function sanitize(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter((i): i is CartItem => {
    if (!i || typeof i !== 'object' || !('kind' in i)) return false;
    const kind = (i as { kind: unknown }).kind;
    return kind === 'plan' || kind === 'custom' || kind === 'credits';
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(sanitize(JSON.parse(raw)));
    } catch {
      // Corrupt storage — start with an empty cart.
    }
    loaded.current = true;
    setReady(true);
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable (private mode) — cart lives in memory only.
    }
  }, [items]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      // One subscription at a time: a new plan/custom build replaces the old one.
      if (item.kind === 'plan' || item.kind === 'custom') {
        return [item, ...prev.filter((i) => i.kind === 'credits')];
      }
      // Credit packs merge by pack id.
      const existing = prev.findIndex(
        (i) => i.kind === 'credits' && i.packId === item.packId
      );
      if (existing >= 0) {
        return prev.map((i, idx) =>
          idx === existing && i.kind === 'credits'
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateItem = useCallback((index: number, item: CartItem) => {
    setItems((prev) => prev.map((i, idx) => (idx === index ? item : i)));
  }, []);

  const setCadence = useCallback((cadence: BillingCadence) => {
    setItems((prev) =>
      prev.map((i) => (i.kind === 'credits' ? i : { ...i, cadence }))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totals: cartTotals(items),
      count: items.length,
      ready,
      addItem,
      removeItem,
      updateItem,
      setCadence,
      clear,
    }),
    [items, ready, addItem, removeItem, updateItem, setCadence, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}
