"use client";

import * as React from 'react';
import { 
  Menu, 
  X, 
  Move, 
  Maximize2, 
  ArrowUpRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import SmartNavbar from '@/components/SmartNavbar';
import { GridBody, DraggableContainer, GridItem } from "@/components/ui/infinite-drag-scroll";

interface PortfolioItem {
  id: number;
  title: string;
  category: 'poster' | 'brand' | 'social' | 'packaging';
  categoryLabel: string;
  client: string;
  year: string;
  alt: string;
  src: string;
  description: string;
}

const portfolioImages: PortfolioItem[] = [
  {
    id: 1,
    title: "NEO-TOKYO CYBERPUNK POSTER",
    category: "poster",
    categoryLabel: "Poster & Banner",
    client: "Aura Events Co.",
    year: "2025",
    alt: "Cyberpunk high contrast festival poster",
    src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1000&auto=format&fit=crop&q=80",
    description: "Experimental typography and neon contrast poster designed for an international audio-visual showcase."
  },
  {
    id: 2,
    title: "MINIMALIST BRANDING IDENTITY",
    category: "brand",
    categoryLabel: "Branding",
    client: "Komorebi Architecture",
    year: "2024",
    alt: "Minimalist geometric branding presentation",
    src: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1000&auto=format&fit=crop&q=80",
    description: "Complete visual identity, grid proportions, and editorial stationery system for modern architectural firm."
  },
  {
    id: 3,
    title: "MONOLITH SPATIAL BRAND DESIGN",
    category: "brand",
    categoryLabel: "Branding",
    client: "Monolith VR",
    year: "2025",
    alt: "Abstract 3D architectural renders",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80",
    description: "Spatial brand identity and visual render assets crafted for virtual environment computing apps."
  },
  {
    id: 4,
    title: "EDITORIAL TYPOGRAPHY LAYOUT",
    category: "poster",
    categoryLabel: "Poster & Banner",
    client: "Metropolis Magazine",
    year: "2024",
    alt: "Elegant dark typography poster design",
    src: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=1000&auto=format&fit=crop&q=80",
    description: "Monochrome brutalist typography spread celebrating European Swiss poster heritage."
  },
  {
    id: 5,
    title: "AURA LUXURY SKINCARE PACKAGING",
    category: "packaging",
    categoryLabel: "Packaging",
    client: "Aura Organics",
    year: "2025",
    alt: "Tactile debossed skincare package",
    src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1000&auto=format&fit=crop&q=80",
    description: "Sustainable frosted glass bottles and unbleached matte tactile box packaging suite."
  },
  {
    id: 6,
    title: "KINETIC GRADIENT DIGITAL CAMPAIGN",
    category: "social",
    categoryLabel: "Social Media",
    client: "Flow Audio",
    year: "2025",
    alt: "Vibrant liquid gradient graphic",
    src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1000&auto=format&fit=crop&q=80",
    description: "Multi-platform motion campaign graphics engineered for high engagement on social feeds."
  },
  {
    id: 7,
    title: "VERTEX BANKING DESIGN SYSTEM",
    category: "brand",
    categoryLabel: "Branding",
    client: "Vertex Banking",
    year: "2024",
    alt: "Dark UI application layout",
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1000&auto=format&fit=crop&q=80",
    description: "High-density digital identity and telemetry UI system optimized for swift asset tracking."
  },
  {
    id: 8,
    title: "BAUHAUS CENTENNIAL BANNER",
    category: "poster",
    categoryLabel: "Poster & Banner",
    client: "Berlin Design Week",
    year: "2025",
    alt: "Bauhaus inspired geometric poster",
    src: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1000&auto=format&fit=crop&q=80",
    description: "Commemorative exhibition banners combining primary geometric solids with asymmetric grids."
  },
  {
    id: 9,
    title: "SYNTHESIS DIGITAL ART POSTER",
    category: "poster",
    categoryLabel: "Poster & Banner",
    client: "ASTRELL Labs",
    year: "2025",
    alt: "Futuristic digital art installation mockup",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80",
    description: "Algorithmic generative artwork created for interactive digital billboards in Tokyo & London."
  },
  {
    id: 10,
    title: "BOTANICAL ESSENCE BOTTLE CONCEPT",
    category: "packaging",
    categoryLabel: "Packaging",
    client: "Verdant Alchemy",
    year: "2024",
    alt: "Amber glass bottle branding mockup",
    src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1000&auto=format&fit=crop&q=80",
    description: "Custom amber glassware with foil-stamped waterproof label for organic essential oil line."
  },
  {
    id: 11,
    title: "MONOCHROME FASHION BRAND IDENTITY",
    category: "brand",
    categoryLabel: "Branding",
    client: "Noir Atelier Paris",
    year: "2025",
    alt: "Luxury high contrast fashion lookbook cover",
    src: "https://images.unsplash.com/photo-1629729802306-2c1968eb1e26?w=1000&auto=format&fit=crop&q=80",
    description: "Haute couture brand guidelines, embossed hangtags, and digital e-commerce visual system."
  },
  {
    id: 12,
    title: "ASTRELKS CREATIVE BRAND SYSTEM",
    category: "brand",
    categoryLabel: "Branding",
    client: "Astrelks Creative",
    year: "2024",
    alt: "Immersive Web3 portfolio concept",
    src: "https://images.unsplash.com/photo-1481481600465-42217d853406?w=1000&auto=format&fit=crop&q=80",
    description: "Brand guidelines and digital interface system for creative design studio."
  },
  {
    id: 13,
    title: "ISOMETRIC PRODUCT PACKAGING",
    category: "packaging",
    categoryLabel: "Packaging",
    client: "Orion Tech",
    year: "2025",
    alt: "3D isometric renders on dark background",
    src: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1000&auto=format&fit=crop&q=80",
    description: "Minimalist hardware box packaging and tactile unboxing presentation system."
  },
  {
    id: 14,
    title: "NEON NIGHTS SOCIAL CAMPAIGN",
    category: "social",
    categoryLabel: "Social Media",
    client: "Pulse Nightclub LDN",
    year: "2024",
    alt: "Vibrant neon graphic post template",
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop&q=80",
    description: "High-contrast social media story templates with custom animated glowing elements."
  },
  {
    id: 15,
    title: "CHRONICLE EDITORIAL SPREAD",
    category: "poster",
    categoryLabel: "Poster & Banner",
    client: "Vogue Culture",
    year: "2025",
    alt: "Minimalist fashion magazine spread",
    src: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=1000&auto=format&fit=crop&q=80",
    description: "Double-page spread editorial print design with extreme grid precision and negative space."
  },
  {
    id: 16,
    title: "GEOMETRIC EXHIBITION BANNER",
    category: "poster",
    categoryLabel: "Poster & Banner",
    client: "Tate Modern",
    year: "2024",
    alt: "Modern geometric museum exhibition banner",
    src: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1000&auto=format&fit=crop&q=80",
    description: "Large format outdoor vinyl banner campaign displayed across central London galleries."
  },
  {
    id: 17,
    title: "SYSTEMIC DARK DESIGN SYSTEM",
    category: "brand",
    categoryLabel: "Branding",
    client: "Solaria Cloud Platform",
    year: "2025",
    alt: "Dark UI component design system preview",
    src: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=1000&auto=format&fit=crop&q=80",
    description: "Comprehensive tokenized design system for multi-screen enterprise SaaS applications."
  },
  {
    id: 18,
    title: "SPECTRUM COLOR SYSTEM GUIDELINES",
    category: "brand",
    categoryLabel: "Branding",
    client: "Prism Creative Studios",
    year: "2024",
    alt: "Colorful fluid gradient branding showcase",
    src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&auto=format&fit=crop&q=80",
    description: "Dynamic color system documentation and generative gradient generator tool build."
  }
];

export default function GalleryPage() {
    const [londonTime, setLondonTime] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<string>('all');
  const [activeVariant, setActiveVariant] = React.useState<'polaroid' | 'masonry' | 'default'>('polaroid');
  const [selectedItem, setSelectedItem] = React.useState<PortfolioItem | null>(null);

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const lon = now.toLocaleTimeString('en-GB', { 
        timeZone: 'Europe/London', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
      });
      setLondonTime(lon);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const [itemsList, setItemsList] = React.useState<PortfolioItem[]>(portfolioImages);

  React.useEffect(() => {
    async function loadFirestoreGallery() {
      try {
        const { getPublishedGalleryItems, getMediaAssets } = await import('@/lib/firebase-collections');
        const items = await getPublishedGalleryItems();
        if (items && items.length > 0) {
          const mediaIds = items.map((i) => i.media_id);
          const mediaAssets = await getMediaAssets(mediaIds);
          const mediaMap = new Map(mediaAssets.map((m) => [m.id, m]));

          const dynamicItems: PortfolioItem[] = items.map((item, idx) => {
            const media = mediaMap.get(item.media_id);
            let cat: PortfolioItem['category'] = 'brand';
            const catLower = item.category.toLowerCase();
            if (catLower.includes('poster') || catLower.includes('graphic')) cat = 'poster';
            else if (catLower.includes('social') || catLower.includes('marketing')) cat = 'social';
            else if (catLower.includes('packaging')) cat = 'packaging';

            return {
              id: idx + 1,
              title: item.title.toUpperCase(),
              category: cat,
              categoryLabel: item.category,
              client: item.client_name || 'ASTRELL Client',
              year: String(item.project_year || '2026'),
              alt: item.title,
              src: media?.public_url || 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1000&auto=format&fit=crop&q=80',
              description: `High-impact ${item.category.toLowerCase()} presentation and creative assets.`,
            };
          });

          if (dynamicItems.length > 0) {
            setItemsList(dynamicItems);
          }
        }
      } catch (err) {
        console.warn('Fallback to static portfolio gallery images:', err);
      }
    }
    loadFirestoreGallery();
  }, []);

  const filteredItems = React.useMemo(() => {
    let raw: PortfolioItem[] = itemsList;
    if (activeCategory === 'poster') {
      raw = itemsList.filter(item => item.category === 'poster');
    } else if (activeCategory === 'brand') {
      raw = itemsList.filter(item => item.category === 'brand' || item.category === 'packaging');
    } else if (activeCategory === 'social') {
      raw = itemsList.filter(item => item.category === 'social');
    }

    if (raw.length === 0) return itemsList;

    // Fill to 18 items so all 6 columns x 3 rows in GridBody are completely populated without empty gaps
    let filled = [...raw];
    while (filled.length < 18) {
      filled = [...filled, ...raw];
    }
    return filled.slice(0, 18);
  }, [activeCategory, itemsList]);

  return (
    <div className="relative h-screen w-screen bg-neutral-950 text-neutral-100 selection:bg-neutral-800 overflow-hidden font-sans select-none">
      
      <SmartNavbar />

      

      {/* FLOATING MINIMALIST CONTROL TOOLBAR (Category Filter & Layout Variants) */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] sm:w-[88%] max-w-3xl bg-black/60 backdrop-blur-2xl border border-white/15 rounded-full p-1.5 sm:p-2 flex items-center justify-between shadow-2xl space-x-2">
        
        {/* Horizontal Category Filters */}
        <div className="flex items-center overflow-x-auto scrollbar-none space-x-1 px-1 py-0.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Works' },
            { id: 'poster', label: 'Posters & Banners' },
            { id: 'brand', label: 'Branding & Packaging' },
            { id: 'social', label: 'Social Media' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-300",
                activeCategory === cat.id
                  ? "bg-[#FF3E00] text-white shadow-md shadow-[#FF3E00]/30 scale-105"
                  : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Layout Variant Switcher */}
        <div className="hidden sm:flex items-center bg-black/40 border border-white/10 rounded-full p-1 space-x-1 shrink-0">
          <button
            onClick={() => setActiveVariant('polaroid')}
            className={cn(
              "px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider transition-all",
              activeVariant === 'polaroid' ? "bg-white text-black font-bold shadow" : "text-neutral-400 hover:text-white"
            )}
          >
            Polaroid
          </button>
          <button
            onClick={() => setActiveVariant('masonry')}
            className={cn(
              "px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider transition-all",
              activeVariant === 'masonry' ? "bg-white text-black font-bold shadow" : "text-neutral-400 hover:text-white"
            )}
          >
            Masonry
          </button>
          <button
            onClick={() => setActiveVariant('default')}
            className={cn(
              "px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider transition-all",
              activeVariant === 'default' ? "bg-white text-black font-bold shadow" : "text-neutral-400 hover:text-white"
            )}
          >
            Grid
          </button>
        </div>
      </div>

      {/* INFINITE DRAGGABLE GALLERY CANVAS */}
      <div className="w-full h-full">
        <DraggableContainer key={`${activeCategory}-${activeVariant}`} variant={activeVariant}>
          <GridBody>
            {filteredItems.map((item, index) => (
              <GridItem
                key={`${item.id}-${index}-${activeCategory}`}
                className="relative h-48 w-34 sm:h-64 sm:w-48 md:h-96 md:w-72 bg-neutral-900 group overflow-hidden"
              >
                <div 
                  onClick={() => setSelectedItem(item)}
                  className="w-full h-full relative cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="pointer-events-none absolute h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 [transform:translateZ(0)]"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Card hover overlay info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3 sm:p-5">
                    <div className="flex justify-between items-start">
                      <span className="bg-[#FF3E00] text-white text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase tracking-wider">
                        {item.categoryLabel}
                      </span>
                      <div className="bg-white/20 backdrop-blur-md text-white p-1 sm:p-1.5 rounded-full hover:scale-110 transition-transform">
                        <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] sm:text-[10px] font-mono text-white/60 uppercase tracking-widest block mb-0.5">
                        {item.client}
                      </span>
                      <h3 className="text-white font-bold text-xs sm:text-sm md:text-base leading-tight uppercase drop-shadow-md">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </GridItem>
            ))}
          </GridBody>
        </DraggableContainer>
      </div>

      {/* LIGHTBOX DETAIL MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-neutral-900 border border-white/15 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 max-h-[85vh] sm:max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-black/70 border border-white/20 text-white p-2 rounded-full hover:bg-[#FF3E00] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Image Preview */}
              <div className="relative h-56 sm:h-72 md:h-full bg-black flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Information Side */}
              <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-[#FF3E00]/20 text-[#FF3E00] border border-[#FF3E00]/40 text-[10px] sm:text-xs font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {selectedItem.categoryLabel}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase">
                      Ref: #{selectedItem.id.toString().padStart(3, '0')}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight mb-3">
                    {selectedItem.title}
                  </h2>

                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-light">
                    {selectedItem.description}
                  </p>

                  <div className="space-y-2 border-t border-white/10 pt-3 text-[11px] sm:text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-neutral-500 uppercase">Client</span>
                      <span className="text-white font-semibold">{selectedItem.client}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-neutral-500 uppercase">Release Year</span>
                      <span className="text-white font-semibold">{selectedItem.year}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-neutral-500 uppercase">Discipline</span>
                      <span className="text-white font-semibold">{selectedItem.categoryLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 sm:pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
                  <a
                    href="/#contact"
                    className="w-full bg-[#FF3E00] text-white py-2.5 sm:py-3 rounded-xl font-bold uppercase text-[11px] sm:text-xs tracking-wider flex items-center justify-center space-x-2 hover:bg-[#E03600] transition-colors"
                  >
                    <span>Request Similar Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
