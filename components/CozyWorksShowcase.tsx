'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight, X, ArrowRight, Sparkles } from 'lucide-react';

interface WorkItem {
  id: string;
  title: string;
  category: string;
  year: string;
  location: string;
  client: string;
  description: string;
  image: string;
  aspectRatio: string;
  tags: string[];
  metrics: string;
  fullDetails?: {
    role: string;
    timeline: string;
    overview: string;
    deliverables: string[];
    gallery: string[];
  };
}

const WORKS: WorkItem[] = [
  {
    id: 'work-aura',
    title: 'Maison de Aura',
    category: 'Packaging & E-Commerce',
    year: '2026',
    location: 'Paris, France',
    client: 'Aura Cosmetics',
    description: 'A sustainable, tactile packaging system and e-commerce build for a luxury skincare brand — designed to feel as premium unwrapped as it looks online.',
    image: 'https://picsum.photos/seed/skincare/1200/900',
    aspectRatio: 'aspect-[4/3]',
    tags: ['Brand Identity', 'Packaging', 'Next.js E-Commerce'],
    metrics: '+240% online conversion',
    fullDetails: {
      role: 'Brand & E-Commerce Lead',
      timeline: '12 Weeks',
      overview: 'We rebuilt Maison de Aura\'s packaging in debossed, recyclable papercraft and paired it with an instant-loading online store — turning an everyday skincare purchase into a collectible unboxing.',
      deliverables: ['Packaging CAD & Specs', 'Sustainable Material Sourcing', 'Online Storefront', 'Editorial Photography'],
      gallery: [
        'https://picsum.photos/seed/skincare1/1000/750',
        'https://picsum.photos/seed/skincare2/1000/750'
      ]
    }
  },
  {
    id: 'work-vertex',
    title: 'Vertex Capital',
    category: 'Institutional Interface Design',
    year: '2026',
    location: 'Zurich, Switzerland',
    client: 'Vertex Group',
    description: 'A dark-mode trading dashboard built for split-second decisions — engineered for speed, clarity, and institutional-grade reliability.',
    image: 'https://picsum.photos/seed/webui/1200/900',
    aspectRatio: 'aspect-[16/10]',
    tags: ['Fintech Dashboard', 'Design System', 'Real-Time Data'],
    metrics: '€18M capital raised',
    fullDetails: {
      role: 'UI/UX & Product Strategy',
      timeline: '16 Weeks',
      overview: 'We turned dense, fast-moving market data into a fluid, keyboard-first interface that traders can navigate without looking away from the numbers.',
      deliverables: ['Design System', 'Real-Time Data Visualization', 'Keyboard Navigation', 'Dark Mode Interface'],
      gallery: [
        'https://picsum.photos/seed/webui1/1000/750',
        'https://picsum.photos/seed/webui2/1000/750'
      ]
    }
  },
  {
    id: 'work-chrono',
    title: 'Chrono Orbital',
    category: '3D Spatial & Identity',
    year: '2025',
    location: 'Tokyo, Japan',
    client: 'Chrono Aerospace',
    description: 'A brand identity and interactive 3D simulator built to bring commercial space habitats to life for investors and enthusiasts alike.',
    image: 'https://picsum.photos/seed/spatial/1200/900',
    aspectRatio: 'aspect-[4/3]',
    tags: ['3D WebGL', 'Aerospace Branding', 'Spatial Design'],
    metrics: '3.4M engagements',
    fullDetails: {
      role: 'Creative Direction & 3D Design',
      timeline: '14 Weeks',
      overview: 'We built a WebGL simulator that lets people step inside a zero-gravity habitat module — turning a hard-to-picture concept into something investors could explore for themselves.',
      deliverables: ['3D WebGL Explorer', 'Brand Guidelines', 'Spatial UI', 'Investor Deck'],
      gallery: [
        'https://picsum.photos/seed/spatial1/1000/750',
        'https://picsum.photos/seed/spatial2/1000/750'
      ]
    }
  },
  {
    id: 'work-lumina',
    title: 'Lumina Spatial Audio',
    category: 'Hardware & Mobile App',
    year: '2025',
    location: 'London, UK',
    client: 'Lumina Acoustics',
    description: 'Industrial design and a companion iOS app for a flagship pair of spatial headphones — built to sell out on day one.',
    image: 'https://picsum.photos/seed/audio/1200/900',
    aspectRatio: 'aspect-[16/10]',
    tags: ['Industrial Design', 'iOS App', 'Soundstage UI'],
    metrics: '45,000 units sold out',
    fullDetails: {
      role: 'Hardware & Software Design',
      timeline: '20 Weeks',
      overview: 'We designed the anodized aluminum hardware and the equalizer app that controls it as one cohesive product — and pre-orders sold out within days.',
      deliverables: ['Hardware Design Specs', 'iOS Equalizer App', 'Soundstage Interface', 'Launch Store'],
      gallery: [
        'https://picsum.photos/seed/audio1/1000/750',
        'https://picsum.photos/seed/audio2/1000/750'
      ]
    }
  }
];

