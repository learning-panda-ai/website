import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/** Decode the JWT payload without verifying the signature, just to read `exp`. */
function getTokenExpiry(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8")
    );
    return typeof decoded.exp === "number" ? decoded.exp : null;
  } catch {
    return null;
  }
}

/** Returns true if the token is missing or has already expired. */
function isExpired(token: string | undefined): boolean {
  if (!token) return true;
  const exp = getTokenExpiry(token);
  if (exp === null) return true;
  // Treat as expired if within 10 seconds of expiry to avoid race conditions
  return Date.now() >= (exp - 10) * 1000;
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("lp_access_token")?.value;

  if (!isExpired(accessToken)) {
    // Token exists and is not expired — let the request through as-is
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get("lp_refresh_token")?.value;
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const refreshRes = await fetch(`${BACKEND_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!refreshRes.ok) {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("lp_access_token");
      res.cookies.delete("lp_refresh_token");
      return res;
    }

    const data = await refreshRes.json();
    const isProd = process.env.NODE_ENV === "production";

    // Forward the new access token into the request headers so that server
    // components (requireAuth / cookies()) can read the refreshed value.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(
      "cookie",
      updateCookieHeader(request.headers.get("cookie") ?? "", {
        lp_access_token: data.access_token,
        lp_refresh_token: data.refresh_token,
      })
    );

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });

    // Also write new cookies to the browser.
    response.cookies.set("lp_access_token", data.access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });
    response.cookies.set("lp_refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

/** Replace or insert named cookies inside a Cookie header string. */
function updateCookieHeader(
  existing: string,
  updates: Record<string, string>
): string {
  const map = new Map<string, string>();
  for (const part of existing.split(";")) {
    const eqIdx = part.indexOf("=");
    if (eqIdx === -1) continue;
    const k = part.slice(0, eqIdx).trim();
    const v = part.slice(eqIdx + 1).trim();
    if (k) map.set(k, v);
  }
  for (const [k, v] of Object.entries(updates)) {
    map.set(k, v);
  }
  return Array.from(map.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");
}

export const config = {
  matcher: ["/dashboard/:path*", "/courses/:path*", "/settings/:path*"],
};
