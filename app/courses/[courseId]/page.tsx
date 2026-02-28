import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/courseData";
import CourseDetailClient from "./CourseDetailClient";

interface Props {
  params: Promise<{ courseId: string }>;
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
