import type { CompositeDefinition } from "@/engines/composite/types";
import type { ScoredBody, ScoredItem } from "@/engines/scored/types";
import type { WizardBody } from "@/engines/wizard/types";
import type { WorksheetBody } from "@/engines/worksheet/types";

/* --- Segment A : auto-évaluation de l'estime de soi (inspirée de Rosenberg) --- */
const ESTEEM_ITEMS: { label: string; reverse?: boolean }[] = [
  { label: "Dans l'ensemble, je suis satisfait·e de moi." },
  { label: "Par moments, je pense que je ne vaux pas grand-chose.", reverse: true },
  { label: "Je pense avoir un certain nombre de qualités." },
  { label: "Je suis capable de faire les choses aussi bien que la plupart des gens." },
  { label: "J'ai l'impression d'avoir peu de raisons d'être fier·ère de moi.", reverse: true },
  { label: "Il m'arrive de me sentir vraiment inutile.", reverse: true },
  { label: "J'estime être quelqu'un de valable, au moins autant que les autres." },
  { label: "J'aimerais avoir plus de respect pour moi-même.", reverse: true },
  { label: "Tout bien considéré, j'ai tendance à me sentir en échec.", reverse: true },
  { label: "J'ai une attitude positive vis-à-vis de moi-même." },
];

const esteemItems: ScoredItem[] = ESTEEM_ITEMS.map((it, i) => ({
  id: `e${i + 1}`,
  label: it.label,
  reverse: it.reverse,
  scaleId: "accord",
}));

const estime: ScoredBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Cette auto-évaluation offre un repère sur ton estime de toi, à un instant donné. " +
        "Tu pourras la refaire plus tard pour observer une évolution.",
    },
  ],
  scales: [
    {
      id: "accord",
      options: [
        { value: 1, label: "Tout à fait en désaccord" },
        { value: 2, label: "Plutôt en désaccord" },
        { value: 3, label: "Plutôt d'accord" },
        { value: 4, label: "Tout à fait d'accord" },
      ],
    },
  ],
  items: esteemItems,
  scoring: {
    method: "sum",
    bandBasis: "sum",
    bands: [
      {
        code: "fragile",
        min: 10,
        max: 25,
        label: "Estime de soi en construction",
        tone: "neutral",
        guidance:
          "L'estime de soi se cultive, elle n'est pas figée. Les modules qui suivent proposent des pistes douces.",
      },
      {
        code: "moyenne",
        min: 26,
        max: 32,
        label: "Estime de soi moyenne",
        tone: "neutral",
        guidance: "Des appuis existent déjà. Les modules peuvent les renforcer.",
      },
      {
        code: "bonne",
        min: 33,
        max: 40,
        label: "Estime de soi plutôt solide",
        tone: "neutral",
        guidance: "Une belle base sur laquelle continuer de prendre soin de toi.",
      },
    ],
  },
  allowIncomplete: false,
};

