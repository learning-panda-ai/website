import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      firstName: true,
      lastName: true,
      city: true,
      state: true,
      grade: true,
      parentName: true,
      parentMobile: true,
      parentEmail: true,
      courses: true,
      aiTutor: true,
      createdAt: true,
    },
  });

  if (!user) redirect("/login");

  return (
    <SettingsClient
      user={{
        ...user,
        createdAt: user.createdAt.toISOString(),
      }}
    />
  );
}
