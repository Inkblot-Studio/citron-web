import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArchitectureDiagram } from '@/components/sections/ArchitectureDiagram';
import { ModuleCard } from '@/components/sections/ModuleCard';
import { RevealGroup } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/sections/CtaBand';
import { modules } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Platform',
  description:
    'Explore the Citron platform — CRM, marketing, sales, automation, invoicing, accounting, tasks, analytics, and AI agents, unified into one operating system.',
  alternates: { canonical: '/platform' },
};

const categories = ['Revenue', 'Operations', 'Finance', 'Intelligence'] as const;
const categoryCopy: Record<(typeof categories)[number], string> = {
  Revenue: 'Find, win, and grow every customer relationship.',
  Operations: 'Coordinate the work and the people behind it.',
  Finance: 'Get paid, stay compliant, and know your numbers.',
  Intelligence: 'Turn everything above into insight and action.',
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="The platform"
        title={
          <>
            One operating system.{' '}
            <span className="gradient-citron">Every capability.</span>
          </>
        }
        description="Citron unifies the tools a modern company runs on into a single system — sharing one data core, one design language, and one intelligence layer. This is the whole platform."
      >
        <Button href="/demo" size="lg">
          Book a Demo
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button href="/ai" variant="secondary" size="lg">
          Explore the AI layer
        </Button>
      </PageHero>

      <Section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <SectionHeading
          eyebrow="Architecture"
          align="center"
          title={<>Built like an operating system, not a bundle of apps.</>}
          description="Most platforms integrate separate products. Citron is one system, layered from a shared data core up to a single experience."
          className="mx-auto"
        />
        <div className="mt-14">
          <ArchitectureDiagram />
        </div>
      </Section>

      {categories.map((cat, idx) => {
        const mods = modules.filter((m) => m.category === cat);
        return (
          <Section
            key={cat}
            className={idx % 2 === 1 ? 'border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]' : 'border-t border-[var(--border-subtle)]'}
          >
            <SectionHeading eyebrow={cat} title={categoryCopy[cat]} />
            <RevealGroup
              className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2"
              stagger={0.06}
            >
              {mods.map((m) => (
                <ModuleCard key={m.slug} module={m} large />
              ))}
            </RevealGroup>
          </Section>
        );
      })}

      <CtaBand />
    </>
  );
}
