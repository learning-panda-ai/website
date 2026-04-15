export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Topic = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  lessons: number;
  difficulty: Difficulty;
};

export type CourseInfo = {
  name: string;
  slug: string;
  category: string;
  categoryEmoji: string;
  emoji: string;
  description: string;
  accent: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
  };
  topics: Topic[];
};
