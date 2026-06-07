/**
 * Parcours par objectif — couche de navigation TRANSVERSALE aux outils.
 * Un parcours = un objectif de la personne + une suite SUGGÉRÉE (non bloquante)
 * d'étapes pointant vers des outils existants (ou un segment précis d'un outil
 * composite via la convention `parent::segment`).
 *
 * Aucune logique de moteur ici : on ne fait que référencer et résoudre.
 * La résolution (titres, icônes, slices à interroger) utilise le registre et le
 * catalogue → ce fichier est SERVEUR (à appeler depuis un composant serveur).
 */
import type { Accent } from "@/engines/types";
import type { ResolvedStep, StepCheck, LeafEngine } from "@/lib/pathwayTypes";
import { getDefinition } from "@/engines/registry";
import { segmentSlug } from "@/engines/composite/segments";
import { getCatalog } from "@/data/catalog";

export interface PathwayStep {
  /** "situations-evitees" ou "dealing-with-psychosis::prendre-soin". */
  ref: string;
  /** En quoi cette étape sert l'objectif (non culpabilisant). */
  why: string;
  optional?: boolean;
}

export interface Pathway {
  /** Identifiant d'URL → /parcours/[id]. */
  id: string;
  /** Objectif formulé côté personne (mieux-être, jamais pathologie). */
  goal: string;
  /** Accroche douce. */
  pitch: string;
  iconName: string;
  accent: Accent;
  steps: PathwayStep[];
}

export const PATHWAYS: Pathway[] = [
  {
    id: "apprivoiser-anxiete",
    goal: "Apprivoiser l'anxiété",
    pitch: "Mieux comprendre l'inquiétude et lui redonner sa juste place, pas à pas.",
    iconName: "cloud-rain",
    accent: "blue",
    steps: [
      {
        ref: "inventaire-burns-anxiete",
        why: "Faire le point sur votre anxiété récente : un repère de départ, sans jugement.",
      },
      {
        ref: "gerer-vos-inquietudes",
        why: "Apprendre à mettre l'inquiétude à sa place, plutôt qu'elle envahisse tout.",
      },
      {
        ref: "pensees-negatives",
        why: "Prendre une pensée anxieuse et l'examiner pour l'assouplir.",
      },
      {
        ref: "gaap-attaques-panique",
        why: "Si des attaques de panique surviennent, les observer après coup pour les apprivoiser.",
        optional: true,
      },
      {
        ref: "situations-evitees",
        why: "Repérer ce que l'anxiété fait éviter, et avancer pas à pas.",
        optional: true,
      },
    ],
  },
  {
    id: "mieux-dormir",
    goal: "Mieux dormir",
    pitch: "Apaiser l'esprit qui tourne le soir, pour des nuits un peu plus calmes.",
    iconName: "wind",
    accent: "blue",
    steps: [
      {
        ref: "gerer-vos-inquietudes",
        why: "Donner aux pensées qui tournent un moment dédié, loin du lit.",
      },
      {
        ref: "pensees-negatives",
        why: "Assouplir une pensée qui vous tient éveillé·e.",
      },
      {
        ref: "recovery-craig::apaiser",
        why: "Préparer, à froid, des gestes d'apaisement pour les soirs difficiles.",
        optional: true,
      },
      {
        ref: "recovery-craig::boite-ressources",
        why: "Rassembler ce qui vous calme, à garder à portée de main le soir.",
        optional: true,
      },
    ],
  },
  {
    id: "reprendre-confiance",
    goal: "Reprendre confiance",
    pitch: "Nourrir l'estime de soi et reconnaître ce sur quoi vous pouvez vous appuyer.",
    iconName: "heart",
    accent: "yellow",
    steps: [
      {
        ref: "je-suis-le-centre-de-ma-vie",
        why: "Un parcours guidé pour reconstruire l'estime, module par module.",
      },
      {
        ref: "recovery-assessment-scale",
        why: "Explorer votre sentiment de rétablissement, comme repère.",
      },
      {
        ref: "fleur-de-patricia",
        why: "Un carnet du rétablissement à explorer librement, pétale par pétale.",
        optional: true,
      },
      {
        ref: "recovery-craig::avancer",
        why: "Repérer une direction qui compte, et un tout petit pas vers elle.",
        optional: true,
      },
    ],
  },
  {
    id: "preparer-moments-difficiles",
    goal: "Préparer les moments difficiles",
    pitch: "Anticiper, au calme, ce qui pourra aider quand ça ira moins bien.",
    iconName: "shield-alert",
    accent: "red",
    steps: [
      {
        ref: "plan-de-crise",
        why: "Construire votre plan de crise : signaux, ressources, personnes de confiance.",
      },
      {
        ref: "recovery-craig::plan-mieux-etre",
        why: "Poser vos repères de mieux-être au quotidien.",
        optional: true,
      },
      {
        ref: "directives-anticipees-psychiatrie",
        why: "Exprimer à l'avance vos préférences de soin, au calme.",
        optional: true,
      },
    ],
  },
];

