# Citron — The Experience

The flagship interactive experience for **Citron**, the AI-powered Business Operating System, built by [Inkblot Studio](https://inkblotstudio.eu).

> Your company. One intelligence.

This is not a SaaS website. It is a single continuous descent through the mind of Citron — a cinematic scroll journey guided by the living Citron mascot and a growing digital intelligence trunk.

## The journey

One page. One narrative. The visitor descends through Citron's intelligence, discovering the platform as a sequence of moments rather than sections:

**Hero → Unification → CRM → Marketing → Automations → AI Agents → Finance → Operations → The Business Operating System**

The only destination is **Book a Demo**.

### The mascot

The mascot is the hero of the experience — a living digital entity, not a logo. It floats at the center, reacts to the cursor with springed 3D tilt and parallax, breathes, blinks, and travels along the intelligence trunk as you scroll, orbiting toward each discovery and returning to the core at the finale.

### The intelligence trunk

A vertical AI spine runs down the center of the experience. It fills with light from the top as you descend, energy flows downward through the active span, chapter nodes ignite as you pass them, and a luminous head leads the way.

## Stack

- **Next.js 15** (App Router, React 19, Server Components)
- **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens as CSS variables, inherited from the Citron design system
- **Framer Motion** — scroll-linked storytelling, motion values, springs, and a cursor-reactive mascot
- **Lucide** — iconography

## Design system

The experience inherits the Citron / Inkblot Studio visual DNA, rendered as a cinematic warm-black void for maximum drama and legibility:

- **Color** — warm near-black canvas (`#0a0907`), citron-amber light (`#d9bc58` / `#e8d38a`), warm ink text (`#f6f3ea`)
- **Type** — Inter, tight tracking on display sizes
- **Motion** — fast, physical easing (`cubic-bezier(0.22, 1, 0.36, 1)`), full `prefers-reduced-motion` support
- **Legibility** — every text block sits on a radial scrim; all foreground copy passes WCAG AA contrast

Tokens live in `src/app/globals.css`. The journey-specific tokens are the `--cine-*` variables.

## Pages

- **`/`** — the Citron experience
- **`/demo`** — Book a Demo
- **`/legal/*`** — Privacy · Terms · Cookies (utility)

## Architecture

```
src/components/experience/
  Experience.tsx            # orchestrator — fixed layers + scrolling chapters
  ExperienceBackground.tsx  # void, auroras, depth grid, ember canvas
  IntelligenceTrunk.tsx     # the growing AI spine + igniting nodes
  MascotStage.tsx           # fixed mascot: cursor 3D tilt + scroll travel
  ExperienceMascot.tsx      # the living mascot mark
  ChapterShell.tsx          # shared chapter layout around the spine
  ChapterVisuals.tsx        # the seven bespoke chapter scenes
  HeroChapter / FinaleChapter / FloatingCta
```

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

## Performance & accessibility

- GPU-only transforms (transform/opacity), capped particle count, paused when the tab is hidden
- Static prerendering for every route
- Full `prefers-reduced-motion` fallbacks across mascot, trunk, and every chapter
- Per-page metadata, Open Graph + Twitter cards, a generated 1200×630 OG image, JSON-LD (Organization, SoftwareApplication), `sitemap.xml`, `robots.txt`, and a web manifest

---

© Citron. Crafted by Inkblot Studio.
