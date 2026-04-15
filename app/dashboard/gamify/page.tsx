import type { Metadata } from "next";
import GamifyHub from "@/components/dashboard/GamifyHub";

export const metadata: Metadata = {
  title: "Gamify — Learning Panda",
};

export default function GamifyPage() {
  return <GamifyHub />;
}
