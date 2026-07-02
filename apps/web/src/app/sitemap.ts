import type { MetadataRoute } from 'next';
import { getAllWebsitePagesForSitemap } from '@/lib/sanity/queries/page';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/+$/, '');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllWebsitePagesForSitemap();

  return pages.map((page) => {
    const path = page.isHomepage ? '' : `/${page.slug}`;
    return {
      url: `${baseUrl}${path}`,
      lastModified: page.lastModified ? new Date(page.lastModified) : undefined,
      changeFrequency: page.isHomepage ? 'daily' : 'weekly',
      priority: page.isHomepage ? 1.0 : 0.7,
    };
  });
}
