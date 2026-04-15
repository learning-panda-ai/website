import type { Metadata } from "next";
import { getDashboardUser, getQuestionsAsked, computeWeekActivity } from "@/lib/dashboard-data";
import ProgressTab from "@/components/dashboard/tabs/ProgressTab";

export const metadata: Metadata = {
  title: "My Progress — Learning Panda",
};

export default async function ProgressPage() {
  const [user, questionsAsked] = await Promise.all([
    getDashboardUser(),
    getQuestionsAsked(),
  ]);

  const { weekActivity, todayIndex } = computeWeekActivity(user.current_streak ?? 0);

  return (
    <ProgressTab
      currentStreak={user.current_streak}
      longestStreak={user.longest_streak}
      questionsAsked={questionsAsked}
      weekActivity={weekActivity}
      todayIndex={todayIndex}
    />
  );
}
