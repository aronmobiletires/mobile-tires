import { Coverage } from '@/components/sections/Coverage';
import { DepositCallout } from '@/components/sections/DepositCallout';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Reviews } from '@/components/sections/Reviews';
import { Services } from '@/components/sections/Services';
import { SmsBanner } from '@/components/sections/SmsBanner';
import { TrustBar } from '@/components/sections/TrustBar';

/* RoadReady landing — the homepage section stack. Hardcoded for now (see
   landing-page-design-brief.md); each section is a candidate to migrate
   into a Sanity section schema + Sections.tsx dispatcher entry once the
   layout is locked in and copy needs to be editable. */
export function LandingPage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Services />
      <DepositCallout />
      <Coverage />
      <Reviews />
      <SmsBanner />
    </>
  );
}
