import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blog-data';
import { SERVICES } from '@/lib/services-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://astrells.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  // Legal pages
  const legalSlugs = [
    'privacy-policy',
    'terms-of-service',
    'cookie-policy',
    'refund-policy',
    'ai-usage-policy',
    'acceptable-use-policy',
  ];
  const legalPages: MetadataRoute.Sitemap = legalSlugs.map((slug) => ({
    url: `${baseUrl}/legal/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }));

  // Service pages
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog article pages
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.isoDate),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...legalPages, ...servicePages, ...blogPages];
}
