import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function CtaBand({
  title = 'Ready to see Citron in action?',
  description = 'Book a personalized walkthrough mapped to how your team works — or start your free trial today.',
  primary = { label: 'Book a Demo', href: '/demo' },
  secondary = { label: 'View Pricing', href: '/pricing' },
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-3xl)] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-6 py-14 text-center sm:px-10 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,188,88,0.16),transparent_70%)] blur-2xl"
          />
          <div className="relative">
            <Reveal>
              <h2 className="mx-auto max-w-2xl text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[2.75rem]">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mx-auto mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-[var(--text-secondary)]">
                {description}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href={primary.href} size="lg">
                  {primary.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={secondary.href} variant="secondary" size="lg">
                  {secondary.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
