"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Star, LayoutDashboard, Plus, Minus } from "lucide-react";
import { useAuth } from "@/app/providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Animation helpers ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/** Returns transition prop with optional delay. */
function td(delay = 0) {
  return { duration: 0.55, delay };
}

// ── Data ───────────────────────────────────────────────────────────────────
const problems = [
  {
    before: "Generic AI gives answers from any syllabus — often wrong for Indian boards",
    after: "Panda answers directly from your CBSE or ICSE textbook — chapter by chapter",
  },
  {
    before: "Private tutors cost ₹500–₹2,000 per hour and aren't always available",
    after: "Panda is available 24/7 for a fraction of the cost — at ₹299/month",
  },
  {
    before: "Students forget what they studied weeks ago with no system to revise",
    after: "Panda uses spaced repetition to resurface concepts before they're forgotten",
  },
];

const steps = [
  {
    num: "1",
    icon: "🏫",
    title: "Choose your board & class",
    desc: "Select CBSE, ICSE, or your State board. Pick your class (1–12) and the subjects you're studying.",
  },
  {
    num: "2",
    icon: "💬",
    title: "Ask any question",
    desc: "Type your doubt, speak it aloud, or hop on a video call with Panda — use whatever feels natural.",
  },
  {
    num: "3",
    icon: "📖",
    title: "Get chapter-specific answers",
    desc: "Every explanation is grounded in your exact textbook chapter — no off-syllabus confusion, ever.",
  },
  {
    num: "4",
    icon: "🏆",
    title: "Practice, earn XP & track mastery",
    desc: "Adaptive quizzes, daily streaks, and a smart study planner keep you on track until exam day.",
  },
];

const studentFeatures = [
  {
    icon: "📚",
    title: "Textbook-aligned AI answers",
    desc: "Answers sourced directly from your CBSE, ICSE, or State board textbook — never off-syllabus.",
  },
  {
    icon: "🎙️",
    title: "Text, voice & video interaction",
    desc: "Type a doubt, speak it, or video-chat with Panda. Multiple modes so you learn the way that works for you.",
  },
  {
    icon: "🎯",
    title: "Adaptive quizzes",
    desc: "Quizzes that learn from you — targeting the chapters and concepts where you're weakest.",
  },
  {
    icon: "🔄",
    title: "Spaced repetition",
    desc: "Panda resurfaces chapters you're about to forget — scientifically timed for long-term memory.",
  },
  {
    icon: "🔥",
    title: "Streaks, XP & leaderboards",
    desc: "Daily streaks, experience points, and school leaderboards make consistent studying rewarding.",
  },
  {
    icon: "⚔️",
    title: "Quiz battles",
    desc: "Challenge a friend chapter-by-chapter. Turn competitive instincts into learning fuel.",
  },
  {
    icon: "🗣️",
    title: "AI oral exams",
    desc: "Speak your answer and let Panda evaluate it through Socratic questioning — perfect board prep.",
  },
  {
    icon: "📅",
    title: "Smart study planner",
    desc: "Input your exam date and Panda builds a chapter-by-chapter revision schedule, adapting as you go.",
  },
  {
    icon: "👥",
    title: "Study rooms",
    desc: "Create or join a study room with classmates. Collaborate on doubts and learn together.",
  },
];

const parentFeatures = [
  {
    icon: "📊",
    title: "Weekly parent reports",
    desc: "Every week parents receive an email: topics covered, quiz scores, time spent, and areas of concern.",
  },
  {
    icon: "🖥️",
    title: "Teacher dashboard",
    desc: "Assign chapters, monitor class-wide completion rates, and see which topics need more attention.",
  },
  {
    icon: "🚨",
    title: "At-risk student alerts",
    desc: "Auto-flags when a student becomes disengaged or consistently scores below threshold in a chapter.",
  },
  {
    icon: "✅",
    title: "Board-accurate content",
    desc: "Content from board-official textbooks — teachers don't need to worry about off-syllabus answers.",
  },
  {
    icon: "🔒",
    title: "Safe & age-appropriate",
    desc: "All conversations are strictly educational. Content moderation ensures nothing inappropriate surfaces.",
  },
  {
    icon: "📈",
    title: "Progress analytics",
    desc: "Chapter-wise mastery scores, time-on-task metrics, and trend graphs for smarter lesson planning.",
  },
];

const subjects = [
  { icon: "➗", name: "Mathematics" },
  { icon: "🔬", name: "Science" },
  { icon: "📝", name: "English" },
  { icon: "🗺️", name: "Social Science" },
  { icon: "🇮🇳", name: "Hindi" },
  { icon: "⚡", name: "Physics" },
  { icon: "🧪", name: "Chemistry" },
  { icon: "🧬", name: "Biology" },
  { icon: "🏛️", name: "History" },
  { icon: "🌍", name: "Geography" },
  { icon: "📈", name: "Economics" },
  { icon: "💻", name: "Computer Science" },
];

