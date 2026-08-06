# Article 27 Deliverable: Typography Hierarchy & Custom Font Design for Modern Brands

## 1. Research Brief
- **Search Intent:** Informational & Technical. Lead Designers, Brand Directors, and Front-End Developers seeking to understand how to design and implement robust typography systems that balance brand identity with web performance.
- **SERP Analysis:** Results focus heavily on basic CSS font sizing or superficial font pairing. Gap: The mathematical foundation of typography (modular scales) and the technical realities of web font performance (Cumulative Layout Shift, subsetting, font-display swapping).
- **Keyword Set:** 
  - *Primary:* typography hierarchy brand design
  - *Secondary:* custom font design branding, typography scale ratio guide, optical kerning tracking web
- **Sources Gathered:** 
  1. The mathematics of Modular Scales for consistent vertical rhythm.
  2. The distinction between Optical vs. Metric Kerning.
  3. Web font performance optimization strategies to prevent FOIT (Flash of Invisible Text) and CLS (Cumulative Layout Shift).
- **Gap Opportunity:** Treat typography not just as art, but as data. Explain how bespoke lettering must be technically optimized for modern web architecture to avoid harming SEO and user experience.
- **Conversion Angle:** Hub 4 (Graphic & Print Pillar). Target service is Graphic & Print Design. Tone is precise, mathematical, and technical.

## 2. Old → New Record
- N/A (Keep decision)

## 3. Final Article Copy
*See `lib/batch-06-posts.ts` for the production code injection.*

- **SEO Title:** Typography Hierarchy & Custom Font Design Guide
- **Meta Description:** Master typography hierarchy and custom font design. Learn modular scales, optical kerning, and web font performance optimization for enterprise brands.
- **Slug:** `typography-hierarchy-custom-font-design-modern-brands`
- **Pillar:** Hub 4 (Graphic & Print Design)

### Content Structure & Headings
**1. Typography as Brand Voice**
- How typefaces communicate brand personality before a single word is read.
- The strategy of pairing a bespoke Display font with a highly legible geometric Sans-Serif for body copy.

**2. The Mathematics of Modular Scales**
- Why designers should never guess font sizes.
- Using fixed mathematical ratios (e.g., Major Third at 1.250) to create harmonious headers (H1 through H6) that scale beautifully across breakpoints.

**3. Kerning: Optical vs. Metric**
- Explaining the difference between the embedded kerning tables (Metric) and algorithmic spacing (Optical).
- Why custom brand typography often requires painstaking manual kerning adjustments.

**4. The Engineering of Web Font Performance**
- Custom fonts look great but can destroy page load speeds and SEO.
- The importance of using WOFF2 formats and subsetting (stripping out unused glyphs).

**5. Preventing Layout Shifts (CLS)**
- How to manage the Flash of Unstyled Text (FOUT) vs. Flash of Invisible Text (FOIT).
- Utilizing `font-display: swap` and CSS size-adjust to prevent Cumulative Layout Shift (CLS) when the custom font finally renders.

## 4. Internal Linking Notes
- Link to: `/services/print-design` (Anchor: "ASTRELL typography and brand design")
- Link to: `/blog/professional-graphic-design-systems-global-brand-cohesion` (Anchor: "enterprise graphic design systems")

## 5. Schema Markup Recommendation (JSON-LD)
- Standard BlogPosting schema.

## 6. Image Briefs
- **Hero Image:** `astrell_typography_hierarchy_hero.png`
  - *Brief:* A macro view of bespoke serif typography being mathematically analyzed with grid lines, kerning markers, and golden ratio curves, overlaying a sleek dark digital interface.
