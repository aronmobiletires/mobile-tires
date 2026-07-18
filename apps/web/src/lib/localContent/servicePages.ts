export type LocalServiceFaq = {
  question: string;
  answer: string;
};

export type LocalServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroBody: string;
  highlights: string[];
  faqs: LocalServiceFaq[];
};

const SERVICE_PAGES: LocalServicePage[] = [
  {
    slug: 'mobile-tire-service',
    title: 'Mobile Tire Service Near You',
    metaTitle: 'Mobile Tire Service Near You | Medina\'s Mobile Tire Service',
    metaDescription:
      'Mobile tire service at your home, work, or roadside location in Los Angeles and Orange County. Fast dispatch and honest pricing.',
    heroTitle: 'Mobile Tire Service Near You',
    heroBody:
      'Need tire help now? Our mobile tire service comes to your location with the tools to repair or replace your tire on-site. No towing. No waiting room.',
    highlights: [
      'On-site tire repair and replacement',
      'Service at home, office, or roadside',
      'Fast response across Los Angeles and Orange County',
      'Simple quote and dispatch by phone or form',
    ],
    faqs: [
      {
        question: 'How fast can a technician arrive?',
        answer:
          'Arrival time depends on traffic and distance, but most requests are handled same day. We confirm ETA by text or phone once dispatched.',
      },
      {
        question: 'Do you service apartments and office parking lots?',
        answer:
          'Yes. We service residential and commercial locations as long as there is safe access for the service truck.',
      },
      {
        question: 'What should I have ready before service?',
        answer:
          'Share your location, tire size if known, and a quick photo of the damaged tire when possible. This helps us prepare the right equipment.',
      },
    ],
  },
  {
    slug: 'mobile-tire-repair',
    title: 'Mobile Tire Repair Near You',
    metaTitle: 'Mobile Tire Repair Near You | Flat Tire Help On-Site',
    metaDescription:
      'Get mobile tire repair near you for punctures and flats. We come to your location and repair tires on-site when safely repairable.',
    heroTitle: 'Mobile Tire Repair Near You',
    heroBody:
      'Flat tire at home or on the road? We provide mobile tire repair where you are. If the tire can be safely repaired, we handle it on-site and get you back moving.',
    highlights: [
      'Flat tire diagnosis and repair on-site',
      'Patch and plug options when appropriate',
      'Clear recommendation if replacement is safer',
      'Roadside-friendly process with fast updates',
    ],
    faqs: [
      {
        question: 'Can every flat tire be repaired?',
        answer:
          'No. Sidewall damage, severe wear, or large punctures may require replacement. Safety is the first decision point on every job.',
      },
      {
        question: 'Do you repair run-flat tires?',
        answer:
          'Some run-flat tires can be repaired depending on damage and manufacturer guidance. We inspect first and advise clearly.',
      },
      {
        question: 'Will you tell me if replacement is needed?',
        answer:
          'Yes. If repair is not safe, we explain why and provide replacement options.',
      },
    ],
  },
  {
    slug: 'tire-repair-near-me',
    title: 'Tire Repair Near Me',
    metaTitle: 'Tire Repair Near Me | Mobile Roadside Tire Repair',
    metaDescription:
      'Searching for tire repair near me? Our mobile team repairs flat tires at your location in LA and Orange County.',
    heroTitle: 'Tire Repair Near Me',
    heroBody:
      'When you search for tire repair near me, speed matters. Our mobile team comes directly to you and handles repair without the tow or shop wait.',
    highlights: [
      'No tow needed for most flat tire calls',
      'Roadside and driveway tire repair',
      'Text-friendly updates and ETA',
      'Local coverage across major LA and OC zones',
    ],
    faqs: [
      {
        question: 'Do I need to drive to a shop first?',
        answer:
          'No. We come to your location and perform the repair there whenever conditions allow safe service.',
      },
      {
        question: 'Can you repair tires at night?',
        answer:
          'Yes, we handle after-hours requests. Availability depends on dispatcher capacity and location.',
      },
      {
        question: 'What payment methods are available?',
        answer:
          'Payment details are confirmed at booking. Deposits may apply for longer-distance or after-hours dispatches.',
      },
    ],
  },
  {
    slug: 'mobile-tire-service-near-me',
    title: 'Mobile Tire Service Near Me in LA and OC',
    metaTitle: 'Mobile Tire Service Near Me in Los Angeles & Orange County',
    metaDescription:
      'Mobile tire service near me for Los Angeles and Orange County drivers. We dispatch local technicians to your location.',
    heroTitle: 'Mobile Tire Service Near Me in LA and OC',
    heroBody:
      'Looking for mobile tire service near me? We cover Los Angeles and Orange County with local dispatch and straightforward service updates.',
    highlights: [
      'Built for urgent roadside tire calls',
      'Local dispatch across LA and Orange County',
      'Service for personal and commercial vehicles',
      'Simple process: request, confirm, dispatch, complete',
    ],
    faqs: [
      {
        question: 'Which cities do you cover?',
        answer:
          'We cover a broad LA and OC service area. Share your location and we confirm coverage immediately.',
      },
      {
        question: 'Can I schedule for later instead of immediate service?',
        answer:
          'Yes. You can request same-day or scheduled service depending on technician availability.',
      },
      {
        question: 'Do you service fleets?',
        answer:
          'Yes. We provide mobile tire support for commercial and fleet vehicles.',
      },
    ],
  },
  {
    slug: 'tire-shop-near-me',
    title: 'Tire Shop Near Me (Without the Wait)',
    metaTitle: 'Tire Shop Near Me Alternative | Mobile Tire Service',
    metaDescription:
      'Skip the line at a tire shop near me. Our mobile tire technicians come to your location for repair and replacement.',
    heroTitle: 'Tire Shop Near Me Without the Wait',
    heroBody:
      'If you are searching for a tire shop near me, mobile service can be faster. We bring the service to you so you can avoid towing and long shop queues.',
    highlights: [
      'No waiting room or tow truck required',
      'On-site tire support where your vehicle is parked',
      'Repair-first recommendations when safe',
      'Replacement options when repair is not possible',
    ],
    faqs: [
      {
        question: 'Is mobile service more expensive than a tire shop?',
        answer:
          'Pricing depends on service type, tire, and location. We provide clear pricing before dispatch so there are no surprises.',
      },
      {
        question: 'Can you replace multiple tires at once?',
        answer:
          'Yes. Multi-tire jobs can be handled based on stock and appointment details.',
      },
      {
        question: 'Do you provide emergency roadside service?',
        answer:
          'Yes. We prioritize urgent roadside requests and provide ETA updates as soon as dispatch is confirmed.',
      },
    ],
  },
  {
    slug: 'tires-near-me',
    title: 'Tires Near Me - Mobile Tire Replacement',
    metaTitle: 'Tires Near Me | Mobile Tire Replacement at Your Location',
    metaDescription:
      'Need tires near me? Get mobile tire replacement and installation at your location in Los Angeles and Orange County.',
    heroTitle: 'Tires Near Me, Installed Where You Are',
    heroBody:
      'When you need tires near me but cannot drive safely, we bring replacement service to your location. We install and verify before you get back on the road.',
    highlights: [
      'Mobile tire replacement and installation',
      'Service at home, office, or roadside',
      'Guidance on when replacement is required',
      'Fast dispatch with clear communication',
    ],
    faqs: [
      {
        question: 'Can I replace one tire or do I need a pair?',
        answer:
          'It depends on tread depth and drivetrain. We explain the safest option for your vehicle before work begins.',
      },
      {
        question: 'Do you install customer-provided tires?',
        answer:
          'Yes, in many cases. We confirm tire size and condition before scheduling service.',
      },
      {
        question: 'Do you check tire pressure and fitment after install?',
        answer:
          'Yes. We verify install quality and pressure before closing out the service.',
      },
    ],
  },
];

export function getAllLocalServicePages(): LocalServicePage[] {
  return SERVICE_PAGES;
}

export function getLocalServicePageBySlug(slug: string): LocalServicePage | null {
  return SERVICE_PAGES.find((page) => page.slug === slug) ?? null;
}
