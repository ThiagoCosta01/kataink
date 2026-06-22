import type {
  BoundingBox,
  ComparisonResult,
} from "../types/KatakanaComparison";

const GRID = 256;
const ALPHA_THRESHOLD = 30;

const FONT_FAMILY =
  "'Noto Sans JP', 'Yu Gothic', serif";

function getBoundingBox(
  data: Uint8ClampedArray,
  width: number,
  height: number
): BoundingBox | null {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let hasPixel = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha =
        data[(y * width + x) * 4 + 3];

      if (alpha > ALPHA_THRESHOLD) {
        hasPixel = true;

        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!hasPixel) {
    return null;
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}

function toBitmap(
  data: Uint8ClampedArray,
  size: number
): Uint8Array {
  const bitmap = new Uint8Array(
    size * size
  );

  for (let i = 0; i < size * size; i++) {
    bitmap[i] =
      data[i * 4 + 3] > ALPHA_THRESHOLD
        ? 1
        : 0;
  }

  return bitmap;
}

function renderReferenceBitmap(
  symbol: string
): Uint8Array {
  const canvas =
    document.createElement("canvas");

  canvas.width = GRID;
  canvas.height = GRID;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new Uint8Array(GRID * GRID);
  }

  ctx.clearRect(
    0,
    0,
    GRID,
    GRID
  );

  const padding = GRID * 0.08;

  const fontSize =
    GRID - padding * 2;

  ctx.fillStyle = "black";

  ctx.font = `${fontSize}px ${FONT_FAMILY}`;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(
    symbol,
    GRID / 2,
    GRID / 2
  );

  const imageData = ctx.getImageData(
    0,
    0,
    GRID,
    GRID
  );

  return toBitmap(
    imageData.data,
    GRID
  );
}

function normalizeUserBitmap(
  userCanvas: HTMLCanvasElement
): Uint8Array | null {
  const ctx =
    userCanvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const imageData =
    ctx.getImageData(
      0,
      0,
      userCanvas.width,
      userCanvas.height
    );

  const box = getBoundingBox(
    imageData.data,
    imageData.width,
    imageData.height
  );

  if (!box) {
    return null;
  }

  const offscreen =
    document.createElement("canvas");

  offscreen.width = GRID;
  offscreen.height = GRID;

  const offCtx =
    offscreen.getContext("2d");

  if (!offCtx) {
    return null;
  }

  offCtx.clearRect(
    0,
    0,
    GRID,
    GRID
  );

  offCtx.drawImage(
    userCanvas,
    box.x,
    box.y,
    box.width,
    box.height,
    0,
    0,
    GRID,
    GRID
  );

  const normalized =
    offCtx.getImageData(
      0,
      0,
      GRID,
      GRID
    );

  return toBitmap(
    normalized.data,
    GRID
  );
}

export function compareKatakana(
  userCanvas: HTMLCanvasElement,
  symbol: string
): ComparisonResult {
  const total = GRID * GRID;

  const userBitmap =
    normalizeUserBitmap(userCanvas);

  const refBitmap =
    renderReferenceBitmap(symbol);

  if (!userBitmap) {
    return {
      score: 0,
      matchingPixels: 0,
      totalPixels: total,
      userBitmap: new Uint8Array(total),
      refBitmap,
    };
  }

  let intersection = 0;
  let union = 0;

  let userPixels = 0;
  let refPixels = 0;

  for (let i = 0; i < total; i++) {
    const user = userBitmap[i];
    const ref = refBitmap[i];

    if (user) {
      userPixels++;
    }

    if (ref) {
      refPixels++;
    }

    if (user || ref) {
      union++;
    }

    if (user && ref) {
      intersection++;
    }
  }

  const overlap =
    union > 0
      ? intersection / union
      : 0;

  const score = Math.round(
    overlap * 100
  );

  console.group(
    `Comparação ${symbol}`
  );

  console.table({
    userPixels,
    refPixels,
    intersection,
    union,
    overlap: overlap.toFixed(4),
    score,
  });

  console.groupEnd();

  return {
    score,
    matchingPixels: intersection,
    totalPixels: union,
    userBitmap,
    refBitmap,
  };
}