export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  is_active: boolean;
  is_onboarded: boolean;
}
