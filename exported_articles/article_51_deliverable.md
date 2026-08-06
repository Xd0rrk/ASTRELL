# Article 51 Deliverable: The Graphic Designer's Guide to Custom AI Instructions: Building a Prompt System

## 1. Research Brief
- **Search Intent:** Informational & Tactical. Graphic Designers, Art Directors, and Creative Leads looking to standardize their AI workflows rather than starting from scratch with generic ChatGPT or Midjourney prompts every time.
- **SERP Analysis:** Many articles just list "Top 10 Midjourney Prompts." Gap: Explaining how to build a *Prompt System* using Custom GPTs (or Claude Projects) that acts as an automated translator between creative briefs and technical image generation parameters.
- **Keyword Set:** 
  - *Primary:* custom AI instructions graphic design
  - *Secondary:* midjourney prompt system, ChatGPT design workflows, personal GPT for designers
- **Sources Gathered:** 
  1. Transitioning from ad-hoc prompting to building reusable AI workflows.
  2. Role Definition: Setting clear instructions in a Custom GPT to act as a brief-to-prompt translator.
  3. Integrated Workflow: Ideation (ChatGPT) -> Visual Exploration (Midjourney) -> Refinement (Photoshop/Figma).
  4. Bridging the gap: Using AI for the base asset and human software for the professional finish.
- **Gap Opportunity:** Emphasize systemization. ASTRELL relies on systems for scale; show designers how to build a scalable AI assistant that understands their specific brand aesthetics.
- **Conversion Angle:** Hub 9 (AI Design & Generative Workflows) - *Note: This is a Pillar B topic replacing old spatial design content.* Target service is Digital Product Design / Creative Direction. Tone is instructional, technical, and forward-thinking.

## 2. Old → New Record
- **Old Title:** Executive Brand Advisory: Transforming Strategic Position into Growth
- **New Title:** The Graphic Designer's Guide to Custom AI Instructions: Building a Prompt System
- **Reason:** Old title was an internal ops description. New title addresses verified, high-volume search demand for AI design workflows (Master Instructions candidate #1).

## 3. Final Article Copy
*See `lib/batch-11-posts.ts` for the production code injection.*

- **SEO Title:** Custom AI Instructions for Graphic Designers: Prompt Systems
- **Meta Description:** Learn how to build a custom AI prompt system for graphic design. Discover workflows for using ChatGPT to generate precise, brand-aligned Midjourney parameters.
- **Slug:** `graphic-design-custom-ai-instructions-prompt-system`
- **Pillar:** Hub 9 (AI Design Workflows) - P1 (Pillar)

### Content Structure & Headings
**1. Moving Beyond Ad-Hoc Prompting**
- The most common mistake designers make with AI is treating it like a search engine—typing in basic ideas and hoping for the best.
- Professional design requires repeatability. To achieve this, you must transition from ad-hoc prompting to building a structured **Prompt System**.

**2. Building Your "Brief Translator" GPT**
- The foundation of your system is a Custom GPT (or Claude Project). Instead of writing image prompts directly, you write instructions for your AI to write the prompts for you.
- Define the Role: *"You are an expert Art Director. Translate my design briefs into optimized Midjourney prompts using technical parameters (--ar, --s, --c)."*
- Feed the GPT a knowledge file containing your best-performing prompt structures (e.g., [Subject] + [Artistic Style/Medium] + [Lighting/Environment] + [Camera Settings]).

**3. The Integrated Design Workflow**
- AI should be a conceptual collaborator, not a final producer.
- **Ideation (ChatGPT):** Flesh out creative briefs and mood boards.
- **Visual Exploration (Midjourney):** Rapid prototyping. Generate dozens of variations to test visual resonance.
- **Iteration:** Treat AI outputs as first drafts. Feed results back into your GPT to ask for specific refinements.

**4. Establishing Brand Constraints**
- A good prompt system prevents the AI from generating off-brand imagery. 
- Teach your Custom GPT your specific design constraints. For example: "Always suggest a minimalist, desaturated color palette," or "Never use 3D render terminology; always emulate 35mm film photography."

**5. Bridging the Gap: Human Finishing**
- AI-generated images lack editable layers, precise vectorization, and professional typography.
- The professional workflow uses the AI for the *base asset* or conceptual foundation, but the final execution—layer separation, masking, and typography—must happen manually in Photoshop or Figma.

## 4. Internal Linking Notes
- Link to: `/services/ui-ux-design` (Anchor: "ASTRELL digital product design")
- Link to: `/blog/commercial-brand-photography-art-directing-visual-assets` (Anchor: "art direction principles")

## 5. Schema Markup Recommendation (JSON-LD)
- Standard BlogPosting schema.

## 6. Image Briefs
- **Hero Image:** `astrell_ai_prompt_system_hero.png`
  - *Brief:* A sleek, dark-mode split-screen graphic. On the left, a structured JSON or code-like view of a "Custom Instructions" prompt template. On the right, a beautiful, high-fidelity Midjourney output (like an abstract 3D glass rendering) that resulted from that prompt.
