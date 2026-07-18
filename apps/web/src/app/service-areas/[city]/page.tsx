import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getServiceAreaCity,
  getServiceAreaCoverageCopy,
  getServiceAreaIntroCopy,
  getServiceAreaMetaCopy,
  SERVICE_AREA_CITIES,
} from '@/lib/seo/serviceAreas';
import {
  BUSINESS_HOURS_LABEL,
  BUSINESS_HOURS_SPEC,
  BUSINESS_HOURS,
  BUSINESS_NAME,
  DISPATCH_PHONE_DISPLAY,
  DISPATCH_PHONE_E164,
  SERVICE_AREA_REGION,
  toAbsoluteUrl,
} from '@/lib/seo/site';

type RouteParams = { city: string };

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams(): RouteParams[] {
  return SERVICE_AREA_CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata(props: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { city: citySlug } = await props.params;
  const city = getServiceAreaCity(citySlug);

  if (!city) {
    return { title: 'Service area not found' };
  }

  const cityLabel = `${city.city}, ${city.stateCode}`;
  const canonicalPath = `/service-areas/${city.slug}`;
  const title = `Mobile Tire Service in ${cityLabel} | ${BUSINESS_NAME}`;
  const description = `Need mobile tire repair in ${cityLabel}? ${BUSINESS_NAME} provides ${getServiceAreaMetaCopy(city)}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: toAbsoluteUrl(canonicalPath),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ServiceAreaCityPage(props: { params: Promise<RouteParams> }) {
  const { city: citySlug } = await props.params;
  const city = getServiceAreaCity(citySlug);

  if (!city) notFound();

  const cityLabel = `${city.city}, ${city.stateCode}`;
  const pagePath = `/service-areas/${city.slug}`;
  const introCopy = getServiceAreaIntroCopy(city);
  const coverageCopy = getServiceAreaCoverageCopy(city);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: toAbsoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Service Areas',
            item: toAbsoluteUrl('/service-areas'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: cityLabel,
            item: toAbsoluteUrl(pagePath),
          },
        ],
      },
      {
        '@type': 'AutoRepair',
        '@id': `${toAbsoluteUrl(pagePath)}#business`,
        name: BUSINESS_NAME,
        url: toAbsoluteUrl(pagePath),
        areaServed: {
          '@type': 'City',
          name: city.city,
          containedInPlace: {
            '@type': 'AdministrativeArea',
            name: city.stateCode,
          },
        },
        openingHours: BUSINESS_HOURS,
        openingHoursSpecification: BUSINESS_HOURS_SPEC.map((hours) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: `https://schema.org/${hours.dayOfWeek}`,
          opens: hours.opens,
          closes: hours.closes,
        })),
        telephone: DISPATCH_PHONE_E164,
      },
      {
        '@type': 'Service',
        name: `Mobile tire service in ${cityLabel}`,
        serviceType: 'Mobile tire repair and replacement',
        provider: {
          '@id': `${toAbsoluteUrl(pagePath)}#business`,
        },
        areaServed: {
          '@type': 'Place',
          name: cityLabel,
        },
      },
    ],
  };

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '48px 20px 72px' }}>
      <nav aria-label="Breadcrumb" style={{ marginBottom: 18, fontSize: 14 }}>
        <Link href="/">Home</Link>
        {' / '}
        <Link href="/service-areas">Service Areas</Link>
        {' / '}
        <span aria-current="page">{cityLabel}</span>
      </nav>

      <h1 style={{ margin: '0 0 10px', fontSize: 'clamp(32px, 5vw, 46px)', lineHeight: 1.06 }}>
        Mobile Tire Service in {cityLabel}
      </h1>
      <p style={{ margin: '0 0 24px', color: 'var(--steel-300)', fontSize: 17 }}>
        {introCopy}
      </p>

      <section aria-labelledby="services-heading" style={{ marginBottom: 24 }}>
        <h2 id="services-heading" style={{ margin: '0 0 10px', fontSize: 24 }}>What We Handle On-Site</h2>
        <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8 }}>
          <li>Flat tire repair and replacement at home, work, or roadside locations.</li>
          <li>Emergency dispatch for blowouts and unsafe tire failures.</li>
          <li>New tire installs and balancing support where available.</li>
          <li>Valve, puncture, and pressure-related diagnostics.</li>
        </ul>
      </section>

      <section aria-labelledby="coverage-heading" style={{ marginBottom: 24 }}>
        <h2 id="coverage-heading" style={{ margin: '0 0 10px', fontSize: 24 }}>Coverage Notes</h2>
        <p style={{ margin: '0 0 10px' }}>
          {coverageCopy}
        </p>
        <p style={{ margin: 0 }}>
          Call dispatch for ETA and service confirmation in your exact location across {SERVICE_AREA_REGION}.
          {city.postalCode ? ` Typical ZIP serviced: ${city.postalCode}.` : ''}
        </p>
      </section>

      <section aria-labelledby="hours-heading">
        <h2 id="hours-heading" style={{ margin: '0 0 10px', fontSize: 24 }}>Business Hours</h2>
        <p style={{ margin: '0 0 14px' }}>{BUSINESS_HOURS_LABEL}.</p>
        <a
          href={`tel:${DISPATCH_PHONE_E164}`}
          aria-label={`Call ${BUSINESS_NAME} dispatch at ${DISPATCH_PHONE_DISPLAY}`}
          style={{ fontSize: 20, fontFamily: 'var(--font-display)', color: 'var(--signal-orange)' }}
        >
          {DISPATCH_PHONE_DISPLAY}
        </a>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
