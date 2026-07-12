/**
 * Commerce catalog — the single source of truth for everything Citron sells.
 *
 * Prices are defined here (in USD) and sent to Stripe Checkout as inline
 * `price_data`, so no products need to exist in the Stripe dashboard.
 * Promo codes (offers) are Stripe coupons entered at checkout.
 */

export type BillingCadence = 'monthly' | 'annual';

/** Annual is billed yearly at a ~17% discount; both prices are per seat / month. */
export const ANNUAL_DISCOUNT_LABEL = '−17%';

// ---------------------------------------------------------------------------
// Plans (self-serve tiers)
// ---------------------------------------------------------------------------

export type PlanId = 'starter' | 'growth' | 'enterprise';

export type Plan = {
  id: PlanId;
  name: string;
  description: string;
  /** Per seat / month. `null` → custom pricing (talk to sales). */
  seatPrice: { monthly: number; annual: number } | null;
  /** Hosted-model AI credits included per workspace / month. `null` → custom. */
  includedCredits: number | null;
  minSeats: number;
  maxSeats: number | null;
  highlighted?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For small teams replacing their first stack of tools.',
    seatPrice: { monthly: 29, annual: 24 },
    includedCredits: 500,
    minSeats: 1,
    maxSeats: 10,
    features: [
      'CRM & Lead Management',
      'Sales Pipelines',
      'Core automations',
      'Unlimited local Citron AI',
      '500 AI credits / month',
      'Up to 10 seats',
      'Email support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'For scaling teams running the whole business on Citron.',
    seatPrice: { monthly: 69, annual: 57 },
    includedCredits: 2500,
    minSeats: 1,
    maxSeats: null,
    highlighted: true,
    features: [
      'Everything in Starter',
      'Marketing & Analytics',
      'Invoicing & Accounting',
      'Unlimited AI agents',
      'Advanced automations',
      '2,500 AI credits / month',
      'Knowledge engine',
      'Priority support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations that need scale, control, and assurance.',
    seatPrice: null,
    includedCredits: null,
    minSeats: 25,
    maxSeats: null,
    features: [
      'Everything in Growth',
      'SSO & SCIM',
      'Custom AI models & credit pools',
      'Dedicated success manager',
      'SLA & uptime guarantees',
      'Advanced security & audit logs',
      'Custom integrations',
    ],
  },
];

export const getPlan = (id: string) => plans.find((p) => p.id === id);

// ---------------------------------------------------------------------------
// Build-your-own (B2B): base platform + module add-ons, per seat
// ---------------------------------------------------------------------------

export const basePlatform = {
  id: 'platform-base',
  name: 'Citron Platform',
  blurb: 'Command Center, unified data model, unlimited local Citron AI, 500 AI credits / month.',
  seatPrice: { monthly: 15, annual: 12 },
  includedCredits: 500,
} as const;

export type ModuleAddon = {
  id: string;
  name: string;
  category: 'Revenue' | 'Operations' | 'Finance' | 'Intelligence';
  blurb: string;
  seatPrice: { monthly: number; annual: number };
};

export const moduleAddons: ModuleAddon[] = [
  { id: 'crm', name: 'CRM', category: 'Revenue', blurb: 'Contacts, timelines, AI lead scoring, account health.', seatPrice: { monthly: 12, annual: 10 } },
  { id: 'sales', name: 'Sales Pipelines', category: 'Revenue', blurb: 'Visual pipelines, deal risk, forecasting.', seatPrice: { monthly: 10, annual: 8 } },
  { id: 'marketing', name: 'Marketing', category: 'Revenue', blurb: 'Campaigns, AI copy, segmentation, attribution.', seatPrice: { monthly: 14, annual: 12 } },
  { id: 'leads', name: 'Lead Management', category: 'Revenue', blurb: 'Capture, routing, enrichment, nurture.', seatPrice: { monthly: 8, annual: 7 } },
  { id: 'automations', name: 'Automations', category: 'Operations', blurb: 'Natural-language workflows across modules.', seatPrice: { monthly: 10, annual: 8 } },
  { id: 'tasks', name: 'Task Management', category: 'Operations', blurb: 'Projects, sprints, smart prioritization.', seatPrice: { monthly: 6, annual: 5 } },
  { id: 'collaboration', name: 'Team Collaboration', category: 'Operations', blurb: 'Threads, docs, decisions next to the work.', seatPrice: { monthly: 6, annual: 5 } },
  { id: 'scheduling', name: 'Scheduling', category: 'Operations', blurb: 'Availability, round-robin, calendar sync.', seatPrice: { monthly: 4, annual: 3 } },
  { id: 'invoicing', name: 'Invoicing', category: 'Finance', blurb: 'Invoices, reminders, payment links.', seatPrice: { monthly: 8, annual: 7 } },
  { id: 'accounting', name: 'Accounting', category: 'Finance', blurb: 'Auto-categorization, live P&L, tax exports.', seatPrice: { monthly: 12, annual: 10 } },
  { id: 'analytics', name: 'Analytics', category: 'Intelligence', blurb: 'Plain-language answers, reports, anomalies.', seatPrice: { monthly: 10, annual: 8 } },
  { id: 'ai-agents', name: 'AI Agents', category: 'Intelligence', blurb: 'Autonomous agents with guardrails & approvals.', seatPrice: { monthly: 15, annual: 12 } },
];

export const getModuleAddon = (id: string) => moduleAddons.find((m) => m.id === id);

// ---------------------------------------------------------------------------
// AI credit packs (one-time top-ups for hosted models)
// ---------------------------------------------------------------------------

export type CreditPack = {
  id: string;
  name: string;
  credits: number;
  price: number;
  blurb: string;
  bestValue?: boolean;
};

export const creditPacks: CreditPack[] = [
  { id: 'credits-1k', name: '1,000 credits', credits: 1_000, price: 12, blurb: 'Occasional frontier-model work.' },
  { id: 'credits-5k', name: '5,000 credits', credits: 5_000, price: 50, blurb: 'Steady hosted-model usage for a team.', bestValue: true },
  { id: 'credits-20k', name: '20,000 credits', credits: 20_000, price: 180, blurb: 'Heavy multi-team AI workloads.' },
];

export const getCreditPack = (id: string) => creditPacks.find((p) => p.id === id);

// ---------------------------------------------------------------------------
// Model rates — what a credit buys. Local Citron AI never consumes credits.
// ---------------------------------------------------------------------------

export type ModelRate = {
  provider: string;
  model: string;
  /** Approximate credits per AI action (~1K tokens). 0 → unlimited. */
  creditsPerAction: number;
  note?: string;
};

export const modelRates: ModelRate[] = [
  { provider: 'Citron', model: 'Citron Local AI', creditsPerAction: 0, note: 'Unlimited on every plan — runs privately, on your data.' },
  { provider: 'Anthropic', model: 'Claude (fast)', creditsPerAction: 1 },
  { provider: 'Anthropic', model: 'Claude (frontier)', creditsPerAction: 4 },
  { provider: 'OpenAI', model: 'GPT (fast)', creditsPerAction: 1 },
  { provider: 'OpenAI', model: 'GPT (frontier)', creditsPerAction: 4 },
  { provider: 'Google', model: 'Gemini', creditsPerAction: 2 },
  { provider: 'Mistral', model: 'Mistral', creditsPerAction: 1 },
];

export const CREDITS_EXPLAINER =
  'One credit covers roughly one AI action (~1,000 tokens) on a fast hosted model. Frontier models draw more per action. Local Citron AI is unlimited on every plan and never touches your credits.';

// ---------------------------------------------------------------------------
// Offers
// ---------------------------------------------------------------------------

/**
 * Launch offer — shown as a banner and applied as a Stripe promo code at
 * checkout. Create a coupon with this code in the Stripe dashboard.
 */
export const launchOffer = {
  code: 'CITRUS20',
  headline: 'Launch offer: 20% off your first 3 months',
  detail: `Use code CITRUS20 at checkout. Annual billing already saves ${ANNUAL_DISCOUNT_LABEL}.`,
} as const;

// ---------------------------------------------------------------------------
// Cart
// ---------------------------------------------------------------------------

export type CartItem =
  | { kind: 'plan'; planId: Exclude<PlanId, 'enterprise'>; seats: number; cadence: BillingCadence }
  | { kind: 'custom'; seats: number; cadence: BillingCadence; moduleIds: string[] }
  | { kind: 'credits'; packId: string; quantity: number };

export type CartTotals = {
  /** Effective monthly recurring cost (annual items normalized to /month). */
  monthlyRecurring: number;
  /** Charged today for one-time items (credit packs). */
  oneTime: number;
  hasRecurring: boolean;
  hasAnnual: boolean;
};

export function customSeatPrice(moduleIds: string[], cadence: BillingCadence): number {
  return (
    basePlatform.seatPrice[cadence] +
    moduleIds.reduce((sum, id) => sum + (getModuleAddon(id)?.seatPrice[cadence] ?? 0), 0)
  );
}

export function itemMonthlyPrice(item: CartItem): number {
  switch (item.kind) {
    case 'plan': {
      const plan = getPlan(item.planId);
      if (!plan?.seatPrice) return 0;
      return plan.seatPrice[item.cadence] * item.seats;
    }
    case 'custom':
      return customSeatPrice(item.moduleIds, item.cadence) * item.seats;
    case 'credits':
      return 0;
  }
}

export function itemOneTimePrice(item: CartItem): number {
  if (item.kind !== 'credits') return 0;
  return (getCreditPack(item.packId)?.price ?? 0) * item.quantity;
}

export function cartTotals(items: CartItem[]): CartTotals {
  const monthlyRecurring = items.reduce((sum, i) => sum + itemMonthlyPrice(i), 0);
  const oneTime = items.reduce((sum, i) => sum + itemOneTimePrice(i), 0);
  return {
    monthlyRecurring,
    oneTime,
    hasRecurring: items.some((i) => i.kind !== 'credits'),
    hasAnnual: items.some((i) => i.kind !== 'credits' && i.cadence === 'annual'),
  };
}

export function cartItemLabel(item: CartItem): string {
  switch (item.kind) {
    case 'plan':
      return `${getPlan(item.planId)?.name ?? item.planId} plan`;
    case 'custom':
      return 'Custom platform';
    case 'credits':
      return getCreditPack(item.packId)?.name ?? item.packId;
  }
}

export const formatUSD = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: Number.isInteger(n) ? 0 : 2,
  }).format(n);
