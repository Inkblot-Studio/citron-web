import type { Metadata } from 'next';
import { AccountShell } from '@/components/account/AccountShell';

export const metadata: Metadata = {
  title: { default: 'Account', template: '%s — Citron Account' },
  robots: { index: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-[1120px] px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-10">
      <AccountShell>{children}</AccountShell>
    </section>
  );
}
