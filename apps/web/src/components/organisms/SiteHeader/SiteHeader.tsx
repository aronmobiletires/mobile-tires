import { Badge } from '@/components/atoms/Badge';
import { IconButton } from '@/components/atoms/IconButton';
import { createDocDataAttribute } from '@/lib/sanity/dataAttribute';
import type { HeaderNavigationQueryResult } from '@/sanity.types';

type SiteHeaderProps = {
  navigation: HeaderNavigationQueryResult;
};

// RoadReady site header — wordmark, nav, call CTA. Content is hardcoded for
// now (see landing-page-design-brief.md); `navigation` is threaded through
// and tagged for Sanity's Presentation tool so it can drive the nav links
// once the header is migrated to editable content.
export function SiteHeader({ navigation }: SiteHeaderProps) {
  return (
    <header
      data-component="site-header"
      data-sanity={navigation ? createDocDataAttribute(navigation).toString() : undefined}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '14px 20px',
        background: 'rgba(18,19,22,0.86)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <span
          style={{
            width: 12,
            height: 28,
            background: 'var(--signal-orange)',
            clipPath: 'polygon(30% 0,100% 0,70% 100%,0 100%)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            color: 'var(--off-white)',
          }}
        >
          Road<span style={{ color: 'var(--signal-orange)' }}>Ready</span>
        </span>
      </a>
      <nav className="rr-desktop-nav" style={{ display: 'flex', gap: 22, marginLeft: 20 }}>
        {['Services', 'How it works', 'Coverage', 'Reviews'].map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
            style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 500, color: 'var(--steel-300)' }}
          >
            {l}
          </a>
        ))}
      </nav>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <a
          href="tel:+12035550148"
          className="rr-desktop-phone"
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
        >
          <Badge tone="caution">24/7</Badge>
          <span className="rr-numeric" style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--off-white)' }}>
            (203) 555-0148
          </span>
        </a>
        <IconButton icon="phone" variant="primary" label="Call dispatch" />
        {/* IconButton renders as a plain button (no onClick) to keep this a
            Server Component. If it should dial out, either add
            `formAction="tel:+12035550148"` inside a form, or move this
            header to a Client Component and wire an onClick. */}
      </div>
    </header>
  );
}
