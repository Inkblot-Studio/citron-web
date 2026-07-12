import type { Metadata } from 'next';
import { CartView } from '@/components/cart/CartView';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Review your Citron plan, modules, and AI credit packs before checkout.',
  alternates: { canonical: '/cart' },
  robots: { index: false },
};

export default function CartPage() {
  return (
    <section className="mx-auto w-full max-w-[1120px] px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-10">
      <CartView />
    </section>
  );
}
