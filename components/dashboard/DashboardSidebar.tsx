"use client";

import type { Tab } from "./types";
import { SIDEBAR_GROUPS, MOBILE_TABS } from "./types";

interface NavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  enrolledCourses: string[];
}

export function DesktopSidebar({ activeTab, setActiveTab, enrolledCourses }: NavProps) {
  return (
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
  );
}

export function MobileTabBar({
  activeTab,
  setActiveTab,
}: Omit<NavProps, "enrolledCourses">) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="flex">
        {MOBILE_TABS.map(({ id, label, emoji }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`relative flex-1 flex flex-col items-center gap-1 pt-3 pb-5 transition-colors ${
                isActive ? "text-green-600" : "text-gray-400"
              }`}
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-green-500 rounded-full" />
              )}
              <span className="text-xl leading-none">{emoji}</span>
              <span className={`text-[10px] font-bold leading-none ${isActive ? "text-green-600" : "text-gray-400"}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
