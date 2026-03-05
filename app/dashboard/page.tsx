import type { Metadata } from "next";
import { requireAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const metadata: Metadata = {
  title: "My Dashboard",
  description: "Your personalised Learning Panda dashboard. Track progress, continue courses, and keep your learning streak alive.",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const token = await requireAuth();

  const [meRes, activityRes] = await Promise.all([
    fetch(`${BACKEND_URL}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
    fetch(`${BACKEND_URL}/api/v1/user/activity`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
  ]);

  if (!meRes.ok) redirect("/login");

  const meUser = await meRes.json();
  // Use activity response (has updated streak) if successful, otherwise fall back to /me
  const user = activityRes.ok ? await activityRes.json() : meUser;

  return <DashboardClient user={user} enrolledCourses={user.courses ?? []} />;
}
