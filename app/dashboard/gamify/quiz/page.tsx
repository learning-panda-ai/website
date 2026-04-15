import type { Metadata } from "next";
import ComingSoonTab from "@/components/dashboard/tabs/ComingSoonTab";

export const metadata: Metadata = {
  title: "Quizzes — Learning Panda",
};

export default function QuizPage() {
  return (
    <ComingSoonTab
      label="Quizzes"
      emoji="🧠"
      description="AI-generated quizzes tailored to your courses and grade level. Test your knowledge and earn XP!"
    />
  );
}
