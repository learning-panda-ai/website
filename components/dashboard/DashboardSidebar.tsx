"use client";

import type { Tab } from "./types";
import { SIDEBAR_ITEMS, MOBILE_TABS } from "./types";

interface NavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  enrolledCourses: string[];
}

const COMING_SOON = new Set<Tab>(["quizzes", "challenges"]);

export function DesktopSidebar({ activeTab, setActiveTab, enrolledCourses }: NavProps) {
  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full py-8 w-64 bg-[#F5F2EA] border-r border-[#43A047]/10 z-40 shadow-[0_20px_25px_-5px_rgba(67,160,71,0.08),0_8px_10px_-6px_rgba(67,160,71,0.08)]">
      {/* Logo */}
      <div className="px-6 mb-10 flex items-center gap-3">
        <span className="text-3xl">🐼</span>
        <div className="flex flex-col">
          <span
            className="text-xl font-bold text-[#1B5E20]"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Learning Panda
          </span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#44483D] opacity-60">
            Digital Sanctuary
          </span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-4 space-y-1">
        {SIDEBAR_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          const isSoon = COMING_SOON.has(id);
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
              <span>{label}</span>
              {id === "courses" && enrolledCourses.length > 0 && (
                <span className="ml-auto text-[10px] bg-[#43A047]/15 text-[#43A047] font-bold px-2 py-0.5 rounded-full">
                  {enrolledCourses.length}
                </span>
              )}
              {isSoon && (
                <span className="ml-auto text-[9px] bg-amber-100 text-amber-600 font-bold px-1.5 py-0.5 rounded-full tracking-wide">
                  SOON
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Start Learning CTA */}
      <div className="px-6 mt-auto">
        <button
          onClick={() => setActiveTab("courses")}
          className="w-full bg-[#43A047] text-white py-4 rounded-full font-bold shadow-lg shadow-[#43A047]/20 hover:scale-[1.02] hover:bg-[#388E3C] active:scale-95 transition-all"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Start Learning
        </button>
      </div>
    </aside>
  );
}

export function MobileTabBar({ activeTab, setActiveTab }: Omit<NavProps, "enrolledCourses">) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#FDFBF7]/90 backdrop-blur-xl rounded-t-[28px] border-t border-[#43A047]/5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      {MOBILE_TABS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        const isCenter = id === "text";
        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center justify-center gap-1 transition-all ${
              isCenter
                ? `bg-[#43A047] text-white rounded-full p-2.5 w-12 h-12 -translate-y-2 shadow-lg shadow-[#43A047]/30 ${isActive ? "scale-110" : ""}`
                : isActive
                ? "text-[#43A047]"
                : "text-[#75796C]"
            }`}
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            <Icon className={`${isCenter ? "h-5 w-5" : "h-5 w-5"}`} />
            {!isCenter && (
              <span className={`text-[10px] font-bold leading-none ${isActive ? "text-[#43A047]" : "text-[#75796C]"}`}>
                {label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
