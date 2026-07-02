import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import { SanityLive } from '@/lib/sanity/live';
import {
  getFooterNavigation,
  getHeaderNavigation,
  getSiteSettings,
} from '@/lib/sanity/queries/global';
import { SiteHeader } from '@/components/organisms/SiteHeader';
import { SiteFooter } from '@/components/organisms/SiteFooter';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: settings?.siteName ?? 'Site',
      template: `%s | ${settings?.siteName ?? 'Site'}`,
    },
    description: settings?.siteDescription ?? undefined,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [headerNavigation, footerNavigation, { isEnabled: isDraftMode }] = await Promise.all([
    getHeaderNavigation(),
    getFooterNavigation(),
    draftMode(),
  ]);

  return (
    <html lang="en">
      <body>
        <SiteHeader navigation={headerNavigation} />
        {children}
        <SiteFooter navigation={footerNavigation} />
        <SanityLive />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
