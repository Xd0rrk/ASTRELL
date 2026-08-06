# ASTRELL — Firebase Database Implementation

**Project:** ASTRELL Creative Agency Portfolio  
**Backend:** Firebase (Firestore + Storage)  
**Firebase Project ID:** `astrell0`  
**Web App:** ASTRELL Web (`1:456513793491:web:2764698d0818b3bd1b5326`)  
**Status:** Temporary Development Implementation (~30%)  
**Date:** August 2026  

---

## 1. Overview

This document describes the temporary Firebase database implementation for the ASTRELL project. It translates the [database architecture recommendations](database%20architecture%20recommendations.md) (originally designed for Supabase/PostgreSQL) into Firebase Firestore + Firebase Storage equivalents.

### What This Is
- A **working development foundation** that allows frontend development to proceed immediately
- A **modular, well-typed implementation** that's easy to refactor as the project evolves
- An **~30% implementation** — expect ~60% of the schema to change before production

### What This Is Not
- Not a production-grade database
- Not a final architecture
- Not yet connected to a CMS admin panel

---

## 2. Architecture Translation

| Supabase Concept | Firebase Equivalent | Status |
|:---|:---|:---|
| PostgreSQL Tables | Firestore Collections | ✅ Implemented |
| 4 Storage Buckets | 4 Storage Folders (single bucket) | ✅ Implemented |
| Row Level Security (RLS) | Firestore Security Rules | ✅ Implemented |
| Storage Bucket Policies | Storage Security Rules | ✅ Implemented |
| SQL Triggers (showcase limit) | Application-level validation | ✅ Implemented |
| `GENERATED ALWAYS AS` columns | Computed at write-time | ✅ Implemented |
| Foreign Keys / `REFERENCES` | String document ID references | ✅ Implemented |
| `UNIQUE` constraints | Application-level checks | ⚠️ Partial |
| Database Indexes | `firestore.indexes.json` | ✅ Implemented |
| Supabase consent/agreement logging | Firebase `logConsent`/`logAgreement` | ✅ Implemented |

---

## 3. Firestore Collection Structure

```
astrell0 (Firestore Database)
│
├── media_assets/           Central media registry (all uploaded assets)
│   └── {assetId}
│
├── showcase_items/         Landing page 3D gallery (max 30 active)
│   └── {itemId}
│
├── gallery_items/          Portfolio gallery (infinite scroll/masonry)
│   └── {itemId}
│
├── blog_authors/           Author profiles
│   └── {authorId}
│
├── blog_posts/             Blog articles
│   └── {postId}
│       └── sections/       Blog sections (subcollection)
│           └── {sectionId}
│
├── consent_logs/           Cookie consent audit trail
│   └── {logId}
│
└── agreement_logs/         Terms/Privacy agreement logs
    └── {logId}
```

---

## 4. Document Schemas

### 4.1 `media_assets` — Central Media Registry

| Field | Type | Required | Description |
|:---|:---|:---|:---|
| `bucket_id` | string | ✅ | Storage folder prefix (`showcase-assets`, `portfolio-gallery`, `blog-content`, `system-assets`) |
| `file_path` | string | ✅ | Full path within Firebase Storage |
| `public_url` | string | ✅ | Public download URL |
| `alt_text` | string | ✅ | Accessibility alt text |
| `caption` | string | ❌ | Descriptive caption |
| `mime_type` | string | ✅ | MIME type |
| `file_size_bytes` | number | ✅ | File size in bytes |
| `width` | number | ✅ | Image width in pixels |
| `height` | number | ✅ | Image height in pixels |
| `aspect_ratio` | number | ✅ | Computed: width / height (rounded to 2 decimals) |
| `blur_data_url` | string | ❌ | Base64 blurhash / LQIP placeholder |
| `metadata` | map | ✅ | Flexible metadata (EXIF, color palette, etc.) |
| `created_by` | string | ❌ | UID of uploader |
| `created_at` | timestamp | ✅ | Creation timestamp |
| `updated_at` | timestamp | ✅ | Last update timestamp |

### 4.2 `showcase_items` — Landing Page 3D Gallery

| Field | Type | Required | Description |
|:---|:---|:---|:---|
| `media_id` | string | ✅ | Reference → `media_assets/{id}` |
| `title` | string | ✅ | Display title in carousel |
| `subtitle` | string | ❌ | Tagline |
| `tag` | string | ✅ | Category tag (default: `FEATURED`) |
| `display_order` | number | ✅ | Sort order (unique) |
| `is_active` | boolean | ✅ | Active on landing page |
| `created_at` | timestamp | ✅ | |
| `updated_at` | timestamp | ✅ | |

> **Limit:** Max 30 active items. Enforced in `firebase-collections.ts` via `getActiveShowcaseCount()`.

### 4.3 `gallery_items` — Portfolio Gallery

