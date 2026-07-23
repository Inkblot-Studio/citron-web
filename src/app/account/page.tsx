import type { Metadata } from 'next';
import { AccountView } from '@/components/account/AccountView';

export const metadata: Metadata = {
  title: 'Account',
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <section className="mx-auto w-full max-w-[900px] px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-10">
      <AccountView />
    </section>
  );
}
