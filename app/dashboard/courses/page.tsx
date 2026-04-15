import type { Metadata } from "next";
import { getDashboardUser } from "@/lib/dashboard-data";
import CoursesTab from "@/components/dashboard/tabs/CoursesTab";

export const metadata: Metadata = {
  title: "My Courses — Learning Panda",
};

export default async function CoursesPage() {
  const user = await getDashboardUser();
  const firstName = user?.name?.split(" ")[0] ?? "Explorer";

  return (
    <CoursesTab enrolledCourses={user.courses ?? []} firstName={firstName} />
  );
}
