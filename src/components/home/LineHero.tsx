import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';

/** Enterprise-plain: what this is, who it is for, and the line at a glance. */
export function LineHero() {
  return (
    <section className="cw-hero">
      <p className="cw-eyebrow">Inkblot Studio</p>
      <h1 className="cw-hero__title">
        Software that runs a hospitality business, <em>end to end</em>.
      </h1>
      <p className="cw-hero__lede">
        A local-first AI workspace, on-screen guidance, and the ERP, POS and CRM underneath.
        Built as one line so the till, the stock and the accounts agree — and built to run on your
        own hardware, because the data belongs to the business that made it.
      </p>

      <div className="cw-hero__actions">
        <Link href="#products" className="cw-btn cw-btn--primary">
          See the line
        </Link>
        <Link href="/demo" className="cw-btn">
          Book a walkthrough
        </Link>
      </div>

      <ul className="cw-swatches" aria-label="The Citron line">
        {PRODUCTS.map((product) => (
          <li key={product.slug} className="cw-swatch">
            <span className="cw-swatch__dot" style={{ background: product.accent }} />
            {product.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
