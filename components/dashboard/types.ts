import type { ElementType } from "react";
import { BookOpen, BarChart2, MessageSquare, User, Video, Mic, Gamepad2, Zap } from "lucide-react";

export type Tab = "courses" | "progress" | "profile" | "text" | "video" | "audio" | "quizzes" | "challenges";

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
      { id: "profile",  label: "Profile",  Icon: User      },
      { id: "progress", label: "Progress", Icon: BarChart2 },
    ],
  },
  {
    label: "ASK PANDA",
    items: [
      { id: "text",  label: "Text Chat",  Icon: MessageSquare },
      { id: "video", label: "Video Chat", Icon: Video         },
      { id: "audio", label: "Voice Chat", Icon: Mic           },
    ],
  },
  {
    label: "GAMIFY",
    items: [
      { id: "quizzes",    label: "Quizzes",    Icon: Gamepad2 },
      { id: "challenges", label: "Challenges", Icon: Zap      },
    ],
  },
];

export const MOBILE_TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "courses",  label: "Courses",  emoji: "📚" },
  { id: "progress", label: "Progress", emoji: "📊" },
  { id: "profile",  label: "Profile",  emoji: "👤" },
  { id: "text",     label: "Text",     emoji: "🐼" },
  { id: "audio",    label: "Voice",    emoji: "🎤" },
];
