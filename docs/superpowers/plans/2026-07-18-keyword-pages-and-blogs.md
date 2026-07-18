# Keyword-Based Service Pages and Blog Rollout (2026-07-18)

Goal: convert the highest-volume search terms into dedicated service pages and supporting blog content.

## Source keyword breakdown

1. mobile tire service (777)
2. tire shop near me (270)
3. mobile tire repair (248)
4. mobile tire repair near me (241)
5. mobile tire service near me (209)
6. tire repair near me (83)
7. tires near me (18)

Total tracked volume: 1846

## Strategy summary

- Build dedicated service pages for the strongest commercial-intent terms.
- Use blog posts to support long-tail intent and internal linking to service pages.
- Add CTA links on homepage service cards to route users to the matching service page.
- Prioritize local intent by adding city/area mentions in every page title, H1, and FAQ.

## Service pages to create in Sanity

Create these as websitePage documents. Use existing sections: heroSection, trustBar, servicesSection, reviewsSection, coverageSection, richText, smsBanner.

| Priority | Primary keyword target | Recommended slug | Suggested page title | Meta description idea |
|---|---|---|---|---|
| P1 | mobile tire service | /mobile-tire-service | Mobile Tire Service Near You | On-site tire help in Los Angeles and Orange County. Fast dispatch for flats, replacements, and roadside tire issues. |
| P1 | mobile tire repair | /mobile-tire-repair | Mobile Tire Repair Near You | Fast mobile tire repair at your location. Patch, plug, and repair support with same-day dispatch. |
| P1 | tire repair near me | /tire-repair-near-me | Tire Repair Near Me | Need tire repair now? We come to you with mobile tools and quick roadside service. |
| P2 | mobile tire service near me | /mobile-tire-service-near-me | Mobile Tire Service Near Me in LA and OC | Looking for mobile tire service near you? Get on-site tire support from local technicians. |
| P2 | tire shop near me | /tire-shop-near-me | Tire Shop Near Me (Without the Wait) | Skip the tow and shop line. Mobile tire technicians come to your home, work, or roadside location. |
| P3 | tires near me | /tires-near-me | Tires Near Me - Mobile Tire Replacement | Buy and install tires at your location with mobile replacement and balancing support. |

Notes:
- Keep one clear primary keyword per page.
- Add 3-5 FAQ items per page that include natural language variants of near me terms.
- Include strong local modifiers: Los Angeles, Orange County, and top service cities.

## Blog posts to create in Sanity

Create these as blogPost documents and link each post to one primary service page.

| Priority | Blog post title | Recommended slug | Main target query | Primary service page to link |
|---|---|---|---|---|
| P1 | Mobile Tire Service vs Tire Shop: Which Is Faster in an Emergency? | /blog/mobile-tire-service-vs-tire-shop | mobile tire service, tire shop near me | /mobile-tire-service |
| P1 | What to Do Right After a Flat Tire on the Roadside | /blog/what-to-do-after-flat-tire | mobile tire repair, tire repair near me | /mobile-tire-repair |
| P1 | How Mobile Tire Repair Works (Step by Step) | /blog/how-mobile-tire-repair-works | mobile tire repair near me | /mobile-tire-repair |
| P2 | Do I Need a New Tire or Can It Be Repaired? | /blog/new-tire-vs-repair | tire repair near me, tires near me | /tires-near-me |
| P2 | How Long Does Mobile Tire Service Take in LA and OC? | /blog/mobile-tire-service-time | mobile tire service near me | /mobile-tire-service-near-me |
| P2 | Why Searching Tire Shop Near Me Is Not Always the Fastest Option | /blog/tire-shop-near-me-alternatives | tire shop near me | /tire-shop-near-me |
| P3 | Tire Damage Checklist: When to Call Mobile Tire Repair | /blog/tire-damage-checklist | mobile tire repair | /mobile-tire-repair |
| P3 | Best Way to Find Tires Near Me When You Cannot Drive | /blog/find-tires-near-me-without-driving | tires near me | /tires-near-me |

## Internal linking rules

- Homepage services section:
  - Mobile Tire Service card -> /mobile-tire-service
  - Mobile Tire Repair card -> /mobile-tire-repair
  - Tire Repair card -> /tire-repair-near-me
  - Tire Replacement card -> /tires-near-me
- Every blog post should link to one primary service page in the first 25 percent of content.
- Every service page should link to 2-3 related blog posts in a short "Helpful Guides" block.

## Recommended 4-week publishing order

Week 1
- Publish: /mobile-tire-service
- Publish: /mobile-tire-repair
- Publish blog: /blog/how-mobile-tire-repair-works

Week 2
- Publish: /tire-repair-near-me
- Publish blog: /blog/what-to-do-after-flat-tire
- Publish blog: /blog/mobile-tire-service-vs-tire-shop

Week 3
- Publish: /tire-shop-near-me
- Publish: /mobile-tire-service-near-me
- Publish blog: /blog/tire-shop-near-me-alternatives

Week 4
- Publish: /tires-near-me
- Publish blog: /blog/new-tire-vs-repair
- Publish blog: /blog/mobile-tire-service-time

## Implementation checklist

- Create websitePage documents for all service slugs above.
- Create blogPost documents for all suggested posts above.
- In homepage servicesSection, set Card link on each service card to the corresponding page.
- Add those service pages to header or footer navigation where appropriate.
- Keep noIndex disabled for these pages/posts so they are included in sitemap.

## Done in code for this plan

The services section schema now supports optional Card link fields, and the web query/UI render those links. This lets each service card send users directly to the new dedicated service pages.
