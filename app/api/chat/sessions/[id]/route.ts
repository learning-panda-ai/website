import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("lp_access_token")?.value;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken();
  if (!token) return new Response("Unauthorized", { status: 401 });

  const { id } = await params;
  const res = await fetch(`${BACKEND_URL}/api/v1/chat/sessions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken();
  if (!token) return new Response("Unauthorized", { status: 401 });

  const { id } = await params;
  const res = await fetch(`${BACKEND_URL}/api/v1/chat/sessions/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  return new Response(null, { status: res.status });
}
