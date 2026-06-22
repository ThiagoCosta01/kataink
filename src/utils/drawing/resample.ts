import type { Stroke } from "../../types/Stroke";

function lerp(
  start: number,
  end: number,
  t: number
) {
  return start + (end - start) * t;
}

export function resampleStroke(
  stroke: Stroke,
  targetPoints = 32
): Stroke {
  if (stroke.points.length <= 1) {
    return stroke;
  }

  const points = stroke.points;

  const resampled = [];

  for (let i = 0; i < targetPoints; i++) {
    const t =
      i / (targetPoints - 1);

    const index =
      t * (points.length - 1);

    const left = Math.floor(index);
    const right = Math.ceil(index);

    const localT = index - left;

    const p1 = points[left];
    const p2 = points[right];

    resampled.push({
      x: lerp(p1.x, p2.x, localT),
      y: lerp(p1.y, p2.y, localT),
    });
  }

  return {
    points: resampled,
  };
}

export function resampleDrawing(
  strokes: Stroke[],
  targetPoints = 32
): Stroke[] {
  return strokes.map((stroke) =>
    resampleStroke(
      stroke,
      targetPoints
    )
  );
}