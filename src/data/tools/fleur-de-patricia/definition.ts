import type { CompositeDefinition, CompositeSegment } from "@/engines/composite/types";
import type { WorksheetBody } from "@/engines/worksheet/types";
import type { ContentBlock } from "@/engines/content";
import type { FieldDef } from "@/engines/fields";

interface Petale {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  intro: ContentBlock[];
  fields: FieldDef[];
}

const PETALES: Petale[] = [
  {
    id: "histoire",
    title: "Mon histoire",
    iconName: "book-open",
    summary: "D'où je viens, ce que j'ai traversé.",
    intro: [{ kind: "paragraph", text: "Ton parcours t'appartient. L'écrire peut aider à en reprendre le fil." }],
    fields: [{ id: "histoire", type: "longText", label: "Ce que je souhaite raconter de mon histoire" }],
  },
  {
    id: "definitions",
    title: "Ma définition du rétablissement",
    iconName: "compass",
    summary: "Ce que « se rétablir » veut dire pour moi.",
    intro: [{ kind: "paragraph", text: "Le rétablissement ne veut pas dire la même chose pour tout le monde. Quelle est ta définition ?" }],
    fields: [{ id: "definition", type: "longText", label: "Pour moi, me rétablir, c'est…" }],
  },
  {
    id: "espoir",
    title: "L'espoir",
    iconName: "sunrise",
    summary: "Ce qui me donne envie d'avancer.",
    intro: [{ kind: "paragraph", text: "L'espoir est un moteur du rétablissement. Il peut tenir à de petites choses." }],
    fields: [
      { id: "espoir", type: "longText", label: "Ce qui me donne de l'espoir" },
      { id: "reve", type: "shortText", label: "Un rêve, même petit" },
    ],
  },
  {
    id: "amour-amitie",
    title: "Amour & amitié",
    iconName: "heart",
    summary: "Les liens qui comptent.",
    intro: [{ kind: "paragraph", text: "Les relations qui nous soutiennent font partie du chemin." }],
    fields: [{ id: "liens", type: "longText", label: "Les personnes et les liens qui me font du bien" }],
  },
  {
    id: "entraide",
    title: "Entraide & pair-aidance",
    iconName: "heart-handshake",
    summary: "Donner et recevoir entre pairs.",
    intro: [{ kind: "paragraph", text: "Échanger avec des personnes qui ont vécu des choses proches peut beaucoup apporter." }],
    fields: [{ id: "entraide", type: "longText", label: "Ce que l'entraide m'apporte (ou pourrait m'apporter)" }],
  },
  {
    id: "guerison",
    title: "Guérison ≠ rétablissement",
    iconName: "leaf",
    summary: "Avancer même sans « tout régler ».",
    intro: [{ kind: "paragraph", text: "On peut se rétablir, c'est-à-dire vivre une vie qui a du sens, sans forcément que tout disparaisse." }],
    fields: [{ id: "reflexion", type: "longText", label: "Ce que cette distinction m'évoque" }],
  },
  {
    id: "clinique",
    title: "Le rétablissement clinique",
    iconName: "stethoscope",
    summary: "Soins et symptômes.",
    intro: [{ kind: "paragraph", text: "Le suivi de santé fait partie du tableau, à côté du rétablissement personnel." }],
    fields: [{ id: "soins", type: "longText", label: "Ce qui m'aide côté soins / suivi" }],
  },
  {
    id: "pouvoir-agir",
    title: "Le pouvoir d'agir",
    iconName: "flag",
    summary: "Reprendre des décisions.",
    intro: [{ kind: "paragraph", text: "Reprendre la main sur des choix, même petits, renforce le sentiment de pouvoir agir." }],
    fields: [{ id: "decisions", type: "longText", label: "Une décision que je veux reprendre en main" }],
  },
  {
    id: "boite-outils",
    title: "Ma boîte à outils",
    iconName: "list-checks",
    summary: "Mes stratégies qui marchent.",
    intro: [{ kind: "paragraph", text: "Quelles stratégies t'aident à aller mieux ou à tenir bon ?" }],
    fields: [{ id: "outils", type: "tagList", label: "Mes stratégies (un mot chacune)", help: "Respiration, marche, musique, appeler un proche…" }],
  },
  {
    id: "professionnels",
    title: "Les professionnels",
    iconName: "users",
    summary: "Mon réseau de soutien.",
    intro: [{ kind: "paragraph", text: "Repérer qui peut t'aider, et comment, peut être précieux." }],
    fields: [{ id: "reseau", type: "longText", label: "Les professionnels et services sur lesquels je peux m'appuyer" }],
  },
  {
    id: "inclusion",
    title: "L'inclusion sociale",
    iconName: "sprout",
    summary: "Ma place parmi les autres.",
    intro: [{ kind: "paragraph", text: "Avoir une place, des activités, un rôle qui a du sens, nourrit le rétablissement." }],
    fields: [
      { id: "place", type: "longText", label: "Les activités, lieux ou rôles qui me donnent une place" },
      { id: "envie", type: "shortText", label: "Une chose que j'aimerais (re)commencer" },
    ],
  },
];

function petaleBody(p: Petale): WorksheetBody {
  return {
    intro: p.intro,
    documentTitle: p.title,
    sections: [{ id: p.id, title: p.title, fields: p.fields }],
  };
}

const segments: CompositeSegment[] = PETALES.map((p) => ({
  id: p.id,
  title: p.title,
  iconName: p.iconName,
  summary: p.summary,
  optional: true,
  ref: { engine: "worksheet", body: petaleBody(p) },
}));

export const fleurDePatricia: CompositeDefinition = {
  engine: "composite",
  dominant: "worksheet",
  slug: "fleur-de-patricia",
  title: "La Fleur de Patricia",
  category: "carnets",
  iconName: "flower",
  accent: "yellow",
  summary: "Un carnet du rétablissement en pétales, à explorer librement.",
  keywords: ["rétablissement", "recovery", "bien-être", "équilibre de vie", "dimensions de vie", "espoir", "estime de soi", "journal"],
  estimatedMinutes: 20,
  sensitivity: "medium",
  sourceCredit: "D'après « La Fleur de Patricia », carnet du rétablissement",
  disclaimerKey: "retablissement",
  crisisLevel: "standard",
  intro: [
    {
      kind: "paragraph",
      text:
        "Chaque pétale est une facette du rétablissement. Ouvre ceux qui te parlent, dans " +
        "l'ordre que tu veux. Rien n'est obligatoire : tu es au centre de ta fleur.",
    },
    {
      kind: "callout",
      tone: "info",
      text: "Aucune pression, aucun rythme attendu. Tu peux laisser des pétales de côté.",
    },
  ],
  segments,
};
