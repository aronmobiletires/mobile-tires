import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms that govern use of Medina\'s Mobile Tire Service website and roadside services.',
};

const LAST_UPDATED = 'July 12, 2026';

export default function TermsPage() {
  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '48px 20px 72px' }}>
      <h1 style={{ margin: '0 0 12px', fontSize: 36, lineHeight: 1.15 }}>Terms of Service</h1>
      <p style={{ margin: '0 0 28px', color: 'var(--steel-300)' }}>Last updated: {LAST_UPDATED}</p>

      <p style={{ margin: '0 0 24px' }}>
        By requesting service or using this website, you agree to these terms.
      </p>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>Service Availability</h2>
        <p style={{ margin: 0 }}>
          Service areas, arrival times, and availability depend on technician capacity, road conditions,
          weather, and safety constraints.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>Quotes And Payments</h2>
        <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8 }}>
          <li>Quoted pricing may change if actual on-site conditions differ from submitted details.</li>
          <li>Deposits may be required before dispatch or parts ordering.</li>
          <li>Final payment is due at completion unless otherwise agreed in writing.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>User Responsibilities</h2>
        <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8 }}>
          <li>Provide accurate contact, vehicle, and location information.</li>
          <li>Ensure legal and safe access to the vehicle.</li>
          <li>Disclose roadside hazards when requesting freeway or emergency service.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>Cancellations And No-Shows</h2>
        <p style={{ margin: 0 }}>
          Last-minute cancellations or inaccessible vehicles may result in a service fee.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>Warranty And Liability</h2>
        <p style={{ margin: '0 0 10px' }}>
          Any workmanship warranty, if provided, applies only to the specific service performed and does
          not cover unrelated mechanical issues, misuse, or normal wear.
        </p>
        <p style={{ margin: 0 }}>
          To the fullest extent allowed by law, liability is limited to the amount paid for the specific
          service at issue.
        </p>
      </section>

      <section>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>Contact</h2>
        <p style={{ margin: 0 }}>
          Questions about these terms can be sent to aronmobiletires@gmail.com.
        </p>
      </section>
    </main>
  );
}
