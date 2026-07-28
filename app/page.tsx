'use client';

import * as React from 'react';
import {
  Laptop,
  Compass,
  Box,
  Layers,
  Layers3,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Clock,
  Globe,
  Check,
  CheckCircle2,
  DollarSign,
  Users,
  Award,
  Shield,
  Activity,
  Sparkles,
  Send,
  ExternalLink,
  Briefcase,
  RotateCw,
  Monitor,
  Smartphone,
  Tablet,
  Move
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  animate,
  useMotionValueEvent
} from 'motion/react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import CozyWorksShowcase from '@/components/CozyWorksShowcase';
import TeamShowcase from '@/components/ui/team-showcase';
import MethodologySection from '@/components/MethodologySection';
import Footer from '@/components/Footer';

const StellarCardGallerySingle = dynamic(
  () => import('@/components/ui/3d-image-gallery'),
  { ssr: false }
);

// Types for states and brief submissions
interface Inquiry {
  id: string;
  clientName: string;
  email: string;
  services: string[];
  budget: string;
  brief: string;
  timestamp: string;
}

function ThreeDGallery() {
  return (
    <section
      className="relative w-full h-[720px] md:h-[820px] bg-neutral-950 flex flex-col items-center justify-center overflow-hidden border-t border-b border-white/10 my-0"
      id="3d-gallery-section"
    >
      <StellarCardGallerySingle scrollYProgress={undefined} />
    </section>
  );
}

