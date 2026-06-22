'use client';

import { useEffect } from 'react';
import { TOTAL_SCENES } from '@/lib/experience';
import { ExperienceProvider } from './ExperienceContext';
import { MascotGuide } from './MascotGuide';
import { CursorTrail } from './ambient/CursorTrail';
import { DemoNudge } from './ambient/DemoNudge';
import { Intro } from './Intro';
import {
  HeroSection,
  CrmSection,
  PlatformSection,
  AiSection,
  ImpactSection,
  InkblotSection,
} from './sections';
import {
  TrustBar,
  ProductShowcase,
  StackComparison,
  RoiCalculator,
  Testimonials,
  FinalCta,
} from './homeSections';

/**
 * Citron — a compact guided product story. Act one is the mascot's five-chapter
 * journey (the guide travels chapter to chapter, never overlapping content).
 * Act two is the product website proper — trust, product, comparison, ROI,
 * voices, and a close — each section a distinct experience. The guide steps
 * aside for act two and returns for the finale.
 */
export function Experience() {
  useEffect(() => {
    document.documentElement.classList.add('citron-snap');
    return () => document.documentElement.classList.remove('citron-snap');
  }, []);

  return (
    <ExperienceProvider total={TOTAL_SCENES}>
      <Intro />
      <div className="experience-root relative">
        <CursorTrail />
        <MascotGuide />

        {/* Act one — the mascot's journey (compact, 5 beats) */}
        <HeroSection />
        <CrmSection />
        <PlatformSection />
        <AiSection />
        <ImpactSection />

        {/* Act two — the product, in depth */}
        <TrustBar />
        <ProductShowcase />
        <StackComparison />
        <RoiCalculator />
        <Testimonials />
        <FinalCta />

        {/* Finale — the makers, the guide returns */}
        <InkblotSection />

        <DemoNudge />
      </div>
    </ExperienceProvider>
  );
}
