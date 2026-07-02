import { TrustMarker } from '@/components/molecules/TrustMarker';
import { QuoteForm } from './QuoteForm';

/* RoadReady landing — hero. Headline + subhead + trust markers on the left,
   the quote form as the visual anchor on the right. Stacks on mobile. */
export function Hero() {
  return (
    <section id="top" className="rr-tread" style={{ position: 'relative', background: 'var(--bg-page)', paddingBottom: 8 }}>
      <div
        className="rr-hero-grid"
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '48px 20px 40px',
          display: 'grid',
          gap: 40,
          alignItems: 'start',
        }}
      >
        {/* Left: message */}
        <div>
          <div className="rr-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 22, height: 2, background: 'var(--caution-yellow)' }} />
            Mobile tire &amp; roadside service
          </div>
          <h1
            style={{
              margin: '16px 0 0',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 64px)',
              lineHeight: 0.98,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--off-white)',
            }}
          >
            Flat tire?
            <br />
            <span style={{ color: 'var(--signal-orange)' }}>We come to you.</span>
          </h1>
          <p style={{ margin: '18px 0 0', maxWidth: 460, fontSize: 19, fontWeight: 500, color: 'var(--off-white)' }}>
            We&apos;ll be there in under 35 minutes — or your deposit&apos;s waived. Flat repair, replacement, and roadside help,
            wherever you&apos;re stuck.
          </p>
          <div className="rr-hero-trust" style={{ display: 'flex', flexWrap: 'wrap', gap: 26, marginTop: 26 }}>
            <TrustMarker icon="map-pin" value="Greater Hartford" label="Service area" />
            <TrustMarker icon="clock" value="28 min" label="Avg response" />
            <TrustMarker icon="shield" value="24/7" label="Day or night" />
          </div>
        </div>

        {/* Right: form anchor */}
        <div style={{ position: 'relative' }}>
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
