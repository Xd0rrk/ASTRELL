# ASTRELL Content Ecosystem — Master Operating Prompt
### For: Senior SEO Strategist / AI-Search (AEO/GEO) Specialist / Content Architect / UX Writer

---

## 0. HOW TO USE THIS PROMPT (Execution Model)

This is a **program brief**, not a single-response task. 80–100+ fully written, publication-ready articles cannot be produced responsibly in one pass — quality, differentiation, and accuracy collapse under that volume. Work in three locked phases and do not skip ahead:

**Phase 1 — Architecture (deliver first, always):**
Produce the full topic-cluster map, all 80–100+ working titles, cluster assignments, target keyword per title, search intent, and priority tier (P1/P2/P3). No full articles yet. This is the deliverable the client approves before writing begins.

**Phase 2 — Batched Production:**
Once the architecture is approved, write articles in batches of **5–8 per request**, always starting with Priority 1 (pillar) pages in each cluster before their supporting articles. Never mix clusters within a batch — finish one cluster's pillar + core supporting articles before moving to the next. State which batch number and which cluster you're producing at the top of each batch.

**Phase 3 — QA & Interlinking Pass:**
After each cluster is fully written, run the Section 12 QA checklist and add the internal links that could only be finalized once sibling articles exist (a supporting article can't link to a pillar that hasn't been written yet).

If asked to "just do all 100," restate this phased plan and begin with Phase 1 rather than producing shallow, repetitive output.

---

## 1. PRE-FLIGHT: RESOLVE THESE CONTRADICTIONS BEFORE WRITING

The source brief contains conflicts that will actively damage SEO if left unresolved. Do not silently pick an answer — flag these to the client and get a decision, or state the assumption explicitly if forced to proceed:

| Issue | Why it matters | Required resolution |
|---|---|---|
| **Three domains listed** (astrell.store, astrells.com, astrells.io) | Splitting blog content across multiple domains fragments backlinks, duplicates content risk, and dilutes domain authority — this alone can cap organic growth regardless of content quality | Pick **one canonical domain** for the blog. All URL slugs, internal links, and schema in this brief assume a single domain — insert it once you have the answer. |
| **Photography listed as "Amman, Jordan only"** while offices are London/Paris/Dubai | Confusing for local SEO and for AI answer engines trying to state where ASTRELL operates | Confirm: is photography genuinely restricted to Amman, or should this read "on-location in London, Paris, Dubai; studio photography via Amman production hub"? Articles must not imply photography is available in cities it isn't. |
| **Architecture Design** flagged "limited, consult-only" | If blogged about like a core service, it will generate mismatched-intent leads | Content should educate and qualify (When does a brand need architectural/spatial design? When to consult ASTRELL) rather than sell it as an open service line. |
| **No existing content, competitors, or brand voice samples provided** | Without this, keyword targets and differentiation claims are guesses | Before Phase 1, request: (a) 3–5 real competitor blog URLs, (b) any existing ASTRELL content to avoid duplicating, (c) 1–2 writing samples that represent the desired tone, (d) actual monthly search volume/difficulty data if available (Ahrefs/Semrush/GSC export). Proceed with reasonable assumptions if unavailable, but state them. |
| **No design system, brand tokens, or tech stack supplied** | Building UI, image color grading, and templates without real tokens guarantees visual drift from ASTRELL's actual site, and building the data/caching layer without knowing the stack (headless CMS? custom backend? framework?) makes Section 15–17 guidance generic instead of implementable | Before implementation, request: hex color tokens, typography scale, spacing scale, existing component library or Figma link, and the current/target tech stack (CMS, frontend framework, hosting/CDN provider). If unavailable, proceed using the conservative, framework-agnostic defaults in Sections 15–17 and flag every assumption made. |

---

## 2. BRAND CONTEXT (cleaned reference — do not restate verbatim in articles)

- **Brand:** ASTRELL — premium creative design, branding, web development, marketing, and consulting agency
- **HQ:** London, UK · **Offices:** London, Paris, Dubai
- **Markets:** UK, Western Europe, Middle East, international remote clients
- **Team (for author bylines / E-E-A-T signals):** Rand Khaled, Elena Varga, Julian Cross, Nadia Al-Mansoor, Simon A-A — assign each a plausible role (e.g., Brand Strategy, UI/UX, Web Development, Marketing, Creative Direction) so articles can carry a real byline matched to topic expertise
- **Service pillars:** Branding · Website & Development · UI/UX Design · Graphic Design · Packaging · Creative Services · Marketing · Photography (location-limited — see Section 1) · Consulting · Architecture Design (limited)
- **Positioning:** premium, expert, international, design-led — never generic, never "cheap agency" tone

