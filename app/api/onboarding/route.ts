import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("lp_access_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // Map frontend camelCase → backend snake_case
  const res = await fetch(`${BACKEND_URL}/api/v1/user/onboarding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      first_name: body.firstName,
      last_name: body.lastName,
      city: body.city,
      state: body.state,
      parent_name: body.parentName,
      parent_mobile: body.parentMobile,
      parent_email: body.parentEmail,
      grade: body.grade,
      school_board: body.schoolBoard,
      courses: body.courses,
      favorite_subject: body.favoriteSubject,
      study_feeling: body.studyFeeling,
      career_thoughts: body.careerThoughts,
      strengths_interest: body.strengthsInterest,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return NextResponse.json(err, { status: res.status });
  }

  return NextResponse.json(await res.json());
}
