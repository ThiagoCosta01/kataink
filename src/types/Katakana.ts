import type { Stroke } from "./Stroke";

type DifficultyLevel =
  | "easy"
  | "medium"
  | "hard";

export interface Katakana {
  id: string;
  symbol: string;
  strokeCount: number;
  difficulty: DifficultyLevel;
  template: Stroke[];
}