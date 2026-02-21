"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Session } from "next-auth";
import Navbar from "@/components/Navbar";
import type { Tab } from "@/components/dashboard/types";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { DesktopSidebar, MobileTabBar } from "@/components/dashboard/DashboardSidebar";
import CoursesTab from "@/components/dashboard/tabs/CoursesTab";
import ProgressTab from "@/components/dashboard/tabs/ProgressTab";
import ProfileTab from "@/components/dashboard/tabs/ProfileTab";
import AskTab from "@/components/dashboard/tabs/AskTab";

interface DashboardClientProps {
  session: Session;
  enrolledCourses: string[];
}

export default function DashboardClient({ session, enrolledCourses }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("courses");
  const user = session.user;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-nunito)" }}>
      <Navbar />

      <DashboardHeader user={user} enrolledCourses={enrolledCourses} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 items-start">
          <DesktopSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            enrolledCourses={enrolledCourses}
          />

          <main className="flex-1 min-w-0">
            <MobileTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

            <AnimatePresence mode="wait">
              {activeTab === "courses"  && <CoursesTab enrolledCourses={enrolledCourses} key="courses"  />}
              {activeTab === "progress" && <ProgressTab key="progress" />}
              {activeTab === "profile"  && <ProfileTab user={user} enrolledCourses={enrolledCourses} key="profile" />}
              {activeTab === "ask"      && <AskTab key="ask" />}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
