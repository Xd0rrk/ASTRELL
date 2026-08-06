Generate **20 sample images for each of the 4 image buckets**. These images are **for testing purposes only** and should act as placeholder/demo content.

Requirements:

* Generate 20 images for each bucket (80 images total).
* Upload all generated images to their respective Firebase Storage buckets.
* Create the corresponding database records in Firestore for each image, including all required metadata (ID, title, URL, bucket/category, timestamps, etc.).
* Ensure the image URLs and metadata are correctly linked so the frontend can retrieve them from the database.
* Update the frontend to fetch image data dynamically from Firestore instead of using hardcoded or local data.
* Verify that each gallery or image section displays the uploaded test images correctly.
* Organize the test data so it can be easily deleted or replaced when real production content is available.

The goal is to create a complete end-to-end test flow: **generate → upload → store metadata → fetch from Firestore → display in the frontend**. This is temporary test data and should be easy to remove or replace later.



When generating the test images, use the following service categories as the creative themes. The images should look like **real portfolio and agency showcase content**, not generic placeholders. They should be modern, professional, high-quality, and suitable for displaying on the website.

Generate images inspired by these topics:

### Branding

* Branding
* Brand Identity
* Logo Design
* Rebranding
* Brand Guidelines
* Brand Strategy
* Brand Positioning
* Business Card Design
* Corporate Stationery

### Website & Development

* Website Design
* Website Development
* Landing Pages
* E-commerce Websites
* Portfolio Websites
* Business Websites
* Website Redesign
* Website Maintenance
* Responsive Web Design

### UI/UX Design

* UI Design
* UX Design
* Wireframing
* Prototyping
* User Flow Design
* Mobile App UI Design
* Dashboard Design
* Design Systems

### Graphic Design

* Social Media Design
* Social Media Management
* Posters
* Banners
* Flyers
* Brochures
* Catalogs
* Business Cards
* Menus
* Presentation Design
* Infographics
* Custom Graphics

### Print & Packaging

* Print Design
* Packaging Design
* Label Design
* Product Packaging

### Creative Services

* Creative Direction
* Motion Graphics
* 2D Character Design
* Illustration
* Visual Content Creation

### Marketing

* Marketing Strategy
* Digital Marketing
* SEO
* Local SEO
* Content Strategy
* Campaign Design
* Email Marketing Design

### Photography *(Available only in Amman, Jordan)*

* Product Photography
* Brand Photography
* Corporate Photography
* Social Media Photography
* Event Photography (subject to availability)

### Consulting

* Brand Consulting
* Design Consulting
* Marketing Consulting
* Website Consulting
* Creative Strategy
* UX Audits

## Image Requirements

* Use these topics as inspiration for the generated images.
* Create realistic agency portfolio work, mockups, website previews, branding presentations, UI screens, marketing materials, product showcases, and professional design concepts.
* Maintain a modern, premium, and consistent visual style across all images.
* Use realistic typography, layouts, colors, and compositions appropriate for a creative agency.
* Vary the designs so there are no obvious duplicates.
* Optimize image dimensions and file sizes for web performance while preserving visual quality.
* Assign each generated image to the correct Firebase Storage bucket and create the corresponding Firestore metadata so the frontend can display them dynamically.
* These are **temporary demo assets** for development and testing, but they should closely resemble production-quality portfolio content.
