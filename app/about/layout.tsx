import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/seo";

const site = getSiteUrl();

export const metadata: Metadata = {
  title: "About Learning Panda — India's AI Tutor for CBSE, ICSE & State Boards",
  description:
    "Learn how Learning Panda is making affordable, textbook-grounded AI tutoring available to every Indian school student (Class 1–12) across CBSE, ICSE, and all state boards. Read our mission, story, and company contacts.",
  keywords: [
    "Learning Panda AI company",
    "about Learning Panda",
    "CBSE ICSE AI education India",
    "textbook aligned AI tutoring startup India",
    "affordable AI tutor India mission",
    "Indian edtech AI startup 2025",
  ],
  alternates: {
    canonical: `${site}/about`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${site}/about`,
    siteName: "Learning Panda",
    title: "About Learning Panda — AI tutor grounded in Indian textbooks",
    description:
      "Our mission: affordable, syllabus-accurate AI help for every Indian student, with safe, board-aligned answers and tools for parents and schools.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "About Learning Panda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Learning Panda",
    description:
      "India-first AI study companion: CBSE, ICSE, and state boards, built for students, parents, and schools.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site },
        { "@type": "ListItem", position: 2, name: "About", item: `${site}/about` },
      ],
    },
    {
      "@type": "AboutPage",
      "@id": `${site}/about#webpage`,
      url: `${site}/about`,
      name: "About Learning Panda",
      description:
        "Company story and mission for Learning Panda, an educational AI product for Indian K–12 boards.",
      about: {
        "@type": "EducationalOrganization",
        name: "Learning Panda",
        alternateName: "Learning Panda AI",
        url: site,
      },
    },
  ],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      {children}
    </>
  );
}
