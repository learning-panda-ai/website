import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { firstName, lastName, city, state, grade, parentName, parentMobile, parentEmail } = body;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      firstName:    firstName    || null,
      lastName:     lastName     || null,
      city:         city         || null,
      state:        state        || null,
      grade:        grade        || null,
      parentName:   parentName   || null,
      parentMobile: parentMobile || null,
      parentEmail:  parentEmail  || null,
      // Keep the display name in sync
      ...(firstName && lastName
        ? { name: `${firstName} ${lastName}` }
        : firstName
        ? { name: firstName }
        : {}),
    },
  });

  return NextResponse.json({ success: true });
}
