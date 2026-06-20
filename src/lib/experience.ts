/**
 * The Citron journey — a cinematic, guided descent. No visible checkpoints:
 * each act is an "arrival" the visitor settles into (sticky pacing) while the
 * mascot pauses, then the journey flows on. Copy stays concise; visuals and
 * motion carry the story.
 */

export type CheckpointVisual =
  | 'unification'
  | 'platform'
  | 'crm'
  | 'marketing'
  | 'automations'
  | 'agents'
  | 'finance'
  | 'operations'
  | 'convergence'
  | 'future';

export type Trick = 'none' | 'spin' | 'flip' | 'pop';

export type ActKind = 'feature' | 'product' | 'ai' | 'cases' | 'testimonials';

export type Act = {
  id: string;
  kind: ActKind;
  side: 'left' | 'right';
  eyebrow: string;
  headline: string;
  body?: string;
  points?: string[];
  product?: 'CRM' | 'PLATFORM';
  chips?: string[];
  note?: string;
  visual?: CheckpointVisual;
  trick?: Trick;
  /** Taller sticky dwell for moments that need reading time. */
  dwell?: 'short' | 'long';
};

export const acts: Act[] = [
  {
    id: 'problem',
    kind: 'feature',
    side: 'left',
    eyebrow: 'Why Citron exists',
    headline: 'Business runs on too many tools.',
    body: 'The average company juggles a dozen disconnected apps. Data scatters, context is lost between tabs, and work slips through the cracks.',
    points: [
      '12+ tools that don’t talk to each other',
      'Hours lost to copy-paste and context-switching',
      'No single source of truth',
    ],
    visual: 'unification',
    trick: 'none',
  },
  {
    id: 'what',
    kind: 'feature',
    side: 'right',
    eyebrow: 'What Citron is',
    headline: 'One intelligence for the whole company.',
    body: 'Citron unifies everything a business runs on into a single living system — with AI woven through every part of it.',
    points: ['Every team, one platform', 'One source of truth', 'AI in every workflow'],
    visual: 'platform',
    trick: 'pop',
  },
  {
    id: 'crm',
    kind: 'product',
    product: 'CRM',
    side: 'left',
    eyebrow: 'A product on its own',
    headline: 'Citron CRM',
    body: 'Start with the relationship layer. Citron CRM gives sales teams everything to manage customers and close deals — beautifully simple, quietly intelligent.',
    chips: [
      'Customer management',
      'Sales pipelines',
      'Lead tracking',
      'Sales visibility',
      'Relationship intelligence',
    ],
    visual: 'crm',
    trick: 'pop',
    dwell: 'long',
  },
  {
    id: 'platform',
    kind: 'product',
    product: 'PLATFORM',
    side: 'right',
    eyebrow: 'The complete operating system',
    headline: 'Citron Platform',
    body: 'Then it becomes everything. The Platform wraps your CRM in a full business operating system — every function, one intelligence.',
    chips: [
      'CRM included',
      'AI agents',
      'Automations',
      'Finance & accounting',
      'Marketing',
      'Operations',
      'Collaboration',
      'Workflows',
      'Business intelligence',
    ],
    note: 'CRM is one product. Platform is all of them — working as one.',
    visual: 'platform',
    trick: 'spin',
    dwell: 'long',
  },
  {
    id: 'ai',
    kind: 'ai',
    side: 'left',
    eyebrow: 'AI in action',
    headline: 'Just ask.',
    body: 'Citron’s AI doesn’t just store your data — it acts on it. Type a request in plain language and watch the work happen.',
    visual: 'agents',
    trick: 'none',
    dwell: 'long',
  },
  {
    id: 'automations',
    kind: 'feature',
    side: 'right',
    eyebrow: 'Automations & workflows',
    headline: 'Describe it. It runs itself.',
    body: 'Build workflows in plain language. Citron assembles the triggers, conditions, and actions across every module — and runs them while you sleep.',
    points: [
      'Natural-language builder',
      'Cross-module triggers',
      'Human-in-the-loop approvals',
    ],
    visual: 'automations',
    trick: 'flip',
  },
  {
    id: 'finance',
    kind: 'feature',
    side: 'left',
    eyebrow: 'Finance & accounting',
    headline: 'Money that runs itself.',
    body: 'Invoices send themselves, payments reconcile automatically, and your books stay closed — all from the same place you win the deal.',
    points: ['Automated invoicing', 'Real-time P&L', 'AI-assisted reconciliation'],
    visual: 'finance',
    trick: 'none',
  },
  {
    id: 'collaboration',
    kind: 'feature',
    side: 'right',
    eyebrow: 'Teams & operations',
    headline: 'Your team, perfectly in sync.',
    body: 'Tasks, projects, docs, and conversations live next to the work — so the whole company moves on one source of truth, with data flowing everywhere it’s needed.',
    points: ['Shared context', 'Tasks & projects', 'Data flows everywhere'],
    visual: 'operations',
    trick: 'pop',
  },
  {
    id: 'cases',
    kind: 'cases',
    side: 'left',
    eyebrow: 'Who it’s for',
    headline: 'Built for how you work.',
    visual: 'convergence',
    trick: 'none',
    dwell: 'long',
  },
  {
    id: 'proof',
    kind: 'testimonials',
    side: 'right',
    eyebrow: 'Proof',
    headline: 'Teams that made the switch.',
    visual: 'future',
    trick: 'none',
    dwell: 'long',
  },
];

