import type { Metadata } from 'next';
import { Configurator } from '@/components/commerce/Configurator';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Build your own platform',
  description:
    'Configure Citron for your organization: pick modules, set seats, and see your price instantly. Base platform with unlimited local AI included.',
  alternates: { canonical: '/build' },
};

export default function BuildPage() {
  return (
    <section className="relative min-h-screen pb-28 pt-32 sm:pt-36">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow-pill">Build your own</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-5 text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.04em] text-cine sm:text-[3rem]">
              Exactly the platform <span className="gradient-amber">you need.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-relaxed text-cine-dim">
              Start with the Citron base platform — Command Center, unified data
              model, and unlimited local AI — then add modules per seat. Your
              price updates as you build.
            </p>
          </Reveal>
        </div>

        <div className="mt-14">
          <Configurator />
        </div>
      </div>
    </section>
  );
}
