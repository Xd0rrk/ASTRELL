import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// ---------------------------------------------------------------------------
// Firebase Client Initialization
// ---------------------------------------------------------------------------

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ---------------------------------------------------------------------------
// Bucket URLs
// ---------------------------------------------------------------------------

const DEFAULT_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'astrell0.firebasestorage.app';

const BUCKETS = {
  SHOWCASE: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_SHOWCASE || DEFAULT_BUCKET,
  GALLERY: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_GALLERY || DEFAULT_BUCKET,
  BLOG: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_BLOG || DEFAULT_BUCKET,
  SYSTEM: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_SYSTEM || DEFAULT_BUCKET,
};

// Curated modern agency portfolio images (high resolution design, UI/UX, branding, architecture, 3D assets)
const SOURCE_IMAGE_URLS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500627869374-13cd993b1115?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80',
];

// Service categories matching the prompt
const SERVICE_CATEGORIES = [
  'Branding',
  'Website & Development',
  'UI/UX Design',
  'Graphic Design',
  'Print & Packaging',
  'Creative Services',
  'Marketing',
  'Photography',
  'Consulting',
];

async function fetchImageBuffer(url: string, title: string = 'ASTRELL Design'): Promise<Buffer> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }
  } catch (e) {
    // Ignore network error and fall through to SVG fallback
  }

  // High-quality modern dark-mode vector SVG fallback
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f0f23"/>
        <stop offset="50%" stop-color="#181838"/>
        <stop offset="100%" stop-color="#050510"/>
      </linearGradient>
      <linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ff6b35"/>
        <stop offset="100%" stop-color="#00d4ff"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <circle cx="600" cy="450" r="300" fill="none" stroke="url(#a)" stroke-width="2" opacity="0.3"/>
    <circle cx="600" cy="450" r="200" fill="none" stroke="url(#a)" stroke-width="4" opacity="0.6"/>
    <text x="600" y="430" font-family="system-ui, sans-serif" font-size="42" font-weight="bold" fill="#ffffff" text-anchor="middle">${title.toUpperCase()}</text>
    <text x="600" y="480" font-family="system-ui, sans-serif" font-size="20" font-weight="600" fill="url(#a)" text-anchor="middle" letter-spacing="4">ASTRELL CREATIVE PORTFOLIO</text>
  </svg>`;

  return Buffer.from(svg, 'utf-8');
}

async function uploadToFirebaseStorage(
  bucketName: string,
  filePath: string,
  buffer: Buffer,
  mimeType: string = 'image/jpeg'
): Promise<string> {
  try {
    const bucketUrl = bucketName.startsWith('gs://') ? bucketName : `gs://${bucketName}`;
    const bucketStorage = getStorage(app, bucketUrl);
    const storageRef = ref(bucketStorage, filePath);
    
    await uploadBytes(storageRef, buffer, { contentType: mimeType });
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (err: any) {
    console.warn(`  ⚠️ Custom bucket ${bucketName} failed (${err?.code || err?.message}). Falling back to default bucket...`);
    // Fallback to default bucket
    const defaultStorage = getStorage(app, `gs://${DEFAULT_BUCKET}`);
    const storageRef = ref(defaultStorage, `${bucketName.split('.')[0]}/${filePath}`);
    await uploadBytes(storageRef, buffer, { contentType: mimeType });
    return await getDownloadURL(storageRef);
  }
}

