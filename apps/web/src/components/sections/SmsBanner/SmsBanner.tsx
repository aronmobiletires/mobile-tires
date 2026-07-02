import { Icon } from '@/components/atoms/Icon';

export function SmsBanner() {
  return (
    <section style={{ background: 'var(--signal-orange)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '26px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20 }}>
        <span
          style={{
            display: 'flex',
            width: 52,
            height: 52,
            flex: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--graphite-950)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--signal-orange)',
          }}
        >
          <Icon name="message" size={26} />
        </span>
        <div style={{ marginRight: 'auto' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'var(--graphite-950)' }}>
            Stuck right now?
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--graphite-950)', opacity: 0.85 }}>
            Skip the form — text us your location and we&apos;ll roll.
          </div>
        </div>
        <a
          href="sms:+12035550148"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            height: 56,
            padding: '0 24px',
            background: 'var(--graphite-950)',
            color: 'var(--off-white)',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            fontFamily: 'var(--font-display)',
            fontSize: 20,
          }}
        >
          <span className="rr-numeric">(203) 555-0148</span>
          <span style={{ color: 'var(--signal-orange)', display: 'flex' }}>
            <Icon name="arrow-right" size={22} />
          </span>
        </a>
      </div>
    </section>
  );
}
