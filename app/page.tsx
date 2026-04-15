"use client";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingPageHero from "@/components/landingPage/landingPageHero";
import ProblemAndSolution from "@/components/landingPage/ProblemAndSolution";
import HowItWorks from "@/components/landingPage/howItWorks";
import Features from "@/components/landingPage/features";
import SubjectAndBoards from "@/components/landingPage/subjectsAndBoards";
import InterationModes from "@/components/landingPage/interactionModes";
import Gamefication from "@/components/landingPage/gamification";
import ForSchools from "@/components/landingPage/forSchools";
import Testimonials from "@/components/landingPage/testimonials";
import Pricing from "@/components/landingPage/pricing";
import FAQ from "@/components/landingPage/faq";
import CTA from "@/components/landingPage/cta";

import { useAuth } from "@/app/providers";
import { problems, steps, studentFeatures, parentFeatures, boards, subjects, modes, faqItems, leaderboard, schoolProps, stats, testimonials } from "@/data/landingPage";
import { websiteSchema, organizationSchema, softwareApplicationSchema, faqSchema } from "@/schemas/landingPage";

// ── Page Component ─────────────────────────────────────────────────────────
export default function LandingPage() {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const [activeTab, setActiveTab] = useState<"students" | "parents">("students");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF7", fontFamily: "var(--font-nunito)" }}>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />
      <LandingPageHero />
      <ProblemAndSolution problems={problems} />
      <HowItWorks steps={steps} />
      <Features activeTab={activeTab} setActiveTab={setActiveTab} studentFeatures={studentFeatures} parentFeatures={parentFeatures} />
      <SubjectAndBoards subjects={subjects} boards={boards} />
      <InterationModes modes={modes} />
      <Gamefication leaderboard={leaderboard} />
      <ForSchools schoolProps={schoolProps} />
      <Testimonials testimonials={testimonials} stats={stats} />
      <Pricing isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
      <FAQ faqItems={faqItems} openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <CTA isLoggedIn={isLoggedIn} />
      <Footer />
    </div>
  );
}
