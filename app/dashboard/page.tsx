import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "My Dashboard",
  description: "Your personalised Learning Panda dashboard. Track progress, continue courses, and keep your learning streak alive.",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { courses: true },
  });

  return <DashboardClient session={session} enrolledCourses={dbUser?.courses ?? []} />;
}
