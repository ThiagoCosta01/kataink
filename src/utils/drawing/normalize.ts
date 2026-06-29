import type { Stroke } from "../../types/Stroke";

export function getBounds(
  points: { x: number; y: number }[]
) {
  let minX = Infinity;
  let minY = Infinity;

  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const p of points) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);

    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }

  return {
    minX,
    minY,
    width: maxX - minX || 1,
    height: maxY - minY || 1,
  };
}

export function normalizeDrawing(
  strokes: Stroke[]
): Stroke[] {
  if (strokes.length === 0) {
    return [];
  }

  const allPoints = strokes.flatMap(
    (stroke) => stroke.points
  );

  const bounds =
    getBounds(allPoints);

  return strokes.map((stroke) => ({
    points: stroke.points.map((p) => ({
      x:
        (p.x - bounds.minX) /
        bounds.width,

      y:
        (p.y - bounds.minY) /
        bounds.height,
    })),
  }));
}