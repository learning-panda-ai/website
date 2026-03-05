import type { Metadata } from "next";
import { requireAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import CoursesClient from "./CoursesClient";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const metadata: Metadata = {
  title: "My Courses",
  description: "Browse and continue your enrolled courses on Learning Panda.",
  robots: { index: false, follow: false },
};

export default async function CoursesPage() {
  const token = await requireAuth();

  const res = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) redirect("/login");

  const user = await res.json();

  return (
    <CoursesClient
      user={{ name: user.name, image: user.image, courses: user.courses ?? [] }}
    />
  );
}
