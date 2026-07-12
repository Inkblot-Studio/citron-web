/**
 * Usage metering contract between citron-web and the Citron backend.
 *
 * GET /api/usage returns a `UsageSummary` for the signed-in user's workspace.
 * Until the backend exposes real metering, the route serves the deterministic
 * mock below — same shape, realistic numbers — so the dashboard, top-up flow,
 * and backend implementation all target one contract.
 */

export type ModelUsage = {
  provider: string;
  model: string;
  requests: number;
  tokens: number;
  /** Credits consumed this period. Local Citron AI is always 0. */
  credits: number;
};

export type DailyUsage = {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  credits: number;
  localRequests: number;
};

export type UsageSummary = {
  workspace: string;
  plan: string;
  periodStart: string;
  periodEnd: string;
  /** Monthly credits included with the plan. */
  includedCredits: number;
  /** Credits added via top-up packs (roll over until used). */
  bonusCredits: number;
  usedCredits: number;
  localAi: {
    requests: number;
    unlimited: true;
  };
  byModel: ModelUsage[];
  daily: DailyUsage[];
};

/** Deterministic PRNG so the mock is stable across renders and reloads. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export function buildMockUsage(workspace: string): UsageSummary {
  const rand = mulberry32(0xc17e0);
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const daysElapsed = Math.max(1, Math.ceil((now.getTime() - periodStart.getTime()) / 86_400_000));
  const daily: DailyUsage[] = [];
  let usedCredits = 0;
  let localRequestsTotal = 0;

  for (let i = 0; i < daysElapsed; i++) {
    const d = new Date(periodStart);
    d.setDate(d.getDate() + i);
    const weekday = d.getDay();
    const weekend = weekday === 0 || weekday === 6;
    const credits = Math.round((weekend ? 22 : 95) * (0.55 + rand() * 0.9));
    const localRequests = Math.round((weekend ? 60 : 320) * (0.6 + rand() * 0.8));
    usedCredits += credits;
    localRequestsTotal += localRequests;
    daily.push({ date: isoDate(d), credits, localRequests });
  }

  // Split total credits across hosted models with stable ratios.
  const split = [
    { provider: 'Anthropic', model: 'Claude (fast)', share: 0.34, tokensPerCredit: 1000 },
    { provider: 'Anthropic', model: 'Claude (frontier)', share: 0.22, tokensPerCredit: 250 },
    { provider: 'OpenAI', model: 'GPT (fast)', share: 0.2, tokensPerCredit: 1000 },
    { provider: 'Google', model: 'Gemini', share: 0.14, tokensPerCredit: 500 },
    { provider: 'Mistral', model: 'Mistral', share: 0.1, tokensPerCredit: 1000 },
  ];
  const byModel: ModelUsage[] = split.map(({ provider, model, share, tokensPerCredit }) => {
    const credits = Math.round(usedCredits * share);
    return {
      provider,
      model,
      credits,
      tokens: credits * tokensPerCredit,
      requests: Math.max(1, Math.round(credits / (1.5 + rand()))),
    };
  });

  return {
    workspace,
    plan: 'Growth',
    periodStart: isoDate(periodStart),
    periodEnd: isoDate(periodEnd),
    includedCredits: 2500,
    bonusCredits: 1000,
    usedCredits,
    localAi: { requests: localRequestsTotal, unlimited: true },
    byModel,
    daily,
  };
}
