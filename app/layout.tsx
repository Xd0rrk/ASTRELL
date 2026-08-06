import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://astrells.com'),
  title: 'ASTRELL | Creative Design & Strategic Agency',
  description: 'England-based premium creative agency serving clients worldwide. Specializing in brand identity, website design, packaging, digital marketing, and 17 integrated creative services.',
  alternates: {
    canonical: 'https://astrells.com',
  },
};

// Sitewide Organization structured data — placeholder-safe (no invented address/company number)
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ASTRELL',
  url: 'https://astrells.com',
  logo: 'https://astrells.com/logo.png',
  description: 'England-based premium creative agency specializing in brand identity, website design, digital marketing, and 17 integrated creative services.',
  sameAs: [
    'https://instagram.com/astrell',
    'https://twitter.com/astrell',
    'https://linkedin.com/company/astrell',
    'https://dribbble.com/astrell',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@astrell.com',
    contactType: 'customer service',
  },
};

// Sitewide BreadcrumbList base (pages extend this)
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astrells.com' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,600&family=Great+Vibes&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased text-neutral-100 bg-neutral-950 selection:bg-neutral-800 selection:text-white">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
