import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function PATCH(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("lp_access_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // Map frontend camelCase → backend snake_case
  const res = await fetch(`${BACKEND_URL}/api/v1/user/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      first_name: body.firstName ?? null,
      last_name: body.lastName ?? null,
      city: body.city ?? null,
      state: body.state ?? null,
      grade: body.grade ?? null,
      school_board: body.schoolBoard ?? null,
      parent_name: body.parentName ?? null,
      parent_mobile: body.parentMobile ?? null,
      parent_email: body.parentEmail ?? null,
      courses: body.courses ?? null,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return NextResponse.json(err, { status: res.status });
  }

  return NextResponse.json({ success: true });
}
