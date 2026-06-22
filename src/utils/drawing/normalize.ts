import type { Stroke } from "../../types/Stroke";
import { getBounds } from "./bounds";

export function normalizeDrawing(
  strokes: Stroke[]
): Stroke[] {
  if (strokes.length === 0) {
    return [];
  }

  const allPoints = strokes.flatMap(
    (stroke) => stroke.points
  );

  const bounds = getBounds(allPoints);

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