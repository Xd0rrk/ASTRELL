import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleClient from './ArticleClient';
import { BLOG_POSTS, getPostBySlug } from '@/lib/blog-data';

export const revalidate = 3600; // 1-hour ISR cache revalidation

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | ASTRELL',
    };
  }

  const canonicalUrl = `https://astrells.com/blog/${post.slug}`;

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      url: canonicalUrl,
      siteName: 'ASTRELL',
      publishedTime: post.isoDate,
      type: 'article',
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.coverAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.title,
      description: post.seo.description,
      images: [post.coverImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // BlogPosting structured data
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImage],
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ASTRELL',
      logo: {
        '@type': 'ImageObject',
        url: 'https://astrells.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://astrells.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    wordCount: post.wordCount,
    articleSection: post.category,
  };

  // BreadcrumbList structured data
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://astrells.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://astrells.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.category,
        item: `https://astrells.com/blog?category=${encodeURIComponent(post.category)}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: post.title,
        item: `https://astrells.com/blog/${post.slug}`,
      },
    ],
  };

  // FAQPage structured data (conditional)
  const faqJsonLd = post.faq && post.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ArticleClient post={post} />
    </>
  );
}
