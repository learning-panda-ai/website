export interface BasicDetailsData {
  firstName: string;
  lastName: string;
  state: string;
  city: string;
  parentName: string;
  parentMobile: string;
  parentEmail: string;
}

export interface OnboardingOptions {
  classes: string[];
  subjects_by_class: Record<string, string[]>;
}

export interface OnboardingOption {
  id: string;
  label: string;
  emoji: string;
}
