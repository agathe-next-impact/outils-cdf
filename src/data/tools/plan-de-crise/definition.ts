import type { WorksheetDefinition } from "@/engines/worksheet/types";

export const planDeCrise: WorksheetDefinition = {
  engine: "worksheet",
  slug: "plan-de-crise",
  title: "Mon plan de crise",
  category: "carnets",
  iconName: "shield-alert",
  accent: "red",
  summary: "Anticiper une crise : signaux, ressources et personnes de confiance.",
  keywords: ["crise", "plan de crise", "plan de sécurité", "signaux d'alerte", "personnes de confiance", "prévention", "urgence", "plaidoyer"],
  estimatedMinutes: 20,
  sensitivity: "high",
  sourceCredit: "D'après les modèles de plan de crise en santé mentale",
  disclaimerKey: "crise",
  crisisLevel: "elevated",

  documentTitle: "Mon plan de crise",
  intro: [
    {
      kind: "paragraph",
      text:
        "Ce document vous aide à préparer, au calme, ce qui pourrait vous aider en cas de crise. " +
        "Vous le remplissez comme vous le souhaitez et il vous appartient entièrement.",
    },
    {
      kind: "callout",
      tone: "attention",
      text:
        "En cas de danger immédiat, n'attendez pas : utilisez les ressources d'urgence en bas de page.",
    },
  ],
  sections: [
    {
      id: "signaux",
      title: "Mes signaux d'alerte",
      fields: [
        {
          id: "declencheurs",
          type: "longText",
          label: "Qu'est-ce qui peut déclencher une crise chez moi ?",
          help: "Situations, contextes, événements…",
        },
        {
          id: "signesPrecoces",
          type: "longText",
          label: "Quels signes m'avertissent qu'une crise approche ?",
          help: "Pensées, émotions, comportements, sensations.",
        },
      ],
    },
    {
      id: "ce-qui-aide",
      title: "Ce qui m'aide",
      tables: [
        {
          id: "ressentisActions",
          label: "Quand je ressens… je peux…",
          addLabel: "Ajouter une ligne",
          columns: [
            { id: "ressenti", type: "shortText", label: "Quand je ressens" },
            { id: "action", type: "shortText", label: "Ce qui m'aide alors" },
          ],
        },
      ],
      fields: [
        {
          id: "strategiesPerso",
          type: "longText",
          label: "Mes stratégies personnelles d'apaisement",
          help: "Respiration, musique, marche, contact d'un proche…",
        },
      ],
    },
    {
      id: "personnes",
      title: "Mes personnes de confiance",
      tables: [
        {
          id: "contacts",
          label: "Personnes à contacter",
          addLabel: "Ajouter une personne",
          columns: [
            { id: "nom", type: "shortText", label: "Nom / prénom" },
            { id: "lien", type: "shortText", label: "Lien (proche, soignant…)" },
            { id: "tel", type: "shortText", label: "Téléphone" },
          ],
        },
      ],
    },
    {
      id: "traitements",
      title: "Mes traitements actuels",
      tables: [
        {
          id: "traitements",
          label: "Traitements",
          addLabel: "Ajouter un traitement",
          emptyLabel: "À remplir si cela vous concerne.",
          columns: [
            { id: "nom", type: "shortText", label: "Traitement" },
            { id: "posologie", type: "shortText", label: "Posologie" },
            { id: "note", type: "shortText", label: "Remarque" },
          ],
        },
      ],
    },
    {
      id: "lieux",
      title: "Lieux de soin",
      tables: [
        {
          id: "lieux",
          label: "Lieux et contacts utiles",
          addLabel: "Ajouter un lieu",
          columns: [
            { id: "lieu", type: "shortText", label: "Lieu (CMP, hôpital, médecin…)" },
            { id: "contact", type: "shortText", label: "Contact / téléphone" },
          ],
        },
      ],
    },
    {
      id: "a-eviter",
      title: "À éviter quand je vais mal",
      fields: [
        {
          id: "aEviter",
          type: "longText",
          label: "Décisions ou attitudes à éviter en période de crise",
          help: "Ce que je sais ne pas m'aider, pour m'en souvenir.",
        },
      ],
    },
  ],
};
