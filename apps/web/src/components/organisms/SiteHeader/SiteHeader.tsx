import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { createDocDataAttribute } from '@/lib/sanity/dataAttribute';
import type { HeaderNavigationQueryResult } from '@/sanity.types';
import { MobileMenu } from './MobileMenu';

type SiteHeaderProps = {
  navigation: HeaderNavigationQueryResult;
};

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

      <nav
        className="rr-desktop-nav"
        aria-label="Main navigation"
        style={{ display: 'flex', gap: 22, marginLeft: 20 }}
      >
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
          <span
            className="rr-numeric"
            style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--off-white)' }}
          >
            (203) 555-0148
          </span>
        </a>

        {/* Mobile-only phone link rendered as icon button */}
        <a
          href="tel:+12035550148"
          aria-label="Call dispatch"
          className="rr-mobile-phone"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: 'var(--radius-sm)',
            background: 'var(--signal-orange)',
            color: 'var(--off-white)',
          }}
        >
          <Icon name="phone" size={20} />
        </a>

        <div className="rr-mobile-menu-wrapper" style={{ display: 'none' }}>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
