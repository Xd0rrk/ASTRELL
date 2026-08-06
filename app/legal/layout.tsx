import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const LEGAL_PAGES = [
  { name: 'Privacy Policy', href: '/legal/privacy-policy' },
  { name: 'Terms of Service', href: '/legal/terms-of-service' },
  { name: 'Cookie Policy', href: '/legal/cookie-policy' },
  { name: 'Refund & Cancellation Policy', href: '/legal/refund-policy' },
  { name: 'AI Usage & Disclosure Policy', href: '/legal/ai-usage-policy' },
  { name: 'Acceptable Use Policy', href: '/legal/acceptable-use-policy' },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Top navigation bar */}
      <nav className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5" aria-label="Legal navigation">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold uppercase tracking-wider text-xs">ASTRELL</span>
          </Link>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest hidden sm:block">Legal</span>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24" id="legal-content">
        {children}
      </main>

      {/* Legal navigation footer */}
      <footer className="border-t border-white/5 bg-neutral-950" aria-label="Legal pages navigation">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h3 className="text-[10px] font-mono text-white/40 uppercase font-bold tracking-widest mb-6">Legal Documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {LEGAL_PAGES.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="text-neutral-400 hover:text-white transition-colors text-sm font-light py-1"
              >
                {page.name}
              </Link>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-xs text-neutral-500 font-mono">
              &copy; {new Date().getFullYear()} ASTRELL. All rights reserved.
            </p>
            <Link
              href="/"
              className="text-xs text-neutral-500 hover:text-white transition-colors font-mono"
            >
              Back to astrells.com
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
