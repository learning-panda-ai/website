import type { Metadata } from "next";
import { Nunito, Fredoka, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { GoogleAnalytics } from "@next/third-parties/google";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://learningpanda.ai";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    template: "%s | Learning Panda",
    default: "Learning Panda — AI Study Buddy for Every Subject & Grade",
  },

  description:
    "Learning Panda is an AI-powered study companion that helps K-12 and university students master math, science, history, English, and more. Get instant homework help, step-by-step explanations, and personalized practice — free, 24/7.",

  keywords: [
    "AI tutor",
    "AI study buddy",
    "homework help",
    "online tutoring",
    "kids education",
    "K-12 learning",
    "personalized learning",
    "math help",
    "science help",
    "adaptive learning",
    "AI education app",
    "school homework help",
    "free online tutor",
    "study app for students",
  ],

  authors: [{ name: "Learning Panda", url: BASE_URL }],
  creator: "Learning Panda",
  publisher: "Learning Panda",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Learning Panda",
    title: "Learning Panda — AI Study Buddy for Every Subject & Grade",
    description:
      "Your AI-powered study companion. Get instant help with any subject, any grade, 24/7. Join thousands of students who improved their grades with Learning Panda — free forever.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Learning Panda — AI Study Buddy for Every Subject",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Learning Panda — AI Study Buddy for Every Subject & Grade",
    description:
      "Your AI-powered study companion. Instant homework help with any subject, any grade, 24/7. Free forever — no credit card required.",
    images: ["/opengraph-image"],
    creator: "@learningpanda",
    site: "@learningpanda",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: BASE_URL,
  },

  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-KEEZ203GH9" />
      <body
        className={`${nunito.variable} ${fredoka.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
