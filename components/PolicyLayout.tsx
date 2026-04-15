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

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div
        className="relative pt-20 pb-16 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #F0FDF4 0%, #FAFAF7 60%)" }}
      >
        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)" }}
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
          {/* Badge pill */}
          <div
            className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border"
            style={{ background: "#F0FDF4", borderColor: "#86EFAC", color: "#1A4731" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-500"
              style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
            />
            Legal
          </div>

          <h1
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {emoji}{" "}
            <span className="relative inline-block" style={{ color: "#1A4731" }}>
              {title}
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="6"
                viewBox="0 0 200 6"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 3 Q100 0 200 3"
                  stroke="#22C55E"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </span>
          </h1>

          <p className="text-gray-500 leading-relaxed mb-6 max-w-xl text-base">{intro}</p>

          {/* Date pills */}
          <div className="flex flex-wrap gap-3">
            <span
              className="inline-flex items-center gap-1.5 bg-white border text-gray-500 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm"
              style={{ borderColor: "#E5E7EB" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              Last updated: <span className="text-gray-700">{lastUpdated}</span>
            </span>
            <span
              className="inline-flex items-center gap-1.5 bg-white border text-gray-500 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm"
              style={{ borderColor: "#E5E7EB" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              Effective: <span className="text-gray-700">{effectiveDate}</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 items-start">

          {/* Sticky ToC — desktop only */}
          <aside className="hidden lg:flex flex-col gap-4 sticky top-24 self-start">
            <nav
              className="bg-white border rounded-2xl p-5 shadow-sm"
              style={{ borderColor: "#E5E7EB" }}
              aria-label="Table of contents"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Contents</p>
              <ol className="space-y-1.5">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="toc-link text-xs font-medium text-gray-500 hover:text-green-700 transition-colors flex items-center gap-2 py-0.5 rounded"
                    >
                      <span
                        className="w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                        style={{ background: "#F0FDF4", color: "#16A34A" }}
                      >
                        {i + 1}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Help card */}
            <div
              className="bg-white border rounded-2xl p-5 shadow-sm"
              style={{ borderColor: "#E5E7EB" }}
            >
              <div className="text-lg mb-2">💬</div>
              <p className="text-xs font-bold text-gray-700 mb-1">Questions?</p>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                Our team is happy to help with any privacy or legal queries.
              </p>
              <a
                href="mailto:contact@learningpanda.ai"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-3 py-1.5 rounded-xl transition-colors"
                style={{ background: "#22C55E" }}
              >
                Contact Us →
              </a>
            </div>

            <Link
              href="/"
              className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors pl-1"
            >
              ← Back to home
            </Link>
          </aside>

          {/* Article body */}
          <article className="prose-policy min-w-0">{children}</article>
        </div>
      </div>

      {/* Mobile back link */}
      <div className="lg:hidden text-center py-4 pb-10">
        <Link href="/" className="text-sm font-semibold text-green-600 hover:text-green-700">
          ← Back to home
        </Link>
      </div>

      <Footer />

      <style>{`
        /* ── Headings ── */
        .prose-policy h2 {
          font-family: var(--font-fredoka);
          font-size: 1.35rem;
          font-weight: 700;
          color: #1A4731;
          margin-top: 2.75rem;
          margin-bottom: 0.75rem;
          padding-top: 1.75rem;
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
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
        }

        /* ── Body text ── */
        .prose-policy p {
          font-size: 0.9rem;
          color: #4B5563;
          line-height: 1.85;
          margin-bottom: 0.85rem;
        }
        .prose-policy ul,
        .prose-policy ol {
          margin: 0.5rem 0 1.1rem 1.25rem;
        }
        .prose-policy li {
          font-size: 0.9rem;
          color: #4B5563;
          line-height: 1.8;
          margin-bottom: 0.4rem;
        }
        .prose-policy ul li { list-style-type: disc; }
        .prose-policy ol li { list-style-type: decimal; }
        .prose-policy strong { color: #111827; font-weight: 700; }

        /* ── Links ── */
        .prose-policy a {
          color: #16A34A;
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 600;
        }
        .prose-policy a:hover { color: #15803D; }

        /* ── Callouts ── */
        .prose-policy .callout {
          background: #F0FDF4;
          border-left: 4px solid #22C55E;
          border-radius: 0 12px 12px 0;
          padding: 14px 18px;
          margin: 1.5rem 0;
        }
        .prose-policy .callout p {
          margin-bottom: 0;
          color: #166534;
          font-size: 0.875rem;
        }
        .prose-policy .warn-callout {
          background: #FEF3C7;
          border-left: 4px solid #F59E0B;
          border-radius: 0 12px 12px 0;
          padding: 14px 18px;
          margin: 1.5rem 0;
        }
        .prose-policy .warn-callout p {
          margin-bottom: 0;
          color: #92400E;
          font-size: 0.875rem;
        }

        /* ── Tables ── */
        .prose-policy table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.25rem 0;
          font-size: 0.85rem;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #E5E7EB;
        }
        .prose-policy th {
          background: #F0FDF4;
          font-weight: 700;
          color: #1A4731;
          padding: 10px 14px;
          text-align: left;
          border-bottom: 1px solid #D1FAE5;
          font-family: var(--font-fredoka);
          font-size: 0.875rem;
        }
        .prose-policy td {
          padding: 10px 14px;
          color: #4B5563;
          border-bottom: 1px solid #F3F4F6;
          vertical-align: top;
        }
        .prose-policy tr:last-child td {
          border-bottom: none;
        }
        .prose-policy tr:nth-child(even) td {
          background: #FAFAFA;
        }

        /* ── ToC link hover ── */
        .toc-link:hover {
          background: #F0FDF4;
          color: #15803D;
        }

        /* Pulse animation (fallback for non-Tailwind animate-pulse) */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
