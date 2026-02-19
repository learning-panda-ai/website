"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import type { Session } from "next-auth";
import {
  BookOpen,
  LogOut,
  Settings,
  Bell,
  BarChart2,
  MessageCircle,
  Zap,
  Clock,
  Plus,
  Pencil,
  User,
  Star,
} from "lucide-react";
import { getCourseByName } from "@/lib/courseData";

// ── Types & constants ──────────────────────────────────────────────────────

type Tab = "courses" | "progress" | "profile" | "ask";

interface DashboardClientProps {
  session: Session;
  enrolledCourses: string[];
}

const SIDEBAR_GROUPS: {
  label: string;
  items: { id: Tab; label: string; Icon: React.ElementType }[];
}[] = [
  {
    label: "MY STUFF",
    items: [{ id: "courses", label: "Courses", Icon: BookOpen }],
  },
  {
    label: "MY ACCOUNT",
    items: [
      { id: "progress", label: "Progress",   Icon: BarChart2     },
      { id: "profile",  label: "Profile",    Icon: User          },
      { id: "ask",      label: "Ask Panda",  Icon: MessageCircle },
    ],
  },
];

const MOBILE_TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "courses",  label: "Courses",   emoji: "📚" },
  { id: "progress", label: "Progress",  emoji: "📊" },
  { id: "profile",  label: "Profile",   emoji: "👤" },
  { id: "ask",      label: "Ask Panda", emoji: "🐼" },
];

