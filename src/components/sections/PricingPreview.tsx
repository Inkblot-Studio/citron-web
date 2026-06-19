import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PricingCards } from './PricingCards';

export function PricingPreview() {
  return (
    <Section id="pricing" className="border-t border-[var(--border-subtle)]">
      <SectionHeading
        eyebrow="Pricing"
        align="center"
        title={<>One system. One price. No surprises.</>}
        description="Replace your entire stack for less than you spend on a fraction of it. Every plan includes the full platform — you only scale by team and intelligence."
        className="mx-auto"
      />
      <div className="mt-14">
        <PricingCards />
      </div>
    </Section>
  );
}
