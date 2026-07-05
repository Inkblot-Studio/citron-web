# Citron Web

Marketing site for **Citron** — the AI-powered Business Operating System — by [Inkblot Studio](https://inkblotstudio.eu).

## Overview

A cinematic, chapter-based product story with a traveling Citron mascot guide, demo booking, and legal pages. Styling uses `@citron-systems/citron-ds` v2 tokens and self-hosted brand fonts.

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Motion | Framer Motion |
| Design system | `@citron-systems/citron-ds` ^2.0.0 |

## Prerequisites

- Node.js **18+**
- npm

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server at `http://localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint via Next.js |

## Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CALENDLY_URL` | Optional Calendly embed for `/demo` |

Copy `.env.local` patterns from your deployment provider; never commit secrets.

## Deployment

Optimized for [Vercel](https://vercel.com). Set environment variables in the project dashboard and deploy from `main`.

## Related repos

- `citron-ds` — design tokens and brand assets
- `citron-crm` — CRM host shell (Module Federation)
- `citron-identity` — authentication portal

## License

MIT — © Inkblot Studio
