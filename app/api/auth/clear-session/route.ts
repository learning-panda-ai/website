import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("lp_access_token");
  res.cookies.delete("lp_refresh_token");
  return res;
}
