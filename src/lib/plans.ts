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
  /** Who it is aimed at, so the page can split B2C from B2B. */
  audience: 'people' | 'business';
  /** What the plan answers before anyone asks. */
  answers: { question: string; answer: string }[];
  featured?: boolean;
}

export const PLANS: Plan[] = [
  {
    slug: 'personal',
    name: 'Citron One',
    who: 'One person, at home or self-employed.',
    unit: 'per month',
    audience: 'people',
    answers: [
      { question: 'Is there a free tier?', answer: 'The launcher is free. The apps are the subscription.' },
      { question: 'Do I pay per app?', answer: 'No. One subscription opens all of them, including the ones not out yet.' },
      { question: 'Is there a usage bill?', answer: 'No. The models run on your machine, so there is nothing to meter.' },
      { question: 'Can I stop?', answer: 'Monthly, cancel whenever. Annual is cheaper and refundable pro rata.' },
    ],
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
    who: 'A business, and everyone who works in it.',
    unit: 'per month',
    audience: 'business',
    answers: [
      {
        question: 'Do we pay twice for the personal apps?',
        answer: 'No. Citron and Citron Guide are included for everyone on the team.',
      },
      { question: 'Do we pay per app?', answer: 'No. One subscription opens ERP, POS and CRM together.' },
      { question: 'What about setup?', answer: 'Quoted once, after we have seen how you work. No surprise onboarding fee.' },
      { question: 'Who owns the data?', answer: 'You do. It runs on your hardware and leaves with you if we part ways.' },
    ],
    includes: [
      'Citron ERP — stock, invoicing, VAT and fiscal compliance',
      'Citron POS — orders and payment on every terminal',
      'Citron CRM — one customer record across the business',
      'Citron and Citron Guide included for everyone on the team',
      'Every future app for business, at no extra cost',
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
    proof: 'A named contact at the institution.',
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
