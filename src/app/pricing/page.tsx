import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PricingCards } from '@/components/sections/PricingCards';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { Accordion } from '@/components/ui/Accordion';
import { pricingFaq } from '@/lib/pricing-data';
import { CtaBand } from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for the Citron business operating system. Every plan includes the full platform. Start free, scale by team and intelligence.',
  alternates: { canonical: '/pricing' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pricingFaq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        align="center"
        eyebrow="Pricing"
        title={
          <>
            One system. <span className="gradient-citron">One price.</span>
          </>
        }
        description="Replace your entire stack for less than you spend on a fraction of it. Every plan includes the full platform — you scale by team and intelligence, never by feature gates."
      />

      <Section className="pt-4">
        <PricingCards />
      </Section>

      <Section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <SectionHeading
          eyebrow="Compare"
          align="center"
          title={<>Everything, side by side.</>}
          className="mx-auto"
        />
        <div className="mt-12">
          <ComparisonTable />
        </div>
      </Section>

      <Section className="border-t border-[var(--border-subtle)]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title={<>Questions, answered.</>} />
          <Accordion items={pricingFaq} />
        </div>
      </Section>

      <CtaBand
        title="Still deciding?"
        description="Book a demo and we’ll help you map Citron to your team — and your budget."
        secondary={{ label: 'Talk to sales', href: '/contact' }}
      />
    </>
  );
}
