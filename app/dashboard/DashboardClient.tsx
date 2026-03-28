"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import type { Tab } from "@/components/dashboard/types";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { DesktopSidebar, MobileTabBar } from "@/components/dashboard/DashboardSidebar";
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
  todayIndex: number; // 0=Mon … 6=Sun
}

export default function DashboardClient({ user, enrolledCourses, questionsAsked, weekActivity, todayIndex }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("courses");

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-nunito)" }}>
      <Navbar user={user} />

      <DashboardHeader user={user} enrolledCourses={enrolledCourses} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-24 lg:py-8 lg:pb-8">
        <div className="flex gap-8 items-start">
          <DesktopSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            enrolledCourses={enrolledCourses}
          />

          <main className="flex-1 min-w-0">
            <MobileTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

            <AnimatePresence mode="wait">
              {activeTab === "courses"  && <CoursesTab enrolledCourses={enrolledCourses} key="courses" />}
              {activeTab === "progress" && <ProgressTab currentStreak={user.current_streak} longestStreak={user.longest_streak} questionsAsked={questionsAsked} weekActivity={weekActivity} todayIndex={todayIndex} key="progress" />}
              {activeTab === "profile"  && <ProfileTab user={user} enrolledCourses={enrolledCourses} questionsAsked={questionsAsked} key="profile" />}
              {activeTab === "text"     && (user.is_active ? <AskTab key="text"  mode="text"  grade={user.grade} enrolledCourses={enrolledCourses} /> : <LockedChatScreen key="locked-text" />)}
              {activeTab === "video"    && (user.is_active ? <AskTab key="video" mode="video" grade={user.grade} enrolledCourses={enrolledCourses} /> : <LockedChatScreen key="locked-video" />)}
              {activeTab === "audio"       && (user.is_active ? <AskTab key="audio" mode="audio" grade={user.grade} enrolledCourses={enrolledCourses} /> : <LockedChatScreen key="locked-audio" />)}
              {activeTab === "quizzes"     && <ComingSoonTab key="quizzes"     label="Quizzes"     emoji="🎮" description="Test your knowledge with fun quizzes tailored to your courses and grade." />}
              {activeTab === "challenges"  && <ComingSoonTab key="challenges"  label="Challenges"  emoji="⚡" description="Take on daily and weekly challenges to earn bonus points and rewards." />}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
