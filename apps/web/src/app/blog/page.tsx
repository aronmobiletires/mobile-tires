import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostCard } from '@/components/molecules/BlogPostCard';
import { createDocDataAttribute } from '@/lib/sanity/dataAttribute';
import { getAllLocalBlogPosts } from '@/lib/localContent/blogPosts';
import { urlForImage } from '@/lib/sanity/image';
import { getAllBlogPosts } from '@/lib/sanity/queries/blog';
import { getSiteSettings } from '@/lib/sanity/queries/global';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Tire care tips, maintenance guides, and mobile tire service advice from the pros.',
};

export default async function BlogPage() {
  const settings = await getSiteSettings();
  const localPosts = getAllLocalBlogPosts();
  const isBlogDisabled = settings?.blogEnabled === false;

  if (isBlogDisabled && localPosts.length === 0) notFound();

  const sanityPosts = isBlogDisabled ? [] : await getAllBlogPosts();
  const sanitySlugs = new Set(
    sanityPosts
      .map((post) => post.slug)
      .filter((slug): slug is string => Boolean(slug)),
  );

  const mergedPosts = [
    ...sanityPosts.map((post) => ({
      key: post._id,
      title: post.title ?? 'Untitled post',
      slug: post.slug ?? '',
      excerpt: post.excerpt ?? '',
      coverImageUrl: post.coverImage
        ? urlForImage(post.coverImage).width(800).height(450).url()
        : undefined,
      coverImageAlt: post.coverImage?.alt ?? undefined,
      publishedAt: post.publishedAt ?? undefined,
      sanityDoc: post,
    })),
    ...localPosts
      .filter((post) => !sanitySlugs.has(post.slug))
      .map((post) => ({
        key: `local:${post.slug}`,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        coverImageUrl: post.coverImageUrl,
        coverImageAlt: post.coverImageAlt,
        publishedAt: post.publishedAt,
        sanityDoc: null,
      })),
  ].sort(
    (a, b) =>
      new Date(b.publishedAt ?? 0).getTime() -
      new Date(a.publishedAt ?? 0).getTime(),
  );

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 20px' }}>
      <h1 style={{ margin: '0 0 8px', fontSize: 36, lineHeight: 1.2 }}>Blog</h1>
      <p style={{ margin: '0 0 36px', fontSize: 17, color: 'var(--text-muted, #9aa0a6)' }}>
        Tire care tips, maintenance guides, and service updates.
      </p>
      {mergedPosts.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 20px',
            border: '1px dashed var(--border, #e0e0e0)',
            borderRadius: 'var(--radius-md, 12px)',
          }}
        >
          <p style={{ fontSize: 28, fontWeight: 700, margin: '0 0 12px' }}>Coming Soon</p>
          <p style={{ fontSize: 16, color: 'var(--text-muted, #9aa0a6)', margin: 0 }}>
            We&apos;re working on something great. Check back soon for tire tips, maintenance guides, and service updates.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
            gap: 24,
          }}
        >
          {mergedPosts.map((post) => (
            <div
              key={post.key}
              data-sanity={post.sanityDoc ? createDocDataAttribute(post.sanityDoc).toString() : undefined}
            >
              <BlogPostCard
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                coverImageUrl={post.coverImageUrl}
                coverImageAlt={post.coverImageAlt}
                publishedAt={post.publishedAt}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
