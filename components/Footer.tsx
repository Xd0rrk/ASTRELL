import Link from 'next/link';
import { ArrowUpRight, Dribbble, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-8 px-8 relative overflow-hidden" id="footer">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[#FF3E00]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
              <span className="font-display font-black text-3xl tracking-tighter text-white uppercase flex items-center gap-2">
                ASTRELL<span className="text-[#FF3E00]">.</span>
              </span>
            </Link>
            <p className="text-neutral-400 font-light text-lg max-w-md leading-relaxed">
              A creative studio building websites, brands, and digital products designed to grow your business.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#FF3E00] hover:text-[#FF3E00] hover:bg-[#FF3E00]/10 transition-all duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#FF3E00] hover:text-[#FF3E00] hover:bg-[#FF3E00]/10 transition-all duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#FF3E00] hover:text-[#FF3E00] hover:bg-[#FF3E00]/10 transition-all duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#FF3E00] hover:text-[#FF3E00] hover:bg-[#FF3E00]/10 transition-all duration-300">
                <Dribbble size={20} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h4 className="text-[10px] font-mono text-white/40 uppercase font-bold tracking-widest">Navigation</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Work', target: 'proof' },
                  { name: 'Expertise', target: 'expertise' },
                  { name: 'Process', target: 'process' },
                  { name: 'Team', target: 'team' },
                  { name: 'Contact', target: 'contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={`#${item.target}`} className="text-neutral-300 hover:text-white transition-colors text-sm font-light flex items-center group">
                      <span className="relative overflow-hidden">
                        <span className="block transition-transform duration-300 group-hover:-translate-y-full">{item.name}</span>
                        <span className="absolute top-0 left-0 text-[#FF3E00] transition-transform duration-300 translate-y-full group-hover:translate-y-0">{item.name}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-mono text-white/40 uppercase font-bold tracking-widest">Offices</h4>
              <ul className="space-y-4">
                <li>
                  <div className="text-neutral-300 text-sm font-light">London, UK</div>
                  <div className="text-neutral-500 text-xs font-mono mt-1">HQ</div>
                </li>
                <li>
                  <div className="text-neutral-300 text-sm font-light">Paris, FR</div>
                </li>
                <li>
                  <div className="text-neutral-300 text-sm font-light">Dubai, UAE</div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-mono text-white/40 uppercase font-bold tracking-widest">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:hello@astrell.com" className="text-neutral-300 hover:text-white transition-colors text-sm font-light flex items-center group gap-2">
                    hello@astrell.com
                    <ArrowUpRight size={14} className="text-white/40 group-hover:text-[#FF3E00] transition-colors" />
                  </a>
                </li>
                <li>
                  <a href="tel:+442071234567" className="text-neutral-300 hover:text-white transition-colors text-sm font-light flex items-center group gap-2">
                    +44 207 123 4567
                    <ArrowUpRight size={14} className="text-white/40 group-hover:text-[#FF3E00] transition-colors" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Big Text */}
        <div className="w-full border-t border-white/10 pt-12 pb-16 flex justify-center">
          <h1 className="text-[12vw] leading-none font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent uppercase tracking-tighter select-none cursor-default transition-all duration-700 ease-out [-webkit-text-stroke:1px_transparent] hover:from-transparent hover:to-transparent hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.6)] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            ASTRELL
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500 pt-8 border-t border-white/5">
          <div>
            &copy; {currentYear} ASTRELL. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
