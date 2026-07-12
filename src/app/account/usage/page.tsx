import type { Metadata } from 'next';
import { UsageView } from '@/components/account/UsageView';

export const metadata: Metadata = { title: 'Usage' };

export default function UsagePage() {
  return <UsageView />;
}
