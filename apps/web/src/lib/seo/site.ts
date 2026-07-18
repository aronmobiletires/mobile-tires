export const DEFAULT_SITE_URL = 'http://localhost:3000';

export const BUSINESS_NAME = "Medina's Mobile Tire Service";
export const DISPATCH_PHONE_DISPLAY = '(626) 588-7122';
export const DISPATCH_PHONE_E164 = '+16265887122';
export const SERVICE_AREA_REGION = 'Los Angeles County and Orange County';
export const BUSINESS_HOURS = 'Mo-Su 00:00-23:59';
export const BUSINESS_HOURS_LABEL = 'Open 24 hours, 7 days a week';
export const BUSINESS_HOURS_SPEC = [
  { dayOfWeek: 'Monday', opens: '00:00', closes: '23:59' },
  { dayOfWeek: 'Tuesday', opens: '00:00', closes: '23:59' },
  { dayOfWeek: 'Wednesday', opens: '00:00', closes: '23:59' },
  { dayOfWeek: 'Thursday', opens: '00:00', closes: '23:59' },
  { dayOfWeek: 'Friday', opens: '00:00', closes: '23:59' },
  { dayOfWeek: 'Saturday', opens: '00:00', closes: '23:59' },
  { dayOfWeek: 'Sunday', opens: '00:00', closes: '23:59' },
] as const;

export function getBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/+$/, '');
}

export function toAbsoluteUrl(pathname: string): string {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${getBaseUrl()}${normalizedPath}`;
}
