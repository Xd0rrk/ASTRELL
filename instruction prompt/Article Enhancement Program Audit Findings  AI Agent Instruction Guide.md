# Article Enhancement Program: Audit Findings & AI Agent Instruction Guide
**Prepared for:** ASTRELL Content Team
**Scope:** 55 blog content deliverables (`article_01_deliverable.md` – `article_55_deliverable.md`)
**Purpose:** Diagnose current content quality and give a downstream AI agent an unambiguous, repeatable protocol for upgrading all 55 articles to a consistent, high-authority standard.

---

## Part 1 — What Was Actually Reviewed (Read This First)

Before the instructions can be applied correctly, the agent needs to understand what these 55 files *are*. This matters because it changes the nature of the work from "editing" to "building out."

Each of the 55 files is a **pre-production content brief**, not a finished article. Every file follows the identical six-section template:

1. Research Brief (search intent, SERP gap, keywords, sources, conversion angle)
2. Old → New Record (title decision log)
3. "Final Article Copy" — in practice this is a **heading outline with 1–3 descriptive bullets per section**, not full prose. Every file ends with *"See `lib/batch-XX-posts.ts` for the production code injection"* — the real, long-form body copy lives in TypeScript files that were **not included** in this export.
4. Internal Linking Notes
5. Schema Markup Recommendation
6. Image Briefs

**Implication for the instruction guide:** the agent cannot simply "edit sentences." For most of the 55 items, it must treat the brief as an approved skeleton and **write the full article from it** (or, if the linked `lib/batch-XX-posts.ts` files are available in the working repo, load the existing published copy from there and upgrade it against this same brief). Section 4 of this guide gives explicit branching logic for both cases.

---

## Part 2 — Audit Summary: Current State of the 55 Articles

| Dimension | Finding | Evidence |
|---|---|---|
| Average length | 536 words per brief (outline only; final published word count unknown without the `.ts` files) | Word count across all 55 files |
| Sourcing | **Zero** verifiable citations. "Sources Gathered" lists name organizations/concepts ("HBS," "Frontify," "industry case studies") but include **no URLs, no publication dates, no authors** | 0 of 55 files contain a markdown link (`](http`) |
| Visual/structural elements | Comparison tables appear in 1 of 55 briefs; "Bento grid" visual concepts in 4 of 55; FAQ sections planned in only 2 of 55 | Grep across corpus |
| Duplicate/cannibalizing topics | At least one exact-duplicate title and keyword target, plus a near-duplicate pair | `article_29` and `article_53` are both titled *"Custom GPTs and Claude Projects for Brand Consistency: A Setup Guide"* targeting overlapping keywords; `article_06` and `article_51` both cover *"The Graphic Designer's Guide to Custom AI Instructions."* Both pairs target different Hubs internally, which will confuse both users and search engines if published as-is |
| Title tag length | Several exceed the 60-character SEO best-practice ceiling | e.g., *"High-End Image Retouching & Post-Production Workflows \| ASTRELL"* (63 chars), *"Photo Shoot Pre-Production: Casting & Scouting Guide \| ASTRELL"* (62 chars) |
| Brand self-reference | Brand name appears in every brief; density is moderate at the brief level but not yet controllable until final copy exists | Avg. 3.05 mentions/file in notes; must be capped in final copy |
| Structural consistency | Strong: all 55 briefs follow the same 6-part template and map to a defined pillar/hub taxonomy (Pillar A, Pillar B, Hubs 2–9) | Useful foundation — preserve this taxonomy during rewrite |
| Depth signals | Gap Opportunity fields show real strategic thinking (POV, differentiation angle) but this POV is not yet backed by evidence, data, or original examples in the outline | Manual review of all 55 Gap Opportunity fields |

### Article-Level Pattern Diagnosis (applies to all 55, in varying degrees)

| Category | Typical Score Today (est., 0–100 scale) | Primary Gaps |
|---|---|---|
| Content depth & research | Low–Medium | No sourced statistics, no primary data, no named studies with dates/links, sub-topics named but not evidenced |
| Structure & readability | Medium | Good heading logic; no visual variety (all-prose plan); no answer-first pattern specified; no summary/TL;DR box |
| SEO optimization | Medium | Titles occasionally over length; no explicit keyword-in-heading plan beyond H1; no external authoritative links planned; no defined URL/meta QA |
| Visual value | Low | Only 1 comparison table and 4 "grid" concepts across 55 briefs; no charts, frameworks, step-by-step call-outs, or decision trees specified |
| Trust/E-E-A-T | Low | No named author/bio, no dated sources, no methodology, no "how we know this" signal |
| Internal architecture | Medium–High | Linking notes exist for every article and map to a real site structure — a strength to preserve |
| Cross-corpus uniqueness | Medium | 2 confirmed cannibalizing pairs out of 55; must be resolved before rewrite begins |

