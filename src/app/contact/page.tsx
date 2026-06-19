import type { Metadata } from 'next';
import { Mail, MessageSquare, Calendar, MapPin } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ContactForm } from '@/components/sections/ContactForm';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the Citron team — sales, support, partnerships, and press. We respond within one business day.',
  alternates: { canonical: '/contact' },
};

const channels = [
  { icon: Mail, title: 'Talk to sales', body: 'Explore Citron for your team.', action: siteConfig.contact.sales, href: `mailto:${siteConfig.contact.sales}` },
  { icon: MessageSquare, title: 'Get support', body: 'Already a customer? We’re here.', action: siteConfig.contact.support, href: `mailto:${siteConfig.contact.support}` },
  { icon: Calendar, title: 'Book a demo', body: 'See the platform live, end to end.', action: 'Schedule a walkthrough', href: '/demo' },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s talk about <span className="gradient-citron">your business.</span>
          </>
        }
        description="Whether you’re evaluating Citron, need a hand, or want to partner — reach the right people fast. We reply within one business day."
      />

      <Section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* channels */}
            <div className="flex flex-col gap-4">
              {channels.map((c, i) => {
                const Icon = c.icon;
                const external = c.href.startsWith('mailto:');
                return (
                  <Reveal key={c.title} delay={i * 0.06}>
                    <a
                      href={c.href}
                      {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-start gap-4 rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-sm)]"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-tertiary)] text-[var(--accent-hover)]">
                        <Icon className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <div>
                        <h3 className="text-[1.0625rem] font-semibold text-[var(--text-primary)]">{c.title}</h3>
                        <p className="mt-0.5 text-[0.875rem] text-[var(--text-secondary)]">{c.body}</p>
                        <span className="mt-2 inline-block text-[0.875rem] font-medium text-[var(--accent-hover)] group-hover:underline">
                          {c.action}
                          {external ? '' : ' →'}
                        </span>
                      </div>
                    </a>
                  </Reveal>
                );
              })}

              <Reveal delay={0.2}>
                <div className="flex items-center gap-3 rounded-[var(--radius-xl)] border border-dashed border-[var(--border-default)] p-5 text-[var(--text-secondary)]">
                  <MapPin className="h-5 w-5 text-[var(--text-muted)]" strokeWidth={1.7} />
                  <span className="text-[0.875rem]">
                    Remote-first · crafted by Inkblot Studio, Europe
                  </span>
                </div>
              </Reveal>
            </div>

            {/* form */}
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
