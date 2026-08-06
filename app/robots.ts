import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://astrells.com';

  return {
    rules: [
      // Default: allow all
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/legal/*?preview'],
      },
      // AI search / citation crawlers — allow for AI-answer visibility
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'Claude-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Perplexity-User',
        allow: '/',
      },
      // AI training crawlers — allowed (broader model presence benefits a service business)
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
