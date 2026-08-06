import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '@/lib/services-data';

export const metadata: Metadata = {
  title: 'Services | ASTRELL',
  description: 'Explore ASTRELL\'s 18 integrated creative services — brand identity, website design, packaging, digital marketing, SEO, and more. England-based, serving clients worldwide.',
  alternates: {
    canonical: 'https://astrells.com/services',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astrells.com' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://astrells.com/services' },
  ],
};

export default function ServicesIndexPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5" aria-label="Services navigation">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold uppercase tracking-wider text-xs">ASTRELL</span>
          </Link>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{SERVICES.length} Services</span>
        </div>
      </nav>

      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#FF3E00] uppercase tracking-widest font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00]" aria-hidden="true"></span>
              What We Do
            </span>
          </div>
          <h1 className="font-display font-black text-4xl md:text-6xl text-white uppercase tracking-tight leading-[0.95] mb-6">
            Our Services
          </h1>
          <p className="text-lg text-neutral-300 font-light leading-relaxed">
            18 integrated creative services designed to build, grow, and elevate your business.
            From brand identity to SEO, we handle the full spectrum.
          </p>
        </div>
      </header>

      {/* Services grid */}
      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[#FF3E00]/30 hover:bg-[#FF3E00]/5 transition-all duration-300"
            >
              <h2 className="font-display font-bold text-sm text-white uppercase tracking-wide mb-3 group-hover:text-[#FF3E00] transition-colors flex items-center justify-between">
                {service.shortName}
                <ArrowUpRight size={14} className="text-neutral-600 group-hover:text-[#FF3E00] transition-colors" />
              </h2>
              <p className="text-neutral-500 text-xs font-light leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
          <Link href="/" className="hover:text-white transition-colors">← Back to Home</Link>
          <Link href="/#contact" className="text-[#FF3E00] hover:underline">Start Your Project →</Link>
        </div>
      </footer>
    </div>
  );
}