| Field | Type | Required | Description |
|:---|:---|:---|:---|
| `media_id` | string | ✅ | Reference → `media_assets/{id}` |
| `title` | string | ✅ | Project title |
| `slug` | string | ✅ | URL slug (unique) |
| `category` | string | ✅ | e.g., Brand Identity, Packaging, Social Media |
| `tags` | array | ✅ | Searchable tags |
| `variant` | string | ✅ | `default` \| `masonry` \| `polaroid` |
| `display_order` | number | ✅ | Sort order |
| `is_published` | boolean | ✅ | Publicly visible |
| `client_name` | string | ❌ | Client for case studies |
| `project_year` | number | ❌ | Project year |
| `created_at` | timestamp | ✅ | |
| `updated_at` | timestamp | ✅ | |

### 4.4 `blog_authors` — Author Profiles

| Field | Type | Required | Description |
|:---|:---|:---|:---|
| `name` | string | ✅ | Full name |
| `role` | string | ✅ | Job title |
| `avatar_media_id` | string | ❌ | Reference → `media_assets/{id}` |
| `bio` | string | ✅ | Biography |
| `twitter` | string | ❌ | Twitter handle |
| `linkedin` | string | ❌ | LinkedIn URL |
| `created_at` | timestamp | ✅ | |

### 4.5 `blog_posts` — Blog Articles

| Field | Type | Required | Description |
|:---|:---|:---|:---|
| `slug` | string | ✅ | URL slug (unique) |
| `title` | string | ✅ | Post title |
| `subtitle` | string | ❌ | Subtitle |
| `excerpt` | string | ✅ | Listing card excerpt |
| `category` | string | ✅ | Content category |
| `service_pillar` | string | ✅ | ASTRELL service pillar |
| `journey_stage` | string | ✅ | `awareness` \| `consideration` \| `decision` \| `retention` |
| `primary_keyword` | string | ✅ | Primary SEO keyword |
| `secondary_keywords` | array | ✅ | Secondary keywords |
| `search_intent` | string | ✅ | `informational` \| `commercial` \| `transactional` |
| `tags` | array | ✅ | Searchable tags |
| `published_at` | timestamp | ❌ | Publication date (null = draft) |
| `read_time` | string | ✅ | e.g., `5 min read` |
| `word_count` | number | ✅ | |
| `featured` | boolean | ✅ | Featured on homepage |
| `trending` | boolean | ✅ | Trending badge |
| `popular` | boolean | ✅ | Popular badge |
| `cover_media_id` | string | ❌ | Reference → `media_assets/{id}` |
| `author_id` | string | ❌ | Reference → `blog_authors/{id}` |
| `seo_title` | string | ✅ | SEO title tag |
| `seo_description` | string | ✅ | SEO meta description |
| `seo_keywords` | array | ✅ | SEO keywords |
| `key_takeaways` | array | ✅ | TL;DR bullets |
| `faq_schema` | array | ✅ | `[{question, answer}]` |
| `cta_type` | string | ✅ | CTA classification |
| `internal_links` | array | ✅ | `[{text, url}]` |
| `is_published` | boolean | ✅ | Publicly visible |
| `created_at` | timestamp | ✅ | |
| `updated_at` | timestamp | ✅ | |

### 4.6 `blog_posts/{postId}/sections` — Blog Sections (Subcollection)

| Field | Type | Required | Description |
|:---|:---|:---|:---|
| `section_order` | number | ✅ | Sort order |
| `heading` | string | ✅ | H2 heading |
| `subheading` | string | ❌ | H3 subheading |
| `paragraphs` | array | ✅ | Text blocks |
| `pull_quote` | map | ❌ | Pull quote block |
| `callout` | map | ❌ | Callout/highlight |
| `code_snippet` | map | ❌ | Code block |
| `comparison_table` | map | ❌ | Comparison data |
| `timeline` | map | ❌ | Timeline data |
| `bento_grid` | map | ❌ | Bento layout |
| `image_media_id` | string | ❌ | Reference → `media_assets/{id}` |
| `image_caption` | string | ❌ | Image caption |
| `created_at` | timestamp | ✅ | |

### 4.7 `consent_logs` — Cookie Consent Audit

| Field | Type | Required | Description |
|:---|:---|:---|:---|
| `categories` | map | ✅ | `{necessary, analytics, functional}` |
| `timestamp` | timestamp | ✅ | When consent was given |
| `policy_version` | string | ✅ | Policy version |
| `created_at` | timestamp | ✅ | |

### 4.8 `agreement_logs` — Terms/Privacy Agreement

| Field | Type | Required | Description |
|:---|:---|:---|:---|
| `email` | string | ✅ | Person's email |
| `document_versions` | map | ✅ | `{terms, privacy}` |
| `agreed_at` | timestamp | ✅ | Agreement timestamp |
| `created_at` | timestamp | ✅ | |

---

## 5. Firebase Storage Organization

Single default bucket with organized folder prefixes:

```
astrell0.firebasestorage.app/
├── showcase-assets/         Landing Page 3D Gallery items
│   └── {year}/{month}/{uuid}-{filename}.{ext}
├── portfolio-gallery/       General Gallery & Case Studies
│   └── {year}/{month}/{uuid}-{filename}.{ext}
├── blog-content/            Blog Covers & Inline Article Media
│   └── {year}/{month}/{uuid}-{filename}.{ext}
└── system-assets/           Author Avatars, Logos, Icons
    └── {year}/{month}/{uuid}-{filename}.{ext}
```

