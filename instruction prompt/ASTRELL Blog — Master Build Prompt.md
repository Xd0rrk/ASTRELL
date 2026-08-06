# ASTRELL Blog — Master Build Prompt (v2)
**A strategic, SEO- and AI-search-optimized content platform for astrells.com**

---

## 0. Source of Truth

This section is the single source of truth for all business facts. Do not invent, substitute, or infer beyond what is stated here. Where information is genuinely missing, an explicit **[CONFIRM]** flag is used — treat these as blockers to resolve before final sign-off, not as license to guess.

| Field | Value |
|---|---|
| Business name | **ASTRELL** |
| Domain | **astrells.com** |
| Framework | **Next.js** (App Router assumed as the current standard — **[CONFIRM]** exact version and whether Pages Router is in use) |
| Industry | Creative branding, design, and marketing agency |
| Services (17 — these are the content pillars and internal-linking targets for the entire blog) | Brand Identity · Logo Design · Rebranding · Website Design · Website Development · UI/UX Design · Packaging Design · Label Design · Marketing Strategy · Digital Marketing · Creative Direction · Social Media Design · Social Media Management · Posters & Banners · Motion Graphics · Print Design · SEO Consulting |
| Target audience / category | **[CONFIRM]** — not explicitly provided. Assumed default: small-to-medium businesses, startups, and product brands seeking end-to-end branding, design, and marketing services. All content-strategy recommendations below use this assumption; revise if the actual ICP (e.g., enterprise, e-commerce-only, a specific vertical) differs. |
| Brand design tokens (colors, type scale, spacing scale, radius, shadows, motion, icon set) | **[CONFIRM]** — not supplied in this prompt. The implementing team must pull these from ASTRELL's existing live site / design system documentation before building. Nothing in this document should be interpreted as permission to introduce new tokens. |
| Existing service page URL pattern | **[CONFIRM]** — assumed `astrells.com/services/[service-slug]` for internal-linking purposes below. Update if the real structure differs. |
| Existing portfolio/case-study URL pattern | **[CONFIRM]** — assumed `astrells.com/work/[project-slug]`. |

**Rule for the build agent:** if a **[CONFIRM]** item is still unresolved when work begins, use the stated assumption, note it visibly in a build log or PR description, and do not block delivery on it.

---

## 1. Priority Hierarchy

Work in this order. Do not let polish on a lower tier delay correctness on a higher tier.

- **P0 (non-negotiable, blocks launch):** Brand-system compliance, technical SEO foundation (metadata, semantic HTML, sitemap/robots, canonical URLs), Core Web Vitals targets, WCAG 2.1 AA accessibility, mobile responsiveness.
- **P1 (required for launch, can iterate post-launch):** Full structured data coverage, AI-search-optimized article structure, internal linking system, complete demo article, category/tag/filter/search UI.
- **P2 (valuable, can ship in a fast-follow):** Advanced personalization of CTAs by funnel stage, trending/popular-article ranking logic, related-resources module, reading-progress indicator polish.

---

## 2. Brand & Design System Compliance

- MUST reuse ASTRELL's existing color palette, typography scale, spacing scale, border-radius scale, shadow system, button styles, animation/motion patterns, icon set, and component conventions exactly as they exist elsewhere on astrells.com. No new tokens, no new component patterns, no visual language borrowed from Claude's blog or any other reference site.
- Claude's blog (anthropic.com/news or claude.com blog) is a **structural/UX reference only** — for editorial hierarchy, spacing rhythm, and reading-experience quality. It MUST NOT influence color, type, iconography, or component styling in any way. A designer or engineer familiar with astrells.com should be unable to tell the blog was inspired by an external reference.
- The Blog MUST feel like a native section of astrells.com, not a bolted-on microsite: shared header/footer, shared navigation, shared design tokens, shared component library where one exists.
- If a required UI pattern (e.g., a filter chip, a search input) does not already exist in ASTRELL's design system, extend the existing system's rules (spacing, radius, color usage) rather than introducing a foreign pattern.

