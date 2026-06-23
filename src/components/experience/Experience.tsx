'use client';

import { useEffect, useState } from 'react';
import { TOTAL_SCENES } from '@/lib/experience';
import { ExperienceProvider, useExperience } from './ExperienceContext';
import { MascotGuide } from './MascotGuide';
import { CursorTrail } from './ambient/CursorTrail';
import { DemoNudge } from './ambient/DemoNudge';
import { Intro, introWillPlay } from './Intro';
import {
  HeroSection,
  CommandSection,
  PlatformSection,
  FinaleSection,
} from './sections';
import {
  BentoSection,
  HorizontalShowcase,
  ProofSection,
  Testimonials,
} from './homeSections';

/**
 * Citron — a guided product story with the mascot as protagonist.
 *
 * Act one is the mascot's journey: it opens the hero by sweeping across the
 * headline and lighting it up word by word, then travels chapter to chapter
 * (Command, Platform), never overlapping the copy. Act two is the product in
 * depth — a bento of every function, a horizontal reel of product surfaces, the
 * numbers that rise as you scroll, and the voices of teams who switched. The
 * guide steps aside for act two and returns for the finale.
 */
export function Experience() {
  return (
    <ExperienceProvider total={TOTAL_SCENES}>
      <ExperienceInner />
    </ExperienceProvider>
  );
}

function ExperienceInner() {
  const { playHeroReveal } = useExperience();
  // While the intro plays, hold the hero mascot guide still at its anchor so the
  // intro can hand the mascot off to the exact same spot — no jump, no roam.
  const [introActive, setIntroActive] = useState(introWillPlay);

  useEffect(() => {
    document.documentElement.classList.add('citron-snap');
    return () => document.documentElement.classList.remove('citron-snap');
  }, []);

  // Once the intro hands off (or immediately, if it never plays), start the
  // mascot's headline sweep and the synchronized word-by-word reveal.
  useEffect(() => {
    if (!introActive) playHeroReveal();
  }, [introActive, playHeroReveal]);

  return (
    <>
      <Intro onDone={() => setIntroActive(false)} />
      <div className="experience-root relative">
        <CursorTrail />
        <MascotGuide introHold={introActive} />

        {/* Act one — the mascot's journey */}
        <HeroSection />
        <CommandSection />
        <PlatformSection />

        {/* Act two — the product, in depth (the guide steps aside) */}
        <BentoSection />
        <HorizontalShowcase />
        <ProofSection />
        <Testimonials />

        {/* Finale — the guide returns and floats above the close */}
        <FinaleSection />

        <DemoNudge />
      </div>
    </>
  );
}
