import { Application, SPEObject } from "@splinetool/runtime";
import { SKILLS, SkillNames } from "@/data/constants";

type MaterialLayer = {
  type?: string;
  texture?: { image?: { name?: string; data?: unknown } };
  updateTexture?: (src: string | Uint8Array) => Promise<void>;
};

type MaterialLike = {
  layers?: MaterialLayer[];
};

type ObjectWithMaterial = SPEObject & {
  material?: MaterialLike | MaterialLike[];
};

/**
 * Baked texture names in skills_keyboard.spline → Gunjan keycap icon stems.
 */
const EXACT_BAKED: Record<string, string> = {
  "autocad.png": "autocad",
  "aws.png": "aws",
  "azure.png": "azure",
  "cybersecurity.png": "security",
  "databricks.png": "databricks",
  "docker (1)-modified.png": "docker",
  "firebase-modified.png": "firebase",
  "github-modified.png": "github",
  "html5 (1)-modified.png": "html",
  "linux-modified.png": "linux",
  "neural-networks.png": "neural",
  "opencv.png": "opencv",
  "postgresql.png": "postgres",
  "powerbi.png": "powerbi",
  "react (1)-modified.png": "react",
  "robotics.png": "ros",
  "ros.png": "ros",
  "tableau.png": "tableau",
  "tensorflow.png": "tensorflow",
  "vbnet.png": "dotnet",
  "wordpress-modified.png": "wordpress",
  "ai.png": "genai",
};

/** Spline skill object name → icon file stem. */
const OBJECT_TO_ICON: Record<string, string> = Object.fromEntries(
  Object.values(SkillNames).map((name) => {
    const skill = SKILLS[name];
    const file = skill.keycapIcon.dark.split("/").pop()!.replace(".png", "");
    return [skill.name, file];
  })
);

function resolveIconUrl(path: string) {
  return typeof window !== "undefined"
    ? new URL(path, window.location.origin).href
    : path;
}

function getLayers(obj: SPEObject): MaterialLayer[] {
  const material = (obj as ObjectWithMaterial).material;
  if (!material) return [];
  if (Array.isArray(material)) {
    return material.flatMap((m) => m.layers ?? []);
  }
  return material.layers ?? [];
}

function normalizeImageName(name: string | undefined): string | null {
  if (!name) return null;
  const base = name.split(/[/\\]/).pop() ?? name;
  return base.trim().toLowerCase();
}

function iconForBakedName(bakedName: string | undefined): string | null {
  const key = normalizeImageName(bakedName);
  if (!key) return null;
  if (EXACT_BAKED[key]) return EXACT_BAKED[key];
  for (const [exact, icon] of Object.entries(EXACT_BAKED)) {
    if (exact.toLowerCase() === key) return icon;
  }
  return null;
}

function requestRender(app: Application) {
  try {
    (app as unknown as { requestRender?: () => void }).requestRender?.();
  } catch {
    /* ignore */
  }
}

async function loadIconBytes(icon: string, mode: "light" | "dark") {
  const src = resolveIconUrl(`/assets/keycaps/${mode}/${icon}.png`);
  const res = await fetch(src);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${src}`);
  return new Uint8Array(await res.arrayBuffer());
}

function queueUpdate(
  layer: MaterialLayer,
  icon: string,
  mode: "light" | "dark",
  tasks: Promise<unknown>[]
) {
  if (typeof layer.updateTexture !== "function") return;
  tasks.push(
    (async () => {
      try {
        const bytes = await loadIconBytes(icon, mode);
        await layer.updateTexture!(bytes);
      } catch {
        await layer.updateTexture!(
          resolveIconUrl(`/assets/keycaps/${mode}/${icon}.png`)
        );
      }
    })()
  );
}

/** Swap logos on skills_keyboard.spline. Never changes visibility or geometry. */
export async function applyKeycapTextures(
  app: Application,
  theme: string | undefined
) {
  const mode = theme === "light" ? "light" : "dark";
  const tasks: Promise<unknown>[] = [];

  for (const obj of app.getAllObjects()) {
    const layers = getLayers(obj);
    for (const layer of layers) {
      const imgName = layer.texture?.image?.name;

      const byImage = iconForBakedName(imgName);
      if (byImage) {
        queueUpdate(layer, byImage, mode, tasks);
        continue;
      }

      const byObject = OBJECT_TO_ICON[obj.name];
      if (byObject && typeof layer.updateTexture === "function") {
        queueUpdate(layer, byObject, mode, tasks);
      }
    }
  }

  await Promise.all(tasks);
  requestRender(app);
}

export function applyKeycapColorContrast(
  _app: Application,
  _theme: string | undefined
) {
  /* intentionally empty */
}
