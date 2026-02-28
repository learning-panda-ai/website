import type { ElementType } from "react";
import { BookOpen, BarChart2, MessageCircle, User } from "lucide-react";

export type Tab = "courses" | "progress" | "profile" | "ask";

export const tabAnim = {
  initial:    { opacity: 0, y: 10  },
  animate:    { opacity: 1, y: 0   },
  exit:       { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

export const SIDEBAR_GROUPS: {
  label: string;
  items: { id: Tab; label: string; Icon: ElementType }[];
}[] = [
  {
    label: "MY STUFF",
    items: [{ id: "courses", label: "Courses", Icon: BookOpen }],
  },
  {
    label: "MY ACCOUNT",
    items: [
      { id: "progress", label: "Progress",  Icon: BarChart2     },
      { id: "profile",  label: "Profile",   Icon: User          },
      { id: "ask",      label: "Ask Panda", Icon: MessageCircle },
    ],
  },
];

export const MOBILE_TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "courses",  label: "Courses",   emoji: "📚" },
  { id: "progress", label: "Progress",  emoji: "📊" },
  { id: "profile",  label: "Profile",   emoji: "👤" },
  { id: "ask",      label: "Ask Panda", emoji: "🐼" },
];
