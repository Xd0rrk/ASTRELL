import type { Metadata } from 'next';
import { getLegalDocument } from '@/lib/legal';
import LegalPageContent from '@/components/LegalPageContent';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | ASTRELL',
  description: 'How ASTRELL handles project cancellations, refund requests, deposits, and payment disputes for custom creative work.',
  alternates: {
    canonical: 'https://astrells.com/legal/refund-policy',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astrells.com' },
    { '@type': 'ListItem', position: 2, name: 'Refund & Cancellation Policy', item: 'https://astrells.com/legal/refund-policy' },
  ],
};

export default function RefundPolicyPage() {
  const { html, title } = getLegalDocument('refund-policy');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LegalPageContent title={title} html={html} breadcrumbName="Refund & Cancellation Policy" />
    </>
  );
}
