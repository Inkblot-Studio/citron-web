import Link from 'next/link';
import { siteConfig, identityUrl } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';

const COLUMNS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', href: '/#modules' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Build your own', href: '/build' },
      { label: 'AI credits', href: '/pricing#credits' },
    ],
  },
  {
    title: 'Get started',
    links: [
      { label: 'Start free trial', href: identityUrl('signup'), external: true },
      { label: 'Log in', href: identityUrl('login'), external: true },
      { label: 'Book a demo', href: '/demo' },
      { label: 'Your account', href: '/account' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Inkblot Studio', href: siteConfig.studio.url, external: true },
      { label: `Sales — ${siteConfig.contact.sales}`, href: `mailto:${siteConfig.contact.sales}`, external: true },
      { label: `Support — ${siteConfig.contact.support}`, href: `mailto:${siteConfig.contact.support}`, external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
      { label: 'Cookies', href: '/legal/cookies' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-30 border-t border-[var(--cine-line)] bg-[var(--cine-bg-1)]">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[16rem] text-[0.8125rem] leading-relaxed text-[var(--cine-ink-faint)]">
              The AI Business Operating System. One platform for CRM, sales,
              finance, and operations — with private, unlimited local AI.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--cine-ink-faint)]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a
                        href={l.href}
                        {...(l.href.startsWith('http')
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="text-[0.8125rem] text-[var(--cine-ink-dim)] transition-colors hover:text-[var(--cine-amber)]"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-[0.8125rem] text-[var(--cine-ink-dim)] transition-colors hover:text-[var(--cine-amber)]"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--cine-line)] pt-6 sm:flex-row">
          <p className="text-[0.8125rem] text-[var(--cine-ink-faint)]">
            © {new Date().getFullYear()} Citron · Crafted by{' '}
            <a
              href={siteConfig.studio.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--cine-ink-dim)] underline-offset-4 transition-colors hover:text-[var(--cine-amber)] hover:underline"
            >
              Inkblot Studio
            </a>
          </p>
          <p className="text-[0.8125rem] text-[var(--cine-ink-faint)]">
            Your data stays yours. Never used to train shared models.
          </p>
        </div>
      </div>
    </footer>
  );
}
