Can you analyze this website and recommend the best database design?

Specifically, I'd like you to answer:

* Should each image category have its own bucket, or should we use a single bucket with folders/paths and metadata?
* What buckets (or storage containers) should we create?
* What database tables should we create to manage the uploaded files and their metadata?
* Which image collections should be completely separate?

Current image categories include:

* Landing page showcase gallery (limited to around 20–30 images).
* General gallery images.
* Blog/section images (images used inside content blogs).
* Any other image categories you think should be separated for scalability.

Please propose:

1. A complete bucket structure.
2. A complete database schema (tables, columns, and relationships).
3. Naming conventions for buckets and tables.
4. Whether image limits (such as the landing page showcase galaxy ) should be enforced in the database or application logic.
5. Best practices for scalability, performance, security, and future expansion.

If you think there's a better architecture than what I've described, explain why and provide your recommended design.... OUT needed to be in md file 
