import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SERVICES, getServiceBySlug, getRelatedServices } from '@/lib/services-data';

// Static generation for all service pages
export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

// Dynamic metadata per service
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `https://astrells.com/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);
  if (!service) notFound();

  const related = getRelatedServices(service.relatedServices);

  // JSON-LD: Service schema
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'ASTRELL',
      url: 'https://astrells.com',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    url: `https://astrells.com/services/${service.slug}`,
  };

  // JSON-LD: FAQPage schema
  const faqJsonLd = service.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://astrells.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://astrells.com/services' },
      { '@type': 'ListItem', position: 3, name: service.name, item: `https://astrells.com/services/${service.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5" aria-label="Service page navigation">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold uppercase tracking-wider text-xs">ASTRELL</span>
          </Link>
          <Link href="/services" className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest hover:text-white transition-colors">
            All Services
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-neutral-700">/</li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li aria-hidden="true" className="text-neutral-700">/</li>
            <li><span className="text-neutral-400">{service.shortName}</span></li>
          </ol>
        </nav>

        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#FF3E00] uppercase tracking-widest font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00]" aria-hidden="true"></span>
              ASTRELL Service
            </span>
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[0.95] mb-6">
            {service.name}
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-3xl">
            {service.description}
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 pb-16">
        {/* Detailed description */}
        <section className="border-t border-white/10 pt-12 pb-16">
          <div className="max-w-3xl">
            <h2 className="font-display font-bold text-xl md:text-2xl text-white uppercase tracking-tight mb-6">
              What We Deliver
            </h2>
            <p className="text-neutral-400 font-light leading-relaxed text-sm md:text-base">
              {service.longDescription}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#FF3E00] text-white hover:bg-[#E03600] px-8 py-4 rounded-full font-display font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-[#FF3E00]/20 hover:scale-[1.02]"
            >
              <span>Discuss Your {service.shortName} Project</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* FAQs */}
        {service.faqs.length > 0 && (
          <section className="border-t border-white/10 pt-12 pb-16">
            <h2 className="font-display font-bold text-xl md:text-2xl text-white uppercase tracking-tight mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6 max-w-3xl">
              {service.faqs.map((faq, i) => (
                <div key={i} className="border-l-2 border-[#FF3E00]/30 pl-6">
                  <h3 className="font-display font-semibold text-base text-white mb-2">{faq.question}</h3>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Services */}
        {related.length > 0 && (
          <section className="border-t border-white/10 pt-12 pb-16">
            <h2 className="font-display font-bold text-xl md:text-2xl text-white uppercase tracking-tight mb-8">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[#FF3E00]/30 hover:bg-[#FF3E00]/5 transition-all duration-300"
                >
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wide mb-2 group-hover:text-[#FF3E00] transition-colors">
                    {rel.shortName}
                  </h3>
                  <p className="text-neutral-500 text-xs font-light leading-relaxed line-clamp-2">
                    {rel.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[10px] font-mono text-neutral-600 group-hover:text-[#FF3E00] transition-colors uppercase tracking-widest">
                    Learn more
                    <ArrowUpRight size={10} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer link back */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
          <Link href="/services" className="hover:text-white transition-colors">← All Services</Link>
          <Link href="/#contact" className="text-[#FF3E00] hover:underline">Start Your Project →</Link>
        </div>
      </footer>
    </div>
  );
}
