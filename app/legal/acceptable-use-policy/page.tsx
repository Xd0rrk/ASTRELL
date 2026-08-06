import type { Metadata } from 'next';
import { getLegalDocument } from '@/lib/legal';
import LegalPageContent from '@/components/LegalPageContent';

export const metadata: Metadata = {
  title: 'Acceptable Use Policy | ASTRELL',
  description: 'Rules governing acceptable use of ASTRELL\'s website, communication channels, and services, including prohibited conduct and consequences.',
  alternates: {
    canonical: 'https://astrells.com/legal/acceptable-use-policy',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astrells.com' },
    { '@type': 'ListItem', position: 2, name: 'Acceptable Use Policy', item: 'https://astrells.com/legal/acceptable-use-policy' },
  ],
};

export default function AcceptableUsePolicyPage() {
  const { html, title } = getLegalDocument('acceptable-use-policy');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LegalPageContent title={title} html={html} breadcrumbName="Acceptable Use Policy" />
    </>
  );
}
