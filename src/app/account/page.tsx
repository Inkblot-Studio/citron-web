import type { Metadata } from 'next';
import { OverviewView } from '@/components/account/OverviewView';

export const metadata: Metadata = { title: 'Overview' };

export default function AccountPage() {
  return <OverviewView />;
}
