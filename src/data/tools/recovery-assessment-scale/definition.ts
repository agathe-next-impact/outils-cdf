import type { ScoredDefinition, ScoredItem } from "@/engines/scored/types";

const LIKERT = "likert";

/** Les 24 affirmations de la RAS, regroupées en 5 dimensions exploratoires. */
const ITEMS_RAW: { label: string; group: string; sub: string }[] = [
  // 1. Confiance et espoir personnels
  { sub: "confiance-espoir", group: "Confiance et espoir", label: "J'ai envie de réussir ma vie." },
  { sub: "confiance-espoir", group: "Confiance et espoir", label: "J'ai ma propre idée de ce que je veux devenir." },
  { sub: "confiance-espoir", group: "Confiance et espoir", label: "J'ai des buts dans la vie que je veux atteindre." },
  { sub: "confiance-espoir", group: "Confiance et espoir", label: "Je crois pouvoir atteindre mes objectifs actuels." },
  { sub: "confiance-espoir", group: "Confiance et espoir", label: "J'ai confiance en moi." },
  { sub: "confiance-espoir", group: "Confiance et espoir", label: "Je peux gérer ce qui m'arrive." },
  { sub: "confiance-espoir", group: "Confiance et espoir", label: "J'aime me retrouver avec moi-même." },
  { sub: "confiance-espoir", group: "Confiance et espoir", label: "Même quand je ne crois pas en moi, les autres y croient." },
  { sub: "confiance-espoir", group: "Confiance et espoir", label: "Il est important d'avoir des activités qui me plaisent." },
  // 2. Volonté de demander de l'aide
  { sub: "demander-aide", group: "Demander de l'aide", label: "Je peux demander de l'aide quand j'en ai besoin." },
  { sub: "demander-aide", group: "Demander de l'aide", label: "Demander de l'aide ne me met pas mal à l'aise." },
  { sub: "demander-aide", group: "Demander de l'aide", label: "Je sais à qui m'adresser pour obtenir de l'aide." },
  // 3. Confiance en l'orientation et le rétablissement
  { sub: "orientation", group: "Orientation et avenir", label: "J'ai des personnes sur qui je peux compter." },
  { sub: "orientation", group: "Orientation et avenir", label: "Même si mes symptômes reviennent, tout ira bien." },
  { sub: "orientation", group: "Orientation et avenir", label: "Je continue d'avoir de nouveaux centres d'intérêt." },
  { sub: "orientation", group: "Orientation et avenir", label: "Je sais quand demander de l'aide." },
  { sub: "orientation", group: "Orientation et avenir", label: "Je suis prêt·e à demander de l'aide." },
  // 4. Ne pas se laisser dominer par les symptômes
  { sub: "symptomes", group: "Faire face aux symptômes", label: "Les symptômes interfèrent de moins en moins avec ma vie." },
  { sub: "symptomes", group: "Faire face aux symptômes", label: "Mes symptômes semblent poser de moins en moins problème." },
  { sub: "symptomes", group: "Faire face aux symptômes", label: "Je peux gérer mes symptômes." },
  // 5. Soutien des autres
  { sub: "soutien", group: "Soutien social", label: "J'ai des personnes qui croient en moi." },
  { sub: "soutien", group: "Soutien social", label: "Il est important de faire partie d'une communauté." },
  { sub: "soutien", group: "Soutien social", label: "Je sais que des aides et des services existent pour moi." },
  { sub: "soutien", group: "Soutien social", label: "Avoir une raison d'être, un sens, m'aide à avancer." },
];

const items: ScoredItem[] = ITEMS_RAW.map((it, i) => ({
  id: `q${i + 1}`,
  label: it.label,
  group: it.group,
  scaleId: LIKERT,
}));

function subItemIds(sub: string): string[] {
  return ITEMS_RAW.map((it, i) => ({ it, id: `q${i + 1}` }))
    .filter((x) => x.it.sub === sub)
    .map((x) => x.id);
}

export const recoveryAssessmentScale: ScoredDefinition = {
  engine: "scored",
  slug: "recovery-assessment-scale",
  title: "Échelle de rétablissement (RAS)",
  shortTitle: "Échelle RAS",
  category: "questionnaires",
  iconName: "sprout",
  accent: "yellow",
  summary: "24 affirmations pour explorer votre sentiment de rétablissement.",
  keywords: ["rétablissement", "recovery", "espoir", "estime de soi", "confiance en soi", "objectifs de vie", "questionnaire", "empowerment"],
  estimatedMinutes: 7,
  sensitivity: "low",
  sourceCredit: "D'après la Recovery Assessment Scale (Corrigan et al.)",
  disclaimerKey: "questionnaire",
  crisisLevel: "standard",

  referencePeriod: "Pensez à la façon dont vous vous sentez en ce moment.",
  intro: [
    {
      kind: "paragraph",
      text:
        "Cette échelle explore votre sentiment de rétablissement : confiance, espoir, soutien, " +
        "rapport aux symptômes. Pour chaque affirmation, indiquez votre degré d'accord.",
    },
    {
      kind: "callout",
      tone: "info",
      text:
        "Le rétablissement est un cheminement personnel : il n'y a ni bon ni mauvais score, " +
        "seulement un repère pour vous.",
    },
  ],
  scales: [
    {
      id: LIKERT,
      options: [
        { value: 1, label: "Pas du tout d'accord" },
        { value: 2, label: "Plutôt pas d'accord" },
        { value: 3, label: "Ni d'accord ni pas d'accord" },
        { value: 4, label: "Plutôt d'accord" },
        { value: 5, label: "Tout à fait d'accord" },
      ],
    },
  ],
  items,
  scoring: {
    method: "sum",
    showMeanAndPercent: true,
    bandBasis: "mean",
    bands: [
      {
        code: "emerging",
        min: 1,
        max: 2.49,
        label: "Rétablissement en cheminement",
        tone: "neutral",
        guidance:
          "Beaucoup de choses restent peut-être difficiles en ce moment. Avancer pas à pas, accompagné·e, a tout son sens.",
      },
      {
        code: "developing",
        min: 2.5,
        max: 3.49,
        label: "Rétablissement en construction",
        tone: "neutral",
        guidance:
          "Des appuis se dessinent. Repérer ce qui vous aide déjà peut renforcer ce mouvement.",
      },
      {
        code: "strong",
        min: 3.5,
        max: 5,
        label: "Rétablissement bien engagé",
        tone: "neutral",
        guidance:
          "Vous identifiez de nombreux appuis (confiance, soutien, sens). Ce sont des forces sur lesquelles continuer de vous appuyer.",
      },
    ],
    subscores: [
      { id: "confiance-espoir", label: "Confiance et espoir personnels", itemIds: subItemIds("confiance-espoir"), official: false },
      { id: "demander-aide", label: "Volonté de demander de l'aide", itemIds: subItemIds("demander-aide"), official: false },
      { id: "orientation", label: "Orientation et avenir", itemIds: subItemIds("orientation"), official: false },
      { id: "symptomes", label: "Faire face aux symptômes", itemIds: subItemIds("symptomes"), official: false },
      { id: "soutien", label: "Soutien social", itemIds: subItemIds("soutien"), official: false },
    ],
  },
  allowIncomplete: false,
};
