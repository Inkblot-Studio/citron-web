# Citron — The Story

The flagship marketing experience for **Citron**, the AI-powered Business Operating System, built by [Inkblot Studio](https://inkblotstudio.eu).

> One company. One system.

An Apple-style product story told in nine distinct chapters, narrated by the Citron mascot — a living companion that travels to a dedicated place in every chapter and guides you through the platform with calm, deliberate motion.

## The chapters

1. **Welcome** — the mascot, large and confident, and one message.
2. **The problem** — business is fragmented across too many tools.
3. **Citron CRM** — the standalone product: leads, pipelines, opportunities.
4. **The platform** — beyond CRM: AI, automations, finance, tasks, marketing, ops, collaboration.
5. **AI in action** — plain-language prompts that do real work.
6. **Automations** — work that runs itself.
7. **Real impact** — metrics and proof.
8. **Why Citron** — built for clarity.
9. **Inkblot Studio** — the closing chapter: meet the makers.

The single call to action — **Book a Demo** — lives in the hero (and the nav).

## The mascot is the guide

The mascot is the narrator, never a background element. On desktop a single fixed companion travels to a fresh position each chapter (top-center, upper-right, left, lower-right, …), **always in the half opposite the content so nothing ever overlaps it**. It stays alive between moves — breathing, blinking, swaying, tracking the cursor — and performs an elegant move (spin, flip, pop) on each arrival. On mobile it leads each chapter from the top of the section.

The mascot SVG is the exact brand mark — two bars and a wide smile — animated, never modified.

## Design

- **Apple/Linear-style Bento** — premium, spacious cards; clean backgrounds; one mood per chapter so each feels distinct.
- **Light-first**, with a premium dark mode and an animated toggle (View Transitions crossfade). Every token is theme-aware and passes WCAG AA contrast.
- No technical clutter — no particle fields, no spine. Whitespace, soft gradients, and motion that serves the story.

## Stack

- **Next.js 15** (App Router, React 19, Server Components)
- **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens as CSS variables (`--cine-*`), light + dark
- **Framer Motion** — the traveling guide, chapter reveals, micro-interactions
- **Lucide** — iconography

## Pages

- **`/`** — the Citron story
- **`/demo`** — Book a Demo
- **`/legal/*`** — Privacy · Terms · Cookies (utility)

## Architecture

```
src/components/experience/
  Experience.tsx          # orchestrator — provider + guide + nine chapters
  ExperienceContext.tsx   # active-chapter tracking (useScene / useExperience)
  MascotGuide.tsx         # fixed desktop companion that travels per chapter
  Mascot.tsx              # the exact mascot, alive (breathe, blink, gaze)
  kit.tsx                 # Stage shell, chapter backgrounds, Bento cards
  sections.tsx            # the nine chapters
src/lib/experience.ts     # choreography (anchors, tricks) + chapter content
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

- `NEXT_PUBLIC_CALENDLY_URL` — when set, the Book a Demo page embeds your live Calendly inline widget. Otherwise an elegant native scheduler is shown.

---

© Citron. Crafted by Inkblot Studio.
