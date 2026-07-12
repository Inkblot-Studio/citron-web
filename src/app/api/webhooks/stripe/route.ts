import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { citronApiConfigured, parseCartMetadata, provisionCheckout } from '@/lib/citron-api';

export const dynamic = 'force-dynamic';

/**
 * Stripe webhook receiver.
 *
 * Provisioning (activating workspaces, granting credits) belongs to the
 * Citron backend; this handler verifies the event and hands it off. Until
 * that backend endpoint exists, events are logged so test-mode flows are
 * fully observable end to end.
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

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log(
        `[webhooks/stripe] checkout completed: ${session.id} customer=${session.customer} email=${session.customer_details?.email} cart=${session.metadata?.citron_cart}`
      );
      // Provision through the Citron Platform API when configured.
      const email = session.customer_details?.email ?? '';
      const items = parseCartMetadata(session.metadata?.citron_cart);
      if (citronApiConfigured() && email && items.length) {
        const ok = await provisionCheckout(session.id, email, items);
        if (!ok) {
          // Non-2xx tells Stripe to retry the delivery — provisioning is
          // idempotent on the session id, so retries are safe.
          return NextResponse.json({ error: 'Provisioning failed, retry.' }, { status: 502 });
        }
      }
      break;
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = event.data.object;
      // TODO(citron-backend): sync plan/seat changes to the workspace.
      console.log(`[webhooks/stripe] subscription ${event.type.split('.').pop()}: ${sub.id} status=${sub.status}`);
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object;
      // TODO(citron-backend): downgrade the workspace at period end.
      console.log(`[webhooks/stripe] subscription cancelled: ${sub.id}`);
      break;
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      // TODO(citron-backend): flag the workspace for dunning.
      console.log(`[webhooks/stripe] payment failed for invoice ${invoice.id}`);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
