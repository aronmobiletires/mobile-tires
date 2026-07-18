export type ServiceAreaCity = {
  slug: string;
  city: string;
  countyOrRegion: string;
  stateCode: 'CA';
  postalCode?: string;
};

export const SERVICE_AREA_CITIES: ServiceAreaCity[] = [
  { slug: 'brea', city: 'Brea', countyOrRegion: 'Orange County', stateCode: 'CA' },
  { slug: 'azusa', city: 'Azusa', countyOrRegion: 'Los Angeles County', stateCode: 'CA' },
  { slug: 'pomona', city: 'Pomona', countyOrRegion: 'Los Angeles County', stateCode: 'CA' },
  { slug: 'walnut', city: 'Walnut', countyOrRegion: 'Los Angeles County', stateCode: 'CA' },
  { slug: 'altadena', city: 'Altadena', countyOrRegion: 'Los Angeles County', stateCode: 'CA' },
  { slug: 'el-monte', city: 'El Monte', countyOrRegion: 'Los Angeles County', stateCode: 'CA' },
  { slug: 'monrovia', city: 'Monrovia', countyOrRegion: 'Los Angeles County', stateCode: 'CA' },
  { slug: 'whittier', city: 'Whittier', countyOrRegion: 'Los Angeles County', stateCode: 'CA' },
  { slug: 'fullerton', city: 'Fullerton', countyOrRegion: 'Orange County', stateCode: 'CA' },
  { slug: 'irwindale', city: 'Irwindale', countyOrRegion: 'Los Angeles County', stateCode: 'CA' },
  { slug: 'la-puente', city: 'La Puente', countyOrRegion: 'Los Angeles County', stateCode: 'CA' },
  { slug: 'diamond-bar', city: 'Diamond Bar', countyOrRegion: 'Los Angeles County', stateCode: 'CA' },
  { slug: 'west-covina', city: 'West Covina', countyOrRegion: 'Los Angeles County', stateCode: 'CA' },
  { slug: 'yorba-linda', city: 'Yorba Linda', countyOrRegion: 'Orange County', stateCode: 'CA' },
  { slug: 'baldwin-park', city: 'Baldwin Park', countyOrRegion: 'Los Angeles County', stateCode: 'CA' },
  { slug: 'duarte', city: 'Duarte', countyOrRegion: 'Los Angeles County', stateCode: 'CA', postalCode: '91010' },
  { slug: 'norwalk', city: 'Norwalk', countyOrRegion: 'Los Angeles County', stateCode: 'CA', postalCode: '90650' },
  { slug: 'orange-county', city: 'Orange County', countyOrRegion: 'Orange County', stateCode: 'CA' },
  { slug: 'hacienda-heights', city: 'Hacienda Heights', countyOrRegion: 'Los Angeles County', stateCode: 'CA' },
  { slug: 'santa-fe-springs', city: 'Santa Fe Springs', countyOrRegion: 'Los Angeles County', stateCode: 'CA' },
];

const SERVICE_AREA_CITY_MAP = new Map(SERVICE_AREA_CITIES.map((city) => [city.slug, city]));

const META_COPY_VARIANTS = [
  'on-site tire replacement, flat repair, and emergency roadside support with rapid dispatch.',
  'mobile tire diagnostics, puncture repair, and replacement service delivered to your location.',
  '24/7 tire emergency help, new tire installs, and roadside replacement when driving is unsafe.',
  'home, workplace, and roadside tire service with real-time dispatch updates and fast arrival.',
  'dependable mobile tire repair and replacement with local coverage across major corridors.',
];

const INTRO_VARIANTS = [
  'Drivers in {city} call us for fast dispatch when a tire problem interrupts the day.',
  '{city} customers use our mobile setup to avoid towing and get back on the road quickly.',
  'From neighborhood streets to high-traffic routes, we bring tire support directly to {city}.',
  'Our field technicians cover {city} with service built for urgent roadside tire failures.',
  'Need immediate tire help in {city}? We dispatch with repair-first, replace-when-needed service.',
];

const COVERAGE_VARIANTS = [
  'Coverage includes key streets and nearby connectors around {cityLabel}.',
  'We regularly service residential zones, shopping corridors, and commuter routes near {cityLabel}.',
  'Dispatch windows are optimized for both local neighborhoods and surrounding travel corridors near {cityLabel}.',
  'Service in {cityLabel} extends to adjacent areas based on traffic and technician availability.',
  'Our mobile route planning prioritizes fast arrivals across the broader {cityLabel} area.',
];

function variantIndex(seed: string, size: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash % size;
}

function fillTemplate(template: string, city: ServiceAreaCity): string {
  const cityLabel = `${city.city}, ${city.stateCode}`;
  return template.replaceAll('{city}', city.city).replaceAll('{cityLabel}', cityLabel);
}

function pickVariant(variants: readonly string[], seed: string): string {
  const selected = variants[variantIndex(seed, variants.length)];
  return selected ?? variants[0] ?? '';
}

export function getServiceAreaCity(slug: string) {
  return SERVICE_AREA_CITY_MAP.get(slug);
}

export function getServiceAreaCityByName(name: string) {
  return SERVICE_AREA_CITIES.find((city) => city.city.toLowerCase() === name.toLowerCase());
}

export function getServiceAreaMetaCopy(city: ServiceAreaCity): string {
  return pickVariant(META_COPY_VARIANTS, city.slug);
}

export function getServiceAreaIntroCopy(city: ServiceAreaCity): string {
  return fillTemplate(pickVariant(INTRO_VARIANTS, `intro:${city.slug}`), city);
}

export function getServiceAreaCoverageCopy(city: ServiceAreaCity): string {
  return fillTemplate(pickVariant(COVERAGE_VARIANTS, `coverage:${city.slug}`), city);
}
