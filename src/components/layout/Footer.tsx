import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';

/**
 * A quiet coda. The finale carries the call to action; the footer only
 * signs the work and links the essentials.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-30 border-t border-[var(--cine-line)] bg-[#0a0907]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8 lg:px-10">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <Logo />
          <p className="text-[0.8125rem] text-[var(--cine-ink-faint)]">
            © {year} Citron · Crafted by{' '}
            <a
              href={siteConfig.studio.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--cine-ink-dim)] underline-offset-4 transition-colors hover:text-[var(--cine-amber)] hover:underline"
            >
              Inkblot Studio
            </a>
          </p>
        </div>

        <div className="flex items-center gap-6 text-[0.8125rem] text-[var(--cine-ink-faint)]">
          <Link href="/legal/privacy" className="transition-colors hover:text-[var(--cine-ink)]">
            Privacy
          </Link>
          <Link href="/legal/terms" className="transition-colors hover:text-[var(--cine-ink)]">
            Terms
          </Link>
          <Link href="/legal/cookies" className="transition-colors hover:text-[var(--cine-ink)]">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
