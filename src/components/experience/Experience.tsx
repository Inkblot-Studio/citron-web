'use client';

import { useEffect } from 'react';
import { TOTAL_SCENES } from '@/lib/experience';
import { ExperienceProvider } from './ExperienceContext';
import { MascotGuide } from './MascotGuide';
import { CursorTrail } from './ambient/CursorTrail';
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
  useEffect(() => {
    document.documentElement.classList.add('citron-snap');
    return () => document.documentElement.classList.remove('citron-snap');
  }, []);

  return (
    <ExperienceProvider total={TOTAL_SCENES}>
      <div className="experience-root relative">
        <CursorTrail />
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
