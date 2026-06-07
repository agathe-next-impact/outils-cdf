/**
 * Catalogue des outils pour l'accueil et les pages catégories.
 * Fusionne les outils IMPLÉMENTÉS (depuis le registre) avec les outils
 * PLANIFIÉS (métadonnées seules, badge « bientôt »).
 */
import type { Accent, ToolCategory, ToolMeta } from "@/engines/types";
import { TOOL_DEFINITIONS } from "@/engines/registry";

export interface CatalogEntry extends ToolMeta {
  available: boolean;
}

export interface CategoryInfo {
  key: ToolCategory;
  label: string;
  description: string;
  iconName: string;
  accent: Accent;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    key: "questionnaires",
    label: "Questionnaires",
    description: "Des repères chiffrés pour observer votre vécu, sans jugement.",
    iconName: "clipboard-list",
    accent: "blue",
  },
  {
    key: "parcours",
    label: "Parcours guidés",
    description: "Des cheminements pas à pas, à votre rythme.",
    iconName: "compass",
    accent: "red",
  },
  {
    key: "carnets",
    label: "Carnets & plans",
    description: "Des documents personnels à remplir, garder et exporter.",
    iconName: "notebook-pen",
    accent: "yellow",
  },
];

export function categoryInfo(key: ToolCategory): CategoryInfo {
  return CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[0]!;
}

/** Outils planifiés mais pas encore implémentés (métadonnées d'affichage). */
const PLANNED: ToolMeta[] = [
  {
    slug: "inventaire-burns-anxiete",
    title: "Inventaire d'anxiété de Burns",
    shortTitle: "Inventaire de Burns",
    category: "questionnaires",
    iconName: "activity",
    accent: "blue",
    summary: "33 affirmations pour faire le point sur votre anxiété récente.",
    estimatedMinutes: 8,
    sensitivity: "medium",
    sourceCredit: "D'après l'inventaire d'anxiété de David D. Burns",
    disclaimerKey: "questionnaire",
    crisisLevel: "standard",
  },
  {
    slug: "recovery-assessment-scale",
    title: "Échelle de rétablissement (RAS)",
    shortTitle: "Échelle RAS",
    category: "questionnaires",
    iconName: "sprout",
    accent: "yellow",
    summary: "24 affirmations pour explorer votre sentiment de rétablissement.",
    estimatedMinutes: 7,
    sensitivity: "low",
    sourceCredit: "D'après la Recovery Assessment Scale (Corrigan et al.)",
    disclaimerKey: "questionnaire",
    crisisLevel: "standard",
  },
  {
    slug: "pensees-negatives",
    title: "Remettre en question les pensées négatives",
    shortTitle: "Pensées négatives",
    category: "parcours",
    iconName: "brain",
    accent: "blue",
    summary: "Un parcours en étapes pour explorer une pensée difficile autrement.",
    estimatedMinutes: 15,
    sensitivity: "high",
    sourceCredit: "Inspiré des techniques de restructuration cognitive (TCC)",
    disclaimerKey: "default",
    crisisLevel: "standard",
  },
  {
    slug: "resolution-problemes",
    title: "Résolution de problèmes",
    category: "parcours",
    iconName: "target",
    accent: "red",
    summary: "Dix étapes pour transformer un problème en plan d'action concret.",
    estimatedMinutes: 25,
    sensitivity: "medium",
    sourceCredit: "D'après la méthode de résolution de problèmes (J. Goulet, 2005)",
    disclaimerKey: "default",
    crisisLevel: "standard",
  },
  {
    slug: "gerer-vos-inquietudes",
    title: "Gérer vos inquiétudes",
    category: "parcours",
    iconName: "cloud-rain",
    accent: "blue",
    summary: "Apprivoiser l'inquiétude : période dédiée et résolution de problèmes.",
    estimatedMinutes: 20,
    sensitivity: "high",
    sourceCredit: "D'après un guide d'autosoins TCC (Université d'Exeter / CEDAR)",
    disclaimerKey: "default",
    crisisLevel: "elevated",
  },
  {
    slug: "je-suis-le-centre-de-ma-vie",
    title: "Je suis le centre de ma vie",
    category: "parcours",
    iconName: "heart",
    accent: "yellow",
    summary: "Un journal guidé pour reconstruire l'estime de soi, module par module.",
    estimatedMinutes: 30,
    sensitivity: "high",
    sourceCredit: "D'après le livret « Je suis le centre de ma vie » (Dr Versaevel)",
    disclaimerKey: "retablissement",
    crisisLevel: "standard",
  },
  {
    slug: "recovery-craig",
    title: "Cahier de rétablissement",
    shortTitle: "Cahier de rétablissement",
    category: "parcours",
    iconName: "sunrise",
    accent: "blue",
    summary:
      "Un cahier doux pour cheminer vers le mieux-être, à votre rythme : premiers pas, ressources, écriture et plan personnel.",
    estimatedMinutes: 30,
    sensitivity: "high",
    sourceCredit:
      "Inspiré de l'approche de pair-aidance et de rétablissement de Craig Lewis — adaptation originale",
    disclaimerKey: "retablissement",
    crisisLevel: "elevated",
  },
  {
    slug: "dealing-with-psychosis",
    title: "Composer avec la psychose",
    shortTitle: "Composer avec la psychose",
    category: "parcours",
    iconName: "compass",
    accent: "blue",
    summary:
      "Une boîte à outils pour mieux comprendre et apprivoiser des expériences intenses, à votre rythme.",
    estimatedMinutes: 25,
    sensitivity: "high",
    sourceCredit:
      "Inspiré de l'approche du toolkit Dealing with Psychosis (Fraser Health, Colombie-Britannique) — adaptation originale",
    disclaimerKey: "psychose",
    crisisLevel: "elevated",
  },
  {
    slug: "escape",
    title: "E.S.C.A.P.E. — explorer ses fonctions cognitives",
    shortTitle: "E.S.C.A.P.E.",
    category: "parcours",
    iconName: "brain",
    accent: "blue",
    summary:
      "Une exploration ludique de la mémoire, de l'attention, du raisonnement et du rapport aux autres — pour mieux se connaître, sans score ni diagnostic.",
    estimatedMinutes: 20,
    sensitivity: "low",
    sourceCredit:
      "Inspiré de l'approche E.S.C.A.P.E. (stimulation cognitive avec psychoéducation), E. Garcia & M. Cerbai, 2022 — adaptation originale, sans reproduction du contenu source",
    disclaimerKey: "default",
    crisisLevel: "standard",
  },
  {
    slug: "plan-de-crise",
    title: "Mon plan de crise",
    category: "carnets",
    iconName: "shield-alert",
    accent: "red",
    summary: "Anticiper une crise : signaux, ressources et personnes de confiance.",
    estimatedMinutes: 20,
    sensitivity: "high",
    sourceCredit: "D'après les modèles de plan de crise en santé mentale",
    disclaimerKey: "crise",
    crisisLevel: "elevated",
  },
  {
    slug: "directives-anticipees-psychiatrie",
    title: "Directives anticipées en psychiatrie",
    shortTitle: "Directives anticipées",
    category: "carnets",
    iconName: "scale",
    accent: "red",
    summary: "Exprimer à l'avance vos préférences de soin, au calme.",
    estimatedMinutes: 25,
    sensitivity: "high",
    sourceCredit: "D'après les directives anticipées en psychiatrie",
    disclaimerKey: "crise",
    crisisLevel: "standard",
  },
  {
    slug: "gaap-attaques-panique",
    title: "Grille d'auto-observation des attaques de panique",
    shortTitle: "Attaques de panique",
    category: "carnets",
    iconName: "wind",
    accent: "red",
    summary: "Noter après coup le contexte, les sensations et les pensées.",
    estimatedMinutes: 8,
    sensitivity: "high",
    sourceCredit: "D'après la grille d'auto-observation des attaques de panique",
    disclaimerKey: "default",
    crisisLevel: "elevated",
  },
  {
    slug: "situations-evitees",
    title: "Liste des situations évitées",
    category: "carnets",
    iconName: "footprints",
    accent: "yellow",
    summary: "Lister et hiérarchiser les situations évitées par anxiété.",
    estimatedMinutes: 10,
    sensitivity: "medium",
    sourceCredit: "D'après les outils d'exposition graduée (TCC)",
    disclaimerKey: "default",
    crisisLevel: "standard",
  },
  {
    slug: "fleur-de-patricia",
    title: "La Fleur de Patricia",
    category: "carnets",
    iconName: "flower",
    accent: "yellow",
    summary: "Un carnet du rétablissement en pétales, à explorer librement.",
    estimatedMinutes: 20,
    sensitivity: "medium",
    sourceCredit: "D'après « La Fleur de Patricia », carnet du rétablissement",
    disclaimerKey: "retablissement",
    crisisLevel: "standard",
  },
];

