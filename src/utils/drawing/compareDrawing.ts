import type { Stroke } from "../../types/Stroke";

function calculateStrokeSimilarity(
  user: Stroke,
  template: Stroke
): number {
  const len = Math.min(
    user.points.length,
    template.points.length
  );

  if (len === 0) {
    return 0;
  }

  let totalDistance = 0;

  for (let i = 0; i < len; i++) {
    const dx =
      user.points[i].x -
      template.points[i].x;

    const dy =
      user.points[i].y -
      template.points[i].y;

    totalDistance += Math.sqrt(
      dx * dx + dy * dy
    );
  }

  const averageDistance =
    totalDistance / len;

  return Math.max(
    0,
    1 - averageDistance
  );
}

function compareStroke(
  user: Stroke,
  template: Stroke,
  respectDirection: boolean
): number {
  const normalScore =
    calculateStrokeSimilarity(
      user,
      template
    );

  if (respectDirection) {
    return normalScore;
  }

  const reversedUser: Stroke = {
    points: [...user.points].reverse(),
  };

  const reversedScore =
    calculateStrokeSimilarity(
      reversedUser,
      template
    );

  return Math.max(
    normalScore,
    reversedScore
  );
}

export function compareDrawing(
  user: Stroke[],
  template: Stroke[],
  respectDirection = false
): number {
  if (
    user.length === 0 ||
    template.length === 0
  ) {
    return 0;
  }

  const len = Math.min(
    user.length,
    template.length
  );

  let totalScore = 0;

  for (let i = 0; i < len; i++) {
    totalScore += compareStroke(
      user[i],
      template[i],
      respectDirection
    );
  }

  const averageScore =
    totalScore / len;

  const strokeDifference =
    Math.abs(
      user.length -
        template.length
    );

  const strokePenalty =
    strokeDifference * 0.1;

  return Math.max(
    0,
    averageScore - strokePenalty
  );
}