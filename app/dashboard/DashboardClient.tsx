"use client";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import type { Session } from "next-auth";
import {
  BookOpen,
  Brain,
  TrendingUp,
  Clock,
  Star,
  Zap,
  LogOut,
  Settings,
  Bell,
} from "lucide-react";

const quickStats = [
  { label: "Study Streak", value: "7 days", icon: "🔥", color: "bg-orange-50 border-orange-100 text-orange-600" },
  { label: "Topics Learned", value: "24", icon: "📚", color: "bg-blue-50 border-blue-100 text-blue-600" },
  { label: "Questions Asked", value: "142", icon: "💬", color: "bg-purple-50 border-purple-100 text-purple-600" },
  { label: "Score Average", value: "88%", icon: "⭐", color: "bg-amber-50 border-amber-100 text-amber-600" },
];

const recentTopics = [
  { subject: "Mathematics", topic: "Quadratic Equations", progress: 75, emoji: "🔢" },
  { subject: "Science", topic: "Newton's Laws", progress: 90, emoji: "🧪" },
  { subject: "English", topic: "Essay Writing", progress: 60, emoji: "📖" },
];

const suggestedTopics = [
  { emoji: "📐", title: "Geometry Basics", subject: "Math", difficulty: "Medium" },
  { emoji: "⚗️", title: "Chemical Reactions", subject: "Chemistry", difficulty: "Hard" },
  { emoji: "🌍", title: "World War II", subject: "History", difficulty: "Easy" },
  { emoji: "💻", title: "Python Loops", subject: "Computing", difficulty: "Medium" },
];

interface DashboardClientProps {
  session: Session;
}

export default function DashboardClient({ session }: DashboardClientProps) {
  const user = session.user;
  const firstName = user?.name?.split(" ")[0] ?? "Learner";

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg, #F1F8E9 0%, #ffffff 50%)",
        fontFamily: "var(--font-nunito)",
      }}
    >
      {/* ── Top Nav ── */}
      <header className="bg-white border-b border-green-100 shadow-sm sticky top-0 z-40">
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

            {/* Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-100">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name ?? "User"}
                  className="h-8 w-8 rounded-full border-2 border-green-200"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center text-sm font-bold text-green-700">
                  {firstName[0]}
                </div>
              )}
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

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-8 mb-8 overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/10 -translate-y-10 translate-x-10" />
          <div className="absolute bottom-0 right-20 h-24 w-24 rounded-full bg-white/10 translate-y-6" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-green-100 text-sm font-semibold mb-1">{greeting} 👋</p>
              <h1
                className="text-2xl sm:text-3xl font-extrabold text-white mb-2"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Welcome back, {firstName}!
              </h1>
              <p className="text-green-100 text-sm max-w-xs">
                Ready to learn something amazing today? Panda is here to help!
              </p>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="h-20 w-20 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <span className="text-4xl">🐼</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
              className={`bg-white rounded-2xl border-2 ${stat.color.split(" ")[1]} p-5 flex items-center gap-4 shadow-sm`}
            >
              <div className={`h-11 w-11 rounded-xl ${stat.color.split(" ")[0]} flex items-center justify-center text-xl flex-shrink-0`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xl font-extrabold text-gray-800" style={{ fontFamily: "var(--font-fredoka)" }}>
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Progress */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2
                className="font-extrabold text-gray-800 text-lg"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Recent Topics
              </h2>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>

            <div className="space-y-4">
              {recentTopics.map((item) => (
                <div key={item.topic}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.emoji}</span>
                      <div>
                        <p className="text-sm font-bold text-gray-700">{item.topic}</p>
                        <p className="text-xs text-gray-400">{item.subject}</p>
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-green-600">{item.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Ask Panda CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-100 p-6 flex flex-col items-center text-center"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-16 w-16 bg-white rounded-2xl shadow-md border border-green-100 flex items-center justify-center text-3xl mb-4"
            >
              🐼
            </motion.div>
            <h3
              className="font-extrabold text-gray-800 text-lg mb-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Ask Panda Anything!
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              Stuck on a problem? Panda is ready to explain, solve, and guide you.
            </p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-md text-sm">
              <Zap className="h-4 w-4" />
              Start a Session
            </button>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-green-600 font-medium">
              <Clock className="h-3.5 w-3.5" />
              Available 24/7
            </div>
          </motion.div>
        </div>

        {/* Suggested Topics */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2
              className="font-extrabold text-gray-800 text-lg"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Suggested for You
            </h2>
            <Star className="h-5 w-5 text-amber-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {suggestedTopics.map((topic, i) => (
              <motion.button
                key={topic.title}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="text-left p-4 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all"
              >
                <span className="text-2xl block mb-2">{topic.emoji}</span>
                <p className="font-bold text-gray-700 text-sm mb-1">{topic.title}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{topic.subject}</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      topic.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : topic.difficulty === "Medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {topic.difficulty}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
