import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Suspended — Learning Panda",
  robots: { index: false, follow: false },
};

export default function SuspendedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFFDF7] px-6">
      <div className="text-center max-w-md">
        {/* Illustration */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center">
            <span className="text-5xl select-none">🐼</span>
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-3xl font-bold mb-3"
          style={{ fontFamily: "var(--font-fredoka)", color: "var(--text-primary)" }}
        >
          Account Suspended
        </h1>

        {/* Body */}
        <p className="text-base mb-2" style={{ color: "var(--text-secondary)" }}>
          Your account has been temporarily suspended and you cannot access Learning
          Panda right now.
        </p>
        <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
          If you believe this is a mistake, please reach out to us and we&apos;ll
          get it sorted out quickly.
        </p>

        {/* Contact CTA */}
        <a
          href="mailto:contact@learningpanda.ai"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-white font-bold text-sm transition-all hover:opacity-90 active:scale-95 mb-4"
          style={{ background: "var(--panda-green)" }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Contact support
        </a>

        <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
          <a
            href="mailto:contact@learningpanda.ai"
            className="underline hover:opacity-80"
          >
            contact@learningpanda.ai
          </a>
        </p>

        {/* Back to home */}
        <div className="mt-8">
          <Link
            href="/"
            className="text-sm underline hover:opacity-70 transition-opacity"
            style={{ color: "var(--text-muted)" }}
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
