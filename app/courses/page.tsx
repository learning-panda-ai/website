import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CoursesClient from "./CoursesClient";

export default async function CoursesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, image: true, courses: true },
  });

  if (!user) redirect("/login");

  return (
    <CoursesClient
      user={{ name: user.name, image: user.image, courses: user.courses }}
    />
  );
}
