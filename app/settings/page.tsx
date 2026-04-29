import type { Metadata } from "next";
import { requireAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import SettingsClient from "./SettingsClient";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage your Learning Panda account settings, profile, and preferences.",
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const token = await requireAuth();

  const [meRes, sessionsRes] = await Promise.all([
    fetch(`${BACKEND_URL}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
    fetch(`${BACKEND_URL}/api/v1/chat/sessions`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
  ]);

  if (!meRes.ok) redirect("/login");

  const u = await meRes.json();
  const sessions = sessionsRes.ok ? await sessionsRes.json() : [];
  const questionsAsked = Array.isArray(sessions) ? sessions.length : 0;

  return (
    <SettingsClient
      questionsAsked={questionsAsked}
      user={{
        id: u.id,
        name: u.name,
        email: u.email,
        image: u.image,
        firstName: u.first_name,
        lastName: u.last_name,
        city: u.city,
        state: u.state,
        grade: u.grade,
        schoolBoard: u.school_board,
        parentName: u.parent_name,
        parentMobile: u.parent_mobile,
        parentEmail: u.parent_email,
        courses: u.courses ?? [],
        createdAt: u.created_at,
        current_streak: u.current_streak ?? 0,
      }}
    />
  );
}
