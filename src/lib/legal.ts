export type LegalDoc = {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
};

const updated = 'June 1, 2026';

export const legalDocs: LegalDoc[] = [
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    summary: 'How Citron collects, uses, and protects your information.',
    updated,
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'This Privacy Policy explains how Citron, operated by Inkblot Studio, collects, uses, and safeguards information when you use our website and product. We designed Citron to be private by default: your business data belongs to you.',
          'By using Citron, you agree to the practices described here. If you do not agree, please discontinue use of the service.',
        ],
      },
      {
        heading: 'Information we collect',
        paragraphs: [
          'Account information you provide, such as your name, work email, company, and billing details.',
          'Product data you choose to store in Citron, including customer records, documents, and communications. This data is processed solely to provide the service.',
          'Usage and device information collected automatically to keep the service secure and to improve performance.',
        ],
      },
      {
        heading: 'How we use information',
        paragraphs: [
          'To provide, maintain, and improve the Citron platform and its AI capabilities.',
          'To communicate with you about your account, security, and relevant product updates.',
          'We never sell your data, and we never use your business data to train shared AI models.',
        ],
      },
      {
        heading: 'Data security',
        paragraphs: [
          'Your data is encrypted in transit and at rest, isolated per tenant, and protected by strict access controls. Enterprise customers may add SSO, SCIM, advanced audit logs, and a signed Data Processing Agreement.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You may access, correct, export, or delete your personal information at any time. Contact us to exercise these rights and we will respond promptly, consistent with applicable law.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Questions about this policy can be directed to our team through the contact page. We are committed to resolving any concerns about your privacy.',
        ],
      },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms of Service',
    summary: 'The agreement governing your use of Citron.',
    updated,
    sections: [
      {
        heading: 'Acceptance of terms',
        paragraphs: [
          'These Terms of Service govern your access to and use of Citron, operated by Inkblot Studio. By creating an account or using the service, you agree to be bound by these terms.',
        ],
      },
      {
        heading: 'Use of the service',
        paragraphs: [
          'You may use Citron only in compliance with these terms and all applicable laws. You are responsible for the activity in your account and for keeping your credentials secure.',
          'You agree not to misuse the service, attempt to disrupt it, or access it through unauthorized means.',
        ],
      },
      {
        heading: 'Subscriptions and billing',
        paragraphs: [
          'Paid plans are billed in advance on a monthly or annual basis. Annual plans are offered at a discount. You may upgrade, downgrade, or cancel at any time; changes take effect at the start of the next billing period.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'Citron and its design, software, and content are the property of Inkblot Studio. Your business data remains yours. We claim no ownership over the content you store in the platform.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'Citron is provided on an “as is” basis. To the maximum extent permitted by law, Inkblot Studio is not liable for indirect or consequential damages arising from your use of the service.',
        ],
      },
      {
        heading: 'Changes to these terms',
        paragraphs: [
          'We may update these terms from time to time. We will notify you of material changes, and continued use of the service constitutes acceptance of the revised terms.',
        ],
      },
    ],
  },
  {
    slug: 'cookies',
    title: 'Cookie Policy',
    summary: 'How and why Citron uses cookies and similar technologies.',
    updated,
    sections: [
      {
        heading: 'What cookies are',
        paragraphs: [
          'Cookies are small text files stored on your device that help websites function and remember preferences. We use cookies and similar technologies on the Citron website and product.',
        ],
      },
      {
        heading: 'How we use cookies',
        paragraphs: [
          'Essential cookies keep you signed in and the service secure. These are required for the product to function.',
          'Preference cookies remember your settings, such as your light or dark theme.',
          'Analytics cookies help us understand how the site is used so we can improve it. These are aggregated and never used to identify you personally.',
        ],
      },
      {
        heading: 'Managing cookies',
        paragraphs: [
          'You can control or delete cookies through your browser settings. Disabling essential cookies may affect the functionality of the service.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'If you have questions about our use of cookies, reach out through the contact page and we will be glad to help.',
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}
