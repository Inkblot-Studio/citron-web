import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import {
  citronApiConfigured,
  parseCartMetadata,
  provisionCheckout,
  syncSubscription,
  markPaymentFailed,
  upsertInvoice,
} from '@/lib/citron-api';

export const dynamic = 'force-dynamic';

/** Stripe customer field can be a string id or an expanded object. */
function customerId(customer: string | { id: string } | null | undefined): string | null {
  if (!customer) return null;
  return typeof customer === 'string' ? customer : customer.id;
}

/**
 * Stripe webhook receiver. Verifies the signature and forwards lifecycle
 * events to the Citron Platform API (citron-api) — the billing source of
 * truth. All handoffs are idempotent server-side, so returning non-2xx to
 * trigger a Stripe retry is safe.
 */
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ error: 'Webhooks not configured.' }, { status: 503 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature.' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const payload = await req.text();
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (e) {
    console.error('[webhooks/stripe] signature verification failed:', e);
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  const configured = citronApiConfigured();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const email = session.customer_details?.email ?? '';
      const custId = customerId(session.customer);
      const items = parseCartMetadata(session.metadata?.citron_cart);
      console.log(
        `[webhooks/stripe] checkout completed: ${session.id} customer=${custId} email=${email} cart=${session.metadata?.citron_cart}`
      );
      if (configured && email && items.length) {
        const ok = await provisionCheckout(session.id, email, items, custId);
        if (!ok) {
          return NextResponse.json({ error: 'Provisioning failed, retry.' }, { status: 502 });
        }
      }
      break;
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = event.data.object;
      const firstItem = sub.items?.data?.[0];
      const seats = firstItem?.quantity ?? undefined;
      // `current_period_end` lives on the item in recent API versions and on
      // the subscription in older ones — read whichever is present.
      const currentPeriodEnd =
        (firstItem as { current_period_end?: number } | undefined)?.current_period_end ??
        (sub as unknown as { current_period_end?: number }).current_period_end ??
        undefined;
      console.log(
        `[webhooks/stripe] subscription ${event.type.split('.').pop()}: ${sub.id} status=${sub.status} seats=${seats}`
      );
      if (configured) {
        const ok = await syncSubscription({
          stripeCustomerId: customerId(sub.customer),
          stripeSubscriptionId: sub.id,
          status: sub.status,
          seats,
          currentPeriodEnd,
        });
        if (!ok) return NextResponse.json({ error: 'Sync failed, retry.' }, { status: 502 });
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object;
      console.log(`[webhooks/stripe] subscription cancelled: ${sub.id}`);
      if (configured) {
        const ok = await syncSubscription({
          stripeCustomerId: customerId(sub.customer),
          stripeSubscriptionId: sub.id,
          status: 'canceled',
        });
        if (!ok) return NextResponse.json({ error: 'Sync failed, retry.' }, { status: 502 });
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      console.log(`[webhooks/stripe] payment failed for invoice ${invoice.id}`);
      if (configured) {
        const ok = await markPaymentFailed(customerId(invoice.customer));
        if (!ok) return NextResponse.json({ error: 'Sync failed, retry.' }, { status: 502 });
      }
      break;
    }

    case 'invoice.paid':
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object;
      console.log(`[webhooks/stripe] invoice ${event.type.split('.').pop()}: ${invoice.id}`);
      if (configured && invoice.id) {
        const ok = await upsertInvoice({
          id: invoice.id,
          stripeCustomerId: customerId(invoice.customer),
          ownerEmail: invoice.customer_email ?? undefined,
          number: invoice.number ?? undefined,
          amountDue: invoice.amount_due ?? undefined,
          amountPaid: invoice.amount_paid ?? undefined,
          currency: invoice.currency ?? undefined,
          status: invoice.status ?? undefined,
          hostedInvoiceUrl: invoice.hosted_invoice_url ?? undefined,
          invoicePdf: invoice.invoice_pdf ?? undefined,
          periodStart: invoice.period_start ?? undefined,
          periodEnd: invoice.period_end ?? undefined,
        });
        if (!ok) return NextResponse.json({ error: 'Sync failed, retry.' }, { status: 502 });
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
