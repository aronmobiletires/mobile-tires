import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalServicePage } from '@/components/components/LocalServicePage/LocalServicePage';
import { getLocalServicePageBySlug } from '@/lib/localContent/servicePages';

const slug = 'mobile-tire-service-near-me';
const servicePage = getLocalServicePageBySlug(slug);

export const metadata: Metadata = {
  title: servicePage?.metaTitle ?? 'Mobile Tire Service Near Me',
  description: servicePage?.metaDescription,
};

export default function MobileTireServiceNearMePage() {
  const page = getLocalServicePageBySlug(slug);
  if (!page) notFound();
  return <LocalServicePage page={page} />;
}
