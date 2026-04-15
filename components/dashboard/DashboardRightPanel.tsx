"use client";

import { useState } from "react";
import { BarChart2, Calendar, Send, Bot } from "lucide-react";
import type { Tab } from "./types";

interface DashboardRightPanelProps {
  weekActivity: boolean[];
  todayIndex: number;
  currentStreak: number;
  setActiveTab: (tab: Tab) => void;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DashboardRightPanel({
  weekActivity,
  todayIndex,
  currentStreak,
  setActiveTab,
}: DashboardRightPanelProps) {
  const [question, setQuestion] = useState("");

  // Deterministic bar heights — no Math.random() to avoid SSR/client mismatch
  const BASE_HEIGHTS = [55, 70, 85, 60, 75, 40, 90];
  const barHeights = DAYS.map((_, i) => {
    if (weekActivity[i]) return BASE_HEIGHTS[i];
    if (i === todayIndex) return 20;
    return 15;
  });

  function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    if (question.trim()) {
      setActiveTab("text");
    }
  }

  return (
    <div className="space-y-6">
      {/* Activity Pulse */}
      <div className="bg-[#F5F2EA] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h4
            className="text-lg font-bold text-[#1B1C17]"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Activity Pulse
          </h4>
          <BarChart2 className="h-5 w-5 text-[#43A047]" />
        </div>
        <div className="flex items-end justify-between h-28 gap-1.5 mb-3">
          {DAYS.map((day, i) => {
            const isActive = weekActivity[i];
            const isToday = i === todayIndex;
            const height = barHeights[i];
            return (
              <div
                key={day}
                className={`w-full rounded-t-lg transition-all ${
                  isToday
                    ? "bg-[#43A047]"
                    : isActive
                    ? "bg-[#43A047]/50"
                    : "bg-[#43A047]/20"
                }`}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
        <div className="flex justify-between">
          {DAYS.map((day, i) => (
            <span
              key={day}
              className={`text-[10px] font-bold uppercase tracking-tighter ${
                i === todayIndex ? "text-[#43A047]" : "text-[#75796C]"
              }`}
            >
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Up Next */}
      <div className="bg-[#C8E6C9] rounded-2xl p-5 relative overflow-hidden">
        <div className="relative z-10">
          <h4
            className="text-xl font-bold text-[#1B5E20] mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Up Next
          </h4>
          <div className="flex items-start gap-3 bg-white/50 p-4 rounded-xl backdrop-blur-sm">
            <div className="bg-[#43A047] text-white p-2 rounded-lg flex-shrink-0">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-[#1B5E20]">
                {currentStreak > 0
                  ? `Day ${currentStreak + 1} of your streak!`
                  : "Start your learning streak!"}
              </p>
              <p className="text-xs text-[#1B5E20]/70 font-semibold mt-0.5">
                Keep going — you&apos;re on a roll
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab("courses")}
            className="mt-5 w-full py-3 bg-[#FFB74D] text-[#2a1700] font-black rounded-full text-sm uppercase tracking-widest shadow-lg shadow-black/10 hover:scale-[1.02] active:scale-95 transition-transform"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Continue Learning
          </button>
        </div>
        {/* Decorative panda */}
        <div className="absolute -right-4 -bottom-4 opacity-10 scale-150 rotate-12 pointer-events-none text-7xl">
          🐼
        </div>
      </div>

      {/* Ask Panda shortcut */}
      <div className="bg-[#F0EDE4] rounded-2xl p-5 border border-[#43A047]/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
            <span className="text-xl">🐼</span>
          </div>
          <div>
            <h4
              className="font-bold text-[#1B1C17]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Stuck on a problem?
            </h4>
            <p className="text-xs text-[#44483D] font-medium">Ask Panda is here to help 24/7</p>
          </div>
        </div>
        <form onSubmit={handleAsk} className="relative">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            type="text"
            placeholder="Explain photosynthesis like I'm 5..."
            className="w-full bg-white border-none rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-[#43A047]/20 transition-all font-medium outline-none text-[#1B1C17] placeholder:text-[#75796C]"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#43A047] text-white rounded-lg hover:bg-[#388E3C] transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
