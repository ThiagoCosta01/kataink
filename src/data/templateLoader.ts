import type { Stroke } from "../types/Stroke";

const modules = import.meta.glob("./katakanaTemplates/*.ts");

console.log("Templates encontrados:");
console.log(Object.keys(modules));

const cache = new Map<string, Stroke[]>();

export async function loadTemplate(id: string): Promise<Stroke[]> {
  console.log("Carregando:", id);

  const cached = cache.get(id);

  if (cached) {
    console.log("Veio do cache");
    return cached;
  }

  const path = `./katakanaTemplates/${id}.ts`;

  console.log("Procurando:", path);

  const loader = modules[path];

  if (!loader) {
    console.error("Template não encontrado!");
    console.log(Object.keys(modules));
    return [];
  }

  const module = await loader() as {
    default: Stroke[];
  };

  console.log("Template carregado:", module.default.length);

  cache.set(id, module.default);

  return module.default;
}