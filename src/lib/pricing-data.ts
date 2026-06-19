export const comparisonGroups: {
  group: string;
  rows: { feature: string; starter: string | boolean; growth: string | boolean; enterprise: string | boolean }[];
}[] = [
  {
    group: 'Core platform',
    rows: [
      { feature: 'CRM & Lead Management', starter: true, growth: true, enterprise: true },
      { feature: 'Sales Pipelines', starter: true, growth: true, enterprise: true },
      { feature: 'Task & Project Management', starter: true, growth: true, enterprise: true },
      { feature: 'Team Collaboration', starter: true, growth: true, enterprise: true },
      { feature: 'Users included', starter: 'Up to 10', growth: 'Unlimited', enterprise: 'Unlimited' },
    ],
  },
  {
    group: 'Revenue & finance',
    rows: [
      { feature: 'Marketing & Campaigns', starter: false, growth: true, enterprise: true },
      { feature: 'Invoicing', starter: true, growth: true, enterprise: true },
      { feature: 'Accounting', starter: false, growth: true, enterprise: true },
      { feature: 'Analytics & Reporting', starter: 'Basic', growth: 'Advanced', enterprise: 'Advanced' },
    ],
  },
  {
    group: 'Intelligence',
    rows: [
      { feature: 'AI Agents', starter: '5', growth: 'Unlimited', enterprise: 'Unlimited' },
      { feature: 'AI Workflows', starter: 'Core', growth: 'Advanced', enterprise: 'Advanced' },
      { feature: 'Knowledge Engine', starter: false, growth: true, enterprise: true },
      { feature: 'Custom AI models', starter: false, growth: false, enterprise: true },
    ],
  },
  {
    group: 'Security & support',
    rows: [
      { feature: 'SSO & SCIM', starter: false, growth: false, enterprise: true },
      { feature: 'Audit logs', starter: false, growth: 'Standard', enterprise: 'Advanced' },
      { feature: 'Support', starter: 'Email', growth: 'Priority', enterprise: 'Dedicated CSM' },
      { feature: 'Uptime SLA', starter: false, growth: false, enterprise: '99.9%' },
    ],
  },
];

export const pricingFaq = [
  {
    q: 'Does every plan include the full platform?',
    a: 'Yes. Every Citron plan gives you the complete operating system. Plans differ by team size, the depth of certain modules, and the amount of AI and governance you need — not by locking core capabilities behind a paywall.',
  },
  {
    q: 'What counts as an AI agent?',
    a: 'An AI agent is an autonomous worker you configure to act on a workflow — qualifying leads, drafting follow-ups, reconciling invoices, and more. Starter includes five; Growth and Enterprise are unlimited.',
  },
  {
    q: 'Can I switch plans or cancel anytime?',
    a: 'Absolutely. Upgrade, downgrade, or cancel whenever you like. Annual plans are billed yearly at a 20% discount; monthly plans are billed month to month with no commitment.',
  },
  {
    q: 'How does migration from our current tools work?',
    a: 'Citron imports from the most common CRMs, finance tools, and spreadsheets out of the box. For Enterprise, our team handles a guided migration so nothing is lost in the move.',
  },
  {
    q: 'Is my data secure?',
    a: 'Your data is encrypted in transit and at rest, isolated per tenant, and never used to train shared models. Enterprise adds SSO, SCIM, advanced audit logs, and a signed DPA.',
  },
  {
    q: 'Do you offer discounts for startups or nonprofits?',
    a: 'Yes. Eligible early-stage startups and registered nonprofits receive significant discounts. Reach out through our contact page and we’ll get you set up.',
  },
];
