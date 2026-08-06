# Article 30 Deliverable: Custom Iconography & Asset Libraries for Scalable Product UI

## 1. Research Brief
- **Search Intent:** Technical & Informational. UI Designers, Product Designers, and Front-End Developers seeking to build a rigorous, scalable iconography system that bridges Figma and React.
- **SERP Analysis:** General articles cover basic vector design. Gap: Bridging the exact mathematical principles of icon design (stroke weight, pixel grid snapping) with front-end React architecture (SVGR, tree-shaking, accessibility).
- **Keyword Set:** 
  - *Primary:* custom iconography product ui
  - *Secondary:* svg asset libraries react, scalable icon design system, stroke weight grid alignment
- **Sources Gathered:** 
  1. The necessity of a strict mathematical grid (e.g., 24x24px) and precise stroke weights (e.g., 2px).
  2. The workflow from design (Figma) to code (using `@svgr/cli` to convert SVGs to React components).
  3. Front-end implementation details: `currentColor` properties, tree-shaking for performance, and standardizing the `<Icon />` wrapper component.
- **Gap Opportunity:** Emphasize that an icon library is not just a collection of graphics; it is a critical engineering component. Detail the pipeline from Figma vector nodes to optimized React code.
- **Conversion Angle:** Hub 1 (Web Engineering) or Hub 4 (Graphic Design). Target service is UI/UX Architecture or Web Engineering. Tone is highly technical, precise, and practical.

## 2. Old → New Record
- N/A (Keep decision)

## 3. Final Article Copy
*See `lib/batch-06-posts.ts` for the production code injection.*

- **SEO Title:** Custom Iconography & Asset Libraries for Scalable UI
- **Meta Description:** Learn how to engineer scalable custom iconography systems. Master SVG grid alignment, stroke weights, and React component packaging for product UI.
- **Slug:** `custom-iconography-asset-libraries-scalable-product-ui`
- **Pillar:** Hub 4 (Graphic & Print Design)

### Content Structure & Headings
**1. Beyond "Off-the-Shelf" Icons**
- Why using generic icon libraries (like FontAwesome or Material) dilutes enterprise brand equity.
- The business case for bespoke iconography: complete ownership of visual metaphors and exact alignment with brand typography.

**2. The Architecture of a Vector Grid**
- Designing on a strict 24x24px grid.
- Defining precise "Safe Zones" to ensure optical balance (preventing a dense "home" icon from looking heavier than a thin "search" icon).

**3. Stroke Weight and Pixel Snapping**
- The mathematics of scalable UI: Using a fixed 2px stroke weight.
- The critical importance of "Pixel Snapping." Why half-pixels cause blurry, anti-aliased edges on lower-resolution screens, and how to avoid them.

**4. The Figma to React Pipeline**
- Automating the handoff.
- Using tools like `@svgr/cli` to automatically strip unnecessary XML metadata from Figma exports and convert raw SVGs into clean, functional React components.

**5. Building the `<Icon />` Component Wrapper**
- Creating a robust React wrapper that handles sizing, styling (using `fill="currentColor"`), and accessibility (`aria-label`).
- Ensuring the library is architected for "tree-shaking" so that importing one icon doesn't bloat the user's javascript bundle with hundreds of unused SVGs.

## 4. Internal Linking Notes
- Link to: `/services/web-engineering` (Anchor: "ASTRELL React engineering and asset packaging")
- Link to: `/blog/professional-graphic-design-systems-global-brand-cohesion` (Anchor: "enterprise graphic design systems")

## 5. Schema Markup Recommendation (JSON-LD)
- Standard BlogPosting schema.

## 6. Image Briefs
- **Hero Image:** `astrell_iconography_grid_system_hero.png`
  - *Brief:* A macro view of a bespoke UI icon (e.g., a complex data node or gear) mapped out on a glowing cyan 24x24px grid with bezier handles and stroke-weight annotations visible against a dark mode background.
