import type { CSSProperties, HTMLAttributes } from 'react';
import { Card } from '@/components/atoms/Card';
import { Icon, type IconName } from '@/components/atoms/Icon';
import Image from 'next/image';

/* ServiceCard — a service in the services grid. Icon, title, one-line
  description, and optional image. Corner-bracket framed. */
type ServiceCardProps = {
  icon: IconName;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaOpenInNewTab?: boolean;
  style?: CSSProperties;
} & HTMLAttributes<HTMLDivElement>;

export function ServiceCard({
  icon,
  title,
  description,
  imageSrc,
  imageAlt,
  ctaLabel,
  ctaHref,
  ctaOpenInNewTab,
  style,
  ...rest
}: ServiceCardProps) {
  return (
    <Card brackets padding={22} style={{ display: 'flex', flexDirection: 'column', gap: 14, ...style }} {...rest}>
      {imageSrc && (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-default)' }}>
          <Image src={imageSrc} alt={imageAlt ?? title} fill sizes="(max-width: 560px) 100vw, (max-width: 860px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
        </div>
      )}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 48,
          height: 48,
          borderRadius: 'var(--radius-sm)',
          background: 'var(--graphite-800)',
          color: 'var(--signal-orange)',
          border: '1px solid var(--border-default)',
        }}
      >
        <Icon name={icon} size={26} />
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h3
          style={{
            margin: 0,
            fontFamily: 'var(--font-condensed)',
            fontWeight: 700,
            fontSize: 20,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            color: 'var(--off-white)',
          }}
        >
          {title}
        </h3>
        <p style={{ margin: 0, fontSize: 15, color: 'var(--steel-300)', lineHeight: 1.5 }}>{description}</p>
      </div>
      {ctaLabel && ctaHref ? (
        <a
          href={ctaHref}
          target={ctaOpenInNewTab ? '_blank' : undefined}
          rel={ctaOpenInNewTab ? 'noopener noreferrer' : undefined}
          style={{
            marginTop: 6,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--font-condensed)',
            fontSize: 14,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--signal-orange)',
          }}
        >
          <span>{ctaLabel}</span>
          <Icon name="arrow-right" size={16} />
        </a>
      ) : null}
    </Card>
  );
}
