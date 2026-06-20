# Citron — The Experience

The flagship interactive experience for **Citron**, the AI-powered Business Operating System, built by [Inkblot Studio](https://inkblotstudio.eu).

> Your company. One intelligence.

Not a SaaS website — a guided journey through a living intelligence system. The Citron mascot is your companion the whole way down, travelling a digital intelligence trunk and pausing at ten checkpoints, each a deeper layer of Citron.

## The journey

One page. A guided descent through **ten checkpoints**, each reached as a milestone — the motion settles, a progress ring completes, the layer is named, and then the journey continues:

```
Intro → 01 Why Citron Exists → 02 One Platform → 03 CRM Intelligence
→ 04 Marketing Engine → 05 Automations → 06 AI Agents → 07 Finance
→ 08 Operations → 09 Unified Intelligence → 10 The Future of Business
→ Citron (Book a Demo) → Created by Inkblot Studio
```

The only destination is **Book a Demo**. The final chapter reveals the maker — Inkblot Studio — as the trunk reaches its origin.

### The mascot — the main character

The mascot welcomes the visitor large and centered, then guides the entire journey: it pauses centered at each checkpoint, drifts toward each visual, carries a themed satellite engaged with the active layer, and returns to full scale at the climax. It reacts to the cursor with springed 3D tilt and parallax, breathes, blinks, and never disappears.

### The intelligence trunk

A living AI spine down the center: it fills with light as you descend, streams energy downward, drifts code fragments up from the data, races system pulses through the depths, and ignites nodes as you pass them.

## Light & dark

Light is the default experience — bright, clean, airy. A premium dark mode is one tap away via an animated toggle that crossfades the whole page with the View Transitions API. Every token is theme-aware; all foreground copy passes WCAG AA contrast in both themes.

## Stack

- **Next.js 15** (App Router, React 19, Server Components)
- **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens as CSS variables (`--cine-*`), light + dark
- **Framer Motion** — scroll-linked storytelling, motion values, springs, a scene-aware mascot
- **Lucide** — iconography

## Pages

- **`/`** — the Citron experience
- **`/demo`** — Book a Demo
- **`/legal/*`** — Privacy · Terms · Cookies (utility)

## Architecture

```
src/components/experience/
  Experience.tsx            # orchestrator — provider + fixed layers + journey
  ExperienceContext.tsx     # active-scene tracking (useScene / useExperience)
  ExperienceBackground.tsx  # theme-aware void, auroras, grid, particle canvas
  IntelligenceTrunk.tsx     # the living AI spine — fill, flow, fragments, nodes
  MascotStage.tsx           # the companion: scene-driven travel + cursor 3D tilt
  ExperienceMascot.tsx      # the living mascot mark
  CheckpointMarker.tsx      # the milestone moment (progress ring)
  CheckpointSection.tsx     # marker + discovery (headline, insight, visual)
  ChapterVisuals.tsx        # the ten bespoke checkpoint scenes + registry
  HeroChapter / CitronFinale / InkblotChapter / FloatingCta

src/components/effects/
  ThemeScript.tsx           # no-FOUC theme (light default)
  ThemeProvider.tsx         # context + animated View-Transition toggle
  ScrollProgress.tsx
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
- Full `prefers-reduced-motion` fallbacks across mascot, trunk, and every scene
- Accessible theme toggle (44×44, `aria-label`, `aria-pressed`), visible focus, skip link, `aria-live` confirmation, tabular numerals
- Per-page metadata, Open Graph + Twitter cards, a generated 1200×630 OG image, JSON-LD, `sitemap.xml`, `robots.txt`, web manifest

---

© Citron. Crafted by Inkblot Studio.
