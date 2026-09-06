import type { CSSProperties, HTMLAttributes } from 'react';

/* PreferredSourceButton — renders Google's "Add to Preferred Sources" button.
   Google's publisher.js (loaded once in app/layout.tsx) scans the DOM for the
   `google-add-preferred-source-btn` marker and swaps in an interactive,
   auto-translated button. The publication is inferred from the page hostname,
   so this renders as a no-op on localhost and *.vercel.app and only activates
   on the production domain once Google lists it in its source preferences tool
   (google.com/preferences/source?q=medinasmobiletireservice.com).

   The script initializes markers present at load time. The footer instance is
   mounted on every route so it always initializes; the blog placements rely on
   a full document load (crawlers, direct visits, hard refreshes), which is the
   SEO-relevant case. A marker mounted only via client-side navigation may stay
   un-hydrated until the next full load. */
type PreferredSourceButtonProps = {
  theme?: 'light' | 'dark';
  lang?: string;
  style?: CSSProperties;
};

type MarkerProps = HTMLAttributes<HTMLDivElement> & {
  'google-add-preferred-source-btn': '';
};

const marker = { 'google-add-preferred-source-btn': '' } as MarkerProps;

export function PreferredSourceButton({ theme = 'light', lang, style }: PreferredSourceButtonProps) {
  return (
    <div
      data-component="preferred-source-button"
      style={{ minHeight: 40, ...style }}
    >
      <div {...marker} data-theme={theme} data-lang={lang || undefined} />
    </div>
  );
}
