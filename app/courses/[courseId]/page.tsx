import type { Metadata } from "next";
import { requireAuth } from "@/lib/server-auth";
import { redirect, notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/courseData";
import CourseDetailClient from "./CourseDetailClient";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Props {
  params: Promise<{ courseId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId } = await params;
  const course = getCourseBySlug(courseId);

  if (!course) {
    return {
      title: "Course Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${course.name} — ${course.category} Course`,
    description: course.description,
    robots: { index: false, follow: false },
    openGraph: {
      title: `${course.name} | Learning Panda`,
      description: course.description,
    },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { courseId } = await params;

  const token = await requireAuth();

  const res = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) redirect("/login");

  const user = await res.json();

  const course = getCourseBySlug(courseId);
  if (!course) notFound();

  if (!(user.courses ?? []).includes(course.name)) notFound();

  return (
    <CourseDetailClient
      course={course}
      user={{ name: user.name, image: user.image }}
    />
  );
}
