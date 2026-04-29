import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("lp_access_token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await request.formData();

  const backendRes = await fetch(`${BACKEND_URL}/api/v1/agent/voice`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!backendRes.ok) {
    return new Response(await backendRes.text(), { status: backendRes.status });
  }

  return new Response(backendRes.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}
