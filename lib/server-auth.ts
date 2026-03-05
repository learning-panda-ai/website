import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Verify the access token cookie exists and return the token string,
 * or null if missing.
 */
export async function getAuthUser(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("lp_access_token")?.value;
  return token ?? null;
}

/**
 * Require authentication: returns the access token string for use in backend
 * API calls, or redirects to /login if the cookie is absent.
 * The backend is the single source of truth for signature verification.
 */
export async function requireAuth(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get("lp_access_token")?.value;
  if (!token) redirect("/login");
  return token;
}

/**
 * Require authentication AND an active account (is_active=true).
 * - No token           → redirect /login
 * - Any non-2xx        → redirect /login
 * - is_active=false    → redirect /suspended  (account not yet activated / payment pending)
 *
 * Returns [token, userData] so callers don't need a second /me fetch.
 */
export async function requireActiveAuth(): Promise<[string, Record<string, unknown>]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("lp_access_token")?.value;
  if (!token) redirect("/login");

  const res = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) redirect("/login");

  const user = await res.json();
  if (!user.is_active) redirect("/suspended");

  return [token, user];
}
