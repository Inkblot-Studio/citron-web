import type { Metadata } from 'next';
import { SegmentedLine } from '@/components/products/SegmentedLine';

export const metadata: Metadata = {
  title: 'Products',
  description: 'The Citron line: a local-first AI workspace, on-screen guidance, ERP, POS and CRM.',
};

export default function ProductsPage() {
  return <SegmentedLine />;
}
