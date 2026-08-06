'use client';

import * as React from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

interface StatCardData {
  id: string;
  numberTag: string;
  value: string;
  valueSizeClass: string;
  description: string;
  image: string;
  imageAlt: string;
  accentGlow: string;
  colSpanClasses: string;
  desktopDirection: 'left' | 'right';
  parallaxRange: [number, number];
}

const STAT_CARDS: StatCardData[] = [
  {
    id: 'conversion-lift',
    numberTag: '01 — Conversion Lift',
    value: '+180%',
    valueSizeClass: 'text-4xl sm:text-5xl lg:text-6xl',
    description: 'Average increase in client conversion rate within 6 months of launch.',
    image: '/stats/conversion-lift.png',
    imageAlt: 'Conversion Lift background',
    accentGlow: 'from-[#FF3E00]/20 via-transparent to-purple-600/15',
    colSpanClasses: 'col-span-2 sm:col-span-1 lg:col-span-1',
    desktopDirection: 'left',
    parallaxRange: [-22, 22]
  },
  {
    id: 'revenue-unlocked',
    numberTag: '02 — Revenue Unlocked',
    value: '€45M+',
    valueSizeClass: 'text-3xl sm:text-5xl lg:text-6xl',
    description: 'Client funding and sales generated through our design.',
    image: '/stats/revenue-unlocked.png',
    imageAlt: 'Revenue Unlocked background',
    accentGlow: 'from-amber-500/20 via-transparent to-[#FF3E00]/15',
    colSpanClasses: 'col-span-1',
    desktopDirection: 'right',
    parallaxRange: [16, -16]
  },
  {
    id: 'ontime-delivery',
    numberTag: '03 — On-Time Delivery',
    value: '100%',
    valueSizeClass: 'text-3xl sm:text-5xl lg:text-6xl',
    description: 'Every project delivered on schedule, tracked daily.',
    image: '/stats/ontime-delivery.jpg',
    imageAlt: 'On-Time Delivery background',
    accentGlow: 'from-emerald-500/20 via-transparent to-[#FF3E00]/15',
    colSpanClasses: 'col-span-1',
    desktopDirection: 'left',
    parallaxRange: [-26, 26]
  },
  {
    id: 'client-satisfaction',
    numberTag: '04 — Client Satisfaction',
    value: '5.0 / 5',
    valueSizeClass: 'text-4xl sm:text-5xl lg:text-6xl',
    description: 'Average rating across founders, marketers, and brand owners.',
    image: '/stats/client-satisfaction.jpg',
    imageAlt: 'Client Satisfaction background',
    accentGlow: 'from-blue-500/20 via-transparent to-[#FF3E00]/15',
    colSpanClasses: 'col-span-2 sm:col-span-1 lg:col-span-1',
    desktopDirection: 'right',
    parallaxRange: [18, -18]
  }
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    setIsDesktop(mql.matches);
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
    } else {
      mql.addListener(onChange);
    }
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', onChange);
      } else {
        mql.removeListener(onChange);
      }
    };
  }, []);

  return isDesktop;
}

function StatCardItem({
  card,
  index,
  isDesktop,
  shouldReduceMotion,
  scrollYProgress,
  isMounted
}: {
  card: StatCardData;
  index: number;
  isDesktop: boolean;
  shouldReduceMotion: boolean;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  isMounted: boolean;
}) {
  const rawParallax = useTransform(scrollYProgress, [0, 1], card.parallaxRange);
  const smoothParallax = useSpring(rawParallax, { stiffness: 80, damping: 25, mass: 0.5 });

  const parallaxY = isMounted && !shouldReduceMotion ? smoothParallax : 0;

  const initialX = shouldReduceMotion
    ? 0
    : isDesktop
    ? card.desktopDirection === 'left'
      ? -70
      : 70
    : 0;

  const initialY = shouldReduceMotion ? 0 : isDesktop ? 0 : 40;
  const initialScale = shouldReduceMotion ? 1 : 0.95;

  return (
    <motion.div
      style={{ y: parallaxY }}
      className={cn('h-full transform-gpu', card.colSpanClasses)}
    >
      <motion.div
        initial={
          isMounted
            ? {
                opacity: 0,
                x: initialX,
                y: initialY,
                scale: initialScale
              }
            : false
        }
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1
        }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration: shouldReduceMotion ? 0.3 : 0.85,
          delay: shouldReduceMotion ? 0 : index * 0.14,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="h-full"
      >
        <div className="relative group overflow-hidden p-5 sm:p-7 lg:p-9 bg-neutral-900/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 flex flex-col justify-between hover:border-[#FF3E00]/40 group-active:border-[#FF3E00]/60 transition-all duration-500 shadow-2xl min-h-[220px] sm:min-h-[280px] lg:min-h-[320px] touch-manipulation select-none active:scale-[0.98] h-full">
          {/* Background Image with Edge-to-Edge Zoom & Blur Effect */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={card.image}
              alt={card.imageAlt}
              className="w-full h-full object-cover object-center opacity-45 group-hover:opacity-80 group-active:opacity-90 scale-105 group-hover:scale-120 group-active:scale-125 blur-[1px] group-hover:blur-0 group-active:blur-0 transition-all duration-700 ease-out transform-gpu"
            />
            {/* Black Opacity Layer (30%) */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 group-active:bg-black/15 transition-colors duration-500" />
            {/* Soft Light Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/40" />
            {/* Subtle Ambient Accent Glow */}
            <div className={cn('absolute -inset-full bg-gradient-to-br opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-700 blur-xl', card.accentGlow)} />
          </div>

          {/* Card Content */}
          <div className="relative z-10 flex flex-col justify-between h-full space-y-4 sm:space-y-6 lg:space-y-8">
            <span className="text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest text-[#FF3E00] uppercase font-bold flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00] group-hover:scale-150 group-active:scale-150 transition-transform" />
              {card.numberTag}
            </span>
            <div className="space-y-1 sm:space-y-2">
              <h3 className={cn('font-display font-black tracking-tighter text-white group-hover:text-[#FF3E00] group-active:text-[#FF3E00] transition-colors duration-300', card.valueSizeClass)}>
                {card.value}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-snug sm:leading-relaxed font-sans font-light group-hover:text-white group-active:text-white transition-colors duration-300">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function StatsSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = !isMounted || !!prefersReducedMotion;

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  return (
    <section
      ref={sectionRef}
      className="bg-[#0A0A0A] py-20 sm:py-28 md:py-36 px-4 sm:px-8 border-b border-white/5 relative overflow-hidden"
      id="credibility-stats"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Bento Grid Layout on Mobile & iPad (< lg), 4-Cols on Desktop (lg:) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 lg:gap-8">
          {STAT_CARDS.map((card, index) => (
            <StatCardItem
              key={card.id}
              card={card}
              index={index}
              isDesktop={isDesktop}
              shouldReduceMotion={shouldReduceMotion}
              scrollYProgress={scrollYProgress}
              isMounted={isMounted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
