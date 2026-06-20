'use client';

import { checkpoints, TOTAL_SCENES } from '@/lib/experience';
import { ExperienceProvider } from './ExperienceContext';
import { ExperienceBackground } from './ExperienceBackground';
import { IntelligenceTrunk } from './IntelligenceTrunk';
import { MascotStage } from './MascotStage';
import { HeroChapter } from './HeroChapter';
import { CheckpointSection } from './CheckpointSection';
import { CitronFinale } from './CitronFinale';
import { InkblotChapter } from './InkblotChapter';
import { FloatingCta } from './FloatingCta';
import { VISUALS } from './ChapterVisuals';

/**
 * The Citron experience — one continuous, guided descent through ten
 * checkpoints. Three fixed atmospheric layers (void, trunk, mascot) sit
 * behind a single scrolling narrative; the mascot, tracking the active
 * scene, plays guide the whole way down to its origin at Inkblot Studio.
 */
export function Experience() {
  return (
    <ExperienceProvider total={TOTAL_SCENES}>
      <div className="experience-root relative">
        <ExperienceBackground />
        <IntelligenceTrunk />
        <MascotStage />

        <div className="relative">
          <HeroChapter />

          {checkpoints.map((cp, i) => {
            const Visual = VISUALS[cp.visual];
            return (
              <CheckpointSection key={cp.id} cp={cp} position={i} visual={<Visual />} />
            );
          })}

          <CitronFinale />
          <InkblotChapter />
        </div>

        <FloatingCta />
      </div>
    </ExperienceProvider>
  );
}
