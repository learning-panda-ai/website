import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Section {
  id: string;
  title: string;
}

interface PolicyLayoutProps {
  title: string;
  emoji: string;
  lastUpdated: string;
  effectiveDate: string;
  intro: string;
  sections: Section[];
  children: React.ReactNode;
}

export default function PolicyLayout({
  title,
  emoji,
  lastUpdated,
  effectiveDate,
  intro,
  sections,
  children,
}: PolicyLayoutProps) {
  return (
    <div className="min-h-screen" style={{ background: "#FAFAF7", fontFamily: "var(--font-nunito)" }}>
      <Navbar />

      {/* Header */}
      <div
        className="pt-20 pb-16"
        style={{ background: "linear-gradient(160deg, #F0FDF4 0%, #FAFAF7 60%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">
            Legal
          </div>
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {emoji} {title}
          </h1>
          <p className="text-gray-500 leading-relaxed mb-5 max-w-xl">{intro}</p>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-400">
            <span>Last updated: <span className="text-gray-600">{lastUpdated}</span></span>
            <span>Effective: <span className="text-gray-600">{effectiveDate}</span></span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 items-start">

          {/* Sticky ToC — desktop only */}
          <nav
            className="hidden lg:block sticky top-24 self-start bg-white border rounded-2xl p-5 shadow-sm mb-10"
            style={{ borderColor: "#E5E7EB" }}
            aria-label="Table of contents"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Contents</p>
            <ol className="space-y-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-xs font-medium text-gray-500 hover:text-green-700 transition-colors flex gap-2"
                  >
                    <span className="text-gray-300 flex-shrink-0">{i + 1}.</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-5 pt-4 border-t" style={{ borderColor: "#F3F4F6" }}>
              <Link
                href="/"
                className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
              >
                ← Back to home
              </Link>
            </div>
          </nav>

          {/* Body */}
          <article className="prose-policy">{children}</article>
        </div>
      </div>

      {/* Mobile back link */}
      <div className="lg:hidden text-center py-4 pb-8">
        <Link href="/" className="text-sm font-semibold text-green-600 hover:text-green-700">
          ← Back to home
        </Link>
      </div>

      <Footer />

      <style>{`
        .prose-policy h2 {
          font-family: var(--font-fredoka);
          font-size: 1.35rem;
          font-weight: 700;
          color: #1A4731;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid #F3F4F6;
          scroll-margin-top: 6rem;
        }
        .prose-policy h2:first-of-type {
          border-top: none;
          padding-top: 0;
          margin-top: 0;
        }
        .prose-policy h3 {
          font-family: var(--font-fredoka);
          font-size: 1.05rem;
          font-weight: 700;
          color: #374151;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .prose-policy p {
          font-size: 0.9rem;
          color: #4B5563;
          line-height: 1.8;
          margin-bottom: 0.85rem;
        }
        .prose-policy ul, .prose-policy ol {
          margin: 0.5rem 0 1rem 1.25rem;
        }
        .prose-policy li {
          font-size: 0.9rem;
          color: #4B5563;
          line-height: 1.75;
          margin-bottom: 0.35rem;
        }
        .prose-policy ul li { list-style-type: disc; }
        .prose-policy ol li { list-style-type: decimal; }
        .prose-policy strong { color: #111827; font-weight: 700; }
        .prose-policy a { color: #16A34A; text-decoration: underline; }
        .prose-policy a:hover { color: #15803D; }
        .prose-policy .callout {
          background: #F0FDF4;
          border-left: 4px solid #22C55E;
          border-radius: 0 8px 8px 0;
          padding: 14px 18px;
          margin: 1.25rem 0;
        }
        .prose-policy .callout p { margin-bottom: 0; color: #166534; font-size: 0.875rem; }
        .prose-policy .warn-callout {
          background: #FEF3C7;
          border-left: 4px solid #F59E0B;
          border-radius: 0 8px 8px 0;
          padding: 14px 18px;
          margin: 1.25rem 0;
        }
        .prose-policy .warn-callout p { margin-bottom: 0; color: #92400E; font-size: 0.875rem; }
        .prose-policy table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 0.85rem;
        }
        .prose-policy th {
          background: #F9FAFB;
          font-weight: 700;
          color: #374151;
          padding: 10px 14px;
          text-align: left;
          border-bottom: 2px solid #E5E7EB;
        }
        .prose-policy td {
          padding: 9px 14px;
          color: #4B5563;
          border-bottom: 1px solid #F3F4F6;
          vertical-align: top;
        }
      `}</style>
    </div>
  );
}
