import type { WizardDefinition } from "@/engines/wizard/types";

export const penseesNegatives: WizardDefinition = {
  engine: "wizard",
  slug: "pensees-negatives",
  title: "Remettre en question les pensées négatives",
  shortTitle: "Pensées négatives",
  category: "parcours",
  iconName: "brain",
  accent: "blue",
  summary: "Un parcours en étapes pour explorer une pensée difficile autrement.",
  keywords: ["pensées négatives", "distorsions cognitives", "restructuration cognitive", "ruminations", "pensées automatiques", "recadrage", "TCC", "estime de soi"],
  estimatedMinutes: 15,
  sensitivity: "high",
  sourceCredit: "Inspiré des techniques de restructuration cognitive (TCC)",
  disclaimerKey: "default",
  crisisLevel: "standard",

  intro: [
    {
      kind: "paragraph",
      text:
        "Cet outil vous accompagne, pas à pas, pour regarder une pensée difficile sous un autre " +
        "angle. Il ne s'agit pas de « penser positif » à tout prix, mais d'examiner les faits avec " +
        "douceur.",
    },
    {
      kind: "callout",
      tone: "info",
      text: "Vous pouvez vous arrêter à tout moment et reprendre plus tard. Avancez à votre rythme.",
    },
  ],
  reward: {
    confetti: true,
    message: "Bravo d'avoir pris ce temps pour vous. Voici la synthèse de votre réflexion.",
  },
  steps: [
    {
      id: "situation",
      title: "1. La situation",
      intro: [
        { kind: "paragraph", text: "Repensez à un moment précis qui a été difficile pour vous." },
      ],
      fields: [
        {
          id: "situation",
          type: "longText",
          label: "Que s'est-il passé ?",
          help: "Décrivez le moment, le lieu, qui était là, ce qui s'est passé.",
          placeholder: "Ex. Hier soir, mon ami n'a pas répondu à mon message.",
        },
      ],
    },
    {
      id: "emotions",
      title: "2. Vos émotions",
      fields: [
        {
          id: "emotions",
          type: "tagList",
          label: "Quelles émotions avez-vous ressenties ?",
          help: "Un mot par émotion : tristesse, colère, peur, honte…",
        },
        {
          id: "emotionIntensity",
          type: "slider",
          label: "Intensité de l'émotion la plus forte",
          min: 0,
          max: 10,
          minLabel: "0 — faible",
          maxLabel: "10 — très forte",
        },
      ],
    },
    {
      id: "auto-thoughts",
      title: "3. Les pensées automatiques",
      intro: [
        {
          kind: "paragraph",
          text: "Notez les pensées qui vous sont venues, telles quelles, sans les juger.",
        },
        {
          kind: "example",
          good: "« Il n'a pas répondu à mon message depuis deux jours. » (un fait observable)",
          avoid: "« Il me rejette / je vais finir seul·e. » (une interprétation ou une prédiction)",
          note: "Un fait s'observe ; une interprétation ou une prédiction s'ajoutent au fait.",
        },
      ],
      fields: [
        {
          id: "autoThoughts",
          type: "longText",
          label: "Quelles pensées vous sont venues à l'esprit ?",
          placeholder: "Notez-les librement.",
        },
      ],
    },
    {
      id: "hot-thought",
      title: "4. La pensée la plus douloureuse",
      fields: [
        {
          id: "hotThought",
          type: "longText",
          label: "Parmi ces pensées, laquelle est la plus douloureuse ?",
          help: "On l'appelle parfois la « pensée chaude ».",
        },
        {
          id: "beliefBefore",
          type: "slider",
          label: "À quel point y croyez-vous, maintenant ?",
          min: 0,
          max: 100,
          minLabel: "0 %",
          maxLabel: "100 %",
        },
      ],
    },
    {
      id: "facts-for",
      title: "5. Les faits qui soutiennent cette pensée",
      fields: [
        {
          id: "factsFor",
          type: "repeatableList",
          label: "Quels faits observables soutiennent cette pensée ?",
          addLabel: "Ajouter un fait",
          itemSchema: [{ id: "fact", type: "shortText", label: "Fait observable" }],
        },
      ],
    },
    {
      id: "facts-against",
      title: "6. Les faits qui la nuancent",
      fields: [
        {
          id: "factsAgainst",
          type: "repeatableList",
          label: "Quels faits la nuancent, ou la contredisent ?",
          help: "Y a-t-il d'autres explications possibles ?",
          addLabel: "Ajouter un fait",
          itemSchema: [{ id: "fact", type: "shortText", label: "Fait observable" }],
        },
      ],
    },
    {
      id: "alternative",
      title: "7. Une pensée plus équilibrée",
      intro: [
        {
          kind: "paragraph",
          text:
            "En tenant compte des faits pour ET des faits contre, comment pourriez-vous formuler " +
            "une pensée plus juste, plus nuancée ?",
        },
      ],
      fields: [
        {
          id: "altThought",
          type: "longText",
          label: "Votre pensée alternative",
          placeholder: "Ex. Il ne répond pas, mais il est peut-être simplement occupé.",
        },
      ],
    },
    {
      id: "reappraisal",
      title: "8. Comment vous sentez-vous maintenant ?",
      fields: [
        {
          id: "beliefAfter",
          type: "slider",
          label: "À quel point croyez-vous encore à la pensée douloureuse ?",
          min: 0,
          max: 100,
          minLabel: "0 %",
          maxLabel: "100 %",
        },
        {
          id: "emotionAfter",
          type: "slider",
          label: "Intensité de l'émotion maintenant",
          min: 0,
          max: 10,
          minLabel: "0 — faible",
          maxLabel: "10 — très forte",
        },
      ],
    },
    {
      id: "action",
      title: "9. Et maintenant ?",
      fields: [
        {
          id: "actionPlan",
          type: "longText",
          label: "Que pourriez-vous faire, concrètement ?",
          help: "Une petite action possible, à votre portée.",
          placeholder: "Ex. Lui envoyer un message simple demain matin.",
        },
      ],
      pitfalls: [
        {
          id: "vague-action",
          appliesToFieldId: "actionPlan",
          detector: "tooVague",
          message:
            "Cette action gagnerait à être plus concrète : que feriez-vous, quand, et comment le sauriez-vous fait ?",
        },
      ],
    },
  ],
};
