import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { BlogIndex } from '@/components/sections/BlogIndex';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Ideas on the future of business software — the end of tool sprawl, AI that acts, and building the operating system for modern companies.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Notes on the future of <span className="gradient-citron">business software.</span>
          </>
        }
        description="Ideas, product thinking, and engineering notes from the team building Citron."
      />
      <Section className="!pt-4">
        <BlogIndex />
      </Section>
    </>
  );
}
