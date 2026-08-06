# ASTRELL — Website Compliance & SEO Implementation Guide

**Prepared:** August 2026 · **Stack assumed:** Next.js-style frontend on **Vercel**, **Supabase** backend, **Cloudflare** DNS/CDN, **Google Analytics** — based on the third-party services already named in your legal package. Adjust the technical specifics if your actual stack differs; the legal and strategic guidance applies regardless of stack.

This guide pairs with a separate file, **`ASTRELL-Agent-Implementation-Prompt.md`**, which is a ready-to-paste instruction set for a coding agent (Claude Code, Cursor, etc.). This document explains the *why* and *what*; the agent prompt is the *do*.

---

## Important framing before you start

Two things changed the compliance landscape for UK websites in 2026, and they affect several of the recommendations below:

1. **UK cookie law changed on 5 February 2026.** The Data (Use and Access) Act 2025 amended PECR to exempt certain narrow categories of low-risk cookies from consent — but most real-world Google Analytics deployments still require consent, and PECR fines are now aligned with UK GDPR at up to **£17.5m or 4% of global turnover**. Section 1.1 covers this in detail — it's not something to skip.
2. **The European Accessibility Act has been in active enforcement since June 2025**, with the first court rulings landing in 2026. It likely doesn't legally bind ASTRELL today (micro-enterprise exemption — see 1.5), but the direction of travel makes WCAG compliance a sensible default rather than a "nice to have."

I'm not a solicitor, and this guide isn't legal advice — treat it as an implementation-ready framework to build from, with solicitor review recommended before launch given ASTRELL's worldwide client base.

---

## Part 1 — Legal & Compliance Implementation

### 1.1 Cookie consent: what changed, and what to actually build

**The law today (UK):**

- Since 5 February 2026, PECR now exempts a small set of *low-risk* cookies from consent — broadly, first-party statistical/analytics cookies used **solely** to understand and improve the website (no cross-site tracking, no ad personalisation, no sharing for other purposes), plus cookies that remember site appearance/preferences. These exemptions have strict conditions attached.
- **Standard Google Analytics (GA4) deployments generally do not cleanly qualify** for the exemption in most implementations, because GA4 data commonly gets used beyond narrow first-party site-improvement purposes and can involve cross-context processing. The safe, ICO-aligned default as of mid-2026 is: **keep GA4 and any third-party analytics behind consent**, and only remove the consent gate if you've specifically configured a first-party-only, single-purpose analytics setup and are confident it meets the exemption conditions.
- Consent, where required, must be freely given, specific, informed, unambiguous — no pre-ticked boxes, no "by continuing to browse you agree," and no bundling analytics/marketing/personalisation into a single accept-all tick.
- Cross-site and cross-device tracking **always** needs consent — no exemption covers it.
- PECR penalties are now up to £17.5m / 4% of global turnover, the same tier as UK GDPR. Cookie compliance is no longer a low-stakes item.
- **From 19 June 2026, organisations must have a documented, audit-trail-backed complaints-handling procedure for data protection matters.** This deadline has already passed — treat it as immediate, not roadmap.

**What to build:**

| Approach | Best for | Notes |
|---|---|---|
| **Consent Management Platform (CMP)** — Cookiebot, CookieYes, Osano, Termly, Usercentrics | Fastest to compliant, least engineering time | Handles auto cookie-scanning, script-blocking-until-consent, and consent logging (needed for audit trail). CookieYes and Termly have generous free/low-cost tiers suited to an agency-scale site. |
| **Self-built** — `vanilla-cookieconsent` or Klaro (open source) + **Google Consent Mode v2** | Full control, no recurring SaaS cost | More engineering effort; you must build the consent log yourself. Required if you want GA4 to keep functioning correctly for EEA/UK visitors, since Google requires Consent Mode signals regardless of which banner you use. |

Either way, the technical pattern is the same:

1. **Nothing non-essential fires before consent.** Analytics, and any third-party embed that sets cookies, must be conditionally loaded — not just "hidden" but not present in the DOM/network requests until consent is recorded.
2. **Granular categories**, minimum: Strictly Necessary (always on, no toggle) / Analytics / Functional. Add Marketing only if/when you introduce ad pixels.
3. **Store a consent record** — timestamp, categories accepted, and the policy version shown — so you have the audit trail the ICO now expects. A simple `consent_logs` table in Supabase works fine for this.
4. **Wire Google Consent Mode v2** if using GA4/Google Ads at any point, so Google's tags respect the user's choice rather than firing regardless.
5. **Cookie banner must not block rendering or hurt Core Web Vitals** — load it async, keep it lightweight; a bloated CMP script is a common and avoidable LCP/INP regression.

