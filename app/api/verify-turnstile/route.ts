import { NextRequest, NextResponse } from "next/server";

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ success: false, error: "Missing token" }, { status: 400 });
  }

  if (!TURNSTILE_SECRET_KEY) {
    console.error("TURNSTILE_SECRET_KEY is not set");
    return NextResponse.json({ success: false, error: "Server misconfiguration" }, { status: 500 });
  }

  const formData = new URLSearchParams();
  formData.set("secret", TURNSTILE_SECRET_KEY);
  formData.set("response", token);
  const ip = req.headers.get("CF-Connecting-IP") ?? req.headers.get("x-forwarded-for");
  if (ip) formData.set("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const data = await res.json();

  if (!data.success) {
    return NextResponse.json({ success: false, error: "Turnstile verification failed" }, { status: 403 });
  }

  return NextResponse.json({ success: true });
}
