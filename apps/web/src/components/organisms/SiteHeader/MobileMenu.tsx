'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/atoms/Icon';

const DISPATCH_PHONE_HREF = 'tel:+16265887122';
const DISPATCH_PHONE_LABEL = '(626) 588-7122';

type NavLink = {
  label: string;
  href: string | null;
  openInNewTab: boolean | null;
};

type MobileMenuProps = {
  links: NavLink[];
};

export function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="rr-mobile-menu-btn"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 44,
          height: 44,
          background: 'transparent',
          border: 'none',
          color: 'var(--off-white)',
          cursor: 'pointer',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        <Icon name={open ? 'x' : 'menu'} size={24} />
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(18,19,22,0.97)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--border-default)',
            display: 'flex',
            flexDirection: 'column',
            padding: '12px 20px 20px',
            gap: 4,
            zIndex: 19,
          }}
        >
          {links.map(({ label, href, openInNewTab }) => (
            <a
              key={href ?? label}
              href={href ?? '#'}
              target={openInNewTab ? '_blank' : undefined}
              rel={openInNewTab ? 'noopener noreferrer' : undefined}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 18,
                fontWeight: 500,
                color: 'var(--steel-300)',
                textDecoration: 'none',
                padding: '12px 0',
                borderBottom: '1px solid var(--border-default)',
              }}
            >
              {label}
            </a>
          ))}
          <a
            href={DISPATCH_PHONE_HREF}
            style={{
              marginTop: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              color: 'var(--signal-orange)',
              textDecoration: 'none',
            }}
          >
            <Icon name="phone" size={20} />
            {DISPATCH_PHONE_LABEL}
          </a>
        </nav>
      )}
    </>
  );
}
