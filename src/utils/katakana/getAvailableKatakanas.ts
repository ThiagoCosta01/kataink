import { KATAKANAS } from "../../data/Katakanas";
import type { Katakana } from "../../types/Katakana";
import { AVAILABLE_TEMPLATES } from "../../data/availableTemplates";

const developmentMode = false;


export function getAvailableKatakanas(): Katakana[] {
  if (developmentMode) {
    return KATAKANAS.filter(
      k => !AVAILABLE_TEMPLATES.has(k.id)
    );
  }

  return KATAKANAS.filter(
    k => AVAILABLE_TEMPLATES.has(k.id)
  );
}