/* --- Segment B : modules guidés --- */
const modules: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Quelques temps d'écriture pour mieux te connaître et reprendre ta place au centre de " +
        "ta vie. Il n'y a pas de bonne réponse.",
    },
  ],
  steps: [
    {
      id: "comprendre",
      title: "Comprendre mon estime de moi",
      fields: [
        { id: "definition", type: "longText", label: "Pour moi, avoir de l'estime pour soi, c'est…" },
        { id: "moments", type: "longText", label: "Dans quels moments est-ce le plus fragile ?" },
      ],
    },
    {
      id: "pensees",
      title: "Repérer mes pensées dures",
      intro: [
        {
          kind: "example",
          good: "« J'ai fait une erreur sur ce dossier. » (un fait)",
          avoid: "« Je suis nul. » (un jugement global)",
        },
      ],
      fields: [
        { id: "critique", type: "longText", label: "Quelle phrase dure est-ce que je me répète ?" },
        { id: "reformulation", type: "longText", label: "Comment la dirais-je à une personne que j'aime ?" },
      ],
    },
    {
      id: "compassion",
      title: "Cultiver l'auto-compassion",
      fields: [
        {
          id: "geste",
          type: "shortText",
          label: "Un petit geste bienveillant que je peux m'offrir cette semaine",
        },
      ],
    },
    {
      id: "forces",
      title: "Reconnaître mes forces",
      fields: [
        {
          id: "forces",
          type: "tagList",
          label: "Mes qualités et forces (un mot chacune)",
          help: "Même les petites comptent.",
        },
        { id: "fierte", type: "longText", label: "Un moment dont je suis fier" },
      ],
    },
    {
      id: "besoins",
      title: "Affirmer mes besoins",
      fields: [
        { id: "besoin", type: "longText", label: "Un besoin que j'ai du mal à exprimer" },
        { id: "phrase", type: "shortText", label: "Une phrase pour l'exprimer simplement" },
      ],
    },
    {
      id: "plan",
      title: "Mon pas en avant",
      fields: [
        {
          id: "action",
          type: "shortText",
          label: "Une petite action concrète, à ma portée",
          placeholder: "Ex. Dire non à une demande de trop, lundi.",
        },
      ],
      pitfalls: [
        {
          id: "vague",
          appliesToFieldId: "action",
          detector: "tooVague",
          message: "Plus l'action est concrète et petite, plus elle est facile à réaliser.",
        },
      ],
    },
  ],
  reward: { confetti: true, message: "Merci pour ce temps offert à toi-même." },
};

/* --- Segment C : journal anti-téflon --- */
const journal: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Le cerveau retient facilement le négatif (et laisse glisser le positif, comme sur du téflon). " +
        "Note ici les moments positifs, même minuscules, pour les ancrer.",
    },
  ],
  documentTitle: "Mon journal des bons moments",
  sections: [
    {
      id: "journal",
      title: "Mes bons moments",
      tables: [
        {
          id: "moments",
          label: "Moments positifs",
          addLabel: "Noter un moment",
          emptyLabel: "Note un premier moment agréable, même tout petit.",
          timestamped: true,
          columns: [
            { id: "moment", type: "longText", label: "Ce qui s'est passé de positif" },
            { id: "ressenti", type: "shortText", label: "Ce que ça m'a fait" },
          ],
        },
      ],
    },
  ],
};

export const jeSuisLeCentreDeMaVie: CompositeDefinition = {
  engine: "composite",
  dominant: "wizard",
  slug: "je-suis-le-centre-de-ma-vie",
  title: "Je suis le centre de ma vie",
  category: "parcours",
  iconName: "heart",
  accent: "yellow",
  summary: "Un journal guidé pour reconstruire l'estime de soi, module par module.",
  keywords: ["estime de soi", "confiance en soi", "affirmation de soi", "identité", "valeurs personnelles", "journal", "rétablissement", "empowerment"],
  estimatedMinutes: 30,
  sensitivity: "high",
  sourceCredit: "D'après le livret « Je suis le centre de ma vie » (Dr Versaevel)",
  disclaimerKey: "retablissement",
  crisisLevel: "standard",
  intro: [
    {
      kind: "paragraph",
      text:
        "Un point de départ (l'auto-évaluation), des modules d'écriture, et un journal des bons " +
        "moments. Avance librement, à ton rythme.",
    },
  ],
  segments: [
    { id: "estime", title: "Où j'en suis", iconName: "activity", summary: "Une auto-évaluation repère.", optional: true, ref: { engine: "scored", body: estime } },
    { id: "modules", title: "Les modules guidés", iconName: "compass", summary: "Six temps d'écriture.", optional: true, ref: { engine: "wizard", body: modules } },
    { id: "journal", title: "Mon journal des bons moments", iconName: "sparkles", summary: "Ancrer le positif.", optional: true, ref: { engine: "worksheet", body: journal } },
  ],
};
