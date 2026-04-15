"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import type { DashboardUser } from "@/types/dashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { DesktopSidebar, MobileTabBar } from "@/components/dashboard/DashboardSidebar";
import DashboardRightPanel from "@/components/dashboard/DashboardRightPanel";

interface DashboardShellProps {
  user: DashboardUser;
  enrolledCourses: string[];
  questionsAsked: number;
  weekActivity: boolean[];
  todayIndex: number;
  children: React.ReactNode;
}

export default function DashboardShell({
  user,
  enrolledCourses,
  questionsAsked,
  weekActivity,
  todayIndex,
  children,
}: DashboardShellProps) {
  const pathname = usePathname();
  const isAskMode = pathname.startsWith("/dashboard/ask");

  return (
    <div
      className={`md:ml-64 flex flex-col ${isAskMode ? "h-dvh overflow-hidden" : "min-h-screen"}`}
      style={{ fontFamily: "var(--font-nunito)" }}
    >
      <DesktopSidebar enrolledCourses={enrolledCourses} />

      <DashboardHeader user={user} questionsAsked={questionsAsked} />

      {isAskMode ? (
        <div className="flex-1 min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </div>
      ) : (
        <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-6 p-5 lg:p-8 pb-28 md:pb-8">
          <div className="xl:col-span-8">
            <AnimatePresence mode="wait">{children}</AnimatePresence>
          </div>
          <div className="xl:col-span-4">
            <DashboardRightPanel
              weekActivity={weekActivity}
              todayIndex={todayIndex}
              currentStreak={user.current_streak}
            />
          </div>
        </main>
      )}

      <MobileTabBar />
    </div>
  );
}
