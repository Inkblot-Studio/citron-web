import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Build your own',
  description:
    'Citron One already includes every app. Build your own is the work beyond it — software built on the Citron platform for how your business actually runs.',
  alternates: { canonical: '/build' },
};

const WORK = [
  {
    heading: 'On top of the platform, not beside it',
    body: 'Whatever we build for you sits on the same ledger, the same guest record and the same design system as the rest of the line. It is not an integration that has to be kept in step — it is part of the system, and it stays working when the products move.',
  },
  {
    heading: 'For the part nobody else has',
    body: 'Every business has one process that no product covers, because it is the thing that makes it different. A production kitchen with its own yield maths. A membership that works nothing like a loyalty card. That is what this is for.',
  },
  {
    heading: 'Built by the people who built the products',
    body: 'The same studio, the same standards, the same code. Not a partner network, not an outsourced delivery arm — the people who wrote the platform are the ones extending it.',
  },
  {
    heading: 'It stays yours',
    body: 'Run it on your own hardware, on your own terms. If we ever part ways, the data and the deployment are already where you can reach them.',
  },
];

export default function BuildPage() {
  return (
    <article className="cw-build">
      <header className="cw-line__head">
        <p className="cw-eyebrow">Build your own</p>
        <h1 className="cw-build__title">
          The apps are included. This is for what they <em>do not</em> cover.
        </h1>
        <p className="cw-line__lede">
          Citron One already opens every app we make, so there is nothing to configure and no
          modules to pick. Build your own is the work beyond the products — software written for the
          one process your business does differently, on the platform the rest of it already runs
          on.
        </p>
      </header>

      <div className="cw-work__grid">
        {WORK.map((item) => (
          <section key={item.heading} className="cw-work__item">
            <h2 className="cw-work__heading">{item.heading}</h2>
            <p className="cw-work__body">{item.body}</p>
          </section>
        ))}
      </div>

      <footer className="cw-build__foot">
        <h2 className="cw-build__cta">Tell us the part that does not fit.</h2>
        <p className="cw-line__lede">
          Scoped and quoted per project, after a conversation about what you actually do. We would
          rather turn down work we cannot do well than sell you a configuration screen.
        </p>
        <Link href="/demo" className="cw-btn cw-btn--primary">
          Start that conversation
        </Link>
      </footer>
    </article>
  );
}
