import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/site';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/components/cart/CartProvider';
import { SalesAssistant } from '@/components/assistant/SalesAssistant';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'business operating system',
    'AI business software',
    'CRM',
    'AI agents',
    'sales automation',
    'unified business platform',
    'marketing automation',
    'invoicing',
    'accounting software',
    'local AI',
    'private AI for business',
    'Citron',
    'CitronOS',
    'Inkblot Studio',
  ],
  authors: [{ name: siteConfig.studio.name, url: siteConfig.studio.url }],
  creator: siteConfig.studio.name,
  publisher: siteConfig.studio.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon.svg' }],
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: '#fafaf7',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  email: siteConfig.contact.email,
  founder: { '@type': 'Organization', name: siteConfig.studio.name, url: siteConfig.studio.url },
  sameAs: [siteConfig.social.x, siteConfig.social.linkedin, siteConfig.social.github],
};

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: siteConfig.name,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: siteConfig.description,
  offers: [
    { '@type': 'Offer', name: 'Starter', price: '29', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Growth', price: '69', priceCurrency: 'USD' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--cine-amber-bright)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--inkblot-color-neutral-gray-900)]"
        >
          Skip to content
        </a>
        <CartProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <SalesAssistant />
        </CartProvider>
      </body>
    </html>
  );
}
