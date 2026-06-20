import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { legalDocs } from '@/lib/legal';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/demo`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ];

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
