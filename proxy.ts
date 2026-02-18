import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  // Only run middleware on routes that require authentication
  matcher: ["/dashboard/:path*", "/settings/:path*", "/settings"],
};
