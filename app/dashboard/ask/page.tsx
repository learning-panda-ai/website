import type { Metadata } from "next";
import { getDashboardUser } from "@/lib/dashboard-data";
import AskTab from "@/components/dashboard/tabs/AskTab";
import LockedChatScreen from "@/components/dashboard/tabs/LockedChatScreen";

export const metadata: Metadata = {
  title: "Ask Panda — Learning Panda",
};

export default async function AskPage() {
  const user = await getDashboardUser();
  const firstName = user?.name?.split(" ")[0] ?? "Explorer";

  if (!user.is_active) {
    return <LockedChatScreen />;
  }

  return (
    <AskTab
      mode="text"
      grade={user.grade}
      enrolledCourses={user.courses ?? []}
      currentStreak={user.current_streak}
      userName={firstName}
      userImage={user.image}
    />
  );
}
