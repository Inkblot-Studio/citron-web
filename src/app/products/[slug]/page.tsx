import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS, STAGE_LABEL, productBySlug } from '@/lib/products';
import { ProductMark } from '@/components/products/ProductMark';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = productBySlug((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({ params }: Params) {
  const product = productBySlug((await params).slug);
  if (!product) notFound();

  return (
    <article className="cw-product" style={{ ['--accent' as string]: product.accent }}>
      <header className="cw-product__head">
        <ProductMark glyph={product.glyph} accent={product.accent} size={88} />
        <div>
          <span className="cw-card__stage">{STAGE_LABEL[product.stage]}</span>
          <h1 className="cw-product__name">{product.name}</h1>
          <p className="cw-product__tagline">{product.tagline}</p>
          <p className="cw-card__platform">{product.platform}</p>
        </div>
      </header>

      <p className="cw-product__summary">{product.summary}</p>

      <ul className="cw-caps">
        {product.capabilities.map((capability) => (
          <li key={capability} className="cw-caps__item">
            {capability}
          </li>
        ))}
      </ul>
    </article>
  );
}