async function run() {
  console.log('🚀 Starting ASTRELL Test Images Generation & Upload (80 images across 4 buckets)...\n');
  const now = Timestamp.now();

  let totalUploaded = 0;

  // =========================================================================
  // 1. SHOWCASE ASSETS (20 items -> astrell0-showcase-assets)
  // =========================================================================
  console.log('📸 1/4 Uploading 20 Showcase Assets...');
  const showcaseMediaIds: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const sourceUrl = SOURCE_IMAGE_URLS[(i - 1) % SOURCE_IMAGE_URLS.length];
    const buffer = await fetchImageBuffer(sourceUrl);
    const fileName = `2026/08/showcase-${String(i).padStart(3, '0')}.jpg`;
    
    const publicUrl = await uploadToFirebaseStorage(BUCKETS.SHOWCASE, fileName, buffer);
    const mediaId = `media-showcase-${String(i).padStart(3, '0')}`;
    showcaseMediaIds.push(mediaId);

    // Save Media Asset
    await setDoc(doc(db, 'media_assets', mediaId), {
      bucket_id: BUCKETS.SHOWCASE,
      file_path: fileName,
      public_url: publicUrl,
      alt_text: `ASTRELL 3D Spatial Showcase Asset #${i}`,
      caption: `Interactive 3D Showcase Card ${i}`,
      mime_type: 'image/jpeg',
      file_size_bytes: buffer.length,
      width: 1200,
      height: 900,
      aspect_ratio: 1.33,
      blur_data_url: 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAADQAQCdASoIAAUA',
      metadata: { category: SERVICE_CATEGORIES[i % SERVICE_CATEGORIES.length], is_test_data: true },
      created_at: now,
      updated_at: now,
    });

    // Save Showcase Item
    await setDoc(doc(db, 'showcase_items', `showcase-${String(i).padStart(3, '0')}`), {
      media_id: mediaId,
      title: `3D Spatial Project #${i}`,
      subtitle: `Modern ${SERVICE_CATEGORIES[i % SERVICE_CATEGORIES.length]} Showcase`,
      tag: i % 2 === 0 ? 'FEATURED' : 'NEW',
      display_order: i,
      is_active: true,
      created_at: now,
      updated_at: now,
    });

    totalUploaded++;
    console.log(`  ✓ Showcase item ${i}/20 uploaded.`);
  }

  // =========================================================================
  // 2. PORTFOLIO GALLERY (20 items -> astrell0-portfolio-gallery)
  // =========================================================================
  console.log('\n🖼️  2/4 Uploading 20 Portfolio Gallery Items...');
  
  const galleryTitles = [
    'Neo-Tokyo Cyberpunk Brand Suite',
    'Minimalist Architecture Identity',
    'Aura Skincare Tactile Packaging',
    'Vertex Real-Time Trading Platform',
    'Chrono Space Habitat 3D Simulator',
    'Kinetic Liquid Motion Campaign',
    'Monolith Spatial VR Environment',
    'Artisan Coffee Craft Redesign',
    'Lucent Luxury Watch Catalog',
    'Solaris E-Commerce Storefront',
    'Aethelgard Game UI System',
    'Zephyr Sustainable Logistics App',
    'Prism Editorial Typography',
    'Verve Organic Beverage Label',
    'Apex Financial Dashboard',
    'Komorebi Interior Photography',
    'Hyperion Brand Guidelines Deck',
    'Pulse Fitness Wearable UI',
    'Quantum SaaS Product Strategy',
    'Elysium Hotel Visual Identity',
  ];

  const variants: ('default' | 'masonry' | 'polaroid')[] = ['default', 'masonry', 'polaroid'];

  for (let i = 1; i <= 20; i++) {
    const sourceUrl = SOURCE_IMAGE_URLS[(i + 4) % SOURCE_IMAGE_URLS.length];
    const buffer = await fetchImageBuffer(sourceUrl);
    const fileName = `2026/08/gallery-${String(i).padStart(3, '0')}.jpg`;
    
    const publicUrl = await uploadToFirebaseStorage(BUCKETS.GALLERY, fileName, buffer);
    const mediaId = `media-gallery-${String(i).padStart(3, '0')}`;
    const category = SERVICE_CATEGORIES[(i - 1) % SERVICE_CATEGORIES.length];
    const title = galleryTitles[i - 1];
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Save Media Asset
    await setDoc(doc(db, 'media_assets', mediaId), {
      bucket_id: BUCKETS.GALLERY,
      file_path: fileName,
      public_url: publicUrl,
      alt_text: `${title} - Portfolio Showcase`,
      caption: title,
      mime_type: 'image/jpeg',
      file_size_bytes: buffer.length,
      width: 1200,
      height: 900,
      aspect_ratio: 1.33,
      blur_data_url: 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAADQAQCdASoIAAUA',
      metadata: { category, is_test_data: true },
      created_at: now,
      updated_at: now,
    });

    // Save Gallery Item
    await setDoc(doc(db, 'gallery_items', `gallery-${String(i).padStart(3, '0')}`), {
      media_id: mediaId,
      title,
      slug,
      category,
      tags: [category.toLowerCase(), 'design', 'astrell', 'portfolio'],
      variant: variants[i % variants.length],
      display_order: i,
      is_published: true,
      client_name: `Client Co. #${i}`,
      project_year: 2025 + (i % 2),
      created_at: now,
      updated_at: now,
    });

    totalUploaded++;
    console.log(`  ✓ Gallery item ${i}/20 uploaded (${category}).`);
  }

  // =========================================================================
  // 3. BLOG CONTENT (20 items -> astrell0-blog-content)
  // =========================================================================
  console.log('\n📝 3/4 Uploading 20 Blog Content Images...');

  const blogPosts = [
    { title: 'The Design Trends Shaping 2026', pillar: 'Brand Identity', stage: 'awareness' },
    { title: 'Mastering Next.js E-Commerce Architecture', pillar: 'Website Development', stage: 'decision' },
    { title: 'UI/UX Best Practices for Fintech Dashboards', pillar: 'UI/UX Design', stage: 'consideration' },
    { title: 'The Psychology of Luxury Packaging Design', pillar: 'Packaging Design', stage: 'awareness' },
    { title: 'How Motion Graphics Double Social Engagement', pillar: 'Motion Graphics', stage: 'consideration' },
    { title: 'Building Scalable Multi-Brand Design Systems', pillar: 'Brand Guidelines', stage: 'decision' },
    { title: 'Rebranding Strategies for Global Scale', pillar: 'Rebranding', stage: 'awareness' },
    { title: 'Optimizing Conversion on Modern Landing Pages', pillar: 'Landing Pages', stage: 'decision' },
    { title: 'Sustainable Materials in Physical Product Packaging', pillar: 'Label Design', stage: 'consideration' },
    { title: 'SEO Strategies for High-Growth Creative Agencies', pillar: 'SEO Consulting', stage: 'awareness' },
    { title: 'Crafting High-Converting B2B Digital Marketing Campaigns', pillar: 'Digital Marketing', stage: 'decision' },
    { title: 'Creative Direction in the Age of AI Design', pillar: 'Creative Direction', stage: 'awareness' },
    { title: 'Print Design Legacy: Modern Swiss Typography', pillar: 'Print Design', stage: 'consideration' },
    { title: 'Social Media Grid Aesthetics & Brand Storytelling', pillar: 'Social Media Design', stage: 'awareness' },
    { title: 'Logo Design Evolution: From Flat to 3D Spatial', pillar: 'Logo Design', stage: 'consideration' },
    { title: 'Corporate Photography Guidelines for Tech Brands', pillar: 'Photography', stage: 'awareness' },
    { title: 'UX Audit Framework for High-Traffic Applications', pillar: 'UX Audits', stage: 'decision' },
    { title: 'Bento Grid Layouts in Web Design', pillar: 'Website Design', stage: 'consideration' },
    { title: 'Brand Positioning Playbook for Modern Startups', pillar: 'Brand Strategy', stage: 'awareness' },
    { title: 'Executive Guide to Digital Transformation Consulting', pillar: 'Design Consulting', stage: 'decision' },
  ];

  for (let i = 1; i <= 20; i++) {
    const sourceUrl = SOURCE_IMAGE_URLS[(i + 7) % SOURCE_IMAGE_URLS.length];
    const buffer = await fetchImageBuffer(sourceUrl);
    const fileName = `2026/08/blog-cover-${String(i).padStart(3, '0')}.jpg`;
    
    const publicUrl = await uploadToFirebaseStorage(BUCKETS.BLOG, fileName, buffer);
    const mediaId = `media-blog-${String(i).padStart(3, '0')}`;
    const post = blogPosts[i - 1];
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Save Media Asset
    await setDoc(doc(db, 'media_assets', mediaId), {
      bucket_id: BUCKETS.BLOG,
      file_path: fileName,
      public_url: publicUrl,
      alt_text: `${post.title} Cover`,
      caption: post.title,
      mime_type: 'image/jpeg',
      file_size_bytes: buffer.length,
      width: 1600,
      height: 900,
      aspect_ratio: 1.78,
      blur_data_url: 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAADQAQCdASoIAAUA',
      metadata: { pillar: post.pillar, is_test_data: true },
      created_at: now,
      updated_at: now,
    });

    // Save Blog Post
    await setDoc(doc(db, 'blog_posts', `post-${String(i).padStart(3, '0')}`), {
      slug,
      title: post.title,
      subtitle: `An in-depth ASTRELL guide to ${post.pillar.toLowerCase()}`,
      excerpt: `Explore ${post.title.toLowerCase()} and learn actionable insights for high-impact brand storytelling.`,
      category: post.pillar,
      service_pillar: post.pillar,
      journey_stage: post.stage,
      primary_keyword: post.title.toLowerCase(),
      secondary_keywords: ['astrell', 'design', post.pillar.toLowerCase()],
      search_intent: post.stage === 'decision' ? 'transactional' : 'informational',
      tags: ['astrell', post.pillar.toLowerCase(), post.stage],
      published_at: Timestamp.fromDate(new Date(`2026-08-${String(21 - i).padStart(2, '0')}T10:00:00Z`)),
      read_time: `${5 + (i % 5)} min read`,
      word_count: 1500 + i * 50,
      featured: i <= 3,
      trending: i % 2 === 0,
      popular: i % 3 === 0,
      cover_media_id: mediaId,
      author_id: `author-${String((i % 5) + 1).padStart(3, '0')}`,
      seo_title: `${post.title} | ASTRELL Agency`,
      seo_description: `Read ${post.title} on the ASTRELL Blog. Insights on ${post.pillar}.`,
      seo_keywords: ['design', post.pillar.toLowerCase()],
      key_takeaways: [
        'Strategic alignment drives measurable business growth',
        'Consistency across digital and physical touchpoints is critical',
        'User-centric execution improves brand loyalty',
      ],
      faq_schema: [
        { question: `Why is ${post.pillar} important?`, answer: `${post.pillar} sets the visual and experience standard for modern brands.` }
      ],
      cta_type: post.stage,
      internal_links: [],
      is_published: true,
      created_at: now,
      updated_at: now,
    });

    totalUploaded++;
    console.log(`  ✓ Blog post ${i}/20 uploaded (${post.pillar}).`);
  }

  // =========================================================================
  // 4. SYSTEM ASSETS (20 items -> astrell0-system-assets)
  // =========================================================================
  console.log('\n⚙️  4/4 Uploading 20 System & Author Assets...');

  const authors = [
    { id: 'author-001', name: 'Sarah Chen', role: 'Creative Director' },
    { id: 'author-002', name: 'Marcus Vance', role: 'Head of Brand Strategy' },
    { id: 'author-003', name: 'Elena Rostova', role: 'Lead UI/UX Architect' },
    { id: 'author-004', name: 'Tariq Al-Mansoor', role: '3D & Spatial Designer' },
    { id: 'author-005', name: 'Oliver Thorne', role: 'Full-Stack Engineering Lead' },
  ];

  // First 5 System Assets = Author Avatars
  for (let i = 1; i <= 5; i++) {
    const author = authors[i - 1];
    const sourceUrl = SOURCE_IMAGE_URLS[(i + 12) % SOURCE_IMAGE_URLS.length];
    const buffer = await fetchImageBuffer(sourceUrl);
    const fileName = `2026/08/avatar-${author.id}.jpg`;
    
    const publicUrl = await uploadToFirebaseStorage(BUCKETS.SYSTEM, fileName, buffer);
    const mediaId = `media-author-${String(i).padStart(3, '0')}`;

    await setDoc(doc(db, 'media_assets', mediaId), {
      bucket_id: BUCKETS.SYSTEM,
      file_path: fileName,
      public_url: publicUrl,
      alt_text: `${author.name} Avatar`,
      mime_type: 'image/jpeg',
      file_size_bytes: buffer.length,
      width: 400,
      height: 400,
      aspect_ratio: 1.0,
      metadata: { type: 'avatar', is_test_data: true },
      created_at: now,
      updated_at: now,
    });

    await setDoc(doc(db, 'blog_authors', author.id), {
      name: author.name,
      role: author.role,
      avatar_media_id: mediaId,
      bio: `${author.name} is the ${author.role} at ASTRELL, bringing deep expertise in global branding and design engineering.`,
      twitter: `${author.name.toLowerCase().replace(/\s+/g, '')}`,
      linkedin: `https://linkedin.com/in/${author.name.toLowerCase().replace(/\s+/g, '')}`,
      created_at: now,
    });

    totalUploaded++;
    console.log(`  ✓ Author Avatar ${i}/5 created (${author.name}).`);
  }

  // Next 15 System Assets = Logos & Brand Placeholders
  for (let i = 6; i <= 20; i++) {
    const sourceUrl = SOURCE_IMAGE_URLS[(i + 2) % SOURCE_IMAGE_URLS.length];
    const buffer = await fetchImageBuffer(sourceUrl);
    const fileName = `2026/08/system-asset-${String(i).padStart(3, '0')}.jpg`;
    
    const publicUrl = await uploadToFirebaseStorage(BUCKETS.SYSTEM, fileName, buffer);
    const mediaId = `media-system-${String(i).padStart(3, '0')}`;

    await setDoc(doc(db, 'media_assets', mediaId), {
      bucket_id: BUCKETS.SYSTEM,
      file_path: fileName,
      public_url: publicUrl,
      alt_text: `ASTRELL System Asset #${i}`,
      mime_type: 'image/jpeg',
      file_size_bytes: buffer.length,
      width: 600,
      height: 600,
      aspect_ratio: 1.0,
      metadata: { type: 'brand_asset', is_test_data: true },
      created_at: now,
      updated_at: now,
    });

    totalUploaded++;
    console.log(`  ✓ System Brand Asset ${i}/20 uploaded.`);
  }

  console.log(`\n🎉 SUCCESS! Uploaded ${totalUploaded} test images to Firebase Storage across 4 buckets!`);
  console.log('✅ Updated Firestore with 80 Media Assets, 20 Showcases, 20 Gallery Items, 20 Blog Posts, and 5 Authors.');
  process.exit(0);
}

run().catch((err) => {
  console.error('\n❌ Upload & Seed Failed:', err);
  process.exit(1);
});
