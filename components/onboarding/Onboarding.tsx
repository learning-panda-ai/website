"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Loader2,
  CheckCircle2,
  School,
} from "lucide-react";
import BasicDetails from "@/components/onboarding/BasicDetails";
import type { BasicDetailsData, OnboardingOptions, OnboardingOption } from "@/types/onboarding";
import {
  CLASS_EMOJI, SUBJECT_EMOJI, SCHOOL_BOARDS,
  FAVORITE_SUBJECTS, STUDY_FEELINGS, CAREER_OPTIONS, STRENGTHS_OPTIONS,
  FLOATING_ITEMS,
} from "@/data/onboarding";

// "Class 10" → "class-10" for backend storage
function classLabelToId(label: string): string {
  return label.toLowerCase().replace(" ", "-");
}

/* ═══════════════════ COMPONENT ═══════════════════ */

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  // step 0: basic details | 1: grade | 2: subjects | 3: about you
  const [step, setStep] = useState(0);
  const [basicDetails, setBasicDetails] = useState<BasicDetailsData>({
    firstName: "",
    lastName: "",
    state: "",
    city: "",
    parentName: "",
    parentMobile: "",
    parentEmail: "",
  });
  const [options, setOptions] = useState<OnboardingOptions>({ classes: [], subjects_by_class: {} });
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  // selectedGrade stores the API label e.g. "Class 10"; converted to "class-10" on submit
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [favoriteSubject, setFavoriteSubject] = useState<string | null>(null);
  const [studyFeeling, setStudyFeeling] = useState<string | null>(null);
  const [careerThoughts, setCareerThoughts] = useState<string | null>(null);
  const [strengthsInterest, setStrengthsInterest] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/user/onboarding-options")
      .then((r) => (r.ok ? r.json() : { classes: [], subjects_by_class: {} }))
      .then((data: OnboardingOptions) => setOptions(data))
      .catch(() => setOptions({ classes: [], subjects_by_class: {} }))
      .finally(() => setOptionsLoading(false));
  }, []);

  // Re-fetch subjects filtered by board whenever the board changes
  useEffect(() => {
    if (!selectedBoard) return;
    setSubjectsLoading(true);
    fetch(`/api/user/onboarding-options?board=${encodeURIComponent(selectedBoard)}`)
      .then((r) => (r.ok ? r.json() : { classes: [], subjects_by_class: {} }))
      .then((data: OnboardingOptions) => {
        setOptions((prev) => ({ ...prev, subjects_by_class: data.subjects_by_class }));
        setSelectedCourses([]); // subjects changed, reset selection
      })
      .catch(() => {})
      .finally(() => setSubjectsLoading(false));
  }, [selectedBoard]);

  const availableSubjects = selectedGrade ? (options.subjects_by_class[selectedGrade] ?? []) : [];

  const toggleCourse = (c: string) =>
    setSelectedCourses((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const selectGrade = (label: string) => {
    setSelectedGrade(label);
    setSelectedCourses([]); // reset subjects when grade changes
  };

  const isBasicDetailsComplete = () => {
    const d = basicDetails;
    if (!d.firstName.trim() || !d.lastName.trim() || !d.state.trim() || !d.city.trim()) return false;
    if (!d.parentName.trim() || !d.parentMobile.trim() || !d.parentEmail.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.parentEmail)) return false;
    const phoneClean = d.parentMobile.replace(/[\s\-+()]/g, "");
    if (!/^\d{10}$/.test(phoneClean)) return false;
    return true;
  };

  const isAboutYouComplete = () =>
    favoriteSubject !== null &&
    studyFeeling !== null &&
    careerThoughts !== null &&
    strengthsInterest !== null;

  const canContinue = () => {
    if (step === 0) return isBasicDetailsComplete();
    if (step === 1) return selectedGrade !== null && selectedBoard !== null && !subjectsLoading;
    if (step === 2) return selectedCourses.length >= 1;
    if (step === 3) return isAboutYouComplete();
    return false;
  };

  const handleSubmit = async () => {
    if (!canContinue()) return;
    setSaving(true);
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...basicDetails,
          grade: selectedGrade ? classLabelToId(selectedGrade) : selectedGrade,
          schoolBoard: selectedBoard,
          courses: selectedCourses,
          favoriteSubject,
          studyFeeling,
          careerThoughts,
          strengthsInterest,
        }),
      });
      onComplete();
    } catch (err) {
      console.error("Failed to save onboarding data:", err);
    } finally {
      setSaving(false);
    }
  };


  const progressSteps = [
    { label: "Details",      done: isBasicDetailsComplete() },
    { label: "Grade & Board", done: selectedGrade !== null && selectedBoard !== null },
    { label: "Courses",      done: selectedCourses.length >= 1 },
    { label: "About You",    done: isAboutYouComplete() },
  ];

  return (
    <div
      className="relative min-h-screen bamboo-dots flex flex-col"
      style={{ background: "linear-gradient(180deg, #FFFDF7 0%, #F1F8E9 40%, #E8F5E9 100%)" }}
    >
      {FLOATING_ITEMS.map((f, i) => (
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

          {/* Progress pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 flex flex-wrap items-center justify-center gap-2"
          >
            {progressSteps.map(({ label, done }) => (
              <span
                key={label}
                className={`flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-xs font-bold transition-all ${
                  done
                    ? "border-green-400 bg-green-50 text-green-700"
                    : "border-green-200 bg-white text-green-400"
                }`}
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {done
                  ? <CheckCircle2 className="h-3.5 w-3.5" />
                  : <span className="h-3.5 w-3.5 rounded-full border-2 border-current inline-block" />}
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </header>

      {/* ──────── STEP SCREENS ──────── */}
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-3xl">

          {/* STEP 0 – Basic Details */}
          {step === 0 && (
            <BasicDetails data={basicDetails} onChange={setBasicDetails} />
          )}

          {/* STEP 1 – Grade + School Board */}
          {step === 1 && (
            <motion.section
              key="grade"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="rounded-4xl border-2 border-green-200 bg-white/80 p-6 shadow-lg shadow-green-100/40 backdrop-blur-sm sm:p-8"
            >
              {/* Grade header */}
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

              {/* Grade grid — only classes with ingested content */}
              <div className="mb-3 flex items-center gap-2">
                <School className="h-4 w-4 text-green-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-green-600" style={{ fontFamily: "var(--font-fredoka)" }}>Available Classes</span>
              </div>

              {optionsLoading ? (
                <div className="flex items-center justify-center py-12 gap-2 text-green-600">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm font-medium">Loading classes…</span>
                </div>
              ) : options.classes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
                  <span className="text-4xl">🏫</span>
                  <p className="text-sm font-bold text-gray-500">No classes available yet</p>
                  <p className="text-xs text-gray-400">Content is being added. Check back soon!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {options.classes.map((label) => {
                    const sel = selectedGrade === label;
                    return (
                      <motion.button
                        key={label}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => selectGrade(label)}
                        className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 px-3 py-4 text-center transition-all ${
                          sel
                            ? "border-green-400 bg-green-50 shadow-md shadow-green-200/50"
                            : "border-green-100 bg-white hover:border-green-300 hover:bg-green-50/50"
                        }`}
                      >
                        <span className="text-2xl">{CLASS_EMOJI[label] ?? "🎓"}</span>
                        <span className={`text-sm font-extrabold ${sel ? "text-green-700" : "text-green-600"}`} style={{ fontFamily: "var(--font-fredoka)" }}>{label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Board selection */}
              <div className="mt-8 border-t-2 border-green-100 pt-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-base">🏛️</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-green-600" style={{ fontFamily: "var(--font-fredoka)" }}>Which school board do you follow?</span>
                  {selectedBoard && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </motion.span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {SCHOOL_BOARDS.map((board) => {
                    const sel = selectedBoard === board.id;
                    return (
                      <motion.button
                        key={board.id}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedBoard(board.id)}
                        className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 px-3 py-4 text-center transition-all ${
                          sel
                            ? "border-blue-400 bg-blue-50 shadow-md shadow-blue-200/50"
                            : "border-green-100 bg-white hover:border-blue-200 hover:bg-blue-50/40"
                        }`}
                      >
                        <span className="text-2xl">{board.emoji}</span>
                        <span className={`text-sm font-extrabold ${sel ? "text-blue-700" : "text-green-600"}`} style={{ fontFamily: "var(--font-fredoka)" }}>{board.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

            </motion.section>
          )}

          {/* STEP 2 – Subjects */}
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
                    Which subjects do you need help with?
                  </h2>
                  <p className="text-xs text-green-500 font-medium">
                    {selectedGrade ? `Subjects available for ${selectedGrade}` : "Pick as many as you like 🎯"}
                  </p>
                </div>
                {selectedCourses.length > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 rounded-full border-2 border-green-300 bg-green-50 px-3 py-1 text-xs font-extrabold text-green-700">
                    ⭐ {selectedCourses.length} selected
                  </motion.span>
                )}
              </div>

              {subjectsLoading ? (
                <div className="flex items-center justify-center py-12 gap-2 text-green-600">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm font-medium">Loading subjects…</span>
                </div>
              ) : availableSubjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
                  <span className="text-4xl">📖</span>
                  <p className="text-sm font-bold text-gray-500">No subjects available for {selectedGrade}</p>
                  <p className="text-xs text-gray-400">Content for this class is coming soon!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {availableSubjects.map((subject) => {
                    const sel = selectedCourses.includes(subject);
                    return (
                      <motion.button
                        key={subject}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleCourse(subject)}
                        className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-4 py-4 text-center transition-all ${
                          sel
                            ? "border-green-400 bg-green-50 shadow-md shadow-green-200/50"
                            : "border-green-100 bg-white hover:border-green-300 hover:bg-green-50/50"
                        }`}
                      >
                        <span className="text-2xl">{SUBJECT_EMOJI[subject] ?? "📘"}</span>
                        <span className={`text-xs font-extrabold leading-tight ${sel ? "text-green-700" : "text-green-600"}`} style={{ fontFamily: "var(--font-fredoka)" }}>
                          {subject}
                        </span>
                        {sel && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.section>
          )}

          {/* STEP 3 – About You */}
          {step === 3 && (
            <motion.section
              key="about-you"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="rounded-4xl border-2 border-green-200 bg-white/80 p-6 shadow-lg shadow-green-100/40 backdrop-blur-sm sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <motion.span
                  className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-100 text-lg"
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🌟
                </motion.span>
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-green-800 sm:text-2xl" style={{ fontFamily: "var(--font-fredoka)" }}>
                    A little about you!
                  </h2>
                  <p className="text-xs text-green-500 font-medium">Help us personalise your learning journey 💫</p>
                </div>
                {isAboutYouComplete() && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-green-500">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </motion.span>
                )}
              </div>

              <div className="space-y-7">
                {/* Favourite subject */}
                <QuestionBlock
                  emoji="🏆"
                  question="Which subject do you like the MOST?"
                  options={FAVORITE_SUBJECTS}
                  value={favoriteSubject}
                  onChange={setFavoriteSubject}
                  cols={3}
                />

                {/* Study feeling */}
                <QuestionBlock
                  emoji="📖"
                  question="How do you feel about studies right now?"
                  options={STUDY_FEELINGS}
                  value={studyFeeling}
                  onChange={setStudyFeeling}
                  cols={2}
                />

                {/* Career thoughts */}
                <QuestionBlock
                  emoji="🔭"
                  question="Have you ever thought about your future career?"
                  options={CAREER_OPTIONS}
                  value={careerThoughts}
                  onChange={setCareerThoughts}
                  cols={2}
                />

                {/* Strengths interest */}
                <QuestionBlock
                  emoji="💪"
                  question="Are you interested in discovering your strengths and future skills?"
                  options={STRENGTHS_OPTIONS}
                  value={strengthsInterest}
                  onChange={setStrengthsInterest}
                  cols={3}
                />
              </div>
            </motion.section>
          )}

          {/* Navigation */}
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

/* ── Reusable question block for Step 3 ── */

function QuestionBlock({
  emoji,
  question,
  options,
  value,
  onChange,
  cols = 2,
}: {
  emoji: string;
  question: string;
  options: OnboardingOption[];
  value: string | null;
  onChange: (v: string) => void;
  cols?: number;
}) {
  const gridClass =
    cols === 3
      ? "grid-cols-2 sm:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">{emoji}</span>
        <p className="text-sm font-bold text-green-800" style={{ fontFamily: "var(--font-fredoka)" }}>
          {question}
        </p>
      </div>
      <div className={`grid ${gridClass} gap-2`}>
        {options.map((opt) => {
          const sel = value === opt.id;
          return (
            <motion.button
              key={opt.id}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(opt.id)}
              className={`flex items-center gap-2.5 rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                sel
                  ? "border-green-400 bg-green-50 shadow-md shadow-green-200/40"
                  : "border-green-100 bg-white hover:border-green-300 hover:bg-green-50/50"
              }`}
            >
              <span className="text-xl">{opt.emoji}</span>
              <span className={`text-xs font-bold ${sel ? "text-green-700" : "text-green-600"}`}>
                {opt.label}
              </span>
              {sel && <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-green-500" />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
