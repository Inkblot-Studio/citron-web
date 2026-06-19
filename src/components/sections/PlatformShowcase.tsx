'use client';

import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealGroup } from '@/components/ui/Reveal';
import { ModuleCard } from './ModuleCard';
import { modules } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

const featured = ['crm', 'sales', 'marketing', 'automations', 'invoicing', 'analytics', 'ai-agents', 'tasks'];

export function PlatformShowcase() {
  const cards = featured
    .map((slug) => modules.find((m) => m.slug === slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <Section id="platform" className="border-t border-[var(--border-subtle)]">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow="The platform"
          title={<>Every module your business needs, built to work as one.</>}
          description="Not a suite of apps bolted together. A single system where every capability shares the same data, the same design, and the same intelligence."
        />
        <Button href="/platform" variant="secondary" className="shrink-0">
          See the full platform
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <RevealGroup
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.06}
      >
        {cards.map((m) => (
          <ModuleCard key={m.slug} module={m} />
        ))}
      </RevealGroup>
    </Section>
  );
}
