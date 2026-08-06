import type { Metadata } from 'next';
import { getLegalDocument } from '@/lib/legal';
import LegalPageContent from '@/components/LegalPageContent';

export const metadata: Metadata = {
  title: 'AI Usage & Disclosure Policy | ASTRELL',
  description: 'How ASTRELL uses AI-assisted tools in its creative process, including human oversight, client opt-out rights, and data handling practices.',
  alternates: {
    canonical: 'https://astrells.com/legal/ai-usage-policy',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astrells.com' },
    { '@type': 'ListItem', position: 2, name: 'AI Usage & Disclosure Policy', item: 'https://astrells.com/legal/ai-usage-policy' },
  ],
};

export default function AiUsagePolicyPage() {
  const { html, title } = getLegalDocument('ai-usage-policy');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LegalPageContent title={title} html={html} breadcrumbName="AI Usage & Disclosure Policy" />
    </>
  );
}
