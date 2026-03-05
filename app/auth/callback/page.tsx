"use client";

import { useEffect } from "react";

/**
 * Fallback page for /auth/callback — forwards any `code` param to the
 * server-side GET handler at /api/auth/callback which handles token exchange
 * and cookie setting atomically before redirecting to the final destination.
 *
 * New sign-in flows redirect directly to /api/auth/callback; this page exists
 * only for compatibility with any existing magic-link emails or bookmarks that
 * still point to /auth/callback.
 */
export default function AuthCallbackPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      // Forward to the server-side route handler which will exchange the code,
      // set httpOnly cookies, and redirect to dashboard or login.
      window.location.replace(`/api/auth/callback?code=${encodeURIComponent(code)}`);
    } else {
      window.location.replace("/login?error=missing_code");
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <p className="text-4xl mb-4">🐼</p>
        <p className="text-gray-500 font-medium">Signing you in…</p>
      </div>
    </div>
  );
}
