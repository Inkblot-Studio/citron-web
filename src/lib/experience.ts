/**
 * The Citron journey — narrative chapters.
 * Each chapter is a discovery, not a section. Copy stays minimal: the
 * visuals carry the story, the words punctuate it.
 */

export type ChapterId =
  | 'unification'
  | 'crm'
  | 'marketing'
  | 'automations'
  | 'agents'
  | 'finance'
  | 'operations';

export type Chapter = {
  id: ChapterId;
  /** Position of the chapter's content column on desktop. */
  side: 'left' | 'right';
  index: string;
  eyebrow: string;
  /** The headline — `accent` words within it are highlighted. */
  title: string;
  accent: string;
  line: string;
};

export const chapters: Chapter[] = [
  {
    id: 'unification',
    side: 'left',
    index: '01',
    eyebrow: 'The shift',
    title: 'Too many tools. One intelligence.',
    accent: 'One intelligence.',
    line: 'A dozen disconnected apps, pulled into a single living system. Nothing falls through the cracks between tabs anymore.',
  },
  {
    id: 'crm',
    side: 'right',
    index: '02',
    eyebrow: 'Relationships',
    title: 'Every relationship, in context.',
    accent: 'in context.',
    line: 'Leads, accounts, and deals flow through the spine as living nodes — scored, enriched, and surfaced the moment they matter.',
  },
  {
    id: 'marketing',
    side: 'left',
    index: '03',
    eyebrow: 'Reach',
    title: 'Signals that find their audience.',
    accent: 'find their audience.',
    line: 'Campaigns ripple outward across every channel. Audiences light up. Engagement pulses back through the structure.',
  },
  {
    id: 'automations',
    side: 'right',
    index: '04',
    eyebrow: 'Motion',
    title: 'Workflows that build themselves.',
    accent: 'build themselves.',
    line: 'Describe an outcome. Citron assembles the triggers, conditions, and actions — and the paths form in front of you.',
  },
  {
    id: 'agents',
    side: 'left',
    index: '05',
    eyebrow: 'Intelligence',
    title: 'A teammate for every workflow.',
    accent: 'every workflow.',
    line: 'Autonomous agents act across your data — qualifying, drafting, reconciling, and closing loops while you sleep.',
  },
  {
    id: 'finance',
    side: 'right',
    index: '06',
    eyebrow: 'Revenue',
    title: 'Money, in motion.',
    accent: 'in motion.',
    line: 'Invoices emerge, payments land, and revenue streams flow through the branches — reconciled the moment they arrive.',
  },
  {
    id: 'operations',
    side: 'left',
    index: '07',
    eyebrow: 'The whole company',
    title: 'Everything, in sync.',
    accent: 'in sync.',
    line: 'Tasks, teams, and projects converge into one source of truth the entire company can finally trust.',
  },
];

/** Floating prompts the AI agent appears to execute, with its reply. */
export const agentPrompts: { prompt: string; reply: string }[] = [
  {
    prompt: 'Follow up with every lead that went quiet this week.',
    reply: 'Drafted 18 personalized follow-ups across 3 segments — ready for review.',
  },
  {
    prompt: 'Create invoices for this month’s active clients.',
    reply: '12 invoices generated · $148,200 queued with payment links.',
  },
  {
    prompt: 'Which deals are at risk of slipping this quarter?',
    reply: '6 deals flagged · $186K at risk — no contact in 12+ days.',
  },
  {
    prompt: 'Generate the weekly performance report.',
    reply: 'Report ready · 4.2× ROAS · 312 MQLs · CAC down 19%.',
  },
];

/** Tools that get absorbed into Citron in the unification chapter. */
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
