/**
 * ASTRELL — Firebase Firestore Document Type Definitions
 *
 * TypeScript interfaces mirroring the recommended Supabase/PostgreSQL schema,
 * adapted for Firestore's NoSQL document model.
 *
 * Key differences from the SQL schema:
 * - `aspect_ratio` is computed at write-time (no GENERATED ALWAYS in Firestore)
 * - Foreign keys are stored as string document IDs (no referential integrity)
 * - `blog_sections` is a subcollection under `blog_posts` (not a separate table)
 * - Timestamps use Firestore's Timestamp type
 */

import { type Timestamp } from 'firebase/firestore';

// ===========================================================================
// COLLECTION NAMES (constants to avoid magic strings)
// ===========================================================================

export const COLLECTIONS = {
  MEDIA_ASSETS: 'media_assets',
  SHOWCASE_ITEMS: 'showcase_items',
  GALLERY_ITEMS: 'gallery_items',
  BLOG_AUTHORS: 'blog_authors',
  BLOG_POSTS: 'blog_posts',
  /** Subcollection under blog_posts/{postId}/sections */
  BLOG_SECTIONS: 'sections',
  CONSENT_LOGS: 'consent_logs',
  AGREEMENT_LOGS: 'agreement_logs',
} as const;

// ===========================================================================
// 1. CENTRAL MEDIA ASSETS REGISTRY
// ===========================================================================

/**
 * Central media asset document.
 * Mirrors the `media_assets` SQL table.
 *
 * Collection: `media_assets`
 * Storage bucket_id values map to Storage folder prefixes:
 *   - 'showcase-assets'    → /showcase-assets/...
 *   - 'portfolio-gallery'  → /portfolio-gallery/...
 *   - 'blog-content'       → /blog-content/...
 *   - 'system-assets'      → /system-assets/...
 */
export interface MediaAsset {
  /** Auto-generated Firestore document ID */
  id: string;
  /** Storage folder prefix (e.g., 'showcase-assets', 'portfolio-gallery') */
  bucket_id: string;
  /** Full path within Firebase Storage */
  file_path: string;
  /** Public download URL from Firebase Storage */
  public_url: string;
  /** Alt text for accessibility and SEO (required) */
  alt_text: string;
  /** Optional descriptive caption */
  caption?: string;
  /** MIME type (e.g., 'image/webp', 'image/png') */
  mime_type: string;
  /** File size in bytes */
  file_size_bytes: number;
  /** Image width in pixels */
  width: number;
  /** Image height in pixels */
  height: number;
  /**
   * Aspect ratio (width / height), rounded to 2 decimal places.
   * Computed at write-time in application logic.
   * In SQL schema this was GENERATED ALWAYS AS.
   */
  aspect_ratio: number;
  /** Base64 Blurhash / LQIP placeholder for progressive loading */
  blur_data_url?: string;
  /** Flexible metadata (EXIF, color palette, etc.) */
  metadata: Record<string, unknown>;
  /** UID of the user who uploaded this asset */
  created_by?: string;
  /** Timestamp of creation */
  created_at: Timestamp;
  /** Timestamp of last update */
  updated_at: Timestamp;
}

// ===========================================================================
// 2. LANDING PAGE SHOWCASE TABLE (3D Carousel — Max 30 limit)
// ===========================================================================

/**
 * Landing page 3D showcase item.
 * Mirrors the `showcase_items` SQL table.
 *
 * Collection: `showcase_items`
 * Limit: Max 30 active items (enforced in application logic).
 */
export interface ShowcaseItem {
  id: string;
  /** Reference to a media_assets document ID */
  media_id: string;
  /** Display title shown in the 3D carousel */
  title: string;
  /** Optional subtitle / tagline */
  subtitle?: string;
  /** Category tag (default: 'FEATURED') */
  tag: string;
  /** Sort order for the carousel (unique, sequential) */
  display_order: number;
  /** Whether this item is visible on the landing page */
  is_active: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
}

// ===========================================================================
// 3. GENERAL PORTFOLIO GALLERY TABLE
// ===========================================================================

/**
 * Portfolio gallery item (infinite scroll / masonry view).
 * Mirrors the `gallery_items` SQL table.
 *
 * Collection: `gallery_items`
 */
export interface GalleryItem {
  id: string;
  /** Reference to a media_assets document ID */
  media_id: string;
  /** Project title */
  title: string;
  /** URL-safe slug (unique) */
  slug: string;
  /** Category (e.g., 'Brand Identity', 'Packaging', 'Social Media', 'Posters') */
  category: string;
  /** Searchable tags */
  tags: string[];
  /** Layout variant for display */
  variant: 'default' | 'masonry' | 'polaroid';
  /** Sort order within the gallery */
  display_order: number;
  /** Whether this item is publicly visible */
  is_published: boolean;
  /** Optional client name for case studies */
  client_name?: string;
  /** Optional project year */
  project_year?: number;
  created_at: Timestamp;
  updated_at: Timestamp;
}

// ===========================================================================
// 4. AUTHORS TABLE
// ===========================================================================

