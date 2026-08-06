import { NextRequest, NextResponse } from 'next/server';
import { BLOG_PREVIEWS } from '@/lib/generated-blog-previews';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PAGE_SIZE = 6;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page     = Math.max(1, parseInt(searchParams.get('page')     || '1',  10));
  const pageSize = Math.min(24, parseInt(searchParams.get('pageSize') || String(PAGE_SIZE), 10));
  const search   = (searchParams.get('search') || '').toLowerCase().trim();
  const category = searchParams.get('category') || '';
  const service  = searchParams.get('service')  || '';
  const tag      = searchParams.get('tag')       || '';
  const sort     = searchParams.get('sort')      || 'newest';

  // ── Filter ────────────────────────────────────────────────────────────────
  let result = [...BLOG_PREVIEWS];

  if (category && category !== 'All') {
    result = result.filter(p => p.category === category);
  }
  if (service && service !== 'All Services') {
    result = result.filter(p => p.service === service);
  }
  if (tag) {
    result = result.filter(p => p.tags.includes(tag));
  }
  if (search) {
    result = result.filter(p =>
      p.title.toLowerCase().includes(search)        ||
      p.excerpt.toLowerCase().includes(search)      ||
      p.tags.some(t => t.toLowerCase().includes(search)) ||
      p.category.toLowerCase().includes(search)    ||
      p.author.name.toLowerCase().includes(search) ||
      p.service.toLowerCase().includes(search)
    );
  }

  // ── Sort ──────────────────────────────────────────────────────────────────
  if (sort === 'oldest') {
    result.sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime());
  } else if (sort === 'readTime') {
    result.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
  } else {
    // newest (default)
    result.sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime());
  }

  const total    = result.length;
  const start    = (page - 1) * pageSize;
  const posts    = result.slice(start, start + pageSize);
  const hasMore  = start + pageSize < total;

  return NextResponse.json(
    { posts, total, page, pageSize, hasMore },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    }
  );
}
