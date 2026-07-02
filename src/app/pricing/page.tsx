import type { Metadata } from 'next';
import { PricingView } from '@/components/sections/PricingView';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for Citron, the Business Operating System. Start with the CRM or run your whole company on one platform. Plans for teams of every size.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <section className="relative min-h-screen overflow-hidden pb-28 pt-32 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{ background: 'var(--cine-bg-0)' }}
        />
        <div
          className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(var(--cine-particle),0.12), transparent 65%)',
          }}
        />
      </div>
      <PricingView />
    </section>
  );
}
