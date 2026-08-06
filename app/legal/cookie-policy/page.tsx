import type { Metadata } from 'next';
import { getLegalDocument } from '@/lib/legal';
import LegalPageContent from '@/components/LegalPageContent';

export const metadata: Metadata = {
  title: 'Cookie Policy | ASTRELL',
  description: 'How ASTRELL uses cookies and similar tracking technologies on our website, including how to manage your cookie preferences.',
  alternates: {
    canonical: 'https://astrells.com/legal/cookie-policy',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astrells.com' },
    { '@type': 'ListItem', position: 2, name: 'Cookie Policy', item: 'https://astrells.com/legal/cookie-policy' },
  ],
};

export default function CookiePolicyPage() {
  const { html, title } = getLegalDocument('cookie-policy');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LegalPageContent title={title} html={html} breadcrumbName="Cookie Policy" />
    </>
  );
}
