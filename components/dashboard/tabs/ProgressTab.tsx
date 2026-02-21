"use client";

import { motion } from "framer-motion";
import { tabAnim } from "../types";

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

export default function ProgressTab() {
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