### Folder Constraints

| Folder | Max Size | Allowed Types | Purpose |
|:---|:---|:---|:---|
| `showcase-assets/` | 5 MB | webp, avif, png, jpeg | 3D Landing Showcase |
| `portfolio-gallery/` | 8 MB | webp, avif, png, jpeg, mp4 | Portfolio Work |
| `blog-content/` | 3 MB | webp, avif, png, jpeg, svg+xml | Blog Media |
| `system-assets/` | 1 MB | webp, png, svg+xml | System Assets |

---

## 6. Security Rules Summary

### Firestore Rules (`firestore.rules`)
- **Public read:** `media_assets`, `blog_authors`, `blog_sections` — always readable
- **Conditional read:** `showcase_items` (where `is_active == true`), `gallery_items` (where `is_published == true`), `blog_posts` (where `is_published == true`)
- **Authenticated write:** All content collections — only signed-in users
- **Anonymous create:** `consent_logs`, `agreement_logs` — anyone can insert compliance records

### Storage Rules (`storage.rules`)
- **Public read:** All folders — anyone can view/download assets
- **Authenticated write:** All folders — only signed-in users can upload
- **Per-folder constraints:** File size and MIME type restrictions enforced at the rule level

---

## 7. Composite Indexes (`firestore.indexes.json`)

| Collection | Fields | Query Purpose |
|:---|:---|:---|
| `showcase_items` | `is_active` ↑ , `display_order` ↑ | Ordered active showcase |
| `gallery_items` | `is_published` ↑ , `display_order` ↑ | Gallery feed |
| `gallery_items` | `is_published` ↑ , `category` ↑ , `display_order` ↑ | Category filter |
| `blog_posts` | `is_published` ↑ , `published_at` ↓ | Blog listing |
| `blog_posts` | `is_published` ↑ , `category` ↑ , `published_at` ↓ | Category blog |
| `blog_posts` | `is_published` ↑ , `journey_stage` ↑ , `published_at` ↓ | Journey filter |
| `blog_posts` | `is_published` ↑ , `featured` ↑ , `published_at` ↓ | Featured posts |
| `blog_posts` | `is_published` ↑ , `trending` ↑ , `published_at` ↓ | Trending posts |
| `blog_posts` | `is_published` ↑ , `popular` ↑ , `published_at` ↓ | Popular posts |

---

## 8. File Structure

```
project/
├── .firebaserc                         Firebase project alias
├── firebase.json                       Firebase services config
├── firestore.rules                     Firestore security rules
├── firestore.indexes.json              Composite indexes
├── storage.rules                       Storage security rules
├── lib/
│   ├── firebase.ts                     Firebase client initialization
│   ├── firebase-types.ts              TypeScript type definitions
│   ├── firebase-collections.ts         Data access functions
│   ├── firebase-storage.ts             Storage helpers & validators
│   └── supabase.ts                     (Legacy — to be deprecated)
├── scripts/
│   └── seed-firestore.ts              Development seed data
└── .env.example                        Environment variable template
```

---

## 9. Quick Start

### Configure Environment
```bash
# Copy .env.example and fill in Firebase config values
cp .env.example .env.local
```

The Firebase SDK config for the `ASTRELL Web` app:
```
API Key:            AIzaSyAx06c8NMDTT6P4MdjCChjoO7qFaqhxHOw
Auth Domain:        astrell0.firebaseapp.com
Project ID:         astrell0
Storage Bucket:     astrell0.firebasestorage.app
Messaging Sender:   456513793491
App ID:             1:456513793491:web:2764698d0818b3bd1b5326
```

### Deploy Rules & Indexes
```bash
npx firebase-tools deploy --only firestore:rules,firestore:indexes --project astrell0
```

### Seed Development Data
```bash
npx ts-node scripts/seed-firestore.ts
```

---

## 10. Temporary Limitations & Production Upgrade Path

| Limitation | Current State | Production Plan |
|:---|:---|:---|
| **Single Storage Bucket** | Using folder prefixes in one bucket | Upgrade to Blaze plan → create 4 dedicated buckets |
| **No Referential Integrity** | Document ID strings, no FK enforcement | Consider Cloud Functions for cascading deletes |
| **No Uniqueness Constraints** | Checked in app logic only | Cloud Functions for server-side uniqueness validation |
| **Showcase Item Limit** | App-level check only | Cloud Function trigger (like the SQL trigger) |
| **No Server-Side Computed Fields** | `aspect_ratio` computed at write-time | Cloud Function `onWrite` trigger |
| **No Image Optimization Pipeline** | Manual upload only | Cloud Function for auto WebP/AVIF conversion |
| **No Admin Auth** | Firestore rules check `request.auth != null` | Implement Firebase Auth with admin role claims |
| **No CMS Interface** | Seed data only | Build admin dashboard with CRUD operations |
| **No Pagination** | Simple `limit()` queries | Cursor-based pagination with `startAfter()` |
| **No Full-Text Search** | Category/tag filtering only | Algolia or Firebase Extensions for search |
