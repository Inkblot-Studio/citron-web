/** The Citron line. One entry per app; every surface reads this. */

export type Stage = 'shipping' | 'preview' | 'building';

export type Glyph = 'citron' | 'target' | 'ledger' | 'card' | 'person';

/** Who buys it. Some products genuinely serve both. */
export type Segment = 'people' | 'business';

export const SEGMENT_LABEL: Record<Segment, string> = {
  people: 'For people',
  business: 'For business',
};

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
  segments: Segment[];
  /** The person who opens it every day, named plainly. */
  audience: string;
  /** The moment it earns its keep. */
  useCase: string;
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
    segments: ['people', 'business'],
    audience:
      'Anyone who cannot send their work to somebody else\u2019s cloud \u2014 lawyers, accountants, clinicians, researchers, and the freelancers who sign the same confidentiality clauses.',
    useCase:
      'A client contract, a patient note or an unreleased set of accounts needs summarising, and it must not leave the building to do it.',
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
    segments: ['people', 'business'],
    audience:
      'The person who did not grow up with this. Parents and grandparents, staff on their first week, anyone handed software nobody had time to teach them \u2014 and the IT desk that fields the same question forty times.',
    useCase:
      'Somebody is stuck on a screen they have never seen, and the alternative is a phone call to a relative or a ticket that takes a day.',
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
    segments: ['business'],
    audience:
      'Owners and back-office of hospitality groups \u2014 the person who signs off stock, the bookkeeper who closes the month, and the accountant who has to defend it.',
    useCase:
      'Month end. Stock, sales and the VAT ledger have to agree without a week of spreadsheets stitched together by hand.',
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
    segments: ['business'],
    audience:
      'Restaurants, bars and caf\u00e9s \u2014 the floor staff who touch it two hundred times a shift, and the manager who counts the drawer at the end of it.',
    useCase:
      'Friday service, full room, and the internet drops. Orders keep going through and reconcile when the line comes back.',
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
    segments: ['business'],
    audience:
      'Whoever owns the guest relationship \u2014 the host stand, the marketing lead, the owner who still remembers regulars by name and wants the system to as well.',
    useCase:
      'A regular walks in. The table, the allergy, the usual order and the loyalty balance are on one screen before they sit down.',
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
