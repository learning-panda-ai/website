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


export const metadata: Metadata = {
  title: "Learning Panda 🐼 — Fun AI Learning for Kids!",
  description:
    "Your cheerful AI study buddy that makes learning fun and effective for school kids!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-0YLN09XG88" />
      <body
        className={`${nunito.variable} ${fredoka.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
