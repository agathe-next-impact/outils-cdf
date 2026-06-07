import type { CompositeDefinition } from "@/engines/composite/types";
import type { WorksheetBody } from "@/engines/worksheet/types";
import type { WizardBody } from "@/engines/wizard/types";

const comprendre: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "L'inquiétude est une tentative de l'esprit pour anticiper et se protéger. Elle devient " +
        "épuisante quand elle tourne en boucle. Cet espace propose d'apprendre à l'apprivoiser, " +
        "doucement.",
    },
    {
      kind: "callout",
      tone: "info",
      text:
        "On distingue souvent les inquiétudes « pratiques » (on peut agir) des inquiétudes " +
        "« hypothétiques » (des « et si… » sur lesquels on n'a pas de prise).",
    },
  ],
  documentTitle: "Comprendre mon inquiétude",
  sections: [
    {
      id: "compr",
      title: "Faire le point",
      fields: [
        {
          id: "principale",
          type: "longText",
          label: "Qu'est-ce qui vous inquiète le plus en ce moment ?",
        },
        {
          id: "impact",
          type: "longText",
          label: "Comment l'inquiétude pèse-t-elle sur votre quotidien ?",
        },
      ],
    },
  ],
};

const journal: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Quand une inquiétude surgit en dehors de votre « moment dédié », notez-la ici en une " +
        "ligne, puis laissez-la de côté jusqu'au moment prévu.",
    },
  ],
  documentTitle: "Mon journal d'inquiétudes",
  sections: [
    {
      id: "journal",
      title: "Mes inquiétudes",
      tables: [
        {
          id: "worries",
          label: "Inquiétudes notées",
          addLabel: "Noter une inquiétude",
          emptyLabel: "Notez ici une inquiétude lorsqu'elle surgit.",
          timestamped: true,
          columns: [
            { id: "situation", type: "shortText", label: "Situation" },
            { id: "pensee", type: "shortText", label: "L'inquiétude" },
            { id: "peur", type: "shortText", label: "Ce que je crains" },
            {
              id: "type",
              type: "select",
              label: "Type",
              options: [
                { value: "pratique", label: "Pratique — je peux agir" },
                { value: "hypothetique", label: "Hypothétique — « et si… »" },
                { value: "peu", label: "Pas si importante" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const periode: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Réservez chaque jour un court moment dédié à vos inquiétudes. En dehors de ce moment, " +
        "vous reportez les inquiétudes (dans le journal) plutôt que de les suivre tout de suite.",
    },
  ],
  steps: [
    {
      id: "planifier",
      title: "Planifier mon moment",
      fields: [
        { id: "heure", type: "time", label: "À quelle heure ?" },
        { id: "duree", type: "number", label: "Durée (minutes)", min: 5, max: 60, step: 5 },
        {
          id: "jours",
          type: "multiSelect",
          label: "Quels jours ?",
          options: [
            { value: "lun", label: "Lun" },
            { value: "mar", label: "Mar" },
            { value: "mer", label: "Mer" },
            { value: "jeu", label: "Jeu" },
            { value: "ven", label: "Ven" },
            { value: "sam", label: "Sam" },
            { value: "dim", label: "Dim" },
          ],
        },
      ],
    },
    {
      id: "pendant",
      title: "Pendant le moment dédié",
      intro: [
        {
          kind: "paragraph",
          text:
            "Relisez les inquiétudes notées. Pour chacune : est-elle encore d'actualité ? Pratique " +
            "ou hypothétique ? Beaucoup auront perdu de leur force.",
        },
      ],
      fields: [
        { id: "observations", type: "longText", label: "Ce que je remarque en les relisant" },
      ],
    },
    {
      id: "apres",
      title: "Ce que j'en retire",
      fields: [
        {
          id: "apprentissage",
          type: "longText",
          label: "Qu'ai-je appris en reportant mes inquiétudes ?",
        },
      ],
    },
  ],
  reward: { confetti: false, message: "Vous avez posé un cadre pour vos inquiétudes." },
};

const resolution: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Pour les inquiétudes pratiques, la résolution de problèmes aide à passer de la rumination " +
        "à l'action, étape par étape.",
    },
  ],
  steps: [
    {
      id: "probleme",
      title: "1. Le problème pratique",
      fields: [
        { id: "probleme", type: "longText", label: "Quel est le problème concret derrière l'inquiétude ?" },
      ],
    },
    {
      id: "objectif",
      title: "2. Mon objectif",
      fields: [{ id: "objectif", type: "shortText", label: "Qu'est-ce que je veux obtenir ?" }],
    },
    {
      id: "solutions",
      title: "3. Des idées de solutions",
      fields: [
        {
          id: "solutions",
          type: "repeatableList",
          label: "Toutes les idées, même imparfaites",
          addLabel: "Ajouter une idée",
          itemSchema: [{ id: "solution", type: "shortText", label: "Solution" }],
        },
      ],
    },
    {
      id: "peser",
      title: "4. Avantages et inconvénients",
      fields: [
        {
          id: "evaluations",
          type: "repeatableList",
          label: "Pour les pistes retenues",
          addLabel: "Évaluer une piste",
          itemSchema: [
            { id: "solution", type: "shortText", label: "Solution" },
            { id: "pros", type: "longText", label: "Avantages" },
            { id: "cons", type: "longText", label: "Inconvénients" },
          ],
        },
      ],
    },
    {
      id: "agir",
      title: "5. Passer à l'action",
      fields: [
        {
          id: "action",
          type: "shortText",
          label: "La première action concrète",
          placeholder: "Ex. Envoyer un mail au bailleur jeudi matin.",
        },
      ],
      pitfalls: [
        {
          id: "worry-behavior",
          appliesToFieldId: "action",
          detector: "containsWorryBehavior",
          message:
            "Vérifier, se rassurer ou tout planifier peut soulager à court terme, mais nourrit souvent l'inquiétude. Une action plus durable est-elle possible ?",
        },
        {
          id: "no-verb",
          appliesToFieldId: "action",
          detector: "missingActionVerb",
          message: "Commencer par un verbe d'action rend l'étape plus facile à enclencher.",
        },
      ],
    },
    {
      id: "evaluer",
      title: "6. Faire le point",
      fields: [{ id: "bilan", type: "longText", label: "Une fois essayé : qu'est-ce que ça a donné ?" }],
    },
  ],
  reward: { confetti: true, message: "Vous avez transformé une inquiétude en plan d'action." },
};

export const gererVosInquietudes: CompositeDefinition = {
  engine: "composite",
  dominant: "wizard",
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
  intro: [
    {
      kind: "paragraph",
      text:
        "Quatre modules, à explorer librement et dans l'ordre que vous voulez, pour comprendre et " +
        "apprivoiser l'inquiétude.",
    },
  ],
  segments: [
    { id: "comprendre", title: "Comprendre l'inquiétude", iconName: "lightbulb", summary: "Faire le point sur ce qui vous inquiète.", optional: true, ref: { engine: "worksheet", body: comprendre } },
    { id: "journal", title: "Mon journal d'inquiétudes", iconName: "notebook-pen", summary: "Noter et reporter les inquiétudes.", optional: true, ref: { engine: "worksheet", body: journal } },
    { id: "periode", title: "Ma période d'inquiétude", iconName: "calendar-clock", summary: "Un moment dédié, chaque jour.", optional: true, ref: { engine: "wizard", body: periode } },
    { id: "resolution", title: "Résoudre un problème", iconName: "target", summary: "Passer de la rumination à l'action.", optional: true, ref: { engine: "wizard", body: resolution } },
  ],
};
