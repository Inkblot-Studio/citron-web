/** The Citron line. One entry per app; every surface reads this. */

export type Stage = 'shipping' | 'preview' | 'building';

export type Glyph = 'citron' | 'target' | 'ledger' | 'card' | 'person';

export interface Product {
  slug: string;
  name: string;
  /** One line, on the card. */
  tagline: string;
  /** Two or three sentences, on the product page. */
  summary: string;
  accent: string;
  glyph: Glyph;
  platform: string;
  stage: Stage;
  /** What it actually does today — no roadmap, no promises. */
  capabilities: string[];
}

export const STAGE_LABEL: Record<Stage, string> = {
  shipping: 'Shipping',
  preview: 'Private preview',
  building: 'In build',
};

export const PRODUCTS: Product[] = [
  {
    slug: 'citron',
    name: 'Citron',
    tagline: 'Your private AI, running on your own hardware.',
    summary:
      'Chat, research, documents, notes and calendar in one workspace. It runs locally, so the work never leaves the building — which is the difference between an assistant you can use on client material and one you cannot.',
    accent: '#C9A227',
    glyph: 'citron',
    platform: 'macOS · Windows · Linux',
    stage: 'shipping',
    capabilities: [
      'Local-first — models run on your own machine',
      'Documents, email, notes and calendar in one place',
      'No per-seat cloud bill, no data leaving the network',
    ],
  },
  {
    slug: 'guide',
    name: 'Citron Guide',
    tagline: 'Ask how to do something. It points at the answer on screen.',
    summary:
      'Press a hotkey anywhere, ask in your own words, and it draws a ring around the thing you need to touch. It reads the accessibility tree rather than taking screenshots, so the ring lands on the real control instead of near it.',
    accent: '#8B7CF0',
    glyph: 'target',
    platform: 'macOS',
    stage: 'shipping',
    capabilities: [
      'Works in any app that publishes an accessibility tree',
      'Most answers never reach a model, and never leave the machine',
      'Says it is unsure rather than pointing at the wrong thing',
    ],
  },
  {
    slug: 'erp',
    name: 'Citron ERP',
    tagline: 'Stock, accounting and compliance underneath it all.',
    summary:
      'The ledger the rest of the line writes into. Recipes deplete stock as orders land, journals post themselves, and the fiscal side is built for Bulgarian requirements rather than bolted on afterwards.',
    accent: '#5B8DEF',
    glyph: 'ledger',
    platform: 'Web',
    stage: 'preview',
    capabilities: [
      'Real-time inventory depletion from recipes',
      'Automated journal posting, VAT ledgers, fiscal device drivers',
      'Multi-venue, multi-terminal from the first day',
    ],
  },
  {
    slug: 'pos',
    name: 'Citron POS',
    tagline: 'Floor to payment, offline-first, on any terminal.',
    summary:
      'The till, the floor plan and the kitchen display in one offline-first app. It keeps taking orders when the network drops and reconciles when it returns, because a restaurant does not stop because a router did.',
    accent: '#3FB984',
    glyph: 'card',
    platform: 'iPad · Web',
    stage: 'preview',
    capabilities: [
      'Offline-first — service continues without a network',
      'Floor plan, order flow, split payments, kitchen display',
      'Guest and loyalty attached at the point of sale',
    ],
  },
  {
    slug: 'crm',
    name: 'Citron CRM',
    tagline: 'One guest record, and everything they ever ordered.',
    summary:
      'Every visit, every order and every loyalty point against a single guest, joined to the POS rather than kept alongside it. Reservations and events run from the same record.',
    accent: '#E07A5F',
    glyph: 'person',
    platform: 'Web',
    stage: 'building',
    capabilities: [
      'A unified guest record across venues',
      'Loyalty ledger attached to real orders',
      'Reservations and events on the same timeline',
    ],
  },
];

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}
