'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Phase {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  timeline: string;
  focus: string;
  deliverable: string;
  summary: string;
  metrics: string;
}

const PHASES: Phase[] = [
  {
    id: '01',
    number: '01',
    title: 'Discovery',
    subtitle: 'WEEKS 1–2',
    timeline: 'Weeks 1–2',
    focus: 'Understanding your business',
    deliverable: 'Strategy & Goals Brief',
    summary: 'We start with your numbers, your customers, and what\'s holding growth back — so every decision after this is built on real insight, not guesswork.',
    metrics: 'Strategy & Scope',
  },
  {
    id: '02',
    number: '02',
    title: 'Blueprint',
    subtitle: 'WEEKS 3–5',
    timeline: 'Weeks 3–5',
    focus: 'Designing the experience',
    deliverable: 'Interactive Prototype · 3 Design Directions',
    summary: 'We design multiple distinct directions — exploring layout, typography, color, and motion — so you choose the one that\'s right, not the only one you\'ve seen.',
    metrics: '3 Directions',
  },
  {
    id: '03',
    number: '03',
    title: 'Execution',
    subtitle: 'WEEKS 6–8',
    timeline: 'Weeks 6–8',
    focus: 'Building it for real',
    deliverable: 'Live Staging Site · 98+ Lighthouse Score',
    summary: 'Approved designs become fast, responsive, production-ready code — tested for performance every step of the way.',
    metrics: '98+ Lighthouse',
  },
  {
    id: '04',
    number: '04',
    title: 'Launch',
    subtitle: 'WEEKS 9–10',
    timeline: 'Weeks 9–10',
    focus: 'Going live',
    deliverable: 'Full Handoff Package · Zero-Downtime Launch',
    summary: 'We deploy your platform, hand over full source files and brand assets, and launch your marketing materials alongside it.',
    metrics: 'Zero Downtime',
  }
];

// --- Visual Components for Each Phase ---

const DiscoveryVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Grid background */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
    
    {/* Radar sweep */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="w-[280px] h-[280px] rounded-full border border-white/5 relative z-10"
    >
      <motion.div 
        className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent to-[#FF3E00]/80 origin-left"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ filter: "drop-shadow(0 0 8px #FF3E00)" }}
      />
    </motion.div>
    
    <div className="absolute w-[200px] h-[200px] rounded-full border border-white/10 z-10" />
    
    <div className="absolute w-[120px] h-[120px] rounded-full border border-[#FF3E00]/40 bg-[#FF3E00]/10 z-10 flex items-center justify-center backdrop-blur-sm">
       <Target className="text-[#FF3E00] opacity-80" size={36} />
    </div>

    {/* Floating Data Nodes */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)] z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
        style={{
          top: `${[35, 60, 45, 75, 25, 50][i]}%`,
          left: `${[40, 70, 30, 60, 50, 25][i]}%`
        }}
      />
    ))}
  </div>
);

const BlueprintVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,62,0,0.05)_0%,transparent_60%)]" />
    <motion.div 
      className="w-[260px] h-[260px] grid grid-cols-3 grid-rows-3 gap-3"
      initial={{ rotateX: 60, rotateZ: -45 }}
      animate={{ rotateX: 50, rotateZ: -35 }}
      transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    >
      {[...Array(9)].map((_, i) => (
        <motion.div
          key={i}
          className="w-full h-full border border-[#FF3E00]/40 bg-[#FF3E00]/10 backdrop-blur-md flex items-center justify-center"
          initial={{ opacity: 0, z: -100 }}
          animate={{ opacity: 1, z: 0 }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
        >
           <div className="w-full h-full border-[0.5px] border-white/10 m-1" />
        </motion.div>
      ))}
    </motion.div>
  </div>
);

const ExecutionVisual = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center gap-6 px-12">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
    
    <div className="w-full max-w-[320px] bg-black/60 border border-white/10 rounded-xl p-6 backdrop-blur-xl z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
       <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
       </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-full h-3 flex gap-3 mb-4 last:mb-0">
          <motion.div
            className="h-full bg-white/20 rounded"
            initial={{ width: "0%" }}
            animate={{ width: `${[30, 45, 25, 40, 35][i]}%` }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.2, ease: "easeInOut" }}
          />
          <motion.div
            className="h-full bg-[#FF3E00]/70 rounded"
            initial={{ width: "0%" }}
            animate={{ width: `${[40, 30, 50, 35, 45][i]}%` }}
            transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", delay: i * 0.2 + 0.3, ease: "easeInOut" }}
          />
        </div>
      ))}
    </div>
  </div>
);

const LaunchVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,62,0,0.08)_0%,transparent_70%)]" />
    
    {/* Core */}
    <div className="absolute w-24 h-24 bg-gradient-to-tr from-[#FF3E00] to-[#FF8A00] rounded-full shadow-[0_0_80px_rgba(255,62,0,0.6)] z-20 flex items-center justify-center">
      <Zap className="text-white" size={40} fill="currentColor" />
    </div>
    
    {/* Expanding Rings */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-24 h-24 border border-[#FF3E00] rounded-full z-10"
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{ scale: 5, opacity: 0 }}
        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
      />
    ))}

    {/* Rising Particles */}
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 bg-[#FF3E00] rounded-full z-30 shadow-[0_0_10px_#FF3E00]"
        initial={{ y: 150, opacity: 0, x: [-100, 50, 120, -50, 80, -120, 20, 90, -30, 110, -70, 40, -90, 60, -10][i] }}
        animate={{ y: -150, opacity: [0, 1, 0] }}
        transition={{ duration: 2 + (i % 3) * 0.5, repeat: Infinity, delay: (i % 5) * 0.4, ease: "linear" }}
      />
    ))}
  </div>
);

