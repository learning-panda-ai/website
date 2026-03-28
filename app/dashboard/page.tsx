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

  const [meRes, activityRes, sessionsRes] = await Promise.all([
    fetch(`${BACKEND_URL}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
    fetch(`${BACKEND_URL}/api/v1/user/activity`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
    fetch(`${BACKEND_URL}/api/v1/chat/sessions`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
  ]);

  if (!meRes.ok) redirect("/login");

  const meUser = await meRes.json();
  // Use activity response (has updated streak) if successful, otherwise fall back to /me
  const user = activityRes.ok ? await activityRes.json() : meUser;

  const sessions: { updated_at: string }[] = sessionsRes.ok ? await sessionsRes.json() : [];
  const questionsAsked: number = Array.isArray(sessions) ? sessions.length : 0;

  // Derive which days of the current week (Mon–Sun) are active based on the user's streak.
  // Streak = N means today + the previous N-1 days were all active.
  const now = new Date();
  const dowUtc = now.getUTCDay(); // 0=Sun … 6=Sat
  // Convert to Mon-based index: Mon=0 … Sun=6
  const todayIndex = dowUtc === 0 ? 6 : dowUtc - 1;
  const streak: number = user.current_streak ?? 0;

  const weekActivity: boolean[] = Array.from({ length: 7 }, (_, i) => {
    if (i > todayIndex) return false; // future day this week
    const daysAgo = todayIndex - i;
    return daysAgo < streak;
  });

  return <DashboardClient user={user} enrolledCourses={user.courses ?? []} questionsAsked={questionsAsked} weekActivity={weekActivity} todayIndex={todayIndex} />;
}
