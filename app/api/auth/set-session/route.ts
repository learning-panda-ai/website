import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/** Block only when Origin is present AND doesn't match our domain. */
function isForeignOrigin(origin: string | null): boolean {
  if (!origin) return false; // same-origin request — allow
  try {
    const url = new URL(origin);
    const allowed = new URL(BASE_URL!);
    return url.hostname !== allowed.hostname;
  } catch {
    return true;
  }
}

export async function POST(req: NextRequest) {
  // Reject requests from foreign origins — prevents CSRF token-injection
  if (isForeignOrigin(req.headers.get("origin"))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { access_token, refresh_token } = await req.json();

    if (!access_token || !refresh_token) {
      return NextResponse.json({ error: "Missing tokens" }, { status: 400 });
    }

    // Verify token is valid by fetching user from backend
    const meRes = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!meRes.ok) {
      return NextResponse.json({ error: "Invalid access token" }, { status: 401 });
    }

    const user = await meRes.json();

    const isProd = process.env.NODE_ENV === "production";
    const res = NextResponse.json({ user });

    res.cookies.set("lp_access_token", access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });
    // Scope refresh token to the refresh proxy only — prevents it from being
    // sent with every browser request and reduces the theft surface.
    res.cookies.set("lp_refresh_token", refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/api/auth/refresh",
    });

    return res;
  } catch (err) {
    console.error("[set-session]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
