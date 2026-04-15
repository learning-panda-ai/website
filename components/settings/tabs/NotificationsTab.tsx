"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { tabAnim } from "@/lib/animations/settings";

type Pref = "streak" | "weeklyReport" | "newFeatures" | "parentDigest" | "aiSuggestions";

const NOTIFICATION_ITEMS: { key: Pref; emoji: string; label: string; desc: string }[] = [
  {
    key: "streak",
    emoji: "🔥",
    label: "Streak Reminders",
    desc: "Get nudged before your daily streak expires so you never lose your progress.",
  },
  {
    key: "weeklyReport",
    emoji: "📊",
    label: "Weekly Progress Report",
    desc: "Receive a summary of everything you learned and achieved each week.",
  },
  {
    key: "newFeatures",
    emoji: "✨",
    label: "New Features & Updates",
    desc: "Be the first to know when Panda gets new powers — quizzes, games, and more.",
  },
  {
    key: "parentDigest",
    emoji: "👨‍👩‍👧",
    label: "Parent Digest",
    desc: "Send weekly learning highlights to your parent or guardian's email.",
  },
  {
    key: "aiSuggestions",
    emoji: "🤖",
    label: "AI Study Suggestions",
    desc: "Let Panda suggest what to study next based on your recent activity.",
  },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none ${
        checked ? "bg-[#43A047]" : "bg-[#E8E4D9]"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function NotificationsTab() {
  const [prefs, setPrefs] = useState<Record<Pref, boolean>>({
    streak:        true,
    weeklyReport:  true,
    newFeatures:   false,
    parentDigest:  true,
    aiSuggestions: true,
  });

  const toggle = (k: Pref) => (v: boolean) => setPrefs((p) => ({ ...p, [k]: v }));

  return (
    <motion.div key="notifications" {...tabAnim} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Left: toggles */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-[#43A047]/10 shadow-sm p-6 sm:p-8">
        <h3 className="font-bold text-[#1B5E20] text-xl mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
          Notification Preferences
        </h3>
        <p className="text-sm text-[#44483D]/60 mb-6">
          Choose how and when Panda reaches out to keep you on track.
        </p>
        <div className="divide-y divide-[#F5F2EA]">
          {NOTIFICATION_ITEMS.map((item) => (
            <div key={item.key} className="flex items-start justify-between gap-4 py-5">
              <div className="flex items-start gap-3 flex-1">
                <span className="text-xl mt-0.5">{item.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-[#1B1C17]" style={{ fontFamily: "var(--font-fredoka)" }}>
                    {item.label}
                  </p>
                  <p className="text-xs text-[#44483D]/60 mt-0.5">{item.desc}</p>
                </div>
              </div>
              <Toggle checked={prefs[item.key]} onChange={toggle(item.key)} />
            </div>
          ))}
        </div>
      </div>

      {/* Right: info panel */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        <div className="bg-[#43A047]/5 border border-[#43A047]/10 rounded-2xl p-5 flex gap-3">
          <span className="text-2xl">🐼</span>
          <div>
            <p className="text-sm font-bold text-[#1B5E20] mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
              Panda only nudges when it matters!
            </p>
            <p className="text-xs text-[#44483D]/60 leading-relaxed">
              We send at most one notification per day, and never during school hours. Your focus is our priority.
            </p>
          </div>
        </div>
        <div className="bg-[#F5F2EA] rounded-2xl p-5">
          <p className="text-xs font-bold text-[#75796C] uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
            Currently enabled
          </p>
          <div className="space-y-2">
            {NOTIFICATION_ITEMS.filter((item) => prefs[item.key]).map((item) => (
              <div key={item.key} className="flex items-center gap-2 text-sm text-[#44483D]">
                <span>{item.emoji}</span>
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
            {NOTIFICATION_ITEMS.filter((item) => prefs[item.key]).length === 0 && (
              <p className="text-xs text-[#75796C]">No notifications enabled.</p>
            )}
          </div>
        </div>
      </div>

    </motion.div>
  );
}
