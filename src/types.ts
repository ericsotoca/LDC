export interface Question {
  id: number;
  title: string;
  question: string;
  answers: string[];
  defaultCompat: number[]; // Indices of default compatible answers (0=A, 1=B, 2=C)
  importance: string;
  level: string;
}

export interface Profile {
  name: string;
  compatAnswers: { [questionId: number]: number[] }; // Map of questionId -> array of compatible indices
  secretCode: string;
  messengerUsername?: string;
  isCustom?: boolean;
}

export interface Reward {
  milestone: number;
  title: string;
  description: string;
  image: string;
  quote: string;
  rewardText: string;
}

