import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL ?? "http://localhost:3000";

/**
 * Returns false only when Origin is present AND does not match the frontend host.
 * Absent Origin = same-origin request (browsers omit it for same-origin fetch).
 * Cross-origin requests always include Origin, so mismatches are caught.
 */
function isForeignOrigin(origin: string | null): boolean {
  if (!origin) return false; // same-origin — allow
  try {
    const url = new URL(origin);
    const allowed = new URL(FRONTEND_URL);
    return url.hostname !== allowed.hostname;
  } catch {
    return true; // malformed origin — block
  }
}

/**
 * POST /api/auth/exchange-code
 *
 * Accepts a one-time code issued by the backend after magic-link or Google OAuth
 * authentication. Proxies the exchange to the backend, receives real tokens,
 * and sets them as httpOnly cookies — tokens never appear in any URL.
 */
export async function POST(req: NextRequest) {
  if (isForeignOrigin(req.headers.get("origin"))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { code } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Missing code" }, { status: 400 });
    }

    const backendRes = await fetch(`${BACKEND_URL}/api/v1/auth/exchange-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
      cache: "no-store",
    });

    if (!backendRes.ok) {
      const err = await backendRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.detail ?? "Invalid or expired sign-in link." },
        { status: backendRes.status }
      );
    }

    const data = await backendRes.json();
    const { access_token, refresh_token, user } = data;

    const isProd = process.env.NODE_ENV === "production";
    const res = NextResponse.json({ user });

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
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("[exchange-code]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
