"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Sparkles,
  School,
  GraduationCap,
  Calculator,
  FlaskConical,
  BookOpen,
  Globe,
  Code,
  Palette,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import BasicDetails, { type BasicDetailsData } from "@/components/onboarding/BasicDetails";

/* ═══════════════════ DATA ═══════════════════ */

const grades = [
  { id: "class-1", label: "Class 1", emoji: "🌱" },
  { id: "class-2", label: "Class 2", emoji: "🌿" },
  { id: "class-3", label: "Class 3", emoji: "🍀" },
  { id: "class-4", label: "Class 4", emoji: "🌻" },
  { id: "class-5", label: "Class 5", emoji: "⭐" },
  { id: "class-6", label: "Class 6", emoji: "🌟" },
  { id: "class-7", label: "Class 7", emoji: "🔥" },
  { id: "class-8", label: "Class 8", emoji: "💫" },
  { id: "class-9", label: "Class 9", emoji: "🚀" },
  { id: "class-10", label: "Class 10", emoji: "🏆" },
  { id: "class-11", label: "Class 11", emoji: "💎" },
  { id: "class-12", label: "Class 12", emoji: "👑" },
];

const university = [
  { id: "uni-1", label: "1st Year Uni", emoji: "🎓" },
  { id: "uni-2", label: "2nd Year Uni", emoji: "📖" },
  { id: "uni-3", label: "3rd Year Uni", emoji: "🔬" },
  { id: "uni-4", label: "4th Year Uni", emoji: "🎯" },
  { id: "graduate", label: "Graduate", emoji: "🧠" },
  { id: "adult", label: "Adult Learner", emoji: "📚" },
  { id: "other", label: "Other", emoji: "🌈" },
];

const courseCategories = [
  {
    id: "math",
    label: "Math",
    emoji: "🔢",
    icon: Calculator,
    accent: "blue",
    courses: [
      "Algebra 1", "Algebra 2", "Geometry", "Trigonometry",
      "Statistics & Probability", "Linear Algebra", "Calculus",
      "Pre-Calculus", "Arithmetic",
    ],
  },
  {
    id: "science",
    label: "Science",
    emoji: "🧪",
    icon: FlaskConical,
    accent: "green",
    courses: [
      "Physics", "Chemistry", "Biology",
      "Environmental Science", "Earth Science", "Anatomy & Physiology",
    ],
  },
  {
    id: "computing",
    label: "Computing",
    emoji: "💻",
    icon: Code,
    accent: "emerald",
    courses: [
      "Computer Science", "Programming (Python)", "Web Development",
      "Data Structures", "Algorithms", "AI & Machine Learning",
    ],
  },
  {
    id: "humanities",
    label: "Humanities",
    emoji: "📜",
    icon: BookOpen,
    accent: "purple",
    courses: [
      "World History", "Economics", "Civics & Government",
      "Philosophy", "Psychology", "Sociology",
    ],
  },
  {
    id: "languages",
    label: "Languages",
    emoji: "🌍",
    icon: Globe,
    accent: "amber",
    courses: [
      "English Grammar", "English Literature", "Hindi",
      "Spanish", "French", "Reading & Writing",
    ],
  },
  {
    id: "arts",
    label: "Arts & More",
    emoji: "🎨",
    icon: Palette,
    accent: "pink",
    courses: ["Art History", "Music Theory", "Design", "Health & Fitness"],
  },
];

