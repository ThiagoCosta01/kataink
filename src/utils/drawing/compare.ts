import type { Stroke } from "../../types/Stroke";

function distance(a: number, b: number) {
  return Math.abs(a - b);
}

function compareStroke(a: Stroke, b: Stroke) {
  const len = Math.min(a.points.length, b.points.length);

  if (len === 0) return 0;

  let error = 0;

  for (let i = 0; i < len; i++) {
    error += Math.sqrt(
      Math.pow(distance(a.points[i].x, b.points[i].x), 2) +
        Math.pow(distance(a.points[i].y, b.points[i].y), 2)
    );
  }

  const avgError = error / len;

  return Math.max(0, 1 - avgError); // 1 = perfeito, 0 = ruim
}

export function compareDrawing(user: Stroke[], template: Stroke[]) {
  const lenDiff = Math.abs(user.length - template.length);

  // penalidade leve por strokes faltando/extras
  let scorePenalty = lenDiff * 0.15;

  const len = Math.min(user.length, template.length);

  let score = 0;

  for (let i = 0; i < len; i++) {
    score += compareStroke(user[i], template[i]);
  }

  const finalScore = score / Math.max(len, 1);

  return Math.max(0, finalScore - scorePenalty);
}