'use client';

import * as React from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

interface NavItem {
  name: string;
  id: string;
  href?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Expertise', id: 'expertise' },
  { name: 'Work', id: 'proof' },
  { name: 'Process', id: 'process' },
  { name: 'Team', id: 'team' },
  { name: 'Gallery', id: 'gallery', href: '/gallery' },
  { name: 'Contact', id: 'contact' },
];

export default function SmartNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [londonTime, setLondonTime] = React.useState<string>('');
  const [activeSection, setActiveSection] = React.useState<string>('');
  const [isHidden, setIsHidden] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const { scrollY } = useScroll();
  const pathname = usePathname();
  const router = useRouter();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Determine if scrolled past top to change background opacity
    setIsScrolled(latest > 50);

    // Hide navbar when scrolling down, show when scrolling up
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  // Track active section based on scroll position if on home page
  React.useEffect(() => {
    if (pathname !== '/') {
      if (pathname === '/gallery') {
        // Use requestAnimationFrame to avoid synchronous state update warning
        requestAnimationFrame(() => setActiveSection('gallery'));
      }
      return;
    }

    const handleScroll = () => {
      const sections = NAV_ITEMS.filter(item => item.id !== 'gallery');
      let current = '';
      
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section's top is in the upper half of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section.id;
          }
        }
      }
      
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, activeSection]);

  // Load London local time
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const lon = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      setLondonTime(lon);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (id: string, href?: string) => {
    setMobileMenuOpen(false);
    
    if (href) {
      router.push(href);
      return;
    }

    if (pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <>
      <motion.nav 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-150%", opacity: 0 }
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl h-16 rounded-full flex items-center justify-between px-8 transition-colors duration-300 border",
          isScrolled 
            ? "bg-black/60 backdrop-blur-xl border-white/20 shadow-2xl" 
            : "bg-white/5 backdrop-blur-md border-white/10"
        )}
      >
        <div className="w-full flex items-center justify-between">
          <div
            onClick={() => handleNavClick('hero', '/')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="text-lg font-black tracking-tighter text-white flex items-center">
              ASTRELL<span className="text-[#FF3E00] text-xl font-black ml-0.5">.</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300",
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase">
              🇬🇧 UK: {londonTime || '12:00:00'}
            </span>
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-[#FF3E00] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-tight hover:bg-[#E03600] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#FF3E00]/20"
            >
              Start Project
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white z-50"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-neutral-950 pt-24 px-6 md:hidden flex flex-col justify-between pb-10"
          >
            <div className="space-y-6 flex flex-col pt-8">
              {NAV_ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={cn(
                    "text-3xl font-display font-bold text-left hover:text-white transition-colors duration-200",
                    activeSection === item.id 
                      ? "text-white underline decoration-neutral-700 underline-offset-8" 
                      : "text-neutral-200"
                  )}
                >
                  0{i + 1} — {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
