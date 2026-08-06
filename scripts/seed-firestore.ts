/**
 * ASTRELL — Firestore Seed Data Script
 *
 * Populates Firestore with sample development data for all collections.
 * Uses the Firebase Admin SDK for server-side writes (bypasses security rules).
 *
 * Usage:
 *   npx ts-node scripts/seed-firestore.ts
 *
 * Prerequisites:
 *   1. Set GOOGLE_APPLICATION_CREDENTIALS env var to a service account key file, OR
 *   2. Run `firebase login` and use the default project credentials.
 *
 * NOTE: This is development seed data only. Do NOT run in production.
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';

// ---------------------------------------------------------------------------
// Initialize Firebase Client
// ---------------------------------------------------------------------------

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------------------------------------------------------------------------
// Helper: Set document with auto-ID or specified ID
// ---------------------------------------------------------------------------

async function seedDoc(
  collectionPath: string,
  docId: string,
  data: Record<string, unknown>
): Promise<string> {
  const docRef = doc(db, collectionPath, docId);
  await setDoc(docRef, data);
  console.log(`  ✓ ${collectionPath}/${docId}`);
  return docId;
}

// ---------------------------------------------------------------------------
// SEED DATA
// ---------------------------------------------------------------------------

async function seed() {
  console.log('\n🌱 ASTRELL — Seeding Firestore...\n');

  const now = Timestamp.now();

  // =========================================================================
  // 1. MEDIA ASSETS
  // =========================================================================
  console.log('📸 Media Assets:');

  await seedDoc('media_assets', 'media-showcase-001', {
    bucket_id: 'astrell0-showcase-assets.firebasestorage.app',
    file_path: '2026/08/sample-3d-poster-01.webp',
    public_url: 'https://firebasestorage.googleapis.com/v0/b/astrell0-showcase-assets.firebasestorage.app/o/2026%2F08%2Fsample-3d-poster-01.webp?alt=media',
    alt_text: 'Cyberpunk brand identity poster with neon typography',
    caption: 'Cyberpunk Brand Identity — 2026 Collection',
    mime_type: 'image/webp',
    file_size_bytes: 245760,
    width: 1920,
    height: 1080,
    aspect_ratio: 1.78,
    blur_data_url: 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAADQAQCdASoIAAUA',
    metadata: { color_palette: ['#0f0f23', '#ff6b35', '#00d4ff'] },
    created_by: null,
    created_at: now,
    updated_at: now,
  });

  await seedDoc('media_assets', 'media-gallery-001', {
    bucket_id: 'astrell0-portfolio-gallery.firebasestorage.app',
    file_path: '2026/08/sample-packaging-design.webp',
    public_url: 'https://firebasestorage.googleapis.com/v0/b/astrell0-portfolio-gallery.firebasestorage.app/o/2026%2F08%2Fsample-packaging-design.webp?alt=media',
    alt_text: 'Premium coffee packaging design with gold foil accents',
    caption: 'Artisan Coffee — Packaging Redesign',
    mime_type: 'image/webp',
    file_size_bytes: 512000,
    width: 1200,
    height: 1600,
    aspect_ratio: 0.75,
    blur_data_url: 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAADQAQCdASoIAAUA',
    metadata: {},
    created_by: null,
    created_at: now,
    updated_at: now,
  });

  await seedDoc('media_assets', 'media-author-001', {
    bucket_id: 'astrell0-system-assets.firebasestorage.app',
    file_path: '2026/08/author-avatar-sarah.webp',
    public_url: 'https://firebasestorage.googleapis.com/v0/b/astrell0-system-assets.firebasestorage.app/o/2026%2F08%2Fauthor-avatar-sarah.webp?alt=media',
    alt_text: 'Sarah Chen — Creative Director',
    mime_type: 'image/webp',
    file_size_bytes: 51200,
    width: 400,
    height: 400,
    aspect_ratio: 1.0,
    metadata: {},
    created_by: null,
    created_at: now,
    updated_at: now,
  });

  await seedDoc('media_assets', 'media-blog-cover-001', {
    bucket_id: 'astrell0-blog-content.firebasestorage.app',
    file_path: '2026/08/blog-cover-design-trends.webp',
    public_url: 'https://firebasestorage.googleapis.com/v0/b/astrell0-blog-content.firebasestorage.app/o/2026%2F08%2Fblog-cover-design-trends.webp?alt=media',
    alt_text: 'Design trends 2026 — abstract gradient illustration',
    caption: 'Top Design Trends for 2026',
    mime_type: 'image/webp',
    file_size_bytes: 307200,
    width: 1600,
    height: 900,
    aspect_ratio: 1.78,
    blur_data_url: 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAADQAQCdASoIAAUA',
    metadata: {},
    created_by: null,
    created_at: now,
    updated_at: now,
  });

  // =========================================================================
  // 2. SHOWCASE ITEMS
  // =========================================================================
  console.log('🎨 Showcase Items:');

  await seedDoc('showcase_items', 'showcase-001', {
    media_id: 'media-showcase-001',
    title: 'Cyberpunk Brand Identity',
    subtitle: 'Neon-infused visual system for a futuristic tech startup',
    tag: 'FEATURED',
    display_order: 1,
    is_active: true,
    created_at: now,
    updated_at: now,
  });

  await seedDoc('showcase_items', 'showcase-002', {
    media_id: 'media-gallery-001',
    title: 'Artisan Coffee Packaging',
    subtitle: 'Premium packaging with gold foil and embossed textures',
    tag: 'FEATURED',
    display_order: 2,
    is_active: true,
    created_at: now,
    updated_at: now,
  });

  // =========================================================================
  // 3. GALLERY ITEMS
  // =========================================================================
  console.log('🖼️  Gallery Items:');

  await seedDoc('gallery_items', 'gallery-001', {
    media_id: 'media-showcase-001',
    title: 'Cyberpunk Brand Identity System',
    slug: 'cyberpunk-brand-identity',
    category: 'Brand Identity',
    tags: ['cyberpunk', 'neon', 'futuristic', 'brand'],
    variant: 'default',
    display_order: 1,
    is_published: true,
    client_name: 'NeonTech Labs',
    project_year: 2026,
    created_at: now,
    updated_at: now,
  });

  await seedDoc('gallery_items', 'gallery-002', {
    media_id: 'media-gallery-001',
    title: 'Artisan Coffee Packaging Redesign',
    slug: 'artisan-coffee-packaging',
    category: 'Packaging',
    tags: ['packaging', 'coffee', 'premium', 'gold'],
    variant: 'masonry',
    display_order: 2,
    is_published: true,
    client_name: 'Mountain Brew Co.',
    project_year: 2026,
    created_at: now,
    updated_at: now,
  });

  await seedDoc('gallery_items', 'gallery-003', {
    media_id: 'media-showcase-001',
    title: 'Social Media Campaign — Summer 2026',
    slug: 'social-media-summer-2026',
    category: 'Social Media',
    tags: ['social', 'summer', 'campaign', 'instagram'],
    variant: 'polaroid',
    display_order: 3,
    is_published: true,
    client_name: 'Coastal Vibes',
    project_year: 2026,
    created_at: now,
    updated_at: now,
  });

  // =========================================================================
  // 4. BLOG AUTHORS
  // =========================================================================
  console.log('✍️  Blog Authors:');

  await seedDoc('blog_authors', 'author-001', {
    name: 'Sarah Chen',
    role: 'Creative Director',
    avatar_media_id: 'media-author-001',
    bio: 'Award-winning creative director with 12+ years of experience in brand strategy, visual identity design, and digital storytelling. Passionate about the intersection of technology and artistic expression.',
    twitter: 'sarahchendesign',
    linkedin: 'https://linkedin.com/in/sarahchendesign',
    created_at: now,
  });

  // =========================================================================
  // 5. BLOG POSTS
  // =========================================================================
  console.log('📝 Blog Posts:');

  const publishedAt = Timestamp.fromDate(new Date('2026-08-01T10:00:00Z'));

  await seedDoc('blog_posts', 'post-001', {
    slug: 'design-trends-shaping-2026',
    title: 'The Design Trends Shaping 2026: What Every Brand Needs to Know',
    subtitle: 'From AI-assisted design to neo-brutalism — the trends redefining creative work',
    excerpt: 'Explore the top design trends of 2026 that are transforming how brands communicate visually, from AI-generated assets to immersive 3D experiences.',
    category: 'Design Trends',
    service_pillar: 'Brand Identity',
    journey_stage: 'awareness',
    primary_keyword: 'design trends 2026',
    secondary_keywords: ['brand design trends', 'visual identity trends', 'creative design 2026'],
    search_intent: 'informational',
    tags: ['design trends', '2026', 'brand identity', 'AI design', 'neo-brutalism'],
    published_at: publishedAt,
    read_time: '8 min read',
    word_count: 2400,
    featured: true,
    trending: true,
    popular: false,
    cover_media_id: 'media-blog-cover-001',
    author_id: 'author-001',
    seo_title: 'Design Trends 2026: Top Visual & Branding Trends | ASTRELL',
    seo_description: 'Discover the design trends shaping 2026 — from AI-assisted creativity to immersive 3D brand experiences. Essential reading for modern brands.',
    seo_keywords: ['design trends 2026', 'brand design', 'visual identity', 'creative trends'],
    key_takeaways: [
      'AI-assisted design tools are augmenting, not replacing, human creativity',
      'Neo-brutalism is making a strong comeback in digital interfaces',
      '3D and immersive experiences are becoming mainstream for brand storytelling',
      'Sustainable design practices are now a competitive differentiator',
    ],
    faq_schema: [
      {
        question: 'What are the biggest design trends in 2026?',
        answer: 'The biggest trends include AI-assisted design, neo-brutalism in UI, immersive 3D experiences, and sustainable design practices that prioritize environmental responsibility.',
      },
      {
        question: 'How can brands adapt to 2026 design trends?',
        answer: 'Brands can adapt by investing in AI design tools, experimenting with bold visual styles, incorporating 3D elements into their digital presence, and adopting sustainable design frameworks.',
      },
    ],
    cta_type: 'awareness',
    internal_links: [],
    is_published: true,
    created_at: now,
    updated_at: now,
  });

  // =========================================================================
  // 6. BLOG SECTIONS (Subcollection under blog post)
  // =========================================================================
  console.log('📄 Blog Sections:');

  await seedDoc('blog_posts/post-001/sections', 'section-001', {
    section_order: 1,
    heading: 'The Rise of AI-Assisted Design',
    subheading: 'How machine learning is reshaping the creative process',
    paragraphs: [
      'Artificial intelligence has evolved from a novelty to an essential tool in the designer\'s toolkit. In 2026, we\'re seeing AI being used not as a replacement for human creativity, but as a powerful augmentation layer that handles repetitive tasks and generates starting points for iteration.',
      'Tools like Midjourney, DALL-E, and Adobe Firefly have matured significantly, allowing designers to prototype concepts at unprecedented speed. The key shift is in how designers are using these tools — not for final outputs, but for rapid ideation and mood exploration.',
    ],
    pull_quote: {
      text: 'AI doesn\'t replace creativity — it amplifies it.',
      attribution: 'Sarah Chen, Creative Director at ASTRELL',
    },
    callout: null,
    code_snippet: null,
    comparison_table: null,
    timeline: null,
    bento_grid: null,
    image_media_id: null,
    image_caption: null,
    created_at: now,
  });

  await seedDoc('blog_posts/post-001/sections', 'section-002', {
    section_order: 2,
    heading: 'Neo-Brutalism Makes a Comeback',
    subheading: 'Bold, raw, and unapologetically functional',
    paragraphs: [
      'After years of polished minimalism and glassmorphism, neo-brutalism is reclaiming digital design spaces with its raw aesthetic, bold borders, and stark color contrasts. This trend draws from the original brutalist architecture movement, emphasizing function and authenticity.',
      'Major brands are adopting neo-brutalist elements in their web interfaces, particularly for creative and tech-forward products. The style resonates with audiences who value transparency and directness in brand communication.',
      'For ASTRELL clients, we recommend blending neo-brutalist elements selectively — using bold typography and stark layouts for landing pages while maintaining refined aesthetics for content-heavy sections.',
    ],
    pull_quote: null,
    callout: {
      type: 'tip',
      title: 'Pro Tip',
      content: 'Neo-brutalism works best when balanced with intentional whitespace and clear information hierarchy.',
    },
    code_snippet: null,
    comparison_table: null,
    timeline: null,
    bento_grid: null,
    image_media_id: null,
    image_caption: null,
    created_at: now,
  });

  // =========================================================================
  // 7. COMPLIANCE LOGS
  // =========================================================================
  console.log('📋 Compliance Logs:');

  await seedDoc('consent_logs', 'consent-sample-001', {
    categories: { necessary: true, analytics: true, functional: false },
    timestamp: now,
    policy_version: '2.0',
    created_at: now,
  });

  await seedDoc('agreement_logs', 'agreement-sample-001', {
    email: 'demo@example.com',
    document_versions: { terms: '1.0', privacy: '1.0' },
    agreed_at: now,
    created_at: now,
  });

  // =========================================================================
  // DONE
  // =========================================================================
  console.log('\n✅ Seeding complete!\n');
  console.log('Collections created:');
  console.log('  • media_assets (4 documents)');
  console.log('  • showcase_items (2 documents)');
  console.log('  • gallery_items (3 documents)');
  console.log('  • blog_authors (1 document)');
  console.log('  • blog_posts (1 document)');
  console.log('  • blog_posts/post-001/sections (2 documents)');
  console.log('  • consent_logs (1 document)');
  console.log('  • agreement_logs (1 document)');
  console.log('\nTotal: 14 documents across 8 collections\n');
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
