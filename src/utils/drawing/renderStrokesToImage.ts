import type { Stroke } from "../../types/Stroke";

export function renderStrokesToImage(
  strokes: Stroke[],
  size = 220
): string {
  const canvas =
    document.createElement("canvas");

  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return "";
  }

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;

  for (let i = 1; i < 4; i++) {
    const pos = (size / 4) * i;

    ctx.beginPath();
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, size);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, pos);
    ctx.lineTo(size, pos);
    ctx.stroke();
  }

  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";

  for (const stroke of strokes) {
    if (
      !stroke.points ||
      stroke.points.length === 0
    ) {
      continue;
    }

    ctx.beginPath();

    ctx.moveTo(
      stroke.points[0].x * size,
      stroke.points[0].y * size
    );

    for (
      let i = 1;
      i < stroke.points.length;
      i++
    ) {
      ctx.lineTo(
        stroke.points[i].x * size,
        stroke.points[i].y * size
      );
    }

    ctx.stroke();
  }

  return canvas.toDataURL("image/png");
}