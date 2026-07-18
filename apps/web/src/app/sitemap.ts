import type { MetadataRoute } from 'next';
import { getAllLocalBlogPosts } from '@/lib/localContent/blogPosts';
import { getAllLocalServicePages } from '@/lib/localContent/servicePages';
import { SERVICE_AREA_CITIES } from '@/lib/seo/serviceAreas';
import { getBaseUrl } from '@/lib/seo/site';
import {
  getBlogEnabledForStaticContext,
  getBlogPostsForSitemap,
} from '@/lib/sanity/queries/blog';
import { getAllWebsitePagesForSitemap } from '@/lib/sanity/queries/page';

const baseUrl = getBaseUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, blogEnabled] = await Promise.all([
    getAllWebsitePagesForSitemap(),
    getBlogEnabledForStaticContext(),
  ]);

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => {
    const path = page.isHomepage ? '' : `/${page.slug}`;
    return {
      url: `${baseUrl}${path}`,
      lastModified: page.lastModified ? new Date(page.lastModified) : undefined,
      changeFrequency: page.isHomepage ? 'daily' : 'weekly',
      priority: page.isHomepage ? 1.0 : 0.7,
    };
  });

  const legalEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/deposit-policy`,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  const localServiceEntries: MetadataRoute.Sitemap = getAllLocalServicePages().map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const serviceAreaEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/service-areas`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...SERVICE_AREA_CITIES.map((city) => ({
      url: `${baseUrl}/service-areas/${city.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    })),
  ];

  const localBlogPosts = getAllLocalBlogPosts();
  const localBlogEntries: MetadataRoute.Sitemap = localBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Disabled only when explicitly false; missing field counts as enabled.
  if (blogEnabled === false) {
    return [
      ...pageEntries,
      ...legalEntries,
      ...localServiceEntries,
      ...serviceAreaEntries,
      {
        url: `${baseUrl}/blog`,
        lastModified: localBlogPosts[0]?.publishedAt
          ? new Date(localBlogPosts[0].publishedAt)
          : undefined,
        changeFrequency: 'weekly',
        priority: 0.6,
      },
      ...localBlogEntries,
    ];
  }

  const posts = await getBlogPostsForSitemap();
  const sanityBlogSlugSet = new Set(posts.map((post) => post.slug));

  const blogEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: posts[0]?.lastModified ? new Date(posts[0].lastModified) : undefined,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.lastModified ? new Date(post.lastModified) : undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...localBlogEntries.filter((entry) => {
      const slug = entry.url.replace(`${baseUrl}/blog/`, '');
      return !sanityBlogSlugSet.has(slug);
    }),
  ];

  return [
    ...pageEntries,
    ...legalEntries,
    ...localServiceEntries,
    ...serviceAreaEntries,
    ...blogEntries,
  ];
}
