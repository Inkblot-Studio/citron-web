import type { Metadata } from 'next';
import Link from 'next/link';
import { DISCOUNTS, PLANS } from '@/lib/plans';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'One subscription opens every Citron app. The personal apps on their own, or the business tools with the personal ones included. Rates published before anyone is asked to pay.',
  alternates: { canonical: '/pricing' },
};

const PRICE_TBD = 'TBD';

const SEGMENTS = [
  {
    audience: 'people' as const,
    eyebrow: 'For people',
    title: 'The apps you use yourself.',
    lede: 'Citron and Citron Guide — the two tools for the person at the screen. For anyone whose work is their own, or who simply is not willing to send it to somebody else’s server.',
  },
  {
    audience: 'business' as const,
    eyebrow: 'For business',
    title: 'The tools the business runs on — and the personal ones too.',
    lede: 'ERP, POS and CRM together, with Citron and Citron Guide included for everyone on the team. Nothing bought twice.',
  },
];

export default function PricingPage() {
  return (
    <article className="pr">
      <header className="pr__head">
        <p className="cw-eyebrow">Pricing</p>
        <h1 className="pr__title">One subscription. Every app.</h1>
        <p className="pr__lede">
          No per-app licences. Nothing withheld for a higher tier. No meter running while you work —
          the models run on your own hardware, so there is nothing to count.
        </p>
      </header>

      {SEGMENTS.map((segment) => {
        const plan = PLANS.find((entry) => entry.audience === segment.audience);
        if (!plan) return null;

        return (
          <section key={segment.audience} className="pr__seg" id={segment.audience}>
            <div className="pr__segHead">
              <p className="cw-eyebrow">{segment.eyebrow}</p>
              <h2 className="pr__segTitle">{segment.title}</h2>
              <p className="pr__segLede">{segment.lede}</p>
            </div>

            <div className="pr__plan">
              <div className="pr__planTop">
                <h3 className="pr__planName">{plan.name}</h3>
                <p className="pr__planWho">{plan.who}</p>
                <p className="pr__price">
                  <span className="pr__priceValue">{PRICE_TBD}</span>
                  <span className="pr__priceUnit">{plan.unit}</span>
                </p>
                <Link
                  href={segment.audience === 'people' ? '/download' : '/demo'}
                  className="pr__cta"
                >
                  {segment.audience === 'people' ? 'Download the launcher' : 'Talk to us'}
                </Link>
              </div>

              <ul className="pr__includes">
                {plan.includes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            <dl className="pr__faq">
              {plan.answers.map((entry) => (
                <div key={entry.question} className="pr__faqItem">
                  <dt>{entry.question}</dt>
                  <dd>{entry.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        );
      })}

      <section className="pr__disc">
        <h2 className="pr__segTitle">Who pays less</h2>
        <p className="pr__segLede">
          Learning on it, teaching on it, or just starting out — none of those should be the
          expensive case.
        </p>
        <ul className="pr__discGrid">
          {DISCOUNTS.map((discount) => (
            <li key={discount.name} className="pr__discItem">
              <p className="pr__discName">
                {discount.name}
                <span className="pr__discRate">{PRICE_TBD}</span>
              </p>
              <p className="pr__discWho">{discount.who}</p>
              <p className="pr__discProof">{discount.proof}</p>
            </li>
          ))}
        </ul>
      </section>

      <footer className="pr__note">
        <p>
          <strong>Rates are not set yet.</strong> Every figure on this page reads TBD because we
          would rather show you the shape of it than a number we might change. They will be
          published in full before anyone is asked to pay.
        </p>
        <Link href="/demo" className="pr__noteLink">
          Leave a number and we will tell you when →
        </Link>
      </footer>
    </article>
  );
}
