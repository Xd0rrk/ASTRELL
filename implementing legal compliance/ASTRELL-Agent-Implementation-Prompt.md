# ASTRELL — Coding Agent Implementation Prompt

> Copy everything below the line into your coding agent (Claude Code, Cursor, etc.) inside the ASTRELL website repository. Fill in the bracketed items marked `[FILL IN]` before running. Work through the phases in order — each has acceptance criteria so you can verify before moving on.

---

## Context

You are implementing legal compliance and SEO/AI-search optimization for **ASTRELL**, a UK-managed digital creative agency's marketing/portfolio website. This is a production task — be precise, don't skip acceptance criteria, and flag anything you can't verify rather than guessing.

**Stack:** [FILL IN — confirm/correct: Next.js frontend, hosted on Vercel, Supabase for backend/database, Cloudflare for DNS/CDN. If different, adjust file paths and framework-specific instructions accordingly but keep the same requirements.]

**Business facts you need:**
- Company: ASTRELL, digital creative agency, not a marketplace — client-facing entity is ASTRELL, not individual contractors.
- Jurisdiction: England, UK. Currently unregistered as a formal company (fields for company number/registered address are placeholders — do not invent values).
- Services: Brand Identity, Logo Design, Rebranding, Website Design, Website Development, UI/UX Design, Packaging Design, Label Design, Marketing Strategy, Digital Marketing, Creative Direction, Social Media Design, Social Media Management, Posters & Banners, Motion Graphics, Print Design, SEO, Consulting.
- Third-party services in use or planned: OpenAI, Anthropic, Google Analytics, Cloudflare, Vercel, Supabase, and (future) Stripe/PayPal for payments.
- Six legal documents already exist at: `[FILL IN path — e.g. /content/legal/*.md]`. If they are not yet in the repo, ask me to provide them before proceeding with Phase 0, Task 1.

**Non-negotiables:**
- Do not fabricate a registered company number, office address, or legal contact email. Use the literal placeholder text `[To be added upon incorporation]` / `[Insert legal contact email]` wherever those appear, exactly as in the source legal documents.
- Do not let any analytics, marketing, or non-essential third-party script fire before user consent is recorded. This is a hard requirement, not a preference.
- Every new page must be mobile-responsive and pass a Lighthouse accessibility score check before being marked done.

---

## Phase 0 — Legal Foundation (do this first, do not skip)

**Task 0.1 — Publish the legal pages**
- Create one route per document: `/legal/privacy-policy`, `/legal/terms-of-service`, `/legal/cookie-policy`, `/legal/refund-policy`, `/legal/ai-usage-policy`, `/legal/acceptable-use-policy`.
- Render from the markdown source files directly (static generation) so future edits happen in one place, not duplicated in JSX/HTML.
- Add all six links to the site footer, visible on every page, grouped under a "Legal" heading.
- Acceptance: every page on the site has working links to all six documents; each legal page renders the full document with correct headings.

**Task 0.2 — Cookie consent (script-blocking, not just a banner)**
- Implement a consent banner with at minimum three categories: **Strictly Necessary** (always on), **Analytics**, **Functional**. Add **Marketing** only if an ad pixel is actually in use.
- No cookie/script in the Analytics or Functional category may load until the user has explicitly consented to that category. Implement this as conditional script injection, not CSS-hiding of an already-loaded tracker.
- If Google Analytics (GA4) is in use, implement **Google Consent Mode v2** so GA respects the consent state rather than being fully blocked or fully unblocked.
- Log each consent decision (category choices, timestamp, and the version/date of the Cookie Policy shown) to a `consent_logs` table in Supabase. This is required for UK ICO audit-trail expectations, not optional.
- Acceptance: open dev tools network tab on first load with no consent given — confirm zero requests to Google Analytics or any other non-essential third party. Accept "Analytics only" — confirm GA requests now fire but no marketing-category requests do.

