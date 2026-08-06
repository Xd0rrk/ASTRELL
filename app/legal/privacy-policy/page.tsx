import type { Metadata } from 'next';
import { getLegalDocument } from '@/lib/legal';
import LegalPageContent from '@/components/LegalPageContent';

export const metadata: Metadata = {
  title: 'Privacy Policy | ASTRELL',
  description: 'How ASTRELL collects, uses, discloses, and protects your personal data. Compliant with UK GDPR and Data Protection Act 2018.',
  alternates: {
    canonical: 'https://astrells.com/legal/privacy-policy',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astrells.com' },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://astrells.com/legal/privacy-policy' },
  ],
};

export default function PrivacyPolicyPage() {
  const { html, title } = getLegalDocument('privacy-policy');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LegalPageContent title={title} html={html} breadcrumbName="Privacy Policy" />
    </>
  );
}
