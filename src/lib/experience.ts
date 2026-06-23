/**
 * The Citron story — a guided product narrative. The mascot is the protagonist:
 * it opens the hero by sweeping across the headline and lighting it up word by
 * word, then travels chapter to chapter (never overlapping the content) before
 * stepping aside for the dense product chapters and returning for the finale.
 * This file holds the choreography and the chapter content.
 */

export type Trick = 'none' | 'spin' | 'flip' | 'pop';
export type Mood = 'dawn' | 'plain' | 'wash' | 'surface' | 'deep';
export type SectionTheme = 'light' | 'dark';

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
  /** When dark, the section wraps itself in `.cine-section-dark`. */
  theme: SectionTheme;
  bgImage?: string;
  bgOverlay?: 'light' | 'dark';
};

export const scenes: Scene[] = [
  // 0 · Hero — light opening; the mascot sweeps the headline, then roams
  { id: 'hero', layout: 'above', pos: { x: 0.5, y: 0.2 }, scale: 1.12, trick: 'none', mood: 'dawn', theme: 'light' },
  // 1 · Command — mascot left, the living product surface on the right
  { id: 'command', layout: 'left', pos: { x: 0.21, y: 0.5 }, scale: 1.0, trick: 'pop', mood: 'plain', theme: 'light' },
  // 2 · Platform + AI — CENTERPIECE, narrative & console flank the mascot
  { id: 'platform', layout: 'split', pos: { x: 0.5, y: 0.5 }, scale: 0.84, trick: 'flip', mood: 'wash', theme: 'light' },
  // 3 · Finale — mascot on the right; copy stays clear on the left
  {
    id: 'finale',
    layout: 'right',
    pos: { x: 0.84, y: 0.46 },
    scale: 0.72,
    trick: 'spin',
    mood: 'surface',
    theme: 'light',
  },
];

export const TOTAL_SCENES = scenes.length;

/* ============================================================
   HERO — the headline the mascot reveals, word by word
   ============================================================ */

/** Each token is revealed in the mascot's trail. `accent` words glow gold. */
export const heroHeadline: { text: string; accent?: boolean }[] = [
  { text: 'Run' },
  { text: 'your' },
  { text: 'whole' },
  { text: 'company' },
  { text: 'on' },
  { text: 'one', accent: true },
  { text: 'system.', accent: true },
];

/* ============================================================
   COMMAND (CRM) — the living pipeline
   ============================================================ */

/** The visible stages of a deal moving through Citron CRM. */
export const crmStages: { name: string; deals: { name: string; value: string }[] }[] = [
  {
    name: 'Lead',
    deals: [
      { name: 'Acme Corp', value: '$24k' },
      { name: 'Northwind', value: '$8k' },
    ],
  },
  { name: 'Qualified', deals: [{ name: 'Atlas Co', value: '$36k' }] },
  { name: 'Proposal', deals: [{ name: 'Meridian', value: '$92k' }] },
  { name: 'Won', deals: [{ name: 'Helix Labs', value: '$48k' }] },
];

/* ============================================================
   PLATFORM + AI
   ============================================================ */

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

/* ============================================================
   BENTO — every function, one system
   ============================================================ */

export type BentoTile = {
  id: string;
  span: 'lg' | 'tall' | 'wide' | 'sm';
  eyebrow: string;
  title: string;
  desc: string;
  icon: string;
  /** Which mini-visual to render inside the tile. */
  visual: 'shot' | 'chart' | 'flow' | 'finance';
  /** Product screenshot for `shot` tiles. */
  image?: string;
  /** object-position for the cropped screenshot (hides foreign sidebar). */
  imagePos?: string;
};