**Task 0.3 — Explicit agreement at point of contracting**
- Wherever a quotation/proposal is presented for client approval (or, if that flow doesn't exist yet, the primary contact/quote-request form), add a required checkbox: "I have read and agree to ASTRELL's Terms of Service and Privacy Policy," linking to both pages, and log the acceptance (timestamp, which document versions) to Supabase.
- Acceptance: cannot submit a quote acceptance / contact form used for project initiation without the box checked; a record is created in Supabase on submission.

**Task 0.4 — AI usage notice**
- Add a small, visible line near the portfolio/case-studies section: something like "Some work may involve AI-assisted tools as part of our process — see our AI Usage & Disclosure Policy," linking to `/legal/ai-usage-policy`.
- Acceptance: notice is visible without requiring a click/expand on the portfolio page.

**Task 0.5 — Supabase security baseline**
- Confirm/enable **Row Level Security (RLS)** on every table containing contact details, project materials, or consent logs. Write policies so the site's public/anon key cannot read or write outside what the specific form flow requires.
- Confirm environment variables (API keys, service role keys) are not committed to the repo and are set via Vercel/Supabase project settings.
- Acceptance: attempt an unauthenticated read of a protected table via the Supabase client from the browser console — it must fail.

---

## Phase 1 — Technical & On-Page SEO

**Task 1.1 — robots.txt**
Create/update `robots.txt` at the project root with this structure (adjust the `Allow`/`Disallow` decisions for training bots based on my answer to the question below before finalizing):

```
User-agent: *
Allow: /
Disallow: /legal/*?preview
Sitemap: https://[FILL IN domain]/sitemap.xml

# AI search / citation crawlers — allow, so ASTRELL can appear in AI-generated answers
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# AI training crawlers — [ASK ME: allow or disallow? Default to Allow if I don't answer,
# since broader model presence is generally beneficial for a service business, but confirm.]
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /
```
Acceptance: `robots.txt` validates with no syntax errors; fetch it from a browser and confirm it's served with `Content-Type: text/plain`.

**Task 1.2 — sitemap.xml**
- Generate dynamically from the route/content structure (all service pages, case studies, blog posts, legal pages) rather than hand-maintaining a static file.
- Acceptance: sitemap includes every public route; submit to Google Search Console and Bing Webmaster Tools once domain is verified (flag this as a manual step for me if agent doesn't have search console access).

**Task 1.3 — One page per service**
- Create individual routes for each service listed in Context above, e.g. `/services/brand-identity`, `/services/website-development`, `/services/seo`, etc. — do not consolidate into a single generic services page.
- Each page: unique H1, unique meta title (`{Service} | ASTRELL`, under ~60 chars) and meta description (under ~155 chars, written as a direct answer to "what does ASTRELL do for [service]"), 2–3 internal links to related services, one link to a relevant case study if available.
- Acceptance: each service page has unique title/meta tags (verify no duplicates across pages); Lighthouse SEO score ≥ 90 on each.

**Task 1.4 — Canonical tags, redirects, mobile**
- Self-referencing canonical tag on every page.
- No redirect chains longer than one hop; no soft-404s (pages that return 200 but show "not found" content).
- Acceptance: mobile Lighthouse pass ≥ 90 on homepage and one service page; Search Console mobile usability report shows no errors (flag as manual check if unavailable).

---

## Phase 2 — Structured Data (JSON-LD)

Implement in this priority order, validating each with Google's Rich Results Test before moving to the next:

1. **Organization** schema, site-wide (name: ASTRELL, logo, url, `sameAs` array of social profiles, contactPoint). Use placeholder-safe values for anything not yet finalized (do not invent an address).
2. **Service** schema on each service page created in Task 1.3.
3. **FAQPage** schema on any page with a genuine Q&A section (add one to at least the homepage and one service page if none exists yet).
4. **BreadcrumbList** site-wide navigation schema.
5. **Article** schema on blog/content-hub posts once they exist (Phase 3).

Acceptance: each schema type validates with zero errors in Rich Results Test; spot-check rendered JSON-LD in page source, not just component code.

---

## Phase 3 — Accessibility & Performance

**Task 3.1 — Accessibility pass (WCAG 2.1 AA)**
- Semantic HTML throughout (`<nav>`, `<main>`, proper heading order, no skipped levels).
- `alt` text on every meaningful image; empty `alt=""` on purely decorative images.
- All interactive elements keyboard-navigable with visible focus states.
- Form inputs (contact form, quote request, newsletter signup) have properly associated `<label>` elements.
- Colour contrast ≥ 4.5:1 for body text against its background.
- Run an automated accessibility audit (axe-core or Lighthouse) across every page template and fix flagged issues.
- Acceptance: Lighthouse accessibility score ≥ 95 on every page template; zero critical axe-core violations.

**Task 3.2 — Performance**
- Use the framework's built-in image component (e.g. `next/image`) for all images, with lazy loading below the fold.
- Defer/async all non-critical third-party scripts (cookie banner, analytics, embeds).
- Set sensible `Cache-Control` headers for static assets, leveraging Cloudflare edge caching.
- Acceptance: Lighthouse Performance score ≥ 90 on mobile for homepage; LCP < 2.5s, INP < 200ms, CLS < 0.1 in field or lab data.

---

## Phase 4 — Content Infrastructure

**Task 4.1 — Case study / portfolio template**
- Build a reusable template for case studies that supports: concrete outcome metrics, a clear "challenge → approach → result" structure, and a visible link to the AI Usage notice (Task 0.4).
- Ensure the template respects the portfolio-display right in the Terms of Service (display by default; support a per-case-study "confidential — do not publish" flag for projects under NDA).

**Task 4.2 — Blog/content hub scaffold**
- Create the route structure (`/insights` or `[FILL IN preferred path]`) with Article schema wired in (Phase 2, item 5).
- Content itself is a human/editorial task, not something to auto-generate — scaffold the technical structure only unless I explicitly ask you to draft copy.

**Task 4.3 — llms.txt (low priority, minimal effort)**
- Add a basic `/llms.txt` listing the site's key pages with one-line descriptions. This has low measured impact — spend no more than 30 minutes on it.

---

## Questions to ask me before finalizing (do not guess these)

1. Confirm the actual production domain for `sitemap.xml` and `robots.txt`.
2. Confirm whether ASTRELL wants AI training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot) allowed or blocked in `robots.txt` — Task 1.1 defaults to Allow if unanswered.
3. Which CMP/cookie-consent approach: a SaaS tool (Cookiebot/CookieYes/Osano/Termly) or a self-built solution (`vanilla-cookieconsent` + Consent Mode v2)? This changes Task 0.2's implementation path significantly.
4. Confirm the path/location of the six existing legal markdown documents, or provide them if not yet in the repo.
5. Confirm the preferred URL slug for the blog/content hub (Task 4.2).

---

## Definition of done

Do not report a phase complete until its acceptance criteria are verified, not assumed. Where verification requires access you don't have (Search Console, live domain, production Supabase credentials), say so explicitly and list it as a manual follow-up rather than marking it done.
