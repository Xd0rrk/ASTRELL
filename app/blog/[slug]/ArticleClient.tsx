'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  ArrowLeft, 
  Clock, 
  Check, 
  Copy, 
  Twitter, 
  Linkedin, 
  ArrowUpRight, 
  Sparkles, 
  Quote, 
  Info, 
  ChevronRight,
  ChevronDown,
  Bookmark,
  BookOpen,
  FileCode2,
  ArrowRight,
  ListChecks,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import SmartNavbar from '@/components/SmartNavbar';
import Footer from '@/components/Footer';
import { BlogPost, getRelatedPosts, getPrevNextPosts, getCTAForStage } from '@/lib/blog-data';
import { cn } from '@/lib/utils';

interface ArticleClientProps {
  post: BlogPost;
}

export default function ArticleClient({ post }: ArticleClientProps) {
  const [copied, setCopied] = React.useState(false);
  const [copiedCodeId, setCopiedCodeId] = React.useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = React.useState<string>('');
  const [readPercent, setReadPercent] = React.useState<number>(0);
  const [expandedFaq, setExpandedFaq] = React.useState<Set<number>>(new Set());

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll percentage
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setReadPercent(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const relatedPosts = getRelatedPosts(post.slug, post.relatedSlugs);
  const { prev, next } = getPrevNextPosts(post.slug);
  const stageCTA = getCTAForStage(post.ctaType);

  // Track active heading on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const headings = post.sections.map((s, i) => document.getElementById(`${s.id}-${i}`));
      for (const el of headings) {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220 && rect.bottom >= 0) {
            setActiveSectionId(el.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(code);
      setCopiedCodeId(id);
      setTimeout(() => setCopiedCodeId(null), 3000);
    }
  };

  const shareOnTwitter = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Reading "${post.title}" by @astrell`);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }
  };

  const shareOnLinkedin = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-[#FF3E00] selection:text-white">
      {/* GLOWING GRADIENT READING PROGRESS BAR AT TOP */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3E00] via-[#FF6A00] to-[#FF3E00] z-50 origin-left shadow-[0_0_12px_rgba(255,62,0,0.8)]"
        style={{ scaleX }}
        role="progressbar"
        aria-label="Reading progress"
        aria-valuenow={readPercent}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <SmartNavbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
        {/* Ambient Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#FF3E00]/10 blur-[160px] rounded-full pointer-events-none -z-10" aria-hidden="true" />

        {/* BREADCRUMB & BACK BUTTON */}
        <nav className="mb-8 flex items-center justify-between" aria-label="Breadcrumb">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors group focus-visible:outline-none focus-visible:text-white"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <ol className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li><span className="text-[#FF3E00] truncate max-w-[150px] sm:max-w-xs">{post.category}</span></li>
          </ol>
        </nav>

        {/* ARTICLE HEADER HERO */}
        <header className="max-w-4xl mx-auto mb-16 space-y-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest bg-[#FF3E00]/20 border border-[#FF3E00]/40 text-[#FF3E00] uppercase shadow-lg shadow-[#FF3E00]/10">
              {post.category}
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 uppercase">
              {post.service}
            </span>
            <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
              <Clock size={13} />
              {post.readTime}
            </span>
            <span className="text-neutral-600" aria-hidden="true">•</span>
            <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
              <BookOpen size={13} />
              {post.wordCount} words
            </span>
            <span className="text-neutral-600" aria-hidden="true">•</span>
            <time className="text-xs font-mono text-neutral-400" dateTime={post.isoDate}>{post.date}</time>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            {post.title}
          </h1>

          <p className="text-neutral-300 font-serif-italic text-xl sm:text-2xl leading-relaxed border-l-2 border-[#FF3E00] pl-6 py-1">
            {post.subtitle}
          </p>

          {/* AUTHOR & SHARE BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF3E00] relative">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-sm text-white">{post.author.name}</div>
                <div className="text-xs font-mono text-neutral-400">{post.author.role}</div>
              </div>
            </div>

            {/* Social Share Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={shareOnTwitter}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#FF3E00] hover:bg-[#FF3E00]/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00]"
                aria-label="Share on X (Twitter)"
              >
                <Twitter size={16} />
              </button>
              <button
                onClick={shareOnLinkedin}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#FF3E00] hover:bg-[#FF3E00]/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00]"
                aria-label="Share on LinkedIn"
              >
                <Linkedin size={16} />
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-neutral-300 hover:text-white hover:border-white/30 transition-all duration-300 bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00]"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? 'Link Copied!' : 'Share Link'}
              </button>
            </div>
          </div>
        </header>

        {/* HERO FEATURED IMAGE */}
        <div className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl">
          <div className="relative h-[320px] sm:h-[480px] lg:h-[540px]">
            <Image
              src={post.coverImage}
              alt={post.coverAlt}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-4 left-6 right-6 text-xs font-mono text-neutral-300 bg-black/70 backdrop-blur-md p-3.5 rounded-xl border border-white/10 max-w-lg flex items-center gap-2">
            <span className="text-[#FF3E00] font-bold">IMAGE:</span> {post.coverAlt}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            KEY TAKEAWAYS SECTION
        ═══════════════════════════════════════════════════════════════ */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/60 border border-emerald-500/20 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" aria-hidden="true" />
              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <ListChecks size={18} />
                  </div>
                  <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-emerald-400">Key Takeaways</h2>
                </div>
                <ul className="space-y-3">
                  {post.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-200 text-sm sm:text-base font-light leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* BENTO HIGHLIGHTS SUMMARY GRID */}
        {post.bentoSummary && post.bentoSummary.length > 0 && (
          <div className="max-w-4xl mx-auto mb-16 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-widest text-[#FF3E00] font-bold flex items-center gap-2">
                <Sparkles size={14} />
                Executive Summary
              </div>
              <span className="text-xs font-mono text-neutral-500">ASTRELL Takeaways</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {post.bentoSummary.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    'p-6 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-[#FF3E00]/40 transition-all duration-300',
                    item.colSpan || 'col-span-1'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF3E00]">
                      {item.tag}
                    </span>
                    {item.metric && (
                      <span className="text-[10px] font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
                        {item.metric}
                      </span>
                    )}
                  </div>
                  <h4 className="font-display text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-neutral-300 text-xs font-light leading-relaxed">{item.description}</p>
                  <div className={cn('absolute -inset-full bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none', item.accent)} aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            MAIN ARTICLE LAYOUT: SIDEBAR TOC + LONG FORM CONTENT
        ═══════════════════════════════════════════════════════════════ */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* STICKY TABLE OF CONTENTS (DESKTOP) */}
          <aside className="hidden lg:block lg:col-span-3" aria-label="Table of Contents">
            <div className="sticky top-28 space-y-6 p-6 rounded-3xl bg-neutral-900/40 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <Bookmark size={14} className="text-[#FF3E00]" />
                  Contents
                </div>
                <span className="text-[10px] font-mono text-[#FF3E00] font-bold">{readPercent}% read</span>
              </div>

              <nav className="space-y-3">
                {post.sections.map((section, index) => (
                  <a
                    key={`${section.id}-${index}`}
                    href={`#${section.id}-${index}`}
                    className={cn(
                      'block text-xs font-light transition-colors leading-snug line-clamp-2 focus-visible:outline-none focus-visible:text-[#FF3E00]',
                      activeSectionId === `${section.id}-${index}`
                        ? 'text-[#FF3E00] font-medium border-l-2 border-[#FF3E00] pl-2.5'
                        : 'text-neutral-400 hover:text-white pl-2.5'
                    )}
                  >
                    {section.heading}
                  </a>
                ))}
                {post.faq && post.faq.length > 0 && (
                  <a
                    href="#faq-section"
                    className={cn(
                      'block text-xs font-light transition-colors leading-snug focus-visible:outline-none focus-visible:text-[#FF3E00]',
                      activeSectionId === 'faq-section'
                        ? 'text-[#FF3E00] font-medium border-l-2 border-[#FF3E00] pl-2.5'
                        : 'text-neutral-400 hover:text-white pl-2.5'
                    )}
                  >
                    Frequently Asked Questions
                  </a>
                )}
              </nav>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-[11px] font-mono text-neutral-500 mb-2">{stageCTA.label}</div>
                <Link
                  href={stageCTA.href}
                  className="block text-center bg-[#FF3E00] text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-full hover:bg-[#E03600] transition-all duration-300 hover:scale-105 shadow-md shadow-[#FF3E00]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00]"
                >
                  {stageCTA.label}
                </Link>
              </div>
            </div>
          </aside>

          {/* MAIN ARTICLE BODY CONTENT */}
          <article className="lg:col-span-9 space-y-16">
            {post.sections.map((section, index) => (
              <section key={`${section.id}-${index}`} id={`${section.id}-${index}`} className="space-y-6 scroll-mt-28">
                <div className="space-y-2">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                    {section.heading}
                  </h2>
                  {section.subheading && (
                    <p className="text-neutral-400 font-serif-italic text-base sm:text-lg">
                      {section.subheading}
                    </p>
                  )}
                </div>

                {/* Paragraphs — max-w-prose for 60-75 char line length */}
                <div className="space-y-6 text-neutral-300 font-light text-base sm:text-lg leading-relaxed max-w-prose">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {/* Section Image Component */}
                {section.image && (
                  <div className="my-10 rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/40 shadow-2xl relative group">
                    <div className="relative w-full h-[300px] sm:h-[400px]">
                      <Image
                        src={section.image.url}
                        alt={section.image.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                    {section.image.caption && (
                      <div className="px-6 py-4 border-t border-white/10 bg-black/50 backdrop-blur-md">
                        <p className="text-xs font-mono text-neutral-400">{section.image.caption}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Pull Quote Component */}
                {section.pullQuote && (
                  <blockquote className="my-10 p-8 sm:p-10 rounded-3xl bg-neutral-900/70 border border-[#FF3E00]/40 relative overflow-hidden shadow-2xl">
                    <Quote className="absolute top-4 left-4 text-[#FF3E00]/15 w-24 h-24 pointer-events-none" aria-hidden="true" />
                    <p className="font-serif-italic text-xl sm:text-2xl text-white leading-relaxed relative z-10">
                      &ldquo;{section.pullQuote.text}&rdquo;
                    </p>
                    <footer className="mt-6 text-xs font-mono text-[#FF3E00] font-bold tracking-wider uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00]" aria-hidden="true" />
                      — {section.pullQuote.author}, <span className="text-neutral-400 font-normal">{section.pullQuote.role}</span>
                    </footer>
                  </blockquote>
                )}

                {/* Callout Box Component */}
                {section.callout && (
                  <div className="my-8 p-6 sm:p-7 rounded-2xl bg-neutral-900/80 border border-white/15 flex items-start gap-4" role="note">
                    <div className="p-3 rounded-xl bg-[#FF3E00]/10 text-[#FF3E00] shrink-0 mt-0.5 border border-[#FF3E00]/20">
                      <Info size={20} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-white text-base">{section.callout.title}</h4>
                      <p className="text-neutral-300 text-sm font-light leading-relaxed">
                        {section.callout.content}
                      </p>
                    </div>
                  </div>
                )}

                {/* Comparison Table Component */}
                {section.comparisonTable && (
                  <div className="my-10 overflow-x-auto rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-md shadow-2xl">
                    <table className="w-full text-left border-collapse min-w-[620px]">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5 text-xs font-mono uppercase tracking-wider text-neutral-400">
                          <th className="p-4 sm:p-5 font-bold" scope="col">Feature Metric</th>
                          <th className="p-4 sm:p-5 font-bold text-[#FF3E00]" scope="col">ASTRELL Bespoke Engine</th>
                          <th className="p-4 sm:p-5 font-bold text-neutral-400" scope="col">Standard Templates</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-sm font-light">
                        {section.comparisonTable.map((row, idx) => (
                          <tr key={idx} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 sm:p-5 font-medium text-white">{row.feature}</td>
                            <td className="p-4 sm:p-5 text-white font-medium bg-[#FF3E00]/5">{row.astrellApproach}</td>
                            <td className="p-4 sm:p-5 text-neutral-400">{row.standardTemplates}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Process Timeline Component */}
                {section.timeline && (
                  <div className="my-10 space-y-6">
                    {section.timeline.map((step, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#FF3E00]/40 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#FF3E00]/10 border border-[#FF3E00]/30 text-[#FF3E00] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                            0{idx + 1}
                          </div>
                          <div>
                            <div className="text-[10px] font-mono text-[#FF3E00] font-bold uppercase tracking-widest">{step.phase} — {step.duration}</div>
                            <h4 className="font-display font-bold text-white text-lg">{step.title}</h4>
                            <p className="text-neutral-400 text-sm font-light leading-relaxed mt-1">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Code Snippet Component */}
                {section.codeSnippet && (
                  <div className="my-8 rounded-2xl overflow-hidden border border-white/15 bg-black font-mono text-xs shadow-2xl">
                    <div className="flex items-center justify-between px-5 py-3 bg-neutral-900 border-b border-white/10 text-neutral-400">
                      <div className="flex items-center gap-2">
                        {/* Mac buttons */}
                        <div className="flex items-center gap-1.5 mr-2" aria-hidden="true">
                          <div className="w-3 h-3 rounded-full bg-red-500/80" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                          <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <FileCode2 size={14} className="text-[#FF3E00]" />
                        <span className="text-neutral-200 font-bold">{section.codeSnippet.filename}</span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(section.codeSnippet!.code, `${section.id}-${index}`)}
                        className="flex items-center gap-1.5 hover:text-white transition-colors text-[11px] bg-white/5 px-3 py-1 rounded-full border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00]"
                        aria-label={`Copy code from ${section.codeSnippet.filename}`}
                      >
                        {copiedCodeId === `${section.id}-${index}` ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                        {copiedCodeId === `${section.id}-${index}` ? 'Copied' : 'Copy Snippet'}
                      </button>
                    </div>
                    <pre className="p-6 overflow-x-auto text-neutral-200 leading-relaxed">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}

            {/* ═══════════════════════════════════════════════════════════
                INTERNAL LINKS SECTION
            ═══════════════════════════════════════════════════════════ */}
            {post.internalLinks && post.internalLinks.length > 0 && (
              <div className="pt-8 border-t border-white/10">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                  <ExternalLink size={14} className="text-[#FF3E00]" />
                  Related ASTRELL Services
                </h3>
                <div className="flex flex-wrap gap-3">
                  {post.internalLinks.map((link) => (
                    <Link
                      key={link.url}
                      href={link.url}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/60 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white hover:border-[#FF3E00]/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00]"
                    >
                      {link.text}
                      <ArrowUpRight size={12} className="text-[#FF3E00]" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════
                FAQ SECTION
            ═══════════════════════════════════════════════════════════ */}
            {post.faq && post.faq.length > 0 && (
              <section id="faq-section" className="scroll-mt-28 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-full bg-[#FF3E00]/10 border border-[#FF3E00]/30 text-[#FF3E00] flex items-center justify-center">
                    <HelpCircle size={18} />
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                  {post.faq.map((item, index) => {
                    const isExpanded = expandedFaq.has(index);
                    return (
                      <div
                        key={index}
                        className="rounded-2xl bg-neutral-900/40 border border-white/10 overflow-hidden transition-colors hover:border-white/20"
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full text-left p-6 flex items-start justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF3E00]"
                          aria-expanded={isExpanded}
                          aria-controls={`faq-answer-${index}`}
                        >
                          <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                            {item.question}
                          </h3>
                          <ChevronDown
                            size={20}
                            className={cn(
                              'text-neutral-400 shrink-0 mt-0.5 transition-transform duration-300',
                              isExpanded && 'rotate-180 text-[#FF3E00]'
                            )}
                          />
                        </button>
                        <div
                          id={`faq-answer-${index}`}
                          className={cn(
                            'overflow-hidden transition-all duration-300',
                            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          )}
                          role="region"
                          aria-labelledby={`faq-question-${index}`}
                        >
                          <div className="px-6 pb-6 text-neutral-300 font-light text-sm sm:text-base leading-relaxed border-t border-white/5 pt-4">
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ═══════════════════════════════════════════════════════════
                JOURNEY-STAGE CTA
            ═══════════════════════════════════════════════════════════ */}
            <div className="relative rounded-3xl p-8 sm:p-10 overflow-hidden bg-gradient-to-br from-[#FF3E00]/10 via-neutral-900/80 to-neutral-950 border border-[#FF3E00]/20">
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#FF3E00]/10 blur-[80px] rounded-full pointer-events-none" aria-hidden="true" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#FF3E00] uppercase">
                    {post.journeyStage === 'awareness' && 'Learn More'}
                    {post.journeyStage === 'consideration' && 'Compare Our Approach'}
                    {post.journeyStage === 'decision' && 'Ready to Start?'}
                    {post.journeyStage === 'retention' && 'Explore More'}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    {post.journeyStage === 'awareness' && 'Discover how ASTRELL can transform your brand.'}
                    {post.journeyStage === 'consideration' && 'See the ASTRELL difference in action.'}
                    {post.journeyStage === 'decision' && 'Book a free consultation with our team.'}
                    {post.journeyStage === 'retention' && 'Explore related services to grow with us.'}
                  </h3>
                </div>
                <Link
                  href={stageCTA.href}
                  className={cn(
                    'inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
                    stageCTA.variant === 'primary'
                      ? 'bg-[#FF3E00] hover:bg-[#E03600] text-white shadow-[#FF3E00]/30 focus-visible:ring-[#FF3E00]'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 focus-visible:ring-white'
                  )}
                >
                  {stageCTA.label}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* AUTHOR BIO CARD AT BOTTOM */}
            <div className="mt-16 p-8 rounded-3xl bg-neutral-900/60 border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#FF3E00] shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 text-center sm:text-left">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#FF3E00] font-bold">WRITTEN BY</div>
                <h3 className="font-display text-2xl font-bold text-white">{post.author.name}</h3>
                <p className="text-neutral-400 text-sm font-light leading-relaxed">{post.author.bio}</p>
              </div>
            </div>

            {/* TAGS LIST */}
            <div className="pt-6 border-t border-white/10 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-neutral-400">Article Tags:</span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00]"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </article>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PREVIOUS / NEXT ARTICLE NAVIGATION
        ═══════════════════════════════════════════════════════════════ */}
        {(prev || next) && (
          <nav className="max-w-5xl mx-auto mt-20 pt-12 border-t border-white/10" aria-label="Article navigation">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="group p-6 rounded-2xl bg-neutral-900/30 border border-white/10 hover:border-[#FF3E00]/30 transition-all duration-300 space-y-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00]"
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 flex items-center gap-1">
                    <ArrowLeft size={12} />
                    Previous Article
                  </span>
                  <h4 className="font-display text-sm font-bold text-white group-hover:text-[#FF3E00] transition-colors leading-snug line-clamp-2">
                    {prev.title}
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-500">{prev.readTime}</span>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group p-6 rounded-2xl bg-neutral-900/30 border border-white/10 hover:border-[#FF3E00]/30 transition-all duration-300 space-y-3 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00]"
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 flex items-center gap-1 justify-end">
                    Next Article
                    <ArrowRight size={12} />
                  </span>
                  <h4 className="font-display text-sm font-bold text-white group-hover:text-[#FF3E00] transition-colors leading-snug line-clamp-2">
                    {next.title}
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-500">{next.readTime}</span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </nav>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            RELATED ARTICLES GRID
        ═══════════════════════════════════════════════════════════════ */}
        {relatedPosts.length > 0 && (
          <section className="max-w-5xl mx-auto mt-20 pt-16 border-t border-white/10" aria-label="Related Articles">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF3E00] font-bold">CONTINUE READING</span>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-white mt-1">Related Articles</h3>
              </div>
              <Link href="/blog" className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:text-white">
                View All Posts <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relPost) => (
                <Link
                  key={relPost.slug}
                  href={`/blog/${relPost.slug}`}
                  className="group rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/40 p-6 flex flex-col justify-between hover:border-[#FF3E00]/40 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3E00]"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF3E00] font-bold">{relPost.category}</span>
                    <h4 className="font-display text-lg font-bold text-white group-hover:text-[#FF3E00] transition-colors leading-snug">
                      {relPost.title}
                    </h4>
                    <p className="text-neutral-400 text-xs font-light line-clamp-2 leading-relaxed">{relPost.excerpt}</p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-white/5 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
                    <span>{relPost.readTime}</span>
                    <span className="group-hover:translate-x-1 transition-transform text-[#FF3E00] flex items-center gap-1">
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            END-OF-ARTICLE CONSULTATION CTA
        ═══════════════════════════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto mt-20 relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-br from-[#FF3E00]/10 via-neutral-900/80 to-neutral-950 border border-[#FF3E00]/20" aria-label="Contact CTA">
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