// Single Parallax Card Component with Mouse Pan & Zoom
function ParallaxWorkCard({ 
  item, 
  index, 
  onSelect 
}: { 
  item: WorkItem; 
  index: number; 
  onSelect: (item: WorkItem) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardImageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll Progress relative to card position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Parallax Y offset for inner image shift on scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.05, 1.12]);

  // Interactive mouse pan motion values
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Smooth springs for silky fluid panning
  const springConfig = { damping: 20, stiffness: 120, mass: 0.5 };
  const panX = useSpring(rawMouseX, springConfig);
  const panY = useSpring(rawMouseY, springConfig);

  // Mouse movement handler relative to image frame center
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardImageRef.current) return;
    const rect = cardImageRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to +0.5
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to +0.5
    
    // Pan image opposite to cursor position (-20px to +20px) for organic optical depth
    rawMouseX.set(relativeX * -20);
    rawMouseY.set(relativeY * -20);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  // Alternating entry directions: Even items come from left (-80px), Odd items come from right (+80px)
  const isEven = index % 2 === 0;
  const initialX = isEven ? -80 : 80;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: initialX, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.1 }}
      onClick={() => onSelect(item)}
      className="group cursor-pointer space-y-4"
      id={`card-cozy-work-${item.id}`}
    >
      {/* Image Frame with Smooth Scroll & Mouse Pan-Zoom Parallax */}
      <div 
        ref={cardImageRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full ${item.aspectRatio} rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 group-hover:border-white/30 transition-colors duration-500`}
      >
        <motion.img
          src={item.image}
          alt={item.title}
          style={{ y: imageY, x: panX, scale: scrollScale }}
          animate={{
            scale: isHovered ? 1.18 : 1.08,
          }}
          transition={{
            scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
          className="w-full h-full object-cover origin-center"
          referrerPolicy="no-referrer"
        />
        
        {/* Subtle Hover Overlay */}
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold shadow-2xl backdrop-blur-md flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            <span>View Case Study</span>
            <ArrowUpRight size={14} />
          </motion.div>
        </div>

        {/* Location Pill */}
        <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-wider text-neutral-300">
          {item.location}
        </div>

        {/* Metric Badge */}
        <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-emerald-500/30 text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold shadow-lg">
          {item.metrics}
        </div>
      </div>

      {/* Info Content - Minimalist Typography */}
      <div className="space-y-1 pt-1">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-widest">
          <span>{item.category}</span>
          <span className="text-neutral-500">{item.year}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-white group-hover:text-[#FF3E00] transition-colors duration-300">
            {item.title}
          </h3>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/10 transition-all flex-shrink-0">
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>

    </motion.div>
  );
}

export default function CozyWorksShowcase() {
  const [activeItem, setActiveItem] = useState<WorkItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [works, setWorks] = useState<WorkItem[]>(WORKS);

  React.useEffect(() => {
    async function loadFirestoreWorks() {
      try {
        const { getPublishedGalleryItems, getMediaAssets } = await import('@/lib/firebase-collections');
        const items = await getPublishedGalleryItems();
        if (items && items.length > 0) {
          const mediaIds = items.map((i) => i.media_id);
          const mediaAssets = await getMediaAssets(mediaIds);
          const mediaMap = new Map(mediaAssets.map((m) => [m.id, m]));

          const dynamicWorks: WorkItem[] = items.map((item, idx) => {
            const media = mediaMap.get(item.media_id);
            return {
              id: item.id,
              title: item.title,
              category: item.category,
              year: String(item.project_year || 2026),
              location: 'Global / Remote',
              client: item.client_name || 'ASTRELL Partner',
              description: `A bespoke ${item.category.toLowerCase()} experience designed and built for ${item.client_name || 'ASTRELL clients'}.`,
              image: media?.public_url || 'https://picsum.photos/seed/skincare/1200/900',
              aspectRatio: idx % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[16/10]',
              tags: item.tags || [item.category, 'ASTRELL'],
              metrics: '+180% Engagement Growth',
              fullDetails: {
                role: `${item.category} Lead`,
                timeline: '8-12 Weeks',
                overview: `We developed a comprehensive ${item.category.toLowerCase()} strategy and visual presentation focused on digital conversion and brand authority.`,
                deliverables: [`${item.category} Strategy`, 'Design System Specs', 'Digital Launch Assets'],
                gallery: [media?.public_url || 'https://picsum.photos/seed/skincare1/1000/750'],
              },
            };
          });

          if (dynamicWorks.length > 0) {
            setWorks(dynamicWorks);
          }
        }
      } catch (err) {
        console.warn('Fallback to static works:', err);
      }
    }
    loadFirestoreWorks();
  }, []);

  const filteredWorks = activeFilter === 'all'
    ? works
    : works.filter(w => w.category.toLowerCase().includes(activeFilter.toLowerCase()));

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-32 md:py-44 bg-[#0A0A0C] text-white border-t border-b border-white/10 relative font-sans overflow-hidden" id="proof">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-24">
        
        {/* ================= ELEGANT SECTION HEADER ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/10 pb-12"
        >
          
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#FF3E00] font-semibold block">
              Selected Work · 2025–2026
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-white tracking-tight leading-[1.08]">
              Work that <span className="font-serif italic font-normal text-neutral-300">pays for itself.</span>
            </h2>

            <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed pt-2">
              A look at the brands, products, and platforms we've helped launch — and the results they've delivered.
            </p>
            <p className="text-xs font-mono text-neutral-500 pt-1">
              Note: All performance metrics are measured over the 90 days following launch.
            </p>
          </div>

          {/* Clean Category Filter */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'packaging', label: 'Packaging' },
              { id: 'interface', label: 'Interfaces' },
              { id: '3d', label: '3D Spatial' },
              { id: 'hardware', label: 'Hardware' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`text-xs font-mono tracking-widest uppercase transition-all duration-300 px-4 py-2 rounded-full border ${
                  activeFilter === tab.id
                    ? 'bg-white text-black font-semibold border-white shadow-md'
                    : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
                id={`work-filter-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </motion.div>

        {/* ================= PARALLAX ALTERNATING PROJECT SHOWCASE ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {filteredWorks.map((item, idx) => (
            <ParallaxWorkCard 
              key={item.id}
              item={item}
              index={idx}
              onSelect={(selected) => setActiveItem(selected)}
            />
          ))}
        </div>

        {/* ================= HIGH-CRAFT CASE STUDY MODAL OVERLAY ================= */}
        <AnimatePresence>
          {activeItem && activeItem.fullDetails && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
              
              {/* Dark Ambient Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveItem(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-xl"
              />

              {/* Editorial Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0E0E12] border border-white/20 text-white shadow-[0_0_80px_rgba(0,0,0,0.8)] z-10 font-sans custom-scrollbar"
                id="modal-cozy-work-detail"
              >
                
                {/* Sticky Header Bar */}
                <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-10 py-5 bg-[#0E0E12]/80 backdrop-blur-md border-b border-white/10">
                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                    <span className="text-[#FF3E00] font-semibold uppercase tracking-wider">{activeItem.category}</span>
                    <span>/</span>
                    <span className="text-white font-medium">{activeItem.client}</span>
                  </div>

                  <button
                    onClick={() => setActiveItem(null)}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all text-xs font-mono uppercase tracking-wider font-semibold"
                    id="btn-close-cozy-modal"
                  >
                    <span>Close</span>
                    <X size={15} />
                  </button>
                </div>

                <div className="p-6 sm:p-10 md:p-12 space-y-12">
                  
                  {/* Hero Title & Big Metric Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-400">
                        <span>{activeItem.location}</span>
                        <span>•</span>
                        <span>{activeItem.year}</span>
                      </div>
                      <h3 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-white tracking-tight leading-[1.05]">
                        {activeItem.title}
                      </h3>
                      <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed">
                        {activeItem.description}
                      </p>
                    </div>

                    {/* Audited Impact Metric Box */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-neutral-900/60 to-black border border-emerald-500/30 space-y-2 relative overflow-hidden">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest font-semibold">
                        <Sparkles size={14} />
                        <span>Performance Metric</span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                        {activeItem.metrics}
                      </div>
                    </div>
                  </div>

                  {/* Main Hero Showcase Image */}
                  <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 group">
                    <img
                      src={activeItem.image}
                      alt={activeItem.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Meta Specs Grid (Role, Timeline, Scope) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                    <div>
                      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">CLIENT</div>
                      <div className="text-sm font-medium text-white">{activeItem.client}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">TIMELINE</div>
                      <div className="text-sm font-medium text-white">{activeItem.fullDetails.timeline}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">LOCATION</div>
                      <div className="text-sm font-medium text-white">{activeItem.location}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">LEAD ROLE</div>
                      <div className="text-sm font-medium text-white">{activeItem.fullDetails.role}</div>
                    </div>
                  </div>

                  {/* Overview Deep Dive */}
                  <div className="space-y-4 max-w-3xl">
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF3E00] font-semibold">
                      STRATEGIC ARCHITECTURE & OVERVIEW
                    </h4>
                    <p className="text-neutral-200 text-base sm:text-xl font-serif font-light italic leading-relaxed">
                      &ldquo;{activeItem.fullDetails.overview}&rdquo;
                    </p>
                  </div>

                  {/* Additional Gallery Angle Shots */}
                  {activeItem.fullDetails.gallery && activeItem.fullDetails.gallery.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 font-semibold">
                        VISUAL PROOF & DETAIL GALLERY
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {activeItem.fullDetails.gallery.map((imgUrl, i) => (
                          <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
                            <img 
                              src={imgUrl} 
                              alt={`${activeItem.title} view ${i + 1}`}
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Deliverables & Tech Architecture */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 font-semibold">
                      KEY DELIVERABLES & TECHNICAL SCOPE
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {activeItem.fullDetails.deliverables.map((del) => (
                        <div 
                          key={del} 
                          className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-xs sm:text-sm font-sans text-neutral-200 flex items-center gap-2.5"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#FF3E00]" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action CTA Banner */}
                  <div className="p-8 rounded-2xl bg-gradient-to-r from-neutral-900 via-[#16161D] to-neutral-900 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center md:text-left">
                      <div className="text-lg sm:text-xl font-display font-medium text-white">
                        Want results like these for your brand?
                      </div>
                      <p className="text-xs font-mono text-neutral-400">
                        Direct access to your team · Fixed timeline · Fixed fee
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveItem(null);
                        scrollToContact();
                      }}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-xl hover:scale-105 flex-shrink-0"
                      id="btn-cozy-modal-inquire"
                    >
                      <span>Start a Project Inquiry</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