const bySlug = () => new Map(getCatalog().map((e) => [e.slug, e]));

/** Résout une étape en métadonnées + slices à interroger (sérialisable). */
function resolveStep(step: PathwayStep, catalog: ReturnType<typeof bySlug>): ResolvedStep {
  const sep = step.ref.indexOf("::");
  const parent = sep >= 0 ? step.ref.slice(0, sep) : step.ref;
  const segId = sep >= 0 ? step.ref.slice(sep + 2) : null;
  const def = getDefinition(parent);
  const entry = catalog.get(parent);

  // Étape pointant vers un segment précis d'un composite.
  if (segId && def && def.engine === "composite") {
    const seg = def.segments.find((s) => s.id === segId);
    if (seg) {
      return {
        ref: step.ref,
        label: seg.title,
        toolTitle: entry?.title ?? def.title,
        why: step.why,
        optional: !!step.optional,
        iconName: seg.iconName ?? def.iconName,
        accent: def.accent,
        href: `/outils/${parent}`,
        checks: [{ sliceKey: segmentSlug(parent, segId), engine: seg.ref.engine }],
        available: true,
      };
    }
  }

  // Étape pointant vers un outil entier.
  let checks: StepCheck[] = [];
  if (def) {
    if (def.engine === "composite") {
      checks = def.segments.map((s) => ({
        sliceKey: segmentSlug(parent, s.id),
        engine: s.ref.engine as LeafEngine,
      }));
    } else {
      checks = [{ sliceKey: parent, engine: def.engine as LeafEngine }];
    }
  }
  return {
    ref: step.ref,
    label: entry?.shortTitle ?? entry?.title ?? parent,
    toolTitle: entry?.title ?? parent,
    why: step.why,
    optional: !!step.optional,
    iconName: entry?.iconName ?? "compass",
    accent: entry?.accent ?? "blue",
    href: `/outils/${parent}`,
    checks,
    available: !!def,
  };
}

export function getPathway(id: string): Pathway | undefined {
  return PATHWAYS.find((p) => p.id === id);
}

export function allPathwayIds(): string[] {
  return PATHWAYS.map((p) => p.id);
}

export interface ResolvedPathway {
  id: string;
  goal: string;
  pitch: string;
  iconName: string;
  accent: Accent;
  steps: ResolvedStep[];
}

export function resolvePathway(id: string): ResolvedPathway | undefined {
  const p = getPathway(id);
  if (!p) return undefined;
  const catalog = bySlug();
  return {
    id: p.id,
    goal: p.goal,
    pitch: p.pitch,
    iconName: p.iconName,
    accent: p.accent,
    steps: p.steps.map((s) => resolveStep(s, catalog)),
  };
}

/** Données légères pour les cartes d'accueil et le mégamenu. */
export interface PathwaySummary {
  id: string;
  goal: string;
  pitch: string;
  iconName: string;
  accent: Accent;
  stepCount: number;
}

export function getPathwaySummaries(): PathwaySummary[] {
  return PATHWAYS.map((p) => ({
    id: p.id,
    goal: p.goal,
    pitch: p.pitch,
    iconName: p.iconName,
    accent: p.accent,
    stepCount: p.steps.length,
  }));
}