const boards = ["CBSE", "ICSE", "Maharashtra Board", "Karnataka Board", "Tamil Nadu Board", "UP Board"];

const modes = [
  {
    icon: "💬",
    title: "Text Chat",
    desc: "Type your doubt any time, day or night. Get a clear, chapter-referenced explanation instantly — with examples from your exact textbook.",
    tag: "Available on Free Plan",
    tagColor: "bg-green-500/20 text-green-300",
  },
  {
    icon: "🎙️",
    title: "Voice Chat",
    desc: "Speak your question out loud and hear the answer read back. Great for revising while commuting or when you'd rather talk than type.",
    tag: "Pro & School Plans",
    tagColor: "bg-amber-400/20 text-amber-300",
  },
  {
    icon: "📹",
    title: "Video Chat & Oral Exams",
    desc: "Face-to-face AI tutoring. Panda conducts Socratic oral Q&A, evaluates your spoken answers, and gives structured feedback — like a real teacher.",
    tag: "Pro & School Plans",
    tagColor: "bg-amber-400/20 text-amber-300",
  },
];

const leaderboard = [
  { rank: "🥇", name: "Arjun Mehta", xp: "2,840 XP", isYou: false },
  { rank: "2", name: "Priya Krishnamurthy", xp: "2,610 XP", isYou: false },
  { rank: "3", name: "You (Rohan)", xp: "2,350 XP", isYou: true },
];

const schoolProps = [
  {
    icon: "⏱️",
    title: "Save teacher time on doubt-solving",
    desc: "Students get 24/7 answers for routine textbook doubts. Teachers reclaim classroom time for deeper discussions and project work.",
  },
  {
    icon: "🚨",
    title: "Identify struggling students early",
    desc: "At-risk alerts surface when a student's engagement or scores drop — letting teachers intervene before exam season, not after.",
  },
  {
    icon: "📋",
    title: "Board-accurate, zero off-syllabus risk",
    desc: "Content sourced from official board textbooks. No parent will call to say their child learned something not in the syllabus.",
  },
];

const stats = [
  { number: "10,000+", label: "Questions answered" },
  { number: "6", label: "Boards supported" },
  { number: "12", label: "Classes covered (1–12)" },
  { number: "2", label: "Languages — Hindi & English" },
];

const testimonials = [
  {
    quote: "My daughter used to call me at midnight with Maths doubts. Now she just asks Panda and gets the exact CBSE explanation she needs, in Hindi. I can finally sleep.",
    name: "Sunita Verma",
    meta: "Parent · Class 10 student · Lucknow, UP Board",
    initials: "S",
    color: "bg-[#1A4731]",
  },
  {
    quote: "The quiz battles are addictive. I challenged my friend to a Chemistry chapter battle and ended up revising the whole periodic table without even realising it.",
    name: "Arjun Patel",
    meta: "Class 11 · CBSE · Ahmedabad",
    initials: "A",
    color: "bg-green-700",
  },
  {
    quote: "As a teacher, the at-risk alerts are genuinely useful. I caught two students falling behind three weeks before the unit test — and we fixed it in time.",
    name: "Meera Nambiar",
    meta: "Science Teacher · ICSE School · Kochi",
    initials: "M",
    color: "bg-amber-500",
  },
];

const faqItems = [
  {
    q: "Does Panda follow my exact school syllabus?",
    a: "Yes. We ingest board-official textbooks for CBSE, ICSE, and select State boards chapter by chapter. Every answer Panda gives is grounded in the exact content your school teaches — not generic internet knowledge or a different board's curriculum.",
  },
  {
    q: "What classes does Learning Panda AI support?",
    a: "Learning Panda AI supports Class 1 through Class 12 across all major subjects — Mathematics, Science, English, Social Science, Hindi, Physics, Chemistry, Biology, History, Geography, Economics, and Computer Science.",
  },
  {
    q: "Can my child use voice or video to ask questions?",
    a: "Yes. Learning Panda AI supports text, voice, and video interaction. Your child can speak a question naturally and hear the explanation, or join a video session where Panda conducts a Socratic oral Q&A — similar to how a teacher would evaluate understanding. Voice and video are available on the Pro and School plans.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The free plan gives your child 20 questions per day with text chat, access to basic chapter quizzes, and daily streak tracking. No credit card is required to sign up. You can upgrade to Pro at any time for unlimited access, voice, video, and the full feature set.",
  },
  {
    q: "How do parent reports work?",
    a: "Every week, parents on the Pro or School plan receive an email summary showing: topics and chapters covered, quiz scores and mastery levels, total time spent studying, and any chapters or subjects that need attention. You can also view reports on demand through the parent portal.",
  },
  {
    q: "Is it safe for children?",
    a: "Absolutely. All content is strictly educational and sourced from official board textbooks. Our content moderation system prevents off-topic, inappropriate, or unsafe conversations. Panda only engages in academic discussions, and parents have full visibility into their child's activity.",
  },
];