const PhaseVisualManager = ({ phaseId }: { phaseId: string }) => {
  switch (phaseId) {
    case '01': return <DiscoveryVisual />;
    case '02': return <BlueprintVisual />;
    case '03': return <ExecutionVisual />;
    case '04': return <LaunchVisual />;
    default: return null;
  }
};


export default function MethodologySection() {
  const [activePhaseId, setActivePhaseId] = useState<string>('01');
  const [direction, setDirection] = useState(0);

  const currentPhase = PHASES.find((p) => p.id === activePhaseId) || PHASES[0];

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-32 md:py-44 bg-[#0A0A0C] text-white border-t border-b border-white/10 relative overflow-hidden font-sans" id="process">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF3E00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-white/10 pb-16">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3 text-[#FF3E00] font-mono text-xs uppercase tracking-[0.3em] font-bold">
              <span className="w-8 h-[2px] bg-[#FF3E00]" />
              <span>How We Work Together</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tighter text-white uppercase leading-[0.95]">
              A clear process, <br />
              <span className="text-[#FF3E00]">from day one to launch.</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed max-w-md">
            No black boxes. You'll always know what's happening, what's next, and why.
          </p>
        </div>

        {/* PHASE SELECTOR TABS (The Layout You Loved) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {PHASES.map((phase) => {
            const isActive = phase.id === activePhaseId;
            return (
              <button
                key={phase.id}
                onClick={() => {
                  const currentIndex = PHASES.findIndex((p) => p.id === activePhaseId);
                  const newIndex = PHASES.findIndex((p) => p.id === phase.id);
                  if (newIndex !== currentIndex) {
                    setDirection(newIndex > currentIndex ? 1 : -1);
                    setActivePhaseId(phase.id);
                  }
                }}
                className={cn(
                  'relative text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 group overflow-hidden',
                  isActive
                    ? 'bg-white/[0.06] border-[#FF3E00] shadow-[0_0_30px_rgba(255,62,0,0.2)]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
                )}
                id={`tab-phase-${phase.id}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="phaseActiveIndicator"
                    className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF3E00]" 
                  />
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className={cn(
                    'text-xs font-mono font-bold tracking-widest',
                    isActive ? 'text-[#FF3E00]' : 'text-neutral-500'
                  )}>
                    PHASE {phase.number}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 bg-white/10 px-2.5 py-1 rounded-full">
                    {phase.timeline}
                  </span>
                </div>
                <div className={cn(
                  'text-lg sm:text-2xl font-display font-bold tracking-tight uppercase transition-colors',
                  isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                )}>
                  {phase.title}
                </div>
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-1 truncate">
                  {phase.focus}
                </div>
              </button>
            );
          })}
        </div>

        {/* HIGH-IMPACT VISUAL & MINIMAL TEXT SPLIT */}
        <div className="relative w-full">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={currentPhase.id}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60, scale: 0.95 }),
                center: { opacity: 1, x: 0, scale: 1 },
                exit: (d: number) => ({ opacity: 0, x: d * -60, scale: 0.95 })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, type: "spring", bounce: 0.15 }}
              className="rounded-3xl border border-white/15 bg-[#0E0E12] relative overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[500px] w-full"
            >
            
            {/* Visual Experience (Left) */}
            <div className="lg:w-1/2 min-h-[400px] lg:min-h-full relative bg-black flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
              <PhaseVisualManager phaseId={currentPhase.id} />
              
              {/* Overlay Label */}
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 z-40">
                <div className="w-2 h-2 rounded-full bg-[#FF3E00] animate-pulse" />
                <span className="text-[10px] font-mono text-white uppercase tracking-widest">
                  LIVE VISUALIZATION
                </span>
              </div>
            </div>

            {/* Minimal Text Content (Right) */}
            <div className="lg:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-[#0E0E12]">
              <div className="space-y-6 max-w-xl">
                
                {/* Timeline & Subtitle */}
                <div className="flex items-center gap-3 text-[#FF3E00] font-mono text-xs uppercase tracking-widest font-bold">
                  <span>{currentPhase.timeline}</span>
                  <span className="w-6 h-[1px] bg-[#FF3E00]" />
                  <span>{currentPhase.subtitle}</span>
                </div>
                
                {/* Huge Headline */}
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tighter uppercase leading-[0.95]">
                  {currentPhase.title}
                </h3>
                
                {/* Punchy Summary */}
                <p className="text-neutral-400 text-lg sm:text-xl font-light leading-relaxed">
                  {currentPhase.summary}
                </p>
                
                {/* Minimal Metrics Grid */}
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 mt-8">
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      KEY DELIVERABLE
                    </div>
                    <div className="text-base sm:text-lg font-display font-bold text-white leading-tight pr-4">
                      {currentPhase.deliverable}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      PHASE GUARANTEE
                    </div>
                    <div className="text-base sm:text-lg font-display font-bold text-[#FF3E00] leading-tight">
                      {currentPhase.metrics}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        </AnimatePresence>
        </div>

        {/* BOTTOM CTA BUTTON */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-neutral-900 via-[#141418] to-neutral-900 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight uppercase">
              Ready to start your project?
            </div>
            <p className="text-xs font-mono text-neutral-400">
              Book a free 15-minute call — we'll map your timeline before you commit to anything.
            </p>
          </div>

          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#FF3E00] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#E03600] transition-all shadow-[0_0_30px_rgba(255,62,0,0.4)] hover:scale-105 flex-shrink-0"
            id="btn-[#FF3E00]-methodology-cta"
          >
            <span>Book a Free Call</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>

    </section>
  );
}
