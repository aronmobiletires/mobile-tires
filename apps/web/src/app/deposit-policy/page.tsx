import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deposit Policy',
  description: 'Deposit rules for dispatch, parts reservation, and service scheduling.',
};

const LAST_UPDATED = 'July 12, 2026';

export default function DepositPolicyPage() {
  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '48px 20px 72px' }}>
      <h1 style={{ margin: '0 0 12px', fontSize: 36, lineHeight: 1.15 }}>Deposit Policy</h1>
      <p style={{ margin: '0 0 28px', color: 'var(--steel-300)' }}>Last updated: {LAST_UPDATED}</p>

      <p style={{ margin: '0 0 24px' }}>
        Deposits help reserve technician time and secure inventory for urgent roadside service.
      </p>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>When A Deposit Is Required</h2>
        <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8 }}>
          <li>Same-day emergency dispatch requests.</li>
          <li>Special-order tire or part reservations.</li>
          <li>After-hours or freeway callouts.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>How Deposits Are Applied</h2>
        <p style={{ margin: 0 }}>
          Your deposit is credited toward the final service total shown on your invoice.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>Refunds</h2>
        <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8 }}>
          <li>Fully refundable if we cannot provide service in your area or timeframe.</li>
          <li>May be non-refundable after parts are ordered or dispatch is confirmed.</li>
          <li>No-show or unsafe-site cancellations may forfeit part or all of the deposit.</li>
        </ul>
      </section>

      <section>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>Questions</h2>
        <p style={{ margin: 0 }}>
          Contact aronmobiletires@gmail.com with any deposit or refund questions before booking.
        </p>
      </section>
    </main>
  );
}
