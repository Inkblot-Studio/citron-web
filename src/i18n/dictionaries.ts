/**
 * English and Bulgarian, side by side.
 *
 * Not machine-translated: the Bulgarian is written to sell, not to match the
 * English word for word. Where a phrase only works in one language it is
 * replaced rather than forced.
 */

export const LOCALES = ['en', 'bg'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  bg: 'Български',
};

export interface Dictionary {
  hero: { eyebrow: string; title: string; titleEm: string; lede: string; seeLine: string; talk: string };
  people: { eyebrow: string; title: string; lede: string };
  business: { eyebrow: string; title: string; lede: string };
  one: { eyebrow: string; title: string; lede: string; whoPaysLess: string; discountLede: string; note: string; noteLink: string };
  stage: { shipping: string; preview: string; building: string };
  meta: { title: string; description: string };
}

export const DICTIONARIES: Record<Locale, Dictionary> = {
  en: {
    hero: {
      eyebrow: 'Inkblot Studio',
      title: 'Business software that runs on',
      titleEm: 'your own hardware.',
      lede: 'A private AI workspace. On-screen guidance for any app you use. The till, the stock and the customer record a business runs on. Built as one line, so the ones you pick already know about each other.',
      seeLine: 'See the tools',
      talk: 'Talk to us',
    },
    people: {
      eyebrow: 'For people',
      title: 'Apps for the person at the screen',
      lede: 'One keeps your work on your own machine. The other makes any software easier to use than it was designed to be. Neither needs you to change how you already work.',
    },
    business: {
      eyebrow: 'For business',
      title: 'Software a business runs on',
      lede: 'Sell, count what is left, and remember who bought it. Three tools over one ledger, so the till and the books never disagree about what happened.',
    },
    one: {
      eyebrow: 'Citron One',
      title: 'One subscription. Every app.',
      lede: 'Not a menu to assemble. The personal apps on their own, or the business tools with the personal ones included. No per-app licences, nothing withheld for a higher tier, and no meter running while you work.',
      whoPaysLess: 'Who pays less',
      discountLede: 'Learning on it, teaching on it, or just starting out — none of those should be the expensive case.',
      note: 'Rates are being set now and will be published before anyone is asked to pay. If you want to be told when they are,',
      noteLink: 'leave us a line',
    },
    stage: { shipping: 'Shipping', preview: 'Private preview', building: 'In build' },
    meta: {
      title: 'Citron — tools that run on your own hardware',
      description:
        'A private AI workspace, on-screen guidance for any app, and the point of sale, stock and customer records a business runs on. One subscription opens all of them.',
    },
  },
  bg: {
    hero: {
      eyebrow: 'Inkblot Studio',
      title: 'Бизнес софтуер, който работи на',
      titleEm: 'вашия собствен хардуер.',
      lede: 'Личен AI асистент. Помощ на екрана за всяка програма. Касата, наличностите и клиентският картон, с които се движи един бизнес. Направени като едно семейство, така че тези, които изберете, вече се познават.',
      seeLine: 'Вижте инструментите',
      talk: 'Свържете се с нас',
    },
    people: {
      eyebrow: 'За хора',
      title: 'Приложения за човека пред екрана',
      lede: 'Единият пази работата ви на вашата машина. Другият прави всяка програма по-лесна, отколкото е замислена. Никой от двата не изисква да променяте начина, по който вече работите.',
    },
    business: {
      eyebrow: 'За бизнеса',
      title: 'Софтуер, с който работи бизнесът',
      lede: 'Продавайте, следете какво остава и помнете кой го е купил. Три инструмента върху един регистър, за да не се разминават касата и счетоводството.',
    },
    one: {
      eyebrow: 'Citron One',
      title: 'Един абонамент. Всички приложения.',
      lede: 'Няма меню за сглобяване. Един абонамент отваря всичко, което правим за вас — включително приложенията, които още не сме пуснали. Без отделни лицензи, без функции, запазени за по-скъп план, и без брояч, докато работите.',
      whoPaysLess: 'Кой плаща по-малко',
      discountLede: 'Който учи с тях, преподава с тях или тепърва започва — не бива да е скъпият случай.',
      note: 'Цените се определят в момента и ще бъдат публикувани, преди да поискаме плащане. Ако искате да разберете кога,',
      noteLink: 'пишете ни',
    },
    stage: { shipping: 'Налично', preview: 'Ранен достъп', building: 'В разработка' },
    meta: {
      title: 'Citron — инструменти, които работят на вашия компютър',
      description:
        'Личен AI асистент, помощ на екрана за всяка програма, и касата, наличностите и клиентските картони, с които работи един бизнес. Един абонамент отваря всички.',
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}
