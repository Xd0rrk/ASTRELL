/**
 * ASTRELL — Firestore Collection Helpers & Data Access Functions
 *
 * Provides typed data access functions for all Firestore collections.
 * Replaces the original Supabase client for content queries AND
 * compliance logging (consent_logs, agreement_logs).
 *
 * All functions gracefully no-op when Firebase is not configured,
 * logging an informational message to the console.
 *
 * Usage:
 *   import { getActiveShowcaseItems, logConsent } from '@/lib/firebase-collections';
 *
 *   // Fetch showcase items for landing page
 *   const items = await getActiveShowcaseItems();
 *
 *   // Log cookie consent (replaces Supabase logConsent)
 *   await logConsent({ necessary: true, analytics: false, functional: true }, '2.0');
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  type DocumentData,
  type QueryConstraint,
} from 'firebase/firestore';
import { getFirestoreDb } from './firebase';
import {
  COLLECTIONS,
  type MediaAsset,
  type ShowcaseItem,
  type GalleryItem,
  type BlogAuthor,
  type BlogPost,
  type BlogSection,
} from './firebase-types';

// ===========================================================================
// INTERNAL HELPERS
// ===========================================================================

/**
 * Returns the Firestore instance or logs a warning and returns null.
 */
function db() {
  const firestore = getFirestoreDb();
  if (!firestore) {
    console.info(
      '[Firebase] Not configured — skipping Firestore operation. Set NEXT_PUBLIC_FIREBASE_* env vars.'
    );
  }
  return firestore;
}

/**
 * Maps a Firestore document snapshot to a typed object with the `id` field set.
 */
function mapDoc<T extends { id: string }>(
  docSnap: DocumentData
): T {
  return { id: docSnap.id, ...docSnap.data() } as T;
}

// ===========================================================================
// 1. MEDIA ASSETS
// ===========================================================================

/**
 * Fetch a single media asset by document ID.
 */
export async function getMediaAsset(assetId: string): Promise<MediaAsset | null> {
  const firestore = db();
  if (!firestore) return null;

  const docRef = doc(firestore, COLLECTIONS.MEDIA_ASSETS, assetId);
  const snap = await getDoc(docRef);
  return snap.exists() ? mapDoc<MediaAsset>(snap) : null;
}

/**
 * Fetch multiple media assets by an array of document IDs.
 * Useful for resolving media_id references from other collections.
 */
export async function getMediaAssets(assetIds: string[]): Promise<MediaAsset[]> {
  const firestore = db();
  if (!firestore || assetIds.length === 0) return [];

  const results: MediaAsset[] = [];
  // Firestore 'in' queries support max 30 items per batch
  const batches = [];
  for (let i = 0; i < assetIds.length; i += 30) {
    batches.push(assetIds.slice(i, i + 30));
  }

  for (const batch of batches) {
    const q = query(
      collection(firestore, COLLECTIONS.MEDIA_ASSETS),
      where('__name__', 'in', batch)
    );
    const snap = await getDocs(q);
    snap.docs.forEach((d) => results.push(mapDoc<MediaAsset>(d)));
  }

  return results;
}

// ===========================================================================
// 2. SHOWCASE ITEMS (Landing Page 3D Gallery)
// ===========================================================================

/** Max active showcase items — enforced in application logic */
export const MAX_SHOWCASE_ITEMS = 30;

/**
 * Fetch all active showcase items, ordered by display_order.
 * This is the primary query for rendering the landing page 3D gallery.
 */
export async function getActiveShowcaseItems(): Promise<ShowcaseItem[]> {
  const firestore = db();
  if (!firestore) return [];

  const q = query(
    collection(firestore, COLLECTIONS.SHOWCASE_ITEMS),
    where('is_active', '==', true),
    orderBy('display_order', 'asc')
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => mapDoc<ShowcaseItem>(d));
}

/**
 * Check if the showcase item limit has been reached.
 * Application-level validation (mirrors the SQL trigger from the recommendations).
 */
export async function getActiveShowcaseCount(): Promise<number> {
  const firestore = db();
  if (!firestore) return 0;

  const q = query(
    collection(firestore, COLLECTIONS.SHOWCASE_ITEMS),
    where('is_active', '==', true)
  );

  const snap = await getDocs(q);
  return snap.size;
}

// ===========================================================================
// 3. GALLERY ITEMS (Portfolio)
// ===========================================================================

export interface GalleryFilters {
  category?: string;
  maxItems?: number;
}

/**
 * Fetch published gallery items with optional category filter.
 * Supports the infinite scroll / masonry gallery view.
 */
export async function getPublishedGalleryItems(
  filters?: GalleryFilters
): Promise<GalleryItem[]> {
  const firestore = db();
  if (!firestore) return [];

  const constraints: QueryConstraint[] = [
    where('is_published', '==', true),
  ];

  if (filters?.category) {
    constraints.push(where('category', '==', filters.category));
  }

  constraints.push(orderBy('display_order', 'asc'));

  if (filters?.maxItems) {
    constraints.push(limit(filters.maxItems));
  }

  const q = query(collection(firestore, COLLECTIONS.GALLERY_ITEMS), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => mapDoc<GalleryItem>(d));
}

/**
 * Fetch a single gallery item by slug.
 */
export async function getGalleryItemBySlug(slug: string): Promise<GalleryItem | null> {
  const firestore = db();
  if (!firestore) return null;

  const q = query(
    collection(firestore, COLLECTIONS.GALLERY_ITEMS),
    where('slug', '==', slug),
    where('is_published', '==', true),
    limit(1)
  );

  const snap = await getDocs(q);
  return snap.empty ? null : mapDoc<GalleryItem>(snap.docs[0]);
}

