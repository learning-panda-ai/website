"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Check, LayoutDashboard } from "lucide-react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    emoji: "💬",
    title: "Ask Anything",
    desc: "Type your question or snap a photo of your homework. Panda understands text, math, and more.",
    color: "bg-green-100",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  {
    emoji: "🧠",
    title: "Get Clear Explanations",
    desc: "Receive step-by-step explanations tailored to your grade and learning style.",
    color: "bg-amber-100",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
  },
  {
    emoji: "✏️",
    title: "Practice & Apply",
    desc: "Reinforce your understanding with personalized practice problems and quizzes.",
    color: "bg-blue-100",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  {
    emoji: "📈",
    title: "Track Your Progress",
    desc: "Monitor your improvement with visual dashboards and celebrate every milestone.",
    color: "bg-purple-100",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
  },
];

const features = [
  {
    emoji: "🎯",
    title: "Adaptive Learning",
    desc: "Content and difficulty that adjusts to your unique pace and learning style automatically.",
  },
  {
    emoji: "⚡",
    title: "Instant Answers",
    desc: "Get detailed help in seconds — no waiting, no scheduling, no frustration.",
  },
  {
    emoji: "🕐",
    title: "24/7 Availability",
    desc: "Your AI study buddy is always there, whether it's 2 PM or 2 AM.",
  },
  {
    emoji: "📊",
    title: "Progress Tracking",
    desc: "Visual dashboards show you exactly how much you've grown over time.",
  },
  {
    emoji: "🎮",
    title: "Gamified Learning",
    desc: "Earn badges, points, and streaks as you master topics and build habits.",
  },
  {
    emoji: "🌍",
    title: "Any Subject",
    desc: "From algebra to literature, science to economics — Panda covers it all.",
  },
];

const subjects = [
  { emoji: "🔢", name: "Mathematics" },
  { emoji: "🧪", name: "Science" },
  { emoji: "💻", name: "Computer Science" },
  { emoji: "📜", name: "History" },
  { emoji: "📖", name: "English" },
  { emoji: "🌐", name: "Geography" },
  { emoji: "🎨", name: "Arts & Design" },
  { emoji: "📉", name: "Economics" },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Grade 10 Student",
    avatar: "👩‍🎓",
    quote:
      "Learning Panda helped me go from a C to an A in Math! The explanations are so clear and the practice problems are perfectly tailored.",
    rating: 5,
  },
  {
    name: "James T.",
    role: "Grade 8 Student",
    avatar: "👦",
    quote:
      "I love how it explains things in a fun way. It's like having a super-smart friend who's always available to help me study.",
    rating: 5,
  },
  {
    name: "Priya K.",
    role: "University Freshman",
    avatar: "👩‍💻",
    quote:
      "The adaptive learning feature is incredible. It knows exactly where I'm struggling and keeps pushing me to improve.",
    rating: 5,
  },
];

