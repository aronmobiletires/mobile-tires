import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';

const QUOTES = [
  {
    q: 'Changed my blowout on I-84 in the rain in about 25 minutes. Told me the price before they rolled. No games.',
    n: 'Marcus D.',
    c: 'Waterbury',
  },
  {
    q: "Cheaper than the tow would've been, and I never left my car. Texted me the tech's name and ETA.",
    n: 'Priya S.',
    c: 'Farmington',
  },
  {
    q: 'We run six delivery vans. RoadReady is the only number we call now. Fast, billed monthly.',
    n: 'Ken O.',
    c: 'Hartford',
  },
];

function Stars({ size = 16 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, color: 'var(--caution-yellow)' }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="star" size={size} color="var(--caution-yellow)" style={{ fill: 'var(--caution-yellow)' }} />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" style={{ background: 'var(--bg-section)', borderTop: '1px solid var(--border-default)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '64px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 30 }}>
          <div>
            <div className="rr-eyebrow">The word on the shoulder</div>
            <h2
              style={{
                margin: '8px 0 0',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px,3.6vw,38px)',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                color: 'var(--off-white)',
              }}
            >
              What drivers say
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Stars size={20} />
            <span className="rr-numeric" style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--off-white)' }}>
              4.9
            </span>
            <span style={{ fontSize: 14, color: 'var(--steel-300)' }}>· 840 Google reviews</span>
          </div>
        </div>
        <div className="rr-reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {QUOTES.map((r) => (
            <Card key={r.n} padding={24} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Stars />
              <p style={{ margin: 0, fontSize: 16, color: 'var(--off-white)', lineHeight: 1.5 }}>&quot;{r.q}&quot;</p>
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-condensed)',
                    fontWeight: 700,
                    fontSize: 15,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                    color: 'var(--off-white)',
                  }}
                >
                  {r.n}
                </span>
                <span style={{ fontSize: 13, color: 'var(--steel-300)' }}>{r.c}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