### 1.2 GDPR / UK GDPR — technical implementation, not just policy text

Your Privacy Policy already states the rights and legal bases. The technical side means actually being able to honour them:

- **Data Subject Access Requests (DSARs):** a single monitored inbox (the privacy contact email) is enough at your current scale. Internally, be able to query Supabase by email/name across all relevant tables within a day, not a week — build this query once and keep it ready.
- **Right to erasure:** a documented (even manual, at this scale) process to delete a person's contact records, uploaded files, and messages on request, subject to the legal retention carve-outs your Privacy Policy already describes (accounting records, etc.).
- **Data Processing Agreements (DPAs):** confirm you've accepted/signed the standard DPA offered by each processor — Supabase, Vercel, Cloudflare, Google (Analytics), OpenAI, Anthropic, and your future payment processor. These are usually a toggle or a document in each provider's dashboard/trust centre, not a custom negotiation.
- **International transfers:** each DPA above should specify its transfer mechanism (UK IDTA / UK Addendum to EU SCCs). You don't need to draft this yourself — just confirm each provider has it, and note it if a client asks.
- **Security basics that map to "appropriate technical and organisational measures":**
  - HTTPS everywhere (automatic on Vercel).
  - Supabase **Row Level Security (RLS)** enabled on every table that holds client or contact data — this is the single most important Supabase-specific control.
  - Secrets in environment variables, never committed to the repo.
  - Cloudflare WAF/rate-limiting on public forms to reduce spam and abuse (this also supports your Acceptable Use Policy).
  - Regular, tested backups (Supabase point-in-time recovery if on a paid tier).
- **Formal complaints procedure (due now):** write a short internal document — who receives a complaint, how it's logged, response-time target, escalation path. This can be one page. It's a compliance requirement in its own right as of 19 June 2026, separate from your public-facing Privacy Policy.

### 1.3 Publishing the legal pages correctly

