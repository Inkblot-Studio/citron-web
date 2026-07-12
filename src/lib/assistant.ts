import {
  ANNUAL_DISCOUNT_LABEL,
  basePlatform,
  CREDITS_EXPLAINER,
  creditPacks,
  formatUSD,
  launchOffer,
  moduleAddons,
  modelRates,
  plans,
} from '@/lib/catalog';
import { siteConfig } from '@/lib/site';

/**
 * Sales assistant brain, shared by both engines:
 * - PRODUCT_KNOWLEDGE grounds the Claude-powered route when a key is set.
 * - The scripted engine below answers at zero cost when no key is present.
 */

function planLines(): string {
  return plans
    .map((p) => {
      const price = p.seatPrice
        ? `${formatUSD(p.seatPrice.monthly)}/seat/mo (annual: ${formatUSD(p.seatPrice.annual)}/seat/mo, ${ANNUAL_DISCOUNT_LABEL})`
        : 'custom pricing';
      const credits = p.includedCredits ? `${p.includedCredits.toLocaleString()} AI credits/mo` : 'custom credit pools';
      return `- ${p.name}: ${price}; ${credits}; ${p.description} Features: ${p.features.join(', ')}.`;
    })
    .join('\n');
}

export const PRODUCT_KNOWLEDGE = `
# Citron — product knowledge

Citron is the AI Business Operating System by Inkblot Studio: one platform replacing CRM, sales pipelines, marketing, lead management, automations, tasks, collaboration, scheduling, invoicing, accounting, analytics, and AI agents. Site: ${siteConfig.url}. Sales contact: ${siteConfig.contact.sales}.

## Plans (self-serve at /pricing, checkout via Stripe)
${planLines()}

## Build-your-own (B2B, at /build)
Base platform "${basePlatform.name}": ${formatUSD(basePlatform.seatPrice.monthly)}/seat/mo (${formatUSD(basePlatform.seatPrice.annual)} annual) including Command Center, unified data model, unlimited local AI, ${basePlatform.includedCredits} credits/mo. Module add-ons per seat/month:
${moduleAddons.map((m) => `- ${m.name}: ${formatUSD(m.seatPrice.monthly)} (${formatUSD(m.seatPrice.annual)} annual) — ${m.blurb}`).join('\n')}

## AI usage model
${CREDITS_EXPLAINER}
Model rates (credits per action): ${modelRates.map((r) => `${r.model}: ${r.creditsPerAction === 0 ? 'unlimited/free' : r.creditsPerAction}`).join('; ')}.
Credit top-up packs (one-time): ${creditPacks.map((p) => `${p.name} for ${formatUSD(p.price)}`).join('; ')}. Unused top-up credits roll over. Usage dashboard lives at /account/usage.

## Offers
${launchOffer.headline}. ${launchOffer.detail}

## Key facts
- Free 14-day trial on Starter and Growth, no card required — sign up at ${siteConfig.identity.url}/signup.
- Live in under a day; no integration project.
- Privacy: data encrypted in transit/at rest, tenant isolation, never used to train shared models. Enterprise adds SSO/SCIM, audit logs, custom models, DPAs.
- Plans can change anytime; changes are prorated. Annual billing saves ${ANNUAL_DISCOUNT_LABEL}.
- Book a 30-minute demo at /demo. Enterprise: talk to sales (${siteConfig.contact.sales}).
`.trim();

export const ASSISTANT_SYSTEM_PROMPT = `You are the Citron sales assistant on citronos.com. Be warm, direct, and genuinely helpful — a knowledgeable product specialist, not a pushy seller.

Rules:
- Answer only from the product knowledge below. If you don't know something, say so and offer the sales email or a demo.
- Never invent prices, features, discounts, or commitments.
- Keep answers short (2-4 sentences) and conversational. Use plain text, no markdown headers.
- Guide toward the next step when natural: start a free trial (signup), see /pricing, configure /build, or book a /demo for B2B evaluations.
- If asked about competitors, be fair and focus on Citron's strengths: one unified system, unlimited private local AI, hosted frontier models via credits.

${PRODUCT_KNOWLEDGE}`;

// ---------------------------------------------------------------------------
// Scripted engine — zero-cost fallback when ANTHROPIC_API_KEY is not set.
// ---------------------------------------------------------------------------

export type AssistantSuggestion = { label: string; href?: string };

export type AssistantReply = {
  reply: string;
  suggestions: AssistantSuggestion[];
};

const DEFAULT_SUGGESTIONS: AssistantSuggestion[] = [
  { label: 'What does Citron cost?' },
  { label: 'How do AI credits work?' },
  { label: 'What’s included?' },
  { label: 'Book a demo', href: '/demo' },
];

type Intent = {
  match: RegExp;
  reply: () => string;
  suggestions?: AssistantSuggestion[];
};

