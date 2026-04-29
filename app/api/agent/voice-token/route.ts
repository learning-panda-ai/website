import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("lp_access_token")?.value;
  if (!token) return Response.json(null, { status: 401 });
  return Response.json({ token });
}
