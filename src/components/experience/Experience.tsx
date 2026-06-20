'use client';

import { TOTAL_SCENES } from '@/lib/experience';
import { ExperienceProvider } from './ExperienceContext';
import { MascotGuide } from './MascotGuide';
import {
  HeroSection,
  ProblemSection,
  CrmSection,
  PlatformSection,
  AiSection,
  AutomationsSection,
  ImpactSection,
  WhySection,
  InkblotSection,
} from './sections';

/**
 * Citron — a guided product story in nine chapters. The mascot is the
 * narrator: a fixed companion (desktop) that travels to a dedicated spot in
 * each chapter, never sharing space with the content. Clean, spacious,
 * Apple-level pacing.
 */
export function Experience() {
  return (
    <ExperienceProvider total={TOTAL_SCENES}>
      <div className="experience-root relative">
        <MascotGuide />
        <HeroSection />
        <ProblemSection />
        <CrmSection />
        <PlatformSection />
        <AiSection />
        <AutomationsSection />
        <ImpactSection />
        <WhySection />
        <InkblotSection />
      </div>
    </ExperienceProvider>
  );
}