// ── Schema data (updated for Indian market) ──────────────────────────────
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://learningpanda.ai";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Learning Panda AI",
  url: BASE_URL,
  description:
    "AI-powered learning platform for Indian school students (Class 1–12) across CBSE, ICSE, and State boards. Students interact with their exact textbooks via text, voice, and video.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/courses?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Learning Panda AI",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.ico`,
  description:
    "Learning Panda AI provides AI-powered tutoring for Indian school students (Class 1–12) across CBSE, ICSE, Maharashtra, Karnataka, Tamil Nadu, and UP boards.",
  foundingDate: "2024",
  knowsAbout: ["AI tutoring", "CBSE", "ICSE", "Indian school education", "Adaptive learning", "Spaced repetition"],
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Learning Panda AI",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: BASE_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5", ratingCount: "3", bestRating: "5" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

// ── Page Component ─────────────────────────────────────────────────────────
export default function LandingPage() {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const [activeTab, setActiveTab] = useState<"students" | "parents">("students");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);
  const [showChatResponse, setShowChatResponse] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowChatResponse(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF7", fontFamily: "var(--font-nunito)" }}>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative pt-20 pb-24 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #F0FDF4 0%, #FAFAF7 45%, #FAFAF7 100%)" }}
        aria-label="Hero"
      >
        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)" }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={td(0)}
                className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border"
                style={{
                  background: "#F0FDF4",
                  borderColor: "#86EFAC",
                  color: "#1A4731",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Now available for CBSE, ICSE & 4 State Boards
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={td(0.1)}
                className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-gray-900 leading-[1.15] mb-5 tracking-tight"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Your textbooks.{" "}
                <br className="hidden sm:block" />
                Your board.{" "}
                <span
                  className="relative inline-block"
                  style={{ color: "#1A4731" }}
                >
                  Your AI tutor.
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    height="6"
                    viewBox="0 0 200 6"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M0 3 Q100 0 200 3" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={td(0.2)}
                className="text-lg text-gray-500 leading-relaxed mb-8 max-w-[500px]"
              >
                Learning Panda AI studies CBSE, ICSE, and State board textbooks so your child gets
                answers from the exact content their school teaches — not generic internet results.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={td(0.3)}
                className="flex flex-col sm:flex-row gap-3 mb-8"
              >
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 text-white font-bold px-7 py-3.5 rounded-2xl text-base transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: "#22C55E" }}
                >
                  🚀 Start Learning Free
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 rounded-2xl text-base border-2 transition-all hover:-translate-y-0.5"
                  style={{ borderColor: "#1A4731", color: "#1A4731" }}
                >
                  See How It Works
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={td(0.4)}
                className="flex flex-wrap gap-2"
              >
                {["CBSE Aligned", "ICSE Aligned", "State Boards", "Class 1–12", "Hindi & English"].map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 bg-white border text-gray-500 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    {b}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — Chat Mockup */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={td(0.15)}
              className="relative"
            >
              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 right-4 z-10 bg-white border shadow-md rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-gray-700"
                style={{ borderColor: "#E5E7EB" }}
                aria-hidden="true"
              >
                🔥 Day 14 streak!
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-4 -left-2 z-10 bg-white border shadow-md rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-gray-700"
                style={{ borderColor: "#E5E7EB" }}
                aria-hidden="true"
              >
                ✅ +50 XP earned
              </motion.div>

              <div
                className="bg-white rounded-3xl p-6 shadow-xl border"
                style={{ borderColor: "#E5E7EB" }}
                role="region"
                aria-label="AI chat demo"
              >
                {/* Chat header */}
                <div className="flex items-center gap-3 pb-4 mb-5 border-b" style={{ borderColor: "#F3F4F6" }}>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #1A4731, #22C55E)" }}
                    aria-hidden="true"
                  >
                    🐼
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Panda AI Tutor</div>
                    <div className="text-xs font-semibold text-green-500">Class 9 · CBSE · Science</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-green-500">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Online
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-4 min-h-[200px]">
                  {/* Student message */}
                  <div className="flex gap-2.5 justify-end">
                    <div className="max-w-[80%]">
                      <div
                        className="text-xs font-semibold px-3.5 py-2.5 rounded-2xl rounded-br-sm leading-relaxed"
                        style={{ background: "#EFF6FF", color: "#1E40AF" }}
                      >
                        Explain Newton&apos;s third law from Class 9 CBSE Science Chapter 9
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1 text-right">Rohan, Class 9 · just now</p>
                    </div>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 flex-shrink-0 mt-0.5"
                      style={{ background: "#EFF6FF" }}
                      aria-label="Student"
                    >
                      R
                    </div>
                  </div>

                  {/* Typing / Response */}
                  <AnimatePresence mode="wait">
                    {!showChatResponse ? (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-2.5"
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
                          style={{ background: "#F0FDF4" }}
                          aria-label="Panda AI"
                        >
                          🐼
                        </div>
                        <div
                          className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm"
                          style={{ background: "#F0FDF4" }}
                          role="status"
                          aria-label="Panda is typing"
                        >
                          {[0, 0.15, 0.3].map((delay, i) => (
                            <motion.span
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-green-500 block"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="response"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex gap-2.5"
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
                          style={{ background: "#F0FDF4" }}
                          aria-label="Panda AI"
                        >
                          🐼
                        </div>
                        <div className="max-w-[82%]">
                          <div
                            className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5"
                            style={{ background: "#1A4731", color: "#fff" }}
                          >
                            📘 Ch. 9: Force &amp; Laws of Motion
                          </div>
                          <div
                            className="text-xs leading-relaxed px-3.5 py-2.5 rounded-2xl rounded-bl-sm"
                            style={{ background: "#F0FDF4", color: "#111827" }}
                          >
                            Great question! According to your NCERT textbook, Chapter 9:{" "}
                            <strong>Newton&apos;s Third Law</strong> states that for every action,
                            there is an equal and opposite reaction.
                            <br />
                            <br />
                            Example from your book: When you push against a wall, the wall pushes
                            back with the same force — which is why you don&apos;t fall forward. 🤝
                          </div>
                          <p className="text-[10px] text-gray-400 mt-1">Panda AI · from your exact CBSE textbook</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Input bar */}
                <div
                  className="mt-4 flex items-center gap-2 rounded-full px-4 py-2.5 border"
                  style={{ background: "#F9FAFB", borderColor: "#E5E7EB" }}
                >
                  <span className="flex-1 text-xs text-gray-400">Ask any question from your textbook...</span>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "#22C55E" }}
                    aria-hidden="true"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. PROBLEM → SOLUTION ───────────────────────────────────────── */}
      <section aria-label="Problem and solution" style={{ background: "#1A4731" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {problems.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={td(i * 0.1)}
                className="px-8 py-12"
              >
                <div className="flex items-start gap-2.5 text-sm text-white/50 mb-6 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-[10px] font-bold text-red-400 flex-shrink-0 mt-0.5">✕</span>
                  {p.before}
                </div>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "#22C55E" }}
                  aria-hidden="true"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                  </svg>
                </div>
                <p className="text-white font-semibold leading-relaxed">{p.after}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24" style={{ background: "#FAFAF7" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">
              Simple by design
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={td(0.1)}
              className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              From signup to learning in 60 seconds
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={td(0.2)}
              className="text-gray-500 mt-3 max-w-xl mx-auto"
            >
              No setup. No textbook scanning. We&apos;ve already done the work — just pick your board and start asking.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {/* Connector line (desktop only) */}
            <div
              className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px opacity-20"
              style={{ background: "linear-gradient(90deg, #22C55E, #86EFAC, #22C55E)" }}
              aria-hidden="true"
            />
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={td(i * 0.1)}
                whileHover={{ y: -4 }}
                className="bg-white border rounded-2xl p-7 text-center transition-shadow hover:shadow-md"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-base mx-auto mb-5 border-2"
                  style={{ background: "#F0FDF4", borderColor: "#86EFAC", color: "#1A4731", fontFamily: "var(--font-fredoka)" }}
                >
                  {step.num}
                </div>
                <div className="text-2xl mb-3" aria-hidden="true">{step.icon}</div>
                <h3 className="font-extrabold text-gray-900 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURES ─────────────────────────────────────────────────── */}
      <section id="features" className="py-24" style={{ background: "#F8FBF8" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">
              Everything you need
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={td(0.1)}
              className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Built for students. Trusted by parents.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={td(0.2)}
              className="text-gray-500 max-w-lg"
            >
              Every feature is designed around the Indian school curriculum — not a generic global product retrofitted for India.
            </motion.p>
          </div>

          {/* Tabs */}
          <div
            className="flex gap-1 p-1 rounded-full w-fit mb-12"
            style={{ background: "#E5E7EB" }}
            role="tablist"
          >
            {(["students", "parents"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
                className="px-6 py-2.5 rounded-full text-sm font-bold transition-all"
                style={
                  activeTab === tab
                    ? { background: "#fff", color: "#1A4731", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }
                    : { color: "#6B7280" }
                }
              >
                {tab === "students" ? "For Students" : "For Parents & Schools"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              role="tabpanel"
            >
              {(activeTab === "students" ? studentFeatures : parentFeatures).map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  whileHover={{ y: -3 }}
                  className="bg-white border rounded-2xl p-6 transition-shadow hover:shadow-md"
                  style={{ borderColor: "#E5E7EB" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
                    style={{ background: "#F0FDF4" }}
                    aria-hidden="true"
                  >
                    {f.icon}
                  </div>
                  <h3 className="font-extrabold text-gray-900 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── 5. SUBJECTS & BOARDS ────────────────────────────────────────── */}
      <section id="subjects" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">
              Coverage
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={td(0.1)}
              className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Every board. Every subject.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={td(0.2)}
              className="text-gray-500 max-w-lg mx-auto"
            >
              We&apos;ve ingested the official textbooks for all major Indian school boards — and we&apos;re adding more every quarter.
            </motion.p>
          </div>

          {/* Boards */}
          <div className="flex flex-wrap gap-3 justify-center mb-12" role="list">
            {boards.map((b) => (
              <span
                key={b}
                role="listitem"
                className="px-5 py-2 rounded-full text-sm font-bold text-white"
                style={{ background: "#1A4731" }}
              >
                {b}
              </span>
            ))}
            <span
              className="px-5 py-2 rounded-full text-sm font-semibold border"
              style={{ borderColor: "#E5E7EB", color: "#9CA3AF" }}
            >
              + More coming Q3 2025
            </span>
          </div>

          {/* Subjects grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4" role="list">
            {subjects.map((s, i) => (
              <motion.div
                key={s.name}
                role="listitem"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3, scale: 1.03 }}
                className="bg-white border rounded-2xl p-4 text-center transition-all hover:shadow-md cursor-default"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div className="text-2xl mb-2" aria-hidden="true">{s.icon}</div>
                <div className="text-xs font-bold text-gray-700">{s.name}</div>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-10 text-lg font-bold text-gray-400"
          >
            <span style={{ color: "#1A4731" }}>Every subject.</span> Every chapter.{" "}
            <span style={{ color: "#1A4731" }}>Every question.</span>
          </motion.p>
        </div>
      </section>

      {/* ── 6. INTERACTION MODES ────────────────────────────────────────── */}
      <section
        id="interaction"
        className="py-24"
        style={{ background: "#1A4731" }}
        aria-label="Ways to interact with Panda"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-400 mb-3">
              3 ways to learn
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={td(0.1)}
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Ask in the way that feels natural
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={td(0.2)}
              className="max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Whether your child prefers typing, speaking, or a face-to-face session — Panda is ready in all three modes.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {modes.map((mode, i) => (
              <motion.div
                key={mode.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={td(i * 0.1)}
                whileHover={{ y: -5 }}
                className="rounded-3xl p-8 text-center transition-all"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                role="article"
              >
                <div className="text-4xl mb-5" aria-hidden="true">{mode.icon}</div>
                <h3 className="text-xl font-extrabold text-white mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
                  {mode.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {mode.desc}
                </p>
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${mode.tagColor}`}>
                  {mode.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. GAMIFICATION ─────────────────────────────────────────────── */}
      <section
        id="gamification"
        className="py-24"
        style={{ background: "linear-gradient(135deg, #FEF3C7 0%, #FFF7ED 50%, #F0FDF4 100%)" }}
        aria-label="Gamification features"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">
                Engagement by design
              </motion.p>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={td(0.1)}
                className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-5"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Learning that feels like a game
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={td(0.2)}
                className="text-gray-500 leading-relaxed mb-8"
              >
                Students who maintain streaks study 3× more consistently. Panda&apos;s XP system,
                leaderboards, and quiz battles turn daily revision into something students look forward to.
              </motion.p>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={td(0.3)}>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-2xl text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: "#1A4731" }}
                >
                  Try It Free <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>

            {/* Right — Game cards */}
            <div className="flex flex-col gap-4">
              {/* XP Bar */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-5 shadow-md border"
                style={{ borderColor: "#E5E7EB" }}
                role="region"
                aria-label="XP progress"
              >
                <p className="text-sm font-bold text-gray-900 mb-3">⭐ Your XP Progress</p>
                <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1.5">
                  <span>Level 7 — Panda Scholar</span>
                  <span>370 / 500 XP</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#E5E7EB" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #22C55E, #16A34A)" }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "74%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Streak */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={td(0.1)}
                className="bg-white rounded-2xl p-5 shadow-md border"
                style={{ borderColor: "#E5E7EB" }}
                role="region"
                aria-label="Streak counter"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl" aria-hidden="true">🔥</span>
                  <div>
                    <div className="text-2xl font-extrabold" style={{ color: "#F59E0B", fontFamily: "var(--font-fredoka)" }}>14</div>
                    <div className="text-xs text-gray-500 font-medium">Day streak — keep it going!</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-[10px] text-gray-400">Best</div>
                    <div className="text-base font-bold" style={{ color: "#F59E0B" }}>21 days</div>
                  </div>
                </div>
              </motion.div>

              {/* Badges */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={td(0.15)}
                className="bg-white rounded-2xl p-5 shadow-md border"
                style={{ borderColor: "#E5E7EB" }}
                role="region"
                aria-label="Earned badges"
              >
                <p className="text-sm font-bold text-gray-900 mb-3">🏅 Recently Earned</p>
                <div className="flex gap-2 flex-wrap">
                  {[["🧬", "Bio Master"], ["⚡", "Physics Pro"], ["🔥", "2-Week Streak"], ["⚔️", "Battle Winner"]].map(([icon, label]) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border text-xs font-bold"
                      style={{ background: "#F0FDF4", borderColor: "#86EFAC", color: "#1A4731" }}
                    >
                      <span className="text-lg" aria-hidden="true">{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Leaderboard */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={td(0.2)}
                className="bg-white rounded-2xl p-5 shadow-md border"
                style={{ borderColor: "#E5E7EB" }}
                role="region"
                aria-label="Class leaderboard"
              >
                <p className="text-sm font-bold text-gray-900 mb-3">🏆 Class 10-B Leaderboard</p>
                <div className="flex flex-col gap-0">
                  {leaderboard.map((entry, i) => (
                    <div
                      key={entry.name}
                      className="flex items-center gap-3 py-2.5 px-2 rounded-lg"
                      style={entry.isYou ? { background: "#F0FDF4" } : {}}
                    >
                      <span className="text-sm w-6 font-bold" style={{ color: i === 0 ? "#D97706" : "#9CA3AF" }}>
                        {entry.rank}
                      </span>
                      <span className={`flex-1 text-sm font-semibold ${entry.isYou ? "text-green-800" : "text-gray-900"}`}>
                        {entry.name}
                      </span>
                      <span className="text-xs font-bold" style={{ color: "#1A4731" }}>{entry.xp}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FOR SCHOOLS ──────────────────────────────────────────────── */}
      <section id="for-schools" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">
                B2B2C
              </motion.p>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={td(0.1)}
                className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-5"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Bring Learning Panda AI to your school
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={td(0.2)}
                className="text-gray-500 leading-relaxed mb-10"
              >
                Give every student a personal AI tutor — without replacing teachers. Panda handles
                repetitive doubt-solving so teachers can focus on higher-order instruction.
              </motion.p>

              <div className="flex flex-col gap-8">
                {schoolProps.map((prop, i) => (
                  <motion.div
                    key={prop.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={td(i * 0.1)}
                    className="flex gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: "#F0FDF4" }}
                      aria-hidden="true"
                    >
                      {prop.icon}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-gray-900 mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>{prop.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{prop.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={td(0.4)} className="mt-10">
                <a
                  href="mailto:schools@learningpanda.ai"
                  className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-2xl text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: "#1A4731" }}
                >
                  Request a School Demo <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </div>

            {/* Right — Teacher Dashboard Mockup */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={td(0.2)}
              className="bg-white rounded-3xl p-7 shadow-xl border"
              style={{ borderColor: "#E5E7EB" }}
              role="region"
              aria-label="Teacher dashboard preview"
            >
              <div className="flex items-center justify-between mb-5">
                <h4 className="font-bold text-gray-900">🖥️ Teacher Dashboard</h4>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "#F0FDF4", color: "#1A4731" }}
                >
                  Class 9-A · Science
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[["34", "Students Active"], ["78%", "Ch. 9 Mastery"], ["3", "At-Risk Alerts"]].map(([val, label]) => (
                  <div key={label} className="rounded-xl p-3 text-center" style={{ background: "#F9FAFB" }}>
                    <div className="text-xl font-extrabold" style={{ color: "#1A4731", fontFamily: "var(--font-fredoka)" }}>{val}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{label}</div>
                  </div>
                ))}
              </div>

              {/* Student list */}
              <div className="flex flex-col gap-2">
                {[
                  { initial: "R", name: "Rohan Gupta", sub: "Ch. 9 · 45 min today", progress: "92%", color: "bg-green-500", progressColor: "#22C55E", alert: false },
                  { initial: "A", name: "Ananya Iyer", sub: "Ch. 8 · 28 min today", progress: "85%", color: "bg-blue-500", progressColor: "#22C55E", alert: false },
                  { initial: "P", name: "Priya Sharma", sub: "Ch. 7 · 12 min today", progress: "61%", color: "bg-amber-400", progressColor: "#F59E0B", alert: false },
                  { initial: "V", name: "Vikram Nair", sub: "Ch. 6 · 0 min today", progress: "38%", color: "bg-red-400", progressColor: "#EF4444", alert: true },
                ].map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: "#F9FAFB" }}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${s.color}`} aria-hidden="true">
                      {s.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate">{s.name}</div>
                      <div className="text-[10px] text-gray-400">{s.sub}</div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-xs font-bold" style={{ color: s.progressColor }}>{s.progress}</span>
                      {s.alert && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ background: "#FEF2F2", color: "#EF4444" }}
                        >
                          ⚠ At Risk
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 9. STATS + TESTIMONIALS ─────────────────────────────────────── */}
      <section id="stats" className="py-24" style={{ background: "#F0FDF4" }} aria-label="Platform stats and testimonials">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={td(i * 0.1)}
                className="text-center"
              >
                <div
                  className="text-4xl sm:text-5xl font-extrabold mb-2"
                  style={{ color: "#1A4731", fontFamily: "var(--font-fredoka)" }}
                >
                  {s.number}
                </div>
                <div className="text-sm text-gray-500 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="text-center mb-12">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl font-extrabold text-gray-900 tracking-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              What students, parents & teachers say
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={td(i * 0.1)}
                className="bg-white rounded-2xl p-6 border shadow-sm"
                style={{ borderColor: "#E5E7EB" }}
                role="article"
              >
                <div className="flex items-center gap-0.5 mb-4" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed italic mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ${t.color}`} aria-hidden="true">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.meta}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. PRICING ─────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">
              Transparent pricing
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={td(0.1)}
              className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Plans for every student and school
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={td(0.2)}
              className="text-gray-500 mb-10"
            >
              Start free — no credit card required. Upgrade when you&apos;re ready for the full experience.
            </motion.p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-3" role="group" aria-label="Billing period">
              <span className={`text-sm font-semibold ${!isAnnual ? "text-gray-900" : "text-gray-400"}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                role="switch"
                aria-checked={isAnnual}
                className="w-11 h-6 rounded-full relative transition-colors"
                style={{ background: "#22C55E" }}
                aria-label="Switch to annual billing"
              >
                <span
                  className="absolute w-4.5 h-4.5 bg-white rounded-full top-0.5 transition-transform shadow-sm"
                  style={{
                    width: "18px",
                    height: "18px",
                    top: "3px",
                    left: isAnnual ? "calc(100% - 21px)" : "3px",
                  }}
                />
              </button>
              <span className={`text-sm font-semibold ${isAnnual ? "text-gray-900" : "text-gray-400"}`}>Annual</span>
              <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ background: "#F59E0B" }}>
                Save 30%
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* Free */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-3xl p-8 border-2 transition-shadow hover:shadow-md"
              style={{ borderColor: "#E5E7EB", background: "#fff" }}
            >
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Free</div>
              <div className="flex items-start mb-2">
                <span className="text-lg font-bold mt-2 mr-1">₹</span>
                <span className="text-5xl font-extrabold text-gray-900" style={{ fontFamily: "var(--font-fredoka)" }}>0</span>
                <span className="text-gray-400 text-sm self-end mb-2 ml-1">/ month</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Get started at no cost. Perfect for trying Panda before committing.</p>
              <Link
                href="/login"
                className="w-full flex items-center justify-center font-bold py-3.5 rounded-2xl text-sm border-2 mb-6 transition-all hover:border-green-400 hover:text-green-700"
                style={{ borderColor: "#E5E7EB", color: "#6B7280" }}
              >
                Get Started Free
              </Link>
              <ul className="space-y-3">
                {[
                  ["✓", "20 questions per day", true],
                  ["✓", "Text chat only", true],
                  ["✓", "Basic chapter quizzes", true],
                  ["✓", "CBSE & ICSE content", true],
                  ["✓", "Daily streak tracking", true],
                  ["–", "Voice & video chat", false],
                  ["–", "Smart study planner", false],
                  ["–", "Parent reports", false],
                ].map(([check, label, enabled]) => (
                  <li key={label as string} className={`flex items-start gap-2.5 text-sm ${enabled ? "text-gray-600" : "text-gray-300"}`}>
                    <span
                      className="w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                      style={{
                        width: "18px",
                        height: "18px",
                        background: enabled ? "#F0FDF4" : "#F9FAFB",
                        color: enabled ? "#1A4731" : "#D1D5DB",
                      }}
                    >
                      {check as string}
                    </span>
                    {label as string}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Pro */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={td(0.1)}
              className="rounded-3xl p-8 border-2 relative transition-shadow hover:shadow-md"
              style={{ borderColor: "#22C55E", boxShadow: "0 0 0 4px rgba(34,197,94,0.1)", background: "#fff" }}
            >
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full text-white whitespace-nowrap"
                style={{ background: "#22C55E" }}
              >
                ⭐ Most Popular
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Pro</div>
              <div className="flex items-start mb-2">
                <span className="text-lg font-bold mt-2 mr-1">₹</span>
                <motion.span
                  key={isAnnual ? "annual" : "monthly"}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-extrabold text-gray-900"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {isAnnual ? "2,499" : "299"}
                </motion.span>
                <span className="text-gray-400 text-sm self-end mb-2 ml-1">
                  {isAnnual ? "/ year" : "/ month"}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                {isAnnual ? "Save ₹1,089 vs monthly billing. Best value for serious students." : "Everything a serious student needs. Cancel anytime."}
              </p>
              <Link
                href="/login"
                className="w-full flex items-center justify-center font-bold py-3.5 rounded-2xl text-sm text-white mb-6 transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ background: "#22C55E" }}
              >
                Start Pro Free (7 days)
              </Link>
              <ul className="space-y-3">
                {[
                  "Unlimited questions per day",
                  "Text, voice & video chat",
                  "Adaptive quizzes & spaced repetition",
                  "AI oral exams",
                  "Smart study planner",
                  "Weekly parent reports",
                  "Leaderboards & quiz battles",
                  "All 6 boards + all subjects",
                ].map((label) => (
                  <li key={label} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span
                      className="rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                      style={{ width: "18px", height: "18px", minWidth: "18px", background: "#F0FDF4", color: "#1A4731" }}
                    >
                      ✓
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* School */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={td(0.2)}
              className="rounded-3xl p-8 border-2 transition-shadow hover:shadow-md"
              style={{ borderColor: "#E5E7EB", background: "#fff" }}
            >
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">School</div>
              <div className="text-4xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>Custom</div>
              <p className="text-sm text-gray-500 mb-6">Bulk licenses for schools. Includes teacher dashboard, admin controls, and priority support.</p>
              <a
                href="mailto:schools@learningpanda.ai"
                className="w-full flex items-center justify-center font-bold py-3.5 rounded-2xl text-sm text-white mb-6 transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ background: "#1A4731" }}
              >
                Request a Demo
              </a>
              <ul className="space-y-3">
                {[
                  "Everything in Pro",
                  "Teacher dashboard",
                  "At-risk student alerts",
                  "Chapter assignment by teacher",
                  "Bulk student management",
                  "Priority support (SLA)",
                  "Custom curriculum upload",
                  "Onboarding & training included",
                ].map((label) => (
                  <li key={label} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span
                      className="rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                      style={{ width: "18px", height: "18px", minWidth: "18px", background: "#F0FDF4", color: "#1A4731" }}
                    >
                      ✓
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 11. FAQ ─────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24" style={{ background: "#F8FBF8" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">
              Questions answered
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={td(0.1)}
              className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Frequently asked questions
            </motion.h2>
          </div>

          <div className="divide-y" style={{ borderColor: "#E5E7EB" }} role="list">
            {faqItems.map((item, i) => (
              <div key={i} role="listitem">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left font-semibold text-gray-900 hover:text-green-800 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span>{item.q}</span>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                    style={openFaq === i ? { background: "#22C55E" } : { background: "#E5E7EB" }}
                  >
                    {openFaq === i ? (
                      <Minus className="h-3 w-3 text-white" />
                    ) : (
                      <Plus className="h-3 w-3 text-gray-500" />
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-gray-500 leading-relaxed pb-5">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. FINAL CTA ───────────────────────────────────────────────── */}
      <section
        className="py-28 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1A4731 0%, #1B5E3A 100%)" }}
        aria-label="Call to action"
      >
        {/* Decorative rings */}
        {[
          "absolute w-72 h-72 rounded-full border border-white/10 -top-16 -left-16",
          "absolute w-96 h-96 rounded-full border border-white/10 -bottom-24 -right-24",
        ].map((cls, i) => (
          <div key={i} className={cls} aria-hidden="true" />
        ))}

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-5xl mb-5" aria-hidden="true">🐼</div>
            <h2
              className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Start learning the smarter way — for free
            </h2>
            <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
              No credit card. No setup. Just pick your board, your class, and start asking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={isLoggedIn ? "/dashboard" : "/login"}
                className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-xl hover:-translate-y-0.5"
                style={{ background: "#fff", color: "#1A4731" }}
              >
                {isLoggedIn ? (
                  <><LayoutDashboard className="h-5 w-5" /> Go to Dashboard</>
                ) : (
                  <>🚀 Start Free Today</>
                )}
              </Link>
              <a
                href="mailto:schools@learningpanda.ai"
                className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-2xl text-base border-2 transition-all"
                style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}
              >
                Request a School Demo
              </a>
            </div>
            <p className="mt-8 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Check className="inline h-3.5 w-3.5 mr-1" />Free forever plan &nbsp;·&nbsp;
              <Check className="inline h-3.5 w-3.5 mr-1" />No credit card &nbsp;·&nbsp;
              <Check className="inline h-3.5 w-3.5 mr-1" />Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