const tabAnim = {
  initial:    { opacity: 0, y: 10 },
  animate:    { opacity: 1, y: 0  },
  exit:       { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

// ── TAB: Courses ───────────────────────────────────────────────────────────

function CoursesTab({ enrolledCourses }: { enrolledCourses: string[] }) {
  const courses = enrolledCourses
    .map((name) => getCourseByName(name))
    .filter(Boolean) as NonNullable<ReturnType<typeof getCourseByName>>[];

  return (
    <motion.div key="courses" {...tabAnim}>
      {/* Heading row */}
      <div className="flex items-center justify-between mb-8">
        <h2
          className="text-2xl font-extrabold text-gray-800"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          My courses
        </h2>
        <Link
          href="/settings"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit Courses
        </Link>
      </div>

      {courses.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center text-4xl mb-4 border-2 border-green-100">
            📚
          </div>
          <p className="font-extrabold text-gray-700 mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
            No courses yet
          </p>
          <p className="text-sm text-gray-400 mb-6 max-w-xs">
            Add your first course to start your learning journey with Panda!
          </p>
          <Link
            href="/settings"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            <Plus className="h-4 w-4" />
            Add a course
          </Link>
        </div>
      ) : (
        <div className="flex gap-10 items-start">
          {/* Course list */}
          <div className="flex-1 min-w-0 space-y-8">
            {courses.map((course) => {
              const topicsToShow = course.topics.slice(0, 5);
              return (
                <div key={course.slug}>
                  {/* Course name row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{course.emoji}</span>
                      <h3
                        className="font-extrabold text-gray-800 text-base"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                      >
                        {course.name}
                      </h3>
                    </div>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="text-sm font-bold text-green-600 hover:text-green-700 transition-colors"
                    >
                      See all ({course.topics.length})
                    </Link>
                  </div>

                  {/* Topic path — vertical connected dots */}
                  <div className="relative">
                    {topicsToShow.map((topic, i) => {
                      const isFirst = i === 0;
                      const isLast  = i === topicsToShow.length - 1;
                      return (
                        <div key={topic.id} className="flex items-start gap-5">
                          {/* Dot + vertical line column */}
                          <div className="flex flex-col items-center flex-shrink-0" style={{ width: 36 }}>
                            {/* Circle */}
                            <div
                              className={`h-9 w-9 rounded-full border-2 flex items-center justify-center text-base z-10 flex-shrink-0 transition-all ${
                                isFirst
                                  ? "bg-green-500 border-green-600 text-white shadow-md"
                                  : "bg-white border-gray-200 text-gray-400"
                              }`}
                            >
                              {isFirst ? topic.emoji : <span className="text-xs font-bold">{i + 1}</span>}
                            </div>
                            {/* Connecting line */}
                            {!isLast && (
                              <div className="w-0.5 bg-gray-200 flex-1" style={{ minHeight: 28 }} />
                            )}
                          </div>

                          {/* Topic row content */}
                          <div
                            className={`flex items-center flex-1 min-w-0 ${!isLast ? "pb-7" : ""}`}
                          >
                            <button
                              className={`text-sm font-semibold text-left transition-colors ${
                                isFirst
                                  ? "text-green-700 hover:text-green-800"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              {topic.title}
                            </button>

                            {isFirst && (
                              <Link
                                href={`/courses/${course.slug}`}
                                className="ml-auto flex-shrink-0 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-all shadow-sm"
                                style={{ fontFamily: "var(--font-fredoka)" }}
                              >
                                Start
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Divider between courses */}
                  <div className="mt-6 border-b border-gray-100" />
                </div>
              );
            })}
          </div>

          {/* Add another course — right column */}
          <div className="hidden lg:flex flex-col items-center pt-14 flex-shrink-0">
            <Link href="/settings">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="h-14 w-14 rounded-full border-2 border-dashed border-gray-300 group-hover:border-green-400 flex items-center justify-center transition-colors bg-gray-50 group-hover:bg-green-50">
                  <Plus className="h-6 w-6 text-gray-400 group-hover:text-green-500 transition-colors" />
                </div>
                <span className="text-xs font-semibold text-gray-400 group-hover:text-green-600 text-center transition-colors leading-tight max-w-[80px]">
                  Add another course
                </span>
              </motion.div>
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── TAB: Progress ──────────────────────────────────────────────────────────

const PROGRESS_BARS = [
  { subject: "Mathematics", emoji: "📐", pct: 72, color: "bg-blue-500"   },
  { subject: "Science",     emoji: "🔬", pct: 55, color: "bg-purple-500" },
  { subject: "History",     emoji: "🌍", pct: 88, color: "bg-amber-500"  },
  { subject: "Computing",   emoji: "💻", pct: 40, color: "bg-cyan-500"   },
];

const STATS = [
  { label: "Study Streak",    value: "7 days", icon: "🔥", bg: "bg-orange-50", text: "text-orange-600" },
  { label: "Topics Learned",  value: "24",     icon: "📚", bg: "bg-blue-50",   text: "text-blue-600"   },
  { label: "Questions Asked", value: "142",    icon: "💬", bg: "bg-purple-50", text: "text-purple-600" },
  { label: "Score Average",   value: "88%",    icon: "⭐", bg: "bg-amber-50",  text: "text-amber-600"  },
];

function ProgressTab() {
  return (
    <motion.div key="progress" {...tabAnim} className="space-y-6">
      <h2 className="text-2xl font-extrabold text-gray-800" style={{ fontFamily: "var(--font-fredoka)" }}>
        Progress
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-2xl p-5 flex items-center gap-4`}>
            <span className="text-2xl">{stat.icon}</span>
            <div>
              <p className={`font-extrabold text-xl ${stat.text}`} style={{ fontFamily: "var(--font-fredoka)" }}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-extrabold text-gray-800 mb-5" style={{ fontFamily: "var(--font-fredoka)" }}>
          Subject Progress
        </h3>
        <div className="space-y-5">
          {PROGRESS_BARS.map((item) => (
            <div key={item.subject}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-sm font-bold text-gray-700">{item.subject}</span>
                </div>
                <span className="text-sm font-extrabold text-gray-600" style={{ fontFamily: "var(--font-fredoka)" }}>
                  {item.pct}%
                </span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className={`h-full rounded-full ${item.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-extrabold text-gray-800 mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
          This Week&apos;s Activity
        </h3>
        <p className="text-xs text-gray-400 mb-4">Keep the streak going!</p>
        <div className="flex gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className={`w-full rounded-xl h-10 flex items-center justify-center text-sm font-bold ${
                  i < 5 ? "bg-green-100 text-green-600" : "bg-gray-50 text-gray-300"
                }`}
              >
                {i < 5 ? "✓" : "·"}
              </div>
              <span className="text-xs text-gray-400">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── TAB: Profile ───────────────────────────────────────────────────────────

function ProfileTab({
  user,
  enrolledCourses,
}: {
  user: Session["user"];
  enrolledCourses: string[];
}) {
  const firstName = user?.name?.split(" ")[0] ?? "Learner";

  return (
    <motion.div key="profile" {...tabAnim} className="space-y-6">
      <h2 className="text-2xl font-extrabold text-gray-800" style={{ fontFamily: "var(--font-fredoka)" }}>
        Profile
      </h2>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-5">
        <div className="h-20 w-20 rounded-2xl bg-green-100 border-2 border-green-200 flex items-center justify-center text-3xl font-bold text-green-700 flex-shrink-0">
          {firstName[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-extrabold text-gray-800 text-lg" style={{ fontFamily: "var(--font-fredoka)" }}>
            {user?.name}
          </p>
          <p className="text-sm text-gray-400 mt-0.5 truncate">{user?.email}</p>
          <p className="text-xs text-gray-300 mt-1">Profile photo synced from Google</p>
        </div>
        <Link
          href="/settings"
          className="flex items-center gap-2 text-sm font-bold text-gray-600 border border-gray-200 hover:border-green-300 hover:text-green-700 px-4 py-2 rounded-xl transition-all flex-shrink-0"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit Profile
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-extrabold text-gray-700 mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
          Learning Summary
        </h3>
        <div className="space-y-3">
          {[
            { label: "Enrolled Courses", value: `${enrolledCourses.length} courses` },
            { label: "Study Streak",     value: "7 days 🔥" },
            { label: "Topics Learned",   value: "24 📚" },
            { label: "Questions Asked",  value: "142 💬" },
            { label: "Score Average",    value: "88% ⭐" },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0"
            >
              <span className="text-gray-500">{row.label}</span>
              <span className="font-bold text-gray-700">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── TAB: Ask Panda ─────────────────────────────────────────────────────────

function AskTab() {
  return (
    <motion.div key="ask" {...tabAnim} className="space-y-6">
      <h2 className="text-2xl font-extrabold text-gray-800" style={{ fontFamily: "var(--font-fredoka)" }}>
        Ask Panda
      </h2>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-100 p-10 flex flex-col items-center text-center">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-20 w-20 bg-white rounded-2xl shadow-md border border-green-100 flex items-center justify-center text-4xl mb-5"
        >
          🐼
        </motion.div>
        <h3
          className="font-extrabold text-gray-800 text-2xl mb-2"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Ask Panda Anything!
        </h3>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">
          Stuck on a problem? Panda is ready to explain, solve, and guide you through any topic.
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all hover:shadow-md text-sm">
          <Zap className="h-4 w-4" />
          Start a Session
        </button>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-green-600 font-medium">
          <Clock className="h-3.5 w-3.5" />
          Available 24/7
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-extrabold text-gray-800 mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
          Recent Sessions
        </h3>
        <div className="flex flex-col items-center py-8 text-center">
          <span className="text-3xl mb-3">💬</span>
          <p className="text-sm font-bold text-gray-500 mb-1">No sessions yet</p>
          <p className="text-xs text-gray-400">Start a conversation to see your history here.</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────

export default function DashboardClient({ session, enrolledCourses }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("courses");

  const user      = session.user;
  const firstName = user?.name?.split(" ")[0] ?? "Learner";

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "var(--font-nunito)" }}
    >
      {/* ── Streak banner ── */}
      <div
        className="bg-gradient-to-r from-green-600 to-emerald-500 text-white"
        style={{ fontFamily: "var(--font-fredoka)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold truncate">
            🐼 Start leveling up and building your weekly streak!
          </p>
          <div className="flex items-center gap-5 flex-shrink-0">
            <div className="flex items-center gap-1.5 text-sm font-bold">
              🔥 <span>0</span>
              <span className="font-normal text-green-100 hidden sm:inline">week streak</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="font-bold">Level 1</span>
              <div className="w-20 h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full w-0 bg-white rounded-full" />
              </div>
              <span className="text-green-100 text-xs">0 / 1 skill</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Top nav ── */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐼</span>
            <span
              className="text-lg font-extrabold text-green-700"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Learning Panda
            </span>
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
                {user?.name}
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

      {/* ── Profile section ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4 flex-wrap">
          {/* Avatar + name */}
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-green-100 border-2 border-green-200 flex items-center justify-center text-2xl font-bold text-green-700 flex-shrink-0">
              {firstName[0]}
            </div>
            <div>
              <p
                className="font-extrabold text-gray-800 text-base leading-tight"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {user?.name}
              </p>
              <p className="text-sm text-gray-400 mt-0.5">{user?.email}</p>
            </div>
          </div>

          {/* Badges + Edit */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="hidden sm:flex items-center gap-2">
              {enrolledCourses.length > 0 && (
                <span className="text-xs font-bold bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full">
                  📚 {enrolledCourses.length} {enrolledCourses.length === 1 ? "course" : "courses"}
                </span>
              )}
              <span className="text-xs font-bold bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1 rounded-full">
                🔥 7 streak
              </span>
              <span className="text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full">
                <Star className="h-3 w-3 inline mr-0.5" />88% avg
              </span>
            </div>
            <Link
              href="/settings"
              className="text-sm font-bold text-gray-600 border border-gray-200 hover:border-green-400 hover:text-green-700 bg-white px-4 py-2 rounded-xl transition-all"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 items-start">

          {/* ── Sidebar (desktop) ── */}
          <aside className="hidden lg:block w-52 shrink-0 sticky top-24">
            <div className="space-y-6">
              {SIDEBAR_GROUPS.map((group) => (
                <div key={group.label}>
                  <p
                    className="text-xs font-extrabold text-gray-400 tracking-widest mb-2 px-2"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {group.label}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map(({ id, label, Icon }) => (
                      <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          activeTab === id
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                        }`}
                        style={{ fontFamily: "var(--font-fredoka)" }}
                      >
                        <Icon
                          className={`h-4 w-4 flex-shrink-0 ${
                            activeTab === id ? "text-green-500" : "text-gray-400"
                          }`}
                        />
                        {label}
                        {id === "courses" && enrolledCourses.length > 0 && (
                          <span className="ml-auto text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                            {enrolledCourses.length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* ── Content ── */}
          <main className="flex-1 min-w-0">
            {/* Mobile tab pills */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
              {MOBILE_TABS.map(({ id, label, emoji }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                    activeTab === id
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-500 hover:border-green-200"
                  }`}
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  <span>{emoji}</span>
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === "courses"  && <CoursesTab  enrolledCourses={enrolledCourses} key="courses"  />}
              {activeTab === "progress" && <ProgressTab key="progress" />}
              {activeTab === "profile"  && <ProfileTab  user={user} enrolledCourses={enrolledCourses} key="profile" />}
              {activeTab === "ask"      && <AskTab      key="ask"     />}
            </AnimatePresence>
          </main>

        </div>
      </div>
    </div>
  );
}
