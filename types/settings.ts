export type SettingsTab = "profile" | "notifications" | "subscription" | "security";

export type UserProp = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  firstName: string | null;
  lastName: string | null;
  city: string | null;
  state: string | null;
  grade: string | null;
  schoolBoard: string | null;
  parentName: string | null;
  parentMobile: string | null;
  parentEmail: string | null;
  courses: string[];
  createdAt: string;
  current_streak?: number;
};