**Bottom line:** the raw material (angles, keyword targets, linking maps, taxonomy) is strategically sound. What is missing is *evidence, visual translation of ideas, and finished prose* — exactly what the instruction guide below is built to produce, consistently, across all 55 items.

---

## Part 3 — Guiding Principles for the Agent

These apply to every one of the 55 articles, without exception:

1. **Show, don't just tell, and don't just describe — evidence.** Every claim of the form "X% of..." or "studies show..." must be traceable to a real, named, dated source with a link. If a verifiable source cannot be found, **rewrite the claim as a qualitative, defensible statement or remove it.** Never invent a statistic. This is a zero-tolerance rule.
2. **Improve by restructuring, not by padding.** Do not hit a word count by writing longer paragraphs. Depth comes from adding a well-chosen table, framework, diagram, or worked example — not from extra adjectives. If a section can be said more clearly in a table than in three paragraphs, use the table.
3. **One visual concept per major idea.** Every H2 section that presents comparative, sequential, hierarchical, or quantitative information should get a matching visual format (see Part 5's decision framework) — not decorative images for their own sake.
4. **Preserve strategic intent.** Keep each brief's Search Intent, Gap Opportunity, Conversion Angle, and internal-linking map intact unless research reveals they are factually wrong. The agent is upgrading execution, not re-strategizing the business.
5. **Cap self-promotion.** Maximum one natural brand mention in the body (author-context or a single closing CTA sentence). Convert "At ASTRELL, we..." framing into educational, third-person authority statements. Brand belongs in the CTA and byline, not the analysis.
6. **Resolve duplicates before writing.** Two topic pairs currently overlap (see Part 2). Fix per the rule in Part 4, Step 0, before either article is drafted.
7. **Write for humans first, machines second — but satisfy both.** Content must read naturally to a design/marketing executive audience while also being structured (headings, lists, tables, defined terms) so it can be cleanly extracted and cited by AI answer engines.

---

## Part 4 — The Step-by-Step Protocol (Run Per Article, All 55)

### Step 0: Pre-Flight Check (run once, before touching any article)

- Build a master index of all 55 titles, primary keywords, and assigned Pillar/Hub.
- Flag and resolve cannibalizing pairs:
  - `article_29` vs `article_53` ("Custom GPTs and Claude Projects for Brand Consistency") — **differentiate**: keep one as the practical setup guide (Hub 2, marketing/copy audience) and re-angle the other toward design-team visual/brand-guardian governance (Hub 9), with distinct primary keywords, distinct H1s, and a mutual internal link ("related reading") rather than two pages competing for the same query.
  - `article_06` vs `article_51` ("Custom AI Instructions" guides) — apply the same differentiate-or-merge decision; if the angles cannot be made genuinely distinct, **merge into the stronger brief** and redirect/retire the other topic slot, replacing it with a new, non-overlapping topic from the same Hub.
- Confirm which production source is authoritative for existing body copy: if `lib/batch-XX-posts.ts` files are accessible in the working repository, treat the live published text (not this brief) as the Phase-1 audit baseline. If they are not accessible, treat the brief's outline as the approved skeleton and proceed to full drafting.

### Step 1: Individual Article Audit (score before you touch anything)

For each article, score 0–100 across five weighted categories before editing, and record the score in a tracking log:

| Category | Points | What to Check |
|---|---|---|
| Content Quality & Depth | 30 | Does every sub-claim have support? Are examples specific, not generic? Is there an original framework, checklist, or worked example unique to this piece? |
| SEO Optimization | 25 | Title 50–60 characters, one clear primary keyword reflected in H1 + 2–3 H2s naturally, meta description accurate and under 155 characters, 3–10 internal links, 3–8 outbound links to tier 1–3 sources, clean slug |
| Trust / E-E-A-T Signals | 15 | Named author with bio, dated and linked sources, transparent methodology where data is cited, no fabricated statistics |
| Structure & Visual Value | 15 | At least one purpose-built visual element (table, diagram, framework grid, or step sequence) per major section; answer-first section openers; scannable formatting |
| AI-Citation Readiness | 15 | Each key section is self-contained enough to be quoted out of context; consistent terminology for the core entity/topic; presence of a short answer-first summary near the top |

Record: current score, target score (minimum 80/100 for publish), and the top 3 issues to fix.

### Step 2: Research Pass

- Identify 4–8 real, current (prefer sources from the last 24 months, always with a publish date) tier 1–3 sources per article: industry research firms, standards bodies, major publications, primary vendor documentation, or peer-reviewed/industry benchmark reports. Government, academic, and major trade-press sources outrank vendor blogs; avoid low-authority SEO-farm content entirely.
- For every existing vague claim in the brief (e.g., "studies show fragmented branding erodes trust"), replace it with a specific, attributed version, e.g.:
  *"[Named report], published [date] by [publisher], found [specific finding] among [sample/population] ([Source name](https://example.com))."*
- If no defensible source exists for a claim, rewrite it as the agency's own professional opinion/experience framing (clearly signaled as such) rather than as an implied statistic.
- Capture at least one original, agency-specific example, mini case study, or worked scenario per article — this is what differentiates the piece from generic competitor content and satisfies the "Originality" and "Experience" trust signals.

### Step 3: Structural Rebuild

- Expand the brief's H2 outline into a full logical flow: **Answer-first intro (2–4 sentences stating the core takeaway) → context → depth sections → practical application → summary/next step.**
- Add a short "In This Article" or key-takeaways box near the top (3–5 bullets) for scannability and AI-extraction.
- For every major section, select and build the single best-fit visual format using the decision framework in Part 5.
- Add or upgrade an FAQ section (3–5 real, search-relevant questions with complete, self-contained answers) where the topic has genuine question-based search demand — not on every article by default, only where it adds reader value.
- Ensure heading hierarchy is clean: one H1, logical H2s, H3s only nested under a relevant H2, no skipped levels.

### Step 4: Full Copy Draft

- Write complete prose for every section — no bullet-only skeleton in the final deliverable.
- Style rules:
  - Vary sentence length; avoid three-clause rhythm repeating for more than a couple of sentences in a row.
  - Avoid generic AI-toned filler phrases: *"in today's digital landscape," "it's important to note," "dive into," "game-changer," "unlock," "seamlessly," "cutting-edge," "harness the power of," "delve," "elevate," "landscape," "robust," "tapestry," "navigate the complexities."* Replace with concrete, specific language.
  - Open each section with its main point, then support it — never bury the conclusion at the end of a paragraph.
  - Target Flesch readability 55–75 (accessible to a knowledgeable business reader, not dumbed down, not academic).
  - Keep paragraphs short enough to scan (roughly 2–4 sentences) but let complexity, not a fixed rule, decide — merge only when doing so aids comprehension.
- Reduce brand self-references to the cap described in Part 3, Principle 5.

### Step 5: SEO & Technical Finishing

- Title tag: 50–60 characters, primary keyword near the front, no keyword stuffing, drop the trailing "| ASTRELL" if it pushes the tag over 60 characters — move brand to a template-level suffix instead if the CMS supports it.
- Meta description: unique, accurate, under 155 characters, includes primary keyword naturally.
- URL slug: short, hyphenated, keyword-relevant, matches title intent.
- Internal links: verify against the article's Internal Linking Notes; keep 3–10 contextual links with descriptive (non-generic) anchor text; confirm bidirectionality where feasible (the linked article should eventually link back).
- External links: add 3–8 outbound links to the tier 1–3 sources identified in Step 2.
- Image alt text: every image gets a specific, descriptive alt attribute (not "image1.png"); confirm hero image brief still matches the final angle of the article.
- Schema: confirm Article/BlogPosting + Person (author) + Organization + BreadcrumbList are planned; add FAQPage schema only if a genuine FAQ section was added.

### Step 6: Quality Gate (must pass before delivery)

Re-run the Step 1 scoring rubric on the finished draft. An article is only "done" when:

- Score ≥ 80/100 overall, with no category below 60% of its maximum.
- Zero unsourced statistics remain.
- At least one non-text visual element (table, diagram, framework, or step sequence) appears per major section, with no repeated visual type back-to-back.
- Title, meta, and heading checks all pass the SEO thresholds above.
- The article reads as genuinely distinct from every other of the 55 (no duplicate topic/keyword targeting remains).

If a draft fails the gate, loop back to the relevant step (research, structure, or copy) — do not ship a partial fix.

### Step 7: Per-Article Delivery Report

For each of the 55 articles, output a short changelog:

```
Article: [filename / title]
Before Score: XX/100   After Score: XX/100
Key changes: [research added, visuals added, structure changes, SEO fixes]
Sources added: [list, with links]
Visuals added: [type + section]
Remaining flags (if any): [anything needing human review, e.g., a claim that could not be sourced]
```

After all 55 are complete, produce one master summary table (Article | Old Score | New Score | Visuals Added | Sources Added | Status) so the team can see batch-wide progress at a glance.

---

## Part 5 — Visual Element Decision Framework

Use this table to choose the right format instead of defaulting to prose or to the same element every time. Never use the same visual type twice in a row within one article.

| If the section presents... | Use this format | Notes |
|---|---|---|
| Two or more options being weighed against shared criteria (e.g., monolithic vs. house-of-brands architecture) | **Comparison table** | Same attribute labels, same order, across every option so rows align |
| A repeatable methodology or numbered process (e.g., a 5-pillar framework, a 4-phase redesign process) | **Framework/step diagram** or **numbered step sequence** | Name each step; keep to 3–7 steps; add a one-line "why it matters" under each |
| A ranked list of factors, causes, or contributing elements | **Lollipop or ranked bar visual concept**, described precisely enough for a designer/chart tool to build it (label, value, source) | Only use where an actual value or ranking exists — don't force numbers that don't exist |
| A proportion or "parts of a whole" idea (e.g., where time/budget goes in a workflow) | **Donut or stacked breakdown** | Requires real or clearly-labeled illustrative data; label as illustrative if not survey-derived |
| A trend over time (adoption curves, cost changes, performance improvements) | **Line or area chart concept** | Only when there is a real time-series data point to plot |
| A decision point or "when to use X vs Y" | **Decision framework grid / flow** | Two-axis grid (e.g., complexity vs. budget) or simple if/then flow |
| Dense reference information a reader will scan rather than read (specs, checklists, glossary terms) | **Information grid / bento-style summary card** | Group related facts visually; avoid long unbroken lists |
| A common mistake and its fix | **Before/After or Problem→Fix table** | Two-column format works well for "mistakes" or "audit" style articles |
| A concept needing a plain-language anchor | **Definition callout box** | One term, one crisp definition, optionally one example |
| Frequently-asked, distinct sub-questions | **FAQ block** | Full, self-contained answers; only where genuine search/reader demand exists |

**Rule of thumb:** if you can't name the exact chart/table/diagram type and the exact data or steps that will populate it, the section isn't ready for a visual yet — go back and finish the research or structure first. Do not add a visual just to hit a quota.

---

## Part 6 — Cross-Cutting Consistency Rules (Apply Uniformly Across All 55)

- **Voice and tone:** authoritative, practical, executive-advisory — consistent with the existing brief's "Conversion Angle" tone descriptions. Do not let voice drift between articles.
- **Taxonomy integrity:** preserve each article's assigned Pillar/Hub label; do not silently reassign an article to a different pillar without flagging the change and the reason (mirrors the existing "Old → New Record" convention already used in the source files).
- **Linking discipline:** every article must have a minimum of 3 internal links and link out to at least 3 other pages (no orphans, no dead ends); confirm the two previously-duplicate articles now link to each other as "related reading" rather than competing for the same query.
- **Freshness metadata:** set/update a `lastUpdated` date only when facts, data, or recommendations materially changed; keep the original publish date intact.
- **Naming and file hygiene:** keep the existing filename and slug conventions; note any slug change explicitly in the delivery report, since it affects redirects.
- **Human review flag:** if the agent cannot find a credible source for a claim central to an article's argument, it must flag that claim explicitly for human review rather than deleting the point or inventing support.

---

## Part 7 — Quick-Reference Checklist (One-Page Version for the Agent)

- [ ] Resolved all duplicate/cannibalizing topics before drafting
- [ ] Scored the article before and after (0–100, 5 categories)
- [ ] Replaced every unsourced statistic with a dated, linked, tier 1–3 source — or removed/reframed the claim
- [ ] Added one original example, mini case study, or agency-specific insight
- [ ] Rebuilt structure: answer-first intro, key-takeaways box, logical H2/H3 hierarchy
- [ ] Added at least one purpose-built visual per major section, no type repeated back-to-back, chosen via the Part 5 framework
- [ ] Added/upgraded FAQ only where genuine reader demand exists
- [ ] Full prose written for every section — no leftover bullet-only outline
- [ ] Removed AI-cliché phrases and varied sentence rhythm
- [ ] Capped brand self-mentions to one in-body reference
- [ ] Title 50–60 characters, meta description under 155 characters, clean slug
- [ ] 3–10 internal links (bidirectional where possible), 3–8 outbound authoritative links
- [ ] Alt text added for every image; schema plan confirmed (Article/Person/Organization/BreadcrumbList, +FAQPage if applicable)
- [ ] Final score ≥ 80/100 with no category below 60% before delivery
- [ ] Delivery report written (before/after score, changes, sources, visuals, open flags)

---

*This guide is designed to be applied identically to all 55 articles so that quality, tone, and structure remain consistent across the full batch, while still allowing each article's unique angle, audience, and Gap Opportunity to shine through.*