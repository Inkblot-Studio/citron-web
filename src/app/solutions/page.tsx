import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { SolutionsExplorer } from '@/components/sections/SolutionsExplorer';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Citron adapts to how your team works — startups, agencies, professional services, consultancies, sales teams, and operations teams all run on one intelligent system.',
  alternates: { canonical: '/solutions' },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={
          <>
            Built for how <span className="gradient-citron">your team</span> works.
          </>
        }
        description="One operating system, shaped to your reality. Whether you’re a two-person startup or an operations team running a whole company, Citron meets you where you are."
      >
        <Button href="/demo" size="lg">
          Book a Demo
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button href="/pricing" variant="secondary" size="lg">
          View Pricing
        </Button>
      </PageHero>

      <Section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <SolutionsExplorer />
      </Section>

      <CtaBand />
    </>
  );
}