// ===========================================================================
// 4. BLOG AUTHORS
// ===========================================================================

/**
 * Fetch all blog authors.
 */
export async function getBlogAuthors(): Promise<BlogAuthor[]> {
  const firestore = db();
  if (!firestore) return [];

  const snap = await getDocs(collection(firestore, COLLECTIONS.BLOG_AUTHORS));
  return snap.docs.map((d) => mapDoc<BlogAuthor>(d));
}

/**
 * Fetch a single blog author by document ID.
 */
export async function getBlogAuthor(authorId: string): Promise<BlogAuthor | null> {
  const firestore = db();
  if (!firestore) return null;

  const docRef = doc(firestore, COLLECTIONS.BLOG_AUTHORS, authorId);
  const snap = await getDoc(docRef);
  return snap.exists() ? mapDoc<BlogAuthor>(snap) : null;
}

// ===========================================================================
// 5. BLOG POSTS
// ===========================================================================

export interface BlogPostFilters {
  category?: string;
  service?: string;
  tag?: string;
  journeyStage?: 'awareness' | 'consideration' | 'decision' | 'retention';
  featured?: boolean;
  trending?: boolean;
  popular?: boolean;
  maxItems?: number;
  startAfterDoc?: unknown;
}

/**
 * Fetch published blog posts with optional filters.
 * Ordered by published_at descending (newest first).
 */
export async function getPublishedBlogPosts(
  filters?: BlogPostFilters
): Promise<BlogPost[]> {
  const firestore = db();
  if (!firestore) return [];

  const constraints: QueryConstraint[] = [
    where('is_published', '==', true),
  ];

  if (filters?.category) {
    constraints.push(where('category', '==', filters.category));
  }
  if (filters?.service) {
    constraints.push(where('service_pillar', '==', filters.service));
  }
  if (filters?.tag) {
    constraints.push(where('tags', 'array-contains', filters.tag));
  }
  if (filters?.journeyStage) {
    constraints.push(where('journey_stage', '==', filters.journeyStage));
  }
  if (filters?.featured !== undefined) {
    constraints.push(where('featured', '==', filters.featured));
  }
  if (filters?.trending !== undefined) {
    constraints.push(where('trending', '==', filters.trending));
  }
  if (filters?.popular !== undefined) {
    constraints.push(where('popular', '==', filters.popular));
  }

  constraints.push(orderBy('published_at', 'desc'));

  if (filters?.startAfterDoc) {
    // High-performance Firestore cursor-based pagination
    constraints.push(startAfter(filters.startAfterDoc));
  }

  if (filters?.maxItems) {
    constraints.push(limit(filters.maxItems));
  }

  const q = query(collection(firestore, COLLECTIONS.BLOG_POSTS), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => mapDoc<BlogPost>(d));
}

/**
 * Fetch a single blog post by slug (for individual blog page rendering).
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const firestore = db();
  if (!firestore) return null;

  const q = query(
    collection(firestore, COLLECTIONS.BLOG_POSTS),
    where('slug', '==', slug),
    where('is_published', '==', true),
    limit(1)
  );

  const snap = await getDocs(q);
  return snap.empty ? null : mapDoc<BlogPost>(snap.docs[0]);
}

// ===========================================================================
// 6. BLOG SECTIONS (Subcollection)
// ===========================================================================

/**
 * Fetch all sections for a blog post, ordered by section_order.
 */
export async function getBlogSections(postId: string): Promise<BlogSection[]> {
  const firestore = db();
  if (!firestore) return [];

  const q = query(
    collection(firestore, COLLECTIONS.BLOG_POSTS, postId, COLLECTIONS.BLOG_SECTIONS),
    orderBy('section_order', 'asc')
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => mapDoc<BlogSection>(d));
}

/**
 * Fetch a complete blog post with all its sections in a single call.
 * Convenience function for rendering a full blog article.
 */
export async function getBlogPostWithSections(
  slug: string
): Promise<{ post: BlogPost; sections: BlogSection[] } | null> {
  const post = await getBlogPostBySlug(slug);
  if (!post) return null;

  const sections = await getBlogSections(post.id);
  return { post, sections };
}

// ===========================================================================
// 7. COMPLIANCE LOGGING (replaces Supabase consent/agreement logging)
// ===========================================================================

/**
 * Log a cookie consent decision for ICO audit trail.
 * Replaces the Supabase `logConsent()` function.
 *
 * @param categories - Consent categories and their status
 * @param policyVersion - Version of the cookie policy at time of consent
 */
export async function logConsent(
  categories: { necessary: boolean; analytics: boolean; functional: boolean },
  policyVersion: string
): Promise<void> {
  const firestore = db();
  if (!firestore) return;

  try {
    await addDoc(collection(firestore, COLLECTIONS.CONSENT_LOGS), {
      categories,
      timestamp: Timestamp.now(),
      policy_version: policyVersion,
      created_at: Timestamp.now(),
    });
  } catch (err) {
    console.warn('[Firebase] Failed to log consent:', err);
  }
}

/**
 * Log a Terms/Privacy agreement acceptance at point of contracting.
 * Replaces the Supabase `logAgreement()` function.
 *
 * @param email - Email of the person who agreed
 * @param documentVersions - Versions of terms and privacy documents
 */
export async function logAgreement(
  email: string,
  documentVersions: { terms: string; privacy: string }
): Promise<void> {
  const firestore = db();
  if (!firestore) return;

  try {
    await addDoc(collection(firestore, COLLECTIONS.AGREEMENT_LOGS), {
      email,
      document_versions: documentVersions,
      agreed_at: Timestamp.now(),
      created_at: Timestamp.now(),
    });
  } catch (err) {
    console.warn('[Firebase] Failed to log agreement:', err);
  }
}
