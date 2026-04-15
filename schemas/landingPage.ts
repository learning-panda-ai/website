import { faqItems } from "@/data/landingPage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://learningpanda.ai";

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Learning Panda AI",
  url: BASE_URL,
  description:
    "AI-powered learning platform for Indian school students (Class 1–12) across CBSE, ICSE, and State boards. Students interact with their exact textbooks via text, voice, and video.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/courses?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Learning Panda AI",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.ico`,
  description:
    "Learning Panda AI provides AI-powered tutoring for Indian school students (Class 1–12) across CBSE, ICSE, Maharashtra, Karnataka, Tamil Nadu, and UP boards.",
  foundingDate: "2024",
  knowsAbout: ["AI tutoring", "CBSE", "ICSE", "Indian school education", "Adaptive learning", "Spaced repetition"],
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Learning Panda AI",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: BASE_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5", ratingCount: "3", bestRating: "5" },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};
