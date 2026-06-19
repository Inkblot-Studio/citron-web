import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { blogPosts } from '@/lib/blog';
import { legalDocs } from '@/lib/legal';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1, freq: 'weekly' },
    { path: '/platform', priority: 0.9, freq: 'monthly' },
    { path: '/ai', priority: 0.9, freq: 'monthly' },
    { path: '/solutions', priority: 0.8, freq: 'monthly' },
    { path: '/pricing', priority: 0.9, freq: 'monthly' },
    { path: '/about', priority: 0.6, freq: 'monthly' },
    { path: '/contact', priority: 0.6, freq: 'yearly' },
    { path: '/demo', priority: 0.8, freq: 'monthly' },
    { path: '/blog', priority: 0.7, freq: 'weekly' },
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  for (const post of blogPosts) {
    routes.push({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly',
      priority: 0.6,
    });
  }

  for (const doc of legalDocs) {
    routes.push({
      url: `${base}/legal/${doc.slug}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    });
  }

  return routes;
}
