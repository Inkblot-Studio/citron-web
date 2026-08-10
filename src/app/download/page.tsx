import type { Metadata } from 'next';
import Link from 'next/link';
import { LAUNCHER, PRODUCTS } from '@/lib/products';
import { ProductMark } from '@/components/products/ProductMark';

export const metadata: Metadata = {
  title: 'Download',
  description:
    'Install the Inkblot Launcher and every app you have access to is a click away. Free, for macOS and Windows.',
  alternates: { canonical: '/download' },
};

const DOWNLOADABLE = PRODUCTS.filter((product) => product.stage === 'shipping');

export default function DownloadPage() {
  return (
    <article className="pp" style={{ ['--accent' as string]: LAUNCHER.accent }}>
      <header className="pp__hero">
        <ProductMark glyph={LAUNCHER.glyph} accent="#C9A227" size={96} />
        <p className="pp__name">{LAUNCHER.name}</p>
        <h1 className="pp__hook">{LAUNCHER.hook}</h1>
        <p className="pp__tagline">{LAUNCHER.summary}</p>
        <Link href="https://inkblotstudio.eu" className="pp__cta">
          Download for macOS
        </Link>
        <p className="pp__platform">{LAUNCHER.platform} · free</p>
      </header>

      <section className="pp__moment">
        <p className="pp__momentLabel">What you get with it</p>
        <p className="pp__momentText">{LAUNCHER.useCase}</p>
      </section>

      <section className="pp__body">
        <p className="pp__summary">
          The launcher is how the apps reach you. It installs them, keeps them current, and shows
          what you already have — so a new machine or a new colleague is one install and a sign-in,
          not an afternoon.
        </p>
        <ul className="pp__caps">
          {LAUNCHER.capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </section>

      <section className="pp__who">
        <p className="pp__momentLabel">Ships inside it today</p>
        <div className="pp__next">
          {DOWNLOADABLE.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="pp__nextItem"
              style={{ ['--accent' as string]: product.accent }}
            >
              <ProductMark glyph={product.glyph} accent={product.accent} size={40} />
              <span>
                <strong>{product.name}</strong>
                <span className="pp__nextLine">{product.tagline}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
