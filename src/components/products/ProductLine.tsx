import Link from 'next/link';
import { PRODUCTS, STAGE_LABEL } from '@/lib/products';
import { ProductMark } from './ProductMark';

export function ProductLine() {
  return (
    <section className="cw-line" id="products">
      <header className="cw-line__head">
        <p className="cw-eyebrow">The Citron line</p>
        <h2 className="cw-line__title">Five products, one ledger underneath.</h2>
        <p className="cw-line__lede">
          Each one is useful on its own and worth more beside the others. They share a guest
          record, a stock ledger and a design system, so the till and the accounts never disagree
          about what happened.
        </p>
      </header>

      <ul className="cw-grid">
        {PRODUCTS.map((product) => (
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
                <p className="cw-card__platform">{product.platform}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