export const bentoTiles: BentoTile[] = [
  {
    id: 'ai',
    span: 'lg',
    eyebrow: 'AI agents',
    title: 'Work that does itself',
    desc: 'Describe the outcome in plain language — Citron’s agents draft, send, update and close the loop across every module.',
    icon: 'Sparkles',
    visual: 'shot',
    image: '/shots/shot-ai.png',
    imagePos: '78% 0%',
  },
  {
    id: 'crm',
    span: 'tall',
    eyebrow: 'CRM',
    title: 'Pipelines that move themselves',
    desc: 'Deals advance on real signals, not manual updates.',
    icon: 'Users',
    visual: 'shot',
    image: '/shots/shot-crm.png',
    imagePos: '82% 0%',
  },
  {
    id: 'analytics',
    span: 'sm',
    eyebrow: 'Analytics',
    title: 'Answers, not dashboards',
    desc: 'Ask in plain language. Get the chart and the why.',
    icon: 'BarChart3',
    visual: 'chart',
  },
  {
    id: 'automations',
    span: 'sm',
    eyebrow: 'Automations',
    title: 'One trigger, everything follows',
    desc: 'Won deals invoice, alert, and onboard — automatically.',
    icon: 'Workflow',
    visual: 'flow',
  },
  {
    id: 'finance',
    span: 'sm',
    eyebrow: 'Finance',
    title: 'Books that keep themselves',
    desc: 'Invoicing and reconciliation, from the same place you sell.',
    icon: 'ReceiptText',
    visual: 'finance',
  },
  {
    id: 'global',
    span: 'wide',
    eyebrow: 'Command center',
    title: 'Every surface, one source of truth',
    desc: 'CRM, marketing, finance, ops and AI — connected in real time, on one live home screen.',
    icon: 'Globe',
    visual: 'shot',
    image: '/shots/shot-dashboard.png',
    imagePos: '78% 30%',
  },
];

/* ============================================================
   SHOWCASE — the horizontal product reel
   ============================================================ */

export type Surface = {
  id: string;
  label: string;
  title: string;
  desc: string;
  kind: 'dashboard' | 'board' | 'agent' | 'analytics' | 'automation';
};

export const surfaces: Surface[] = [
  {
    id: 'dashboard',
    label: 'Command center',
    title: 'The whole business, at a glance',
    desc: 'Revenue, pipeline, cash and tasks — one live home screen for the people who run the company.',
    kind: 'dashboard',
  },
  {
    id: 'crm',
    label: 'CRM',
    title: 'A pipeline that updates itself',
    desc: 'Drag-free stages that advance on real signals, with the next best move surfaced for every deal.',
    kind: 'board',
  },
  {
    id: 'ai',
    label: 'AI agents',
    title: 'Ask. It’s done.',
    desc: 'Natural-language commands that act across your data — grounded, guarded, and always reviewable.',
    kind: 'agent',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    title: 'Every metric, explained',
    desc: 'Live KPIs, anomaly alerts and reports that write themselves — no spreadsheet gymnastics.',
    kind: 'analytics',
  },
  {
    id: 'automations',
    label: 'Automations',
    title: 'Workflows you describe in a sentence',
    desc: 'Triggers, conditions and actions across every module — composed by intelligence, run on autopilot.',
    kind: 'automation',
  },
];

/* ============================================================
   PROOF — the numbers that rise on scroll
   ============================================================ */

export const proofMetrics: { value: string; label: string; sub: string }[] = [
  { value: '7→1', label: 'tools consolidated', sub: 'one system replaces the stack' },
  { value: '+32%', label: 'higher win rate', sub: 'AI flags deals before they slip' },
  { value: '−68%', label: 'less admin time', sub: 'busywork handled automatically' },
  { value: '<1 day', label: 'time to value', sub: 'live, not months of wiring' },
];

export const inkblotPillars: { title: string; desc: string; icon: string }[] = [
  { title: 'AI-native by default', desc: 'Every product starts with intelligence woven through it.', icon: 'Sparkles' },
  { title: 'Ambitious software', desc: 'We build complete systems, not features.', icon: 'Layers' },
  { title: 'Design-led', desc: 'Calm interfaces companies want to live inside.', icon: 'Compass' },
];
