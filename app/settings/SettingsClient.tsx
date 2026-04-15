"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, LogOut } from "lucide-react";
import { useAuth } from "@/app/providers";
import type { SettingsTab, UserProp } from "@/types/settings";
import { DesktopSettingsSidebar, MobileSettingsTabBar } from "@/components/settings/SettingsSidebar";
import ProfileTab       from "@/components/settings/tabs/ProfileTab";
import NotificationsTab from "@/components/settings/tabs/NotificationsTab";
import SubscriptionTab  from "@/components/settings/tabs/SubscriptionTab";
import SecurityTab      from "@/components/settings/tabs/SecurityTab";

const TAB_LABELS: Record<SettingsTab, string> = {
  profile:       "My Profile",
  notifications: "Notifications",
  subscription:  "Subscription",
  security:      "Security",
};

const TAB_SUBTITLES: Record<SettingsTab, string> = {
  profile:       "Update your personal details and learning preferences.",
  notifications: "Choose how Panda keeps you in the loop.",
  subscription:  "Manage your plan and billing details.",
  security:      "Keep your account safe and your data private.",
};

export default function SettingsClient({ user, questionsAsked = 0 }: { user: UserProp; questionsAsked?: number }) {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const displayName = user.firstName
    ? `${user.firstName} ${user.lastName ?? ""}`.trim()
    : user.name ?? "Learner";

  const streak = user.current_streak ?? 0;

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#FDFBF7", fontFamily: "var(--font-nunito)" }}
    >
      {/* Fixed left sidebar */}
      <DesktopSettingsSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streak={streak}
        questionsAsked={questionsAsked}
      />

      {/* Main content */}
      <main className="flex-1 min-w-0 p-6 md:p-12 pb-28 md:pb-12">

        {/* Page header */}
        <header className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeTab + "-h"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-[#1B5E20] tracking-tight"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {TAB_LABELS[activeTab]}
              </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeTab + "-p"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="text-[#44483D]/70 mt-2 text-base sm:text-lg"
              >
                {TAB_SUBTITLES[activeTab]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Right badges */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {streak > 0 && (
              <div className="bg-amber-50 border border-amber-100 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                <Flame className="h-4 w-4 text-amber-500" fill="currentColor" />
                <span className="font-bold text-amber-700 text-sm">{streak} Day Streak</span>
              </div>
            )}
            <button
              onClick={logout}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#75796C] hover:text-red-500 transition-colors"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </header>

        {/* Tab content */}
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === "profile"       && <ProfileTab       user={user} key="profile"       />}
          {activeTab === "notifications" && <NotificationsTab             key="notifications" />}
          {activeTab === "subscription"  && <SubscriptionTab              key="subscription"  />}
          {activeTab === "security"      && <SecurityTab      user={user} key="security"      />}
        </AnimatePresence>

      </main>

      {/* Mobile bottom navigation */}
      <MobileSettingsTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
