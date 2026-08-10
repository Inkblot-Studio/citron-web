import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';
import { getDictionary, type Locale } from '@/i18n/dictionaries';

export function LineHero({ locale = 'en' }: { locale?: Locale }) {
  const t = getDictionary(locale).hero;

  return (
    <section className="cw-hero">
      <p className="cw-eyebrow">{t.eyebrow}</p>
      <h1 className="cw-hero__title">
        {t.title} <em>{t.titleEm}</em>
      </h1>
      <p className="cw-hero__lede">{t.lede}</p>

      <div className="cw-hero__actions">
        <Link href="#people" className="cw-btn cw-btn--primary">
          {t.seeLine}
        </Link>
        <Link href="/demo" className="cw-btn">
          {t.talk}
        </Link>
      </div>

      <ul className="cw-swatches" aria-label="Citron">
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
