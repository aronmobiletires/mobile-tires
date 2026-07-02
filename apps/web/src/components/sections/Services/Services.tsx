import { ServiceCard } from '@/components/molecules/ServiceCard';
import type { IconName } from '@/components/atoms/Icon';

const SERVICES: { icon: IconName; title: string; description: string; price?: string }[] = [
  { icon: 'wrench', title: 'Flat tire repair', description: 'Patched or plugged on-site in most cases. Back on the road, not on a flatbed.', price: '$49' },
  { icon: 'gauge', title: 'Mobile tire replacement', description: 'We bring the tire, mount and balance it where you are.', price: '$89' },
  { icon: 'navigation', title: 'Roadside assistance', description: 'Jump-start, lockout, fuel delivery, spare swap. One number for all of it.', price: '$59' },
  { icon: 'truck', title: 'Fleet / commercial', description: 'Priority dispatch and monthly billing for vans, box trucks and fleets.' },
];

export function Services() {
  return (
    <section id="services" style={{ background: 'var(--bg-section)', borderTop: '1px solid var(--border-default)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '64px 20px' }}>
        <div className="rr-eyebrow">What we do</div>
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
          Services
        </h2>
        <div className="rr-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
