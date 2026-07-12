import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { identityUrl } from '@/lib/site';
import { launchOffer } from '@/lib/catalog';
import { stats } from '@/lib/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
      {/* calm backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(110% 70% at 50% -10%, var(--cine-void-from) 0%, var(--cine-void-mid) 50%, var(--cine-void-to) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(var(--cine-particle),0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--cine-particle),0.05) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(70% 55% at 50% 20%, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(70% 55% at 50% 20%, black, transparent 80%)',
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Link href="/pricing" className="eyebrow-pill transition-colors hover:border-[rgba(160,125,28,0.5)]">
              <Sparkles className="h-3 w-3" strokeWidth={1.75} />
              {launchOffer.headline}
            </Link>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-7 text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.045em] text-cine sm:text-[4rem]">
              Run your whole company on <span className="gradient-amber">one system.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-cine-dim sm:text-[1.125rem]">
              Citron replaces your CRM, sales, marketing, finance, and operations stack
              with a single AI-powered platform — unlimited private local AI included,
              frontier models from Anthropic, OpenAI, and Google on tap.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={identityUrl('signup')}
                className="btn btn-primary h-[3.25rem] pl-7 pr-2 text-[0.9875rem]"
              >
                Start free trial
                <span className="btn-orb">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </a>
              <Link href="/demo" className="btn btn-secondary h-[3.25rem] px-7 text-[0.9875rem]">
                Book a demo
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-6 text-[0.8125rem] text-cine-faint">
              14-day free trial · No credit card required · Live in under a day
            </p>
          </Reveal>
        </div>

        {/* product shot — double-bezel frame */}
        <Reveal delay={0.2}>
          <div className="relative mx-auto mt-20 max-w-[980px]">
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 opacity-70"
              style={{
                background:
                  'radial-gradient(70% 70% at 50% 30%, rgba(var(--cine-particle),0.14), transparent 70%)',
              }}
            />
            <div className="bezel shadow-[0_40px_80px_-40px_rgba(29,28,25,0.25)]">
              <div className="overflow-hidden border border-[var(--cine-card-border)] bg-white">
                <Image
                  src="/shots/shot-dashboard.png"
                  alt="The Citron Command Center: revenue, pipeline, cash, and tasks in one live console"
                  width={1536}
                  height={1024}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* stats */}
        <div className="mx-auto mt-14 grid max-w-[880px] grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="text-center">
                <div className="text-[1.9rem] font-semibold tracking-[-0.03em] text-cine">{s.value}</div>
                <div className="mt-1 text-[0.8125rem] text-cine-faint">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
