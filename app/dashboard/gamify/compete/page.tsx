import type { Metadata } from "next";
import ComingSoonTab from "@/components/dashboard/tabs/ComingSoonTab";

export const metadata: Metadata = {
  title: "Compete — Learning Panda",
};

export default function CompetePage() {
  return (
    <ComingSoonTab
      label="Compete"
      emoji="⚡"
      description="Challenge other students in real-time academic battles and climb the global leaderboard!"
    />
  );
}
