import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("lp_access_token")?.value;

  if (!token) {
    return NextResponse.json(null, { status: 401 });
  }

  const res = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(null, { status: 401 });
  }

  return NextResponse.json(await res.json());
}
