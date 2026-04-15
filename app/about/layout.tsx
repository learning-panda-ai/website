import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Learning Panda AI",
  description:
    "Learn about Learning Panda AI — our mission to make quality AI-powered education accessible to every student in India, from Class 1 to university.",
  robots: { index: true, follow: true },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
