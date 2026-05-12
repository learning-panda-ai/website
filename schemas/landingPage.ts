import { faqItems } from "@/data/landingPage";
import { getSiteUrl } from "@/lib/seo";

const BASE_URL = getSiteUrl();

/** WebSite — no fake search action; courses area is account-gated. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Learning Panda",
  alternateName: "Learning Panda AI",
  url: BASE_URL,
  inLanguage: ["en-IN", "hi-IN"],
  description:
    "AI-powered learning platform for Indian school students (Class 1–12) across CBSE, ICSE, and major state boards. Explanations are grounded in official textbook chapters with text, voice, and video study modes.",
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "RegisterAction",
    target: `${BASE_URL}/login`,
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${BASE_URL}/#organization`,
  name: "Learning Panda",
  alternateName: "Learning Panda AI",
  url: BASE_URL,
  logo: `${BASE_URL}/opengraph-image`,
  image: `${BASE_URL}/opengraph-image`,
  description:
    "Learning Panda provides curriculum-aligned AI tutoring for Indian school students (Class 1–12) across CBSE, ICSE, Maharashtra, Karnataka, Tamil Nadu, and Uttar Pradesh state boards.",
  foundingDate: "2025",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  knowsAbout: [
    "CBSE",
    "ICSE",
    "NCERT",
    "Indian state board education",
    "K-12 adaptive learning",
    "Spaced repetition",
    "AI tutoring",
    "Homework help",
    "Doubt solving",
    "Maharashtra board",
    "Karnataka board",
    "Tamil Nadu board",
    "UP board",
    "Class 1 to Class 12 education",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@learningpanda.ai",
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "schools@learningpanda.ai",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  sameAs: [
    "https://x.com/LearningPandaAI",
    "https://www.linkedin.com/company/learning-panda-ai/",
    "https://www.instagram.com/learning_panda_ai/",
    "https://www.reddit.com/user/learning-panda-ai/",
    "https://www.youtube.com/@learning-panda-ai",
  ],
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Learning Panda",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: BASE_URL,
  offers: [
    {
      "@type": "Offer",
      name: "Free Plan",
      price: "0",
      priceCurrency: "INR",
      description: "20 questions per day, text chat, basic quizzes, daily streak tracking. No credit card required.",
    },
    {
      "@type": "Offer",
      name: "Pro Plan",
      price: "299",
      priceCurrency: "INR",
      billingIncrement: "P1M",
      description: "Unlimited questions, voice and video chat, adaptive quizzes, spaced repetition, parent reports.",
    },
  ],
  inLanguage: ["en-IN", "hi-IN"],
  audience: {
    "@type": "EducationalAudience",
    educationalRole: ["student", "teacher", "parent"],
    audienceType: "Indian school students Class 1 to Class 12",
  },
  educationalUse: ["homework support", "exam preparation", "revision", "doubt solving"],
  featureList: [
    "Textbook-aligned AI answers for CBSE, ICSE, and Indian state boards",
    "Text, voice, and video learning modes",
    "Adaptive quizzes",
    "Spaced repetition",
    "Gamified streaks and XP",
    "Quiz battles with friends",
    "AI oral exam practice",
    "Smart study planner",
    "Weekly parent progress reports",
    "At-risk student alerts for teachers",
  ],
  description:
    "AI study companion for Indian K–12 students: chapter-accurate answers from CBSE, ICSE, and state board textbooks via text, voice, and video; adaptive quizzes; spaced repetition; gamified streaks; and optional parent reports. Pro plan at ₹299/month — a fraction of private tutoring costs.",
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

/** Homepage WebPage + speakable selectors for answer engines (AEO / GEO). */
export const homeWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/#webpage`,
  url: `${BASE_URL}/`,
  name: "Learning Panda — AI tutor for Indian school boards",
  description:
    "Official marketing homepage for Learning Panda: an AI study companion that answers from CBSE, ICSE, and state board textbooks for Class 1–12, with text, voice, video, quizzes, and gamified revision.",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  about: { "@id": `${BASE_URL}/#organization` },
  primaryImageOfPage: `${BASE_URL}/opengraph-image`,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".seo-primary-summary", ".seo-entity-definition"],
  },
};
