// ============================================================================
// ASTRELL Blog — Lightweight Metadata (statically extracted from BLOG_PREVIEWS)
// ============================================================================
// This file contains only the small metadata structures needed to render the
// blog shell (filter pills, sidebar sections) without importing the full 143 KB
// generated-blog-previews module on the client.
//
// To regenerate, run: npm run generate-previews
// ============================================================================

// ─── Taxonomy ─────────────────────────────────────────────────────────────────

export const BLOG_CATEGORIES: string[] = [
  'All',
  'Brand Strategy',
  'Design Systems',
  'Digital Architecture',
  'Engineering & AI',
  'Case Studies',
];

export const BLOG_SERVICES: string[] = [
  'All Services',
  'Brand Identity',
  'Rebranding',
  'Logo Design',
  'Website Development',
  'Website Design',
  'UI/UX Design',
  'Motion Graphics',
  'Print Design',
  'Graphic Design',
  'Packaging Design',
  'Creative Direction',
  'SEO Consulting',
  'Marketing Strategy',
];

export const BLOG_TAGS: string[] = [
  '3D Animation','3D Design','3D Visualization','AEO','AEO Telemetry','AEO/GEO','AI Search','AI Visibility',
  'ARIA','Accessibility','Agency Selection','Amman Hub','Analytics','Animation','Annual Reports','Architecture',
  'Art Direction','B2B','B2B UX','Bento Grid','Brand Audit','Brand Block','Brand Equity','Brand Experience',
  'Brand Governance','Brand Guidelines','Brand Identity','Brand Loyalty','Brand Mascot','Brand Strategy',
  'Branding','C-Suite','CGI','CMYK','Case Study','Character Design','ChatGPT','Color Profiles',
  'Color Psychology','Compliance','Component Library','Composition','Consulting','Consumer Goods',
  'Content Hub','Conversion Lift','Conversion Rate','Conversion UX','Core Web Vitals','Corporate Design',
  'Crawl Budget','Creative Direction','D2C Packaging','Dark Mode','Dashboard UX','Data Visualization',
  'Decision Framework','Decoupled Web','Design Equity','Design Systems','Design Theory','Design Tokens',
  'Digital Architecture','Digital Identity','Dubai','E-Commerce','ESG','Eco-Friendly','Edge Infrastructure',
  'Embossing','Engineering','Enterprise Software','Enterprise Strategy','Enterprise UI','Entities',
  'Ergonomics','Executive Advisory','Executive Insights','Executive Leadership','Executive Strategy',
  'Executive Workshop','FMCG Packaging','Figma','Finance','Flagship Retail','Foil Stamping','Font Design',
  'Framer Motion','GCC Markets','GEO','Global Clients','Governance','Graphic Design','Growth Marketing',
  'Growth Strategy','Headless CMS','Iconography','Information Architecture','Internal Links',
  'Investor Relations','JSON-LD','Kinetic Type','Kinetic Typography','Knowledge Graph','Lifestyle Shoots',
  'Lighthouse','Lighting','London','Lottie','Luxury Branding','Luxury Design','Luxury Retail','Macro',
  'Market Alignment','Market Expansion','Materials','Micro-Interactions','Mistakes','Mobile UX',
  'Modular Scale','Moodboards','Motion','Motion Graphics','Motion UX','Navigation','Next.js','Next.js 15',
  'Packaging Design','Pantone','Paris','Performance','Perplexity','Photography','Physical Brand',
  'Pillar Cluster','Portfolio Design','Positioning','Prepress','Print Design','Print Finishes',
  'Product Analytics','Product Architecture','Product Design','Product Photography','Production',
  'Project Delivery','Prototyping','ROI','React 19','Rebrand Discovery','Rebranding','Redesign Process',
  'Remote Production','Responsive UI','Retail Design','Retail Strategy','Retail UX','Revenue Growth',
  'Rigid Boxes','Risk Management','Roadmap','SEO Migration','SEO Strategy','SEO Tech','SVG','SaaS',
  'Schema','Schema.org','Shelf Pop','Shipping Mailers','Shoot Brief','Spatial Architecture','Spatial Design',
  'Spatial Experience','Spot UV','Spring Physics','Stakeholder Alignment','Strategy','Studio Photography',
  'Studio Production','Studio Setup','Styling','Sustainable Packaging','Taxonomy','Tech Branding',
  'Technical SEO','Topical Authority','Touch Dynamics','Transit Protection','Typography','UI Animation',
  'UI Assets','UI Avatars','UI Motion','UI Tokens','UI/UX','UI/UX Design','UX Architecture','UX Audit',
  'UX Engineering','UX Optimization','UX Process','Unboxing UX','Usability','User Research','User Testing',
  'Variable Fonts','Visual Assets','Visual Equity','Visual Identity','Visual Trust','WCAG 2.1 AA',
  'Web Engineering','Web Fonts','Web Performance','WebGL','WebGL 3D','Wireframing',
];

