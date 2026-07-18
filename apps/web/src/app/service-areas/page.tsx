import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICE_AREA_CITIES } from '@/lib/seo/serviceAreas';
import { toAbsoluteUrl } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Service Areas',
  description:
    "Cities and neighborhoods where Medina's Mobile Tire Service provides mobile tire repair, replacement, and roadside help.",
  alternates: {
    canonical: '/service-areas',
  },
};

export default function ServiceAreasPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 20px 72px' }}>
      <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(30px, 5vw, 44px)', lineHeight: 1.08 }}>
        Mobile Tire Service Areas
      </h1>
      <p style={{ margin: '0 0 28px', color: 'var(--steel-300)', fontSize: 17 }}>
        We dispatch across Los Angeles and Orange County with 24/7 roadside support.
      </p>

      <section aria-labelledby="city-list-heading">
        <h2 id="city-list-heading" style={{ margin: '0 0 14px', fontSize: 24 }}>Cities We Serve</h2>
        <ul
          style={{
            margin: 0,
            paddingLeft: 20,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 10,
          }}
        >
          {SERVICE_AREA_CITIES.map((city) => (
            <li key={city.slug}>
              <Link href={`/service-areas/${city.slug}`}>{city.city}, {city.stateCode}</Link>
            </li>
          ))}
        </ul>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Mobile Tire Service Areas',
            itemListElement: SERVICE_AREA_CITIES.map((city, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: `${city.city}, ${city.stateCode}`,
              url: toAbsoluteUrl(`/service-areas/${city.slug}`),
            })),
          }),
        }}
      />
    </main>
  );
}
