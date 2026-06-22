import type { Stroke } from "../../types/Stroke";

export function getBounds(points: { x: number; y: number }[]) {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }

  return {
    minX,
    minY,
    width: maxX - minX || 1,
    height: maxY - minY || 1,
  };
}

export function normalizeStroke(stroke: Stroke): Stroke {
  const bounds = getBounds(stroke.points);

  return {
    points: stroke.points.map((p) => ({
      x: (p.x - bounds.minX) / bounds.width,
      y: (p.y - bounds.minY) / bounds.height,
    })),
  };
}

export function normalizeDrawing(strokes: Stroke[]): Stroke[] {
  return strokes.map(normalizeStroke);
}