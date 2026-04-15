"use client";

import Link from "next/link";
import { ChevronLeft, Leaf } from "lucide-react";
import type { SettingsTab } from "./types";
import { SETTINGS_TABS } from "./types";

interface SidebarProps {
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;
  streak: number;
  questionsAsked: number;
}

function getLevelInfo(questionsAsked: number) {
  const xp = questionsAsked * 25;
  const level = Math.floor(xp / 500) + 1;
  const progress = ((xp % 500) / 500) * 100;
  return { level, progress };
}

export function DesktopSettingsSidebar({ activeTab, setActiveTab, streak, questionsAsked }: SidebarProps) {
  const { level, progress } = getLevelInfo(questionsAsked);

  return (
    <aside
      className="hidden md:flex flex-col w-64 py-8 px-6 gap-4 bg-[#F5F2EA] border-r border-[#43A047]/10 h-screen sticky top-0 z-40 shadow-[4px_0_16px_rgba(67,160,71,0.06)]"
      style={{ fontFamily: "var(--font-nunito)" }}
    >
      {/* Logo */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">🐼</span>
          <h1
            className="text-xl font-bold text-[#1B5E20]"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Learning Panda
          </h1>
        </div>
        <p className="text-[10px] text-[#44483D]/60 uppercase tracking-widest font-bold ml-1">
          Manage your sanctuary
        </p>
      </div>

      {/* Back to dashboard */}
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-sm font-semibold text-[#44483D] hover:text-[#43A047] transition-colors mb-2 -ml-1"
        style={{ fontFamily: "var(--font-fredoka)" }}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {SETTINGS_TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-[#43A047] font-bold bg-[#43A047]/10 border-r-4 border-[#43A047] rounded-r-none"
                  : "text-[#44483D] hover:bg-[#E8E4D9]/60"
              }`}
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-[#43A047]" : "text-[#75796C]"}`} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Streak badge */}
      {streak > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 flex items-center gap-2">
          <span className="text-lg">🔥</span>
          <div>
            <p className="text-xs font-bold text-amber-700">{streak} Day Streak!</p>
            <p className="text-[10px] text-amber-600/70">Keep it up!</p>
          </div>
        </div>
      )}

      {/* Level progress */}
      <div className="bg-[#43A047]/5 border border-[#43A047]/10 p-4 rounded-2xl">
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="h-4 w-4 text-[#43A047]" />
          <span className="text-xs font-bold text-[#1B5E20]">Lvl {level} Panda Explorer</span>
        </div>
        <div className="h-2 bg-[#CFD8DC]/50 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#43A047] rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
          {[25, 50, 75].map((pct) => (
            <div
              key={pct}
              className="absolute top-[-2px] w-0.5 h-3 bg-[#43A047]/20 rounded-full"
              style={{ left: `${pct}%` }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

export function MobileSettingsTabBar({ activeTab, setActiveTab }: Pick<SidebarProps, "activeTab" | "setActiveTab">) {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#FDFBF7]/90 backdrop-blur-xl rounded-t-[28px] border-t border-[#43A047]/5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      style={{ fontFamily: "var(--font-fredoka)" }}
    >
      {SETTINGS_TABS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center justify-center gap-1 transition-all ${
              isActive ? "text-[#43A047]" : "text-[#75796C]"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-bold leading-none">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
