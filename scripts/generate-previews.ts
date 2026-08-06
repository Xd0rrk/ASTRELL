import fs from 'fs';
import path from 'path';
import { BLOG_POSTS } from '../lib/blog-data';

const PREVIEWS_FILE_PATH = path.join(process.cwd(), 'lib', 'generated-blog-previews.ts');

const previewPosts = BLOG_POSTS.map(post => {
  const { sections, faq, keyTakeaways, bentoSummary, internalLinks, ...preview } = post;
  return preview;
});

const fileContent = `// AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
// Run \`npm run generate-previews\` to update this file.

import { AstrellService, JourneyStage, BlogPost } from './blog-types';

export type BlogPreview = Omit<BlogPost, 'sections' | 'faq' | 'keyTakeaways' | 'bentoSummary' | 'internalLinks'>;

export const BLOG_PREVIEWS: BlogPreview[] = ${JSON.stringify(previewPosts, null, 2)};

export function getCategories(): string[] {
  const categories = new Set(BLOG_PREVIEWS.map(post => post.category));
  return ['All', ...Array.from(categories)];
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  BLOG_PREVIEWS.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getAllServices(): string[] {
  const services = new Set(BLOG_PREVIEWS.map(post => post.service));
  return ['All Services', ...Array.from(services)];
}

export function getTrendingPosts(): BlogPreview[] {
  return BLOG_PREVIEWS.filter(post => post.trending);
}

export function getPopularPosts(): BlogPreview[] {
  return BLOG_PREVIEWS.filter(post => post.popular);
}

export function getLatestPosts(count: number = 6): BlogPreview[] {
  return [...BLOG_PREVIEWS]
    .sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())
    .slice(0, count);
}
`;

fs.writeFileSync(PREVIEWS_FILE_PATH, fileContent, 'utf-8');
console.log(`Successfully generated ${previewPosts.length} previews into lib/generated-blog-previews.ts`);
