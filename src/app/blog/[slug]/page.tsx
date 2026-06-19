import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { blogPosts, getPost } from '@/lib/blog';
import { Container } from '@/components/ui/Container';
import { CtaBand } from '@/components/sections/CtaBand';
import { siteConfig } from '@/lib/site';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author.name },
    publisher: { '@type': 'Organization', name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="pt-32 sm:pt-36">
        <Container size="prose">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            All articles
          </Link>

          <header className="mt-8">
            <div className="flex items-center gap-3 text-[0.8125rem] text-[var(--text-muted)]">
              <span className="font-medium text-[var(--accent-hover)]">{post.category}</span>
              <span>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </div>
            <h1 className="mt-4 text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[3rem]">
              {post.title}
            </h1>
            <p className="mt-5 text-[1.1875rem] leading-relaxed text-[var(--text-secondary)]">
              {post.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-3 border-y border-[var(--border-subtle)] py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[0.8125rem] font-semibold text-[var(--accent-hover)]">
                {post.author.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </span>
              <span className="flex flex-col">
                <span className="text-[0.875rem] font-semibold text-[var(--text-primary)]">{post.author.name}</span>
                <span className="text-[0.8125rem] text-[var(--text-muted)]">{post.author.role}</span>
              </span>
            </div>
          </header>

          <div className="mt-10 space-y-6 pb-12">
            {post.content.map((block, i) => {
              switch (block.type) {
                case 'h2':
                  return (
                    <h2 key={i} className="pt-4 text-[1.625rem] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                      {block.text}
                    </h2>
                  );
                case 'h3':
                  return (
                    <h3 key={i} className="pt-2 text-[1.25rem] font-semibold text-[var(--text-primary)]">
                      {block.text}
                    </h3>
                  );
                case 'quote':
                  return (
                    <blockquote key={i} className="border-l-2 border-[var(--accent)] py-1 pl-5 text-[1.25rem] font-medium leading-snug text-[var(--text-primary)]">
                      {block.text}
                    </blockquote>
                  );
                case 'list':
                  return (
                    <ul key={i} className="space-y-2.5">
                      {block.items?.map((it) => (
                        <li key={it} className="flex items-start gap-3 text-[1.0625rem] leading-relaxed text-[var(--text-secondary)]">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  );
                default:
                  return (
                    <p key={i} className="text-[1.0625rem] leading-[1.75] text-[var(--text-secondary)]">
                      {block.text}
                    </p>
                  );
              }
            })}
          </div>
        </Container>
      </article>

      {/* related */}
      <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-16">
        <Container>
          <h2 className="text-[1.25rem] font-semibold text-[var(--text-primary)]">Keep reading</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-md)]"
              >
                <span className="text-[0.75rem] font-medium text-[var(--accent-hover)]">{p.category}</span>
                <h3 className="mt-2 flex-1 text-[1.0625rem] font-semibold leading-snug text-[var(--text-primary)]">
                  {p.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 text-[0.8125rem] font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-hover)]">
                  Read <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Run your business on one intelligence."
        description="See what an operating system for business actually feels like."
      />
    </>
  );
}
