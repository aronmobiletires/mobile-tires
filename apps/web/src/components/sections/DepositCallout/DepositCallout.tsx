import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import { SectionEdge } from '@/components/atoms/SectionEdge';
import type { IconName } from '@/components/atoms/Icon';

const REASONS: { icon: IconName; t: string; d: string }[] = [
  { icon: 'clock', t: 'ETA over 35 minutes', d: "You're far enough out that we're committing a truck." },
  { icon: 'alert-triangle', t: 'After business hours', d: 'Requests outside 7am–9pm.' },
];

/* DepositCallout — no-surprise-fees transparency section. Explains the
   $70 deposit rule before the customer hits it in the quote form. */
export function DepositCallout() {
  return (
    <SectionEdge cut="top" background="var(--graphite-900)" slope={44} style={{ marginTop: -1 }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '72px 20px 64px' }}>
        <div className="rr-deposit" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <div>
            <div className="rr-eyebrow">No surprise fees</div>
            <h2
              style={{
                margin: '8px 0 14px',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px,3.6vw,38px)',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                color: 'var(--off-white)',
              }}
            >
              When the $70 deposit applies
            </h2>
            <p style={{ margin: '0 0 18px', fontSize: 17, color: 'var(--steel-300)', lineHeight: 1.55, maxWidth: 460 }}>
              Most jobs need nothing up front. We only take a deposit when we&apos;re rolling a long way or working odd
              hours — and it always goes toward your total.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {REASONS.map((r) => (
                <div key={r.t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span
                    style={{
                      display: 'flex',
                      width: 40,
                      height: 40,
                      flex: 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--graphite-800)',
                      border: '1px solid var(--border-default)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--caution-yellow)',
                    }}
                  >
                    <Icon name={r.icon} size={20} />
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-condensed)',
                        fontWeight: 700,
                        fontSize: 16,
                        textTransform: 'uppercase',
                        letterSpacing: '0.02em',
                        color: 'var(--off-white)',
                      }}
                    >
                      {r.t}
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--steel-300)' }}>{r.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Card brackets padding={30} style={{ textAlign: 'center', background: 'var(--bg-page)' }}>
            <div className="rr-eyebrow" style={{ color: 'var(--steel-300)' }}>
              Deposit, when it applies
            </div>
            <div className="rr-numeric" style={{ fontFamily: 'var(--font-display)', fontSize: 84, lineHeight: 1, color: 'var(--caution-yellow)', margin: '8px 0' }}>
              $70
            </div>
            <p style={{ margin: '0 auto', maxWidth: 300, fontSize: 15, color: 'var(--steel-300)' }}>
              Applied to your final bill. Under 35 min and within hours?{' '}
              <span style={{ color: 'var(--signal-green)', fontWeight: 600 }}>$0 up front.</span>
            </p>
          </Card>
        </div>
      </div>
    </SectionEdge>
  );
}
