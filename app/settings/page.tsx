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

  const res = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) redirect("/login");

  const u = await res.json();

  // Map backend snake_case → camelCase expected by SettingsClient
  return (
    <SettingsClient
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
        aiTutor: null,
        createdAt: u.created_at,
      }}
    />
  );
}
