import 'server-only';

/**
 * Client for the Citron Platform API (citron-api). All calls are optional:
 * when CITRON_API_URL / CITRON_API_TOKEN are unset the callers fall back to
 * their local mocks, so the storefront works standalone in development.
 */

const BASE = (process.env.CITRON_API_URL ?? '').replace(/\/$/, '');
const TOKEN = process.env.CITRON_API_TOKEN ?? '';

export function citronApiConfigured(): boolean {
  return Boolean(BASE && TOKEN);
}

async function call<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!citronApiConfigured()) return null;
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error(`[citron-api] ${path} -> ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (e) {
    console.error(`[citron-api] ${path} failed:`, e);
    return null;
  }
}

/** UsageSummary for an account — same contract as src/lib/usage.ts. */
export async function fetchUsageByOwner<T>(ownerEmail: string): Promise<T | null> {
  return call<T>(`/v1/usage/by-owner?owner_email=${encodeURIComponent(ownerEmail)}`);
}

type ProvisionItem =
  | { kind: 'plan'; plan_id: string; seats: number; cadence: string }
  | { kind: 'custom'; module_ids: string[]; seats: number; cadence: string }
  | { kind: 'credits'; pack_id: string; quantity: number };

/** Forward a completed Stripe checkout for workspace provisioning. */
export async function provisionCheckout(
  stripeSessionId: string,
  ownerEmail: string,
  items: ProvisionItem[],
  stripeCustomerId?: string | null
): Promise<boolean> {
  const res = await call<{ workspace_id: string }>(`/v1/provisioning/checkout`, {
    method: 'POST',
    body: JSON.stringify({
      stripe_session_id: stripeSessionId,
      owner_email: ownerEmail,
      items,
      stripe_customer_id: stripeCustomerId ?? undefined,
    }),
  });
  return res !== null;
}

/** Sync a Stripe subscription's status/seats/period to the workspace. */
export async function syncSubscription(input: {
  stripeCustomerId?: string | null;
  ownerEmail?: string | null;
  stripeSubscriptionId?: string | null;
  status: string;
  seats?: number | null;
  currentPeriodEnd?: number | null;
}): Promise<boolean> {
  const res = await call(`/v1/provisioning/subscription`, {
    method: 'POST',
    body: JSON.stringify({
      stripe_customer_id: input.stripeCustomerId ?? undefined,
      owner_email: input.ownerEmail ?? undefined,
      stripe_subscription_id: input.stripeSubscriptionId ?? undefined,
      status: input.status,
      seats: input.seats ?? undefined,
      current_period_end: input.currentPeriodEnd ?? undefined,
    }),
  });
  return res !== null;
}

/** Flag a workspace for dunning after a failed payment. */
export async function markPaymentFailed(
  stripeCustomerId?: string | null,
  ownerEmail?: string | null
): Promise<boolean> {
  const res = await call(`/v1/provisioning/payment-failed`, {
    method: 'POST',
    body: JSON.stringify({
      stripe_customer_id: stripeCustomerId ?? undefined,
      owner_email: ownerEmail ?? undefined,
    }),
  });
  return res !== null;
}

/** Store/refresh a Stripe invoice for the billing dashboard. */
export async function upsertInvoice(input: {
  id: string;
  stripeCustomerId?: string | null;
  ownerEmail?: string | null;
  number?: string | null;
  amountDue?: number | null;
  amountPaid?: number | null;
  currency?: string | null;
  status?: string | null;
  hostedInvoiceUrl?: string | null;
  invoicePdf?: string | null;
  periodStart?: number | null;
  periodEnd?: number | null;
}): Promise<boolean> {
  const res = await call(`/v1/billing/invoice`, {
    method: 'POST',
    body: JSON.stringify({
      id: input.id,
      stripe_customer_id: input.stripeCustomerId ?? undefined,
      owner_email: input.ownerEmail ?? undefined,
      number: input.number ?? undefined,
      amount_due: input.amountDue ?? undefined,
      amount_paid: input.amountPaid ?? undefined,
      currency: input.currency ?? undefined,
      status: input.status ?? undefined,
      hosted_invoice_url: input.hostedInvoiceUrl ?? undefined,
      invoice_pdf: input.invoicePdf ?? undefined,
      period_start: input.periodStart ?? undefined,
      period_end: input.periodEnd ?? undefined,
    }),
  });
  return res !== null;
}

/** Parse the compact cart JSON we stash in Stripe session metadata. */
export function parseCartMetadata(raw: string | null | undefined): ProvisionItem[] {
  if (!raw) return [];
  try {
    const compact = JSON.parse(raw) as Array<Record<string, unknown>>;
    return compact.flatMap((c): ProvisionItem[] => {
      if (c.k === 'pl') {
        return [{ kind: 'plan', plan_id: String(c.p), seats: Number(c.s) || 1, cadence: String(c.c) }];
      }
      if (c.k === 'cu') {
        return [{
          kind: 'custom',
          module_ids: Array.isArray(c.m) ? c.m.map(String) : [],
          seats: Number(c.s) || 1,
          cadence: String(c.c),
        }];
      }
      if (c.k === 'cr') {
        return [{ kind: 'credits', pack_id: String(c.p), quantity: Number(c.q) || 1 }];
      }
      return [];
    });
  } catch {
    return [];
  }
}
