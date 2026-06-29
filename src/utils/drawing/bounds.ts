export function getBounds(
  points: { x: number; y: number }[]
) {
  let minX = Infinity;
  let minY = Infinity;

  let maxX = -Infinity;
  let maxY = -Infinity;

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