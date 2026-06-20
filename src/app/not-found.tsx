import Link from 'next/link';
import { Mascot } from '@/components/ui/Logo';

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-32 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(110% 70% at 50% 30%, #16130d 0%, #0e0c08 45%, #0a0907 100%)',
        }}
      />
      <div className="scrim">
        <div
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-[var(--radius-xl)] border border-[var(--cine-line)] bg-[rgba(20,18,13,0.7)] text-[var(--cine-amber)]"
          style={{ boxShadow: '0 0 40px -8px rgba(217,188,88,0.5)' }}
        >
          <Mascot className="h-8 w-8" animate={false} />
        </div>
        <p className="font-mono text-[0.875rem] text-[var(--cine-amber)]">404</p>
        <h1 className="mt-3 text-[2rem] font-semibold tracking-[-0.03em] text-cine sm:text-[2.75rem]">
          This page wandered off.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[1.0625rem] text-cine-dim">
          The page you’re looking for doesn’t exist — but everything your
          business needs still does.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--cine-amber)] px-7 text-[0.9375rem] font-semibold text-[#1d1c19] transition-colors hover:bg-[var(--cine-amber-soft)]"
          >
            Back to the journey
          </Link>
          <Link
            href="/demo"
            className="inline-flex h-12 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--cine-line)] px-7 text-[0.9375rem] font-medium text-cine transition-colors hover:border-[var(--cine-amber)]"
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
