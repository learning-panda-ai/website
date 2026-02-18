import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      firstName, lastName, city, state,
      parentName, parentMobile, parentEmail,
      grade, courses, aiTutor,
    } = await request.json();

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        firstName,
        lastName,
        city,
        state,
        parentName,
        parentMobile,
        parentEmail,
        grade,
        courses,
        aiTutor,
        onboarded: true,
      },
    });

    return NextResponse.json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        grade: user.grade,
        courses: user.courses,
        aiTutor: user.aiTutor,
        onboarded: user.onboarded,
      },
    });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
