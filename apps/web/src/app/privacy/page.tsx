import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Medina\'s Mobile Tire Service collects, uses, and protects personal information.',
};

const LAST_UPDATED = 'July 12, 2026';

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '48px 20px 72px' }}>
      <h1 style={{ margin: '0 0 12px', fontSize: 36, lineHeight: 1.15 }}>Privacy Policy</h1>
      <p style={{ margin: '0 0 28px', color: 'var(--steel-300)' }}>Last updated: {LAST_UPDATED}</p>

      <p style={{ margin: '0 0 24px' }}>
        This policy explains what information we collect when you request service, why we collect it,
        and your choices about that information.
      </p>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>Information We Collect</h2>
        <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8 }}>
          <li>Contact details you provide, including name and phone number.</li>
          <li>Service details, such as tire issue, vehicle notes, and location details.</li>
          <li>Photos you choose to upload for diagnostics.</li>
          <li>Operational logs needed to provide customer support and safety records.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>How We Use Information</h2>
        <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8 }}>
          <li>To dispatch technicians and communicate about your service request.</li>
          <li>To provide estimates, perform work, and document completed services.</li>
          <li>To prevent abuse, fraud, and misuse of our services.</li>
          <li>To comply with legal obligations and enforce our terms.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>Cookies And Tracking</h2>
        <p style={{ margin: '0 0 10px' }}>
          We currently use only essential cookies needed for website operation and editor preview
          functionality. We do not currently run advertising or analytics tracking scripts that set
          non-essential cookies.
        </p>
        <p style={{ margin: 0 }}>
          If that changes, we will update this policy and deploy consent controls before non-essential
          cookies are enabled.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>Sharing And Service Providers</h2>
        <p style={{ margin: '0 0 10px' }}>
          We share information only as needed to operate the service, such as messaging, email,
          hosting, and infrastructure providers acting on our behalf.
        </p>
        <p style={{ margin: 0 }}>
          We do not sell personal information.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>Your Rights</h2>
        <p style={{ margin: '0 0 10px' }}>
          Depending on your location, you may have rights to access, correct, delete, or restrict the
          use of your personal information.
        </p>
        <p style={{ margin: 0 }}>
          To submit a request, contact us at aronmobiletires@gmail.com.
        </p>
      </section>

      <section>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>Contact</h2>
        <p style={{ margin: 0 }}>
          Questions about this policy can be sent to aronmobiletires@gmail.com.
        </p>
      </section>
    </main>
  );
}
