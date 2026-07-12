import { Hero } from '@/components/home/Hero';
import {
  AiSection,
  FinalCtaSection,
  HowItWorksSection,
  ModulesSection,
  PricingTeaserSection,
  ProofSection,
} from '@/components/home/sections';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ModulesSection />
      <AiSection />
      <HowItWorksSection />
      <ProofSection />
      <PricingTeaserSection />
      <FinalCtaSection />
    </>
  );
}
