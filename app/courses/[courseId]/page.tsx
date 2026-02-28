import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/courseData";
import CourseDetailClient from "./CourseDetailClient";

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

  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, image: true, courses: true },
  });

  if (!user) redirect("/login");

  const course = getCourseBySlug(courseId);
  if (!course) notFound();

  // Only allow access if user is enrolled in this course
  if (!user.courses.includes(course.name)) notFound();

  return (
    <CourseDetailClient
      course={course}
      user={{ name: user.name, image: user.image }}
    />
  );
}
