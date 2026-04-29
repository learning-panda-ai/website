import type { OnboardingOption } from "@/types/onboarding";

export const SCHOOL_BOARDS: OnboardingOption[] = [
  { id: "CBSE",        label: "CBSE",        emoji: "🏫" },
  { id: "ICSE",        label: "ICSE",        emoji: "🎓" },
  { id: "IGCSE",       label: "IGCSE",       emoji: "🌐" },
  { id: "IB",          label: "IB",          emoji: "🌍" },
  { id: "State Board", label: "State Board", emoji: "📋" },
];

export const CLASS_EMOJI: Record<string, string> = {
  "Class 1":  "🌱", "Class 2":  "🌿", "Class 3":  "🍀", "Class 4":  "🌻",
  "Class 5":  "⭐", "Class 6":  "🌟", "Class 7":  "🔥", "Class 8":  "💫",
  "Class 9":  "🚀", "Class 10": "🏆", "Class 11": "💎", "Class 12": "👑",
};

export const SUBJECT_EMOJI: Record<string, string> = {
  Mathematics:          "📐",
  Physics:              "⚛️",
  Chemistry:            "🧪",
  Biology:              "🧬",
  Science:              "🔬",
  "Computer Science":   "💻",
  English:              "📖",
  Hindi:                "🇮🇳",
  "Social Science":     "🌍",
  History:              "📜",
  Geography:            "🗺️",
  Economics:            "💰",
  "English Grammar":    "✍️",
  "English Literature": "📚",
  Sanskrit:             "🕉️",
};

export const FAVORITE_SUBJECTS: OnboardingOption[] = [
  { id: "maths",          label: "Maths",         emoji: "🔢" },
  { id: "science",        label: "Science",        emoji: "🧪" },
  { id: "english",        label: "English",        emoji: "📖" },
  { id: "social-science", label: "Social Science", emoji: "🌍" },
  { id: "computer",       label: "Computer",       emoji: "💻" },
  { id: "not-sure",       label: "Not sure yet",   emoji: "🤷" },
];

export const STUDY_FEELINGS: OnboardingOption[] = [
  { id: "enjoy",    label: "I enjoy learning", emoji: "😊" },
  { id: "okay",     label: "It's okay",        emoji: "🙂" },
  { id: "stressed", label: "I feel stressed",  emoji: "😓" },
  { id: "confused", label: "I feel confused",  emoji: "🤔" },
];

export const CAREER_OPTIONS: OnboardingOption[] = [
  { id: "have-idea",    label: "Yes, I have an idea", emoji: "💡" },
  { id: "many-options", label: "I have many options",  emoji: "🌟" },
  { id: "not-yet",      label: "Not yet",              emoji: "🤷" },
  { id: "confused",     label: "I feel confused",      emoji: "😕" },
];

export const STRENGTHS_OPTIONS: OnboardingOption[] = [
  { id: "yes",      label: "Yes, definitely!", emoji: "🚀" },
  { id: "maybe",    label: "Maybe",            emoji: "🤔" },
  { id: "not-sure", label: "Not sure",         emoji: "💭" },
];

export type FloatingItem = {
  emoji: string;
  top: string;
  left?: string;
  right?: string;
  delay: number;
  dur: number;
};

export const FLOATING_ITEMS: FloatingItem[] = [
  { emoji: "🎋", top: "5%",  left:  "3%", delay: 0,   dur: 7 },
  { emoji: "🍃", top: "12%", right: "5%", delay: 1,   dur: 6 },
  { emoji: "⭐", top: "35%", left:  "2%", delay: 0.5, dur: 5 },
  { emoji: "📖", top: "55%", right: "3%", delay: 2,   dur: 8 },
  { emoji: "🌿", top: "75%", left:  "4%", delay: 1.5, dur: 6 },
  { emoji: "💡", top: "90%", right: "4%", delay: 0.8, dur: 7 },
];
