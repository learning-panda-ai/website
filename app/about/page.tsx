import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us — Learning Panda AI",
  description:
    "Learn about Learning Panda AI — our mission to make quality AI-powered education accessible to every student in India, from Class 1 to university.",
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FAFAF7", fontFamily: "var(--font-nunito)" }}>
      <Navbar />

      {/* Hero */}
      <section
        className="pt-24 pb-20"
        style={{ background: "linear-gradient(160deg, #F0FDF4 0%, #FAFAF7 60%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">Our Story</div>
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            🐼 About Learning Panda AI
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We are building the AI study buddy that every student in India deserves — one that knows your
            textbook, speaks your language, and meets you exactly where you are.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border p-8 sm:p-10 shadow-sm mb-10" style={{ borderColor: "#E5E7EB" }}>
            <h2
              className="text-2xl font-extrabold text-gray-900 mb-4"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed text-base mb-4">
              India has over 250 million school students — yet access to quality, personalised tutoring
              remains unaffordable for most families. A private tutor in a metro city costs ₹500–₹2,000 per
              hour. Many students in smaller towns and rural areas have no access at all.
            </p>
            <p className="text-gray-600 leading-relaxed text-base mb-4">
              Learning Panda AI was built to close that gap. Our AI is trained on NCERT, CBSE, ICSE, and State
              board textbooks so it gives precise, curriculum-aligned answers — not generic responses from
              the internet. Every student, from Class 1 to Class 12 and beyond, gets a patient, knowledgeable
              study companion available 24/7.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              We believe that the quality of a child&apos;s education should not be determined by their
              family&apos;s income or their city. That belief is what drives every decision we make.
            </p>
          </div>

          {/* What makes us different */}
          <h2
            className="text-2xl font-extrabold text-gray-900 mb-6"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            What Makes Us Different
          </h2>
          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            {[
              {
                icon: "📚",
                title: "Textbook-Grounded AI",
                desc: "Answers are anchored to your actual board textbooks — not random internet content.",
              },
              {
                icon: "🇮🇳",
                title: "Built for India",
                desc: "Supports CBSE, ICSE, Maharashtra, Karnataka, Tamil Nadu, UP boards and more.",
              },
              {
                icon: "🎮",
                title: "Gamified Learning",
                desc: "XP, streaks, and leaderboards make studying feel like something students want to do.",
              },
              {
                icon: "👨‍👩‍👧",
                title: "Parent & School Visibility",
                desc: "Weekly progress reports keep parents informed and teachers in the loop.",
              },
              {
                icon: "🔒",
                title: "Safe for Kids",
                desc: "Built with COPPA compliance and strict content filtering from the ground up.",
              },
              {
                icon: "💰",
                title: "Affordable",
                desc: "Pro plan at ₹299/month — less than a single hour of private tutoring.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border p-6 shadow-sm"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3
                  className="text-base font-bold text-gray-900 mb-1"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Company info */}
          <div className="bg-white rounded-3xl border p-8 sm:p-10 shadow-sm mb-10" style={{ borderColor: "#E5E7EB" }}>
            <h2
              className="text-2xl font-extrabold text-gray-900 mb-6"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Company Information
            </h2>
            <dl className="divide-y" style={{ borderColor: "#F3F4F6" }}>
              {[
                { label: "Company Name", value: "Learning Panda AI" },
                { label: "Product", value: "AI-powered K-12 study platform for India" },
                { label: "Stage", value: "Early-stage startup" },
                { label: "Founded", value: "2025" },
                { label: "Headquarters", value: "India" },
                { label: "General Enquiries", value: "hello@learningpanda.ai" },
                { label: "Student Support", value: "contact@learningpanda.ai" },
                { label: "School Partnerships", value: "schools@learningpanda.ai" },
              ].map(({ label, value }) => (
                <div key={label} className="py-3 flex justify-between gap-4">
                  <dt className="text-sm font-semibold text-gray-500 flex-shrink-0">{label}</dt>
                  <dd className="text-sm text-gray-800 text-right">
                    {value.includes("@") ? (
                      <a href={`mailto:${value}`} className="text-green-600 hover:underline">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <h2
              className="text-2xl font-extrabold text-gray-900 mb-3"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Ready to try it?
            </h2>
            <p className="text-gray-500 mb-6">Start for free — no credit card required.</p>
            <Link
              href="/login"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-2xl transition-colors text-sm"
            >
              Get Started Free
            </Link>
            <div className="mt-4">
              <Link href="/" className="text-sm font-semibold text-green-600 hover:text-green-700">
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
