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
  Zap,
  Clock,
} from "lucide-react";
import type { CourseInfo, Difficulty } from "@/lib/courseData";

interface CourseDetailClientProps {
  course: CourseInfo;
  user: { name: string | null; image: string | null };
}

const difficultyStyle: Record<
  Difficulty,
  { label: string; bg: string; text: string }
> = {
  Beginner:     { label: "Beginner",     bg: "bg-green-100", text: "text-green-700" },
  Intermediate: { label: "Intermediate", bg: "bg-amber-100",  text: "text-amber-700" },
  Advanced:     { label: "Advanced",     bg: "bg-red-100",   text: "text-red-600" },
};

export default function CourseDetailClient({
  course,
  user,
}: CourseDetailClientProps) {
  const firstName = user.name?.split(" ")[0] ?? "Learner";
  const totalLessons = course.topics.reduce((sum, t) => sum + t.lessons, 0);
  const difficulties = [...new Set(course.topics.map((t) => t.difficulty))];

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
              href="/courses"
              className="h-9 w-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-gray-500" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐼</span>
              <span
                className="text-lg font-extrabold text-green-700 hidden sm:block"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {course.name}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── Course Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${course.accent.bg} border-2 ${course.accent.border} rounded-3xl p-7 mb-8`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="h-20 w-20 bg-white rounded-2xl shadow-sm flex items-center justify-center text-4xl flex-shrink-0">
              {course.emoji}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${course.accent.badgeBg} ${course.accent.badgeText}`}
                >
                  {course.categoryEmoji} {course.category}
                </span>
                {difficulties.map((d) => (
                  <span
                    key={d}
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${difficultyStyle[d].bg} ${difficultyStyle[d].text}`}
                  >
                    {d}
                  </span>
                ))}
              </div>
              <h1
                className="text-2xl font-extrabold text-gray-800 mb-1"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {course.name}
              </h1>
              <p className="text-sm text-gray-500 max-w-xl">{course.description}</p>
            </div>

            {/* Stats */}
            <div className="flex sm:flex-col gap-4 sm:gap-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <BookOpen className="h-4 w-4 text-green-500" />
                <span>
                  <strong className="text-gray-800">{course.topics.length}</strong> topics
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4 text-green-500" />
                <span>
                  <strong className="text-gray-800">{totalLessons}</strong> lessons
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Topics List ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-4 flex items-center justify-between"
        >
          <h2
            className="text-lg font-extrabold text-gray-800"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Topics
          </h2>
          <span className="text-xs text-gray-400 font-medium">
            {course.topics.length} topics
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {course.topics.map((topic, i) => {
            const ds = difficultyStyle[topic.difficulty];
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-200 p-5 flex items-start gap-4 group cursor-pointer"
              >
                {/* Topic number */}
                <div
                  className={`flex-shrink-0 h-9 w-9 rounded-xl ${course.accent.bg} ${course.accent.text} flex items-center justify-center text-sm font-extrabold`}
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {i + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{topic.emoji}</span>
                      <h3
                        className="font-extrabold text-gray-800 text-sm leading-snug"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                      >
                        {topic.title}
                      </h3>
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${ds.bg} ${ds.text}`}
                    >
                      {ds.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">
                    {topic.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {topic.lessons} lessons
                    </span>
                    <button className="flex items-center gap-1 text-xs font-bold text-green-600 hover:text-green-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Zap className="h-3.5 w-3.5" />
                      Start
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
