import type { NextAuthConfig } from "next-auth";

export default {
  session: { strategy: "jwt" },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
