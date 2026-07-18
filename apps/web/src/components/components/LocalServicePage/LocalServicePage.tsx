import Link from 'next/link';
import type { LocalServicePage } from '@/lib/localContent/servicePages';

type LocalServicePageProps = {
  page: LocalServicePage;
};

const REQUEST_LINK = '/#request-service';
const BLOG_LINK = '/blog';

export function LocalServicePage({ page }: LocalServicePageProps) {
  return (
    <main>
      <section
        style={{
          borderBottom: '1px solid var(--border-default)',
          background: 'linear-gradient(180deg, var(--graphite-900) 0%, var(--graphite-950) 100%)',
        }}
      >
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '56px 20px 48px' }}>
          <p className="rr-eyebrow" style={{ margin: 0 }}>Mobile tire service</p>
          <h1
            style={{
              margin: '10px 0 12px',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(30px, 5vw, 52px)',
              lineHeight: 1.08,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}
          >
            {page.heroTitle}
          </h1>
          <p style={{ margin: 0, maxWidth: 860, color: 'var(--steel-300)', fontSize: 18, lineHeight: 1.55 }}>
            {page.heroBody}
          </p>
          <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link
              href={REQUEST_LINK}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 48,
                padding: '0 20px',
                border: '2px solid var(--signal-orange)',
                background: 'var(--signal-orange)',
                color: 'var(--graphite-950)',
                fontFamily: 'var(--font-condensed)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Request service
            </Link>
            <Link
              href={BLOG_LINK}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 48,
                padding: '0 20px',
                border: '2px solid var(--border-strong)',
                color: 'var(--off-white)',
                fontFamily: 'var(--font-condensed)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Read guides
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '40px 20px 16px' }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(24px, 3.8vw, 34px)' }}>Why drivers choose us</h2>
          <ul style={{ margin: '16px 0 0', paddingLeft: 18, color: 'var(--steel-300)', lineHeight: 1.7 }}>
            {page.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '18px 20px 56px' }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(24px, 3.8vw, 34px)' }}>Frequently asked questions</h2>
          <div style={{ marginTop: 16, display: 'grid', gap: 14 }}>
            {page.faqs.map((faq) => (
              <article key={faq.question} style={{ border: '1px solid var(--border-default)', padding: 16 }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>{faq.question}</h3>
                <p style={{ margin: 0, color: 'var(--steel-300)', lineHeight: 1.6 }}>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
