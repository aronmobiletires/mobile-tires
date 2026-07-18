import type { Metadata } from 'next';
import { Archivo_Black, Barlow, Barlow_Condensed } from 'next/font/google';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import { urlForImage } from '@/lib/sanity/image';
import { SanityLive } from '@/lib/sanity/live';
import {
  BUSINESS_HOURS,
  BUSINESS_HOURS_SPEC,
  BUSINESS_NAME,
  DISPATCH_PHONE_E164,
  getBaseUrl,
} from '@/lib/seo/site';
import {
  getFooterNavigation,
  getHeaderNavigation,
  getSiteSettings,
} from '@/lib/sanity/queries/global';
import { SiteHeader } from '@/components/organisms/SiteHeader';
import { SiteFooter } from '@/components/organisms/SiteFooter';
import './globals.css';

// RoadReady brand type: heavy grotesk display, condensed headlines/eyebrows,
// clean sans body. Exposed as CSS variables consumed throughout
// components/{atoms,molecules,organisms,sections} as var(--font-*).
const fontDisplay = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});
const fontBody = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});
const fontCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-condensed',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const baseUrl = getBaseUrl();
  const siteName = settings?.siteName ?? BUSINESS_NAME;
  const description =
    settings?.siteDescription ??
    'Fast on-site tire repair, replacement, and emergency roadside tire service across Los Angeles and Orange County.';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    alternates: {
      canonical: '/',
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      url: baseUrl,
      siteName,
      title: siteName,
      description,
      images: settings?.defaultOpenGraphImage
        ? [
            {
              url: urlForImage(settings.defaultOpenGraphImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: `${siteName} service vehicle`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description,
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [headerNavigation, footerNavigation, siteSettings, { isEnabled: isDraftMode }] = await Promise.all([
    getHeaderNavigation(),
    getFooterNavigation(),
    getSiteSettings(),
    draftMode(),
  ]);

  const baseUrl = getBaseUrl();
  const organizationName = siteSettings?.organizationLegalName ?? siteSettings?.siteName ?? BUSINESS_NAME;
  const organizationUrl = siteSettings?.organizationUrl ?? baseUrl;
  const siteDescription =
    siteSettings?.siteDescription ??
    'Fast on-site tire repair, replacement, and emergency roadside tire service across Los Angeles and Orange County.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AutoRepair',
        '@id': `${baseUrl}#organization`,
        name: organizationName,
        url: organizationUrl,
        telephone: DISPATCH_PHONE_E164,
        openingHours: BUSINESS_HOURS,
        openingHoursSpecification: BUSINESS_HOURS_SPEC.map((hours) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: `https://schema.org/${hours.dayOfWeek}`,
          opens: hours.opens,
          closes: hours.closes,
        })),
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}#website`,
        url: baseUrl,
        name: siteSettings?.siteName ?? BUSINESS_NAME,
        description: siteDescription,
        publisher: {
          '@id': `${baseUrl}#organization`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontCondensed.variable}`}
    >
      <body>
        <a href="#main-content" className="rr-skip-link">
          Skip to main content
        </a>
        <SiteHeader navigation={headerNavigation} />
        <main id="main-content">
          {children}
        </main>
        <SiteFooter navigation={footerNavigation} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {isDraftMode && <SanityLive />}
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
