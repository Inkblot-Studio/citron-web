'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, ArrowUpRight } from 'lucide-react';
import { blogPosts, blogCategories } from '@/lib/blog';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function BlogIndex() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');

  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchesCat = category === 'All' || p.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      {/* featured */}
      {category === 'All' && !query && (
        <Link href={`/blog/${featured.slug}`} className="group block">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-8 transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-lg)] sm:p-12"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(217,188,88,0.14),transparent_70%)] blur-2xl"
            />
            <div className="relative max-w-2xl">
              <div className="flex items-center gap-3 text-[0.8125rem] text-[var(--text-muted)]">
                <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-1 font-medium text-[var(--accent-hover)]">
                  Featured
                </span>
                <span>{featured.category}</span>
                <span>·</span>
                <span>{featured.readingTime} min read</span>
              </div>
              <h2 className="mt-5 text-[2rem] font-semibold leading-tight tracking-[-0.02em] text-[var(--text-primary)] sm:text-[2.5rem]">
                {featured.title}
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-[var(--text-secondary)]">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-[var(--accent-hover)]">
                Read article
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </motion.article>
        </Link>
      )}

      {/* controls */}
      <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categories">
          {blogCategories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={
                category === c
                  ? 'rounded-full border border-[var(--accent)] bg-[var(--accent)]/12 px-3.5 py-1.5 text-[0.8125rem] font-medium text-[var(--accent-hover)]'
                  : 'rounded-full border border-[var(--border-default)] px-3.5 py-1.5 text-[0.8125rem] font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
              }
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="w-full rounded-full border border-[var(--border-default)] bg-[var(--surface-card)] py-2.5 pl-9 pr-4 text-[0.875rem] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
          />
        </div>
      </div>

      {/* grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-md)]">
                <div className="flex items-center gap-2 text-[0.75rem] text-[var(--text-muted)]">
                  <span className="font-medium text-[var(--accent-hover)]">{post.category}</span>
                  <span>·</span>
                  <span>{post.readingTime} min</span>
                </div>
                <h3 className="mt-3 text-[1.25rem] font-semibold leading-snug tracking-[-0.01em] text-[var(--text-primary)]">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
                  {post.excerpt}
                </p>
                <div className="mt-5 border-t border-[var(--border-subtle)] pt-4 text-[0.8125rem] text-[var(--text-muted)]">
                  {formatDate(post.date)}
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-[1.0625rem] font-medium text-[var(--text-primary)]">No articles found</p>
          <p className="mt-1 text-[0.9375rem] text-[var(--text-secondary)]">
            Try a different search or category.
          </p>
        </div>
      )}
    </div>
  );
}