/** AI prompts the agent appears to execute, with practical replies. */
export const agentPrompts: { prompt: string; reply: string }[] = [
  {
    prompt: 'Generate this month’s revenue report',
    reply: 'Done · $487K revenue · +18% MoM · top channel: organic',
  },
  {
    prompt: 'Follow up with all inactive leads',
    reply: '42 follow-ups drafted across 4 segments — ready to send',
  },
  {
    prompt: 'Create invoices for unpaid clients',
    reply: '9 invoices · $63,400 issued with payment links',
  },
  {
    prompt: 'Find opportunities at risk',
    reply: '5 deals flagged · $214K — stalled 14+ days',
  },
];

/** Real-world scenarios and the outcome each team gets. */
export const useCases: { role: string; outcome: string; metric: string }[] = [
  { role: 'Agency Owner', outcome: 'Every client, project, and invoice in one place.', metric: '2 days/wk saved' },
  { role: 'Sales Team', outcome: 'A pipeline that updates itself and flags risk early.', metric: '+32% win rate' },
  { role: 'Marketing Team', outcome: 'Campaigns, audiences, and attribution that add up.', metric: '4.2× ROAS' },
  { role: 'Operations Manager', outcome: 'One control room for the entire business.', metric: '1 source of truth' },
  { role: 'Consultancy', outcome: 'Institutional knowledge, instantly accessible.', metric: '−68% admin' },
  { role: 'Startup Founder', outcome: 'Run lean from day one, without tool sprawl.', metric: '7→1 tools' },
  { role: 'Service Business', outcome: 'From first booking to final invoice, automated.', metric: 'Paid 2× faster' },
];

/** Testimonials that emerge with their headline metric. */
export const proofs: {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
}[] = [
  {
    quote:
      'We replaced seven tools with Citron in a month. The team stopped switching tabs and started shipping.',
    name: 'Maya Okafor',
    role: 'COO',
    company: 'Meridian Labs',
    metric: '7→1',
    metricLabel: 'tools consolidated',
  },
  {
    quote:
      'The AI doesn’t just store our data — it acts on it. Deals at risk get flagged before I’d have noticed.',
    name: 'Daniel Reyes',
    role: 'VP Sales',
    company: 'Northwind',
    metric: '+32%',
    metricLabel: 'win rate',
  },
  {
    quote:
      'Onboarding used to take three weeks of context. Now Citron answers instantly. Our knowledge left people’s heads.',
    name: 'Sofia Lindqvist',
    role: 'Founder',
    company: 'Atlas Consulting',
    metric: '−68%',
    metricLabel: 'admin time',
  },
];

/** Tools absorbed into Citron in the opening act. */
export const fragmentedTools = [
  'CRM',
  'Spreadsheets',
  'Email',
  'Projects',
  'Invoices',
  'Chat',
  'Analytics',
  'Calendar',
  'Docs',
  'Support',
];

/* ============================================================
   Mascot choreography — a pose per scene (hero · acts · finale · origin)
   ============================================================ */
export type ScenePose = {
  x: number; // -1..1 (× horizontal amplitude)
  y: number; // -1..1 (× vertical amplitude)
  scale: number;
  rotate: number; // degrees of lean
  opacity: number;
  trick: Trick;
  visual?: CheckpointVisual;
};

export const scenes: ScenePose[] = (() => {
  const hero: ScenePose = { x: 0, y: 0.06, scale: 1.34, rotate: 0, opacity: 1, trick: 'none' };

  const actPoses: ScenePose[] = acts.map((a, i) => {
    const centered = a.kind === 'cases' || a.kind === 'testimonials' || a.kind === 'ai';
    const visualDir = a.side === 'left' ? 1 : -1; // mascot drifts toward the visual
    return {
      x: centered ? (a.kind === 'ai' ? visualDir * 0.55 : 0) : visualDir * 0.92,
      y: i % 2 === 0 ? -0.55 : 0.55,
      scale: centered ? 0.52 : 0.6,
      rotate: centered ? 0 : visualDir * -6,
      opacity: a.kind === 'cases' || a.kind === 'testimonials' ? 0.62 : 0.9,
      trick: a.trick ?? 'none',
      visual: a.visual,
    };
  });

  const citron: ScenePose = { x: 0, y: 0, scale: 1.28, rotate: 0, opacity: 1, trick: 'spin' };
  const inkblot: ScenePose = { x: 0, y: 0.05, scale: 0.96, rotate: 0, opacity: 1, trick: 'none' };

  return [hero, ...actPoses, citron, inkblot];
})();

export const TOTAL_SCENES = scenes.length;
export const HERO_INDEX = 0;
export const CITRON_INDEX = TOTAL_SCENES - 2;
export const INKBLOT_INDEX = TOTAL_SCENES - 1;
/** Scene index for the act at position `i` in `acts`. */
export const actIndex = (i: number) => 1 + i;
