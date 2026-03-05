import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * POST /api/auth/refresh
 *
 * Proxies the token refresh flow to the backend.
 * The lp_refresh_token cookie is scoped to this path, so it is only sent here
 * and not with every browser request.
 */
export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("lp_refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  // Forward the refresh token as a cookie header — the backend only accepts
  // cookie-based tokens (JSON body is intentionally disabled to prevent
  // CSRF-style injection and mixed-mode auth confusion).
  const backendRes = await fetch(`${BACKEND_URL}/api/v1/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `lp_refresh_token=${refreshToken}`,
    },
    cache: "no-store",
  });

  if (!backendRes.ok) {
    // Clear stale cookies so the client redirects to login
    const res = NextResponse.json({ error: "Session expired" }, { status: 401 });
    res.cookies.delete("lp_access_token");
    res.cookies.set("lp_refresh_token", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/api/auth/refresh",
    });
    return res;
  }

  const data = await backendRes.json();
  const { access_token, refresh_token } = data;

  const isProd = process.env.NODE_ENV === "production";
  const res = NextResponse.json({ user: data.user });

  res.cookies.set("lp_access_token", access_token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/",
  });
  res.cookies.set("lp_refresh_token", refresh_token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/api/auth/refresh",
  });

  return res;
}
