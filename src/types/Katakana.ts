import type { Stroke } from "./Stroke";

export type Difficulty = "easy" | "medium" | "hard";

export type Katakana = {
  id: string;
  symbol: string;
  strokeCount: number;
  difficulty: Difficulty;
  template: Stroke[];
};