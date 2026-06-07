import type { FieldValue } from "../types";
import type { PitfallRule } from "./types";

/** Verbes d'action (heuristique pour repérer une action concrète vs vague). */
const ACTION_VERBS = [
  "appeler", "écrire", "lister", "noter", "ranger", "envoyer", "demander", "prendre",
  "aller", "contacter", "préparer", "organiser", "planifier", "commencer", "terminer",
  "trier", "remplir", "poser", "parler", "marcher", "respirer", "essayer", "chercher",
  "réserver", "acheter", "payer", "rencontrer", "réviser", "ranger", "cuisiner", "sortir",
];

const VAGUE = [
  "m'organiser", "mieux faire", "régler la situation", "faire mieux", "me ressaisir",
  "être plus positif", "gérer", "arranger les choses", "m'en sortir", "faire des efforts",
];

const WORRY_BEHAVIORS = [
  "vérifier", "rassurer", "demander sans cesse", "contrôler", "éviter", "reporter",
  "procrastiner", "tout planifier", "ruminer", "me distraire", "fuir", "repousser",
];

export interface PitfallHit {
  ruleId: string;
  message: string;
}

function matches(rule: PitfallRule, text: string): boolean {
  switch (rule.detector) {
    case "tooShort": {
      const min = rule.pattern ? Number(rule.pattern) : 8;
      return text.length > 0 && text.length < min;
    }
    case "tooVague":
      return VAGUE.some((p) => text.includes(p));
    case "missingActionVerb":
      return !ACTION_VERBS.some((v) => text.includes(v));
    case "containsWorryBehavior":
      return WORRY_BEHAVIORS.some((p) => text.includes(p));
    case "keyword":
      return (rule.pattern ?? "")
        .split("|")
        .filter(Boolean)
        .some((k) => text.includes(k.toLowerCase()));
    case "regex":
      try {
        return new RegExp(rule.pattern ?? "", "i").test(text);
      } catch {
        return false;
      }
  }
}

export function detectPitfalls(
  rules: PitfallRule[] | undefined,
  values: Record<string, FieldValue>
): PitfallHit[] {
  if (!rules) return [];
  const hits: PitfallHit[] = [];
  for (const rule of rules) {
    const v = values[rule.appliesToFieldId];
    const text = typeof v === "string" ? v.trim().toLowerCase() : "";
    if (!text) continue;
    if (matches(rule, text)) hits.push({ ruleId: rule.id, message: rule.message });
  }
  return hits;
}
