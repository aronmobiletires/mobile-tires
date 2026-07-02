import { createDocDataAttribute } from '@/lib/sanity/dataAttribute';
import type { FooterNavigationQueryResult } from '@/sanity.types';

type SiteFooterProps = {
  navigation: FooterNavigationQueryResult;
};

// Placeholder. Replace with the real footer markup once design ships tokens
// and the navigation pattern is locked in.
export function SiteFooter({ navigation }: SiteFooterProps) {
  return (
    <footer
      data-component="site-footer"
      data-sanity={navigation ? createDocDataAttribute(navigation).toString() : undefined}
    >
      {/* TODO: render `navigation.columns` and `navigation.copyright` once UI is ready. */}
    </footer>
  );
}
