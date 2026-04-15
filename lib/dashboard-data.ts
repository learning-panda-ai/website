import { cache } from "react";
import { requireAuth } from "./server-auth";
import { redirect } from "next/navigation";
import type { DashboardUser } from "@/types/dashboard";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function computeWeekActivity(streak: number): {
  weekActivity: boolean[];
  todayIndex: number;
} {
  const now = new Date();
  const dowUtc = now.getUTCDay(); // 0=Sun…6=Sat
  const todayIndex = dowUtc === 0 ? 6 : dowUtc - 1; // Mon=0…Sun=6
  const weekActivity = Array.from({ length: 7 }, (_, i) => {
    if (i > todayIndex) return false;
    return todayIndex - i < streak;
  });
  return { weekActivity, todayIndex };
}

export const getDashboardUser = cache(async (): Promise<DashboardUser> => {
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
  const meUser = (await meRes.json()) as DashboardUser;
  if (!meUser.is_onboarded) redirect("/login");

  return activityRes.ok ? ((await activityRes.json()) as DashboardUser) : meUser;
});

export const getQuestionsAsked = cache(async (): Promise<number> => {
  const token = await requireAuth();
  const sessionsRes = await fetch(`${BACKEND_URL}/api/v1/chat/sessions`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const sessions = sessionsRes.ok ? await sessionsRes.json() : [];
  return Array.isArray(sessions) ? sessions.length : 0;
});
