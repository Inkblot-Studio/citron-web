import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LAUNCHER, PRODUCTS, STAGE_LABEL, productBySlug } from '@/lib/products';
import { ProductMark } from '@/components/products/ProductMark';

type Params = { params: Promise<{ slug: string }> };

const ALL = [...PRODUCTS, LAUNCHER];

export function generateStaticParams() {
  return ALL.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = ALL.find((entry) => entry.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/products/${product.slug}` },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = ALL.find((entry) => entry.slug === slug) ?? productBySlug(slug);
  if (!product) notFound();

  const others = ALL.filter((entry) => entry.slug !== product.slug).slice(0, 3);

  return (
    <article className="pp" style={{ ['--accent' as string]: product.accent }}>
      {/* The hook does the selling; the name is just the label on it. */}
      <header className="pp__hero">
        <ProductMark glyph={product.glyph} accent={product.accent} size={96} />
        <p className="pp__name">
          {product.name}
          <span className="pp__stage">{STAGE_LABEL[product.stage]}</span>
        </p>
        <h1 className="pp__hook">{product.hook}</h1>
        <p className="pp__tagline">{product.tagline}</p>
        <Link href={product.cta.href} className="pp__cta">
          {product.cta.label}
        </Link>
        <p className="pp__platform">{product.platform}</p>
      </header>

      {/* One concrete moment beats three paragraphs of capability. */}
      <section className="pp__moment">
        <p className="pp__momentLabel">The moment it earns its keep</p>
        <p className="pp__momentText">{product.useCase}</p>
      </section>

      <section className="pp__body">
        <p className="pp__summary">{product.summary}</p>
        <ul className="pp__caps">
          {product.capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </section>

      <section className="pp__who">
        <p className="pp__momentLabel">Who it is for</p>
        <p className="pp__whoText">{product.audience}</p>
      </section>

      <footer className="pp__end">
        <h2 className="pp__endTitle">{product.hook}</h2>
        <Link href={product.cta.href} className="pp__cta">
          {product.cta.label}
        </Link>
      </footer>

      <nav className="pp__next" aria-label="Other products">
        {others.map((other) => (
          <Link
            key={other.slug}
            href={`/products/${other.slug}`}
            className="pp__nextItem"
            style={{ ['--accent' as string]: other.accent }}
          >
            <ProductMark glyph={other.glyph} accent={other.accent} size={40} />
            <span>
              <strong>{other.name}</strong>
              <span className="pp__nextLine">{other.tagline}</span>
            </span>
          </Link>
        ))}
      </nav>
    </article>
  );
}
