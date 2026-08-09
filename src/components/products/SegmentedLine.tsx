import Link from 'next/link';
import { PRODUCTS, SEGMENT_LABEL, STAGE_LABEL, type Segment } from '@/lib/products';
import { ProductMark } from './ProductMark';

const INTRO: Record<Segment, string> = {
  people:
    'Two apps for the person in front of the screen. One keeps your work on your own machine; the other makes any software easier to use than it was designed to be.',
  business:
    'The system a hospitality business runs on. One ledger underneath the till, the stock and the guest, so nothing has to be reconciled by hand at the end of the month.',
};

function Group({ segment }: { segment: Segment }) {
  const products = PRODUCTS.filter((product) => product.segments.includes(segment));

  return (
    <section className="cw-line" id={segment}>
      <header className="cw-line__head">
        <p className="cw-eyebrow">{SEGMENT_LABEL[segment]}</p>
        <h2 className="cw-line__title">
          {segment === 'people' ? 'For the person using the computer.' : 'For the business running on it.'}
        </h2>
        <p className="cw-line__lede">{INTRO[segment]}</p>
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

export function SegmentedLine() {
  return (
    <>
      <Group segment="people" />
      <Group segment="business" />
    </>
  );
}
