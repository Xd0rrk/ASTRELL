// ============================================================================
// ASTRELL Blog — Types & Authors (Standalone module to prevent circular imports)
// ============================================================================

export const ASTRELL_SERVICES = [
  'Brand Identity',
  'Graphic Design',
  'Logo Design',
  'Rebranding',
  'Website Design',
  'Website Development',
  'UI/UX Design',
  'Packaging Design',
  'Label Design',
  'Marketing Strategy',
  'Digital Marketing',
  'Creative Direction',
  'Social Media Design',
  'Social Media Management',
  'Posters & Banners',
  'Motion Graphics',
  'Print Design',
  'SEO Consulting',
] as const;

export type AstrellService = (typeof ASTRELL_SERVICES)[number];

export type JourneyStage = 'awareness' | 'consideration' | 'decision' | 'retention';

export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'comparison' | 'technical';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  twitter?: string;
  linkedin?: string;
}

export interface BentoHighlight {
  id: string;
  tag: string;
  title: string;
  description: string;
  accent: string;
  colSpan?: string;
  metric?: string;
}

export interface ComparisonRow {
  feature: string;
  astrellApproach: string;
  standardTemplates: string;
}

export interface TimelineStep {
  phase: string;
  title: string;
  duration: string;
  description: string;
}

export interface CalloutBox {
  type: 'tip' | 'note' | 'warning' | 'quote';
  title: string;
  content: string;
}

export interface CodeSnippet {
  language: string;
  filename: string;
  code: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InternalLink {
  text: string;
  url: string;
  type: 'service' | 'portfolio' | 'blog';
}

export interface ArticleCTA {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface ArticleSection {
  id: string;
  heading: string;
  subheading?: string;
  paragraphs: string[];
  pullQuote?: {
    text: string;
    author: string;
    role: string;
  };
  callout?: CalloutBox;
  codeSnippet?: CodeSnippet;
  comparisonTable?: ComparisonRow[];
  timeline?: TimelineStep[];
  bentoGrid?: BentoHighlight[];
  image?: {
    url: string;
    alt: string;
    caption?: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: 'Digital Architecture' | 'Design Systems' | 'Engineering & AI' | 'Brand Strategy' | 'Case Studies';
  service: AstrellService;
  journeyStage: JourneyStage;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  tags: string[];
  date: string;
  isoDate: string;
  readTime: string;
  wordCount: number;
  featured: boolean;
  trending?: boolean;
  popular?: boolean;
  coverImage: string;
  coverAlt: string;
  author: Author;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  keyTakeaways: string[];
  faq: FAQItem[];
  ctaType: JourneyStage;
  internalLinks: InternalLink[];
  bentoSummary: BentoHighlight[];
  sections: ArticleSection[];
  relatedSlugs: string[];
}

export const AUTHORS: Record<string, Author> = {
  elena: {
    name: 'Elena Varga',
    role: 'Partner & Principal Brand Strategist',
    avatar: '/author_rand_khaled_1785542515171.png',
    bio: 'Guiding enterprise brand identity architecture, strategic positioning, and spatial experience design for market-leading global brands.',
    twitter: 'https://twitter.com/astrells',
    linkedin: 'https://linkedin.com/company/astrells'
  },
  julian: {
    name: 'Julian Cross',
    role: 'Head of Product Design & UI/UX',
    avatar: '/author_simon_a_1785542523544.png',
    bio: 'Architecting scalable design systems, multi-platform UI/UX frameworks, and conversion-engineered digital products.',
    twitter: 'https://twitter.com/astrells',
    linkedin: 'https://linkedin.com/company/astrells'
  },
  nadia: {
    name: 'Nadia Al-Mansoor',
    role: 'Creative Director & Motion Specialist',
    avatar: '/author_rand_khaled_1785542515171.png',
    bio: 'Directing visual identity systems, packaging engineering, 3D motion graphics, and commercial photography shoots across London, Paris, and Dubai.',
    twitter: 'https://twitter.com/astrells',
    linkedin: 'https://linkedin.com/company/astrells'
  },
  rand: {
    name: 'Rand Khaled',
    role: 'Director of Growth & Performance Marketing',
    avatar: '/author_rand_khaled_1785542515171.png',
    bio: 'Pioneering strategic brand design, AEO/GEO optimization, and revenue attribution tracking for high-growth technology platforms.',
    twitter: 'https://twitter.com/astrells',
    linkedin: 'https://linkedin.com/company/astrells'
  },
  simon: {
    name: 'Simon A-A',
    role: 'Lead Web Architect & Technical Director',
    avatar: '/author_simon_a_1785542523544.png',
    bio: 'Specializing in high-performance Next.js 15 frontend architecture, edge caching networks, and WebGL graphics.',
    twitter: 'https://twitter.com/astrells',
    linkedin: 'https://linkedin.com/company/astrells'
  }
};
