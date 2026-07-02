# Sanity Marketing Starter

Opinionated starter for marketing sites: Next.js 15 + Sanity Studio v5 + Storybook, wired together as a pnpm + Turborepo monorepo. Comes with live preview, Sanity Presentation tool, SEO foundations, and a Studio structure pattern ready for editors.

> Read [CLAUDE.md](./CLAUDE.md) for the full conventions (schema layout, TypeGen workflow, atomic component structure, gotchas) before contributing.

## What's in the box

- **Next.js 15** App Router with a `[[...slug]]` catch-all that fetches pages from Sanity
- **Sanity Studio v5** standalone, with a Custom Structure Builder, singletons, and the Presentation tool wired up
- **Storybook 10** (Vite-based) living inside the web app, ready to document atoms / molecules / organisms / sections / components
- **Tailwind CSS v4** with CSS-first `@theme` config in `globals.css`
- **Sanity TypeGen** producing typed query results from your schema
- **Live preview** via `defineLive` + `<SanityLive>` + `<VisualEditing>`
- **SEO foundations**: `robots.ts`, `sitemap.ts` (generated from Sanity slugs), and Sanity-backed redirects via middleware
- **GitHub Actions CI** running type-check + lint on every PR
- **Vercel configs** for both apps

## Stack lock

| Tool | Version | Notes |
|---|---|---|
| Next.js | **15.x** | Don't upgrade to 16 yet — known prefetch-cascade issue with next-sanity multiplies request volume 4–10×. Re-evaluate when Sanity ships the fix. |
| React | 19.x | |
| Sanity Studio | 5.x | |
| next-sanity | 11.x | Pairs with Next 15 lock |
| Storybook | 10.x | |
| Tailwind CSS | 4.x | |
| TypeScript | 5.x | |
| Turborepo | 2.x | |
| pnpm | 10.x | |
| Node | 22 LTS | See `.nvmrc` |

## Using this starter for a new project

1. **Clone (or fork) this repo**

   ```bash
   git clone <starter-url> my-new-project
   cd my-new-project
   ```

2. **Create a Sanity project** at <https://www.sanity.io/manage> — note the project ID.

3. **Set environment variables**

   Copy the example files and fill in your project values:

   ```bash
   cp apps/studio/.env.example apps/studio/.env
   cp apps/web/.env.example apps/web/.env.local
   ```

   Open each file and replace `your-sanity-project-id` with your real project ID. Inline comments in each file describe every variable.

4. **Update project metadata**

   - Root `package.json` → change `name` and `description`
   - Optionally update the title in `apps/studio/sanity.config.ts` via `SANITY_STUDIO_TITLE` env var

5. **Install + run**

   ```bash
   nvm use            # node 22
   pnpm install
   pnpm dev:web       # → http://localhost:3000
   pnpm dev:studio    # → http://localhost:3333
   pnpm storybook     # → http://localhost:6006
   ```

## Repository layout

```
.
├── apps/
│   ├── web/                    # Next.js 15 frontend + Storybook
│   │   ├── .storybook/
│   │   └── src/
│   │       ├── app/            # Routes, robots.ts, sitemap.ts, draft-mode API
│   │       ├── components/     # Atomic design system
│   │       │   ├── atoms/
│   │       │   ├── molecules/
│   │       │   ├── organisms/  # SiteHeader, SiteFooter, etc.
│   │       │   ├── sections/   # Page-level sections (richText, etc.)
│   │       │   └── components/
│   │       ├── lib/sanity/     # client, live, queries, image, dataAttribute
│   │       ├── middleware.ts   # Sanity-backed redirects
│   │       └── sanity.types.ts # GENERATED — do not edit
│   └── studio/                 # Sanity Studio v5
│       ├── schemas/
│       │   ├── documents/      # websitePage, siteSettings, header/footer nav, redirect
│       │   ├── objects/        # seo, pageSettings, link
│       │   └── sections/       # richText
│       └── structure/          # Custom Structure Builder
└── packages/                   # Reserved for future shared packages
```

## Common tasks

```bash
pnpm build                          # Build everything
pnpm check-types                    # Type-check all workspaces
pnpm lint                           # Lint all workspaces
pnpm format                         # Prettier across the repo
pnpm --filter studio typegen:all    # Regenerate Sanity types after schema changes
```

## Sanity Studio

- Project ID + dataset come from env (no hardcoded fallback) — set them before the studio will boot
- The Studio structure (`apps/studio/structure/index.ts`) groups singletons (Homepage, Site Settings, Header Nav, Footer Nav) and exposes Redirects as a top-level entry
- Presentation tool is pre-wired — editors click "Open Preview" on any document to get a split-pane preview against the web app

## Deployment

Two separate Vercel projects from the same repo:

| Project | Root Directory | Notes |
|---|---|---|
| Web | `apps/web` | Vercel auto-detects Next.js |
| Studio | `apps/studio` | `vercel.json` configures `sanity build` + SPA rewrites |

**Web project env vars** (Vercel UI):

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SANITY_STUDIO_URL`
- `SANITY_API_READ_TOKEN` (Viewer-role, server-only)

**Studio project env vars**:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_PREVIEW_URL` (the deployed web URL)
- `SANITY_STUDIO_TITLE` (optional)

**Sanity CORS origins** — add in <https://www.sanity.io/manage> → API → CORS:

- `http://localhost:3000` (local web, with credentials)
- The deployed web URL (with credentials)
- Production custom domain when set

## Git workflow

Work from a `feat/` or `fix/` branch. A pre-commit hook refuses commits made directly on `main`. Conventional commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`, `style:`).
