import type { Metadata } from 'next';
import { BillingView } from '@/components/account/BillingView';

export const metadata: Metadata = { title: 'Billing' };

export default function BillingPage() {
  return <BillingView />;
}
