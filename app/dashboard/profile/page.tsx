import type { Metadata } from "next";
import { getDashboardUser, getQuestionsAsked } from "@/lib/dashboard-data";
import ProfileTab from "@/components/dashboard/tabs/ProfileTab";

export const metadata: Metadata = {
  title: "My Profile — Learning Panda",
};

export default async function ProfilePage() {
  const [user, questionsAsked] = await Promise.all([
    getDashboardUser(),
    getQuestionsAsked(),
  ]);

  return (
    <ProfileTab
      user={user}
      enrolledCourses={user.courses ?? []}
      questionsAsked={questionsAsked}
    />
  );
}
