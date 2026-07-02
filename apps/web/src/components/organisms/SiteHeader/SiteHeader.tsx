import { createDocDataAttribute } from '@/lib/sanity/dataAttribute';
import type { HeaderNavigationQueryResult } from '@/sanity.types';

type SiteHeaderProps = {
  navigation: HeaderNavigationQueryResult;
};

// Placeholder. Replace with the real header markup once design ships tokens
// and the navigation pattern is locked in.
export function SiteHeader({ navigation }: SiteHeaderProps) {
  return (
    <header
      data-component="site-header"
      data-sanity={navigation ? createDocDataAttribute(navigation).toString() : undefined}
    >
      {/* TODO: render `navigation.links` once design + UI are ready. */}
    </header>
  );
}
