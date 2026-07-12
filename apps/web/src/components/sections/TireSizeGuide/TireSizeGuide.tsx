import { Card } from '@/components/atoms/Card';
import { TireSizeDiagram } from '@/components/molecules/TireSizeDiagram';
import type { HomepageQueryResult } from '@/sanity.types';

type PageSection = NonNullable<NonNullable<HomepageQueryResult>['sections']>[number];
export type TireSizeGuideSectionProps = Extract<PageSection, { _type: 'tireSizeGuide' }>;

export function TireSizeGuide({ eyebrow, heading, body, exampleSize }: TireSizeGuideSectionProps) {
  return (
    <section id="tire-size" aria-labelledby="tire-size-heading" style={{ background: 'var(--bg-page)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '64px 20px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          {eyebrow && <div className="rr-eyebrow">{eyebrow}</div>}
          <h2
            id="tire-size-heading"
            style={{
              margin: '8px 0 8px',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px,3.6vw,38px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: 'var(--off-white)',
            }}
          >
            {heading}
          </h2>
          {body && (
            <p style={{ margin: 0, fontSize: 16, color: 'var(--steel-300)' }}>
              {body}
            </p>
          )}
        </div>
        <div style={{ maxWidth: 480, margin: '32px auto 0' }}>
          <Card brackets padding={24}>
            <TireSizeDiagram size={exampleSize ?? undefined} />
          </Card>
        </div>
      </div>
    </section>
  );
}
