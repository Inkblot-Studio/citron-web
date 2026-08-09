/** What exists today, stated plainly. No roadmap, no promises. */
const WORK = [
  {
    heading: 'Offline-first by default',
    body: 'The POS keeps taking orders when the network drops and reconciles when it returns. Guidance answers most questions without a model at all, and the AI workspace runs on your own machine.',
  },
  {
    heading: 'One ledger, not five integrations',
    body: 'Recipes deplete stock as orders land. Journals post themselves. The guest record the POS writes is the record the CRM reads. Nothing is synced between products because nothing is separate.',
  },
  {
    heading: 'Built for Bulgarian requirements',
    body: 'Fiscal device drivers, VAT ledgers and the Дневник продажби report are part of the ERP rather than an afterthought, because compliance is not a plugin.',
  },
  {
    heading: 'One design system across the line',
    body: 'Every product is drawn from the same tokens, type and motion. They look related because they are, and a person who learns one already knows where things are in the next.',
  },
];

export function BuiltSoFar() {
  return (
    <section className="cw-work">
      <header className="cw-line__head">
        <p className="cw-eyebrow">Where it stands</p>
        <h2 className="cw-line__title">What we have built so far.</h2>
      </header>

      <div className="cw-work__grid">
        {WORK.map((item) => (
          <article key={item.heading} className="cw-work__item">
            <h3 className="cw-work__heading">{item.heading}</h3>
            <p className="cw-work__body">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
