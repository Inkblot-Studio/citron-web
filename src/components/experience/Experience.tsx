'use client';

import { acts, TOTAL_SCENES } from '@/lib/experience';
import { ExperienceProvider } from './ExperienceContext';
import { ExperienceBackground } from './ExperienceBackground';
import { IntelligenceTrunk } from './IntelligenceTrunk';
import { MascotStage } from './MascotStage';
import { HeroChapter } from './HeroChapter';
import { Act } from './Act';
import { CitronFinale } from './CitronFinale';
import { InkblotChapter } from './InkblotChapter';
import { FloatingCta } from './FloatingCta';

/**
 * The Citron experience — one continuous, cinematic descent. Three fixed
 * atmospheric layers (void, the living trunk, the mascot guide) sit behind a
 * single scrolling narrative of acts the visitor arrives at, settles into,
 * and travels beyond — all the way down to the trunk's origin: Inkblot Studio.
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

          {acts.map((act, i) => (
            <Act key={act.id} act={act} position={i} />
          ))}

          <CitronFinale />
          <InkblotChapter />
        </div>

        <FloatingCta />
      </div>
    </ExperienceProvider>
  );
}
