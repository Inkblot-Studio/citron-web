export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Product' | 'AI' | 'Engineering' | 'Vision' | 'Guides';
  author: { name: string; role: string };
  date: string; // ISO
  readingTime: number; // minutes
  featured?: boolean;
  content: { type: 'p' | 'h2' | 'h3' | 'quote' | 'list'; text?: string; items?: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'the-end-of-tool-sprawl',
    title: 'The end of tool sprawl',
    excerpt:
      'The average company runs on more than 100 disconnected applications. We think that era is ending — and intelligence is the reason why.',
    category: 'Vision',
    author: { name: 'Inkblot Studio', role: 'Founders' },
    date: '2026-05-28',
    readingTime: 6,
    featured: true,
    content: [
      {
        type: 'p',
        text: 'Every business runs on software. The problem is that it runs on too much of it. A typical mid-sized company juggles more than a hundred applications — a CRM here, a project tool there, a finance suite, a chat app, a dozen spreadsheets quietly holding the whole thing together.',
      },
      {
        type: 'p',
        text: 'Each tool was bought to solve one problem well. Together, they created a bigger one: fragmentation. Data lives in silos. Context evaporates between tabs. The work of running a business becomes the work of moving information between systems that were never designed to talk to each other.',
      },
      { type: 'h2', text: 'Integration was never the answer' },
      {
        type: 'p',
        text: 'For a decade, the industry’s response was integration. Connect everything. Pipe data from A to B. But integration is a tax, not a solution — it multiplies the surface area of what can break, and it never produces a single source of truth. It produces many copies of the truth, each slightly out of date.',
      },
      {
        type: 'quote',
        text: 'A business should not need a systems integrator to understand itself.',
      },
      { type: 'h2', text: 'One system, one intelligence' },
      {
        type: 'p',
        text: 'Citron starts from a different premise: that the modules a business needs — CRM, marketing, finance, automation, collaboration — belong in one system, sharing one model of the company. When everything lives together, intelligence becomes possible. The system can see the whole picture, reason across it, and act.',
      },
      {
        type: 'list',
        items: [
          'No more reconciling five versions of the same customer.',
          'No more workflows that break when one tool changes its API.',
          'No more knowledge trapped in the gaps between apps.',
        ],
      },
      {
        type: 'p',
        text: 'This is what we mean by an operating system for business. Not another app to add to the pile — the layer that makes the pile unnecessary.',
      },
    ],
  },
  {
    slug: 'designing-ai-that-acts',
    title: 'Designing AI that acts, not just answers',
    excerpt:
      'Chatbots answer questions. Agents change things. Here is how we think about giving AI real responsibility inside a business.',
    category: 'AI',
    author: { name: 'Inkblot Studio', role: 'Product' },
    date: '2026-05-14',
    readingTime: 8,
    content: [
      {
        type: 'p',
        text: 'Most AI in business software stops at conversation. You ask, it answers, and then you go do the work yourself. That is useful — but it is a fraction of what is possible when AI is grounded in your data and trusted to act.',
      },
      { type: 'h2', text: 'Grounded, not guessing' },
      {
        type: 'p',
        text: 'A Citron agent never operates on a generic model of the world. It operates on your world — your customers, your pipeline, your books, your knowledge. Every action is grounded in real records, and every output can be traced back to its source.',
      },
      { type: 'h2', text: 'Guardrails by design' },
      {
        type: 'p',
        text: 'Responsibility requires boundaries. Agents act inside explicit permissions, with human approval for anything consequential. You decide what runs automatically and what waits for a person. The result is leverage you can trust.',
      },
      {
        type: 'quote',
        text: 'The measure of useful AI is not how well it talks. It is how much it does — safely.',
      },
    ],
  },
  {
    slug: 'what-an-operating-system-means',
    title: 'What “operating system” actually means for a business',
    excerpt:
      'The phrase gets used loosely. We mean something specific — and it changes how the whole product is built.',
    category: 'Product',
    author: { name: 'Inkblot Studio', role: 'Engineering' },
    date: '2026-04-30',
    readingTime: 5,
    content: [
      {
        type: 'p',
        text: 'An operating system does three things: it manages shared resources, it provides a common interface, and it lets applications build on a stable foundation. Apply that to a company and the analogy becomes precise.',
      },
      { type: 'h2', text: 'Shared resources' },
      {
        type: 'p',
        text: 'In Citron, your data is the shared resource. Customers, deals, documents, finances — one canonical store that every module reads from and writes to. No copies, no drift.',
      },
      { type: 'h2', text: 'A common interface' },
      {
        type: 'p',
        text: 'Every module follows the same design language, the same interaction patterns, the same intelligence layer. Learn one, and you have learned them all.',
      },
    ],
  },
  {
    slug: 'building-citron-engineering-notes',
    title: 'Building Citron: notes from the engineering team',
    excerpt:
      'Performance, real-time data, and an AI layer that never blocks the interface. A look under the hood.',
    category: 'Engineering',
    author: { name: 'Inkblot Studio', role: 'Engineering' },
    date: '2026-04-12',
    readingTime: 7,
    content: [
      {
        type: 'p',
        text: 'Speed is a feature. When software is the place you spend your whole day, every millisecond of latency is a small tax on attention. We built Citron to feel instant.',
      },
      { type: 'h2', text: 'The AI layer never blocks' },
      {
        type: 'p',
        text: 'Intelligence runs alongside the interface, never in front of it. You never wait for an agent to finish before you can act. Results stream in; the UI stays responsive.',
      },
    ],
  },
  {
    slug: 'metrics-that-matter',
    title: 'The metrics that actually matter when you unify your stack',
    excerpt:
      'Tool consolidation is the headline. The real story is in cycle time, context, and the decisions you can finally make.',
    category: 'Guides',
    author: { name: 'Inkblot Studio', role: 'Product' },
    date: '2026-03-22',
    readingTime: 6,
    content: [
      {
        type: 'p',
        text: 'When teams move to Citron, the first thing they notice is the bill — fewer subscriptions, lower spend. But the durable value shows up elsewhere.',
      },
      {
        type: 'list',
        items: [
          'Cycle time: how fast a lead becomes revenue.',
          'Context retention: how much knowledge survives a handoff.',
          'Decision latency: how quickly a question becomes an answer.',
        ],
      },
    ],
  },
  {
    slug: 'a-calmer-way-to-work',
    title: 'A calmer way to work',
    excerpt:
      'Software does not have to be loud. We designed Citron to be the quiet, confident layer beneath the work.',
    category: 'Vision',
    author: { name: 'Inkblot Studio', role: 'Design' },
    date: '2026-03-05',
    readingTime: 4,
    content: [
      {
        type: 'p',
        text: 'Notifications, badges, red dots — most business software competes for your attention. We believe the best tool is the one you notice least, because it is quietly doing the right thing.',
      },
      {
        type: 'quote',
        text: 'Calm is not the absence of capability. It is capability that does not demand applause.',
      },
    ],
  },
];

export const blogCategories = ['All', 'Vision', 'Product', 'AI', 'Engineering', 'Guides'] as const;

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