- Create dedicated routes for each document, e.g. `/legal/privacy-policy`, `/legal/terms-of-service`, `/legal/cookie-policy`, `/legal/refund-policy`, `/legal/ai-usage-policy`, `/legal/acceptable-use-policy`.
- Render from the markdown source so updates stay in one place (static generation is fine — these don't need to be dynamic).
- **Footer links to all six on every page**, not just a policies index.
- Add an explicit **acceptance step at the point a quotation is approved** (a checkbox: "I have read and agree to ASTRELL's Terms of Service and Privacy Policy," logged with timestamp) — a footer link alone is weaker evidence of agreement than an active, logged acceptance at the moment of contracting.
- Add a small, visible **AI-use notice** near your portfolio/case studies (a one-line note linking to the AI Usage & Disclosure Policy), since that's where clients are most likely to wonder about it.
- Version each document: keep the "Last updated" date live, and keep old versions in git history so you can show what applied to a given client at contract time.

### 1.4 Other legislation worth a deliberate check

- **Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013** — if ASTRELL ever contracts with an *individual consumer* (not a business), UK law gives a 14-day cancellation right for distance contracts. There's a recognised exception for bespoke/personalised goods and services once performance has begun with the consumer's express agreement — which your Refund & Cancellation Policy's "non-refundable once work begins" language is designed to align with, but this is worth solicitor confirmation specifically if you expect direct-to-consumer (not just B2B) clients.
- **PECR marketing rules** — for the newsletter, use double opt-in and keep an unsubscribe link in every send; for any future cold outreach by email, the "soft opt-in" exception only applies to existing customers marketing similar services, not cold prospects.
- **Accessibility:** the European Accessibility Act (in force since June 2025, actively enforced through 2026) exempts *micro-enterprises* (fewer than 10 employees, under €2m turnover) from its services obligations — which likely covers ASTRELL today. That said: (a) this exemption disappears if you grow, (b) larger clients increasingly require WCAG conformance contractually regardless of whether you're legally obligated, and (c) the UK Equality Act 2010's "reasonable adjustments" duty applies more broadly and isn't tied to headcount. Building to WCAG 2.1/2.2 AA now avoids a costly retrofit later — see Part 2.5.

---

## Part 2 — SEO & AI Search Optimization Strategy

### 2.1 Technical SEO foundation

- **`robots.txt`** — two jobs in 2026: traditional search crawlers, and the new landscape of AI crawlers (see 2.4). Keep it at the root, one canonical block per bot.
- **`sitemap.xml`** — generate dynamically from your route/content structure so new service or case-study pages are picked up automatically; submit it in Google Search Console and Bing Webmaster Tools.
- **Canonical tags** on every page, self-referencing by default.
- **Core Web Vitals targets:** LCP < 2.5s, INP < 200ms, CLS < 0.1 — these are both a Google ranking factor and, per current GEO research, correlated with AI-answer-engine crawl reliability.
- **Clean redirects and real 404 handling** — no soft-404s, no redirect chains longer than one hop.
- **Mobile-first rendering** — verify with Search Console's mobile usability report, not just visual eyeballing.

### 2.2 On-page SEO

- **One URL per service**, not a single "services" page — e.g. `/services/brand-identity`, `/services/website-development`, `/services/seo`. Each targets its own keyword cluster and can be cited independently by both search and AI engines.
- **Title tag pattern:** `{Service} in {relevant geography if targeted} | ASTRELL` — keep under ~60 characters.
- **Meta description:** unique per page, written as an answer to the query, not a slogan (this also helps AEO/GEO — see 2.4).
- **Header hierarchy:** one H1 per page matching search intent, H2s for major sub-sections, no skipped levels.
- **Internal linking:** every service page should link to 2–3 related services and at least one relevant case study.

### 2.3 Structured data / schema markup (JSON-LD)

Priority order:

1. **Organization** schema on every page (name, logo, URL, sameAs social links, contact point) — this is also foundational for AI entity recognition (2.4).
2. **ProfessionalService** (or `LocalBusiness` subtype) on the homepage/about page, once you have a registered address to use.
3. **Service** schema on each individual service page.
4. **FAQPage** schema on any page with genuine Q&A content — strong dual benefit for classic rich results and AI-answer extraction.
5. **BreadcrumbList** across the site for navigation clarity.
6. **Article** schema on blog/content-hub posts, with `author` and `datePublished`.

Validate everything with Google's Rich Results Test before shipping.

### 2.4 AI search optimization (AEO / GEO)

This is the newest and fastest-moving part of the brief, so here's the current, evidence-based picture rather than folklore:

**On `llms.txt`:** it's a nice-to-have, not a priority. Adoption sits around 10% of domains, and independent studies (including a 300,000-domain analysis) found no measurable citation benefit — Google has stated on the record it doesn't and won't support it. It costs almost nothing to add, so include a basic one, but don't spend real engineering time on it.

**On `robots.txt` for AI bots — this is the lever that actually matters.** Make a deliberate, explicit choice per bot rather than leaving it unconfigured:

```
# Search / citation crawlers — generally worth allowing for AI-answer visibility
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

# Training crawlers — decide deliberately whether ASTRELL wants its content
# used for model training; block if not, allow if you want broader brand
# presence in future models
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /
```
Blocking a *search/citation* bot removes you from that engine's answers entirely — for a creative agency wanting inbound leads, that's usually a bad trade. Blocking a *training* bot is a separate, defensible business decision either way. Verify traffic claiming to be these bots against the providers' published IP ranges occasionally — spoofed user-agents are common.

**Content structure that actually earns AI citations** (this is the part with real research behind it — a Princeton/Allen Institute study found citation-worthy structuring lifts visibility in AI answers by up to 40%):

- **Answer the question in the first 1–2 sentences of a section**, then elaborate — AI systems extract from the opening content of a passage far more than the middle or end.
- **Include concrete statistics, named facts, and short quotable claims** — these get extracted disproportionately (+25–28% citation lift per the same research), versus vague marketing language.
- **Use genuine FAQ blocks with direct, single-idea answers** — not just for schema, but because that's literally the shape an AI answer engine wants to lift.
- **Comparison tables and numbered lists** are heavily favoured for extraction (e.g. a "Brand Identity vs. Rebranding — what's the difference" table on a relevant service page).
- **Keep entity information consistent everywhere** — same business name, same service descriptions, same claims, across your site, LinkedIn, Google Business Profile, and any directory listings. AI engines corroborate brand facts across multiple independent sources before trusting them.

**Claude-specific note, since it's directly relevant to your stack:** Claude tends to synthesize rather than quote verbatim, and favours clearly structured, logical content over keyword density — another reason to prioritise clean structure over SEO-era keyword stuffing.

**Measuring GEO** doesn't require expensive tooling yet: pick 15–20 real prospect queries ("branding agency for [industry]," "who does packaging design for [niche]"), run them against ChatGPT, Perplexity, Gemini, and Claude monthly, and track whether/how ASTRELL is mentioned.

### 2.5 Accessibility

Build to **WCAG 2.1 AA minimum** (2.2 AA if feasible) regardless of the EAA micro-enterprise exemption discussed in 1.4 — the overlap with SEO and AEO is real and direct:

- Semantic HTML (`<nav>`, `<main>`, `<article>`, proper heading order) helps screen readers *and* is exactly what AI crawlers parse most reliably.
- Meaningful `alt` text on every image doubles as image-SEO and accessibility.
- Full keyboard navigability, visible focus states, and colour contrast ≥ 4.5:1 for body text.
- Form labels properly associated with inputs (contact form, quote request) — also reduces spam/bot friction issues.
- Run axe or Lighthouse accessibility audits in CI, not just once pre-launch.

### 2.6 Performance optimization

- `next/image` (or equivalent) for automatic responsive images and lazy loading below the fold.
- Serve static assets and pages from Cloudflare's edge cache where possible; set sensible `Cache-Control` headers.
- Keep third-party script count low and defer/async everything non-critical — the cookie banner, analytics, and any embeds are the usual offenders.
- Monitor Core Web Vitals in Search Console's field data (CrUX), not just lab scores — field data is what actually affects ranking and, increasingly, AI crawl prioritisation.

### 2.7 Content strategy & E-E-A-T

- **Case studies / portfolio pages** are your strongest SEO and GEO asset — they generate the specific, verifiable claims ("increased X by Y%," "delivered in Z weeks") that both search and AI engines reward. This directly uses the portfolio-display right already built into your Terms.
- **A real, detailed About page** — who's behind ASTRELL, relevant experience, the Amman/UK operating structure — is an E-E-A-T signal search engines and AI systems both weight for a service business with no large existing brand history.
- **Author attribution on blog/content posts**, even if authored collectively as "The ASTRELL Team" initially, with a short bio.
- **Genuine testimonials/reviews**, marked up with `Review`/`AggregateRating` schema once you have enough of them to be meaningful (don't fabricate volume — both Google and AI engines increasingly cross-check review authenticity).
- Publish on a realistic, sustainable cadence (one solid piece a month beats four thin ones) — GEO research suggests refreshing key pages roughly quarterly maintains citation frequency better than "set and forget."

### 2.8 Trust signals

- HTTPS, visible and complete legal pages (Part 1), and real, working contact channels are baseline trust signals for both users and search/AI crawlers evaluating credibility.
- Once available, a real registered address and company number in the footer/schema meaningfully strengthens the "Organization" entity signal — worth prioritising the incorporation-driven placeholder updates for this reason alone, beyond the legal requirement.
- If/when Stripe or PayPal go live, their standard security badges are a recognised conversion and trust signal — no extra work needed beyond correct integration.

---

## Part 3 — Prioritized Implementation Roadmap

| Phase | Timeframe | Focus | Key items |
|---|---|---|---|
| **Phase 0 — Foundation** | Week 1–2 | Legal must-haves + technical baseline | Publish all 6 legal pages with footer links; stand up cookie consent (CMP or custom) with script-blocking-by-default; write the internal complaints procedure (overdue since 19 June 2026); confirm DPAs with each processor; enable Supabase RLS everywhere; HTTPS/robots.txt/sitemap.xml live |
| **Phase 1 — On-site SEO & accessibility** | Week 2–4 | Structure | One URL per service; Organization + Service + FAQ schema; WCAG AA pass; Core Web Vitals baseline fixed; explicit T&Cs acceptance step at quote approval |
| **Phase 2 — Content & GEO** | Month 2 | Visibility | 3–5 flagship case studies with concrete metrics; About page depth pass; AI-crawler `robots.txt` policy finalized; basic `llms.txt`; first blog/content-hub posts written to the answer-first, citation-friendly structure in 2.4 |
| **Phase 3 — Ongoing** | Monthly/quarterly | Maintenance | GEO query monitoring (15–20 prompts across 4 engines); quarterly content refresh on top pages; annual solicitor review of legal docs; incorporation → swap all placeholders across legal pages and schema simultaneously |

---

## Part 4 — Next step

The companion file, **`ASTRELL-Agent-Implementation-Prompt.md`**, translates everything above into a single instruction block you can hand directly to a coding agent to implement against your actual codebase.

---
*This guide reflects UK/EU regulatory positions as understood in mid-2026 and general SEO/AEO/GEO industry practice at the same date; both areas move quickly. It is not legal advice — have a solicitor review your cookie consent implementation and DPAs specifically, since penalty exposure in this area is now substantial.*
