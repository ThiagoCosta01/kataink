import type { Stroke } from "../types/Stroke";

const modules = import.meta.glob("./katakanaTemplates/*.ts");

const cache = new Map<string, Stroke[]>();

export const AVAILABLE_TEMPLATES = new Set(
  Object.keys(modules).map(path =>
    path
      .split("/")
      .pop()!
      .replace(".ts", "")
  )
);

export async function loadTemplate(id: string): Promise<Stroke[]> {
  const cached = cache.get(id);

  if (cached) {
    return cached;
  }

  const loader = modules[`./katakanaTemplates/${id}.ts`];

  if (!loader) {
    return [];
  }

  const module = (await loader()) as {
    default: Stroke[];
  };

  cache.set(id, module.default);

  return module.default;
}