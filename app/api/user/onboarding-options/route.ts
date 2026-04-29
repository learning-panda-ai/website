import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("lp_access_token")?.value;
  if (!token) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(request.url);
  const board = searchParams.get("board");

  const backendUrl = new URL(`${BACKEND_URL}/api/v1/user/onboarding-options`);
  if (board) backendUrl.searchParams.set("board", board);

  const res = await fetch(backendUrl.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
