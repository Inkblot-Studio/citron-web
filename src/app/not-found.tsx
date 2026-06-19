import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Mascot } from '@/components/ui/Logo';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-50 mask-fade-b" />
      <Container className="text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--accent)] shadow-[var(--shadow-md)]">
          <Mascot className="h-8 w-8" animate={false} />
        </div>
        <p className="font-mono text-[0.875rem] text-[var(--accent-hover)]">404</p>
        <h1 className="mt-3 text-[2rem] font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-[2.75rem]">
          This page wandered off.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[1.0625rem] text-[var(--text-secondary)]">
          The page you’re looking for doesn’t exist — but everything your business needs still does.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/">Back to home</Button>
          <Button href="/platform" variant="secondary">
            Explore the platform
          </Button>
        </div>
        <Link href="/contact" className="mt-6 inline-block text-[0.875rem] text-[var(--text-muted)] underline-offset-4 hover:text-[var(--text-secondary)] hover:underline">
          Or get in touch
        </Link>
      </Container>
    </section>
  );
}
