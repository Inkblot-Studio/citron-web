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
  InkblotSection,
} from './sections';
import {
  TrustBar,
  RoiCalculator,
  Testimonials,
  FinalCta,
} from './homeSections';

/**
 * Citron — a compact guided product story. Act one is the mascot's three-chapter
 * journey (hero, CRM, platform+AI) — the guide roams the hero, then travels
 * chapter to chapter, never overlapping content. Act two is the product website
 * proper — trust & impact, product, comparison, ROI, voices, and a close. The
 * guide steps aside for act two and returns for the finale.
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

        {/* Act one — the mascot's journey (compact, 3 beats) */}
        <HeroSection />
        <CrmSection />
        <PlatformSection />

        {/* Act two — the product, in depth */}
        <TrustBar />
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
