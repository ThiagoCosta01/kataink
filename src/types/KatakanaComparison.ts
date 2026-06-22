export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ComparisonResult {
  score: number;
  matchingPixels: number;
  totalPixels: number;
  userBitmap: Uint8Array;
  refBitmap: Uint8Array;
}

export interface KatakanaComparison {
  character: string;      // ex: "ア"
  userCanvas: HTMLCanvasElement;
  gridSize?: number;      // padrão: 64
  threshold?: number;     // alpha threshold, padrão: 30
  fontFamily?: string;    // padrão: "serif"
}

export * from "./Katakana";