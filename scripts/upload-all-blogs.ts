import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';
import { BLOG_POSTS, AUTHORS } from '../lib/blog-data';

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

async function uploadBlogs() {
  console.log('🚀 Starting upload of 61 static blogs to Firestore (via Admin SDK)...');
  
  // 1. Upload Authors
  const authorMap = new Map<string, string>(); // name to author doc ID
  console.log('\n✍️ Uploading Authors...');
  for (const [key, author] of Object.entries(AUTHORS)) {
    const authorId = `author-${key}`;
    const authorData = {
      name: author.name,
      role: author.role,
      bio: author.bio,
      twitter: author.twitter || null,
      linkedin: author.linkedin || null,
      created_at: Timestamp.now(),
    };
    await setDoc(doc(db, 'blog_authors', authorId), authorData);
    authorMap.set(author.name, authorId);
    console.log(`  ✓ ${author.name} (${authorId})`);
  }

  // 2. Upload Media Assets (Cover Images)
  const mediaMap = new Map<string, string>(); // url to media doc ID
  console.log('\n📸 Uploading Cover Image References...');
  let mediaIndex = 1;
  for (const post of BLOG_POSTS) {
    if (!mediaMap.has(post.coverImage)) {
      const mediaId = `media-blog-${mediaIndex++}`;
      const mediaData = {
        bucket_id: 'astrell0-blog-content.firebasestorage.app',
        file_path: post.coverImage,
        public_url: post.coverImage,
        alt_text: post.coverAlt,
        mime_type: 'image/png', // assuming png or webp
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      };
      await setDoc(doc(db, 'media_assets', mediaId), mediaData);
      mediaMap.set(post.coverImage, mediaId);
      console.log(`  ✓ ${post.coverImage} (${mediaId})`);
    }
  }

  // 3. Upload Blog Posts
  console.log('\n📝 Uploading Blog Posts...');
  let postCount = 0;
  for (const post of BLOG_POSTS) {
    const postId = `post-${post.slug}`;
    const authorId = authorMap.get(post.author.name) || 'author-elena';
    const mediaId = mediaMap.get(post.coverImage);

    const postData = {
      slug: post.slug,
      title: post.title,
      subtitle: post.subtitle || '',
      excerpt: post.excerpt,
      category: post.category,
      service_pillar: post.service,
      journey_stage: post.journeyStage || 'awareness',
      primary_keyword: post.primaryKeyword,
      secondary_keywords: post.secondaryKeywords || [],
      search_intent: post.searchIntent || 'informational',
      tags: post.tags,
      published_at: Timestamp.fromDate(new Date(post.isoDate)),
      read_time: post.readTime,
      word_count: post.wordCount,
      featured: post.featured || false,
      trending: post.trending || false,
      popular: post.popular || false,
      cover_media_id: mediaId,
      author_id: authorId,
      seo_title: post.seo?.title || post.title,
      seo_description: post.seo?.description || post.excerpt,
      seo_keywords: post.seo?.keywords || post.tags,
      key_takeaways: post.keyTakeaways || [],
      faq_schema: post.faq || [],
      cta_type: post.ctaType || 'awareness',
      internal_links: post.internalLinks || [],
      is_published: true,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    };

    await setDoc(doc(db, 'blog_posts', postId), postData);
    
    postCount++;
    console.log(`  ✓ ${post.title} (${postId})`);
  }

  console.log(`\n✅ Successfully uploaded ${postCount} blog posts!`);
  process.exit(0);
}

uploadBlogs().catch(console.error);
