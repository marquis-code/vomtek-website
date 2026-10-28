# Vomtek — public website

Nuxt 3 + TypeScript + Tailwind CSS 4 marketing site for Vomtek, a Houston
control-systems manufacturer. Includes the quote configurator, project tracker,
standard systems catalogue, Uptime Care plans, assessment funnel and editorial
field notes.

## Run

```bash
pnpm install
cp .env.example .env
pnpm dev          # http://localhost:3010
```

The API is a separate repository. Point `NUXT_PUBLIC_API_BASE` at it, or run
with the shipped fallbacks if it is unavailable.

```bash
pnpm build
pnpm preview
```

## Environment

| Variable | Default | Notes |
|---|---|---|
| `NUXT_PUBLIC_API_BASE` | `http://localhost:4010/api` | NestJS API base |
| `NUXT_PUBLIC_SITE_URL` | `https://vomtek.com` | Canonical URL |

The WhatsApp number and prefilled message, plus the WhatsApp/consultation feature
flags, are managed in Studio → Site settings → Company / Homepage.
| `NUXT_PUBLIC_ADMIN_URL` | `http://localhost:3110` | `/studio` redirect |

## Design system

- **Clash Display** for headings, subheads and navigation.
- **Satoshi** for body copy and buttons.
- **IBM Plex Mono** for technical micro-labels.
- CFML green: `#007D48`, deep `#004B2B`, mint `#DCFCE7`.
- Fonts are self-hosted in `public/fonts` and preloaded.

## Content and images

- Page copy and section ordering are driven by `/api/site`; the fallback is
  `data/siteDefaults.ts`.
- Standard systems come from `/api/catalog`; fallback in `data/catalogFallback.ts`.
- Responsive photography lives in `public/images/optimized`. Source photos are in
  `assets-source/photos`; regenerate with `pnpm images:optimize`.

## Routes

`/`, `/systems`, `/uptime-care`, `/assessment`, `/quote`, `/track`, `/services`,
`/divisions`, `/about`, `/careers`, `/insights`, `/foundation`, `/contact`.

`/studio` redirects to the separate Studio application.

## Verification

```bash
pnpm typecheck
pnpm build
```

Before launch: validate all technical claims and confirm image licences.
