# Article 13 Deliverable: Web Performance Optimization: Achieving Sub-Second Load Times

## 1. Research Brief
- **Search Intent:** Informational & Technical. Engineering managers, SEO specialists, and web developers trying to improve their Google Core Web Vitals to pass Lighthouse audits and boost organic ranking.
- **SERP Analysis:** Heavily focused on the definitions of LCP, CLS, and INP. Gap: Connecting these metrics specifically to Next.js enterprise configurations (like `next/image`, `next/font`, dynamic imports) rather than generic web advice.
- **Keyword Set:** 
  - *Primary:* web performance optimization strategy
  - *Secondary:* core web vitals optimization guide, how to improve LCP CLS INP, nextjs page speed optimization
- **Sources Gathered:** 
  1. Next.js 15 documentation on performance (`next/image`, React Server Components).
  2. Google Core Web Vitals definitions and thresholds.
- **Gap Opportunity:** Treat performance as a feature, not an afterthought. Show how to engineer performance from the ground up using modern frameworks rather than trying to patch a slow site post-launch.
- **Conversion Angle:** Pillar A (Service & Expertise). Target service is Website Development. Tone is analytical, technical, and data-driven.

## 2. Old → New Record
- N/A (Keep decision)

## 3. Final Article Copy
*See `lib/batch-03-posts.ts` for the production code injection.*

- **SEO Title:** Web Performance Optimization: Core Web Vitals Guide
- **Meta Description:** Master Core Web Vitals optimization. Learn how to achieve sub-second load times and 99+ Lighthouse scores by optimizing LCP, CLS, and INP in Next.js.
- **Slug:** `web-performance-optimization-achieving-sub-second-load-times`
- **Pillar:** Pillar A (Service & Expertise)

### Content Structure & Headings
**1. The Business Case for Sub-Second Loads**
- Why performance is a revenue lever (bounce rate correlation to latency).
- Google's shift to Field Data (real user metrics).

**2. Optimizing Largest Contentful Paint (LCP)**
- Target: < 2.5s. 
- Solutions: Priority loading for above-the-fold images, WebP/AVIF formats via `next/image`, and CDN edge caching.

**3. Mastering Interaction to Next Paint (INP)**
- Target: < 200ms.
- Solutions: Reducing JavaScript main-thread blocking, deferring third-party scripts, and using React Server Components.

**4. Eliminating Cumulative Layout Shift (CLS)**
- Target: < 0.1.
- Solutions: Hardcoding image dimensions, asynchronous font loading (`next/font`), and reserving UI space for dynamic ads.

**5. Continuous Monitoring in Production**
- The difference between Lab Data (Lighthouse) and Field Data (CrUX).
- Setting up Vercel Speed Insights for real-time telemetry.

## 4. Internal Linking Notes
- Link to: `/services/website-development` (Anchor: "ASTRELL web performance engineering")
- Link to: `/blog/modern-web-engineering-building-enterprise-custom-web-platforms` (Anchor: "enterprise web architecture")

## 5. Schema Markup Recommendation (JSON-LD)
- Standard BlogPosting schema.

## 6. Image Briefs
- **Hero Image:** `astrell_web_performance_optimization_hero.png`
  - *Brief:* Dynamic 3D render of a glowing digital speedometer or data pipeline showing light-speed data transfer, neon cyan and orange streaks on a dark background, representing sub-second load times and web performance optimization.
