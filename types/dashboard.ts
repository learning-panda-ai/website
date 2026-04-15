export type DashboardUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  is_onboarded: boolean;
  is_active: boolean;
  grade: string | null;
  current_streak: number;
  longest_streak: number;
  courses?: string[];
};
