import { useMemo, useState } from "react";

import type { PracticeScore } from "../types/PracticeScore";

const TOTAL_ROUNDS = 10;

export function usePracticeScore() {
  const [scores, setScores] = useState<
    PracticeScore[]
  >([]);

  const addScore = (score: number, katakana: string) => {
  setScores((prev) => [
    ...prev,
    {
      round: prev.length + 1,
      score,
      katakana,
    },
  ]);
};

  const reset = () => {
    setScores([]);
  };

  const totalScore = useMemo(
    () =>
      scores.reduce(
        (acc, item) => acc + (item.score || 0),
        0
      ),
    [scores]
  );

  const averageScore = useMemo(() => {
    if (scores.length === 0) {
      return 0;
    }

    return Math.round(
      totalScore / scores.length
    );
  }, [scores, totalScore]);

  const currentRound =
    scores.length + 1;

  const finished =
    scores.length >= TOTAL_ROUNDS;

  return {
    scores,

    totalRounds: TOTAL_ROUNDS,
    currentRound,

    totalScore,
    averageScore,

    finished,

    addScore,
    reset,
  };
}