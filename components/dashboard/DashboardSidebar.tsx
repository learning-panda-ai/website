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
  );
}
