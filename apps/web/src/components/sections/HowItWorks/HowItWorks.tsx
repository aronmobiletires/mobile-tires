import { Fragment } from 'react';
import { StepItem } from '@/components/molecules/StepItem';
import { TreadDivider } from '@/components/atoms/TreadDivider';

const STEPS = [
  { n: 1, t: 'Request a tech', d: 'Fill the form or text us. Share your location — GPS is fastest.', active: true },
  { n: 2, t: 'We locate & dispatch', d: "You'll see a live ETA the moment a technician rolls toward you." },
  {
    n: 3,
    t: 'Deposit only if it applies',
    d: "$70 deposit only when the ETA runs over 35 min or it's after hours. Otherwise, nothing up front.",
  },
  { n: 4, t: 'Fixed on-site, pay the balance', d: "We fix it where you're parked. Pay the rest when the job's done." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: 'var(--bg-page)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '64px 20px' }}>
        <div className="rr-eyebrow">The process</div>
        <h2
          style={{
            margin: '8px 0 32px',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px,4vw,40px)',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            color: 'var(--off-white)',
          }}
        >
          How it works
        </h2>
        <div className="rr-steps" style={{ display: 'grid', gap: 0 }}>
          {STEPS.map((s, idx) => (
            <Fragment key={s.n}>
              <StepItem number={s.n} title={s.t} active={s.active} style={{ padding: '4px 0' }}>
                {s.d}
              </StepItem>
              {idx < STEPS.length - 1 && <TreadDivider style={{ margin: '18px 0' }} />}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
