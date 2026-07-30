'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

const ideologyPoints = [
  {
    id: '01',
    title: 'Less, but better.',
    desc: "We strip away anything that doesn't earn its place — so your website and product feel effortless to use and impossible to ignore."
  },
  {
    id: '02',
    title: 'Nothing off-the-shelf.',
    desc: "Every layout, animation, and detail is designed around your brand. No templates, no shortcuts — just work built to make your competitors look generic."
  },
  {
    id: '03',
    title: "Design that's measured, not guessed.",
    desc: "Every decision is tied to a business outcome. You'll always know why something was built the way it was — and what it's doing for your numbers."
  }
];

export default function IdeologySection() {
  const [activePoint, setActivePoint] = React.useState('01');

  return (
    <section className="py-32 md:py-48 px-8 bg-neutral-950 relative" id="expertise">

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          <div className="lg:col-span-5 relative">
            <div className="sticky top-40">
              <div className="flex items-center gap-6 text-[#FF3E00] font-serif italic text-lg mb-8">
                <div className="h-[1px] w-16 bg-[#FF3E00]"></div>
                <span>How We Work</span>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl font-light tracking-tight text-white leading-[1.1]">
                Built different, <br />
                <span className="italic text-[#FF3E00]">by design.</span>
              </h2>
              <p className="mt-8 font-sans font-light text-neutral-300 max-w-sm text-lg leading-relaxed">
                Elegant space proportions and deep, natural contrast. Our approach is tailored for brands that demand a refined presence.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center gap-0 mt-8 lg:mt-0">
            {ideologyPoints.map((point, index) => {
              const isActive = activePoint === point.id;
              
              return (
                <div 
                  key={point.id}
                  onClick={() => setActivePoint(point.id)}
                  className={cn(
                    "group border-b border-white/10 py-12 cursor-pointer transition-all duration-700 first:border-t",
                    isActive ? "border-b-[#FF3E00]/50" : "hover:border-b-white/30"
                  )}
                >
                  <div className="flex items-center justify-between gap-6">
                    <h3 className={cn(
                      "font-serif text-3xl md:text-5xl font-light tracking-tight flex items-center gap-6 transition-colors duration-700",
                      isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
                    )}>
                      <span className={cn(
                        "text-lg md:text-xl font-serif italic transition-colors duration-700",
                        isActive ? "text-[#FF3E00]" : "text-white/30"
                      )}>
                        — 0{index + 1}
                      </span>
                      {point.title}
                    </h3>
                    <div className={cn(
                      "transition-transform duration-700 ease-in-out",
                      isActive ? "rotate-45 text-[#FF3E00]" : "text-white/40 group-hover:text-white/80"
                    )}>
                      <Plus size={24} strokeWidth={1} />
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-neutral-400 font-sans font-light text-lg md:text-xl leading-relaxed max-w-xl pt-8 pl-14 md:pl-20">
                          {point.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
