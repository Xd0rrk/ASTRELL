# Task: Update Article Preview Images for Blog (54 of 61 Articles)

## Context
- Total articles: 61
- Articles to leave untouched (images already correct): 6 — [LIST ARTICLE IDs/TITLES/URLs HERE]
- Articles needing new preview images: 54 — [LIST ARTICLE IDs/TITLES/URLs HERE, or point to the source: CMS export, sitemap, folder path, etc.]

## Objective
For each of the 54 articles, read the full article content and select or generate a single high-quality, topic-relevant image to use as its preview/card image. Replace the existing image with this new one. Do not touch anything else about the article.

## Step-by-step process
1. Read the ENTIRE article from start to finish — not just the title, excerpt, or the existing image caption — before generating or selecting any image. Full context matters: the real subject of the article, the specific tools/techniques/examples it covers, and its overall tone should all come from having read the whole thing, not guessed from a snippet.
2. Choose or create one image that clearly and specifically represents that article's content.
3. Confirm the image is not a duplicate or near-duplicate of any image already used elsewhere in this batch of 54 — keep a running list of images used so far and check new choices against it before finalizing.
4. Resize, compress, and export the image to the specs below.
5. Replace the article's existing preview image with the new file, keeping the same filename/slug pattern used by the CMS unless told otherwise.
6. Log each article → chosen image → short justification (1 sentence) in a summary table at the end, so the work can be spot-checked.

## Image content requirements
- Every single image must look genuinely beautiful — striking composition, good lighting, rich color/contrast, and a polished, editorial/premium feel. This is a design agency's blog; the images are part of the brand, not filler.
- Every image must also carry real meaning tied to that specific article — a viewer should be able to look at the image and get a sense of what the article is about before reading a word of the title. Beauty alone is not enough; a gorgeous image that isn't actually about the article's topic still fails.
- Concretely: identify the core subject of the article (a specific tool, technique, workflow, role, or concept) and depict THAT — not a vague mood shot of "people in an office" or "a design studio" used as a stand-in for any tech/design article.
- Must be directly and specifically relevant to the article's actual topic — not a generic stock "blog" image.
- Currently, this exact problem exists on the live site and must be fixed: the same "team pointing at brand moodboards" photo is reused across at least 3 unrelated articles, and the same "orange spiral staircase" photo is reused across at least 2 unrelated articles. After this update, no two of the 54 articles may share the same or a visually similar image (same subject, same stock photo series, same AI-generation seed/style repeated, etc.).
- One article ("The Graphic Designer's Guide to Custom AI Instructions") currently has a broken/missing image showing raw alt text instead of a picture. Treat any broken/missing image as highest priority to fix.
- No obvious AI-generation artifacts: no distorted hands/faces, uncanny expressions, nonsensical text in the image, or overly "plastic" AI-render look.
- If people appear, they must look realistic, natural, and photographic in quality.
- For articles about a specific named psychologist, philosopher, historical figure, or other real person, use an accurate and appropriate visual representation of that person or a clearly relevant, contextually accurate visual (e.g., a real portrait/photo if usable and licensed, or a tasteful, respectful editorial-style illustration if not) — do not substitute an unrelated generic person.
- Overall aesthetic across all 54 images should feel professional, polished, and visually consistent as a set (similar tone, color grading, and quality level), even though each image is unique.
- Avoid low-resolution, blurry, watermarked, or clearly low-effort images.

## Technical / delivery specs
- Format: [SPECIFY — e.g., WebP preferred, JPEG fallback]
- Target dimensions: [SPECIFY exact px, e.g., 1200x630 for card previews — confirm against the site's actual card component]
- Max file size: [SPECIFY, e.g., under 150KB per image]
- Compression: use efficient compression that preserves visual quality at preview size (no visible artifacting)
- Naming convention: [SPECIFY, e.g., match existing slug-based filenames]
- Output location: [SPECIFY folder/CMS field to upload to]

## Important discovery about the existing setup
- The featured image field is shared: it's used as BOTH the article preview/card image AND the hero image at the top of the full article page. Fixing one image per article fixes both locations — there is no separate "card image" vs "article image" to manage.
- Each article already appears to have its own written image description/caption stored in the data (visible as debug/placeholder overlay text on the hero image, e.g. "IMAGE: A sleek workspace showing a split workflow: automated batch-processing thumbnails on one screen, and high-resolution manual retouching with a stylus on the other."). This means the correct, specific image concept for each article was likely already written but never correctly generated or attached — the current images are wrong/reused/generic despite this description existing.
- Before creating new image concepts from scratch, locate this existing per-article image description field in the CMS/codebase and use it as a starting reference. However, this description alone is NOT a substitute for reading the full article — always read the whole article first, then cross-check it against the existing description, and adjust or improve the image concept if the description misses something important the article actually covers. Only write a new description if one doesn't already exist for that article.
- Also check why this caption text is rendering as visible overlay text on the live hero image instead of being used silently as alt text/image generation input — this looks like a bug (an unrendered placeholder or a broken template) and should be fixed as part of this task so the caption no longer displays visibly to users.

## Explicit boundaries
- Do NOT modify article text, titles, tags, metadata, URLs, or publish dates.
- Do NOT touch the 6 articles listed as already correct.
- Only the preview/card image field should change — do not alter any in-article body images unless separately instructed.

## Definition of "done" for each image
Before finalizing an image, confirm it passes both of these:
1. Beauty check: Would this stand on its own as an attractive, professional image even without the article attached? (Sharp, well-composed, well-lit, no visual clutter, no AI artifacts.)
2. Meaning check: If someone only saw this image and the title, would they correctly guess the article's actual topic? (Not just "design" or "AI" in general — the specific subject: e.g. photo retouching workflows, prompt libraries, Custom GPT setup, moodboarding, etc.)
An image that only passes one of these checks is not acceptable — redo it.

## Deliverable
- All 54 updated image files, correctly named and sized, uploaded/replaced in [CMS/repo/folder].
- A summary table: Article title | Old image (if applicable) | New image filename | 1-sentence rationale.
- Flag any article where you were unsure of the best image choice or couldn't find a suitable unique image, rather than guessing.