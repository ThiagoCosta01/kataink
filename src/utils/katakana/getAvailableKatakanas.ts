import { KATAKANAS } from "../../data/Katakanas";
import type { Katakana } from "../../types/Katakana";
import { AVAILABLE_TEMPLATES } from "../../data/templateLoader";
import { DEFAULT_SYSTEM_SETTINGS } from "../../config/SystemSettings";

const developmentMode = DEFAULT_SYSTEM_SETTINGS.devMode;


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