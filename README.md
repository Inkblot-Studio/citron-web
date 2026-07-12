# Citron Web

Marketing + commerce site for **Citron** — the AI Business Operating System — by [Inkblot Studio](https://inkblotstudio.eu). Live at [citronos.com](https://citronos.com).

## Overview

A conversion-focused site handling the full self-serve funnel: marketing pages, plans and build-your-own module pricing, cart, Stripe checkout, AI-usage management, account/billing area, and a built-in sales assistant. Authentication lives on the separate `identity.citronos.com` system (shared `.citronos.com` session cookie).

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Motion | Framer Motion (kept minimal) |
| Design system | `@citron-systems/citron-ds` ^2.0.0 |
| Payments | Stripe (Checkout + Customer Portal + webhooks) |
| Sales assistant | Claude API (`@anthropic-ai/sdk`), scripted fallback |

## Architecture

| Area | Where | Notes |
|------|-------|-------|
| Commerce catalog | `src/lib/catalog.ts` | Single source of truth for plans, module add-ons, credit packs, model rates, offers. Prices are sent to Stripe as inline `price_data` — no dashboard products needed. |
| Cart | `src/components/cart/` | Client-side, persisted in `localStorage`. One subscription (plan or custom build) + credit packs. |
| Checkout | `POST /api/checkout` | Rebuilds all prices server-side from the catalog; Stripe Checkout with promo codes enabled. |
| Webhooks | `POST /api/webhooks/stripe` | Signature-verified; provisioning hand-off points marked `TODO(citron-backend)`. |
| Billing portal | `POST /api/billing/portal` | Stripe Customer Portal, customer looked up by session email. |
| Session | `src/lib/session.ts` | Forwards the `citron_session` cookie to `IDENTITY_API_URL`; `DEV_FAKE_SESSION=1` stubs a user locally. |
| Usage | `src/lib/usage.ts`, `GET /api/usage` | Typed `UsageSummary` contract with a deterministic mock until the backend implements it. |
| Account area | `/account`, `/account/usage`, `/account/billing` | Behind the session gate. |
| Sales assistant | `POST /api/assistant` | Claude-powered when `ANTHROPIC_API_KEY` is set; zero-cost scripted engine otherwise. |

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

Copy `.env.example` to `.env.local` and fill in what you have. Everything degrades gracefully when unset:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (default `https://citronos.com`) |
| `NEXT_PUBLIC_IDENTITY_URL` | Auth portal (default `https://identity.citronos.com`) |
| `IDENTITY_API_URL` | Server-side session validation endpoint |
| `SESSION_COOKIE_NAME` | Shared cookie name (default `citron_session`) |
| `DEV_FAKE_SESSION` | `1` → stub signed-in user for local dev |
| `STRIPE_SECRET_KEY` | Test key until launch; swap for live to go live |
| `STRIPE_WEBHOOK_SECRET` | From `stripe listen` or the dashboard |
| `ANTHROPIC_API_KEY` | Enables the Claude-powered assistant (optional) |
| `NEXT_PUBLIC_CALENDLY_URL` | Optional Calendly embed for `/demo` |

### Testing Stripe locally

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# card 4242 4242 4242 4242, any future date, any CVC
```

Promo codes (e.g. `CITRUS20`) are Stripe coupons — create them in the dashboard; checkout has promotion codes enabled.

## Deployment

Optimized for [Vercel](https://vercel.com). Set environment variables in the project dashboard and deploy from `main`.

## Related repos

- `citron-ds` — design tokens and brand assets
- `citron-crm` — CRM host shell (Module Federation)
- `citron-identity` — authentication portal (`identity.citronos.com`)

## License

MIT — © Inkblot Studio
