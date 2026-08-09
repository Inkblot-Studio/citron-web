import { LineHero } from '@/components/home/LineHero';
import { BuiltSoFar } from '@/components/home/BuiltSoFar';
import { ProductLine } from '@/components/products/ProductLine';
import { FinalCtaSection } from '@/components/home/sections';

export default function HomePage() {
  return (
    <>
      <LineHero />
      <ProductLine />
      <BuiltSoFar />
      <FinalCtaSection />
    </>
  );
}
