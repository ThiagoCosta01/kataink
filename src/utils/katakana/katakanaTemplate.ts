import type { Katakana } from "../../types/Katakana";
import { loadTemplate } from "../../data/templateLoader";

export async function ensureTemplate(katakana: Katakana) {
  if (katakana.template.length > 0) {
    return katakana.template;
  }

  katakana.template = await loadTemplate(katakana.id);

  return katakana.template;
}