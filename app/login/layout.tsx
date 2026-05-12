import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/seo";

const site = getSiteUrl();

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to Learning Panda to access your AI tutor, courses, quizzes, and progress. New users can create a free account in seconds.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${site}/login`,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
