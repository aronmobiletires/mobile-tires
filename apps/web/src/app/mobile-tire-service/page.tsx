import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalServicePage } from '@/components/components/LocalServicePage/LocalServicePage';
import { getLocalServicePageBySlug } from '@/lib/localContent/servicePages';

const slug = 'mobile-tire-service';
const servicePage = getLocalServicePageBySlug(slug);

export const metadata: Metadata = {
  title: servicePage?.metaTitle ?? 'Mobile Tire Service',
  description: servicePage?.metaDescription,
};

export default function MobileTireServicePage() {
  const page = getLocalServicePageBySlug(slug);
  if (!page) notFound();
  return <LocalServicePage page={page} />;
}
