/**
 * ASTRELL services data — single source of truth for all 18 service pages.
 * Used by service page routes, sitemap, navigation, and structured data.
 */

export interface AstrellService {
  slug: string;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  longDescription: string;
  relatedServices: string[]; // slugs
  icon: string; // lucide icon name
  faqs: { question: string; answer: string }[];
}

export const SERVICES: AstrellService[] = [
  {
    slug: 'brand-identity',
    name: 'Brand Identity Design',
    shortName: 'Brand Identity',
    metaTitle: 'Brand Identity Design | ASTRELL',
    metaDescription: 'ASTRELL creates distinctive brand identities that position your business as a market leader — from strategy and visual systems to brand guidelines.',
    description: 'Distinctive brand identities that make your business instantly recognisable and impossible to ignore.',
    longDescription: 'We build brands from the ground up: market positioning, visual identity systems, typography, colour palettes, and comprehensive brand guidelines that ensure consistency across every touchpoint. Every brand we create is designed to grow with your business.',
    relatedServices: ['logo-design', 'rebranding', 'creative-direction'],
    icon: 'Compass',
    faqs: [
      { question: 'What does a brand identity project include?', answer: 'A full brand identity project typically includes brand strategy, logo design, colour palette, typography system, brand guidelines document, and application examples across key touchpoints like business cards, social media, and website.' },
      { question: 'How long does a brand identity project take?', answer: 'Most brand identity projects take 4–8 weeks depending on scope and complexity. We work in defined phases — discovery, concept development, refinement, and delivery — with clear milestones at each stage.' },
      { question: 'Do you provide brand guidelines?', answer: 'Yes. Every brand identity project includes a comprehensive brand guidelines document covering logo usage, colour specifications, typography rules, and practical application guidance to keep your brand consistent.' },
    ],
  },
  {
    slug: 'logo-design',
    name: 'Logo Design',
    shortName: 'Logo Design',
    metaTitle: 'Logo Design | ASTRELL',
    metaDescription: 'ASTRELL designs logos that are distinctive, versatile, and built to last — from concept to final files ready for print, digital, and everything in between.',
    description: 'Logos that are distinctive, versatile, and built to last across every medium.',
    longDescription: 'Your logo is the most concentrated expression of your brand. We design logos that work at every scale — from a favicon to a billboard — with the flexibility to adapt across print, digital, packaging, and environmental applications.',
    relatedServices: ['brand-identity', 'rebranding', 'print-design'],
    icon: 'Layers',
    faqs: [
      { question: 'How many logo concepts will I see?', answer: 'We typically present 2–3 distinct logo concepts based on the creative brief, each exploring a different strategic direction. From there, we refine the chosen direction through revision rounds agreed in your project scope.' },
      { question: 'What file formats do I receive?', answer: 'You receive your final logo in all necessary formats: vector (SVG, AI, EPS), raster (PNG with transparency), and PDF. We also supply colour variants (full colour, single colour, reversed) optimised for different use cases.' },
    ],
  },
  {
    slug: 'rebranding',
    name: 'Rebranding',
    shortName: 'Rebranding',
    metaTitle: 'Rebranding Services | ASTRELL',
    metaDescription: 'ASTRELL helps established businesses evolve their brand through strategic rebranding — retaining what works while elevating everything else.',
    description: 'Strategic rebranding that evolves your business without losing what made it successful.',
    longDescription: 'Rebranding is more than a new logo. We audit your current brand perception, identify what to keep and what to change, and build a refreshed identity that signals growth, ambition, and relevance — while respecting the equity you\'ve already built.',
    relatedServices: ['brand-identity', 'logo-design', 'marketing-strategy'],
    icon: 'RotateCw',
    faqs: [
      { question: 'When should a business consider rebranding?', answer: 'Common triggers include entering new markets, merging with another company, outgrowing your current positioning, or when your visual identity no longer reflects the quality of your work. If your brand is holding you back rather than pushing you forward, it\'s time.' },
      { question: 'Will rebranding confuse existing customers?', answer: 'A well-executed rebrand includes a thoughtful transition plan. We phase the rollout and maintain recognisable elements where appropriate so existing customers experience evolution, not disruption.' },
    ],
  },
  {
    slug: 'website-design',
    name: 'Website Design',
    shortName: 'Website Design',
    metaTitle: 'Website Design | ASTRELL',
    metaDescription: 'ASTRELL designs high-converting websites that look premium and perform brilliantly — responsive, fast, and built to turn visitors into customers.',
    description: 'Websites designed to convert visitors into customers with premium aesthetics and flawless performance.',
    longDescription: 'We design websites that don\'t just look impressive — they work. Every layout decision, interaction, and visual element is engineered to guide visitors toward meaningful action, whether that\'s a purchase, an enquiry, or a booking.',
    relatedServices: ['website-development', 'ui-ux-design', 'seo'],
    icon: 'Monitor',
    faqs: [
      { question: 'What makes ASTRELL\'s website design different?', answer: 'We design for performance, not just aesthetics. Every website we create is built mobile-first, optimised for Core Web Vitals, and structured to support SEO and conversion — not just to win design awards.' },
      { question: 'Do you design for mobile?', answer: 'Every website we design is mobile-first and fully responsive. We test across devices and screen sizes to ensure a consistent, high-quality experience for every visitor.' },
    ],
  },
  {
    slug: 'website-development',
    name: 'Website Development',
    shortName: 'Web Development',
    metaTitle: 'Website Development | ASTRELL',
    metaDescription: 'ASTRELL builds fast, scalable websites using modern frameworks like Next.js — clean code, optimised performance, and ready to grow with your business.',
    description: 'Fast, scalable websites built with modern frameworks and clean, maintainable code.',
    longDescription: 'We build websites using production-grade technologies — Next.js, React, TypeScript — with a focus on performance, accessibility, and maintainability. Every build is optimised for Core Web Vitals, structured for SEO, and deployed to global edge infrastructure.',
    relatedServices: ['website-design', 'seo', 'ui-ux-design'],
    icon: 'Laptop',
    faqs: [
      { question: 'What technology stack does ASTRELL use?', answer: 'We primarily build with Next.js, React, and TypeScript, deployed on Vercel with Cloudflare for CDN and security. For backend needs, we use Supabase. This stack gives you fast load times, excellent SEO, and easy scalability.' },
      { question: 'Can you work with my existing website?', answer: 'Yes. We can audit, redesign, and rebuild existing websites, or integrate new features into your current stack. We\'ll assess what\'s worth keeping and what needs replacing during a technical discovery phase.' },
    ],
  },
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    shortName: 'UI/UX Design',
    metaTitle: 'UI/UX Design | ASTRELL',
    metaDescription: 'ASTRELL designs intuitive user interfaces and experiences that reduce friction, increase engagement, and make complex products feel effortless.',
    description: 'Intuitive interfaces that reduce friction and make complex products feel effortless.',
    longDescription: 'We design user experiences grounded in research and validated by testing. From information architecture and user flows to high-fidelity prototypes and design systems, we create interfaces that are beautiful and functional in equal measure.',
    relatedServices: ['website-design', 'website-development', 'consulting'],
    icon: 'Smartphone',
    faqs: [
      { question: 'What\'s the difference between UI and UX design?', answer: 'UX (user experience) design focuses on how a product works — user flows, information architecture, and usability. UI (user interface) design focuses on how it looks and feels — visual design, typography, colour, and interaction patterns. We handle both.' },
      { question: 'Do you do user research?', answer: 'Yes. For projects where it adds clear value, we conduct user research including competitive analysis, user journey mapping, and usability testing to inform design decisions with evidence rather than assumptions.' },
    ],
  },
  {
    slug: 'packaging-design',
    name: 'Packaging Design',
    shortName: 'Packaging Design',
    metaTitle: 'Packaging Design | ASTRELL',
    metaDescription: 'ASTRELL designs product packaging that stands out on shelves and in unboxing experiences — from concept to print-ready artwork.',
    description: 'Product packaging that stands out on shelves and creates memorable unboxing experiences.',
    longDescription: 'We design packaging that sells. From structural concepts and material selection to graphic design and print-ready artwork, we create packaging that communicates your product\'s value before a customer ever opens it.',
    relatedServices: ['label-design', 'brand-identity', 'print-design'],
    icon: 'Box',
    faqs: [
      { question: 'Do you handle structural packaging design?', answer: 'We focus primarily on graphic and visual packaging design — the surface artwork, typography, and branding. For structural engineering (box shapes, materials, die-cuts), we collaborate with specialist packaging manufacturers and can manage this on your behalf.' },
      { question: 'Can you prepare files for my printer?', answer: 'Yes. We deliver print-ready artwork with correct bleed, colour profiles (CMYK/Pantone), and die-line specifications matched to your manufacturer\'s requirements.' },
    ],
  },
  {
    slug: 'label-design',
    name: 'Label Design',
    shortName: 'Label Design',
    metaTitle: 'Label Design | ASTRELL',
    metaDescription: 'ASTRELL designs product labels that communicate quality and stand out — for food, drink, cosmetics, and premium consumer goods.',
    description: 'Product labels that communicate quality and differentiate you from competitors.',
    longDescription: 'Label design is where brand meets product. We design labels for food, drink, cosmetics, and premium consumer goods that balance regulatory requirements with distinctive visual design — making your product the one that gets picked up.',
    relatedServices: ['packaging-design', 'brand-identity', 'print-design'],
    icon: 'Layers3',
    faqs: [
      { question: 'Do you handle regulatory label requirements?', answer: 'We design around your regulatory requirements (ingredients lists, allergen declarations, barcode placement, etc.) and work with you to ensure all mandatory information is included while maintaining strong visual design.' },
    ],
  },
  {
    slug: 'marketing-strategy',
    name: 'Marketing Strategy',
    shortName: 'Marketing Strategy',
    metaTitle: 'Marketing Strategy | ASTRELL',
    metaDescription: 'ASTRELL develops marketing strategies that align creative execution with measurable business outcomes — from positioning to channel planning.',
    description: 'Marketing strategies that align creative execution with measurable business outcomes.',
    longDescription: 'We develop marketing strategies rooted in your business goals, not generic playbooks. Market positioning, audience definition, channel selection, content planning, and campaign architecture — all designed to drive specific, measurable results.',
    relatedServices: ['digital-marketing', 'creative-direction', 'seo'],
    icon: 'TrendingUp',
    faqs: [
      { question: 'How is marketing strategy different from digital marketing?', answer: 'Marketing strategy defines what you\'re saying, to whom, through which channels, and why. Digital marketing is the execution — running the campaigns, managing the channels, and measuring the results. Strategy comes first; execution follows.' },
    ],
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    shortName: 'Digital Marketing',
    metaTitle: 'Digital Marketing | ASTRELL',
    metaDescription: 'ASTRELL executes digital marketing campaigns that drive real business results — from social media and content marketing to paid advertising and email.',
    description: 'Digital marketing campaigns engineered to drive traffic, engagement, and conversions.',
    longDescription: 'We plan and execute digital marketing campaigns across the channels that matter for your business. Social media, content marketing, paid advertising, email marketing — all managed with clear KPIs and transparent reporting.',
    relatedServices: ['marketing-strategy', 'social-media-management', 'seo'],
    icon: 'Activity',
    faqs: [
      { question: 'Which digital marketing channels does ASTRELL work with?', answer: 'We work across social media (Instagram, LinkedIn, TikTok, X), content marketing, email marketing, and paid advertising (Meta Ads, Google Ads). We recommend channels based on your audience and goals, not a one-size-fits-all approach.' },
    ],
  },
  {
    slug: 'creative-direction',
    name: 'Creative Direction',
    shortName: 'Creative Direction',
    metaTitle: 'Creative Direction | ASTRELL',
    metaDescription: 'ASTRELL provides creative direction that ensures visual consistency, strategic alignment, and distinctive creative output across every touchpoint.',
    description: 'Creative direction that ensures consistency, strategic alignment, and distinctive output.',
    longDescription: 'Creative direction is about making sure everything your brand produces — from a social media post to a flagship campaign — tells the same story with the same level of quality. We provide the strategic vision and quality control that holds it all together.',
    relatedServices: ['brand-identity', 'marketing-strategy', 'social-media-design'],
    icon: 'Compass',
    faqs: [
      { question: 'What does creative direction include?', answer: 'Creative direction includes defining the visual and tonal strategy for your brand communications, reviewing and guiding all creative output, and ensuring consistency across channels and campaigns. It\'s the strategic layer above individual design tasks.' },
    ],
  },
  {
    slug: 'social-media-design',
    name: 'Social Media Design',
    shortName: 'Social Media Design',
    metaTitle: 'Social Media Design | ASTRELL',
    metaDescription: 'ASTRELL designs scroll-stopping social media content — templates, graphics, stories, and carousels that look premium and drive engagement.',
    description: 'Scroll-stopping social media content that looks premium and drives engagement.',
    longDescription: 'We design social media content that performs — not generic templates, but strategically designed graphics, carousels, stories, and reels artwork that stop the scroll and communicate your brand\'s value in seconds.',
    relatedServices: ['social-media-management', 'creative-direction', 'digital-marketing'],
    icon: 'Smartphone',
    faqs: [
      { question: 'Do you create social media templates?', answer: 'Yes. We design branded social media template systems in Figma or Canva that your team can use independently — maintaining visual consistency without needing a designer for every post.' },
    ],
  },
  {
    slug: 'social-media-management',
    name: 'Social Media Management',
    shortName: 'Social Media Management',
    metaTitle: 'Social Media Management | ASTRELL',
    metaDescription: 'ASTRELL manages your social media presence end to end — strategy, content creation, scheduling, community management, and performance reporting.',
    description: 'End-to-end social media management from strategy to posting and performance reporting.',
    longDescription: 'We manage social media accounts end to end: strategy, content calendar planning, content creation, scheduling, community management, and monthly performance reporting. You get a consistent, professional presence without the daily time investment.',
    relatedServices: ['social-media-design', 'digital-marketing', 'marketing-strategy'],
    icon: 'Users',
    faqs: [
      { question: 'Which platforms do you manage?', answer: 'We primarily manage Instagram, LinkedIn, TikTok, and X (Twitter). We recommend the platforms that align with your audience and business goals rather than spreading effort across every channel.' },
    ],
  },
  {
    slug: 'posters-banners',
    name: 'Posters & Banners',
    shortName: 'Posters & Banners',
    metaTitle: 'Poster & Banner Design | ASTRELL',
    metaDescription: 'ASTRELL designs impactful posters and banners for events, retail, exhibitions, and campaigns — from digital banners to large-format print.',
    description: 'Impactful posters and banners for events, retail, exhibitions, and campaigns.',
    longDescription: 'We design posters and banners that command attention — whether for trade shows, retail environments, event promotion, or digital advertising campaigns. Every design is created with the final output and viewing distance in mind.',
    relatedServices: ['print-design', 'marketing-strategy', 'creative-direction'],
    icon: 'Layers',
    faqs: [
      { question: 'Do you design digital banners as well as print?', answer: 'Yes. We design both digital display banners (Google Display Network, social media ad formats) and large-format print banners. File delivery is optimised for the specific output medium.' },
    ],
  },
  {
    slug: 'motion-graphics',
    name: 'Motion Graphics',
    shortName: 'Motion Graphics',
    metaTitle: 'Motion Graphics | ASTRELL',
    metaDescription: 'ASTRELL creates motion graphics and animated content that bring your brand to life — from logo animations to explainer videos and social content.',
    description: 'Motion graphics that bring your brand to life across digital platforms.',
    longDescription: 'We create motion graphics that enhance brand storytelling — logo animations, social media motion content, explainer animations, and UI micro-interactions. Movement adds depth, professionalism, and engagement to your brand communications.',
    relatedServices: ['social-media-design', 'website-design', 'creative-direction'],
    icon: 'Activity',
    faqs: [
      { question: 'What types of motion graphics do you create?', answer: 'We create logo animations, animated social media content (reels, stories, carousels), explainer animations, website micro-interactions, and presentation animations. We work in After Effects, Lottie, and CSS/JS animation depending on the output medium.' },
    ],
  },
  {
    slug: 'print-design',
    name: 'Print Design',
    shortName: 'Print Design',
    metaTitle: 'Print Design | ASTRELL',
    metaDescription: 'ASTRELL designs premium print materials — business cards, brochures, catalogues, stationery, and marketing collateral that reinforce your brand.',
    description: 'Premium print materials that reinforce your brand at every physical touchpoint.',
    longDescription: 'We design print materials that feel as premium as your digital presence — business cards, brochures, catalogues, stationery, menus, and marketing collateral. Every piece is prepared for print with correct specifications and delivered print-ready.',
    relatedServices: ['brand-identity', 'packaging-design', 'posters-banners'],
    icon: 'Layers3',
    faqs: [
      { question: 'Do you manage print production?', answer: 'We deliver print-ready files to your specifications. We can also recommend trusted print partners and review proofs on your behalf if you need support managing the production process.' },
    ],
  },
  {
    slug: 'seo',
    name: 'SEO',
    shortName: 'SEO',
    metaTitle: 'SEO Services | ASTRELL',
    metaDescription: 'ASTRELL delivers technical and on-page SEO that improves your search visibility — structured data, Core Web Vitals, content strategy, and AI search optimisation.',
    description: 'Technical and on-page SEO that improves your search visibility and organic traffic.',
    longDescription: 'We implement SEO that actually works — technical foundations (Core Web Vitals, structured data, crawlability), on-page optimisation (content structure, meta tags, internal linking), and forward-looking AI search optimisation to ensure your business appears in both traditional and AI-generated search results.',
    relatedServices: ['website-development', 'digital-marketing', 'consulting'],
    icon: 'TrendingUp',
    faqs: [
      { question: 'Do you offer ongoing SEO management?', answer: 'Yes. We offer both one-time SEO audits and implementations, and ongoing SEO management with monthly reporting. Ongoing management includes content optimisation, technical monitoring, and adaptation to algorithm and AI search engine changes.' },
      { question: 'What is AI search optimisation?', answer: 'AI search optimisation (also called AEO or GEO) ensures your content is structured to be cited by AI-powered search engines like ChatGPT, Perplexity, and Google AI Overviews — not just ranked in traditional search results. It\'s about being the answer, not just a result.' },
    ],
  },
  {
    slug: 'consulting',
    name: 'Consulting',
    shortName: 'Consulting',
    metaTitle: 'Creative & Digital Consulting | ASTRELL',
    metaDescription: 'ASTRELL offers creative and digital consulting for businesses that need expert guidance on branding, design systems, digital strategy, or technology decisions.',
    description: 'Expert creative and digital consulting for businesses that need strategic guidance.',
    longDescription: 'Sometimes you don\'t need execution — you need an expert perspective. We offer consulting on brand strategy, design systems, digital transformation, technology stack selection, and creative process optimisation. Clear advice, no jargon, no unnecessary complexity.',
    relatedServices: ['marketing-strategy', 'creative-direction', 'seo'],
    icon: 'Briefcase',
    faqs: [
      { question: 'What does a consulting engagement look like?', answer: 'Consulting typically starts with a discovery session to understand your challenge, followed by analysis and a strategic recommendations document. Engagements can be one-off or ongoing — we adapt to what you actually need.' },
    ],
  },
];

export function getServiceBySlug(slug: string): AstrellService | undefined {
  return SERVICES.find(s => s.slug === slug);
}

export function getRelatedServices(slugs: string[]): AstrellService[] {
  return slugs.map(slug => SERVICES.find(s => s.slug === slug)).filter(Boolean) as AstrellService[];
}