---

## 3. Business Goals

Every design, content, and technical decision must be traceable to at least one of these outcomes:

1. Increase high-quality organic traffic to astrells.com.
2. Rank for competitive and long-tail keywords across all 17 service areas.
3. Perform well in both traditional search (Google) and AI-powered answer engines (ChatGPT, Perplexity, Google AI Overviews, Claude, etc.).
4. Establish ASTRELL as an authority in branding, design, and marketing.
5. Educate prospects before they reach out, shortening the sales cycle.
6. Build trust through demonstrably expert, non-generic content.
7. Generate qualified leads (consultation requests, quote requests).
8. Increase conversion from blog readers to service inquiries.
9. Improve retention of existing clients through ongoing educational content (e.g., "how to brief a rebrand," "how to prepare assets for print").

Each blog article MUST map to at least one of ASTRELL's 17 services and at least one customer-journey stage (Section 11).

---

## 4. Responsive Layout — Grid-First

Avoid simple single-column stacking wherever a grid meaningfully improves scanability or hierarchy. Breakpoints (adjust only if they conflict with ASTRELL's existing breakpoint system):

- **Mobile:** < 640px
- **Tablet:** 641px – 1024px
- **Desktop:** > 1024px

### Desktop (> 1024px) — Blog landing page MUST include:
- Featured hero article with featured image
- Category navigation
- Search bar
- Filter system (by category, service, content type)
- Blog grid (multi-column, not a single list)
- Trending articles module
- Popular articles module
- Latest articles module
- Newsletter / lead-capture CTA section
- Related resources module
- Footer CTA

Maintain generous whitespace and a clear visual hierarchy — hero > trending/popular > latest > newsletter > footer CTA.

### Tablet (641–1024px)
- Preserve two-column layouts where the desktop grid supports it (e.g., blog grid as 2-up, not collapsed to 1-up).
- Adapt intelligently: reflow and reprioritize modules rather than simply shrinking desktop spacing.

### Mobile (< 640px)
- MUST NOT feel like a scaled-down desktop page — it should feel purpose-built.
- Compact layouts with comfortable touch targets: minimum **44×44px** tap area on all interactive elements (buttons, filter chips, card CTAs).
- Fast loading: target **LCP ≤ 2.5s on 4G** (see Section 14).
- Excellent readability: minimum 16px base body text, no text below 14px anywhere.
- Adaptive grid (e.g., 1-up hero, 1-up or 2-up card grid depending on card content density).
- Minimize unnecessary scrolling — prioritize the most important modules (hero, search, categories) above the fold.

---

## 5. Blog Card Component

Every article card MUST include:

- Featured image (responsive, lazy-loaded except above-the-fold hero)
- Category label
- SEO-friendly title
- Short description/excerpt
- Estimated reading time
- Publish date
- Author name (and avatar/byline if ASTRELL's system supports author profiles)
- CTA (e.g., "Read Article" or contextual to the piece)

Card behavior:
- Smooth, brand-consistent hover effects and transitions (reuse existing motion tokens — no new easing curves or durations).
- Consistent spacing and alignment across all card instances regardless of grid density.
- Visible, accessible focus states for keyboard navigation (not just `:hover`).

---

## 6. Article Reading Experience

- Comfortable line length: target **60–75 characters per line** for body copy.
- Full typography scale applied consistently (H1–H4, body, captions) per ASTRELL's existing type system.
- Clear vertical spacing between sections — no cramped transitions between headings and body text.
- Sticky table of contents on desktop for articles above a reasonable length threshold (e.g., 3+ H2 sections).
- Reading-progress indicator.
- Estimated reading time, shown both on cards and at the top of the article.
- Social sharing controls.
- Copy-link functionality with a clear success confirmation.
- Previous/Next article navigation at the end of each post.
- Related articles module (prioritize same-service or same-journey-stage content — see Section 12).
- Clear, contextual CTA(s) placed naturally within and at the end of the article (see Section 13).

---

## 7. Technical SEO (Next.js-specific)

Build SEO as an architectural requirement, not an afterthought:

- Semantic HTML5 throughout (`<article>`, `<header>`, `<nav>`, `<time>`, etc.).
- Exactly **one `<h1>` per page**, logical and unbroken H2 → H3 hierarchy beneath it (no skipped levels).
- Per-page, per-article metadata generated via Next.js's Metadata API: optimized `<title>`, meta description, canonical URL.
- Dynamic Open Graph and Twitter/X Card metadata per article, including a dedicated OG image per post (auto-generated or manually set — **[CONFIRM]** which approach ASTRELL prefers).
- Programmatic `sitemap.xml` generation that includes every published article and updates automatically as new posts are added.
- `robots.txt` compatibility — blog routes crawlable by default, with a mechanism to noindex drafts/previews.
- Breadcrumb navigation on every article page (Home → Blog → Category → Article), reflected in both UI and structured data.
- Descriptive, keyword-relevant image alt text on every image — never blank, never filename-based.
- Clean, human-readable URL slugs (e.g., `astrells.com/blog/how-to-choose-a-branding-agency`, not query-string or ID-based paths).
- Internal links use descriptive, natural anchor text — never "click here" or bare URLs.
- Static generation (SSG) or incremental static regeneration (ISR) for article pages to maximize crawl performance and Core Web Vitals; avoid client-side-only rendering for primary article content.

---

## 8. Free SEO Tooling & Research Workflow

Wherever a free tool can do the job, use it before reaching for a paid subscription. This keeps the SEO program sustainable for ongoing content production, not just the initial build. Below, each research/audit task is paired with recommended free tools and an honest note on where "free" has a limit, so the team isn't caught off guard mid-workflow.

### 8.1 Keyword Research
- **Google Keyword Planner** — free with a Google Ads account (no active campaign spend required to browse ideas, though search-volume precision improves with an active campaign). Use for baseline volume and competition data across all 17 service pillars.
- **Google Trends** — free, unlimited. Use to validate topic seasonality and rising interest before prioritizing a pillar or cluster article (e.g., is interest in "rebranding" trending up or flat this quarter?).
- **Semrush free tools** — Semrush does not have a permanent free plan, but its Keyword Magic Tool and related features are usable at a limited daily query cap (roughly 10 searches/day as of 2026) without a paid subscription. Use sparingly for spot-checks, not as a primary daily-use tool.

### 8.2 Search Intent Analysis
- **Manual SERP analysis** — free. For each target keyword, review the actual top-10 ranking pages and note the dominant content format (guide, comparison, listicle, product page) to infer intent (informational / commercial / transactional) before writing.
- **Google Search Console** (once the blog is live) — free. The "Queries" report reveals the real intent mix behind traffic already landing on a page, useful for refining existing content.

### 8.3 Finding Questions Users Are Searching For
- **AnswerThePublic** — free tier allows a limited number of searches per day (roughly 3/day as of 2026, no signup required). Good for occasional deep-dives per pillar topic rather than daily use; batch research sessions to make the daily cap count.
- **Google's "People Also Ask" and related searches** — free, unlimited. Manually mine these boxes for each primary keyword as a lightweight daily-use alternative to AnswerThePublic.
- **Google Search Console** — free. The Queries report often surfaces real question-phrased searches already bringing users to the site.

### 8.4 Content Gap Analysis
- **Ahrefs Webmaster Tools / Ahrefs Free** — free for verified site owners (verify astrells.com via Google Search Console, HTML file, meta tag, or DNS record). Provides a real technical crawl and a monthly crawl-credit allowance sufficient for a site of this size; use Site Explorer to see which of ASTRELL's own pages/keywords have ranking gaps against the 17-service content map.
- **Google Search Console** — free. Cross-reference "Pages" and "Queries" reports to spot service pillars with impressions but no dedicated content, or content ranking on page 2 that could be strengthened.

### 8.5 Competitor Analysis
- **Ahrefs Webmaster Tools / Ahrefs Free** — the free tier is scoped to verified/owned domains only; it does not provide direct competitor site analysis. Use it to strengthen ASTRELL's own site, not to audit competitors.
- **Semrush free tools** — within its limited daily query cap, Semrush's Domain Overview and Organic Research reports can be used for occasional competitor spot-checks (e.g., identifying which keywords a competing agency ranks for that ASTRELL doesn't).
- **Manual SERP review** — free. Regularly check who ranks for ASTRELL's core service + city/industry keyword combinations and note content gaps and structural patterns worth learning from (not copying).

### 8.6 Technical SEO Checks
- **Google Search Console** — free, the primary source of truth for indexing status, crawl errors, mobile usability, Core Web Vitals field data, and manual actions.
- **Bing Webmaster Tools** — free. Set up alongside Google Search Console for additional indexing/visibility insight and its own set of technical audit and backlink reports; low effort since it accepts a GSC import for faster setup.
- **Ahrefs Webmaster Tools / Ahrefs Free** — free full-resolution Site Audit crawl of astrells.com (within its monthly crawl-credit limit) — use for broken links, duplicate content, redirect chains, and on-page SEO issues.

### 8.7 Website Performance Testing
- **Google PageSpeed Insights** — free, unlimited. Run against the blog landing page and article template regularly; use the Core Web Vitals field/lab data to validate the targets in Section 14.
- **Google Lighthouse** (built into Chrome DevTools, or via CLI) — free, unlimited. Use for local, pre-deploy audits of Performance, SEO, Accessibility, and Best Practices scores.

### 8.8 Backlink Monitoring
- **Ahrefs Webmaster Tools / Ahrefs Free** — free backlink data for astrells.com (verified domain), pulled from Ahrefs' full index, not a sampled/limited dataset — a genuinely strong free option for ongoing backlink monitoring.
- **Google Search Console** — free. The "Links" report shows top linking sites and pages as a lightweight secondary check.

### 8.9 Content Optimization
- **Google Search Console** — free. Use the Queries report per URL to find near-miss keywords (ranking positions 8–20) worth reinforcing in existing articles.
- **Manual on-page review against Section 10 (AIO/GEO structure)** — free. Every article should be checked against the AIO/GEO checklist (direct answer near the top, entity-rich writing, question-based subheadings, key takeaways, FAQ) before publishing.

### 8.10 SEO Audits
- **Google Lighthouse** and **Google PageSpeed Insights** — free, for performance/technical audits (Section 8.7).
- **Google Rich Results Test** — free, unlimited. Validate every structured-data type in Section 9 before and after each deploy.
- **Schema.org** (schema.org/docs) — free reference documentation; use directly to confirm property names and required fields when implementing or extending schema types, rather than relying on memory or third-party summaries.
- **Ahrefs Webmaster Tools / Ahrefs Free** Site Audit — free, for a recurring full-site technical health check (Section 8.6).

### 8.11 Operating Principles
- Default to Google's own free tools (Search Console, PageSpeed Insights, Lighthouse, Trends, Keyword Planner, Rich Results Test) as the primary, always-on stack — they have no daily caps and give first-party data.
- Treat capped free tools (AnswerThePublic, Semrush free tier) as periodic, batched research sessions rather than daily-use tools, so the free allowance is used efficiently.
- Verify astrells.com with Ahrefs Webmaster Tools and Bing Webmaster Tools early in the build — both require domain verification, so this should happen during initial setup rather than being left until an audit is needed.
- Because free-tool feature sets and limits change over time, revisit this list periodically (e.g., quarterly) rather than treating it as fixed; confirm current limits on each provider's site before planning a research sprint around it.

---

## 9. Structured Data (JSON-LD)

Implement valid, current-best-practice schema for:

- `BlogPosting` / `Article` — on every article page.
- `Organization` — sitewide, representing ASTRELL (name, logo, `sameAs` social profile URLs — **[CONFIRM]** ASTRELL's official social URLs before implementation).
- `BreadcrumbList` — matching the visible breadcrumb UI on every article.
- `FAQPage` — on articles that include an FAQ section (Section 10).
- `WebPage` — on the blog landing and category pages.
- `Service` — where an article closely maps to one of ASTRELL's 17 offerings, consider linking via `mentions` or `about` to reinforce topical relevance (do not force this where it's not a natural fit).

All schema MUST validate against Google's Rich Results Test and Schema.org specifications before launch.

---

## 10. AI Search Optimization (AIO / GEO / Answer Engine Optimization)

Structure every article so AI systems (ChatGPT, Perplexity, Google AI Overviews, Claude, etc.) can parse, understand, and cite it accurately. Each article MUST include:

- A clear, unambiguous topic definition near the top.
- A direct, extractable answer to the core question within the first 100–150 words.
- Entity-rich writing (name ASTRELL's actual services, methods, and terminology explicitly rather than relying on pronouns/vague references).
- Question-based subheadings where natural (mirrors how people phrase queries to AI search tools).
- A "Key Takeaways" summary section (bulleted, scannable, self-contained).
- Concrete, practical examples grounded in real branding/design/marketing scenarios — not generic filler.
- Actionable advice the reader can apply immediately.
- Visible expert framing (author credentials, ASTRELL's stated experience/point of view).
- A closing summary section.
- An FAQ section addressing 3–6 real follow-up questions a prospect would ask.

Write for humans first; the structure above should make the content naturally easy for AI systems to extract and cite, not feel mechanical. Avoid keyword stuffing entirely — optimize for topical authority and genuine usefulness over keyword density.

---

## 11. Content Strategy

Organize content as a **pillar-and-cluster system**, with ASTRELL's 17 services as the pillars:

- Each service (e.g., Logo Design, Packaging Design, SEO Consulting) is a content pillar with its own cluster of supporting articles (guides, comparisons, mistakes to avoid, case studies, checklists).
- Content types to produce across the system: educational/how-to guides, service explainers, comparisons ("X vs Y"), case studies and success stories, industry trend pieces, common-mistakes articles, actionable checklists, FAQs.

Map every article to a customer-journey stage:

1. **Awareness** — broad educational content (e.g., "What Is Brand Identity and Why Does It Matter?")
2. **Consideration** — comparison and evaluation content (e.g., "In-House vs Agency Rebranding: Which Is Right for You?")
3. **Decision** — bottom-funnel, service-specific content that supports a buying decision (e.g., "What to Expect When You Hire ASTRELL for a Rebrand")
4. **Retention** — content for existing clients (e.g., "How to Brief Your Next Packaging Design Project")

Every article MUST naturally guide the reader toward a relevant ASTRELL service or the contact/consultation flow — never as a hard sell, but as a logical next step.

---

## 12. Internal Linking Strategy

- Every article MUST link to at least one relevant ASTRELL service page (assumed pattern `astrells.com/services/[service-slug]` — **[CONFIRM]**), using natural, descriptive anchor text.
- Where relevant, link to portfolio/case-study pages (assumed pattern `astrells.com/work/[project-slug]` — **[CONFIRM]**) to substantiate claims with real work.
- Cluster articles link to their pillar/hub content and to sibling articles in the same cluster.
- Related-articles modules prioritize same-service or same-journey-stage content over purely recent content.
- Internal links MUST feel editorially natural — inserted where they genuinely help the reader, not appended as a list at the bottom only.
- This linking structure should measurably improve crawlability and distribute topical authority from high-performing pillar pages to newer cluster content.

---

## 13. Conversion Optimization

Every article includes at least one, but no more than two to three, contextual CTAs — never intrusive or interrupting the reading flow. Match CTA to journey stage:

| Journey Stage | Example CTA |
|---|---|
| Awareness | "Learn more about [Service]" |
| Consideration | "See our [Service] work" / "Compare our approach" |
| Decision | "Book a brand consultation" / "Get a free quote" / "Start your project" |
| Retention | "Explore related services" / "Talk to your account team" |

CTA principles:
- CTAs must be visually consistent with ASTRELL's existing button system (no new button styles).
- Avoid CTA fatigue — quality and placement over quantity.
- End-of-article CTA should always be present and should default to the general "Book a Consultation" / "Get in Touch" action when no more specific CTA fits.

---

## 14. Performance & Accessibility

Measurable, testable targets — not aspirational language:

- **LCP (Largest Contentful Paint):** ≤ 2.5s
- **INP (Interaction to Next Paint):** ≤ 200ms
- **CLS (Cumulative Layout Shift):** ≤ 0.1
- **Lighthouse scores:** ≥ 90 across Performance, Accessibility, Best Practices, and SEO categories, on both mobile and desktop audits.
- All images responsive and lazy-loaded (except the above-the-fold hero image, which should be prioritized/preloaded).
- Minimal layout shift during font and image loading (reserve space via explicit dimensions/aspect ratios).
- **WCAG 2.1 AA** conformance: sufficient color contrast, full keyboard navigability, visible focus states, correct semantic landmarks, accessible form labels, `alt` text on all meaningful images.
- Full keyboard-only navigation must be possible through search, filters, category nav, and article reading flow.

---

## 15. Demo Content Requirement

Produce **one complete, production-quality article** based on ASTRELL's real services (not placeholder or lorem ipsum content). It must include:

- SEO title
- Meta title
- Meta description
- URL slug
- Primary keyword
- Secondary keywords
- Search intent (informational / commercial / transactional — state which)
- Introduction
- Full article body, following the AIO/GEO structure in Section 10
- Key takeaways section
- FAQ section
- Suggested internal links (to specific service and/or portfolio pages)
- CTA (matched to the article's journey stage per Section 13)
- Suggested featured image concept (description, not a generated image)
- Structured data recommendation (which schema types apply and why)

The article topic MUST be chosen from ASTRELL's actual service list (Section 0) and should target a realistic, specific keyword rather than a generic one — e.g., "how to choose a brand identity agency" rather than just "branding."

*(This section defines the requirement for the demo article; the article itself is a separate content-creation deliverable, not part of this prompt.)*

---

## 16. Final Deliverables Checklist

- [ ] Fully responsive Blog landing page (mobile, tablet, desktop — grid-first per Section 4)
- [ ] Blog article page template (per Sections 6–9)
- [ ] Reusable blog card component (per Section 5)
- [ ] Category and tag system, mapped to ASTRELL's 17 services
- [ ] Search and filtering UI
- [ ] Technical SEO architecture (Section 7)
- [ ] Free SEO tooling and research workflow adopted by the team (Section 8)
- [ ] AI-search-optimized content structure and guidelines (Section 10)
- [ ] Structured data implementation across all relevant page types (Section 9)
- [ ] Internal linking system connecting blog ↔ service pages ↔ portfolio (Section 12)
- [ ] Conversion-focused CTA system mapped to journey stage (Section 13)
- [ ] One complete, publish-ready demo article (Section 15)
- [ ] A scalable foundation capable of supporting hundreds of future articles without design, SEO, or performance degradation

The finished Blog should read as a premium, native section of astrells.com: fast, elegant, editorially credible, and quietly conversion-focused — never templated, never generic, and never visibly "inspired by" any outside reference.

---

## 17. Open Questions to Resolve Before Development Begins

1. Exact Next.js version and router (App Router vs Pages Router)?
2. Target audience / ICP for content strategy — SMB, startup, enterprise, or a specific vertical?
3. Existing brand design tokens (colors, type scale, spacing, radius, shadows, motion, icon set) — where is the canonical reference?
4. Actual URL patterns for existing service pages and portfolio/case-study pages.
5. ASTRELL's official social profile URLs (for `Organization` schema `sameAs`).
6. Preferred OG image strategy — manually designed per article, or auto-generated?
7. Does ASTRELL want individual author profile pages, or is authorship attribution simpler (name + role only)?