const INTENTS: Intent[] = [
  {
    match: /price|pricing|cost|how much|expensive|cheap|plan\b|plans\b|tier/i,
    reply: () =>
      `Citron has three plans: Starter at ${formatUSD(29)}/seat/mo, Growth at ${formatUSD(69)}/seat/mo (most popular — the full platform), and Enterprise with custom pricing. Annual billing saves ${ANNUAL_DISCOUNT_LABEL}, and every plan includes unlimited local Citron AI. B2B teams can also build a custom bundle from individual modules.`,
    suggestions: [
      { label: 'See plans', href: '/pricing' },
      { label: 'Build your own', href: '/build' },
      { label: 'How do AI credits work?' },
    ],
  },
  {
    match: /credit|usage|token|model|anthropic|openai|claude|gpt|gemini|mistral|local ai|unlimited/i,
    reply: () =>
      `${CREDITS_EXPLAINER} Starter includes 500 credits/month and Growth includes 2,500. If you need more, one-time packs start at ${formatUSD(12)} for 1,000 credits and roll over until used.`,
    suggestions: [
      { label: 'See credit packs', href: '/pricing#credits' },
      { label: 'What does Citron cost?' },
      { label: 'Start free trial' },
    ],
  },
  {
    match: /trial|free|try|test|demo account|sign ?up|start/i,
    reply: () =>
      'You can start a free 14-day trial of Starter or Growth — no credit card required. Most teams are fully live in under a day since there’s no integration project. Want me to point you to signup?',
    suggestions: [
      { label: 'Start free trial', href: `${siteConfig.identity.url}/signup` },
      { label: 'Book a demo', href: '/demo' },
      { label: 'What’s included?' },
    ],
  },
  {
    match: /demo|walkthrough|sales call|talk to (sales|someone|a human)|contact/i,
    reply: () =>
      `Happy to set that up — we do a focused 30-minute walkthrough mapped to how your team actually works. Book directly at /demo, or email ${siteConfig.contact.sales} for enterprise procurement questions.`,
    suggestions: [
      { label: 'Book a demo', href: '/demo' },
      { label: 'What does Citron cost?' },
    ],
  },
  {
    match: /module|feature|include|what.*(do|does|can)|crm|invoic|accounting|marketing|automation|analytics|task|schedul|collab/i,
    reply: () =>
      'Citron covers your whole business in one system: CRM, sales pipelines, marketing, lead management, automations, tasks, collaboration, scheduling, invoicing, accounting, analytics, and autonomous AI agents — all sharing one data model, so the AI can act across everything. On Growth you get the full platform; on /build you pick exactly the modules you need.',
    suggestions: [
      { label: 'Explore modules', href: '/#modules' },
      { label: 'Build your own', href: '/build' },
      { label: 'What does Citron cost?' },
    ],
  },
  {
    match: /secur|privacy|private|gdpr|data|encrypt|soc|compliance|train/i,
    reply: () =>
      'Your data stays yours: encrypted in transit and at rest, isolated per tenant, and never used to train models shared with other companies. Local Citron AI runs privately with unlimited usage. Enterprise plans add SSO/SCIM, audit logs, custom AI models, and signed DPAs.',
    suggestions: [
      { label: 'Enterprise plan', href: '/pricing' },
      { label: 'Book a demo', href: '/demo' },
    ],
  },
  {
    match: /discount|offer|coupon|promo|deal|cheaper/i,
    reply: () =>
      `Two ways to save right now: annual billing is ${ANNUAL_DISCOUNT_LABEL} versus monthly, and our launch offer gives 20% off your first 3 months with code ${launchOffer.code} at checkout.`,
    suggestions: [
      { label: 'See plans', href: '/pricing' },
      { label: 'Start free trial', href: `${siteConfig.identity.url}/signup` },
    ],
  },
  {
    match: /cancel|refund|downgrade|upgrade|change plan|switch/i,
    reply: () =>
      'You can upgrade, downgrade, or cancel anytime — changes are prorated and take effect immediately, managed from your account’s billing page. No lock-in.',
    suggestions: [
      { label: 'What does Citron cost?' },
      { label: 'Start free trial', href: `${siteConfig.identity.url}/signup` },
    ],
  },
  {
    match: /hi\b|hello|hey|good (morning|afternoon|evening)/i,
    reply: () =>
      'Hi! I’m the Citron assistant. I can help you compare plans, understand AI credits, build a custom quote, or book a demo. What would you like to know?',
  },
];

export function scriptedReply(message: string): AssistantReply {
  for (const intent of INTENTS) {
    if (intent.match.test(message)) {
      return {
        reply: intent.reply(),
        suggestions: intent.suggestions ?? DEFAULT_SUGGESTIONS,
      };
    }
  }
  return {
    reply: `Good question — I want to give you an accurate answer rather than a guess. For anything I can't cover here, our team replies fast at ${siteConfig.contact.sales}, or you can book a 30-minute demo. Meanwhile, I can help with pricing, plans, AI credits, or security.`,
    suggestions: DEFAULT_SUGGESTIONS,
  };
}

export const ASSISTANT_GREETING: AssistantReply = {
  reply: 'Hi! I’m the Citron assistant. Ask me anything about plans, pricing, AI usage, or the platform — or grab a demo slot.',
  suggestions: DEFAULT_SUGGESTIONS,
};
