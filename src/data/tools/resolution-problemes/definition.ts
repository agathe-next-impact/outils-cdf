import type { WizardDefinition } from "@/engines/wizard/types";

export const resolutionProblemes: WizardDefinition = {
  engine: "wizard",
  slug: "resolution-problemes",
  title: "Résolution de problèmes",
  category: "parcours",
  iconName: "target",
  accent: "red",
  summary: "Dix étapes pour transformer un problème en plan d'action concret.",
  keywords: ["résolution de problèmes", "prise de décision", "plan d'action", "objectifs", "solutions", "organisation", "TCC"],
  estimatedMinutes: 25,
  sensitivity: "medium",
  sourceCredit: "D'après la méthode de résolution de problèmes (J. Goulet, 2005)",
  disclaimerKey: "default",
  crisisLevel: "standard",

  intro: [
    {
      kind: "paragraph",
      text:
        "Cette démarche en dix étapes aide à clarifier un problème, à imaginer des solutions et " +
        "à les transformer en plan d'action. Vous pouvez faire une étape à la fois.",
    },
    {
      kind: "callout",
      tone: "info",
      text: "Il n'y a pas de réponse parfaite. L'idée est d'avancer, pas de tout résoudre d'un coup.",
    },
  ],
  reward: {
    confetti: true,
    message: "Vous avez transformé un problème en plan. Voici votre synthèse à conserver.",
  },
  steps: [
    {
      id: "stop",
      title: "1. Stop",
      intro: [
        {
          kind: "paragraph",
          text: "Avant d'agir à chaud, on prend un moment pour réfléchir de façon structurée.",
        },
      ],
      fields: [
        {
          id: "stopAck",
          type: "checkbox",
          label: "Je prends un moment pour réfléchir à ce problème, plutôt que d'y réagir à chaud.",
        },
      ],
    },
    {
      id: "attitude",
      title: "2. Une attitude constructive",
      fields: [
        {
          id: "reframing",
          type: "longText",
          label: "Comment formuler ce problème comme un défi à relever, plutôt qu'une menace ?",
          placeholder: "Ex. « C'est l'occasion de clarifier ce dont j'ai besoin. »",
        },
        {
          id: "confidence",
          type: "slider",
          label: "Votre confiance pour avancer, en ce moment",
          min: 1,
          max: 5,
          minLabel: "1 — faible",
          maxLabel: "5 — forte",
        },
      ],
    },
    {
      id: "define",
      title: "3. Définir le problème",
      fields: [
        {
          id: "problemStatement",
          type: "longText",
          label: "Quel est le problème, en une ou deux phrases précises ?",
          help: "Restez concret : qui, quoi, où, depuis quand.",
        },
        {
          id: "severity",
          type: "slider",
          label: "Gravité ressentie",
          min: 1,
          max: 5,
          minLabel: "1 — légère",
          maxLabel: "5 — forte",
        },
        {
          id: "urgency",
          type: "slider",
          label: "Urgence",
          min: 1,
          max: 5,
          minLabel: "1 — peut attendre",
          maxLabel: "5 — pressant",
        },
      ],
    },
    {
      id: "goals",
      title: "4. Vos objectifs",
      fields: [
        {
          id: "goals",
          type: "repeatableList",
          label: "Qu'aimeriez-vous obtenir ?",
          help: "Pour chaque objectif, un signe concret vous dira qu'il est atteint.",
          addLabel: "Ajouter un objectif",
          itemSchema: [
            { id: "description", type: "shortText", label: "Objectif" },
            { id: "successSign", type: "shortText", label: "Signe que c'est réussi" },
          ],
        },
      ],
    },
    {
      id: "solutions",
      title: "5. Des solutions possibles",
      intro: [
        {
          kind: "paragraph",
          text: "Notez toutes les idées qui vous viennent, même improbables. On les jugera après.",
        },
      ],
      fields: [
        {
          id: "solutions",
          type: "repeatableList",
          label: "Idées de solutions",
          addLabel: "Ajouter une idée",
          itemSchema: [{ id: "solution", type: "shortText", label: "Solution envisagée" }],
        },
      ],
    },
    {
      id: "weigh",
      title: "6. Avantages et inconvénients",
      fields: [
        {
          id: "evaluations",
          type: "repeatableList",
          label: "Pour les solutions les plus prometteuses",
          addLabel: "Évaluer une solution",
          itemSchema: [
            { id: "solution", type: "shortText", label: "Solution" },
            { id: "pros", type: "longText", label: "Avantages (court, moyen, long terme)" },
            { id: "cons", type: "longText", label: "Inconvénients (court, moyen, long terme)" },
          ],
        },
      ],
    },
    {
      id: "choose",
      title: "7. Choisir",
      fields: [
        {
          id: "chosen",
          type: "longText",
          label: "Quelle(s) solution(s) choisissez-vous ?",
        },
        {
          id: "rationale",
          type: "longText",
          label: "Pourquoi ce choix ? Quels compromis acceptez-vous ?",
        },
      ],
    },
    {
      id: "obstacles",
      title: "8. Obstacles et ressources",
      fields: [
        {
          id: "obstacles",
          type: "repeatableList",
          label: "Quels obstacles pourriez-vous rencontrer ?",
          addLabel: "Ajouter un obstacle",
          itemSchema: [
            { id: "obstacle", type: "shortText", label: "Obstacle" },
            { id: "parade", type: "shortText", label: "Comment le contourner" },
          ],
        },
        {
          id: "resources",
          type: "repeatableList",
          label: "Sur quelles ressources pouvez-vous compter ?",
          addLabel: "Ajouter une ressource",
          itemSchema: [{ id: "resource", type: "shortText", label: "Ressource (personne, moyen, savoir-faire)" }],
        },
      ],
    },
    {
      id: "plan",
      title: "9. Le plan d'action",
      fields: [
        {
          id: "firstAction",
          type: "shortText",
          label: "La toute première action concrète",
          help: "Précise et réalisable : un verbe, un quoi, un quand.",
          placeholder: "Ex. Appeler le secrétariat mardi à 9h.",
        },
        {
          id: "steps",
          type: "repeatableList",
          label: "Les étapes suivantes",
          addLabel: "Ajouter une étape",
          itemSchema: [
            { id: "action", type: "shortText", label: "Action" },
            { id: "when", type: "date", label: "Quand" },
            { id: "withWhom", type: "shortText", label: "Avec qui (facultatif)" },
          ],
        },
      ],
      pitfalls: [
        {
          id: "vague-first-action",
          appliesToFieldId: "firstAction",
          detector: "tooVague",
          message:
            "Une action comme « m'organiser » est difficile à commencer. Essayez quelque chose de précis : « lister les papiers en retard mardi à 9h pendant 20 minutes ».",
        },
        {
          id: "no-verb-first-action",
          appliesToFieldId: "firstAction",
          detector: "missingActionVerb",
          message:
            "Commencer par un verbe d'action (appeler, écrire, ranger, demander…) rend l'étape plus facile à enclencher.",
        },
      ],
    },
    {
      id: "review",
      title: "10. Faire le point",
      intro: [
        {
          kind: "paragraph",
          text: "Cette étape se remplit plus tard, une fois que vous aurez essayé votre plan.",
        },
      ],
      fields: [
        {
          id: "nextDecision",
          type: "select",
          label: "Après avoir essayé, que décidez-vous ?",
          options: [
            { value: "close", label: "Clore : le problème est réglé" },
            { value: "adjust", label: "Ajuster le plan" },
            { value: "more", label: "Générer d'autres solutions" },
            { value: "newcycle", label: "Relancer une démarche" },
          ],
        },
        {
          id: "lessons",
          type: "longText",
          label: "Qu'avez-vous appris ?",
        },
      ],
    },
  ],
};
