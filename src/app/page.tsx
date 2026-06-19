import { Hero } from '@/components/sections/Hero';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ShiftSection } from '@/components/sections/ShiftSection';
import { PlatformShowcase } from '@/components/sections/PlatformShowcase';
import { AiLayer } from '@/components/sections/AiLayer';
import { AutomationSection } from '@/components/sections/AutomationSection';
import { SocialProof } from '@/components/sections/SocialProof';
import { PricingPreview } from '@/components/sections/PricingPreview';
import { FinalCta } from '@/components/sections/FinalCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ProblemSection />
      <ShiftSection />
      <PlatformShowcase />
      <AiLayer />
      <AutomationSection />
      <SocialProof />
      <PricingPreview />
      <FinalCta />
    </>
  );
}
