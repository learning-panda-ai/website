"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Mail } from "lucide-react";

// ── Animation helpers ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function td(delay = 0) {
  return { duration: 0.55, delay };
}

// ── Data ───────────────────────────────────────────────────────────────────
const stats = [
  { number: "250M+", label: "School students in India" },
  { number: "6", label: "Boards supported" },
  { number: "12", label: "Classes covered (1–12)" },
  { number: "₹299", label: "Pro plan per month" },
];

const differentiators = [
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
];

const companyInfo = [
  { label: "Company Name", value: "Learning Panda AI" },
  { label: "Product", value: "AI-powered K-12 study platform for India" },
  { label: "Stage", value: "Early-stage startup" },
  { label: "Founded", value: "2025" },
  { label: "Headquarters", value: "India" },
  { label: "General Enquiries", value: "hello@learningpanda.ai" },
  { label: "Student Support", value: "contact@learningpanda.ai" },
  { label: "School Partnerships", value: "schools@learningpanda.ai" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FAFAF7", fontFamily: "var(--font-nunito)" }}>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        className="relative pt-20 pb-24 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #F0FDF4 0%, #FAFAF7 60%)" }}
      >
        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)" }}
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          {/* Badge pill */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={td(0)}
            className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-6 border"
            style={{ background: "#F0FDF4", borderColor: "#86EFAC", color: "#1A4731" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Our Story
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={td(0.1)}
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            🐼 About{" "}
            <span className="relative inline-block" style={{ color: "#1A4731" }}>
              Learning Panda AI
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
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={td(0.2)}
            className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto"
          >
            We are building the AI study buddy that every student in India deserves — one that knows your
            textbook, speaks your language, and meets you exactly where you are.
          </motion.p>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────── */}
      <section style={{ background: "#1A4731" }} className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {stats.map(({ number, label }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={td(i * 0.08)}
              >
                <div
                  className="text-3xl sm:text-4xl font-extrabold text-white mb-1"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {number}
                </div>
                <div className="text-sm text-green-300 font-semibold">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={td(0)}
            className="bg-white rounded-3xl border p-8 sm:p-10 shadow-sm mb-16"
            style={{ borderColor: "#E5E7EB" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: "#F0FDF4" }}
              >
                🎯
              </div>
              <h2
                className="text-2xl font-extrabold text-gray-900"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Our Mission
              </h2>
            </div>
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
          </motion.div>

          {/* ── What Makes Us Different ─────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={td(0)}
            className="flex items-center gap-3 mb-8"
          >
            <div
              className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border"
              style={{ background: "#F0FDF4", borderColor: "#86EFAC", color: "#1A4731" }}
            >
              ✨ Why Panda
            </div>
            <h2
              className="text-2xl font-extrabold text-gray-900"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              What Makes Us Different
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {differentiators.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={td(i * 0.07)}
                className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition-shadow"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: "#F0FDF4" }}
                >
                  {icon}
                </div>
                <h3
                  className="text-base font-bold text-gray-900 mb-1.5"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Company Info ─────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={td(0)}
            className="bg-white rounded-3xl border p-8 sm:p-10 shadow-sm mb-16"
            style={{ borderColor: "#E5E7EB" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: "#F0FDF4" }}
              >
                🏢
              </div>
              <h2
                className="text-2xl font-extrabold text-gray-900"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Company Information
              </h2>
            </div>
            <dl className="divide-y" style={{ borderColor: "#F3F4F6" }}>
              {companyInfo.map(({ label, value }) => (
                <div key={label} className="py-3.5 flex justify-between gap-4">
                  <dt className="text-sm font-semibold text-gray-500 flex-shrink-0">{label}</dt>
                  <dd className="text-sm text-gray-800 text-right">
                    {value.includes("@") ? (
                      <a
                        href={`mailto:${value}`}
                        className="inline-flex items-center gap-1.5 text-green-600 hover:text-green-700 transition-colors font-semibold"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* ── CTA ─────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={td(0)}
            className="rounded-3xl p-10 text-center"
            style={{ background: "linear-gradient(135deg, #1A4731 0%, #22C55E 100%)" }}
          >
            <div className="text-4xl mb-4">🐼</div>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white mb-3"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Ready to try it?
            </h2>
            <p className="text-green-200 mb-7 text-base">
              Start for free — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-800 font-bold py-3.5 px-8 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm"
              >
                🚀 Start Learning Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold py-3.5 px-8 rounded-2xl transition-all hover:border-white/70 text-sm"
              >
                ← Back to home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
