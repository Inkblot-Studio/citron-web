import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { legalDocs, getLegalDoc } from '@/lib/legal';

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.summary,
    alternates: { canonical: `/legal/${doc.slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <section className="relative min-h-screen overflow-hidden pb-24 pt-32 sm:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(120% 70% at 50% -10%, #16130d 0%, #0e0c08 45%, #0a0907 100%)',
        }}
      />
      <div className="mx-auto w-full max-w-[768px] px-5 sm:px-8 lg:px-10">
        <p className="eyebrow-cine text-[0.72rem] font-medium">Legal</p>
        <h1 className="mt-4 text-[2.25rem] font-semibold tracking-[-0.03em] text-cine sm:text-[2.75rem]">
          {doc.title}
        </h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-cine-dim">{doc.summary}</p>
        <p className="mt-6 text-[0.8125rem] text-[var(--cine-ink-faint)]">
          Last updated: {doc.updated}
        </p>

        <div className="mt-12 space-y-10">
          {doc.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-[1.375rem] font-semibold tracking-[-0.01em] text-cine">
                {s.heading}
              </h2>
              <div className="mt-3 space-y-4">
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="text-[1rem] leading-[1.75] text-cine-dim">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
