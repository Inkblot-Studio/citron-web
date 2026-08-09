/**
 * Citron One — one subscription, every app.
 *
 * Adobe's bundle works because one designer opens Photoshop, Illustrator and
 * InDesign in the same afternoon. Ours does not divide that way: the person
 * learning their first Mac and the group running four restaurants are not the
 * same buyer, and charging one of them for the other's software is how a bundle
 * stops feeling like a deal. So there is one subscription per audience, and each
 * one is genuinely everything that audience needs — nothing withheld to sell
 * back later.
 */

export interface Plan {
  slug: string;
  name: string;
  /** Who it is for, in the words they would use. */
  who: string;
  /** What the subscription covers. */
  includes: string[];
  /** How it is counted — the honest unit, not a marketing one. */
  unit: string;
  featured?: boolean;
}

export const PLANS: Plan[] = [
  {
    slug: 'personal',
    name: 'Citron One',
    who: 'One person, at home or self-employed.',
    unit: 'per person',
    includes: [
      'Citron — the private AI workspace',
      'Citron Guide — on-screen guidance in any app',
      'Every future app for people, at no extra cost',
      'Models run locally, so no usage meter and no per-question bill',
    ],
    featured: true,
  },
  {
    slug: 'business',
    name: 'Citron One for Business',
    who: 'A venue, or a group of them.',
    unit: 'per venue',
    includes: [
      'Everything in Citron One, for every member of staff',
      'Citron ERP — stock, accounting, VAT and fiscal compliance',
      'Citron POS — floor, orders and payment on every terminal',
      'Citron CRM — one guest record across the group',
      'Unlimited staff accounts — priced by venue, not by headcount',
    ],
  },
];

export interface Discount {
  name: string;
  who: string;
  proof: string;
}

/**
 * Priced down rather than given away. Every one of these is somebody who will
 * still be using this in ten years, and the cheapest marketing there is.
 */
export const DISCOUNTS: Discount[] = [
  {
    name: 'Students',
    who: 'Anyone enrolled full time, at any level.',
    proof: 'A student email address or an enrolment letter, renewed each year.',
  },
  {
    name: 'Teachers and lecturers',
    who: 'Anyone who teaches, including part time and privately.',
    proof: 'An institutional address, or a letter from the school.',
  },
  {
    name: 'Schools and universities',
    who: 'Whole-institution access for teaching and administration.',
    proof: 'A named contact at the institution. Priced per site.',
  },
  {
    name: 'Non-profits and charities',
    who: 'Registered organisations, and the volunteers who run them.',
    proof: 'A registration number.',
  },
  {
    name: 'New businesses',
    who: 'A first venue in its first year of trading.',
    proof: 'A company registration dated inside twelve months.',
  },
  {
    name: 'Paid yearly',
    who: 'Anyone who would rather not think about it every month.',
    proof: 'Nothing to prove — it is simply cheaper.',
  },
];
