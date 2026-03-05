import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("lp_access_token")?.value;
}

export async function GET() {
  const token = await getToken();
  if (!token) return new Response("Unauthorized", { status: 401 });

  const res = await fetch(`${BACKEND_URL}/api/v1/chat/sessions`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const token = await getToken();
  if (!token) return new Response("Unauthorized", { status: 401 });

  const body = await request.json();
  const res = await fetch(`${BACKEND_URL}/api/v1/chat/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
