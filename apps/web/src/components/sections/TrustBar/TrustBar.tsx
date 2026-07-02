import { TrustMarker } from '@/components/molecules/TrustMarker';
import type { IconName } from '@/components/atoms/Icon';

const ITEMS: { icon: IconName; value: string; label: string }[] = [
  { icon: 'map-pin', value: '40+ towns', label: 'Greater Hartford & I-84' },
  { icon: 'clock', value: '28 min', label: 'Avg dispatch time' },
  { icon: 'wrench', value: '12,000+', label: 'Jobs completed since 2016' },
  { icon: 'shield', value: 'Licensed & insured', label: 'CT reg. #48812' },
];

export function TrustBar() {
  return (
    <section
      style={{
        background: 'var(--bg-section)',
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '22px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 28,
          justifyContent: 'space-between',
        }}
      >
        {ITEMS.map((i) => (
          <TrustMarker key={i.label} {...i} />
        ))}
      </div>
    </section>
  );
}
