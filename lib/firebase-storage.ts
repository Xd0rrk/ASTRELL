/**
 * ASTRELL — Firebase Storage Helpers
 *
 * Constants and utilities for Firebase Storage file management.
 * Implements the recommended multi-bucket architecture using
 * dedicated Firebase Storage buckets for each asset category.
 *
 * Storage bucket structure:
 *   astrell0-showcase-assets/{year}/{month}/{uuid}-{filename}.{ext}
 *   astrell0-portfolio-gallery/{year}/{month}/{uuid}-{filename}.{ext}
 *   astrell0-blog-content/{year}/{month}/{uuid}-{filename}.{ext}
 *   astrell0-system-assets/{year}/{month}/{uuid}-{filename}.{ext}
 */

// ===========================================================================
// STORAGE BUCKETS
// ===========================================================================

/**
 * Storage bucket constants matching the multi-bucket structure.
 * These fall back to default names if the env variables aren't set.
 */
export const STORAGE_BUCKETS = {
  /** Landing Page 3D Showcase — curated, performance-critical assets */
  SHOWCASE_ASSETS: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_SHOWCASE || 'astrell0-showcase-assets.firebasestorage.app',
  /** General Gallery & Project Case Studies — large creative work collection */
  PORTFOLIO_GALLERY: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_GALLERY || 'astrell0-portfolio-gallery.firebasestorage.app',
  /** Blog Covers, Inline Sections & Bento Grids — editorial content */
  BLOG_CONTENT: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_BLOG || 'astrell0-blog-content.firebasestorage.app',
  /** Author Avatars, Client Logos, System Icons — reusable brand assets */
  SYSTEM_ASSETS: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_SYSTEM || 'astrell0-system-assets.firebasestorage.app',
} as const;

export type StorageBucket = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];

// ===========================================================================
// FILE SIZE LIMITS (per bucket, in bytes)
// ===========================================================================

/**
 * File size limits enforced at both the Storage security rules level
 * AND in application logic (dual-layer defense).
 */
export const FILE_SIZE_LIMITS: Record<StorageBucket, number> = {
  [STORAGE_BUCKETS.SHOWCASE_ASSETS]: 5 * 1024 * 1024,     // 5 MB
  [STORAGE_BUCKETS.PORTFOLIO_GALLERY]: 8 * 1024 * 1024,   // 8 MB
  [STORAGE_BUCKETS.BLOG_CONTENT]: 3 * 1024 * 1024,        // 3 MB
  [STORAGE_BUCKETS.SYSTEM_ASSETS]: 1 * 1024 * 1024,       // 1 MB
};

// ===========================================================================
// ALLOWED MIME TYPES (per bucket)
// ===========================================================================

/**
 * Allowed MIME types per storage bucket.
 * Matches the security rules constraints.
 */
export const ALLOWED_MIME_TYPES: Record<StorageBucket, string[]> = {
  [STORAGE_BUCKETS.SHOWCASE_ASSETS]: [
    'image/webp', 'image/avif', 'image/png', 'image/jpeg',
  ],
  [STORAGE_BUCKETS.PORTFOLIO_GALLERY]: [
    'image/webp', 'image/avif', 'image/png', 'image/jpeg', 'video/mp4',
  ],
  [STORAGE_BUCKETS.BLOG_CONTENT]: [
    'image/webp', 'image/avif', 'image/png', 'image/jpeg', 'image/svg+xml',
  ],
  [STORAGE_BUCKETS.SYSTEM_ASSETS]: [
    'image/webp', 'image/png', 'image/svg+xml',
  ],
};

// ===========================================================================
// PATH BUILDER UTILITY
// ===========================================================================

/**
 * Generates a unique, organized file path within a bucket.
 *
 * Format: `{year}/{month}/{uuid}-{sanitizedFilename}.{ext}`
 *
 * Example: `2026/08/9b1deb4d-cyberpunk-poster.webp`
 *
 * @param filename - The original filename including extension
 * @returns A structured path string for Firebase Storage
 */
export function buildStoragePath(filename: string): string {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');

  // Generate a short UUID-style prefix for collision avoidance
  const uuid = crypto.randomUUID().split('-')[0];

  // Sanitize filename: lowercase, replace spaces with hyphens, remove special chars
  const sanitized = filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.\-_]/g, '');

  return `${year}/${month}/${uuid}-${sanitized}`;
}

// ===========================================================================
// VALIDATION HELPERS
// ===========================================================================

/**
 * Validates a file against the storage bucket's constraints.
 * Should be called before attempting an upload (application-layer validation).
 *
 * @param bucket - The target storage bucket
 * @param file - The File object to validate
 * @returns An object with `valid` boolean and optional `error` message
 */
export function validateFileForUpload(
  bucket: StorageBucket,
  file: File
): { valid: boolean; error?: string } {
  // Check file size
  const maxSize = FILE_SIZE_LIMITS[bucket];
  if (file.size > maxSize) {
    const maxMB = (maxSize / (1024 * 1024)).toFixed(0);
    const fileMB = (file.size / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `File size ${fileMB}MB exceeds the ${maxMB}MB limit for ${bucket}.`,
    };
  }

  // Check MIME type
  const allowedTypes = ALLOWED_MIME_TYPES[bucket];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type "${file.type}" is not allowed in ${bucket}. Allowed: ${allowedTypes.join(', ')}.`,
    };
  }

  return { valid: true };
}

/**
 * Returns a human-readable description of the constraints for a storage bucket.
 *
 * @param bucket - The storage bucket
 * @returns Formatted string describing size and type limits
 */
export function getConstraintDescription(bucket: StorageBucket): string {
  const maxMB = (FILE_SIZE_LIMITS[bucket] / (1024 * 1024)).toFixed(0);
  const types = ALLOWED_MIME_TYPES[bucket]
    .map((t) => t.split('/')[1].toUpperCase())
    .join(', ');
  return `Max ${maxMB}MB — Allowed types: ${types}`;
}
