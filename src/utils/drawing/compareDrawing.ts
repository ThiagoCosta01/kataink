import type { Stroke } from "../../types/Stroke";

function compareStroke(
  user: Stroke,
  template: Stroke
) {
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

export function compareDrawing(
  user: Stroke[],
  template: Stroke[]
) {
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

  let score = 0;

  for (let i = 0; i < len; i++) {
    score += compareStroke(
      user[i],
      template[i]
    );
  }

  score /= len;

  const strokePenalty =
    Math.abs(
      user.length - template.length
    ) * 0.1;

  return Math.max(
    0,
    score - strokePenalty
  );
}