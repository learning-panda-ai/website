"use client";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { COURSE_CATALOG, getCourseByName } from "@/lib/courseData";

interface CoursesClientProps {
  user: {
    name: string | null;
    image: string | null;
    courses: string[];
  };
}

export default function CoursesClient({ user }: CoursesClientProps) {
  const firstName = user.name?.split(" ")[0] ?? "Learner";

  // Map enrolled course names to their catalog entries
  const enrolledCourses = user.courses
    .map((name) => getCourseByName(name))
    .filter(Boolean) as typeof COURSE_CATALOG;

  const difficultyColor = (d: string) =>
    d === "Beginner"
      ? "bg-green-100 text-green-700"
      : d === "Intermediate"
      ? "bg-amber-100 text-amber-700"
      : "bg-red-100 text-red-600";

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg, #F1F8E9 0%, #ffffff 50%)",
        fontFamily: "var(--font-nunito)",
      }}
    >
      {/* ── Header ── */}
      <header className="bg-white border-b border-green-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="h-9 w-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-gray-500" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐼</span>
              <span
                className="text-lg font-extrabold text-green-700"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                My Courses
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="h-9 w-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <Bell className="h-4 w-4 text-gray-500" />
            </button>
            <Link
              href="/settings"
              className="h-9 w-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <Settings className="h-4 w-4 text-gray-500" />
            </Link>
            <div className="flex items-center gap-2 pl-2 border-l border-gray-100">
              <div className="h-8 w-8 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center text-sm font-bold text-green-700">
                {firstName[0]}
              </div>
              <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                {user.name}
              </span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1
            className="text-2xl font-extrabold text-gray-800 mb-1"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {enrolledCourses.length > 0
              ? `Your ${enrolledCourses.length} Course${enrolledCourses.length > 1 ? "s" : ""}`
              : "No Courses Yet"}
          </h1>
          <p className="text-sm text-gray-500">
            {enrolledCourses.length > 0
              ? "Pick up where you left off or explore a new topic."
              : "Go to Settings to add courses to your learning plan."}
          </p>
        </motion.div>

        {enrolledCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="text-6xl mb-4">📚</div>
            <h2
              className="text-xl font-extrabold text-gray-700 mb-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              No courses enrolled
            </h2>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              You haven&apos;t picked any courses yet. Head to Settings to add subjects.
            </p>
            <Link
              href="/settings"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all"
            >
              Go to Settings
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrolledCourses.map((course, i) => {
              const topicCount = course.topics.length;
              const totalLessons = course.topics.reduce(
                (sum, t) => sum + t.lessons,
                0
              );
              const difficulties = [...new Set(course.topics.map((t) => t.difficulty))];

              return (
                <motion.div
                  key={course.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link href={`/courses/${course.slug}`} className="block group">
                    <div
                      className={`h-full bg-white rounded-2xl border-2 ${course.accent.border} hover:shadow-lg transition-all duration-200 overflow-hidden`}
                    >
                      {/* Card top banner */}
                      <div className={`${course.accent.bg} px-5 pt-5 pb-4`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="h-14 w-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl">
                            {course.emoji}
                          </div>
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full ${course.accent.badgeBg} ${course.accent.badgeText}`}
                          >
                            {course.categoryEmoji} {course.category}
                          </span>
                        </div>
                        <h2
                          className="font-extrabold text-gray-800 text-base leading-snug"
                          style={{ fontFamily: "var(--font-fredoka)" }}
                        >
                          {course.name}
                        </h2>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      {/* Card bottom stats */}
                      <div className="px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5" />
                            <span>
                              <strong className="text-gray-700">{topicCount}</strong> topics
                            </span>
                          </span>
                          <span>
                            <strong className="text-gray-700">{totalLessons}</strong> lessons
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-green-600 group-hover:text-green-700">
                          View
                          <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
