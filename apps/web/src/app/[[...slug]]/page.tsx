import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LandingPage } from '@/components/sections/LandingPage';
import { Sections } from '@/components/sections/Sections';
import { createDocDataAttribute } from '@/lib/sanity/dataAttribute';
import { getAllWebsitePageSlugs, getWebsitePageBySlug } from '@/lib/sanity/queries/page';

type RouteParams = { slug?: string[] };

export const dynamicParams = true;
export const revalidate = 86400;

function isHomepageRoute(slugSegments?: string[]): boolean {
  return !slugSegments || slugSegments.length === 0;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  const pages = await getAllWebsitePageSlugs();
  return [{ slug: [] }, ...pages.map(({ slug }) => ({ slug: slug.split('/') }))];
}

export async function generateMetadata(props: { params: Promise<RouteParams> }): Promise<Metadata> {
  const params = await props.params;

  // RoadReady landing is hardcoded for now (see landing-page-design-brief.md)
  // and skips Sanity entirely, so the homepage doesn't need a `siteHomepage`
  // document to exist before this route renders something real.
  if (isHomepageRoute(params.slug)) {
    return {
      title: 'RoadReady Tire Co. — Mobile tire & roadside service',
      description:
        "We'll be there in under 35 minutes or your deposit's waived. Flat repair, tire replacement, and roadside assistance across Greater Hartford.",
    };
  }

  const page = await getWebsitePageBySlug(params.slug!.join('/'));
  if (!page) {
    return { title: 'Page not found' };
  }

  return {
    title: page.seo?.metaTitle ?? page.title,
    description: page.seo?.metaDescription ?? undefined,
    robots: page.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function Page(props: { params: Promise<RouteParams> }) {
  const params = await props.params;

  if (isHomepageRoute(params.slug)) {
    return (
      <div data-component="roadready-landing">
        <LandingPage />
      </div>
    );
  }

  const page = await getWebsitePageBySlug(params.slug!.join('/'));
  if (!page) notFound();

  return (
    <div data-sanity={createDocDataAttribute(page).toString()}>
      <Sections sections={page.sections} />
    </div>
  );
}

// Note: `getHomepage()` in lib/sanity/queries/page.ts is unused while the
// landing is hardcoded. Swap `LandingPage` back for `Sections` fed by
// `getHomepage()` once the design is migrated into Sanity section schemas
// (see landing-page-design-brief.md, "Build notes for this repo").
