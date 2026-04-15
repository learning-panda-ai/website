"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Tab } from "@/components/dashboard/types";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { DesktopSidebar, MobileTabBar } from "@/components/dashboard/DashboardSidebar";
import DashboardRightPanel from "@/components/dashboard/DashboardRightPanel";
import CoursesTab from "@/components/dashboard/tabs/CoursesTab";
import ProgressTab from "@/components/dashboard/tabs/ProgressTab";
import ProfileTab from "@/components/dashboard/tabs/ProfileTab";
import AskTab from "@/components/dashboard/tabs/AskTab";
import LockedChatScreen from "@/components/dashboard/tabs/LockedChatScreen";
import ComingSoonTab from "@/components/dashboard/tabs/ComingSoonTab";

export type DashboardUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  is_onboarded: boolean;
  is_active: boolean;
  grade: string | null;
  current_streak: number;
  longest_streak: number;
};

interface DashboardClientProps {
  user: DashboardUser;
  enrolledCourses: string[];
  questionsAsked: number;
  weekActivity: boolean[];
  todayIndex: number;
}

const ASK_TABS = new Set<Tab>(["text", "video", "audio"]);

export default function DashboardClient({ user, enrolledCourses, questionsAsked, weekActivity, todayIndex }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("courses");
  const firstName = user?.name?.split(" ")[0] ?? "Explorer";
  const isAskMode = ASK_TABS.has(activeTab);

  return (
    <div
      className={`md:ml-64 flex flex-col ${isAskMode ? "h-dvh overflow-hidden" : "min-h-screen"}`}
      style={{ fontFamily: "var(--font-nunito)" }}
    >
      {/* Fixed left sidebar */}
      <DesktopSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        enrolledCourses={enrolledCourses}
      />

      {/* Sticky topbar */}
      <DashboardHeader user={user} activeTab={activeTab} questionsAsked={questionsAsked} />

      {/* ── Chat mode: full-height, no padding ── */}
      {isAskMode && (
        <div className="flex-1 min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {user.is_active ? (
              <AskTab
                key="ask"
                mode={activeTab as "text" | "video" | "audio"}
                grade={user.grade}
                enrolledCourses={enrolledCourses}
                currentStreak={user.current_streak}
                userName={firstName}
                userImage={user.image}
              />
            ) : (
              <LockedChatScreen key="locked" />
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ── Dashboard mode: grid with right panel ── */}
      {!isAskMode && (
        <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-6 p-5 lg:p-8 pb-28 md:pb-8">
          <div className="xl:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === "courses"    && <CoursesTab enrolledCourses={enrolledCourses} firstName={firstName} key="courses" />}
              {activeTab === "progress"   && <ProgressTab currentStreak={user.current_streak} longestStreak={user.longest_streak} questionsAsked={questionsAsked} weekActivity={weekActivity} todayIndex={todayIndex} key="progress" />}
              {activeTab === "profile"    && <ProfileTab user={user} enrolledCourses={enrolledCourses} questionsAsked={questionsAsked} key="profile" />}
              {activeTab === "quizzes"    && <ComingSoonTab key="quizzes"    label="Quizzes"    emoji="🎮" description="Test your knowledge with fun quizzes tailored to your courses and grade." />}
              {activeTab === "challenges" && <ComingSoonTab key="challenges" label="Challenges" emoji="⚡" description="Take on daily and weekly challenges to earn bonus points and rewards." />}
            </AnimatePresence>
          </div>
          <div className="xl:col-span-4">
            <DashboardRightPanel
              weekActivity={weekActivity}
              todayIndex={todayIndex}
              currentStreak={user.current_streak}
              setActiveTab={setActiveTab}
            />
          </div>
        </main>
      )}

      {/* Mobile bottom navigation */}
      <MobileTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