function toMeta(def: ToolMeta): ToolMeta {
  return {
    slug: def.slug,
    title: def.title,
    shortTitle: def.shortTitle,
    category: def.category,
    iconName: def.iconName,
    accent: def.accent,
    summary: def.summary,
    estimatedMinutes: def.estimatedMinutes,
    sensitivity: def.sensitivity,
    sourceCredit: def.sourceCredit,
    disclaimerKey: def.disclaimerKey,
    crisisLevel: def.crisisLevel,
  };
}

export function getCatalog(): CatalogEntry[] {
  const builtSlugs = new Set(TOOL_DEFINITIONS.map((d) => d.slug));
  const built: CatalogEntry[] = TOOL_DEFINITIONS.map((d) => ({
    ...toMeta(d),
    available: true,
  }));
  const planned: CatalogEntry[] = PLANNED.filter(
    (p) => !builtSlugs.has(p.slug)
  ).map((p) => ({ ...p, available: false }));
  // Ordre stable : on suit l'ordre de PLANNED (liste de référence des 11 outils).
  const bySlug = new Map<string, CatalogEntry>([...built, ...planned].map((e) => [e.slug, e]));
  return PLANNED.map((p) => bySlug.get(p.slug)!).filter(Boolean);
}

export function getCatalogByCategory(category: ToolCategory): CatalogEntry[] {
  return getCatalog().filter((e) => e.category === category);
}
