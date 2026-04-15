"use client";

import { motion } from "framer-motion";
import { tabAnim } from "@/lib/animations/dashboard";


interface ProgressTabProps {
  currentStreak: number;
  longestStreak: number;
  questionsAsked: number;
  weekActivity: boolean[];
  todayIndex: number; // 0=Mon … 6=Sun
}

export default function ProgressTab({ currentStreak, longestStreak, questionsAsked, weekActivity, todayIndex }: ProgressTabProps) {
  const activeThisWeek = weekActivity.filter(Boolean).length;
  const STATS = [
    { label: "Study Streak",    value: `${currentStreak} ${currentStreak === 1 ? "day" : "days"}`, icon: "🔥", bg: "bg-orange-50", text: "text-orange-600" },
    { label: "Best Streak",     value: `${longestStreak} ${longestStreak === 1 ? "day" : "days"}`, icon: "🏆", bg: "bg-blue-50",   text: "text-blue-600"   },
    { label: "Questions Asked", value: `${questionsAsked}`,                                         icon: "💬", bg: "bg-purple-50", text: "text-purple-600" },
    { label: "Active This Week", value: `${activeThisWeek} / 7 days`,                               icon: "📅", bg: "bg-green-50",  text: "text-green-600"  },
  ];

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
        <h3 className="font-extrabold text-gray-800 mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
          This Week&apos;s Activity
        </h3>
        <p className="text-xs text-gray-400 mb-4">Keep the streak going!</p>
        <div className="flex gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
            const active = weekActivity[i] ?? false;
            const isToday = i === todayIndex;
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className={`w-full rounded-xl h-10 flex items-center justify-center text-sm font-bold ${
                    active
                      ? "bg-green-100 text-green-600"
                      : isToday
                      ? "bg-orange-50 text-orange-400 ring-2 ring-orange-300"
                      : "bg-gray-50 text-gray-300"
                  }`}
                >
                  {active ? "✓" : "·"}
                </div>
                <span className={`text-xs ${isToday ? "text-orange-500 font-bold" : "text-gray-400"}`}>{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
