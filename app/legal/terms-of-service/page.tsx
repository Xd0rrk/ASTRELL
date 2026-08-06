import type { Metadata } from 'next';
import { getLegalDocument } from '@/lib/legal';
import LegalPageContent from '@/components/LegalPageContent';

export const metadata: Metadata = {
  title: 'Terms of Service | ASTRELL',
  description: 'Terms governing ASTRELL\'s digital creative services, including project agreements, intellectual property, payments, and liability.',
  alternates: {
    canonical: 'https://astrells.com/legal/terms-of-service',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astrells.com' },
    { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: 'https://astrells.com/legal/terms-of-service' },
  ],
};

export default function TermsOfServicePage() {
  const { html, title } = getLegalDocument('terms-of-service');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LegalPageContent title={title} html={html} breadcrumbName="Terms of Service" />
    </>
  );
}
