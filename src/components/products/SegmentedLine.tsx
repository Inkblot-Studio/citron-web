import Link from 'next/link';
import { PRODUCTS, STAGE_LABEL, type Segment } from '@/lib/products';
import { ProductMark } from './ProductMark';
import { getDictionary, type Locale } from '@/i18n/dictionaries';

function Group({ segment, locale }: { segment: Segment; locale: Locale }) {
  const products = PRODUCTS.filter((product) => product.segments.includes(segment));
  const t = getDictionary(locale)[segment];

  return (
    <section className="cw-line" id={segment}>
      <header className="cw-line__head">
        <p className="cw-eyebrow">{t.eyebrow}</p>
        <h2 className="cw-line__title">{t.title}</h2>
        <p className="cw-line__lede">{t.lede}</p>
      </header>

      <ul className="cw-grid">
        {products.map((product) => (
          <li key={product.slug}>
            <Link
              href={`/products/${product.slug}`}
              className="cw-card"
              style={{ ['--accent' as string]: product.accent }}
            >
              <ProductMark glyph={product.glyph} accent={product.accent} />
              <div className="cw-card__body">
                <div className="cw-card__top">
                  <h3 className="cw-card__name">{product.name}</h3>
                  <span className="cw-card__stage">{STAGE_LABEL[product.stage]}</span>
                </div>
                <p className="cw-card__tagline">{product.tagline}</p>
                <p className="cw-card__who">{product.audience}</p>
                <p className="cw-card__platform">{product.platform}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SegmentedLine({ locale = 'en' }: { locale?: Locale }) {
  return (
    <>
      <Group segment="people" locale={locale} />
      <Group segment="business" locale={locale} />
    </>
  );
}
