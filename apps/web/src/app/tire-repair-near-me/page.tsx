import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalServicePage } from '@/components/components/LocalServicePage/LocalServicePage';
import { getLocalServicePageBySlug } from '@/lib/localContent/servicePages';

const slug = 'tire-repair-near-me';
const servicePage = getLocalServicePageBySlug(slug);

export const metadata: Metadata = {
  title: servicePage?.metaTitle ?? 'Tire Repair Near Me',
  description: servicePage?.metaDescription,
};

export default function TireRepairNearMePage() {
  const page = getLocalServicePageBySlug(slug);
  if (!page) notFound();
  return <LocalServicePage page={page} />;
}
