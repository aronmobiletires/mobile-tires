export type LocalBlogSection = {
  heading: string;
  paragraphs: string[];
};

export type LocalBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  sections: LocalBlogSection[];
};

const LOCAL_BLOG_POSTS: LocalBlogPost[] = [
  {
    slug: 'mobile-tire-service-vs-tire-shop',
    title: 'Mobile Tire Service vs Tire Shop: Which Is Faster in an Emergency?',
    excerpt:
      'A practical comparison of response time, convenience, and downtime when you need urgent tire help.',
    publishedAt: '2026-07-18T09:00:00.000Z',
    metaTitle: 'Mobile Tire Service vs Tire Shop in an Emergency',
    metaDescription:
      'Compare mobile tire service and tire shops for emergency flats. Learn which option is usually faster and when.',
    coverImageUrl: '/medinas/road-side-night-service.jpg',
    coverImageAlt: 'Roadside tire service at night',
    sections: [
      {
        heading: 'Speed matters first',
        paragraphs: [
          'In an emergency, the real question is how quickly your vehicle gets safely moving again. A tire shop may require towing, check-in, and queue time.',
          'Mobile tire service skips those steps by dispatching to your location with the tools needed for repair or replacement.',
        ],
      },
      {
        heading: 'When a shop still makes sense',
        paragraphs: [
          'A traditional shop can be useful for complex work beyond roadside scope, but most flat-tire emergencies are solved faster with a mobile response.',
          'If your vehicle cannot be safely driven, mobile service often avoids an additional tow and extra wait.',
        ],
      },
    ],
  },
  {
    slug: 'what-to-do-after-flat-tire',
    title: 'What to Do Right After a Flat Tire on the Roadside',
    excerpt:
      'A quick step-by-step checklist to stay safe, share the right details, and speed up mobile tire dispatch.',
    publishedAt: '2026-07-17T09:00:00.000Z',
    metaTitle: 'What To Do After a Flat Tire on the Roadside',
    metaDescription:
      'Flat tire roadside checklist: safety steps, what details to share, and how to get faster mobile tire service.',
    coverImageUrl: '/medinas/tire-repair-from-inside-truck.jpg',
    coverImageAlt: 'Technician preparing tools for a flat tire call',
    sections: [
      {
        heading: 'Start with safety',
        paragraphs: [
          'Move to a safe shoulder or parking area if possible, turn on hazard lights, and stay away from moving traffic.',
          'If conditions are unsafe, remain inside the vehicle with seatbelt on and call for help immediately.',
        ],
      },
      {
        heading: 'Share useful details',
        paragraphs: [
          'Send your exact location, vehicle info, and a photo of the damaged tire when you can. These details reduce back-and-forth and speed dispatch.',
          'If you know your tire size, include it. If not, mobile service can still proceed after inspection.',
        ],
      },
    ],
  },
  {
    slug: 'how-mobile-tire-repair-works',
    title: 'How Mobile Tire Repair Works (Step by Step)',
    excerpt:
      'From request to completion, here is the process behind a fast mobile tire repair visit.',
    publishedAt: '2026-07-16T09:00:00.000Z',
    metaTitle: 'How Mobile Tire Repair Works',
    metaDescription:
      'Learn the full mobile tire repair process from dispatch to final safety check.',
    coverImageUrl: '/medinas/tire-with-rim-replacement.jpg',
    coverImageAlt: 'Tire and wheel replacement setup',
    sections: [
      {
        heading: 'Request and triage',
        paragraphs: [
          'You share location, symptoms, and any photos. Dispatch reviews the request and confirms arrival expectations.',
          'A technician is assigned based on distance, availability, and service type.',
        ],
      },
      {
        heading: 'On-site inspection and decision',
        paragraphs: [
          'The technician inspects tire condition, puncture placement, and safety factors before recommending repair or replacement.',
          'If repair is safe, the tire is serviced and pressure checked. If not, replacement options are provided clearly.',
        ],
      },
    ],
  },
  {
    slug: 'new-tire-vs-repair',
    title: 'Do I Need a New Tire or Can It Be Repaired?',
    excerpt:
      'Understand the common rules that decide when repair is safe and when replacement is the better option.',
    publishedAt: '2026-07-15T09:00:00.000Z',
    metaTitle: 'New Tire vs Repair: How To Decide',
    metaDescription:
      'Sidewall damage, puncture size, and tread depth all matter. Here is how to know if tire repair is safe.',
    sections: [
      {
        heading: 'Repair is not always possible',
        paragraphs: [
          'Punctures in the tread area are often repairable. Sidewall and shoulder damage usually require replacement for safety.',
          'Large cuts, repeated repairs, or very worn tires are also common replacement cases.',
        ],
      },
      {
        heading: 'Ask for a clear safety explanation',
        paragraphs: [
          'A good technician will show the damage and explain why a repair is or is not safe.',
          'When replacement is recommended, ask about matching tires, tread depth, and short-term versus long-term options.',
        ],
      },
    ],
  },
  {
    slug: 'mobile-tire-service-time',
    title: 'How Long Does Mobile Tire Service Take in LA and OC?',
    excerpt:
      'Typical timing ranges for dispatch, inspection, and completion based on location and service type.',
    publishedAt: '2026-07-14T09:00:00.000Z',
    metaTitle: 'How Long Mobile Tire Service Takes in LA and OC',
    metaDescription:
      'Typical mobile tire service timing in Los Angeles and Orange County, from dispatch to completed repair.',
    sections: [
      {
        heading: 'Dispatch time varies by zone and traffic',
        paragraphs: [
          'Urban traffic and distance are the biggest timing factors. Dispatch teams usually provide ETA updates after assignment.',
          'Peak commute windows may increase travel time, but mobile service still avoids shop queue delays.',
        ],
      },
      {
        heading: 'Service duration depends on the fix',
        paragraphs: [
          'Simple repairs can be completed quickly after arrival. Replacement work may take longer depending on tire availability and fitment needs.',
          'Sharing accurate location and photos up front often shortens total turnaround.',
        ],
      },
    ],
  },
  {
    slug: 'tire-shop-near-me-alternatives',
    title: 'Why Searching Tire Shop Near Me Is Not Always the Fastest Option',
    excerpt:
      'Mobile service can reduce downtime by removing tow and waiting-room steps from urgent tire problems.',
    publishedAt: '2026-07-13T09:00:00.000Z',
    metaTitle: 'Tire Shop Near Me vs Mobile Service',
    metaDescription:
      'Why mobile tire service may beat a nearby tire shop when your vehicle cannot be driven safely.',
    sections: [
      {
        heading: 'Nearest does not always mean quickest',
        paragraphs: [
          'Even a nearby shop can involve towing, queue delays, and handoff time. Mobile service starts where your vehicle already is.',
          'For many urgent flats, that direct path is what cuts downtime the most.',
        ],
      },
      {
        heading: 'Choose by total downtime',
        paragraphs: [
          'Compare end-to-end time, not map distance alone. Include towing, wait time, and when repair actually starts.',
          'If you cannot drive safely, mobile dispatch is often the practical first call.',
        ],
      },
    ],
  },
  {
    slug: 'tire-damage-checklist',
    title: 'Tire Damage Checklist: When to Call Mobile Tire Repair',
    excerpt:
      'Use this checklist to quickly assess symptoms and decide when to request immediate mobile tire help.',
    publishedAt: '2026-07-12T09:00:00.000Z',
    metaTitle: 'Tire Damage Checklist for Mobile Repair',
    metaDescription:
      'A practical tire damage checklist to decide when mobile tire repair is needed now.',
    sections: [
      {
        heading: 'Immediate warning signs',
        paragraphs: [
          'Rapid air loss, visible sidewall damage, or steering pull are signs to stop driving and request service.',
          'Grinding on a flat can damage the wheel and increase repair cost.',
        ],
      },
      {
        heading: 'What to share with dispatch',
        paragraphs: [
          'Include your exact location, vehicle type, and one or two clear photos of the tire area.',
          'Clear details help confirm whether repair tools or replacement options are needed at dispatch.',
        ],
      },
    ],
  },
  {
    slug: 'find-tires-near-me-without-driving',
    title: 'Best Way to Find Tires Near Me When You Cannot Drive',
    excerpt:
      'If your vehicle is not drivable, here is how to get tires replaced quickly without going to a shop.',
    publishedAt: '2026-07-11T09:00:00.000Z',
    metaTitle: 'Find Tires Near Me Without Driving',
    metaDescription:
      'How to get tires replaced at your location when your car cannot be safely driven.',
    sections: [
      {
        heading: 'Use mobile replacement to avoid towing delays',
        paragraphs: [
          'When driving is unsafe, mobile tire replacement can get service started faster than arranging a separate tow.',
          'You stay at your location while a technician brings the work to you.',
        ],
      },
      {
        heading: 'Prepare tire and vehicle details',
        paragraphs: [
          'If available, share tire size and photos before dispatch. This helps confirm replacement compatibility early.',
          'If tire size is unknown, a technician can verify on-site and recommend options.',
        ],
      },
    ],
  },
];

export function getAllLocalBlogPosts(): LocalBlogPost[] {
  return LOCAL_BLOG_POSTS;
}

export function getLocalBlogPostBySlug(slug: string): LocalBlogPost | null {
  return LOCAL_BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}
