import type { Stroke } from "../../types/Stroke";

export function simplifyStroke(stroke: Stroke, step = 3): Stroke {
  return {
    points: stroke.points.filter((_, i) => i % step === 0),
  };
}

export function simplifyDrawing(strokes: Stroke[]): Stroke[] {
  return strokes.map((s) => simplifyStroke(s));
}