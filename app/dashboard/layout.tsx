import type { Metadata } from "next";
import { getDashboardUser, getQuestionsAsked, computeWeekActivity } from "@/lib/dashboard-data";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, questionsAsked] = await Promise.all([
    getDashboardUser(),
    getQuestionsAsked(),
  ]);

  const { weekActivity, todayIndex } = computeWeekActivity(user.current_streak ?? 0);

  return (
    <DashboardShell
      user={user}
      enrolledCourses={user.courses ?? []}
      questionsAsked={questionsAsked}
      weekActivity={weekActivity}
      todayIndex={todayIndex}
    >
      {children}
    </DashboardShell>
  );
}
