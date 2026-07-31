import { Application, SPEObject } from "@splinetool/runtime";
import { Skill, SKILLS } from "@/data/constants";

/** Extra Spline object-name spellings → canonical SKILLS.name */
const SPLINE_SKILL_ALIASES: Record<string, string> = {
  powerbi: "Power BI",
  "power bi": "Power BI",
  power_bi: "Power BI",
  vbnet: "vb.net",
  "vb.net": "vb.net",
  "vb net": "vb.net",
  autocad: "autocad",
  cybersecurity: "cybersecurity",
  ai: "ai",
};

function buildLookup(): Map<string, Skill> {
  const map = new Map<string, Skill>();
  const add = (key: string, skill: Skill) => {
    const k = key.trim().toLowerCase();
    if (k) map.set(k, skill);
  };

  for (const skill of Object.values(SKILLS)) {
    add(skill.name, skill);
  }
  for (const [alias, canonical] of Object.entries(SPLINE_SKILL_ALIASES)) {
    const skill = Object.values(SKILLS).find((s) => s.name === canonical);
    if (skill) add(alias, skill);
  }
  return map;
}

const LOOKUP = buildLookup();

/** Resolve a Spline object name (any casing / alias) to a Skill. */
export function skillFromObjectName(name: string): Skill | null {
  if (!name) return null;
  return LOOKUP.get(name.trim().toLowerCase()) ?? null;
}

/** All name strings that may identify this skill in the scene. */
export function skillObjectNames(skill: Skill): string[] {
  const names = new Set<string>([skill.name]);
  for (const [alias, canonical] of Object.entries(SPLINE_SKILL_ALIASES)) {
    if (canonical === skill.name || alias.toLowerCase() === skill.name.toLowerCase()) {
      names.add(alias);
      names.add(canonical);
    }
  }
  // Case variants commonly seen in the scene
  if (skill.name === "autocad") names.add("Autocad");
  if (skill.name === "cybersecurity") names.add("Cybersecurity");
  if (skill.name === "ai") {
    names.add("Ai");
    names.add("AI");
  }
  return [...names];
}

/** findObjectByName trying canonical name then aliases. */
export function findSkillObject(
  app: Application,
  skill: Skill
): SPEObject | undefined {
  for (const name of skillObjectNames(skill)) {
    const obj = app.findObjectByName(name);
    if (obj) return obj;
  }
  return undefined;
}