const accentMap: Record<string, { bg: string; border: string; text: string; check: string }> = {
  blue:    { bg: "bg-blue-50",    border: "border-blue-400",    text: "text-blue-700",    check: "bg-blue-500 border-blue-500" },
  green:   { bg: "bg-green-50",   border: "border-green-400",   text: "text-green-700",   check: "bg-green-500 border-green-500" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-400", text: "text-emerald-700", check: "bg-emerald-500 border-emerald-500" },
  purple:  { bg: "bg-purple-50",  border: "border-purple-400",  text: "text-purple-700",  check: "bg-purple-500 border-purple-500" },
  amber:   { bg: "bg-amber-50",   border: "border-amber-400",   text: "text-amber-700",   check: "bg-amber-500 border-amber-500" },
  pink:    { bg: "bg-pink-50",    border: "border-pink-400",    text: "text-pink-700",    check: "bg-pink-500 border-pink-500" },
};

const aiFormats = [
  {
    id: "text",
    name: "Text",
    icon: "📝",
    gradient: "from-blue-400 to-cyan-500",
    borderActive: "border-blue-400",
    shadowActive: "shadow-blue-200/60",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    description: "Read and learn at your own pace with clear, written explanations and examples!",
    style: "Read & Learn 📖",
  },
  {
    id: "audio",
    name: "Audio",
    icon: "🎧",
    gradient: "from-orange-400 to-amber-500",
    borderActive: "border-amber-400",
    shadowActive: "shadow-amber-200/60",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    description: "Listen to lessons like a podcast — perfect for learning on the go!",
    style: "Listen & Learn 🎵",
  },
  {
    id: "video",
    name: "Video",
    icon: "🎬",
    gradient: "from-purple-400 to-pink-500",
    borderActive: "border-purple-400",
    shadowActive: "shadow-purple-200/60",
    badge: "bg-purple-100 text-purple-700 border-purple-200",
    description: "Watch fun, visual lessons that bring topics to life with animations!",
    style: "Watch & Learn 🎥",
  },
];

/* ═══════════════════ COMPONENT ═══════════════════ */

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0); // 0: basic details, 1: grade, 2: courses, 3: ai format
  const [basicDetails, setBasicDetails] = useState<BasicDetailsData>({
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    parentName: "",
    parentMobile: "",
    parentEmail: "",
  });
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const toggleCourse = (c: string) =>
    setSelectedCourses((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const isBasicDetailsComplete = () => {
    const d = basicDetails;
    if (!d.firstName.trim() || !d.lastName.trim() || !d.city.trim() || !d.state.trim()) return false;
    if (!d.parentName.trim() || !d.parentMobile.trim() || !d.parentEmail.trim()) return false;
    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.parentEmail)) return false;
    // Basic mobile check (at least 10 digits)
    if (!/^\d{10,}$/.test(d.parentMobile.replace(/[\s\-+()]/g, ""))) return false;
    return true;
  };

  const canContinue = () => {
    if (step === 0) return isBasicDetailsComplete();
    if (step === 1) return selectedGrade !== null;
    if (step === 2) return selectedCourses.length >= 1;
    if (step === 3) return selectedFormat !== null;
    return false;
  };

  const handleSubmit = async () => {
    if (!(selectedGrade && selectedCourses.length && selectedFormat)) return;
    setSaving(true);
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...basicDetails,
          grade: selectedGrade,
          courses: selectedCourses,
          aiFormat: selectedFormat,
        }),
      });
      onComplete();
    } catch (err) {
      console.error("Failed to save onboarding data:", err);
    } finally {
      setSaving(false);
    }
  };

  // Floating background emojis
  const floatingItems = [
    { emoji: "🎋", top: "5%",  left: "3%",  delay: 0,   dur: 7 },
    { emoji: "🍃", top: "12%", right: "5%", delay: 1,   dur: 6 },
    { emoji: "⭐", top: "35%", left: "2%",  delay: 0.5, dur: 5 },
    { emoji: "📖", top: "55%", right: "3%", delay: 2,   dur: 8 },
    { emoji: "🌿", top: "75%", left: "4%",  delay: 1.5, dur: 6 },
    { emoji: "💡", top: "90%", right: "4%", delay: 0.8, dur: 7 },
  ];

  return (
    <div
      className="relative min-h-screen bamboo-dots flex flex-col"
      style={{ background: "linear-gradient(180deg, #FFFDF7 0%, #F1F8E9 40%, #E8F5E9 100%)" }}
    >
      {/* Floating background emojis */}
      {floatingItems.map((f, i) => (
        <motion.span
          key={i}
          className="pointer-events-none fixed select-none text-2xl opacity-30 sm:text-3xl"
          style={{ top: f.top, left: f.left, right: f.right } as React.CSSProperties}
          animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
        >
          {f.emoji}
        </motion.span>
      ))}

      {/* ──────── HERO HEADER ──────── */}
      <header className="relative overflow-hidden border-b-2 border-green-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-8 text-center sm:py-10">
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="panda-bounce flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-xl shadow-green-200/50 border-2 border-green-200"
          >
            <span className="text-4xl">🐼</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-extrabold tracking-tight text-green-800 sm:text-4xl"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Let&apos;s Set Up Your Adventure!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-lg text-sm text-green-600/70 font-medium sm:text-base"
          >
            Answer a few quick questions so we can build the perfect learning path just for you ✨
          </motion.p>

          {/* Mini progress pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 flex items-center gap-2"
          >
            {["Details", "Grade", "Courses", "AI Format"].map((label, idx) => {
              const done = [isBasicDetailsComplete(), selectedGrade !== null, selectedCourses.length >= 1, selectedFormat !== null][idx];
              return (
                <span
                  key={label}
                  className={`flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-xs font-bold transition-all ${
                    done
                      ? "border-green-400 bg-green-50 text-green-700"
                      : "border-green-200 bg-white text-green-400"
                  }`}
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="h-3.5 w-3.5 rounded-full border-2 border-current inline-block" />}
                  {label}
                </span>
              );
            })}
          </motion.div>
        </div>
      </header>

      {/* ──────── STEP SCREENS ──────── */}
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-3xl">
          {step === 0 && (
            <BasicDetails data={basicDetails} onChange={setBasicDetails} />
          )}
          {step === 1 && (
            <motion.section
              key="grade"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="rounded-4xl border-2 border-green-200 bg-white/80 p-6 shadow-lg shadow-green-100/40 backdrop-blur-sm sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-100 text-lg">🎒</span>
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-green-800 sm:text-2xl" style={{ fontFamily: "var(--font-fredoka)" }}>
                    What grade are you in?
                  </h2>
                  <p className="text-xs text-green-500 font-medium">Pick one so we match your level ✨</p>
                </div>
                {selectedGrade && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-green-500">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </motion.span>
                )}
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* School */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <School className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-green-600" style={{ fontFamily: "var(--font-fredoka)" }}>School</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {grades.map((g) => {
                      const sel = selectedGrade === g.id;
                      return (
                        <motion.button
                          key={g.id}
                          whileHover={{ scale: 1.06, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedGrade(g.id)}
                          className={`flex flex-col items-center gap-1 rounded-2xl border-2 px-2 py-3 text-center transition-all ${
                            sel
                              ? "border-green-400 bg-green-50 shadow-md shadow-green-200/50"
                              : "border-green-100 bg-white hover:border-green-300 hover:bg-green-50/50"
                          }`}
                        >
                          <span className="text-xl">{g.emoji}</span>
                          <span className={`text-xs font-bold ${sel ? "text-green-700" : "text-green-600"}`}>{g.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
                {/* University */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-amber-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-green-600" style={{ fontFamily: "var(--font-fredoka)" }}>University / Adult</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {university.map((u) => {
                      const sel = selectedGrade === u.id;
                      return (
                        <motion.button
                          key={u.id}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedGrade(u.id)}
                          className={`flex items-center gap-2 rounded-2xl border-2 px-3 py-2.5 text-left transition-all ${
                            sel
                              ? "border-green-400 bg-green-50 shadow-md shadow-green-200/50"
                              : "border-green-100 bg-white hover:border-green-300 hover:bg-green-50/50"
                          }`}
                        >
                          <span className="text-lg">{u.emoji}</span>
                          <span className={`text-xs font-bold ${sel ? "text-green-700" : "text-green-600"}`}>{u.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.section>
          )}
          {step === 2 && (
            <motion.section
              key="courses"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="rounded-4xl border-2 border-green-200 bg-white/80 p-6 shadow-lg shadow-green-100/40 backdrop-blur-sm sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-lg">📚</span>
                <div className="flex-1">
                  <h2 className="text-xl font-extrabold tracking-tight text-green-800 sm:text-2xl" style={{ fontFamily: "var(--font-fredoka)" }}>
                    What do you want to learn?
                  </h2>
                  <p className="text-xs text-green-500 font-medium">Pick as many subjects as you like 🎯</p>
                </div>
                {selectedCourses.length > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 rounded-full border-2 border-green-300 bg-green-50 px-3 py-1 text-xs font-extrabold text-green-700">
                    ⭐ {selectedCourses.length} selected
                  </motion.span>
                )}
              </div>
              <div className="space-y-6">
                {courseCategories.map((cat) => {
                  const a = accentMap[cat.accent];
                  return (
                    <div key={cat.id}>
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-lg">{cat.emoji}</span>
                        <span className="text-xs font-bold uppercase tracking-wider text-green-600" style={{ fontFamily: "var(--font-fredoka)" }}>{cat.label}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.courses.map((course) => {
                          const sel = selectedCourses.includes(course);
                          return (
                            <motion.button
                              key={course}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleCourse(course)}
                              className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 text-xs font-bold transition-all ${
                                sel
                                  ? `${a.bg} ${a.border} ${a.text} shadow-sm`
                                  : "border-green-100 bg-white text-green-700 hover:border-green-300 hover:bg-green-50"
                              }`}
                            >
                              <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border-2 transition-all ${sel ? a.check : "border-green-300"}`}>
                                {sel && (
                                  <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </span>
                              {course}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          )}
          {step === 3 && (
            <motion.section
              key="ai-buddy"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="rounded-4xl border-2 border-green-200 bg-white/80 p-6 shadow-lg shadow-green-100/40 backdrop-blur-sm sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <motion.span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-lg" animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                  🎯
                </motion.span>
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-green-800 sm:text-2xl" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Pick Your Learning Format!
                  </h2>
                  <p className="text-xs text-green-500 font-medium">How do you like to learn best? 🌟</p>
                </div>
                {selectedFormat && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-green-500">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </motion.span>
                )}
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {aiFormats.map((f) => {
                  const sel = selectedFormat === f.id;
                  return (
                    <motion.button
                      key={f.id}
                      whileHover={{ scale: 1.04, y: -6 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedFormat(f.id)}
                      className={`group relative flex flex-col items-center gap-4 rounded-3xl border-3 p-6 text-center transition-all ${
                        sel
                          ? `${f.borderActive} bg-white shadow-xl ${f.shadowActive}`
                          : "border-green-200 bg-white hover:border-green-300 hover:shadow-lg hover:shadow-green-100/50"
                      }`}
                    >
                      {sel && (
                        <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 shadow-md">
                          <Sparkles className="h-4 w-4 text-white" />
                        </motion.div>
                      )}
                      <motion.div animate={sel ? { rotate: [0, -5, 5, 0] } : {}} transition={{ duration: 2, repeat: Infinity }} className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br ${f.gradient} text-4xl shadow-lg`}>
                        {f.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-extrabold text-green-800" style={{ fontFamily: "var(--font-fredoka)" }}>{f.name}</h3>
                      </div>
                      <p className="text-xs leading-relaxed text-green-600/60 font-medium">{f.description}</p>
                      <span className={`rounded-full border px-3.5 py-1.5 text-xs font-extrabold ${f.badge}`}>{f.style}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>
          )}
          {/* Navigation buttons */}
          <div className="mt-8 flex items-center justify-between">
            <motion.button
              whileHover={{ scale: step === 0 ? 1 : 1.05 }}
              whileTap={{ scale: step === 0 ? 1 : 0.95 }}
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-green-600 transition-all hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-30"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Back
            </motion.button>
            {step < 3 ? (
              <motion.button
                whileHover={{ scale: canContinue() ? 1.05 : 1, y: canContinue() ? -2 : 0 }}
                whileTap={{ scale: canContinue() ? 0.95 : 1 }}
                type="button"
                onClick={() => canContinue() && setStep((s) => s + 1)}
                disabled={!canContinue()}
                className="kids-submit-btn flex items-center gap-2 rounded-2xl px-8 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Continue
                <Rocket className="h-4 w-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: canContinue() ? 1.05 : 1, y: canContinue() ? -2 : 0 }}
                whileTap={{ scale: canContinue() ? 0.95 : 1 }}
                type="button"
                onClick={handleSubmit}
                disabled={!canContinue() || saving}
                className="kids-submit-btn flex items-center gap-2 rounded-2xl px-8 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    Launch My Dashboard 🚀
                    <Rocket className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
