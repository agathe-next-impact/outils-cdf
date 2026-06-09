import type { WorksheetDefinition } from "@/engines/worksheet/types";

export const gaapAttaquesPanique: WorksheetDefinition = {
  engine: "worksheet",
  slug: "gaap-attaques-panique",
  title: "Grille d'auto-observation des attaques de panique",
  shortTitle: "Attaques de panique",
  category: "carnets",
  iconName: "wind",
  accent: "red",
  summary: "Noter après coup le contexte, les sensations et les pensées.",
  keywords: ["attaques de panique", "panique", "crise d'angoisse", "anxiété", "peur", "sensations physiques", "auto-observation", "journal"],
  estimatedMinutes: 8,
  sensitivity: "high",
  sourceCredit: "D'après la grille d'auto-observation des attaques de panique",
  disclaimerKey: "default",
  crisisLevel: "elevated",

  documentTitle: "Mes attaques de panique",
  intro: [
    {
      kind: "paragraph",
      text:
        "Après une attaque de panique, et seulement quand tu te sens prêt, tu peux " +
        "noter ce qui s'est passé. Observer après coup aide souvent à mieux comprendre, sans " +
        "jugement.",
    },
    {
      kind: "callout",
      tone: "attention",
      text:
        "Si une attaque est en cours, cet outil n'est pas une urgence à remplir. Respire, et " +
        "appuie-toi sur les ressources en bas de page si besoin.",
    },
  ],
  sections: [
    {
      id: "entrees",
      title: "Mes observations",
      tables: [
        {
          id: "entries",
          label: "Épisodes observés",
          addLabel: "Noter un épisode",
          emptyLabel: "Tu pourras noter ici un épisode, quand tu le souhaiteras.",
          timestamped: true,
          columns: [
            { id: "contexte", type: "shortText", label: "Contexte (où, quand, avec qui)" },
            { id: "declencheur", type: "shortText", label: "Déclencheur éventuel" },
            {
              id: "sensations",
              type: "longText",
              label: "Sensations physiques",
              help: "Ex. cœur qui bat, souffle court, vertiges, sueurs, tremblements, nausée, sensation d'irréalité…",
            },
            {
              id: "pensees",
              type: "longText",
              label: "Pensées (avant, pendant, après)",
            },
            {
              id: "intensite",
              type: "slider",
              label: "Intensité",
              min: 0,
              max: 10,
              minLabel: "0",
              maxLabel: "10",
            },
            { id: "duree", type: "shortText", label: "Durée approximative" },
          ],
        },
      ],
    },
  ],
};
