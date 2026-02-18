import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ success: false, error: "Missing token" }, { status: 400 });
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not set");
    return NextResponse.json({ success: false, error: "Server misconfiguration" }, { status: 500 });
  }

  const formData = new URLSearchParams();
  formData.set("secret", secret);
  formData.set("response", token);
  // Optionally bind to the user's IP for stronger verification
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
