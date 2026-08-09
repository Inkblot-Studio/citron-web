import { LineHero } from '@/components/home/LineHero';
import { SegmentedLine } from '@/components/products/SegmentedLine';
import { OnePlan } from '@/components/home/OnePlan';
import { BuiltSoFar } from '@/components/home/BuiltSoFar';
import { FinalCtaSection } from '@/components/home/sections';

export default function HomePage() {
  return (
    <>
      <LineHero />
      <SegmentedLine />
      <OnePlan />
      <BuiltSoFar />
      <FinalCtaSection />
    </>
  );
}
