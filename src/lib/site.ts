export const siteConfig = {
  name: 'Citron',
  tagline: 'The Business Operating System',
  description:
    'Your company. One intelligence. Citron replaces dozens of disconnected tools with a single AI-powered operating system: CRM, marketing, automations, finance, and AI agents, unified.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://citronos.com',
  ogImage: '/og.png',
  identity: {
    url: process.env.NEXT_PUBLIC_IDENTITY_URL ?? 'https://identity.citronos.com',
  },
  /** Billing & usage dashboard — separate subdomain app. */
  billing: {
    url: process.env.NEXT_PUBLIC_BILLING_URL ?? 'https://dashboard.citronos.com',
  },
  settings: {
    url: process.env.NEXT_PUBLIC_SETTINGS_URL ?? 'https://setting.citronos.com',
  },
  download: {
    url: process.env.NEXT_PUBLIC_DOWNLOAD_URL ?? 'https://download.citronos.com',
  },
  studio: {
    name: 'Inkblot Studio',
    url: 'https://inkblotstudio.eu',
  },
  contact: {
    email: 'hello@citronos.com',
    sales: 'sales@citronos.com',
    support: 'support@citronos.com',
  },
  social: {
    x: 'https://x.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
} as const;

/**
 * URL into the identity portal. Always returns via `/auth/callback` so we can
 * mint the shared `.citronos.com` session cookie from the `#token=` fragment.
 */
export function identityUrl(path: 'login' | 'signup', returnTo?: string) {
  const base = `${siteConfig.identity.url}/${path}`;
  // Prefer a same-origin path for `next` to avoid nested URL encoding issues.
  const next =
    !returnTo ? '/account' : returnTo.startsWith('http') ? returnTo : returnTo.startsWith('/') ? returnTo : `/${returnTo}`;
  const callback = `${siteConfig.url}/auth/callback?next=${encodeURIComponent(next)}`;
  return `${base}?redirect_uri=${encodeURIComponent(callback)}`;
}

/** Absolute URL into the billing/usage subdomain app. */
export function billingUrl(path = '/') {
  return `${siteConfig.billing.url}${path}`;
}

export function settingsUrl(path = '/') {
  return `${siteConfig.settings.url}${path}`;
}

export function downloadUrl(path = '/') {
  return `${siteConfig.download.url}${path}`;
}

/** @deprecated Prefer settingsUrl — profile lives on setting.citronos.com */
export function identityPortalUrl(path = '/') {
  return `${siteConfig.identity.url}${path}`;
}

/** Clear local session cookie, then Identity portal session. */
export function logoutUrl(returnTo = '/') {
  const dest = returnTo.startsWith('http') ? returnTo : `${siteConfig.url}${returnTo}`;
  return `/auth/logout?next=${encodeURIComponent(dest)}`;
}

export type Module = {
  slug: string;
  name: string;
  category: 'Revenue' | 'Operations' | 'Finance' | 'Intelligence';
  icon: string; // lucide icon name
  tagline: string;
  description: string;
  features: string[];
};

export const modules: Module[] = [
  {
    slug: 'crm',
    name: 'CRM',
    category: 'Revenue',
    icon: 'Users',
    tagline: 'Every relationship, in context.',
    description:
      'A living record of every customer: enriched, scored, and surfaced exactly when it matters. No more stitching together five tabs to understand one account.',
    features: ['Unified contact timeline', 'AI lead scoring', 'Relationship intelligence', 'Account health'],
  },
  {
    slug: 'sales',
    name: 'Sales Pipelines',
    category: 'Revenue',
    icon: 'TrendingUp',
    tagline: 'Pipelines that move themselves.',
    description:
      'Visual pipelines that update from real signals. Citron flags stalled deals, drafts the next touch, and forecasts with confidence.',
    features: ['Drag-and-drop stages', 'Deal risk detection', 'Revenue forecasting', 'Automated next steps'],
  },
  {
    slug: 'marketing',
    name: 'Marketing',
    category: 'Revenue',
    icon: 'Megaphone',
    tagline: 'Campaigns, composed by intelligence.',
    description:
      'Plan, launch, and measure across every channel. Generate copy, segment audiences, and let AI optimize spend toward outcomes.',
    features: ['Multi-channel campaigns', 'AI copy & creative', 'Smart segmentation', 'Attribution that adds up'],
  },
  {
    slug: 'leads',
    name: 'Lead Management',
    category: 'Revenue',
    icon: 'Target',
    tagline: 'No lead left behind.',
    description:
      'Capture, route, and nurture every inbound lead automatically. Citron prioritizes the ones most likely to close.',
    features: ['Instant routing', 'Enrichment on capture', 'Intent signals', 'Automated nurture'],
  },
  {
    slug: 'automations',
    name: 'Automations',
    category: 'Operations',
    icon: 'Workflow',
    tagline: 'Workflows that build themselves.',
    description:
      'Describe an outcome in plain language. Citron assembles the triggers, conditions, and actions across every module.',
    features: ['Natural-language builder', 'Cross-module triggers', 'Conditional logic', 'Human-in-the-loop steps'],
  },
  {
    slug: 'tasks',
    name: 'Task Management',
    category: 'Operations',
    icon: 'ListChecks',
    tagline: 'Work, organized by outcome.',
    description:
      'Tasks, projects, and sprints with AI that prioritizes, assigns, and keeps everything moving toward the goal.',
    features: ['Smart prioritization', 'Auto-assignment', 'Dependencies', 'Project timelines'],
  },
  {
    slug: 'collaboration',
    name: 'Team Collaboration',
    category: 'Operations',
    icon: 'MessagesSquare',
    tagline: 'One place to think together.',
    description:
      'Threads, docs, and decisions live next to the work itself. No context lost between tools.',
    features: ['Contextual threads', 'Shared docs', 'Mentions & assignments', 'Decision logs'],
  },
  {
    slug: 'scheduling',
    name: 'Scheduling',
    category: 'Operations',
    icon: 'CalendarClock',
    tagline: 'Time, coordinated.',
    description:
      'Meetings, availability, and reminders that sync to the work and the customer, automatically.',
    features: ['Shared availability', 'Round-robin routing', 'Reminders', 'Calendar sync'],
  },
  {
    slug: 'invoicing',
    name: 'Invoicing',
    category: 'Finance',
    icon: 'ReceiptText',
    tagline: 'Get paid, without the chase.',
    description:
      'Create, send, and reconcile invoices from the same place you close the deal. Citron handles reminders and follow-up.',
    features: ['One-click invoices', 'Auto reminders', 'Payment links', 'Reconciliation'],
  },
  {
    slug: 'accounting',
    name: 'Accounting',
    category: 'Finance',
    icon: 'Landmark',
    tagline: 'Books that keep themselves.',
    description:
      'Real-time financial picture, categorized automatically. Close faster with AI-assisted reconciliation and reporting.',
    features: ['Auto-categorization', 'Real-time P&L', 'Tax-ready exports', 'Cash-flow insight'],
  },
  {
    slug: 'analytics',
    name: 'Analytics',
    category: 'Intelligence',
    icon: 'BarChart3',
    tagline: 'Answers, not dashboards.',
    description:
      'Ask anything about your business in plain language. Citron builds the chart, finds the trend, and explains the why.',
    features: ['Ask in plain language', 'Auto-generated reports', 'Anomaly detection', 'Live KPIs'],
  },
  {
    slug: 'ai-agents',
    name: 'AI Agents',
    category: 'Intelligence',
    icon: 'Bot',
    tagline: 'A teammate for every workflow.',
    description:
      'Autonomous agents that act across your data: qualifying leads, drafting replies, updating records, and closing loops.',
    features: ['Autonomous actions', 'Grounded in your data', 'Guardrails & approvals', 'Always learning'],
  },
];

export type Solution = {
  slug: string;
  audience: string;
  headline: string;
  description: string;
  outcomes: string[];
  modules: string[];
};

export const solutions: Solution[] = [
  {
    slug: 'startups',
    audience: 'Startups',
    headline: 'Run lean. Move fast. Stay coordinated.',
    description:
      'One system from day one. Skip the tool sprawl and the integration debt. Citron grows with you from first customer to Series B.',
    outcomes: ['Set up in a day', 'No integration overhead', 'AI doing the work of a bigger team'],
    modules: ['CRM', 'Sales Pipelines', 'Automations', 'Invoicing'],
  },
  {
    slug: 'agencies',
    audience: 'Agencies',
    headline: 'Every client, every project, one operating system.',
    description:
      'Manage clients, campaigns, deliverables, and billing in one place. Give every account the attention of a dedicated team.',
    outcomes: ['Client-ready reporting', 'Profitability per account', 'Automated retainer billing'],
    modules: ['Marketing', 'Tasks', 'Invoicing', 'Analytics'],
  },
  {
    slug: 'professional-services',
    audience: 'Professional Services',
    headline: 'Bill your expertise, not your admin.',
    description:
      'Track engagements, time, and outcomes while Citron handles the operational overhead behind the scenes.',
    outcomes: ['Engagement-level visibility', 'Automated time-to-invoice', 'Resourcing intelligence'],
    modules: ['CRM', 'Scheduling', 'Accounting', 'Tasks'],
  },
  {
    slug: 'consultancies',
    audience: 'Consultancies',
    headline: 'Institutional knowledge, instantly accessible.',
    description:
      'Capture what your firm knows and let AI surface it on every engagement. Onboard faster, deliver sharper.',
    outcomes: ['Searchable knowledge engine', 'Faster onboarding', 'Consistent delivery'],
    modules: ['AI Agents', 'Collaboration', 'Tasks', 'Analytics'],
  },
  {
    slug: 'sales-teams',
    audience: 'Sales Teams',
    headline: 'Sell more. Update less.',
    description:
      'Citron keeps the pipeline current, drafts the follow-ups, and tells reps exactly where to spend the next hour.',
    outcomes: ['Pipeline that updates itself', 'AI-drafted outreach', 'Accurate forecasting'],
    modules: ['Sales Pipelines', 'Lead Management', 'AI Agents', 'Analytics'],
  },
  {
    slug: 'operations-teams',
    audience: 'Operations Teams',
    headline: 'The control room for the whole business.',
    description:
      'Connect every process, automate the busywork, and get a single source of truth that the entire company trusts.',
    outcomes: ['One source of truth', 'Process automation', 'Cross-team visibility'],
    modules: ['Automations', 'Analytics', 'Tasks', 'Collaboration'],
  },
];

export type AiCommand = {
  prompt: string;
  response: string;
  module: string;
};

export const aiCommands: AiCommand[] = [
  {
    prompt: 'Create an invoice for Copperline for the Q3 retainer.',
    response: 'Invoice #1042 created: $24,000 to Copperline. Sent with a 14-day payment link.',
    module: 'Invoicing',
  },
  {
    prompt: 'Follow up with all leads from last week that went quiet.',
    response: 'Drafted 18 personalized follow-ups across 3 segments. Ready for your review.',
    module: 'Lead Management',
  },
  {
    prompt: "Generate this month's marketing performance report.",
    response: 'Report ready: 4.2x ROAS, 312 MQLs, CAC down 19%. Top channel: organic search.',
    module: 'Analytics',
  },
  {
    prompt: 'Identify deals at risk of slipping this quarter.',
    response: '6 deals flagged, $186K at risk. Common signal: no contact in 12+ days.',
    module: 'Sales Pipelines',
  },
  {
    prompt: 'Summarize every open thread with Northwind and what they need.',
    response: 'Northwind is waiting on a revised SOW and pricing for 3 extra seats.',
    module: 'CRM',
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'We replaced seven tools with Citron in a month. Our team stopped switching tabs and started shipping. It feels like the software finally understands how we work.',
    name: 'Maya Okafor',
    role: 'COO',
    company: 'Meridian Labs',
  },
  {
    quote:
      'The AI layer is the difference. It does not just store our data, it acts on it. Deals at risk get flagged before I would have noticed. That is a different category of product.',
    name: 'Daniel Reyes',
    role: 'VP Sales',
    company: 'Northwind',
  },
  {
    quote:
      'Onboarding a new hire used to take three weeks of context. Now Citron answers their questions instantly. Our knowledge stopped living in people’s heads.',
    name: 'Sofia Lindqvist',
    role: 'Founder',
    company: 'Atlas Consulting',
  },
];

export type CaseStudy = {
  company: string;
  industry: string;
  metric: string;
  metricLabel: string;
  summary: string;
};

export const caseStudies: CaseStudy[] = [
  {
    company: 'Meridian Labs',
    industry: 'SaaS',
    metric: '7→1',
    metricLabel: 'tools consolidated',
    summary: 'Cut software spend by 41% while improving cross-team visibility.',
  },
  {
    company: 'Northwind',
    industry: 'Manufacturing',
    metric: '+32%',
    metricLabel: 'win rate',
    summary: 'AI deal-risk detection recovered $1.2M in slipping pipeline.',
  },
  {
    company: 'Atlas Consulting',
    industry: 'Professional Services',
    metric: '−68%',
    metricLabel: 'admin time',
    summary: 'Automated time-to-invoice freed two days a week per consultant.',
  },
];

export const stats = [
  { value: '12+', label: 'modules, one system' },
  { value: '90%', label: 'less tool switching' },
  { value: '4.2x', label: 'faster to act on data' },
  { value: '99.9%', label: 'uptime SLA' },
];
