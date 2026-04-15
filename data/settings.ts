import { User, Bell, CreditCard, Shield } from "lucide-react";
import type { ElementType } from "react";
import type { SettingsTab } from "@/types/settings";

export const SETTINGS_TABS: { id: SettingsTab; label: string; Icon: ElementType }[] = [
  { id: "profile",       label: "Profile",       Icon: User       },
  { id: "notifications", label: "Notifications", Icon: Bell       },
  { id: "subscription",  label: "Subscription",  Icon: CreditCard },
  { id: "security",      label: "Security",      Icon: Shield     },
];

export const ALL_GRADES = [
  { id: "class-1",  label: "Class 1"       },
  { id: "class-2",  label: "Class 2"       },
  { id: "class-3",  label: "Class 3"       },
  { id: "class-4",  label: "Class 4"       },
  { id: "class-5",  label: "Class 5"       },
  { id: "class-6",  label: "Class 6"       },
  { id: "class-7",  label: "Class 7"       },
  { id: "class-8",  label: "Class 8"       },
  { id: "class-9",  label: "Class 9"       },
  { id: "class-10", label: "Class 10"      },
  { id: "class-11", label: "Class 11"      },
  { id: "class-12", label: "Class 12"      },
  { id: "uni-1",    label: "1st Year Uni"  },
  { id: "uni-2",    label: "2nd Year Uni"  },
  { id: "uni-3",    label: "3rd Year Uni"  },
  { id: "uni-4",    label: "4th Year Uni"  },
  { id: "graduate", label: "Graduate"      },
  { id: "adult",    label: "Adult Learner" },
  { id: "other",    label: "Other"         },
];

export const COURSE_CATEGORIES = [
  { label: "Mathematics 🔢", courses: ["Mathematics"] },
  { label: "Science 🧪",     courses: ["Science", "Physics", "Chemistry", "Biology"] },
  { label: "Social Studies 🗺️", courses: ["Social Science", "History", "Geography", "Economics", "Political Science"] },
  { label: "Languages 📝",   courses: ["English", "Hindi", "English Literature", "English Grammar"] },
  { label: "Computing 💻",   courses: ["Computer Science", "Information Technology"] },
  { label: "Commerce & More 📈", courses: ["Accountancy", "Business Studies", "Physical Education", "Fine Arts"] },
];
