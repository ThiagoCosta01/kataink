import { KATAKANAS } from "../../data/Katakanas";
import type { Katakana } from "../../types/Katakana";

export function getAvailableKatakanas(): Katakana[] {
  return KATAKANAS.filter(
    (k) => k.template && k.template.length > 0
  );
}