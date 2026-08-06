import Link from 'next/link';

interface LegalPageContentProps {
  title: string;
  html: string;
  breadcrumbName: string;
}

export default function LegalPageContent({ title, html, breadcrumbName }: LegalPageContentProps) {
  return (
    <article className="legal-document" itemScope itemType="https://schema.org/WebPage">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-xs font-mono text-neutral-500">
          <li>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          </li>
          <li aria-hidden="true" className="text-neutral-700">/</li>
          <li>
            <span className="text-neutral-400">{breadcrumbName}</span>
          </li>
        </ol>
      </nav>

      {/* Title */}
      <header className="mb-12 pb-8 border-b border-white/10">
        <h1 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight" itemProp="name">
          {title}
        </h1>
        <div className="mt-4 flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00]" aria-hidden="true"></span>
            ASTRELL Legal
          </span>
        </div>
      </header>

      {/* Content */}
      <div
        className="legal-content prose prose-invert max-w-none
          [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:uppercase [&_h2]:tracking-tight
          [&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3
          [&_h4]:font-display [&_h4]:font-medium [&_h4]:text-base [&_h4]:text-neutral-200 [&_h4]:mt-6 [&_h4]:mb-2
          [&_p]:text-neutral-400 [&_p]:font-light [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-sm [&_p]:md:text-base
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2
          [&_li]:text-neutral-400 [&_li]:font-light [&_li]:text-sm [&_li]:md:text-base [&_li]:leading-relaxed
          [&_strong]:text-white [&_strong]:font-medium
          [&_em]:text-neutral-300
          [&_hr]:border-white/10 [&_hr]:my-10
          [&_a]:text-[#FF3E00] [&_a]:hover:underline [&_a]:transition-colors
          [&_code]:bg-white/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs
          [&_table]:w-full [&_table]:text-sm [&_table]:my-6
          [&_th]:text-left [&_th]:py-3 [&_th]:px-4 [&_th]:border-b [&_th]:border-white/10 [&_th]:text-neutral-300
          [&_td]:py-3 [&_td]:px-4 [&_td]:border-b [&_td]:border-white/5 [&_td]:text-neutral-400"
        dangerouslySetInnerHTML={{ __html: html }}
        itemProp="text"
      />
    </article>
  );
}
