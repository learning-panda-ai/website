"use client";

import Link from "next/link";
import { Flame, Star, ChevronRight } from "lucide-react";
import type { Tab } from "./types";
import type { DashboardUser } from "@/app/dashboard/DashboardClient";

const TAB_LABELS: Record<Tab, string> = {
  courses:    "Courses",
  progress:   "Progress",
  profile:    "Account",
  text:       "Ask Panda",
  video:      "Video Chat",
  audio:      "Voice Chat",
  quizzes:    "Gamify",
  challenges: "Challenges",
};

interface DashboardHeaderProps {
  user: DashboardUser;
  activeTab: Tab;
  questionsAsked: number;
}

export default function DashboardHeader({ user, activeTab, questionsAsked }: DashboardHeaderProps) {
  const firstName = user?.name?.split(" ")[0] ?? "Learner";
  const xp = questionsAsked * 25;

  return (
    <header className="sticky top-0 z-30 bg-[#FDFBF7]/80 backdrop-blur-xl px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#43A047]/5">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-[#44483D] font-medium">
        <span>Dashboard</span>
        <ChevronRight className="h-4 w-4 mx-1 opacity-40" />
        <span className="text-[#43A047] font-semibold">{TAB_LABELS[activeTab]}</span>
      </nav>

      {/* Right cluster */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Streak */}
        <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
          <Flame className="h-4 w-4 text-amber-500" fill="currentColor" />
          <span className="font-bold text-amber-700 text-sm">{user.current_streak} Days</span>
        </div>

        {/* XP */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#43A047]/10 px-3 py-1.5 rounded-full border border-[#43A047]/20">
          <Star className="h-4 w-4 text-[#43A047]" fill="currentColor" />
          <span className="font-bold text-[#43A047] text-sm">{xp.toLocaleString("en-US")} XP</span>
        </div>

        <div className="hidden sm:block h-7 w-px bg-[#CFD8DC]" />

        {/* User */}
        <div className="flex items-center gap-2.5">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none text-[#1B1C17]">{firstName}</p>
            <p className="text-[10px] text-[#44483D] font-semibold mt-0.5">Pro Student</p>
          </div>
          <Link
            href="/settings"
            className="w-9 h-9 rounded-full border-2 border-[#43A047]/30 bg-[#C8E6C9] flex items-center justify-center text-sm font-bold text-[#1B5E20] flex-shrink-0 hover:border-[#43A047] hover:scale-105 transition-all"
            title="Account Settings"
          >
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt={firstName} className="w-full h-full rounded-full object-cover" />
            ) : (
              firstName[0]
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