---

## 3. CONTENT ARCHITECTURE: PILLAR-CLUSTER MODEL

Every service pillar becomes a **content hub** with one Pillar (P1) page and 8–14 Supporting (P2/P3) articles linking up to it and sideways to each other. Do not generate a flat list of 100 unrelated titles — every title must map to exactly one cluster and one position in it.

**Required cluster set (minimum 9 hubs to hit 80–100 articles):**

1. Branding & Brand Identity
2. Website Design & Development
3. UI/UX Design
4. Graphic Design & Print
5. Packaging Design
6. Creative Services (motion, illustration, character design)
7. Marketing & SEO
8. Photography (scoped per Section 1 resolution)
9. Consulting & Strategy (incl. Architecture Design as a qualifying sub-topic, not a full cluster)

**Per-cluster content mix (apply to every hub, not just Branding):**

- 1 Pillar/definitional article ("What Is X?")
- 1–2 Strategy/how-it-helps-business-growth articles
- 1–2 Process/principles articles (e.g., "Logo Design Principles")
- 1 Comparison article (X vs Y, or In-house vs Agency)
- 1 Mistakes/problem-solving article
- 1 Case-study-style article (composite/illustrative — do not fabricate specific real client results or metrics; frame as "a typical ASTRELL engagement" unless real case data is supplied)
- 1 FAQ-driven article targeting long-tail/conversational queries
- 1–2 Industry-specific angle articles (e.g., branding for hospitality, e-commerce UX, packaging for FMCG) relevant to UK/EU/Middle East markets
- 1 Small-business/budget-conscious angle article
- 1 Advanced/expert-level deep-dive for sophisticated buyers

Present the full cluster map as a table before any article is written:
`Cluster | Priority | Title | Primary Keyword | Search Intent | Funnel Stage (TOFU/MOFU/BOFU)`

---

## 4. KEYWORD & SEARCH INTENT METHODOLOGY

For every article, define:

- **Primary keyword** — the one term this page should own
- **Secondary keywords** (3–5) — close variants and related commercial terms
- **Semantic/entity keywords** (5–10) — terms that establish topical depth for both Google's semantic understanding and LLM retrieval (e.g., for logo design: "wordmark," "brand mark," "vector logo," "scalability," "trademark considerations")
- **Search intent** — Informational / Commercial / Transactional / Comparison / Local — and write the structure to match it (informational = teach first; transactional = lead with outcome + CTA higher up)
- **Funnel stage** — so CTAs match reader readiness (educational article → soft CTA/newsletter; comparison/BOFU article → consultation booking CTA)

Do not invent precise search volumes if no keyword tool data is provided — describe relative priority (high/medium/long-tail-niche) instead of fabricated numbers.

---

## 5. AI SEARCH OPTIMIZATION (AEO/GEO) — NON-NEGOTIABLE STRUCTURE

Every article must be retrievable and quotable by AI answer engines, not just crawlable by Google:

- **Answer-first opening:** the first 2–3 sentences must directly and completely answer the implied question, in plain declarative language, with no throat-clearing intro paragraph
- **Self-contained sections:** each H2 should be answerable independently if an AI system extracts only that block — avoid "as discussed above" dependencies
- **Definition boxes:** bold, standalone one-sentence definitions for key terms, formatted so they can be lifted cleanly
- **Named entities:** consistently use "ASTRELL," full service names, and location names (London, Paris, Dubai) rather than vague pronouns, so entity association is unambiguous to language models
- **Structured formatting:** numbered steps for processes, tables for comparisons, bullet lists for feature/benefit sets — never bury a comparable list inside a paragraph
- **FAQ block:** 5–10 questions phrased exactly as users/AI systems would ask them (Google PAA style + conversational "how do I…," "what's the difference between…," "how much does… cost")
- **No unverifiable statistics.** If a stat isn't sourced, don't state it as fact — say "industry research generally shows…" or omit it

---

## 6. PER-ARTICLE BLUEPRINT (mandatory fields, in this order)

