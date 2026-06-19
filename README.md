# Citron — Marketing Website

The flagship public website for **Citron**, the AI-powered Business Operating System, built by [Inkblot Studio](https://inkblotstudio.eu).

One platform. One intelligence. Everything a company needs.

## Stack

- **Next.js 15** (App Router, React 19, Server Components)
- **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens as CSS variables, inherited from the Citron design system
- **Framer Motion** — scroll-linked storytelling, reveals, and micro-interactions
- **Lucide** — iconography

## Design system

The site inherits the Citron / Inkblot Studio visual DNA:

- **Color** — warm neutrals (`#fafaf7` → `#1d1c19`), citron-amber accent (`#c4a030` / `#d9bc58`), warm dark mode (`#12110e`)
- **Type** — Inter, restrained scale, tight tracking on display sizes
- **Radius** — soft 14–24px surfaces
- **Shadow** — warm-tinted, diffused elevation
- **Motion** — fast, physical easing (`cubic-bezier(0.22, 1, 0.36, 1)`), full `prefers-reduced-motion` support

Tokens live in `src/app/globals.css` (`:root` + `[data-theme='dark']`).

## Pages

Home · Platform · AI · Solutions · Pricing · About · Contact · Book Demo · Blog (+ posts) · Legal (Privacy / Terms / Cookies)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Configuration

- `NEXT_PUBLIC_CALENDLY_URL` — when set, the Book a Demo page embeds your live Calendly inline widget. Without it, an elegant native scheduling experience is shown.

## SEO

Per-page metadata, Open Graph + Twitter cards, a generated 1200×630 OG image, JSON-LD structured data (Organization, SoftwareApplication, FAQ, BlogPosting), `sitemap.xml`, `robots.txt`, and a web manifest are all included.

---

© Citron. Crafted by Inkblot Studio.
