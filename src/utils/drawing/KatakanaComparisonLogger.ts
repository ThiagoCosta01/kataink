import type { Stroke } from "../../types/Stroke";

type LogData = {
  symbol: string;
  user: Stroke[];
  template: Stroke[];
  score: number;
};

export class KatakanaComparisonLogger {
  static enabled = true;

  static log(data: LogData) {
    if (!this.enabled) return;

    console.group(`🧠 Katakana Debug: ${data.symbol}`);

    console.log("📊 Score:", `${data.score}%`);

    console.log("🎯 TEMPLATE (correto)");
    console.table(this.summarize(data.template));

    console.log("✏️ USER (desenho)");
    console.table(this.summarize(data.user));

    console.log("📦 RAW TEMPLATE", data.template);
    console.log("📦 RAW USER", data.user);

    console.groupEnd();
  }

  static setEnabled(value: boolean) {
    this.enabled = value;
  }

  static export(data: LogData) {
    return JSON.stringify(data, null, 2);
  }

  private static summarize(strokes: Stroke[]) {
    return strokes.map((stroke, index) => ({
      stroke: index + 1,
      points: stroke.points.length,
      sample: stroke.points.slice(0, 3),
    }));
  }
}