import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("lp_access_token")?.value;
  if (!token) return new Response("Unauthorized", { status: 401 });

  const res = await fetch(`${BACKEND_URL}/api/v1/user/available-subjects`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
