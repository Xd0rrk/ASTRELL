You need to audit and standardize the entire blog system before making any UI changes.

### Step 1: Audit the blog source

* Identify where every blog post is currently stored.
* Determine how many blogs exist in total.
* Check whether each blog is stored:

  * in Firebase,
  * in the local/static system,
  * or in both.
* Produce a summary showing:

  * Total number of blogs.
  * Number stored in Firebase.
  * Number stored locally.
  * Any duplicates or missing posts.

### Step 2: Consolidate the data

* Ensure **every blog is available from a single source of truth**.
* Do **not** leave the system split between Firebase and local files.
* If Firebase is the intended production source, migrate all local blogs into Firebase.
* If local files are the intended production source, migrate Firebase blogs into the local system.
* Remove duplicates and keep one canonical version of every blog.
* Verify that all blog metadata is consistent (slug, title, description, cover image, publish date, category, tags, etc.).

### Step 3: Optimize the blog listing

The blog page must be optimized for performance.

Requirements:

* Do **not** load every blog when the page opens.
* Initially display only the first **6 blog posts**.
* Add a **"Load More"** button below the list.
* Each click should load **6 additional blog posts**.
* Do not re-fetch already loaded blogs.
* Hide or disable the button once all blogs have been displayed.

### Step 4: Performance optimization

Optimize for the fastest possible loading speed.

Requirements:

* Fetch only the fields required for the blog listing.
* Lazy-load images.
* Compress and optimize images.
* Cache blog data where appropriate.
* Avoid unnecessary Firebase reads.
* Avoid downloading all blog content on the listing page.
* Load full blog content only when a user opens an individual blog.
* Minimize JavaScript execution.
* Keep network requests as small as possible.
* Ensure excellent Lighthouse performance for the blog section.

### Step 5: Verification

After implementation, verify:

* Every blog is accessible.
* No blog is missing.
* No duplicate blogs exist.
* Pagination/"Load More" works correctly.
* Performance remains fast even with 60+ blog posts.
* The implementation is production-ready, scalable, and maintainable.

Do not make assumptions. First inspect the current architecture, identify where every blog is stored, then implement the necessary migration and optimizations based on your findings.