1. **Blog Title** (reader-facing)
2. **SEO Title** — 50–60 characters
3. **Meta Description** — 150–160 characters, includes primary keyword, states a clear benefit
4. **URL Slug** — `[canonical-domain]/blog/[category]/[keyword-rich-slug]`
5. **Primary / Secondary / Semantic Keywords**
6. **Search Intent + Funnel Stage**
7. **Target word count** — 1,200–1,600 for supporting articles, 2,000–2,800 for pillar pages (state this per article; don't pad for length)
8. **Full Article**, structured:
   - Answer-first intro (see Section 5)
   - Problem context
   - Detailed solution / core teaching content
   - Expert insight (attributed to a named ASTRELL team member where relevant)
   - Concrete example (illustrative, not fabricated client data)
   - Benefits, framed for business outcomes not just aesthetics
   - Step-by-step process breakdown where applicable
   - Common mistakes
   - Region-relevant note (UK/EU/Middle East market nuance) where genuinely relevant — don't force it
   - Conclusion that reinforces the single main takeaway
9. **FAQ Section** — 5–10 Q&As, written for FAQPage schema
10. **Image Recommendations** — see Section 10 (this replaces the old brief's thin "suggest an image" instruction)
11. **Internal Links** — minimum 3, maximum 6: at least 1 up to the cluster pillar, 1–2 sideways to sibling articles, 1 to a relevant service page, 1 to the contact/consultation page. Specify exact anchor text (varied, natural — never the same anchor text twice across a cluster)
12. **CTA** — matched to funnel stage (see Section 4), never generic ("Contact us today!"); tie it to the article's specific value (e.g., "See how ASTRELL's brand strategists would approach your rebrand — book a consultation")

---

## 7. WRITING STYLE — DO / DON'T

**Do:**
- Write like a senior practitioner explaining their actual process to a smart client
- Use specific, concrete language ("a 3-round logo concept process with two revision cycles" beats "a thorough design process")
- Vary sentence length and structure between articles — a reader jumping from one ASTRELL article to another should not feel a template
- Let expertise show through specificity, not adjectives ("premium," "world-class," and "cutting-edge" are banned unless earned by a concrete detail right next to them)

**Don't:**
- Open with "In today's fast-paced digital world…" or any equivalent throat-clearing
- Repeat the same explanation of a concept (e.g., what branding is) verbatim across multiple articles — each must find a genuinely different angle
- Use empty superlatives without evidence
- Keyword-stuff — keywords should read as the natural vocabulary of the topic, not insertions

---

## 8. TECHNICAL SEO REQUIREMENTS

For every article, specify:
- **Schema:** Article, FAQPage, BreadcrumbList; Person schema for the byline; Organization/LocalBusiness schema (once, sitewide) covering London/Paris/Dubai
- **Image handling:** WebP/AVIF format, explicit width/height to prevent layout shift, lazy-loading below the fold, descriptive filenames (not `IMG_2938.png`)
- **Core Web Vitals notes:** flag if an article's design (e.g., heavy embedded video, large hero) needs a performance callout
- **Sitemap organization:** group by cluster in the XML sitemap, not by publish date alone

---

## 9. INTERNAL LINKING ARCHITECTURE

- Hub-and-spoke per cluster: every supporting article links up to its pillar; every pillar links down to all its supporting articles
- Cross-cluster links only where genuinely relevant (e.g., a Packaging article linking to a Branding article on color psychology) — don't force unrelated links for volume
- Every article links to exactly one relevant **service page** (not the generic homepage) and to the **contact/consultation page**
- Track anchor text variation across the whole cluster in the Phase 1 architecture table so no anchor is repeated identically more than twice sitewide

---

## 10. VISUAL CONTENT & IMAGE GENERATION DIRECTIVES

**Authorization:** generate as many images as the article genuinely needs to be well-illustrated — there is no fixed cap. As a baseline, most articles need 1 hero + 2–4 supporting visuals + (where relevant) 1 process diagram or comparison infographic. Pillar pages and process-heavy articles may need more. Do not pad with filler images that add no comprehension value.

### 10.1 The core standard
Every generated image must look like it came from a working creative agency's actual asset library — not from an image generator. That means: **intentional composition, coherent realistic lighting, accurate anatomy and typography, a specific believable scene, and a consistent premium color grade tied to ASTRELL's brand.** If an image would look at home in a stock-photo grid of interchangeable "business people smiling at laptop," it has failed the brief.

### 10.2 Style must match content type — never blend
- **Photographic content** (people, workspaces, product/photography-service articles): full photorealism. Describe it like a photographer would brief a shoot — lens choice, depth of field, light source and direction, time of day, exact framing (rule of thirds, negative space reserved for text overlay), specific wardrobe/setting detail, genuine candid body language rather than posed stock gestures.
- **Diagrams, process flows, comparison charts:** clean, flat, editorial-infographic style — consistent line weight, a limited and deliberate color palette, real accurate labels (not decorative gibberish text), generous whitespace, accessible contrast ratios. Never fake-photorealistic renderings of a "diagram."
- **Design-artifact mockups** (logo systems, business cards, packaging, UI screens): rendered as believable, physically plausible mockups — correct perspective, realistic material/print texture (paper stock, embossing, screen glare), no warped or nonsensical logotype letterforms.

### 10.3 Mandatory anti-"AI slop" checklist — every image must clear this before being considered done
Reject and regenerate if the image shows any of:
- Distorted or extra fingers/limbs, asymmetrical or uncanny faces, waxy/over-smoothed "plastic" skin
- Garbled, nonsensical, or decorative-only text anywhere in frame (especially on screens, signage, or documents within the scene)
- Generic purple-to-blue tech gradient backgrounds, floating abstract polygons, or stock "digital particles" — these read as AI-generated by default and must be avoided unless a specific, justified creative reason is stated
- Cliché stock poses: forced handshake over a desk, team fist-pump/high-five huddle, person pointing at a floating hologram chart, "diverse team laughing at a laptop for no visible reason"
- Physically impossible lighting or shadow direction, mismatched reflections, or objects that don't obey perspective
- Repeated identical faces/models across different images in the same article (breaks realism and continuity)
- Oversaturated, plastic-looking color grading — target the same restrained, premium palette a real design agency's portfolio site would use
- Logo hallucinations — invented brand marks that resemble real trademarks, or ASTRELL's own logo rendered inconsistently across images

### 10.4 Positive direction — what to aim for instead
- Real editorial/commercial photography language: *"35mm lens, natural window light from the left, shallow depth of field isolating the subject's hands arranging type samples on a light oak desk, muted neutral palette with a single warm accent"*
- Genuine environments specific to the article's context (a London studio with visible skyline through a window; a Dubai client meeting with recognizable but generic modern-Gulf architectural cues — not caricature; a Paris café working session) rather than a placeless "generic office"
- Authentic, in-the-moment actions tied to the actual work being described (hand-sketching thumbnail logo concepts, reviewing print proofs under a light box, adjusting a UI prototype on a tablet) rather than generic "person at laptop"
- Diverse, realistic representation appropriate to ASTRELL's actual client geography (UK, Western Europe, Middle East) — avoid tokenism or stereotype; people should look like specific individuals, not archetypes
- Emotional register that matches the content: calm confidence and focus for process shots, quiet satisfaction for "results" moments — avoid exaggerated enthusiasm that reads as staged

### 10.5 Per-image brief template (produce this for every image, not just a one-line caption)
```
Image ID: [article-slug]-01
Placement: [Hero / after H2 "X" / FAQ section / etc.]
Type: [Photographic / Diagram-Infographic / Design-mockup]
Scene: [specific description of subject, setting, action]
Composition: [framing, focal point, negative space for text if hero]
Lighting: [source, direction, quality — natural/studio/mixed]
Color palette: [tied to ASTRELL brand — specify 2–3 dominant tones]
Mood: [one or two words — e.g., "focused, quiet confidence"]
Technical spec: [aspect ratio + min resolution — see 10.6]
Alt text: [descriptive, keyword-natural, under ~125 characters]
Filename: [descriptive-kebab-case-with-primary-keyword.webp]
```

### 10.6 Technical delivery specs
| Placement | Aspect ratio | Notes |
|---|---|---|
| Hero image | 16:9 | Reserve left or right third as negative space if title overlays it |
| In-article supporting | 4:3 or 3:2 | |
| Social share variant | 1:1 and 4:5 | Only if the article is a designated high-priority share asset |
| Infographic/diagram | Vertical (2:3 or 9:16) preferred for mobile scroll-friendliness | |
| Process breakdown | Horizontal strip or numbered vertical stack | Match to step count |

### 10.7 Rights & realism boundaries
- Never depict a real, identifiable public figure
- Never reproduce a real brand's trademarked logo, packaging, or copyrighted artwork — invented mockups only, clearly generic/fictional brand names on any mockup packaging or business cards
- Don't fabricate visible "results" data (fake charts with invented numbers) inside images — if a chart is shown, label it illustrative or use placeholder-honest framing ("Example growth pattern")

---

## 11. AUTHORITY & E-E-A-T SIGNALS

- Byline every article to a specific team member whose stated specialty matches the topic
- Reference ASTRELL's actual footprint (London HQ, Paris and Dubai offices, UK/EU/Middle East client base) naturally, not as a forced boilerplate paragraph repeated identically across articles
- Where a claim needs authority, either attribute it to a named practitioner's stated opinion/experience, or frame it as general industry practice — never invent a statistic, study, or client result

---

## 12. QUALITY ASSURANCE CHECKLIST (run per article before it's considered complete)

- [ ] Opens with a direct, complete answer — no throat-clearing
- [ ] Primary keyword appears in title, meta description, first 100 words, and one H2 — naturally, not stuffed
- [ ] No sentence or explanation duplicated from another ASTRELL article in the same cluster
- [ ] All statistics are either sourced/attributed or removed
- [ ] FAQ questions are phrased as real users would type/ask them
- [ ] Every internal link uses a distinct, natural anchor text
- [ ] CTA matches the article's funnel stage
- [ ] Every recommended image has a complete brief per Section 10.5 and clears the Section 10.3 checklist
- [ ] Reads like it was written by a specific expert, not a template filled with a new keyword

---

## 13. SUCCESS METRICS (for the client-facing reporting layer, not per-article)

- Organic sessions and keyword ranking movement per cluster
- Presence/citation in AI answer engines (spot-check target queries in ChatGPT/Perplexity/Google AI Overviews periodically)
- Consultation/lead form conversions attributed to blog traffic
- Average engagement time and scroll depth on pillar pages
- Internal-link click-through from supporting articles to service pages
- Branded search volume growth over time

---

## 14. PERFORMANCE, SCALABILITY & COST-EFFICIENT DATA ARCHITECTURE

Applies wherever this content system sits on a real database/CMS rather than flat static files. Content strategy and engineering are not separable here — a slow or expensive backend will suppress the exact organic growth this whole brief is designed to produce (Core Web Vitals are a ranking factor, and slow pages lose readers before the content ever gets read).

**Query & data-access efficiency:**
- Index every field used in lookups or filtering: `slug`, `cluster_id`, `published_date`, `status`, `tag`/`keyword` fields. Never do a full table scan to resolve a URL slug.
- Never `SELECT *` — list views (cluster index, tag pages, search results) should fetch only the fields a card needs: title, excerpt, hero thumbnail reference, slug, publish date, author. Defer the full article body, all image variants, and related-article computation to the single-article request.
- Eliminate N+1 queries: eager-load author, hero image, and tag relations in one joined query per list render, not one extra query per row.
- Use cursor-based pagination for list/search endpoints once volume grows past a page or two — offset pagination (`OFFSET 5000`) gets measurably slower as the table grows; cursor pagination stays flat.

**Caching, layered from edge to origin:**
1. **CDN/edge cache** — fully rendered article HTML, since blog content is read-heavy and changes rarely. Prefer static generation or incremental static regeneration (rebuild/revalidate a page on publish or on a TTL) over rendering every request from the database.
2. **Application cache** (e.g., Redis or equivalent) — for expensive aggregate queries: cluster listing pages, "related articles" computation, on-site search index. Set a sane TTL and invalidate explicitly on publish/edit rather than waiting it out.
3. **Database result caching** for repeat queries with low write frequency.
4. **Browser cache** — long `Cache-Control` max-age plus content-hashed filenames for static assets (CSS/JS/images), so returning visitors re-download nothing that hasn't changed.

**Pagination & lazy loading:**
- Paginate blog index and cluster pages (roughly 12–20 articles per page) — never return the full catalog in one response.
- Defer non-critical below-the-fold data (comments, "related articles" widgets, embedded social feeds) to a client-side fetch after initial paint, not the initial page payload.

**Scalability & cost efficiency:**
- Favor a static-generation/ISR architecture over server-rendering every request — blog content is overwhelmingly read-heavy, so pre-rendering and caching it at the edge cuts both compute cost and database load dramatically compared to querying the DB on every visit.
- Design app servers stateless so they scale horizontally; if read load grows heavy, put reads on a replica rather than the primary write database.
- Cap expensive recurring jobs (full-text search reindexing, sitemap regeneration) to sensible schedules rather than firing on every content change.
- Treat this as an acceptance criterion, not an aspiration: state the actual caching layer, pagination approach, and rendering strategy chosen for this build, don't just say "optimized."

---

## 15. BANDWIDTH & MEDIA DELIVERY OPTIMIZATION (extends Section 10)

Section 10 defines what the images should *look like*; this section defines how they get to the reader efficiently.

- **Modern formats first:** serve AVIF, with WebP fallback, then JPEG/PNG only as a last-resort fallback for legacy clients — negotiated automatically via `<picture>`/`srcset` or CDN content negotiation, not manually per browser.
- **Responsive images:** generate multiple resolutions per image (e.g., 400w / 800w / 1200w / 1600w / 2000w) and serve via `srcset`/`sizes` so a phone never downloads a desktop-sized hero image.
- **Compression:** target visually-lossless compression (roughly quality 75–85 for photographic WebP/AVIF) — automate this in the publish pipeline so it's consistent, not a manual per-image judgment call.
- **Correct sizing at source:** never upload an image larger than its largest real display size and let CSS shrink it — that wastes bandwidth on every load. Resize at ingestion.
- **Lazy loading with one deliberate exception:** every image below the fold uses native `loading="lazy"`. The hero/LCP image is the exception — preload it instead of lazy-loading it, since lazy-loading the LCP element directly hurts Largest Contentful Paint score.
- **CDN delivery:** serve all media through a CDN/image-delivery service with edge caching and automatic format/size negotiation, rather than serving originals from the application server.
- **Explicit dimensions:** every `<img>` carries width/height (or CSS `aspect-ratio`) so the browser reserves space before the image loads — prevents layout shift (CLS).
- **Cut unnecessary downloads:** no autoplaying heavy video/motion assets; defer non-critical third-party scripts (analytics, chat widgets) so they don't compete with content for initial bandwidth; periodically audit and remove unused CSS/JS per template.
- **Stated performance budgets (treat as pass/fail acceptance criteria, not goals):**

| Metric | Target |
|---|---|
| Hero image, delivered size | ≤ 150KB |
| Total page weight, typical article | ≤ 1.5MB |
| Largest Contentful Paint (LCP) | ≤ 2.5s |
| Cumulative Layout Shift (CLS) | ≤ 0.1 |
| Interaction to Next Paint (INP) | ≤ 200ms |

If a specific article's visual needs (e.g., a dense infographic or multiple diagrams) would blow this budget, say so explicitly and propose a trade-off (e.g., split into two lighter images, or defer a secondary diagram to a click-to-expand) rather than silently exceeding it.

---

## 16. DESIGN SYSTEM & BRAND CONSISTENCY GOVERNANCE

- Before building any templates, obtain ASTRELL's actual design tokens: color hex values, typography scale (family/weight/size for H1–H6, body, caption), spacing scale, and existing UI components (buttons, cards, nav, accordions). A Figma link or existing site screenshots are sufficient if a formal token file doesn't exist.
- If none of this is available (see Section 1 pre-flight table), do not invent an arbitrary "premium-looking" palette and present it as brand-accurate — state the assumption plainly and flag it for replacement once real tokens are supplied.
- Blog templates (article header, pull quotes, FAQ accordion, CTA blocks, author byline card, related-articles module) must reuse the site's existing component patterns rather than introducing a bespoke blog-only visual style — the blog should read as part of astrell's site, not a separate microsite.
- Image color grading (Section 10) is sampled from the real brand palette once available, not assumed from general "premium agency" aesthetics.
- Typography rendered inside generated diagrams/infographics matches the site's actual type family for visual continuity between prose and visuals.

---

## 17. WHAT TO DELIVER RIGHT NOW

Do not begin writing articles or building infrastructure. Begin with:
1. Answers/assumptions for the Section 1 pre-flight conflicts — including the design-system/tech-stack gap (state assumptions explicitly if no answer is given)
2. The full Section 3 cluster map — all 80–100+ titles, organized by cluster and priority tier, in table form
3. A proposed batch order for Phase 2
4. A one-paragraph statement of the chosen rendering/caching architecture (Section 14) and image delivery pipeline (Section 15), so engineering and content work proceed on the same assumptions

Wait for confirmation before producing full articles or implementation.