export default function LandingPage() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-nunito)" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative pt-28 pb-24 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% -10%, #FFFDE7 0%, #F1F8E9 35%, #E8F5E9 60%, #ffffff 100%)",
        }}
      >
        {/* Floating background emojis */}
        {["🍃", "🎋", "⭐", "🌿", "📖", "💡"].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl select-none pointer-events-none opacity-30"
            style={{
              top: `${[12, 20, 65, 75, 35, 55][i]}%`,
              left: `${[8, 88, 5, 90, 2, 94][i]}%`,
            }}
            animate={{ y: [0, -14, 0], rotate: [0, i % 2 === 0 ? 12 : -12, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {emoji}
          </motion.div>
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            {/* Left — copy */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600" />
                </span>
                AI-Powered Study Buddy
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-5"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                A study buddy that{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                  explains, solves,
                </span>{" "}
                and plans
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Meet Learning Panda — your AI-powered companion for every subject, every grade,
                every question. Available 24/7, infinitely patient, endlessly helpful.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                {isLoggedIn ? (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-7 py-3.5 rounded-2xl text-base transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-7 py-3.5 rounded-2xl text-base transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Start Learning Free
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                )}
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-green-50 text-green-700 font-bold px-7 py-3.5 rounded-2xl text-base border-2 border-green-200 transition-all"
                >
                  See How It Works
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-5 mt-6 justify-center lg:justify-start">
                {["No credit card required", "Works with any subject"].map((trust) => (
                  <div key={trust} className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {trust}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — panda card */}
            <motion.div
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl bg-green-300/30 blur-3xl scale-110" />

                <motion.div
                  className="relative bg-white rounded-3xl shadow-2xl shadow-green-200/60 border border-green-100 p-8 w-72 sm:w-80"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="h-24 w-24 bg-green-50 rounded-2xl flex items-center justify-center mb-4 border-2 border-green-100">
                      <span className="text-5xl">🐼</span>
                    </div>
                    <h3
                      className="font-extrabold text-gray-800 text-xl mb-1"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      Hi! I&apos;m Panda 👋
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">Your AI study buddy</p>
                    <div className="w-full bg-green-50 rounded-xl p-3 text-left border border-green-100">
                      <p className="text-xs text-green-800 font-medium">
                        &ldquo;Can you explain the Pythagorean theorem?&rdquo;
                      </p>
                    </div>
                    <div className="w-full bg-white rounded-xl p-3 text-left border border-gray-100 mt-2 shadow-sm">
                      <p className="text-xs text-gray-600">
                        Of course! In a right triangle, a² + b² = c² where c is the longest side
                        (hypotenuse). Let me show you with an example...
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-amber-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  ⚡ Instant Help
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
                  animate={{ rotate: [3, -3, 3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  🎓 Any Grade
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">
              Simple Process
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-gray-900"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              How It Works
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              From question to mastery in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative p-6 rounded-2xl border-2 ${step.borderColor} bg-white hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-12 w-12 rounded-xl ${step.color} flex items-center justify-center text-2xl`}>
                    {step.emoji}
                  </div>
                  <span className={`text-xs font-extrabold uppercase tracking-widest ${step.textColor}`}>
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="font-extrabold text-gray-800 text-lg mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        id="features"
        className="py-24"
        style={{ background: "linear-gradient(180deg, #F1F8E9 0%, #ffffff 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">
              Why Panda?
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-gray-900"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Everything you need to excel
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Powerful features designed to make learning effective and enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-2xl mb-4">
                  {feature.emoji}
                </div>
                <h3
                  className="font-extrabold text-gray-800 text-lg mb-2"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subjects ── */}
      <section id="subjects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">
              All Subjects
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-gray-900"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Learn anything, anytime
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Panda covers every subject from primary school through university
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {subjects.map((subject, i) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="bg-white border-2 border-green-100 rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer hover:border-green-300 hover:shadow-md transition-all"
              >
                <span className="text-4xl">{subject.emoji}</span>
                <span className="text-sm font-bold text-gray-700 text-center">{subject.name}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-8 font-medium">
            And many more subjects — ask Panda anything!
          </p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section
        id="testimonials"
        className="py-24"
        style={{ background: "linear-gradient(180deg, #F9FBF7 0%, #ffffff 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">
              Student Love
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-gray-900"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Students who swear by Panda
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Join thousands of students who improved their grades with Learning Panda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#1B4332" }}>
        {/* Decorative circles */}
        {[
          { size: "h-64 w-64", pos: "-top-16 -left-16", opacity: "opacity-10" },
          { size: "h-80 w-80", pos: "-bottom-20 -right-20", opacity: "opacity-10" },
          { size: "h-48 w-48", pos: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", opacity: "opacity-5" },
        ].map((circle, i) => (
          <div
            key={i}
            className={`absolute ${circle.size} rounded-full border-2 border-white ${circle.opacity} ${circle.pos}`}
          />
        ))}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-5xl mb-6">🐼</div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Ready to ace every subject?
            </h2>
            <p className="text-green-200 text-lg mb-8 max-w-xl mx-auto">
              Join Learning Panda for free today and discover a smarter way to study. No credit
              card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={isLoggedIn ? "/dashboard" : "/login"}
                className="inline-flex items-center justify-center gap-2 bg-white text-green-800 font-bold px-8 py-4 rounded-2xl text-base hover:bg-green-50 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                {isLoggedIn ? (
                  <>
                    <LayoutDashboard className="h-5 w-5" />
                    Go to Dashboard
                  </>
                ) : (
                  <>
                    Start Learning Free
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white font-bold px-8 py-4 rounded-2xl text-base border-2 border-white/30 hover:border-white/60 transition-all"
              >
                Learn More
              </a>
            </div>

            <p className="text-green-400 text-sm mt-6 font-medium">
              ✓ Free forever plan &nbsp;·&nbsp; ✓ No credit card &nbsp;·&nbsp; ✓ Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
