import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * GET /api/auth/callback?code={otc}
 *
 * Server-side handler for Google OAuth and magic-link authentication.
 *
 * The backend redirects the browser here with a one-time exchange code after
 * the user authenticates. This handler:
 *   1. Exchanges the code with the backend for real JWT tokens (server-to-server).
 *   2. Writes them as httpOnly cookies directly on the redirect response.
 *   3. Sends the browser to /dashboard (onboarded) or /login (needs onboarding).
 *
 * Running this server-side means no client-side JS is involved in the token
 * exchange — cookies are set atomically before the browser ever renders a page.
 */
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    console.error("[auth/callback] missing code param");
    return NextResponse.redirect(new URL("/login?error=missing_code", req.url));
  }

  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/v1/auth/exchange-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
      cache: "no-store",
    });

    if (!backendRes.ok) {
      const errText = await backendRes.text().catch(() => "");
      console.error("[auth/callback] exchange-code failed:", backendRes.status, errText);
      return NextResponse.redirect(new URL("/login?error=invalid_code", req.url));
    }

    const data = await backendRes.json();
    const { access_token, refresh_token, user } = data;

    if (!access_token || !refresh_token) {
      console.error("[auth/callback] tokens missing in backend response");
      return NextResponse.redirect(new URL("/login?error=token_error", req.url));
    }

    const isProd = process.env.NODE_ENV === "production";
    const destination = user?.is_onboarded ? "/dashboard" : "/login";

    const response = NextResponse.redirect(new URL(destination, req.url));

    // Set access token — sent with every request so middleware can validate it.
    response.cookies.set("lp_access_token", access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });

    // Set refresh token with path "/" so the middleware can read it on protected
    // routes (/dashboard, /courses, /settings) to silently refresh expired access tokens.
    response.cookies.set("lp_refresh_token", refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[auth/callback] unexpected error:", err);
    return NextResponse.redirect(new URL("/login?error=server_error", req.url));
  }
}
