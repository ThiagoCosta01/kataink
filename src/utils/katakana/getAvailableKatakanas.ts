import { KATAKANAS } from "../../data/Katakanas";
import type { Katakana } from "../../types/Katakana";

const developmentMode = false;

export function getAvailableKatakanas(): Katakana[] {
  if (developmentMode) {
    return KATAKANAS.filter(
      (katakana) => katakana.template.length === 0
    );
  }

  return KATAKANAS.filter(
    (katakana) => katakana.template.length > 0
  );
}