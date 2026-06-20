/**
 * The Citron story — nine distinct chapters. The mascot is the guide: it
 * travels to a dedicated position in each chapter (and never shares space
 * with content). This file holds the choreography and the chapter content.
 */

export type Anchor =
  | 'top-center'
  | 'upper-right'
  | 'left'
  | 'lower-right'
  | 'upper-left'
  | 'center-right'
  | 'lower-left'
  | 'center';

export type Trick = 'none' | 'spin' | 'flip' | 'pop';
export type Side = 'left' | 'right' | 'center';
export type Mood = 'dawn' | 'plain' | 'wash' | 'surface' | 'deep';

/** Mascot anchor as a fraction of the viewport (desktop guide). */
export const ANCHOR_POS: Record<Anchor, { x: number; y: number }> = {
  'top-center': { x: 0.5, y: 0.17 },
  'upper-right': { x: 0.75, y: 0.28 },
  left: { x: 0.24, y: 0.5 },
  'lower-right': { x: 0.76, y: 0.7 },
  'upper-left': { x: 0.25, y: 0.28 },
  'center-right': { x: 0.78, y: 0.5 },
  'lower-left': { x: 0.24, y: 0.72 },
  center: { x: 0.5, y: 0.44 },
};

export type Scene = {
  id: string;
  anchor: Anchor;
  scale: number;
  trick: Trick;
  side: Side;
  mood: Mood;
  /** Render this chapter as a dark panel (regardless of global theme). */
  dark?: boolean;
};

export const scenes: Scene[] = [
  { id: 'hero', anchor: 'top-center', scale: 1.15, trick: 'none', side: 'center', mood: 'dawn' },
  { id: 'problem', anchor: 'upper-right', scale: 0.8, trick: 'pop', side: 'left', mood: 'deep', dark: true },
  { id: 'crm', anchor: 'left', scale: 0.82, trick: 'spin', side: 'right', mood: 'wash' },
  { id: 'platform', anchor: 'lower-right', scale: 0.8, trick: 'flip', side: 'left', mood: 'deep', dark: true },
  { id: 'ai', anchor: 'upper-left', scale: 0.8, trick: 'pop', side: 'right', mood: 'plain' },
  { id: 'automations', anchor: 'center-right', scale: 0.82, trick: 'spin', side: 'left', mood: 'deep', dark: true },
  { id: 'impact', anchor: 'lower-left', scale: 0.8, trick: 'flip', side: 'right', mood: 'surface' },
  { id: 'why', anchor: 'upper-right', scale: 0.8, trick: 'pop', side: 'left', mood: 'plain' },
  { id: 'inkblot', anchor: 'top-center', scale: 0.7, trick: 'spin', side: 'center', mood: 'deep', dark: true },
];

export const TOTAL_SCENES = scenes.length;

/* ---------- chapter content ---------- */

export const problemTools = [
  'CRM',
  'Spreadsheets',
  'Email',
  'Invoicing',
  'Chat',
  'Calendar',
];

export const crmFeatures: { title: string; desc: string }[] = [
  { title: 'Leads', desc: 'Capture and route every inbound automatically.' },
  { title: 'Pipelines', desc: 'Visual stages that update from real signals.' },
  { title: 'Opportunities', desc: 'See the deals worth your time.' },
  { title: 'Customers', desc: 'Every relationship, in full context.' },
  { title: 'Sales visibility', desc: 'Forecast with quiet confidence.' },
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

export const aiActions: { prompt: string; outcome: string }[] = [
  { prompt: 'Create invoices for unpaid customers', outcome: '9 invoices · $63,400 sent with payment links' },
  { prompt: 'Generate a monthly report', outcome: 'Revenue, churn and runway — ready to share' },
  { prompt: 'Follow up with inactive leads', outcome: '42 personalized emails drafted for review' },
  { prompt: 'Summarize this meeting', outcome: 'Notes, decisions and action items captured' },
];

export const automationFlow: { label: string; kind: 'trigger' | 'action' }[] = [
  { label: 'When a deal is won', kind: 'trigger' },
  { label: 'Create the invoice', kind: 'action' },
  { label: 'Notify the team', kind: 'action' },
  { label: 'Schedule onboarding', kind: 'action' },
];

export const impactMetrics: { value: string; label: string }[] = [
  { value: '7→1', label: 'tools consolidated' },
  { value: '+32%', label: 'win rate' },
  { value: '−68%', label: 'admin time' },
];

export const impactQuote = {
  quote:
    'We replaced seven tools with Citron in a month. The team stopped switching tabs and started shipping.',
  name: 'Maya Okafor',
  role: 'COO, Meridian Labs',
};

export const comparison: { label: string; before: string; after: string }[] = [
  { label: 'Tools', before: '7+ disconnected apps', after: 'One system' },
  { label: 'Your data', before: 'Scattered in silos', after: 'Single source of truth' },
  { label: 'Busywork', before: 'Manual, every day', after: 'Automated by AI' },
  { label: 'Setup', before: 'Weeks of wiring', after: 'Live in a day' },
];

export const whyReasons: { title: string; desc: string; icon: string }[] = [
  { title: 'One system', desc: 'Everything connected — nothing lost in silos.', icon: 'Boxes' },
  { title: 'AI-native', desc: 'Intelligence in every workflow, by default.', icon: 'Sparkles' },
  { title: 'Yours alone', desc: 'Your data stays private and never trains shared models.', icon: 'ShieldCheck' },
  { title: 'Live in a day', desc: 'Set up fast, with no integration debt.', icon: 'Zap' },
];

export const inkblotPillars: { title: string; desc: string; icon: string }[] = [
  { title: 'AI-native by default', desc: 'Every product starts with intelligence woven through it.', icon: 'Sparkles' },
  { title: 'Ambitious software', desc: 'We build complete systems, not features.', icon: 'Layers' },
  { title: 'Design-led', desc: 'Calm interfaces companies want to live inside.', icon: 'Compass' },
];
