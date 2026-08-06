# Article 34 Deliverable: Packaging Print Finish Technologies: Foil Stamping, Debossing & Spot UV

## 1. Research Brief
- **Search Intent:** Technical & Informational. Graphic Designers, Prepress Operators, and Brand Managers looking for specific instructions on how to properly set up Adobe Illustrator/InDesign files to execute complex print finishes.
- **SERP Analysis:** Most content is either very basic (explaining what foil is) or overly technical for press operators. Gap: A dedicated guide for *designers* on how to bridge the gap between creative vision and prepress file setup (spot colors, overprint, 100% K masks).
- **Keyword Set:** 
  - *Primary:* packaging print finish foil embossing
  - *Secondary:* hot foil stamping packaging guide, blind debossing print techniques, spot uv soft touch coating
- **Sources Gathered:** 
  1. Setting up vector files (using 100% K or dedicated Spot Colors).
  2. The necessity of separating layers and setting "Overprint" to prevent knockout gaps.
  3. Minimum line weights (0.5pt to 1pt) to prevent foil plugging.
- **Gap Opportunity:** Overtun the "low fit" hypothesis by framing this not as a print shop manual, but as an advanced prepress guide for brand designers to ensure their creative vision isn't ruined at the printer.
- **Conversion Angle:** Hub 5 (Structural & Sustainable Packaging Design). Target service is Packaging Design / Print Design. Tone is highly technical, precise, and authoritative.

## 2. Old → New Record
- **Old Title:** Packaging Print Finish Technologies: Foil Stamping, Debossing & Spot UV (Marked as REPLACE in instructions due to print-shop-level detail).
- **Decision:** OVERTURN hypothesis and KEEP. Pivoted to focus on the *designer's* responsibility (prepress file setup, vector layering, overprint settings) which is highly relevant to agency workflows.

## 3. Final Article Copy
*See `lib/batch-07-posts.ts` for the production code injection.*

- **SEO Title:** Packaging Print Finishes: Foil, Debossing & Spot UV Guide
- **Meta Description:** Master prepress setup for luxury packaging print finishes. Learn how to format vector files for hot foil stamping, blind debossing, and Spot UV.
- **Slug:** `packaging-print-finish-technologies-foil-stamping-debossing-uv`
- **Pillar:** Hub 5 (Structural & Sustainable Packaging Design) - P3

### Content Structure & Headings
**1. The Gap Between Screen and Press**
- Why a beautiful mockup in Figma or Photoshop means nothing if the prepress file is set up incorrectly. The importance of vector math in print finishes.

**2. Layer Separation and Spot Colors**
- The absolute rule of prepress: Keep CMYK artwork and print finishes separated.
- How to create a dedicated Spot Color (usually 100% Magenta or Cyan) to clearly communicate to the printer exactly where the finish block or foil die will strike.

**3. The Danger of "Knockouts": Using Overprint**
- Explaining the "Overprint" attribute in Adobe Illustrator. 
- Why failing to set a foil layer to Overprint causes the printer to "knock out" the background color, leading to disastrous white halos if the registration shifts by even 0.1mm.

**4. Hot Foil Stamping & Minimum Line Weights**
- The physics of foil stamping (heat, pressure, and metal).
- Why designers must avoid gradients and soft edges, and strictly adhere to minimum line weights (typically 0.5pt to 1pt) to prevent the foil from "plugging" or bridging across tight gaps.

**5. Blind Debossing and Spot UV Contrast**
- Best practices for structural finishes. Why blind debossing requires avoiding highly intricate details.
- How to use Spot UV not just as a random gloss, but strategically to create extreme contrast against a matte or soft-touch laminate background.

## 4. Internal Linking Notes
- Link to: `/services/packaging-design` (Anchor: "ASTRELL packaging design and prepress")
- Link to: `/blog/print-vs-digital-design-color-profiles-output` (Anchor: "managing color profiles for print")

## 5. Schema Markup Recommendation (JSON-LD)
- Standard BlogPosting schema.

## 6. Image Briefs
- **Hero Image:** `astrell_packaging_print_finishes_hero.png`
  - *Brief:* A macro, highly textured shot of a matte black rigid box featuring a combination of raised gloss Spot UV patterns and a deeply debossed gold foil logo, catching the studio light.
