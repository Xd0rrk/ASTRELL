'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ArrowUpRight,
  Clock,
  Tag,
  Sparkles,
  Check,
  X,
  SlidersHorizontal,
  TrendingUp,
  Award,
  BookOpen,
  Flame,
  Star,
  Layers,
  ArrowRight,
} from 'lucide-react';
import SmartNavbar from '@/components/SmartNavbar';
import Footer from '@/components/Footer';
import {
  BLOG_CATEGORIES,
  BLOG_SERVICES,
  BLOG_TAGS,
  TRENDING_POSTS,
  POPULAR_POSTS,
  TOTAL_BLOG_POSTS,
  type SidebarPost,
} from '@/lib/blog-metadata';
import type { BlogPreview } from '@/lib/generated-blog-previews';
import { cn } from '@/lib/utils';

// ─── Constants ────────────────────────────────────────────────────────────────
const PAGE_SIZE = 6;

// ─── Blog Card ────────────────────────────────────────────────────────────────
function BlogCard({ post, index = 0 }: { post: BlogPreview; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
      className="group flex flex-col justify-between rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/40 backdrop-blur-xl hover:border-[#FF3E00]/40 transition-all duration-500 shadow-xl hover:-translate-y-1.5"
    >
      <div>
        {/* Thumbnail Image */}
        <Link prefetch={false} href={`/blog/${post.slug}`} className="block relative h-56 overflow-hidden" aria-label={`Read article: ${post.title}`}>
          <Image
            src={post.coverImage}
            alt={post.coverAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading={index < 3 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-black/70 backdrop-blur-md text-white uppercase border border-white/10">
              {post.category}
            </span>
          </div>
        </Link>

        {/* Card Content */}
        <div className="p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
            <span>•</span>
            <time dateTime={post.isoDate}>{post.date}</time>
          </div>

          <h3 className="font-display text-xl font-bold text-white group-hover:text-[#FF3E00] transition-colors leading-snug">
            <Link prefetch={false} href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          <p className="text-neutral-400 font-light text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tag badges */}
          <div className="flex items-center gap-1.5 flex-wrap pt-2">
            {post.tags.slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-neutral-400 border border-white/5">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-6 sm:p-7 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span className="text-xs text-neutral-300 font-medium">{post.author.name}</span>
        </div>

        <Link
          prefetch={false}
          href={`/blog/${post.slug}`}
          className="text-neutral-400 group-hover:text-[#FF3E00] transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
          aria-label={`Read ${post.title}`}
        >
          Read Article
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
}

// ─── Skeleton Card (loading placeholder) ─────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden border border-white/5 bg-neutral-900/40 animate-pulse">
      {/* Image area */}
      <div className="h-56 bg-neutral-800/60" />
      {/* Content area */}
      <div className="p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-3 bg-neutral-800/60 rounded-full w-20" />
          <div className="h-3 bg-neutral-800/60 rounded-full w-24" />
        </div>
        <div className="space-y-2">
          <div className="h-5 bg-neutral-800/60 rounded-full w-full" />
          <div className="h-5 bg-neutral-800/60 rounded-full w-4/5" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-neutral-800/60 rounded-full w-full" />
          <div className="h-3 bg-neutral-800/60 rounded-full w-full" />
          <div className="h-3 bg-neutral-800/60 rounded-full w-3/4" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-5 bg-neutral-800/60 rounded-full w-16" />
          <div className="h-5 bg-neutral-800/60 rounded-full w-20" />
          <div className="h-5 bg-neutral-800/60 rounded-full w-14" />
        </div>
      </div>
      {/* Footer area */}
      <div className="p-6 sm:p-7 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-800/60" />
          <div className="h-3 bg-neutral-800/60 rounded-full w-24" />
        </div>
        <div className="h-3 bg-neutral-800/60 rounded-full w-20" />
      </div>
    </div>
  );
}

// ─── Compact Card (Trending/Popular sidebars) ─────────────────────────────────
function CompactCard({ post, rank }: { post: SidebarPost; rank: number }) {
  return (
    <Link
      prefetch={false}
      href={`/blog/${post.slug}`}
      className="group flex items-start gap-4 p-4 rounded-2xl bg-neutral-900/30 border border-white/5 hover:border-[#FF3E00]/30 transition-all duration-300 hover:-translate-y-0.5"
    >
      <span className="font-display text-3xl font-black text-white/10 group-hover:text-[#FF3E00]/30 transition-colors select-none leading-none mt-1">
        {String(rank).padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0 space-y-1.5">
        <h4 className="font-display text-sm font-bold text-white group-hover:text-[#FF3E00] transition-colors leading-snug line-clamp-2">
          {post.title}
        </h4>
        <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {post.readTime}
          </span>
          <span>•</span>
          <span>{post.category}</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Featured Post Card ───────────────────────────────────────────────────────
function FeaturedCard({ post }: { post: BlogPreview }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative group rounded-3xl overflow-hidden border border-white/15 bg-neutral-900/40 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-[#FF3E00]/50"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Visual Image Side */}
        <div className="lg:col-span-7 relative h-80 sm:h-96 lg:h-auto overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.coverAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-neutral-950/90" />
          <div className="absolute top-6 left-6">
            <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest bg-[#FF3E00] text-white uppercase shadow-lg shadow-[#FF3E00]/30 flex items-center gap-1.5">
              <Sparkles size={13} />
              Flagship Editorial
            </span>
          </div>
        </div>

        {/* Content Side */}
        <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between relative z-10 bg-neutral-950/90 lg:bg-transparent">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
              <span className="text-[#FF3E00] font-bold uppercase tracking-wider">{post.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readTime}
              </span>
              <span>•</span>
              <span>{post.wordCount} words</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white group-hover:text-[#FF3E00] transition-colors leading-tight">
              <Link prefetch={false} href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>

            <p className="text-neutral-300 font-light text-sm sm:text-base leading-relaxed line-clamp-3">
              {post.subtitle}
            </p>
          </div>

          <div className="pt-8 border-t border-white/10 flex items-center justify-between mt-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#FF3E00] relative">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-bold text-white">{post.author.name}</div>
                <time className="text-[11px] font-mono text-neutral-400" dateTime={post.isoDate}>{post.date}</time>
              </div>
            </div>

            <Link
              prefetch={false}
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-[#FF3E00] px-6 py-3 rounded-full transition-all duration-300 group/btn shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              Read Editorial
              <ArrowUpRight size={15} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface BlogClientProps {
  /** Full dataset passed from the server component — no API calls needed */
  allPosts: BlogPreview[];
}

export default function BlogClient({ allPosts }: BlogClientProps) {
  // ── Mount flag for skeleton display ───────────────────────────────────────
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  // ── Filter / sort state ────────────────────────────────────────────────────
  const [searchQuery,      setSearchQuery]      = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedService,  setSelectedService]  = React.useState('All Services');
  const [selectedTag,      setSelectedTag]      = React.useState<string | null>(null);
  const [sortBy,           setSortBy]           = React.useState<'newest' | 'oldest' | 'readTime'>('newest');

  // ── Visible count (pagination) ─────────────────────────────────────────────
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);

  // ── Newsletter state ───────────────────────────────────────────────────────
  const [email,      setEmail]      = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  // ── Track whether any filter is active ────────────────────────────────────
  const hasActiveFilters = React.useMemo(
    () => selectedCategory !== 'All' || selectedService !== 'All Services' || selectedTag !== null || searchQuery.trim() !== '',
    [selectedCategory, selectedService, selectedTag, searchQuery]
  );

  // ── Client-side filter + sort (all posts always in memory) ────────────────
  const filteredPosts = React.useMemo(() => {
    let result = [...allPosts];

    // Filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (selectedService !== 'All Services') {
      result = result.filter(p => p.service === selectedService);
    }
    if (selectedTag) {
      result = result.filter(p => p.tags.includes(selectedTag));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q)        ||
        p.excerpt.toLowerCase().includes(q)      ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)    ||
        p.author.name.toLowerCase().includes(q) ||
        p.service.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime());
    } else if (sortBy === 'readTime') {
      result.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
    } else {
      result.sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime());
    }

    return result;
  }, [allPosts, selectedCategory, selectedService, selectedTag, searchQuery, sortBy]);

  // ── Reset visible count when filters change ────────────────────────────────
  React.useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategory, selectedService, selectedTag, searchQuery, sortBy]);

  // ── Derived values ─────────────────────────────────────────────────────────
  const visiblePosts = React.useMemo(
    () => filteredPosts.slice(0, visibleCount),
    [filteredPosts, visibleCount]
  );
  const hasMore = visibleCount < filteredPosts.length;
  const featuredPost = React.useMemo(
    () => allPosts.find(p => p.featured) || allPosts[0],
    [allPosts]
  );

  // ── Load next page (instant — no network request) ─────────────────────────
  const loadMore = React.useCallback(() => {
    setVisibleCount(prev => prev + PAGE_SIZE);
  }, []);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedService('All Services');
    setSelectedTag(null);
  };

  // ────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-[#FF3E00] selection:text-white">
      <SmartNavbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
        {/* Ambient Top Animated Mesh Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[#FF3E00]/10 blur-[160px] rounded-full pointer-events-none -z-10 animate-pulse" aria-hidden="true" />

        {/* ═══════════════════════════════════════════════════════════════
            EDITORIAL HERO SECTION
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-20" aria-labelledby="blog-hero-title">
          <div className="flex items-center gap-4 text-[#FF3E00] font-serif-italic text-xl mb-6">
            <div className="h-[1px] w-12 bg-[#FF3E00]" aria-hidden="true" />
            <span>ASTRELL Editorial &amp; Thought Leadership</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <h1 id="blog-hero-title" className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]">
                Perspectives on <br />
                <span className="font-serif-italic font-normal text-white">Digital Architecture</span>{' '}
                <span className="font-cursive text-[#FF3E00] text-5xl sm:text-7xl font-normal ml-2">&amp; Craft.</span>
              </h1>
              <p className="mt-6 text-neutral-300 font-light text-base sm:text-xl max-w-2xl leading-relaxed">
                In-depth essays, technical frameworks, and strategic insights on building world-class brand experiences, high-performance web products, and measured UX.
              </p>
            </div>

            {/* Quick Performance Telemetry Badge */}
            <div className="flex items-center gap-6 px-6 py-4 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl shadow-2xl self-start lg:self-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF3E00]/10 border border-[#FF3E00]/30 text-[#FF3E00] flex items-center justify-center">
                  <Award size={20} />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-white">5.0 / 5</div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Editorial Standard</div>
                </div>
              </div>
              <div className="h-8 w-[1px] bg-white/10" aria-hidden="true" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-[#FF3E00]">+180%</div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Avg. Conversion Lift</div>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURED ARTICLE HERO SHOWCASE CARD */}
          {featuredPost && <FeaturedCard post={featuredPost} />}
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            TRENDING & POPULAR ARTICLES MODULES
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8" aria-label="Trending and Popular Articles">
          {/* Trending Articles */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#FF3E00]/10 border border-[#FF3E00]/30 text-[#FF3E00] flex items-center justify-center">
                <Flame size={16} />
              </div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
                Trending Now
              </h3>
            </div>
            <div className="space-y-3">
              {TRENDING_POSTS.map((post, i) => (
                <CompactCard key={post.slug} post={post} rank={i + 1} />
              ))}
            </div>
          </div>

          {/* Popular Articles */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Star size={16} />
              </div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
                Most Popular
              </h3>
            </div>
            <div className="space-y-3">
              {POPULAR_POSTS.map((post, i) => (
                <CompactCard key={post.slug} post={post} rank={i + 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            BENTO HIGHLIGHTS SUMMARY GRID
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-20" aria-label="Editorial Core Pillars">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF3E00]" aria-hidden="true" />
              Editorial Core Pillars
            </h3>
            <span className="text-xs font-mono text-neutral-500">ASTRELL Methodology</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-neutral-900/40 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-[#FF3E00]/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF3E00]">01 — PHILOSOPHY</span>
                <span className="text-xs font-mono text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">0 Bloat</span>
              </div>
              <h4 className="font-display text-xl font-bold text-white mb-2">Less, But Better</h4>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                Stripping away ornamental bloat to leave behind ultra-pure typography, intuitive hierarchy, and zero visual friction.
              </p>
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-[#FF3E00]/20 to-transparent blur-xl group-hover:scale-150 transition-transform pointer-events-none" aria-hidden="true" />
            </div>

            <div className="p-7 rounded-3xl bg-neutral-900/40 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-[#FF3E00]/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF3E00]">02 — ARCHITECTURE</span>
                <span className="text-xs font-mono text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">100% Bespoke</span>
              </div>
              <h4 className="font-display text-xl font-bold text-white mb-2">Zero Off-The-Shelf Templates</h4>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                Custom Next.js 15 server components and dark design systems engineered to outperform generic page builders.
              </p>
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-amber-500/20 to-transparent blur-xl group-hover:scale-150 transition-transform pointer-events-none" aria-hidden="true" />
            </div>

            <div className="p-7 rounded-3xl bg-neutral-900/40 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-[#FF3E00]/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF3E00]">03 — ATTRIBUTION</span>
                <span className="text-xs font-mono text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">+180% Lift</span>
              </div>
              <h4 className="font-display text-xl font-bold text-white mb-2">Measured ROI &amp; Conversion</h4>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                Every layout choice tied directly to real revenue performance, user retention, and enterprise valuation growth.
              </p>
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-emerald-500/20 to-transparent blur-xl group-hover:scale-150 transition-transform pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            CONTROLS: SEARCH, SORT, CATEGORY & SERVICE FILTERS
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-12 space-y-6" id="articles-explorer" aria-label="Article Explorer">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input Box */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} aria-hidden="true" />
              <label htmlFor="blog-search" className="sr-only">Search articles</label>
              <input
                id="blog-search"
                type="text"
                placeholder="Search articles, tags, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900/80 border border-white/10 rounded-full py-3.5 pl-11 pr-10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF3E00] focus:ring-2 focus:ring-[#FF3E00]/30 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white focus-visible:outline-none focus-visible:text-white"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Results Count & Sort Dropdown */}
            <div className="flex items-center gap-4 self-start md:self-auto">
              <span className="text-xs font-mono text-neutral-400">
                {hasActiveFilters ? (
                  <>
                    Showing <strong className="text-white">{visiblePosts.length}</strong> of{' '}
                    <strong className="text-white">{filteredPosts.length}</strong> matched
                  </>
                ) : (
                  <>
                    Showing <strong className="text-white">{visiblePosts.length}</strong> of{' '}
                    <strong className="text-white">{TOTAL_BLOG_POSTS}</strong> articles
                  </>
                )}
              </span>

              <div className="flex items-center gap-2 bg-neutral-900/80 border border-white/10 rounded-full px-4 py-2 text-xs font-mono">
                <SlidersHorizontal size={14} className="text-[#FF3E00]" aria-hidden="true" />
                <label htmlFor="sort-select" className="sr-only">Sort articles</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'readTime')}
                  className="bg-transparent text-neutral-300 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="newest" className="bg-neutral-900 text-white">Newest First</option>
                  <option value="oldest" className="bg-neutral-900 text-white">Oldest First</option>
                  <option value="readTime" className="bg-neutral-900 text-white">Shortest Read</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters Indicator */}
          {(selectedTag || selectedService !== 'All Services') && (
            <div className="flex items-center gap-2 flex-wrap">
              {selectedService !== 'All Services' && (
                <>
                  <span className="text-xs font-mono text-neutral-400">Service:</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                    {selectedService}
                    <button onClick={() => setSelectedService('All Services')} className="hover:text-white" aria-label={`Remove ${selectedService} filter`}>
                      <X size={12} />
                    </button>
                  </span>
                </>
              )}
              {selectedTag && (
                <>
                  <span className="text-xs font-mono text-neutral-400">Tag:</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#FF3E00]/20 border border-[#FF3E00]/40 text-[#FF3E00]">
                    #{selectedTag}
                    <button onClick={() => setSelectedTag(null)} className="hover:text-white" aria-label={`Remove ${selectedTag} tag filter`}>
                      <X size={12} />
                    </button>
                  </span>
                </>
              )}
            </div>
          )}

          {/* Category Navigation Pills */}
          <nav aria-label="Article categories">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {BLOG_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00]',
                      isActive
                        ? 'bg-[#FF3E00] text-white border-[#FF3E00] shadow-lg shadow-[#FF3E00]/20'
                        : 'bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
                    )}
                    aria-pressed={isActive}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Service Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-white/5">
            <span className="text-[11px] font-mono text-neutral-500 uppercase mr-2 flex items-center gap-1 whitespace-nowrap shrink-0">
              <Layers size={12} />
              By Service:
            </span>
            {BLOG_SERVICES.map((service) => {
              const isSelected = selectedService === service;
              return (
                <button
                  key={service}
                  onClick={() => setSelectedService(isSelected ? 'All Services' : service)}
                  className={cn(
                    'text-[11px] font-mono px-3 py-1.5 rounded-full border transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00]',
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border-emerald-500/40'
                      : 'bg-neutral-900/40 text-neutral-400 border-white/10 hover:border-white/20 hover:text-neutral-200'
                  )}
                  aria-pressed={isSelected}
                >
                  {service}
                </button>
              );
            })}
          </div>

          {/* Tag Cloud Pills */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-white/5">
            <span className="text-[11px] font-mono text-neutral-500 uppercase mr-2 flex items-center gap-1 shrink-0">
              <Tag size={12} />
              Filter by Tag:
            </span>
            {BLOG_TAGS.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={cn(
                    'text-[11px] font-mono px-3 py-1 rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00]',
                    isSelected
                      ? 'bg-white text-black font-bold border-white'
                      : 'bg-neutral-900/40 text-neutral-400 border-white/10 hover:border-white/20 hover:text-neutral-200'
                  )}
                  aria-pressed={isSelected}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            ARTICLES GRID (filtered or unfiltered)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-24" aria-label={hasActiveFilters ? 'Filtered Articles' : 'Latest Articles'}>
          {/* Section header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                <BookOpen size={16} />
              </div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
                {hasActiveFilters ? 'Filtered Articles' : 'Latest Articles'}
              </h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-bold uppercase tracking-wider text-[#FF3E00] hover:underline focus-visible:outline-none focus-visible:underline"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Skeleton loading — shown until client hydrates */}
          <AnimatePresence>
            {!mounted && (
              <motion.div
                key="skeletons"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                aria-hidden="true"
              >
                {Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No results */}
          {mounted && filteredPosts.length === 0 && (
            <div className="py-20 text-center rounded-3xl border border-white/10 bg-neutral-900/30">
              <p className="text-neutral-400 font-light text-lg">No articles found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-xs font-bold uppercase tracking-wider text-[#FF3E00] hover:underline focus-visible:outline-none focus-visible:underline"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Articles grid */}
          {mounted && filteredPosts.length > 0 && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {visiblePosts.map((post, idx) => (
                    <BlogCard key={post.slug} post={post} index={idx} />
                  ))}
                </AnimatePresence>
              </div>

              {/* Load More button */}
              {hasMore && (
                <div className="flex justify-center pt-8">
                  <button
                    id="load-more-btn"
                    onClick={loadMore}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 border border-white/10 rounded-full text-sm font-bold uppercase tracking-wider text-white overflow-hidden transition-all duration-300 hover:border-[#FF3E00]/50 hover:bg-[#FF3E00]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  >
                    <span>Load More Articles</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    {/* Remaining count indicator */}
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF3E00] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                      {Math.min(filteredPosts.length - visibleCount, PAGE_SIZE)}
                    </span>
                  </button>
                </div>
              )}

              {/* End of results */}
              {!hasMore && visiblePosts.length > PAGE_SIZE && (
                <p className="text-center text-xs font-mono text-neutral-500 pt-4">
                  You&apos;ve reached the end — {visiblePosts.length} article{visiblePosts.length !== 1 ? 's' : ''} total.
                </p>
              )}
            </div>
          )}
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            EDITORIAL NEWSLETTER CTA BANNER
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden border border-white/15 bg-neutral-900/60 backdrop-blur-xl mb-16" aria-label="Newsletter Signup">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF3E00]/15 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
          <div className="max-w-3xl relative z-10 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF3E00] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF3E00]" aria-hidden="true" />
              PRIVATE EDITORIAL INSIGHTS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Get ASTRELL Essays Delivered <br className="hidden sm:inline" />
              Directly To Your Inbox.
            </h2>
            <p className="text-neutral-300 font-light text-base sm:text-lg leading-relaxed">
              Join 12,000+ technology leaders, brand directors, and designers who receive our private breakdown of digital architecture, UX psychology, and conversion benchmarks.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-4 max-w-lg">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-black/60 border border-white/20 rounded-full px-6 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF3E00] focus:ring-2 focus:ring-[#FF3E00]/30"
              />
              <button
                type="submit"
                className="bg-[#FF3E00] hover:bg-[#E03600] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-lg shadow-[#FF3E00]/20 flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                {subscribed ? (
                  <>
                    <Check size={16} /> Subscribed!
                  </>
                ) : (
                  'Subscribe Now'
                )}
              </button>
            </form>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FOOTER CTA — Book a Consultation
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-br from-[#FF3E00]/10 via-neutral-900/80 to-neutral-950 border border-[#FF3E00]/20" aria-label="Start a Project">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF3E00]/10 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left">
              <span className="text-xs font-mono font-bold tracking-widest text-[#FF3E00] uppercase">Ready to Build?</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Let&apos;s Create Something Extraordinary Together.
              </h2>
              <p className="text-neutral-300 font-light text-base sm:text-lg max-w-xl leading-relaxed">
                Whether you need a complete brand identity, a high-performance website, or a strategic digital presence — ASTRELL delivers measurable results.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-[#FF3E00] hover:bg-[#E03600] text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-xl shadow-[#FF3E00]/30 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              Book a Consultation
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
