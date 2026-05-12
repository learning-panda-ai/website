import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/seo";
import {
  websiteSchema,
  organizationSchema,
  softwareApplicationSchema,
  faqSchema,
  homeWebPageSchema,
} from "@/schemas/landingPage";
import { HomePageClient } from "./HomePageClient";

const site = getSiteUrl();

export const metadata: Metadata = {
  title: "Learning Panda — AI tutor for CBSE, ICSE & State boards (Class 1–12)",
  description:
    "Learning Panda is an AI study companion grounded in Indian school textbooks: CBSE, ICSE, Maharashtra, Karnataka, Tamil Nadu, and UP boards. Students get chapter-accurate explanations in text, voice, or video; adaptive quizzes; spaced repetition; and parent-friendly progress reports. Free tier available.",
  keywords: [
    // AI-native category (uncontested by Byju's / Vedantu / PW)
    "AI tutor India",
    "AI homework help app India",
    "NCERT AI tutor",
    "24/7 doubt solving app India",
    "AI study app India",
    "voice AI tutor India",
    // Board + class intent (high conversion)
    "CBSE AI tutor",
    "ICSE homework help app",
    "Class 10 CBSE AI tutor",
    "Class 12 board exam preparation app",
    "CBSE Class 10 maths help",
    "ICSE Class 9 science help",
    // State board long-tail (underserved by competitors)
    "Maharashtra board study app",
    "Karnataka board AI tutor",
    "UP board study app",
    "Tamil Nadu board study app",
    // Competitor displacement
    "affordable AI tutor India",
    "Byju's alternative India",
    "Vedantu alternative India",
    "PhysicsWallah alternative for school students",
    // Parent / school intent
    "parent progress report education app",
    "safe AI tutor for kids India",
  ],
  alternates: {
    canonical: `${site}/`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${site}/`,
    siteName: "Learning Panda",
    title: "Learning Panda — AI tutor aligned to CBSE, ICSE & State textbooks",
    description:
      "Chapter-accurate AI help for Indian K–12 students: text, voice, and video modes, adaptive quizzes, and gamified revision. Built for CBSE, ICSE, and major state boards.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Learning Panda — AI study companion for Indian school boards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Panda — AI tutor for CBSE, ICSE & State boards",
    description:
      "Textbook-grounded AI for Class 1–12: instant doubts, voice and video, quizzes, and streaks. Free to start.",
    images: ["/opengraph-image"],
    creator: "@LearningPandaAI",
    site: "@LearningPandaAI",
  },
};

const structuredData = [
  websiteSchema,
  organizationSchema,
  softwareApplicationSchema,
  faqSchema,
  homeWebPageSchema,
] as const;

export default function HomePage() {
  return (
    <>
      {structuredData.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HomePageClient />
    </>
  );
}