/**
 * Blog author profile.
 * Mirrors the `blog_authors` SQL table.
 *
 * Collection: `blog_authors`
 */
export interface BlogAuthor {
  id: string;
  /** Author's full name */
  name: string;
  /** Job title / role */
  role: string;
  /** Reference to a media_assets document ID for the avatar */
  avatar_media_id?: string;
  /** Author biography */
  bio: string;
  /** Twitter handle (without @) */
  twitter?: string;
  /** LinkedIn profile URL */
  linkedin?: string;
  created_at: Timestamp;
}

// ===========================================================================
// 5. BLOG POSTS TABLE
// ===========================================================================

/** Valid marketing funnel stages */
export type JourneyStage = 'awareness' | 'consideration' | 'decision' | 'retention';

/** Valid search intent classifications */
export type SearchIntent = 'informational' | 'commercial' | 'transactional';

/**
 * Blog post document.
 * Mirrors the `blog_posts` SQL table.
 *
 * Collection: `blog_posts`
 * Subcollection: `blog_posts/{postId}/sections` → BlogSection[]
 */
export interface BlogPost {
  id: string;
  /** URL-safe slug (unique) */
  slug: string;
  /** Post title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Short excerpt for listing cards */
  excerpt: string;
  /** Content category */
  category: string;
  /** Mapped ASTRELL service pillar */
  service_pillar: string;
  /** Marketing funnel stage */
  journey_stage: JourneyStage;
  /** Primary SEO keyword */
  primary_keyword: string;
  /** Secondary SEO keywords */
  secondary_keywords: string[];
  /** Search intent classification */
  search_intent: SearchIntent;
  /** Searchable tags */
  tags: string[];
  /** When the post was published (null if draft) */
  published_at?: Timestamp;
  /** Estimated read time (e.g., '5 min read') */
  read_time: string;
  /** Word count */
  word_count: number;
  /** Featured on homepage */
  featured: boolean;
  /** Marked as trending */
  trending: boolean;
  /** Marked as popular */
  popular: boolean;
  /** Reference to a media_assets document ID for the cover image */
  cover_media_id?: string;
  /** Reference to a blog_authors document ID */
  author_id?: string;
  /** SEO <title> tag */
  seo_title: string;
  /** SEO <meta name="description"> */
  seo_description: string;
  /** SEO keyword tags */
  seo_keywords: string[];
  /** Key takeaways / TL;DR bullet points */
  key_takeaways: string[];
  /** FAQ Schema.org structured data entries */
  faq_schema: Array<{ question: string; answer: string }>;
  /** CTA type for the post (e.g., 'awareness', 'consultation') */
  cta_type: string;
  /** Internal cross-link references */
  internal_links: Array<{ text: string; url: string }>;
  /** Whether the post is publicly visible */
  is_published: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
}

// ===========================================================================
// 6. BLOG SECTIONS (Subcollection under blog_posts)
// ===========================================================================

/**
 * Blog post section (content block with optional rich media).
 * Mirrors the `blog_sections` SQL table.
 *
 * Subcollection: `blog_posts/{postId}/sections`
 */
export interface BlogSection {
  id: string;
  /** Sort order within the post */
  section_order: number;
  /** Section heading (H2) */
  heading: string;
  /** Optional subheading (H3) */
  subheading?: string;
  /** Paragraph text blocks */
  paragraphs: string[];
  /** Optional pull quote block */
  pull_quote?: Record<string, unknown>;
  /** Optional callout/highlight block */
  callout?: Record<string, unknown>;
  /** Optional code snippet block */
  code_snippet?: Record<string, unknown>;
  /** Optional comparison table data */
  comparison_table?: Record<string, unknown>;
  /** Optional timeline data */
  timeline?: Record<string, unknown>;
  /** Optional bento grid layout data */
  bento_grid?: Record<string, unknown>;
  /** Reference to a media_assets document ID for inline image */
  image_media_id?: string;
  /** Caption for the inline image */
  image_caption?: string;
  created_at: Timestamp;
}

// ===========================================================================
// 7. COMPLIANCE AUDIT LOGS
// ===========================================================================

/**
 * Cookie consent log entry.
 * Mirrors the `consent_logs` SQL table.
 *
 * Collection: `consent_logs`
 */
export interface ConsentLog {
  id: string;
  /** Consent categories and their status */
  categories: {
    necessary: boolean;
    analytics: boolean;
    functional: boolean;
  };
  /** When consent was given/updated */
  timestamp: Timestamp;
  /** Version of the cookie policy at time of consent */
  policy_version: string;
  created_at: Timestamp;
}

/**
 * Terms/Privacy agreement log entry.
 * Mirrors the `agreement_logs` SQL table.
 *
 * Collection: `agreement_logs`
 */
export interface AgreementLog {
  id: string;
  /** Email of the person who agreed */
  email: string;
  /** Versions of the documents agreed to */
  document_versions: {
    terms: string;
    privacy: string;
  };
  /** When the agreement was made */
  agreed_at: Timestamp;
  created_at: Timestamp;
}
