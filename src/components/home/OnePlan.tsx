import Link from 'next/link';
import { DISCOUNTS, PLANS } from '@/lib/plans';

/** One subscription, every app — and who pays less for it. */
export function OnePlan() {
  return (
    <section className="cw-plans" id="citron-one">
      <header className="cw-line__head">
        <p className="cw-eyebrow">Citron One</p>
        <h2 className="cw-line__title">One subscription. Every app.</h2>
        <p className="cw-line__lede">
          Not a menu to assemble. One subscription opens everything we make for you, including the
          apps we have not shipped yet. No per-app licences, no feature withheld for a higher tier,
          and no meter running while you work — the models run on your own hardware.
        </p>
      </header>

      <div className="cw-plans__grid">
        {PLANS.map((plan) => (
          <article
            key={plan.slug}
            className={plan.featured ? 'cw-plan cw-plan--featured' : 'cw-plan'}
          >
            <h3 className="cw-plan__name">{plan.name}</h3>
            <p className="cw-plan__who">{plan.who}</p>
            <ul className="cw-plan__includes">
              {plan.includes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="cw-plan__unit">{plan.unit}</p>
          </article>
        ))}
      </div>

      <div className="cw-disc">
        <h3 className="cw-disc__title">Who pays less</h3>
        <p className="cw-disc__lede">
          Learning on it, teaching on it, or just starting out — none of those should be the
          expensive case.
        </p>
        <ul className="cw-disc__grid">
          {DISCOUNTS.map((discount) => (
            <li key={discount.name} className="cw-disc__item">
              <h4 className="cw-disc__name">{discount.name}</h4>
              <p className="cw-disc__who">{discount.who}</p>
              <p className="cw-disc__proof">{discount.proof}</p>
            </li>
          ))}
        </ul>
      </div>

      <p className="cw-plans__note">
        Rates are being set now and will be published before anyone is asked to pay. If you want to
        be told when they are,{' '}
        <Link href="/demo" className="cw-plans__link">
          leave us a line
        </Link>
        .
      </p>
    </section>
  );
}
