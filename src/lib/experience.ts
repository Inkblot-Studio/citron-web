/**
 * The Citron journey — a guided descent through ten checkpoints, each a
 * milestone the visitor reaches, absorbs, and travels beyond. Copy is kept
 * deliberately short: the visuals and the mascot carry the story.
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

export type Checkpoint = {
  number: string;
  id: string;
  /** Milestone title shown on the checkpoint marker. */
  title: string;
  /** Short content headline (≤ 4 words). */
  headline: string;
  /** A single concise line (≤ 6 words). */
  tagline: string;
  side: 'left' | 'right';
  visual: CheckpointVisual;
  /** One floating contextual insight. */
  insight: { value: string; label: string };
};

export const checkpoints: Checkpoint[] = [
  {
    number: '01',
    id: 'why',
    title: 'Why Citron Exists',
    headline: 'Too many tools.',
    tagline: 'Work scattered everywhere.',
    side: 'left',
    visual: 'unification',
    insight: { value: '12+', label: 'apps replaced by one' },
  },
  {
    number: '02',
    id: 'platform',
    title: 'One Platform',
    headline: 'One system.',
    tagline: 'Everything, connected.',
    side: 'right',
    visual: 'platform',
    insight: { value: '1', label: 'system, not twelve' },
  },
  {
    number: '03',
    id: 'crm',
    title: 'CRM Intelligence',
    headline: 'Relationships, in context.',
    tagline: 'Every signal, surfaced.',
    side: 'left',
    visual: 'crm',
    insight: { value: '360°', label: 'view of every account' },
  },
  {
    number: '04',
    id: 'marketing',
    title: 'Marketing Engine',
    headline: 'Reach that resonates.',
    tagline: 'Signals find their audience.',
    side: 'right',
    visual: 'marketing',
    insight: { value: '4.2×', label: 'return on spend' },
  },
  {
    number: '05',
    id: 'automations',
    title: 'Automations',
    headline: 'It runs itself.',
    tagline: 'Describe it. It’s done.',
    side: 'left',
    visual: 'automations',
    insight: { value: '∞', label: 'workflows, no code' },
  },
  {
    number: '06',
    id: 'agents',
    title: 'AI Agents',
    headline: 'A teammate, always on.',
    tagline: 'Acts on your data.',
    side: 'right',
    visual: 'agents',
    insight: { value: '24/7', label: 'always working' },
  },
  {
    number: '07',
    id: 'finance',
    title: 'Finance',
    headline: 'Money, in motion.',
    tagline: 'Invoiced. Paid. Reconciled.',
    side: 'left',
    visual: 'finance',
    insight: { value: '−68%', label: 'admin time' },
  },
  {
    number: '08',
    id: 'operations',
    title: 'Operations',
    headline: 'Everything in sync.',
    tagline: 'One source of truth.',
    side: 'right',
    visual: 'operations',
    insight: { value: '1', label: 'source of truth' },
  },
  {
    number: '09',
    id: 'unified',
    title: 'Unified Intelligence',
    headline: 'It all connects.',
    tagline: 'One mind for the company.',
    side: 'left',
    visual: 'convergence',
    insight: { value: '90%', label: 'less tool switching' },
  },
  {
    number: '10',
    id: 'future',
    title: 'The Future of Business',
    headline: 'Where business goes.',
    tagline: 'Built for what’s next.',
    side: 'right',
    visual: 'future',
    insight: { value: '99.9%', label: 'uptime, always on' },
  },
];

/** Scene map that drives the mascot's travel, pauses, and scale. */
export type Scene = {
  kind: 'hero' | 'marker' | 'content' | 'citron' | 'inkblot';
  side?: 'left' | 'right';
};

export const scenes: Scene[] = (() => {
  const list: Scene[] = [{ kind: 'hero' }];
  for (const cp of checkpoints) {
    list.push({ kind: 'marker' });
    list.push({ kind: 'content', side: cp.side });
  }
  list.push({ kind: 'citron' });
  list.push({ kind: 'inkblot' });
  return list;
})();

export const TOTAL_SCENES = scenes.length;
export const CITRON_INDEX = TOTAL_SCENES - 2;
export const INKBLOT_INDEX = TOTAL_SCENES - 1;

export function markerIndex(cpPosition: number) {
  return 1 + cpPosition * 2;
}
export function contentIndex(cpPosition: number) {
  return 2 + cpPosition * 2;
}

/** Floating prompts the AI agent appears to execute. */
export const agentPrompts: { prompt: string; reply: string }[] = [
  {
    prompt: 'Follow up with leads that went quiet.',
    reply: 'Drafted 18 personalized follow-ups — ready for review.',
  },
  {
    prompt: 'Invoice this month’s active clients.',
    reply: '12 invoices · $148,200 queued with payment links.',
  },
  {
    prompt: 'Which deals are at risk?',
    reply: '6 deals flagged · $186K — no contact in 12+ days.',
  },
  {
    prompt: 'Generate the weekly report.',
    reply: 'Ready · 4.2× ROAS · 312 MQLs · CAC down 19%.',
  },
];

/** Tools absorbed into Citron in the first checkpoint. */
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
