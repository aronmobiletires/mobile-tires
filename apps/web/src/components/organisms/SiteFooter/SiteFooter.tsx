import { Badge } from '@/components/atoms/Badge';
import { createDocDataAttribute } from '@/lib/sanity/dataAttribute';
import type { FooterNavigationQueryResult } from '@/sanity.types';

type SiteFooterProps = {
  navigation: FooterNavigationQueryResult;
};

const COLUMNS = [
  { h: 'Contact', links: ['(203) 555-0148', 'Text us', 'dispatch@roadready.co'] },
  { h: 'Hours', links: ['Mon–Sun 7am–9pm', 'After-hours: on call', 'Holidays: 24/7'] },
  { h: 'Company', links: ['Services', 'Coverage', 'Fleet accounts', 'Careers'] },
];

// RoadReady site footer — hardcoded for now (see landing-page-design-brief.md);
// `navigation` is threaded through and tagged for Sanity's Presentation tool
// so columns/copyright can move to editable content later.
export function SiteFooter({ navigation }: SiteFooterProps) {
  return (
    <footer
      data-component="site-footer"
      data-sanity={navigation ? createDocDataAttribute(navigation).toString() : undefined}
      style={{ background: 'var(--graphite-950)', borderTop: '1px solid var(--border-default)' }}
    >
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '48px 20px 32px' }}>
        <div className="rr-footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span
                style={{
                  width: 12,
                  height: 28,
                  background: 'var(--signal-orange)',
                  clipPath: 'polygon(30% 0,100% 0,70% 100%,0 100%)',
                }}
              />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, textTransform: 'uppercase', color: 'var(--off-white)' }}>
                Road<span style={{ color: 'var(--signal-orange)' }}>Ready</span>
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 15, color: 'var(--steel-300)', maxWidth: 280 }}>
              Mobile tire &amp; roadside service across Greater Hartford. We come to you.
            </p>
            <div style={{ marginTop: 16 }}>
              <Badge tone="caution" icon="shield">
                Licensed &amp; insured · CT #48812
              </Badge>
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.h}>
              <div
                style={{
                  fontFamily: 'var(--font-condensed)',
                  fontWeight: 700,
                  fontSize: 13,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--steel-500)',
                  marginBottom: 12,
                }}
              >
                {col.h}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {col.links.map((l) => (
                  <a key={l} href="#" style={{ fontSize: 15, color: 'var(--steel-300)', textDecoration: 'none' }}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 36,
            paddingTop: 20,
            borderTop: '1px solid var(--border-default)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 13, color: 'var(--steel-500)' }}>© 2026 RoadReady Tire Co. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms', 'Deposit policy'].map((l) => (
              <a key={l} href="#" style={{ fontSize: 13, color: 'var(--steel-500)', textDecoration: 'none' }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
