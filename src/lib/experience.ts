/**
 * The Citron story — nine chapters, each answering one question. The mascot is
 * the guide: it is intentionally placed in every chapter (never on a predictable
 * left-right loop), and several chapters make it the centerpiece with content
 * balanced around it. This file holds the choreography and the chapter content.
 */

export type Trick = 'none' | 'spin' | 'flip' | 'pop';
export type Mood = 'dawn' | 'plain' | 'wash' | 'surface' | 'deep';

/**
 * Where the content sits relative to the mascot:
 *  · above — mascot floats high & centered, content reads below it (centerpiece)
 *  · left  — mascot on the left,  content on the right
 *  · right — mascot on the right, content on the left
 *  · split — mascot dead-center, content balanced in two columns around it
 */
export type Layout = 'above' | 'left' | 'right' | 'split';

export type Scene = {
  id: string;
  layout: Layout;
  /** Mascot position as a fraction of the viewport (desktop guide). */
  pos: { x: number; y: number };
  scale: number;
  trick: Trick;
  mood: Mood;
  /** Render this chapter as a dark panel (regardless of global theme). */
  dark?: boolean;
};

export const scenes: Scene[] = [
  // 1 · What is Citron?            — centerpiece intro
  { id: 'hero', layout: 'above', pos: { x: 0.5, y: 0.3 }, scale: 1.25, trick: 'none', mood: 'dawn' },
  // 2 · Why are tools broken?      — mascot right, content left
  { id: 'problem', layout: 'right', pos: { x: 0.8, y: 0.34 }, scale: 0.92, trick: 'pop', mood: 'deep', dark: true },
  // 3 · What is Citron CRM?        — mascot left (low), content right
  { id: 'crm', layout: 'left', pos: { x: 0.2, y: 0.6 }, scale: 0.95, trick: 'spin', mood: 'wash' },
  // 4 · What is Citron Platform?   — CENTERPIECE, modules flank the mascot
  { id: 'platform', layout: 'split', pos: { x: 0.5, y: 0.46 }, scale: 0.86, trick: 'flip', mood: 'deep', dark: true },
  // 5 · How does AI help?          — mascot right, console left
  { id: 'ai', layout: 'right', pos: { x: 0.8, y: 0.4 }, scale: 0.92, trick: 'pop', mood: 'plain' },
  // 6 · How does automation help?  — mascot left, flow right
  { id: 'automations', layout: 'left', pos: { x: 0.2, y: 0.5 }, scale: 0.95, trick: 'spin', mood: 'deep', dark: true },
  // 7 · How does it impact?        — CENTERPIECE, metrics vs. voice
  { id: 'impact', layout: 'split', pos: { x: 0.5, y: 0.46 }, scale: 0.86, trick: 'flip', mood: 'surface' },
  // 8 · Why is it different?       — mascot right (high), table left
  { id: 'why', layout: 'right', pos: { x: 0.78, y: 0.33 }, scale: 0.92, trick: 'pop', mood: 'plain' },
  // 9 · Who built it / start       — closing centerpiece
  { id: 'inkblot', layout: 'above', pos: { x: 0.5, y: 0.3 }, scale: 0.78, trick: 'spin', mood: 'deep', dark: true },
];

export const TOTAL_SCENES = scenes.length;

/* ---------- chapter content ---------- */

/** The scattered stack — the everyday reality Citron replaces. */
export const problemTools = [
  'CRM',
  'Spreadsheets',
  'Email threads',
  'Invoicing app',
  'Team chat',
  'Shared calendar',
];

export const crmFeatures: { title: string; desc: string }[] = [
  { title: 'Leads', desc: 'Capture every inbound and route it in seconds — nothing slips.' },
  { title: 'Pipelines', desc: 'Visual stages that move themselves as deals progress.' },
  { title: 'Opportunities', desc: 'Always know which deals truly deserve your time.' },
  { title: 'Customers', desc: 'Every conversation, contract, and detail in one view.' },
  { title: 'Forecasting', desc: 'Predict revenue with numbers you can actually trust.' },
];

export const platformModules: { name: string; icon: string }[] = [
  { name: 'CRM', icon: 'Users' },
  { name: 'AI', icon: 'Sparkles' },
  { name: 'Automations', icon: 'Workflow' },
  { name: 'Finance', icon: 'ReceiptText' },
  { name: 'Tasks', icon: 'ListChecks' },
  { name: 'Marketing', icon: 'Megaphone' },
  { name: 'Operations', icon: 'Building2' },
  { name: 'Collaboration', icon: 'MessagesSquare' },
];

/** Two highlight points for the platform centerpiece (left column). */
export const platformPoints: { title: string; desc: string; icon: string }[] = [
  { title: 'One source of truth', desc: 'Every team works from the same live data — no more reconciling.', icon: 'Boxes' },
  { title: 'Every function, connected', desc: 'Sales to finance to ops, woven into a single system.', icon: 'Workflow' },
];

export const aiActions: { prompt: string; outcome: string }[] = [
  { prompt: 'Invoice every customer with an overdue balance', outcome: '9 invoices · $63,400 sent with payment links' },
  { prompt: 'Build this month’s revenue report', outcome: 'Revenue, churn and runway — ready to share' },
  { prompt: 'Re-engage leads that have gone quiet', outcome: '42 personalized emails drafted for your review' },
  { prompt: 'Turn this meeting into next steps', outcome: 'Notes, decisions and owners captured automatically' },
];

export const automationFlow: { label: string; kind: 'trigger' | 'action' }[] = [
  { label: 'A deal is marked won', kind: 'trigger' },
  { label: 'Generate and send the invoice', kind: 'action' },
  { label: 'Alert the delivery team', kind: 'action' },
  { label: 'Kick off customer onboarding', kind: 'action' },
];

export const impactMetrics: { value: string; label: string }[] = [
  { value: '7→1', label: 'tools consolidated into one' },
  { value: '+32%', label: 'higher sales win rate' },
  { value: '−68%', label: 'less time on admin' },
];

export const impactQuote = {
  quote:
    'We replaced seven tools with Citron in a month. The team stopped switching tabs and started shipping.',
  name: 'Maya Okafor',
  role: 'COO, Meridian Labs',
};

export const comparison: { label: string; before: string; after: string }[] = [
  { label: 'Your tools', before: '7+ apps that don’t talk', after: 'One connected system' },
  { label: 'Your data', before: 'Scattered across silos', after: 'A single source of truth' },
  { label: 'Busywork', before: 'Manual, every single day', after: 'Handled by AI' },
  { label: 'Time to value', before: 'Weeks of wiring tools together', after: 'Live in a day' },
];

export const inkblotPillars: { title: string; desc: string; icon: string }[] = [
  { title: 'AI-native by default', desc: 'Every product starts with intelligence woven through it.', icon: 'Sparkles' },
  { title: 'Ambitious software', desc: 'We build complete systems, not features.', icon: 'Layers' },
  { title: 'Design-led', desc: 'Calm interfaces companies want to live inside.', icon: 'Compass' },
];
