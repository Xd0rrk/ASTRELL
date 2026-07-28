const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Remove state lines for the demo section
// activeDemoTab, viewportWidth, selectedBrandTheme, rotX, rotY, isDraggingBox, dragStartPos, dragStartRot
code = code.replace(/  const \[activeDemoTab, setActiveDemoTab\] = React\.useState\(0\);\n/g, '');
code = code.replace(/  \/\/ 1\. Web Design Interactive Demo state\n/g, '');
code = code.replace(/  const \[viewportWidth, setViewportWidth\] = React\.useState\(100\); \/\/ percentage 40 - 100\n/g, '');
code = code.replace(/  \/\/ 2\. Branding Explorer state\n/g, '');
code = code.replace(/  const \[selectedBrandTheme, setSelectedBrandTheme\] = React\.useState\<'editorial' \| 'tech' \| 'classic'\>\('editorial'\);\n/g, '');
code = code.replace(/  \/\/ 3\. Packaging 3D Mockup Rotation states & drag refs\n/g, '');
code = code.replace(/  const \[rotX, setRotX\] = React\.useState\(15\);\n/g, '');
code = code.replace(/  const \[rotY, setRotY\] = React\.useState\(-45\);\n/g, '');
code = code.replace(/  const \[isDraggingBox, setIsDraggingBox\] = React\.useState\(false\);\n/g, '');
code = code.replace(/  const dragStartPos = React\.useRef\(\{ x: 0, y: 0 \}\);\n/g, '');
code = code.replace(/  const dragStartRot = React\.useRef\(\{ x: 15, y: -45 \}\);\n/g, '');

// Remove handleBox functions
const handleBoxRegex = /  const handleBoxMouseDown =[\s\S]*?    setRotX\(Math\.max\(-45, Math\.min\(45, dragStartRot\.current\.x - dy \* 0\.5\)\)\);\n  \};\n/g;
code = code.replace(handleBoxRegex, '');

// Replace the section
const sectionRegex = /      \{\/\* CORE EXPERTISED BENTO GRID WITH INTERACTIVE SHOWCASES \*\/\}[\s\S]*?      \{\/\* PORTFOLIO & PROOF OF QUALITY \(Case Studies & Measurable Results\) \*\/\}/;

const newSection = `      {/* CORE BRAND IDEOLOGY - MINIMALIST MANIFESTO */}
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
                Studio<br />
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
                  We don't do templates. Every pixel, motion path, and layout is custom-engineered to win industry accolades and permanently elevate your brand above the noise of your competitors.
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

      {/* PORTFOLIO & PROOF OF QUALITY (Case Studies & Measurable Results) */}`;

code = code.replace(sectionRegex, newSection);

fs.writeFileSync('app/page.tsx', code);
