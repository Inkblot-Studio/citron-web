import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe, STRIPE_UNAVAILABLE } from '@/lib/stripe';
import { getSessionUser } from '@/lib/session';
import { siteConfig } from '@/lib/site';
import {
  basePlatform,
  customSeatPrice,
  getCreditPack,
  getModuleAddon,
  getPlan,
  type CartItem,
} from '@/lib/catalog';

export const dynamic = 'force-dynamic';

const MAX_SEATS = 500;
const MAX_PACK_QTY = 20;

/**
 * Validates a client cart and rebuilds every price from the server-side
 * catalog — the client only ever supplies ids, seat counts, and quantities.
 */
function toLineItems(items: CartItem[]): Stripe.Checkout.SessionCreateParams.LineItem[] {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const item of items) {
    if (item.kind === 'plan') {
      const plan = getPlan(item.planId);
      if (!plan?.seatPrice) throw new Error(`Unknown or non-purchasable plan: ${item.planId}`);
      const seats = Math.floor(item.seats);
      const maxSeats = plan.maxSeats ?? MAX_SEATS;
      if (!Number.isFinite(seats) || seats < plan.minSeats || seats > maxSeats) {
        throw new Error(`Seat count for ${plan.name} must be between ${plan.minSeats} and ${maxSeats}.`);
      }
      const annual = item.cadence === 'annual';
      const perSeat = plan.seatPrice[item.cadence] * (annual ? 12 : 1);
      lineItems.push({
        quantity: seats,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(perSeat * 100),
          recurring: { interval: annual ? 'year' : 'month' },
          product_data: {
            name: `Citron ${plan.name}`,
            description: `${plan.description} Per seat, billed ${annual ? 'annually' : 'monthly'}.`,
            metadata: { citron_item: 'plan', plan_id: plan.id },
          },
        },
      });
    } else if (item.kind === 'custom') {
      const seats = Math.floor(item.seats);
      if (!Number.isFinite(seats) || seats < 1 || seats > MAX_SEATS) {
        throw new Error(`Seat count must be between 1 and ${MAX_SEATS}.`);
      }
      const moduleIds = [...new Set(item.moduleIds)];
      const unknown = moduleIds.find((id) => !getModuleAddon(id));
      if (unknown) throw new Error(`Unknown module: ${unknown}`);
      const annual = item.cadence === 'annual';
      const perSeat = customSeatPrice(moduleIds, item.cadence) * (annual ? 12 : 1);
      const moduleNames = moduleIds.map((id) => getModuleAddon(id)!.name).join(', ');
      lineItems.push({
        quantity: seats,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(perSeat * 100),
          recurring: { interval: annual ? 'year' : 'month' },
          product_data: {
            name: 'Citron Platform (custom)',
            description: `${basePlatform.name}${moduleNames ? ` + ${moduleNames}` : ''}. Per seat, billed ${annual ? 'annually' : 'monthly'}.`,
            metadata: { citron_item: 'custom', module_ids: moduleIds.join(',').slice(0, 480) },
          },
        },
      });
    } else if (item.kind === 'credits') {
      const pack = getCreditPack(item.packId);
      if (!pack) throw new Error(`Unknown credit pack: ${item.packId}`);
      const quantity = Math.floor(item.quantity);
      if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_PACK_QTY) {
        throw new Error(`Credit pack quantity must be between 1 and ${MAX_PACK_QTY}.`);
      }
      lineItems.push({
        quantity,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(pack.price * 100),
          product_data: {
            name: `Citron AI credits — ${pack.name}`,
            description: `${pack.credits.toLocaleString()} hosted-model AI credits. One-time top-up; local Citron AI is always unlimited.`,
            metadata: { citron_item: 'credits', pack_id: pack.id, credits: String(pack.credits) },
          },
        },
      });
    } else {
      throw new Error('Unknown cart item type.');
    }
  }

  return lineItems;
}

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: STRIPE_UNAVAILABLE }, { status: 503 });
  }

  let items: CartItem[];
  try {
    const body = (await req.json()) as { items?: CartItem[] };
    items = body.items ?? [];
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  if (!Array.isArray(items) || items.length === 0 || items.length > 25) {
    return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 });
  }

  let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
  try {
    lineItems = toLineItems(items);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Invalid cart.' },
      { status: 400 }
    );
  }

  const hasRecurring = items.some((i) => i.kind !== 'credits');
  const origin = req.headers.get('origin') ?? siteConfig.url;
  const user = await getSessionUser();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: hasRecurring ? 'subscription' : 'payment',
      line_items: lineItems,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_email: user?.email,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        citron_user_id: user?.id ?? '',
        citron_cart: JSON.stringify(
          items.map((i) =>
            i.kind === 'credits'
              ? { k: 'cr', p: i.packId, q: i.quantity }
              : i.kind === 'plan'
                ? { k: 'pl', p: i.planId, s: i.seats, c: i.cadence }
                : { k: 'cu', m: i.moduleIds, s: i.seats, c: i.cadence }
          )
        ).slice(0, 490),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error('[checkout] Stripe session creation failed:', e);
    return NextResponse.json(
      { error: 'Could not start checkout. Please try again in a moment.' },
      { status: 502 }
    );
  }
}
