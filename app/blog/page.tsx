import type { Metadata } from 'next';
import BlogClient from './BlogClient';
import { BLOG_PREVIEWS } from '@/lib/generated-blog-previews';

export const revalidate = 3600; // 1-hour ISR cache revalidation

export const metadata: Metadata = {
  title: 'Blog & Editorial Perspectives | ASTRELL Creative Agency',
  description: 'In-depth essays on brand identity, website design, UI/UX, packaging, digital marketing, and 17 creative services. Expert insights from ASTRELL\'s design and engineering team.',
  keywords: [
    'ASTRELL Blog',
    'Brand Identity Insights',
    'Website Design Guide',
    'UI/UX Design Tips',
    'Digital Marketing Strategy',
    'Creative Agency Blog',
  ],
  openGraph: {
    title: 'ASTRELL Blog — Expert Design & Branding Insights',
    description: 'Explore perspectives on brand identity, website design, digital marketing, and creative strategy from ASTRELL\'s team.',
    url: 'https://astrells.com/blog',
    siteName: 'ASTRELL',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'ASTRELL Blog — Expert Design & Branding Insights'
      }
    ],
    locale: 'en_GB',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASTRELL Blog — Expert Design & Branding Insights',
    description: 'In-depth essays and guides on building next-generation brand experiences and digital products.',
    images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop']
  },
  alternates: {
    canonical: 'https://astrells.com/blog'
  }
};

export default function BlogPage() {
  // Only ship the first 6 posts in the HTML payload for perceived-performance.
  // The client fetches subsequent batches via /api/blog-previews on demand.
  const initialPosts = BLOG_PREVIEWS.slice(0, 6);

  // Blog landing JSON-LD (SEO only — uses the first 6 posts)
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ASTRELL Blog',
    description: 'Expert insights on brand identity, website design, UI/UX, packaging, digital marketing, and creative strategy.',
    url: 'https://astrells.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'ASTRELL',
      logo: {
        '@type': 'ImageObject',
        url: 'https://astrells.com/logo.png'
      }
    },
    blogPost: initialPosts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `https://astrells.com/blog/${post.slug}`,
      datePublished: post.isoDate,
      author: {
        '@type': 'Person',
        name: post.author.name
      }
    }))
  };

  // WebPage structured data
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'ASTRELL Blog — Expert Design & Branding Insights',
    description: 'In-depth essays on brand identity, website design, UI/UX, packaging, digital marketing, and creative strategy.',
    url: 'https://astrells.com/blog',
    isPartOf: {
      '@type': 'WebSite',
      name: 'ASTRELL',
      url: 'https://astrells.com'
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://astrells.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://astrells.com/blog'
        }
      ]
    }
  };

  // Pass only the first 6 posts and total count to the client
  // The client will fetch subsequent pages/filters via the API
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      {/* Pass the full dataset — client handles filtering & pagination locally */}
      <BlogClient allPosts={BLOG_PREVIEWS} />
    </>
  );
}
