import Link from 'next/link';
import { footerNav, siteConfig } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[60rem] -translate-x-1/2 rounded-full opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(217,188,88,0.12) 0%, transparent 70%)',
        }}
      />
      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
              The AI-powered operating system for modern business. One platform.
              One intelligence. Everything your company needs.
            </p>
            <div className="mt-6">
              <Button href="/demo" size="sm">
                Book a Demo
              </Button>
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => {
                  const external = link.href.startsWith('http');
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        {...(external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="text-[0.9375rem] text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 sm:flex-row sm:items-center">
          <p className="text-[0.8125rem] text-[var(--text-muted)]">
            © {year} Citron. Crafted by{' '}
            <a
              href={siteConfig.studio.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] underline-offset-4 transition-colors hover:text-[var(--accent-hover)] hover:underline"
            >
              Inkblot Studio
            </a>
            .
          </p>
          <div className="flex items-center gap-5 text-[0.8125rem] text-[var(--text-muted)]">
            <Link href="/legal/privacy" className="transition-colors hover:text-[var(--text-primary)]">
              Privacy
            </Link>
            <Link href="/legal/terms" className="transition-colors hover:text-[var(--text-primary)]">
              Terms
            </Link>
            <Link href="/legal/cookies" className="transition-colors hover:text-[var(--text-primary)]">
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
