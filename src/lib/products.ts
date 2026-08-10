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
  /** What this product asks of you — never a generic trial. */
  cta: { label: string; href: string };
  /** The line that goes under the hook. Written to sell, not to describe. */
  hook: string;
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
      'A client contract, a patient note or an unreleased set of figures needs reading and summarising, and it must not leave the building to do it.',
    cta: { label: 'Download Citron', href: '/download' },
    hook: 'The AI that never phones home.',
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
    cta: { label: 'Download Citron Guide', href: '/download' },
    hook: 'Stop hunting for the button.',
    capabilities: [
      'Works in any app that publishes an accessibility tree',
      'Most answers never reach a model, and never leave the machine',
      'Says it is unsure rather than pointing at the wrong thing',
    ],
  },
  {
    slug: 'erp',
    name: 'Citron ERP',
    tagline: 'Stock, invoicing and the books, without the spreadsheet in between.',
    summary:
      'The ledger everything else writes into. Stock moves as things are sold, journals post themselves, and the fiscal side is built for Bulgarian requirements rather than bolted on afterwards.',
    accent: '#5B8DEF',
    glyph: 'ledger',
    platform: 'Web',
    stage: 'preview',
    segments: ['business'],
    audience:
      'Any business that holds stock and files returns \u2014 the owner who signs it off, the bookkeeper who closes the month, and the accountant who has to defend it.',
    useCase:
      'Month end. Stock, sales and the VAT ledger have to agree without a week of spreadsheets stitched together by hand.',
    cta: { label: 'Ask about ERP', href: '/demo' },
    hook: 'Month end, without the spreadsheet.',
    capabilities: [
      'Stock depletes in real time as items are sold',
      'Automated journal posting, VAT ledgers, fiscal device drivers',
      'Multi-site and multi-terminal from the first day',
    ],
  },
  {
    slug: 'pos',
    name: 'Citron POS',
    tagline: 'Take payment anywhere, even with the internet down.',
    summary:
      'The till, the order and the counter display in one offline-first app. It keeps selling when the network drops and reconciles when it returns, because trading does not stop because a router did.',
    accent: '#3FB984',
    glyph: 'card',
    platform: 'iPad · Web',
    stage: 'preview',
    segments: ['business'],
    audience:
      'Anyone who takes payment face to face \u2014 the staff who touch it two hundred times a shift, and the manager who counts the drawer at the end of it.',
    useCase:
      'Saturday, queue at the counter, and the internet drops. Sales keep going through and reconcile when the line comes back.',
    cta: { label: 'Ask about POS', href: '/demo' },
    hook: 'Keeps selling when the internet stops.',
    capabilities: [
      'Offline-first — service continues without a network',
      'Order flow, split payments, counter and kitchen displays',
      'Guest and loyalty attached at the point of sale',
    ],
  },
  {
    slug: 'crm',
    name: 'Citron CRM',
    tagline: 'One customer record, and everything they ever bought.',
    summary:
      'Every visit, every order and every loyalty point against one customer, joined to the till rather than kept beside it. Bookings run from the same record.',
    accent: '#E07A5F',
    glyph: 'person',
    platform: 'Web',
    stage: 'building',
    segments: ['business'],
    audience:
      'Whoever owns the customer relationship \u2014 the front desk, the marketing lead, the owner who remembers regulars by name and wants the system to as well.',
    useCase:
      'A regular walks in. Their history, their preferences and their loyalty balance are on screen before they reach the counter.',
    cta: { label: 'Ask about CRM', href: '/demo' },
    hook: 'Know them before they reach the counter.',
    capabilities: [
      'One customer record across every site',
      'Loyalty attached to real orders, not a separate card scheme',
      'Bookings and events on the same timeline',
    ],
  },
];

export const LAUNCHER: Product = {
  slug: 'launcher',
  name: 'Inkblot Launcher',
  tagline: 'Every app we make, in one window.',
  hook: 'One window. Every app.',
  summary:
    'The launcher installs and updates everything in the line, and keeps track of what you already have. Free, and the fastest way to get started — install it once and the apps you are entitled to are a click away.',
  accent: '#14120f',
  glyph: 'citron',
  platform: 'macOS · Windows',
  stage: 'shipping',
  segments: ['people', 'business'],
  audience: 'Anyone using more than one of our apps, which after a week is most people.',
  useCase: 'A new machine, or a new member of staff. Install one thing, sign in, and the rest follows.',
  cta: { label: 'Download the launcher', href: '/download' },
  capabilities: [
    'Installs and updates every app you have access to',
    'Free — it is how you get the rest, not a product we sell',
    'Light and dark, and it stays out of the way',
  ],
};

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}