export const TOTAL_BLOG_POSTS = 61;

// ─── Sidebar (Trending / Popular / Featured) ──────────────────────────────────
// These are pre-extracted mini-previews so the sidebar renders instantly
// without pulling the full BLOG_PREVIEWS bundle onto the client.

export interface SidebarPost {
  slug: string;
  title: string;
  readTime: string;
  category: string;
  isoDate: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
}

export const TRENDING_POSTS: SidebarPost[] = [
  {
    slug: 'the-master-guide-to-enterprise-brand-identity-and-strategy',
    title: 'The Master Guide to Enterprise Brand Identity & Strategy',
    readTime: '12 min read',
    category: 'Brand Strategy',
    isoDate: '2026-08-04T09:00:00Z',
    date: 'August 04, 2026',
    author: { name: 'Elena Varga', role: 'Partner & Principal Brand Strategist', avatar: '/author_rand_khaled_1785542515171.png', bio: '' },
  },
  {
    slug: 'brand-identity-vs-brand-strategy-differences',
    title: 'Brand Identity vs. Brand Strategy: Key Differences',
    readTime: '9 min read',
    category: 'Brand Strategy',
    isoDate: '2026-08-04T10:00:00Z',
    date: 'August 04, 2026',
    author: { name: 'Elena Varga', role: 'Partner & Principal Brand Strategist', avatar: '/author_rand_khaled_1785542515171.png', bio: '' },
  },
  {
    slug: 'roi-of-brand-redesign-financial-impact',
    title: 'The ROI of Brand Redesign: Measuring Financial Impact',
    readTime: '10 min read',
    category: 'Brand Strategy',
    isoDate: '2026-08-04T11:00:00Z',
    date: 'August 04, 2026',
    author: { name: 'Rand Khaled', role: 'Director of Growth & Performance Marketing', avatar: '/author_rand_khaled_1785542515171.png', bio: '' },
  },
  {
    slug: 'brand-guidelines-design-systems-scalable-standards',
    title: 'Brand Guidelines & Design Systems: Building Scalable Standards',
    readTime: '10 min read',
    category: 'Design Systems',
    isoDate: '2026-08-04T12:00:00Z',
    date: 'August 04, 2026',
    author: { name: 'Julian Cross', role: 'Head of Product Design & UI/UX', avatar: '/author_simon_a_1785542523544.png', bio: '' },
  },
];

export const POPULAR_POSTS: SidebarPost[] = [
  {
    slug: 'the-master-guide-to-enterprise-brand-identity-and-strategy',
    title: 'The Master Guide to Enterprise Brand Identity & Strategy',
    readTime: '12 min read',
    category: 'Brand Strategy',
    isoDate: '2026-08-04T09:00:00Z',
    date: 'August 04, 2026',
    author: { name: 'Elena Varga', role: 'Partner & Principal Brand Strategist', avatar: '/author_rand_khaled_1785542515171.png', bio: '' },
  },
  {
    slug: 'roi-of-brand-redesign-financial-impact',
    title: 'The ROI of Brand Redesign: Measuring Financial Impact',
    readTime: '10 min read',
    category: 'Brand Strategy',
    isoDate: '2026-08-04T11:00:00Z',
    date: 'August 04, 2026',
    author: { name: 'Rand Khaled', role: 'Director of Growth & Performance Marketing', avatar: '/author_rand_khaled_1785542515171.png', bio: '' },
  },
  {
    slug: 'signs-your-brand-identity-is-holding-back-growth',
    title: 'Signs Your Brand Identity Is Holding Back Growth',
    readTime: '8 min read',
    category: 'Brand Strategy',
    isoDate: '2026-08-04T12:00:00Z',
    date: 'August 04, 2026',
    author: { name: 'Elena Varga', role: 'Partner & Principal Brand Strategist', avatar: '/author_rand_khaled_1785542515171.png', bio: '' },
  },
  {
    slug: 'rebranding-risk-management-navigating-transitions',
    title: 'Rebranding Risk Management: Navigating Transitions',
    readTime: '9 min read',
    category: 'Brand Strategy',
    isoDate: '2026-08-04T13:00:00Z',
    date: 'August 04, 2026',
    author: { name: 'Elena Varga', role: 'Partner & Principal Brand Strategist', avatar: '/author_rand_khaled_1785542515171.png', bio: '' },
  },
];

export const FEATURED_SLUG = 'the-master-guide-to-enterprise-brand-identity-and-strategy';
