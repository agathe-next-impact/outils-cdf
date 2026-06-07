/**
 * Registre des définitions d'outils IMPLÉMENTÉES.
 * Les outils sont ajoutés ici au fur et à mesure des phases. La route
 * dynamique et le SSG (generateStaticParams) en dérivent.
 */
import type { ToolDefinition } from "./definition";
import { inventaireBurnsAnxiete } from "@/data/tools/inventaire-burns-anxiete/definition";
import { recoveryAssessmentScale } from "@/data/tools/recovery-assessment-scale/definition";
import { penseesNegatives } from "@/data/tools/pensees-negatives/definition";
import { resolutionProblemes } from "@/data/tools/resolution-problemes/definition";
import { situationsEvitees } from "@/data/tools/situations-evitees/definition";
import { gaapAttaquesPanique } from "@/data/tools/gaap-attaques-panique/definition";
import { planDeCrise } from "@/data/tools/plan-de-crise/definition";
import { directivesAnticipeesPsychiatrie } from "@/data/tools/directives-anticipees-psychiatrie/definition";
import { gererVosInquietudes } from "@/data/tools/gerer-vos-inquietudes/definition";
import { jeSuisLeCentreDeMaVie } from "@/data/tools/je-suis-le-centre-de-ma-vie/definition";
import { fleurDePatricia } from "@/data/tools/fleur-de-patricia/definition";
import { dealingWithPsychosis } from "@/data/tools/dealing-with-psychosis/definition";
import { recoveryCraig } from "@/data/tools/recovery-craig/definition";
import { escape } from "@/data/tools/escape/definition";

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  inventaireBurnsAnxiete,
  recoveryAssessmentScale,
  penseesNegatives,
  resolutionProblemes,
  situationsEvitees,
  gaapAttaquesPanique,
  planDeCrise,
  directivesAnticipeesPsychiatrie,
  gererVosInquietudes,
  jeSuisLeCentreDeMaVie,
  fleurDePatricia,
  dealingWithPsychosis,
  recoveryCraig,
  escape,
];

const BY_SLUG = new Map<string, ToolDefinition>(
  TOOL_DEFINITIONS.map((d) => [d.slug, d])
);

export function getDefinition(slug: string): ToolDefinition | undefined {
  return BY_SLUG.get(slug);
}

export function allSlugs(): string[] {
  return TOOL_DEFINITIONS.map((d) => d.slug);
}
