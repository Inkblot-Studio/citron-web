import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
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
    <>
      <PageHero eyebrow="Legal" title={doc.title} description={doc.summary} />
      <Section className="!pt-6">
        <Container size="prose">
          <p className="text-[0.8125rem] text-[var(--text-muted)]">Last updated: {doc.updated}</p>
          <div className="mt-10 space-y-10">
            {doc.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-[1.375rem] font-semibold tracking-[-0.01em] text-[var(--text-primary)]">
                  {s.heading}
                </h2>
                <div className="mt-3 space-y-4">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-[1rem] leading-[1.75] text-[var(--text-secondary)]">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