export default function CreativeAgencyPage() {
  // Navigation states
  const [activeSection, setActiveSection] = React.useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Time conversion state for London, Europe, and Middle East
  const [londonTime, setLondonTime] = React.useState('');
  const [cetTime, setCetTime] = React.useState('');
  const [gstTime, setGstTime] = React.useState('');

  // Carousel Demo active tab (0: Web, 1: Brand, 2: Package)




  // Hero 3D Box drag states - initial angle set to exact tilt in reference image
  const [heroRotX, setHeroRotX] = React.useState(-35);
  const [heroRotY, setHeroRotY] = React.useState(-30);
  const [isDraggingHero, setIsDraggingHero] = React.useState(false);
  const [isHoveringHero, setIsHoveringHero] = React.useState(false);
  const heroSpinRef = React.useRef<number | null>(null);

  // Smooth continuous auto-rotation that runs by default, pauses during user drag, and resumes after
  React.useEffect(() => {
    if (!isDraggingHero) {
      const spin = () => {
        setHeroRotY(prev => (prev + 0.3) % 360);
        heroSpinRef.current = requestAnimationFrame(spin);
      };
      heroSpinRef.current = requestAnimationFrame(spin);
    }
    return () => {
      if (heroSpinRef.current) cancelAnimationFrame(heroSpinRef.current);
    };
  }, [isDraggingHero]);
  const heroDragStartPos = React.useRef({ x: 0, y: 0 });
  const heroDragStartRot = React.useRef({ x: -35, y: -30 });

  const handleHeroMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.cancelable) e.preventDefault();
    window.getSelection()?.removeAllRanges();

    setIsDraggingHero(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    heroDragStartPos.current = { x: clientX, y: clientY };
    heroDragStartRot.current = { x: heroRotX, y: heroRotY };
  };

  const handleHeroMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingHero) return;
    if (e.cancelable) e.preventDefault();

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const dx = clientX - heroDragStartPos.current.x;
    const dy = clientY - heroDragStartPos.current.y;
    setHeroRotY(heroDragStartRot.current.y + dx * 0.5);
    setHeroRotX(heroDragStartRot.current.x - dy * 0.5);
  };

  const handleHeroMouseUpOrLeave = () => {
    setIsDraggingHero(false);
  };

  // Global window listeners while dragging to prevent text selection and maintain smooth viewport rotation
  React.useEffect(() => {
    if (!isDraggingHero) return;

    const onGlobalMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      const dx = clientX - heroDragStartPos.current.x;
      const dy = clientY - heroDragStartPos.current.y;
      setHeroRotY(heroDragStartRot.current.y + dx * 0.5);
      setHeroRotX(heroDragStartRot.current.x - dy * 0.5);
      window.getSelection()?.removeAllRanges();
    };

    const onGlobalUp = () => {
      setIsDraggingHero(false);
    };

    window.addEventListener('mousemove', onGlobalMove);
    window.addEventListener('mouseup', onGlobalUp);
    window.addEventListener('touchmove', onGlobalMove, { passive: false });
    window.addEventListener('touchend', onGlobalUp);

    return () => {
      window.removeEventListener('mousemove', onGlobalMove);
      window.removeEventListener('mouseup', onGlobalUp);
      window.removeEventListener('touchmove', onGlobalMove);
      window.removeEventListener('touchend', onGlobalUp);
    };
  }, [isDraggingHero]);



  const [portfolioFilter, setPortfolioFilter] = React.useState<'all' | 'web' | 'brand' | 'package'>('all');
  const [clientName, setClientName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
  const [budgetTier, setBudgetTier] = React.useState('€10k - €20k');
  const [briefText, setBriefText] = React.useState('');
  const [inquiryHistory, setInquiryHistory] = React.useState<Inquiry[]>([]);
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  // Mouse coords for 3D abstract shape tracking
  const [mouseCoords, setMouseCoords] = React.useState({ x: 0, y: 0 });
  const heroRef = React.useRef<HTMLDivElement>(null);

  // Load London local time and sync
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // London (BST/GMT)
      const lon = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      setLondonTime(lon);

      // Central Europe (CET/CEST)
      const cet = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', hour12: false });
      setCetTime(cet);

      // Middle East (GST - Gulf Standard Time, Dubai)
      const gst = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', hour12: false });
      setGstTime(gst);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse coordinates on hero for organic 3D shape reaction
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseCoords({ x, y });
  };

  // Load submissions history from local storage
  React.useEffect(() => {
    const stored = localStorage.getItem('astrell_inquiries');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const handle = requestAnimationFrame(() => {
          setInquiryHistory(parsed);
        });
        return () => cancelAnimationFrame(handle);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Handle Brief submission
  const handleSubmitBrief = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !email) return;

    const newInquiry: Inquiry = {
      id: 'brief_' + Date.now(),
      clientName,
      email,
      services: selectedServices.length > 0 ? selectedServices : ['General Architecture Consultancy'],
      budget: budgetTier,
      brief: briefText || 'No specific details provided. Let\'s schedule our discovery session.',
      timestamp: new Date().toLocaleString(),
    };

    const updated = [newInquiry, ...inquiryHistory];
    setInquiryHistory(updated);
    localStorage.setItem('astrell_inquiries', JSON.stringify(updated));

    setFormSubmitted(true);
    setTimeout(() => {
      // Clear fields on success
      setClientName('');
      setEmail('');
      setSelectedServices([]);
      setBriefText('');
    }, 500);
  };

  // Toggle services in brief builder
  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter(s => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  // (Removed level design and SMM state managers as requested)

  // Brand details based on themes
  const brandThemes = {
    editorial: {
      font: 'font-display tracking-tight leading-none text-white',
      desc: 'Elegant space proportions. Deep, natural contrast tailored for luxury, high-fashion, and architecture.',
      colors: ['#0C0A09', '#F5F5F4', '#78716C', '#1C1917'],
      pairings: 'Space Grotesk Bold + Inter Light',
      weight: 'Light / Medium Contrast',
    },
    tech: {
      font: 'font-mono tracking-widest uppercase text-emerald-400',
      desc: 'Sleek, high-density telemetry. Made for deep technology, developers, and complex web tools.',
      colors: ['#09090B', '#10B981', '#27272A', '#18181B'],
      pairings: 'JetBrains Mono + Space Grotesk SemiBold',
      weight: 'High Neon Luminescence',
    },
    classic: {
      font: 'font-serif tracking-normal italic text-amber-200',
      desc: 'Timeless luxury aesthetics. Built for high-end boutique hotels, physical packaging, and premium wineries.',
      colors: ['#1C1917', '#FEF3C7', '#78350F', '#F59E0B'],
      pairings: 'Times New Roman / Editorial Serif + Inter Semibold',
      weight: 'Warm Earth / Royal Contrast',
    },
  };

  // Testimonials & Case Studies data
  const caseStudies = [
    {
      id: 'cs-1',
      title: 'Aura Premium Skincare',
      category: 'package',
      stats: '+240% Engagement',
      metric: '€1.2M sales in 90 days',
      desc: 'Reimagined a sustainable luxury cosmetic line with ultra-minimalist tactile physical packaging and a unified European digital campaign strategy.',
      details: 'Designed with custom debossed boxes, deep earth hues, and elegant editorial layouts. Conducted global asset pipelines for high-end rendering.',
      image: 'https://picsum.photos/seed/skincare/800/600',
    },
    {
      id: 'cs-2',
      title: 'Vertex Decentralized Bank',
      category: 'web',
      stats: '12.4x User Session Lift',
      metric: '€18M raised in Series A',
      desc: 'Architected a highly responsive financial cockpit UI with seamless micro-animations, customizable dark charts, and instant transaction states.',
      details: 'Built fully fluid grids that automatically transition smoothly from mobile viewport cards into dense data-visual dashboards on 4K monitors.',
      image: 'https://picsum.photos/seed/webui/800/600',
    },
    {
      id: 'cs-3',
      title: 'Chrono Space Exploration',
      category: 'brand',
      stats: '3.4M Brand Interactions',
      metric: 'Top 10 Global Launch',
      desc: 'Designed custom modular brand guidelines, immersive 3D packaging, and full digital interface designs representing virtual zero-gravity habitats.',
      details: 'Engineered a highly aesthetic visual design ecosystem including technical packaging models and dynamic digital interfaces.',
      image: 'https://picsum.photos/seed/spatial/800/600',
    },
  ];

  const filteredCaseStudies = portfolioFilter === 'all'
    ? caseStudies
    : caseStudies.filter(cs => cs.category === portfolioFilter);

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 selection:bg-neutral-800 overflow-x-hidden">

      {/* GLASSMORPHIC NAVIGATION BAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl h-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-between px-8 transition-all duration-300">
        <div className="w-full flex items-center justify-between">
          <div
            onClick={() => scrollTo('hero')}
            className="flex items-center space-x-2 cursor-pointer group"
            id="nav-logo"
          >
            <div className="text-lg font-black tracking-tighter text-white flex items-center">
              ASTRELL<span className="text-[#FF3E00] text-xl font-black ml-0.5">.</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollTo('expertise')}
              className={cn(
                "text-xs font-bold uppercase tracking-widest transition-all duration-200",
                activeSection === 'expertise' ? 'text-white' : 'text-white/50 hover:text-white'
              )}
              id="btn-nav-expertise"
            >
              Expertise
            </button>
            <button
              onClick={() => scrollTo('proof')}
              className={cn(
                "text-xs font-bold uppercase tracking-widest transition-all duration-200",
                activeSection === 'proof' ? 'text-white' : 'text-white/50 hover:text-white'
              )}
              id="btn-nav-proof"
            >
              Work
            </button>
            <button
              onClick={() => scrollTo('process')}
              className={cn(
                "text-xs font-bold uppercase tracking-widest transition-all duration-200",
                activeSection === 'process' ? 'text-white' : 'text-white/50 hover:text-white'
              )}
              id="btn-nav-process"
            >
              Process
            </button>
            <button
              onClick={() => scrollTo('team')}
              className={cn(
                "text-xs font-bold uppercase tracking-widest transition-all duration-200",
                activeSection === 'team' ? 'text-white' : 'text-white/50 hover:text-white'
              )}
              id="btn-nav-team"
            >
              Team
            </button>
            <a
              href="/gallery"
              className="text-xs font-bold uppercase tracking-widest transition-all duration-200 text-white/50 hover:text-white"
              id="btn-nav-gallery"
            >
              Gallery
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase">
              🇬🇧 UK: {londonTime || '12:00:00'}
            </span>
            <button
              onClick={() => scrollTo('contact')}
              className="bg-[#FF3E00] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-tight hover:bg-[#E03600] transition-all duration-300 hover:scale-105"
              id="btn-nav-cta"
            >
              Start Project
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white"
            id="btn-mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-neutral-950 pt-24 px-6 md:hidden flex flex-col justify-between pb-10"
            id="mobile-drawer"
          >
            <div className="space-y-6 flex flex-col pt-8">
              <button
                onClick={() => scrollTo('expertise')}
                className="text-3xl font-display font-bold text-left text-neutral-200 hover:text-white"
              >
                01. Our Expertise
              </button>
              <button
                onClick={() => scrollTo('proof')}
                className="text-3xl font-display font-bold text-left text-neutral-200 hover:text-white"
              >
                02. Proof & Case Studies
              </button>
              <button
                onClick={() => scrollTo('process')}
                className="text-3xl font-display font-bold text-left text-neutral-200 hover:text-white"
              >
                03. Creative Process
              </button>
              <button
                onClick={() => scrollTo('team')}
                className="text-3xl font-display font-bold text-left text-neutral-200 hover:text-white"
              >
                04. The Team of 5
              </button>
              <a
                href="/gallery"
                className="text-3xl font-display font-bold text-left text-neutral-200 hover:text-white"
              >
                05. Gallery
              </a>
              <button
                onClick={() => scrollTo('contact')}
                className="text-3xl font-display font-bold text-left text-white underline decoration-neutral-700 underline-offset-8"
              >
                06. Secure Partnership
              </button>
            </div>

            <div className="border-t border-neutral-800 pt-6 space-y-4">
              <div className="flex justify-between text-xs font-mono text-neutral-400">
                <span>LONDON HQ TIME</span>
                <span className="text-white">{londonTime}</span>
              </div>
              <button
                onClick={() => scrollTo('contact')}
                className="w-full bg-white text-black py-4 rounded-xl font-display font-bold text-sm tracking-wider uppercase text-center"
              >
                Begin Discovery Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION WITH INTERACTIVE 3D ORB */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative pt-36 pb-32 md:pt-56 md:pb-48 px-6 md:px-16 lg:px-24 xl:px-32 w-full max-w-[1800px] mx-auto flex flex-col justify-center min-h-[90vh] overflow-hidden"
        id="hero"
      >
        {/* INTERACTIVE 3D PRODUCT DEMO */}
        <div
          className="absolute right-[-10%] md:right-[5%] top-1/2 -translate-y-1/2 z-0 hidden lg:flex flex-col items-center justify-center cursor-grab active:cursor-grabbing w-[450px] h-[550px] select-none"
          onMouseDown={handleHeroMouseDown}
          onMouseMove={handleHeroMouseMove}
          onMouseUp={handleHeroMouseUpOrLeave}
          onMouseEnter={() => setIsHoveringHero(true)}
          onMouseLeave={(e) => {
            handleHeroMouseUpOrLeave();
            setIsHoveringHero(false);
          }}
          onTouchStart={handleHeroMouseDown}
          onTouchMove={handleHeroMouseMove}
          onTouchEnd={handleHeroMouseUpOrLeave}
          style={{ perspective: '1200px' }}
        >
          {/* Add a subtle glow behind the product */}
          <div className="absolute inset-0 bg-[#FF3E00]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="absolute top-10 text-[9px] font-mono text-neutral-500 tracking-widest uppercase text-center flex items-center justify-center gap-1.5 opacity-60 pointer-events-none">
            <Move size={11} className="animate-bounce" />
            Drag to Rotate Product
          </div>

          {/* Realistic Dynamic Floor Shadow */}
          <div
            className="absolute bottom-12 w-[300px] h-[80px] bg-black/80 rounded-full blur-2xl pointer-events-none transition-all duration-300"
            style={{
              transform: `scale(${1 + Math.abs(Math.sin((heroRotY * Math.PI) / 180)) * 0.25}) rotate(${heroRotY * 0.15}deg)`,
              opacity: 0.6 + Math.abs(Math.cos((heroRotX * Math.PI) / 180)) * 0.2
            }}
          />

          <div
            className="w-[340px] h-[190px] relative transition-transform duration-[50ms]"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${heroRotX}deg) rotateY(${heroRotY}deg)`
            }}
          >
            {/* Front Face */}
            <div
              className="absolute inset-0 rounded-[2px] shadow-2xl overflow-hidden bg-cover bg-center border border-white/20"
              style={{
                backgroundImage: `url('/packaging/front_face.webp')`,
                transform: 'translateZ(127px)',
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Dynamic Spot-UV Gloss Sheen Reflection */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/25 to-white/0 pointer-events-none transition-opacity duration-200"
                style={{ opacity: Math.max(0.1, Math.cos(((heroRotY - 20) * Math.PI) / 180)) }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/10 pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_12px_rgba(0,0,0,0.12)] pointer-events-none" />
            </div>

            {/* Back Face */}
            <div
              className="absolute inset-0 rounded-[2px] shadow-2xl overflow-hidden bg-cover bg-center border border-white/10"
              style={{
                backgroundImage: `url('/packaging/back_face.webp')`,
                transform: 'rotateY(180deg) translateZ(127px)',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/10 pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.2)] pointer-events-none" />
            </div>

            {/* Right Side Face */}
            <div
              className="absolute m-auto top-0 bottom-0 rounded-[2px] shadow-xl overflow-hidden bg-cover bg-center border border-white/10"
              style={{
                left: '50%',
                marginLeft: '-127px',
                width: '254px',
                height: '100%',
                backgroundImage: `url('/packaging/side_face.webp')`,
                transform: 'rotateY(90deg) translateZ(170px)',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.18)] pointer-events-none" />
            </div>

            {/* Left Side Face */}
            <div
              className="absolute m-auto top-0 bottom-0 rounded-[2px] shadow-xl overflow-hidden bg-cover bg-center border border-white/10"
              style={{
                left: '50%',
                marginLeft: '-127px',
                width: '254px',
                height: '100%',
                backgroundImage: `url('/packaging/side_left.webp')`,
                transform: 'rotateY(-90deg) translateZ(170px)',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.18)] pointer-events-none" />
            </div>

            {/* Top Face */}
            <div
              className="absolute m-auto left-0 right-0 rounded-[2px] shadow-xl overflow-hidden bg-cover bg-center border border-white/20"
              style={{
                top: '50%',
                marginTop: '-127px',
                height: '254px',
                width: '100%',
                backgroundImage: `url('/packaging/top_face.webp')`,
                transform: 'rotateX(90deg) translateZ(95px)',
                backfaceVisibility: 'hidden'
              }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/15 pointer-events-none"
                style={{ opacity: Math.max(0.2, Math.sin(((heroRotX + 15) * Math.PI) / 180)) }}
              />
              <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.12)] pointer-events-none" />
            </div>

            {/* Bottom Face (Product Details) */}
            <div
              className="absolute m-auto left-0 right-0 rounded-[2px] shadow-2xl overflow-hidden bg-cover bg-center border border-black/20"
              style={{
                top: '50%',
                marginTop: '-127px',
                height: '254px',
                width: '100%',
                backgroundImage: `url('/packaging/bottom_face.webp')`,
                transform: 'rotateX(-90deg) translateZ(95px)',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="absolute inset-0 bg-black/25 pointer-events-none" />
            </div>
          </div>

          {/* Interactive Quick-View Presets Bar */}
          <div className="absolute bottom-4 flex items-center gap-1.5 z-20 bg-neutral-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-mono text-neutral-400">
            <span className="text-white/40 uppercase tracking-widest mr-1">VIEW:</span>
            <button
              onClick={(e) => { e.stopPropagation(); setHeroRotX(0); setHeroRotY(0); }}
              className="px-2 py-0.5 rounded hover:bg-white/10 hover:text-white transition-colors"
            >
              Front
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setHeroRotX(75); setHeroRotY(0); }}
              className="px-2 py-0.5 rounded hover:bg-white/10 hover:text-white transition-colors"
            >
              Top
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setHeroRotX(0); setHeroRotY(180); }}
              className="px-2 py-0.5 rounded hover:bg-white/10 hover:text-white transition-colors"
            >
              Back
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setHeroRotX(-75); setHeroRotY(0); }}
              className="px-2 py-0.5 rounded hover:bg-white/10 hover:text-white transition-colors"
            >
              Bottom
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setHeroRotX(-35); setHeroRotY(-30); }}
              className="px-2 py-0.5 font-bold text-[#FF3E00] rounded hover:bg-[#FF3E00]/10 transition-colors"
            >
              Default View
            </button>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -left-20 top-20 w-72 h-72 bg-neutral-900 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="relative z-10 max-w-4xl xl:max-w-5xl space-y-10">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#FF3E00] font-mono tracking-[0.2em] uppercase text-[11px] font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#FF3E00] animate-pulse"></span>
            <span>England HQ • Global Remote Syndicate</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.95] font-black tracking-tight uppercase text-white">
            WE SHAPE VISION INTO{' '}
            <span className="font-cursive text-[#FF3E00] font-normal normal-case text-[0.88em] tracking-normal inline-block transform hover:scale-105 transition-transform duration-300">
              extraordinary
            </span>{' '}
            DIGITAL POWER.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-sans font-normal leading-relaxed max-w-2xl">
            We build high-performance websites, packaging, and digital systems designed to elevate brands and unlock exponential growth.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-2">
            <button
              onClick={() => scrollTo('contact')}
              className="group bg-[#FF3E00] text-white hover:bg-[#E03600] px-8 py-4 rounded-full font-display font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl shadow-[#FF3E00]/20 hover:scale-[1.02]"
              id="btn-hero-cta"
            >
              <span>Partner With Us</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
            <a
              href="/gallery"
              className="group bg-transparent hover:bg-white/5 text-white px-8 py-4 rounded-full font-display font-medium text-sm tracking-wider uppercase border border-white/15 hover:border-white/30 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-[1.02]"
              id="btn-hero-secondary"
            >
              <span>Explore Gallery</span>
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </a>
          </div>
        </div>

        {/* Global location ticker */}
        <div className="border-y border-white/10 py-6 mt-16 md:mt-24 z-10">
          <div className="flex flex-wrap gap-y-3 justify-between items-center text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase font-bold">
            <span className="text-white">Active Collaboration Zones</span>
            <span>United Kingdom (HQ)</span>
            <span>•</span>
            <span>Western Europe</span>
            <span>•</span>
            <span>Middle East (Amman)</span>
            <span>•</span>
            <span>Worldwide remote</span>
          </div>
        </div>
      </section>

      {/* CREDIBILITY & STATS SECTION (Proof of Quality) */}
      <section className="bg-[#0A0A0A] py-28 md:py-36 px-8 border-b border-white/5" id="credibility-stats">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            <div className="p-10 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 group hover:border-[#FF3E00]/30 transition-all duration-300">
              <span className="text-xs font-mono tracking-widest text-[#FF3E00] uppercase font-bold">01 / Business Lift</span>
              <div>
                <h3 className="text-5xl md:text-6xl font-display font-black tracking-tighter text-white mb-2 group-hover:text-[#FF3E00] transition-colors duration-300">+180%</h3>
                <p className="text-sm text-white/60 leading-relaxed font-sans font-light">
                  Average client organic digital conversion rate increase within 6 months post-launch.
                </p>
              </div>
            </div>

            <div className="p-10 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 group hover:border-[#FF3E00]/30 transition-all duration-300">
              <span className="text-xs font-mono tracking-widest text-[#FF3E00] uppercase font-bold">02 / Commercial Impact</span>
              <div>
                <h3 className="text-5xl md:text-6xl font-display font-black tracking-tighter text-white mb-2 group-hover:text-[#FF3E00] transition-colors duration-300">€45M+</h3>
                <p className="text-sm text-white/60 leading-relaxed font-sans font-light">
                  Client funding and sales revenue directly unlocked through our product layouts.
                </p>
              </div>
            </div>

            <div className="p-10 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 group hover:border-[#FF3E00]/30 transition-all duration-300">
              <span className="text-xs font-mono tracking-widest text-[#FF3E00] uppercase font-bold">03 / Core Competency</span>
              <div>
                <h3 className="text-5xl md:text-6xl font-display font-black tracking-tighter text-white mb-2 group-hover:text-[#FF3E00] transition-colors duration-300">100%</h3>
                <p className="text-sm text-white/60 leading-relaxed font-sans font-light">
                  Seamless asynchronous delivery success using daily structured video and Figma syncs.
                </p>
              </div>
            </div>

            <div className="p-10 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 group hover:border-[#FF3E00]/30 transition-all duration-300">
              <span className="text-xs font-mono tracking-widest text-[#FF3E00] uppercase font-bold">04 / Client Trust</span>
              <div>
                <h3 className="text-5xl md:text-6xl font-display font-black tracking-tighter text-white mb-2 group-hover:text-[#FF3E00] transition-colors duration-300">5.0 / 5</h3>
                <p className="text-sm text-white/60 leading-relaxed font-sans font-light">
                  Active net promoter rating across global brand owners, marketing executives, and tech founders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE BRAND IDEOLOGY - MINIMALIST MANIFESTO */}
      <section className="py-32 md:py-48 px-8 bg-neutral-950 relative overflow-hidden" id="expertise">
        {/* Subtle background gradient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF3E00]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 text-[#FF3E00] font-bold tracking-[0.2em] uppercase text-xs mb-8">
                <div className="h-[1px] w-12 bg-[#FF3E00]"></div>
                <span>Our Core Ideology</span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9]">
                The<br />
                ASTRELL<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600">Difference.</span>
              </h2>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center gap-12 md:gap-20">

              {/* Point 1 */}
              <div className="group border-t border-white/10 pt-8 transition-colors hover:border-[#FF3E00]/50">
                <h3 className="font-display text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-4">
                  <span className="text-[#FF3E00] text-sm tracking-widest font-mono">01</span>
                  Radical Simplicity
                </h3>
                <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                  We believe true sophistication lies in reduction. Our interfaces and physical products strip away the unnecessary, leaving only what drives engagement and pure aesthetic resonance.
                </p>
              </div>

              {/* Point 2 */}
              <div className="group border-t border-white/10 pt-8 transition-colors hover:border-[#FF3E00]/50">
                <h3 className="font-display text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-4">
                  <span className="text-[#FF3E00] text-sm tracking-widest font-mono">02</span>
                  Creative Eminence
                </h3>
                <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                  We do not do templates. Every pixel, motion path, and layout is custom-engineered to win industry accolades and permanently elevate your brand above the noise of your competitors.
                </p>
              </div>

              {/* Point 3 */}
              <div className="group border-t border-white/10 pt-8 transition-colors hover:border-[#FF3E00]/50">
                <h3 className="font-display text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-4">
                  <span className="text-[#FF3E00] text-sm tracking-widest font-mono">03</span>
                  Rigorous Precision
                </h3>
                <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                  Beneath the creative surface is a data-driven business methodology. We deliver on time, communicate transparently, and align every design decision with measurable commercial outcomes.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3D GALLERY SECTION */}
      <ThreeDGallery />

      {/* PORTFOLIO & PROOF OF QUALITY (Selected Works & Performance) */}
      <CozyWorksShowcase />

      {/* TRANSPARENT DESIGN PROCESS (METHODOLOGY & ALIGNMENT) */}
      <MethodologySection />

      {/* MEET THE TEAM OF FIVE (Aesthetic Profile Grid) */}
      <section className="py-32 md:py-40 bg-[#0A0A0A]/40 border-t border-white/5 px-8" id="team">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 text-[#FF3E00] font-bold tracking-[0.2em] uppercase text-xs mb-3">
                <div className="h-[1px] w-12 bg-[#FF3E00]"></div>
                <span>The Creators Behind The Craft</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-white mt-3 mb-6 uppercase">
                MEET THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">ASTRELL TEAM.</span>
              </h2>
              <div className="text-lg text-neutral-400 font-light leading-relaxed space-y-4">
                <p>We do not employ account executives, sales representatives, or middlemen.</p>
                <p>You collaborate directly with five seasoned craftsmen who translate company goals into technical layouts.</p>
              </div>
            </div>

            {/* SYNC VISUALIZER STATUS */}
            <div className="mt-8 md:mt-0 p-5 bg-neutral-900 rounded-2xl border border-neutral-850 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-white font-bold">SYNDICATE SYNC STATUS</span>
              </div>
              <div className="text-[10px] font-mono text-neutral-400 max-w-[260px] leading-relaxed space-y-2">
                <p>Our England workspace is currently in active coordination.</p>
                <p>Daily client handoffs in progress for Europe & Middle East timelines.</p>
              </div>
            </div>
          </div>

          {/* TEAM SHOWCASE */}
          <TeamShowcase />
        </div>
      </section>

      {/* ENGLAND HQ & WORLDWIDE REMOTE COORDINATION HUB */}
      <section className="py-32 md:py-40 bg-[#0A0A0A] px-8 border-t border-b border-white/5" id="england-hq">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-4 text-[#FF3E00] font-bold tracking-[0.2em] uppercase text-xs">
              <div className="h-[1px] w-12 bg-[#FF3E00]"></div>
              <span>Global remote collaboration</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-white leading-none uppercase">
              REMOTE SYNDICATE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">ENGLAND ROOTS.</span>
            </h2>
            <div className="text-lg text-neutral-400 font-light leading-relaxed space-y-4">
              <p>Our core workshop resides in the historical design quarters of England.</p>
              <p>We operate without borders, coordinating asynchronous alignment across European timelines and Middle East business centers.</p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-neutral-900 rounded border border-neutral-850 text-emerald-400 mt-1">
                  <Check size={14} />
                </div>
                <div>
                  <span className="font-display font-bold text-white text-base block">Zero Timeline Slip</span>
                  <span className="text-sm text-neutral-400 font-light">
                    We overlap directly with European CET and Gulf GST business hours to schedule instantaneous coordination.
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-neutral-900 rounded border border-neutral-850 text-emerald-400 mt-1">
                  <Check size={14} />
                </div>
                <div>
                  <span className="font-display font-bold text-white text-base block">Transparent Handoffs</span>
                  <span className="text-sm text-neutral-400 font-light">
                    Every design brief, raw CAD package, and web build is stored in a permanent dashboard accessible 24/7.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC TIME CONVERTER GRID */}
          <div className="lg:col-span-6 bg-neutral-900/40 p-8 rounded-3xl border border-neutral-900 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">Workspace Timeline Coordinates</span>
              <Globe className="text-neutral-500" size={18} />
            </div>

            <div className="space-y-4">

              {/* London Time */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 block uppercase">ASTRELL HQ — LONDON (BST/GMT)</span>
                  <span className="font-display font-black text-xl text-white">United Kingdom</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl text-emerald-400 block font-bold">{londonTime || '12:00:00'}</span>
                  <span className="text-[9px] font-mono text-neutral-500">CURRENT BASE TIME</span>
                </div>
              </div>

              {/* Central Europe Time */}
              <div className="p-4 bg-neutral-950/60 rounded-xl border border-neutral-850 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 block uppercase">EUROPE CLIENT TIME (CET/CEST)</span>
                  <span className="font-display font-black text-lg text-neutral-300">Paris, Milan, Amsterdam</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xl text-neutral-300 block font-bold">{cetTime || '13:00:00'}</span>
                  <span className="text-[9px] font-mono text-neutral-500">HQ +1 HOUR OVERLAP</span>
                </div>
              </div>

              {/* Gulf Time */}
              <div className="p-4 bg-neutral-950/60 rounded-xl border border-neutral-850 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 block uppercase">MIDDLE EAST CLIENT TIME (GST)</span>
                  <span className="font-display font-black text-lg text-neutral-300">Dubai, Abu Dhabi, Riyadh, Amman</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xl text-neutral-300 block font-bold">{gstTime || '15:00:00'}</span>
                  <span className="text-[9px] font-mono text-neutral-500">HQ +3 HOURS OVERLAP</span>
                </div>
              </div>

            </div>

            <p className="text-xs text-neutral-500 font-mono text-center pt-2">
              ● All worldwide clients receive custom asynchronous briefing videos recorded daily.
            </p>
          </div>

        </div>
      </section>

      {/* SECURE PARTNERSHIP & PROJECT PLANNER (Conversion Form) */}
      <section className="py-32 md:py-40 px-8 max-w-7xl mx-auto" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4 text-[#FF3E00] font-bold tracking-[0.2em] uppercase text-xs">
              <div className="h-[1px] w-12 bg-[#FF3E00]"></div>
              <span>{"Let's Build Your Digital Legacy"}</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-white leading-none uppercase">
              BEGIN SECURE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">PARTNERSHIP.</span>
            </h2>
            <div className="text-lg text-neutral-400 font-light leading-relaxed space-y-4">
              <p>We do not distribute template forms or push generic sales pitches.</p>
              <p>Draft your custom creative brief here. Our lead developer and creative director will build an initial proposal within 48 hours.</p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center space-x-3 text-sm text-neutral-400 font-light">
                <CheckCircle2 className="text-[#FF3E00] flex-shrink-0" size={20} />
                <span>NDA protected discovery conversations by default.</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-neutral-400 font-light">
                <CheckCircle2 className="text-[#FF3E00] flex-shrink-0" size={20} />
                <span>Transparent hourly/fixed budgets with absolute tracking.</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-neutral-400 font-light">
                <CheckCircle2 className="text-[#FF3E00] flex-shrink-0" size={20} />
                <span>Direct communication via Slack/Teams with the ASTRELL team.</span>
              </div>
            </div>

            {/* BRIEF SUBMISSION ARCHIVE (localStorage feedback loop) */}
            {inquiryHistory.length > 0 && (
              <div className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white font-bold flex items-center space-x-2">
                    <Briefcase size={14} className="text-[#FF3E00]" />
                    <span>YOUR ACTIVE BRIEF INQUIRIES ({inquiryHistory.length})</span>
                  </span>
                  <span className="text-[8px] font-mono text-[#FF3E00] uppercase bg-black px-2 py-0.5 rounded border border-white/10">Saved Locally</span>
                </div>

                <div className="space-y-3 max-h-[180px] overflow-y-auto pr-2">
                  {inquiryHistory.map((inq) => (
                    <div key={inq.id} className="p-3 bg-black/40 rounded-xl border border-white/10 space-y-1 text-xs">
                      <div className="flex justify-between text-neutral-400 font-mono text-[10px]">
                        <span className="font-bold text-white">{inq.clientName}</span>
                        <span>{inq.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-neutral-300 font-light truncate">
                        Brief: {inq.brief}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        <span className="text-[8px] font-mono bg-white/5 text-neutral-400 px-1 py-0.5 rounded border border-white/5">
                          Budget: {inq.budget}
                        </span>
                        {inq.services.map((s, idx) => (
                          <span key={idx} className="text-[8px] font-mono bg-white/5 text-neutral-400 px-1 py-0.5 rounded border border-white/5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DYNAMIC BRIEF BUILDER FORM */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 relative">
            <h3 className="font-display font-black text-2xl text-white mb-6 tracking-tight uppercase">Interactive Brief Planner</h3>

            <form onSubmit={handleSubmitBrief} className="space-y-6" id="form-brief-planner">

              {/* Name & Email Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/40 uppercase block font-bold tracking-widest">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Jean-Luc Piccard"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#FF3E00]/40 transition-all font-sans font-light"
                    id="input-brief-name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/40 uppercase block font-bold tracking-widest">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. jeanluc@enterprise.eu"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#FF3E00]/40 transition-all font-sans font-light"
                    id="input-brief-email"
                  />
                </div>
              </div>

              {/* Service selector */}
              <div className="space-y-3">
                <label className="text-[10px] font-mono text-white/40 uppercase block font-bold tracking-widest">Which Expertise Areas Do You Require?</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    'Website Design',
                    'Branding & Identity',
                    'Packaging Design'
                  ].map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <div
                        key={service}
                        onClick={() => toggleService(service)}
                        className={cn(
                          "p-3 rounded-xl border cursor-pointer text-xs font-mono text-center transition-all duration-200 select-none",
                          isSelected
                            ? 'bg-[#FF3E00] text-white font-bold border-[#FF3E00]'
                            : 'bg-black/40 text-white/50 border-white/10 hover:border-white/20'
                        )}
                        id={`srv-${service.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {service}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Budget selector */}
              <div className="space-y-3">
                <label className="text-[10px] font-mono text-white/40 uppercase block font-bold tracking-widest">Estimated Project Budget Tier</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['€5k - €10k', '€10k - €20k', '€20k - €50k', '€50k+'].map((tier) => (
                    <div
                      key={tier}
                      onClick={() => setBudgetTier(tier)}
                      className={cn(
                        "p-3 rounded-xl border cursor-pointer text-xs font-mono text-center transition-all duration-200 select-none",
                        budgetTier === tier
                          ? 'bg-[#FF3E00] text-white font-bold border-[#FF3E00]'
                          : 'bg-black/40 text-white/50 border-white/10 hover:border-white/20'
                      )}
                      id={`budget-${tier.replace(/\s+/g, '-')}`}
                    >
                      {tier}
                    </div>
                  ))}
                </div>
              </div>

              {/* Project brief details */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/40 uppercase block font-bold tracking-widest">Outline your objectives & challenges</label>
                <textarea
                  rows={4}
                  value={briefText}
                  onChange={(e) => setBriefText(e.target.value)}
                  placeholder="Outline key metrics you want to improve, manufacturing requirements, launch deadlines, or structural challenges..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#FF3E00]/40 transition-all font-sans font-light resize-none"
                  id="textarea-brief-detail"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-[#FF3E00] text-white hover:bg-[#E03600] py-4 rounded-xl font-display font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl shadow-[#FF3E00]/10"
                id="btn-submit-brief"
              >
                <Send size={16} />
                <span>Submit Secure Brief</span>
              </button>

            </form>

            {/* Success Feedback Modal overlay */}
            <AnimatePresence>
              {formSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/95 rounded-3xl flex flex-col items-center justify-center p-8 text-center z-20"
                  id="success-overlay"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    className="space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#FF3E00] text-white flex items-center justify-center mx-auto text-2xl">
                      ✓
                    </div>
                    <h4 className="font-display font-black text-2xl text-white">BRIEF TRANSMITTED SECURELY</h4>
                    <p className="text-sm text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
                      {"Thank you! Your strategic brief has been saved locally and logged to ASTRELL's coordination portal. Rand and Elena will schedule a review and follow up within 24 hours."}
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="bg-[#FF3E00] text-white hover:bg-[#E03600] px-6 py-2.5 rounded-full font-mono text-xs uppercase transition-colors"
                    >
                      Draft Another Brief
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
