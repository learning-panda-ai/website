export type AuthStat = {
  value: string;
  label: string;
  hasStarIcon?: boolean;
};

export type AuthHighlight = {
  emoji: string;
  title: string;
  desc: string;
};

export const AUTH_STATS: AuthStat[] = [
  { value: "50K+",  label: "Students" },
  { value: "4.9",   label: "Rating", hasStarIcon: true },
  { value: "1000+", label: "Lessons" },
];

export const AUTH_HIGHLIGHTS: AuthHighlight[] = [
  { emoji: "🎓", title: "AI Tutor",       desc: "Personalized for your grade" },
  { emoji: "⚡", title: "Instant Help",   desc: "Answers in seconds, 24/7"   },
  { emoji: "📈", title: "Track Progress", desc: "See yourself improve daily"  },
];
