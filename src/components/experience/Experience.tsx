'use client';

import type { ComponentType } from 'react';
import { chapters, type ChapterId } from '@/lib/experience';
import { ExperienceBackground } from './ExperienceBackground';
import { IntelligenceTrunk } from './IntelligenceTrunk';
import { MascotStage } from './MascotStage';
import { ChapterShell } from './ChapterShell';
import { HeroChapter } from './HeroChapter';
import { FinaleChapter } from './FinaleChapter';
import { FloatingCta } from './FloatingCta';
import {
  UnificationVisual,
  CrmVisual,
  MarketingVisual,
  AutomationsVisual,
  AgentsVisual,
  FinanceVisual,
  OperationsVisual,
} from './ChapterVisuals';

const VISUALS: Record<ChapterId, ComponentType> = {
  unification: UnificationVisual,
  crm: CrmVisual,
  marketing: MarketingVisual,
  automations: AutomationsVisual,
  agents: AgentsVisual,
  finance: FinanceVisual,
  operations: OperationsVisual,
};

/**
 * The Citron experience — one continuous descent through the company's
 * intelligence. Three fixed atmospheric layers (void, trunk, mascot) sit
 * behind a single scrolling narrative of discoveries.
 */
export function Experience() {
  return (
    <div className="experience-root relative">
      <ExperienceBackground />
      <IntelligenceTrunk />
      <MascotStage />

      <div className="relative">
        <HeroChapter />

        {chapters.map((chapter) => {
          const Visual = VISUALS[chapter.id];
          return (
            <ChapterShell key={chapter.id} chapter={chapter}>
              <Visual />
            </ChapterShell>
          );
        })}

        <FinaleChapter />
      </div>

      <FloatingCta />
    </div>
  );
}
