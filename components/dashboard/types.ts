import { BookOpen, TrendingUp, Bot, Trophy, User, Video, Mic, Zap } from "lucide-react";
import type { ElementType } from "react";

export type Tab = "courses" | "progress" | "profile" | "text" | "video" | "audio" | "quizzes" | "challenges";

export const tabAnim = {
  initial:    { opacity: 0, y: 10  },
  animate:    { opacity: 1, y: 0   },
  exit:       { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

export const SIDEBAR_ITEMS: { id: Tab; label: string; Icon: ElementType }[] = [
  { id: "courses",  label: "Courses",   Icon: BookOpen   },
  { id: "progress", label: "Progress",  Icon: TrendingUp },
  { id: "text",     label: "Ask Panda", Icon: Bot        },
  { id: "quizzes",  label: "Gamify",    Icon: Trophy     },
  { id: "profile",  label: "Account",   Icon: User       },
];

export const MOBILE_TABS: { id: Tab; label: string; Icon: ElementType; featured?: boolean }[] = [
  { id: "courses",  label: "Home",     Icon: BookOpen },
  { id: "text",     label: "AI Chat",  Icon: Bot      },
  { id: "progress", label: "Progress", Icon: TrendingUp },
  { id: "quizzes",  label: "Rank",     Icon: Trophy   },
  { id: "profile",  label: "Me",       Icon: User     },
];
