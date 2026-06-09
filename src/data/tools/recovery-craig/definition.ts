import type { CompositeDefinition } from "@/engines/composite/types";
import type { WizardBody } from "@/engines/wizard/types";
import type { WorksheetBody } from "@/engines/worksheet/types";

/* -------------------------------------------------------------------------- */
/* Contenu 100 % original, inspiré (sans copie) de l'approche de pair-aidance  */
/* et de rétablissement : auto-réflexion douce, trauma-informed, liberté de    */
/* rythme. Aucun diagnostic, aucune phrase reprise des sources.                */
/* -------------------------------------------------------------------------- */

/* --- Segment 1 : Premiers pas (wizard) ------------------------------------ */
const premiersPas: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Pour entrer en douceur, voici quelques questions tournées vers l'instant présent. " +
        "Il n'y a rien à réussir, ni à bien faire : quelques mots suffisent, et tu peux " +
        "laisser une question de côté, t'arrêter, ou y revenir un autre jour. " +
        "Ce cahier est le tien, et c'est toi qui en donnes le rythme.",
    },
  ],
  steps: [
    {
      id: "ici-maintenant",
      title: "Là, maintenant",
      fields: [
        {
          id: "etat",
          type: "longText",
          label: "Comment ça va pour toi, en ce moment ?",
          help: "Pas de bonne réponse à trouver : juste ce qui te traverse, tel que ça vient.",
          placeholder: "Ex. Un peu fatigué, mais content d'avoir pris ce temps.",
        },
      ],
    },
    {
      id: "ce-qui-aide",
      title: "Ce qui m'aide déjà",
      intro: [
        {
          kind: "paragraph",
          text:
            "Tu as probablement déjà des appuis, même petits ou discrets : une personne, " +
            "un geste, un lieu, une habitude. Les mettre en mots, c'est une façon de reconnaître " +
            "ce qui te porte déjà, sans avoir à le construire de zéro.",
        },
      ],
      fields: [
        {
          id: "appuis",
          type: "tagList",
          label: "Ressources, personnes ou gestes qui m'aident",
          help: "Un mot ou une courte expression par appui. Note seulement ce qui te parle.",
        },
      ],
    },
    {
      id: "petite-chose",
      title: "Une petite chose",
      fields: [
        {
          id: "agreable",
          type: "shortText",
          label: "Une petite chose agréable de ces derniers jours",
          help: "Même infime : un rayon de soleil, un message reçu, une tasse de thé. Tout compte.",
          placeholder: "Ex. J'ai ri à une bêtise au téléphone.",
        },
      ],
    },
    {
      id: "prendre-soin",
      title: "Prendre soin de moi",
      fields: [
        {
          id: "attention",
          type: "shortText",
          label: "Une attention que j'aimerais m'offrir cette semaine",
          placeholder: "Ex. Aller marcher dix minutes dehors jeudi.",
        },
      ],
      pitfalls: [
        {
          id: "attention-vague",
          appliesToFieldId: "attention",
          detector: "tooVague",
          message:
            "Plus une attention est petite et concrète, plus elle devient facile à s'offrir. " +
            "Si tu le souhaites, tu peux préciser quand ou comment — mais rien ne t'y oblige.",
        },
      ],
    },
  ],
  reward: {
    confetti: true,
    message: "Merci d'avoir pris ce temps pour toi. Rien que d'être là, c'est déjà un pas qui compte.",
  },
};

/* --- Segment 2 : Ma boîte à ressources (worksheet) ------------------------ */
const boiteRessources: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Cette boîte rassemble ce qui te fait du bien, pour le garder à portée de main les jours " +
        "où c'est plus difficile et où l'on a tendance à tout oublier. Ajoute ce que tu veux, " +
        "quand tu le sens : rien n'est obligatoire, et tout peut être modifié ou retiré plus tard.",
    },
  ],
  documentTitle: "Ma boîte à ressources",
  sections: [
    {
      id: "ressources",
      title: "Mes ressources",
      tables: [
        {
          id: "moyens",
          label: "Ce qui me fait du bien",
          addLabel: "Ajouter une ressource",
          emptyLabel:
            "Rien pour l'instant, et c'est très bien. Quand tu le sens, tu pourras ajouter une première chose qui t'aide.",
          timestamped: true,
          columns: [
            {
              id: "titre",
              type: "shortText",
              label: "Ressource",
              placeholder: "Ex. Écouter de la musique",
            },
            {
              id: "categorie",
              type: "select",
              label: "Catégorie",
              options: [
                { value: "physique", label: "Physique (corps, mouvement)" },
                { value: "relationnel", label: "Relationnel (lien, présence)" },
                { value: "creatif", label: "Créatif (expression, art)" },
                { value: "ancrage", label: "Ancrage (calme, présence à soi)" },
                { value: "pratique", label: "Pratique (organisation, quotidien)" },
                { value: "autre", label: "Autre" },
              ],
            },
            {
              id: "comment",
              type: "longText",
              label: "En quoi ça m'aide, ou comment je m'y prends",
              placeholder: "Ex. Ça me sort un moment de mes pensées et ça apaise mon corps.",
            },
            {
              id: "duree",
              type: "number",
              label: "Durée (minutes)",
              min: 0,
              placeholder: "Ex. 15",
            },
            {
              id: "quand",
              type: "shortText",
              label: "Les moments où ça me fait du bien",
              placeholder: "Ex. Le soir, quand les pensées tournent en boucle.",
            },
          ],
        },
      ],
    },
  ],
};

/* --- Segment 3 : Temps d'écriture (wizard, 5 modules) --------------------- */
const tempsEcriture: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Voici cinq courts temps d'écriture pour réfléchir à ton cheminement, chacun à sa façon. " +
        "Il n'y a ni bonne réponse, ni ordre à suivre, ni rythme attendu. Tu peux répondre à " +
        "une seule question, laisser les autres de côté, t'arrêter quand tu le souhaites et " +
        "revenir un autre jour.",
    },
    {
      kind: "callout",
      tone: "attention",
      iconName: "circle-alert",
      text:
        "Certains de ces thèmes peuvent faire remonter des souvenirs ou des émotions difficiles. " +
        "C'est normal, et tu n'as rien à te prouver : si cela devient trop lourd, fais une " +
        "pause, respire, ou referme le cahier. Si la détresse est forte, tu n'as pas à rester " +
        "seul — tu peux joindre le 3114 (souffrance et prévention du suicide, 24h/24), le 15 " +
        "(Samu) ou le 112 (urgences), et te tourner vers une personne de confiance.",
    },
  ],
  steps: [
    {
      id: "reprendre-pouvoir",
      title: "Reprendre du pouvoir sur ma vie",
      intro: [
        {
          kind: "paragraph",
          text:
            "Reprendre du pouvoir, ce n'est pas tout porter sur ses épaules, ni se reprocher ce qui " +
            "ne dépend pas de toi. C'est simplement repérer, sans pression, les petits espaces où " +
            "il te reste un choix, même modeste. Ces espaces existent, même quand beaucoup de " +
            "choses semblent t'échapper.",
        },
        {
          kind: "example",
          good: "« Je peux choisir l'heure à laquelle je me lève le week-end. » (un espace de choix)",
          avoid: "« Tout m'échappe, je ne décide jamais de rien. » (un jugement global sur soi)",
        },
      ],
      fields: [
        {
          id: "espaces-choix",
          type: "longText",
          label: "Dans ma vie aujourd'hui, où est-ce qu'il me reste une part de choix ?",
        },
        {
          id: "petit-pas-pouvoir",
          type: "longText",
          label: "Un domaine où j'aimerais reprendre un peu la main, et un tout premier pas possible",
        },
      ],
    },
    {
      id: "me-connaitre",
      title: "Mieux me connaître",
      intro: [
        {
          kind: "paragraph",
          text:
            "Mieux se connaître, c'est s'observer avec curiosité plutôt qu'avec sévérité. " +
            "Tes réactions, même celles qui te déroutent, ont une histoire et une logique : " +
            "elles ont souvent été des façons de te protéger. Il n'y a rien à corriger ici, " +
            "juste à regarder de plus près, avec douceur.",
        },
      ],
      fields: [
        {
          id: "ce-qui-me-fait-vibrer",
          type: "longText",
          label: "Ce qui me touche, m'anime, ou me donne envie d'avancer",
        },
        {
          id: "ce-que-japprends",
          type: "longText",
          label: "Quelque chose que je comprends un peu mieux sur moi, ces derniers temps",
        },
      ],
    },
    {
      id: "injustice",
      title: "Faire face à l'injustice ressentie",
      intro: [
        {
          kind: "paragraph",
          text:
            "Le sentiment d'injustice est légitime, et il mérite d'être entendu plutôt que minimisé. " +
            "Le mettre en mots n'efface pas ce qui s'est passé et n'excuse personne, mais cela peut " +
            "alléger un peu le poids que ça laisse, et faire apparaître plus clairement ce dont tu " +
            "as besoin aujourd'hui. Vas-y à ta mesure : ce thème peut peser, et tu peux " +
            "t'arrêter à tout moment.",
        },
        {
          kind: "example",
          good: "« On ne m'a pas écouté quand j'ai demandé de l'aide. » (un fait vécu)",
          avoid: "« Je ne mérite pas qu'on m'écoute. » (un jugement sur soi)",
        },
      ],
      fields: [
        {
          id: "injustice-vecue",
          type: "longText",
          label: "Une injustice que j'ai ressentie, et la trace qu'elle a laissée en moi",
        },
        {
          id: "besoin-injustice",
          type: "longText",
          label: "Ce dont j'aurais eu besoin alors, ou ce dont j'ai besoin aujourd'hui face à cela",
        },
      ],
    },
    {
      id: "ma-valeur",
      title: "Reconnaître ma valeur",
      intro: [
        {
          kind: "paragraph",
          text:
            "Ta valeur ne dépend pas de ce que tu produis, ni du regard des autres, ni des " +
            "difficultés que tu traverses. Elle est là, entière, simplement parce que tu existes. " +
            "Le formuler peut sembler étrange, surtout si on t'a longtemps fait croire le contraire : " +
            "prends ce qui te parle, et laisse le reste sans te forcer.",
        },
      ],
      fields: [
        {
          id: "qualites",
          type: "longText",
          label: "Des qualités ou des forces que je me reconnais, même discrètes",
        },
        {
          id: "fierte",
          type: "longText",
          label: "Un moment, petit ou grand, dont je peux être fier",
        },
      ],
    },
    {
      id: "resilience",
      title: "Ma résilience",
      intro: [
        {
          kind: "paragraph",
          text:
            "Si tu es là, à lire ces lignes, c'est que tu as déjà traversé bien des choses. " +
            "Ce n'est pas rien : ça veut dire que quelque chose, en toi ou autour de toi, t'a " +
            "aidé à tenir. Cela mérite d'être nommé, car ce sont des appuis bien réels sur lesquels " +
            "tu peux encore te reposer.",
        },
      ],
      fields: [
        {
          id: "ce-qui-ma-fait-tenir",
          type: "longText",
          label: "Dans les moments difficiles, qu'est-ce qui m'a aidé à tenir ?",
        },
        {
          id: "ce-que-je-garde",
          type: "longText",
          label: "Ce que je veux garder de mon parcours pour la suite du chemin",
        },
      ],
    },
  ],
  reward: {
    confetti: true,
    message:
      "Tu as pris le temps de t'écouter, et ce n'est jamais facile. Quoi que tu aies écrit, ou choisi de ne pas écrire, c'est précieux.",
  },
};

/* --- Segment 4 : Mon plan de mieux-être (worksheet) ----------------------- */
const planMieuxEtre: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Ce plan rassemble tes repères de mieux-être au jour le jour : ce qui t'aide, ce qui " +
        "te fragilise, et les personnes vers qui te tourner. Il est pensé pour soutenir le " +
        "quotidien et entretenir ce qui va, pas seulement pour les moments durs. Il n'a pas besoin " +
        "d'être complet pour servir : remplis-le comme tu veux, et reviens-y à ton rythme.",
    },
    {
      kind: "paragraph",
      text:
        "S'il t'arrive de traverser des crises plus aiguës, un outil dédié, « Mon plan de crise », " +
        "existe à côté de celui-ci pour préparer ces moments-là plus en détail.",
    },
  ],
  documentTitle: "Mon plan de mieux-être",
  sections: [
    {
      id: "moins-bien",
      title: "Quand je vais moins bien",
      intro: [
        {
          kind: "paragraph",
          text:
            "Apprendre à repérer tôt les signes que ça va moins bien permet de prendre soin de soi " +
            "avant que ça ne s'enracine. Il ne s'agit pas de se surveiller ni de se juger : juste de " +
            "noter, sans dramatiser, ce que tu remarques chez toi quand le moral baisse.",
        },
      ],
      fields: [
        {
          id: "signes",
          type: "longText",
          label: "Les petits signes qui me disent que je vais moins bien",
          placeholder:
            "Ex. Je dors mal, je m'isole, je n'ai plus envie de répondre aux messages.",
        },
      ],
    },
    {
      id: "ce-qui-aide",
      title: "Ce qui m'aide",
      fields: [
        {
          id: "aides",
          type: "tagList",
          label: "Ce qui me fait du bien et m'aide à me remettre en mouvement",
          help: "Un mot ou une courte expression par élément. Note seulement ce qui fonctionne pour toi.",
        },
      ],
    },
    {
      id: "ce-qui-fragilise",
      title: "Ce qui me fragilise",
      intro: [
        {
          kind: "paragraph",
          text:
            "Connaître ce qui pèse sur toi aide à l'anticiper, sans aucune culpabilité. " +
            "Beaucoup de ce qui nous fragilise ne dépend pas de nous : repérer ces éléments, " +
            "ce n'est pas en porter la faute, c'est mieux s'y préparer.",
        },
      ],
      fields: [
        {
          id: "fragilites",
          type: "tagList",
          label: "Ce qui a tendance à me fragiliser",
          help: "Un mot ou une courte expression par élément.",
        },
      ],
    },
    {
      id: "personnes-ressources",
      title: "Personnes ressources",
      intro: [
        {
          kind: "paragraph",
          text:
            "Ces personnes sont celles vers qui tu peux te tourner pour souffler, parler ou " +
            "te sentir moins seul. Par prudence, note seulement un prénom ou un surnom, jamais " +
            "de coordonnées complètes : ce cahier reste dans ton navigateur, mais autant garder " +
            "ces informations légères.",
        },
      ],
      tables: [
        {
          id: "personnes",
          label: "Mes personnes ressources",
          addLabel: "Ajouter une personne",
          emptyLabel:
            "Personne de noté pour l'instant. Tu pourras ajouter qui tu veux, quand tu le sens.",
          columns: [
            {
              id: "alias",
              type: "shortText",
              label: "Prénom ou surnom",
              help: "Pas de nom complet ni de numéro ici.",
              placeholder: "Ex. Sam",
            },
            {
              id: "lien",
              type: "shortText",
              label: "Ce que cette personne représente pour moi",
              placeholder: "Ex. Un ami, une personne pair-aidante.",
            },
            {
              id: "comment_joindre",
              type: "shortText",
              label: "Comment je peux la joindre",
              placeholder: "Ex. Lui écrire en soirée, l'appeler le week-end.",
            },
          ],
        },
      ],
    },
    {
      id: "lieux-phrases",
      title: "Lieux et phrases qui m'aident",
      fields: [
        {
          id: "lieux_surs",
          type: "tagList",
          label: "Des lieux où je me sens en sécurité, ou plus apaisé",
          help: "Un lieu par étiquette.",
        },
        {
          id: "phrases",
          type: "longText",
          label: "Des phrases qui me font du bien, me rassurent ou me redonnent du courage",
          placeholder: "Ex. « Ça va passer. » « Je n'ai pas à tout porter seul. »",
        },
      ],
    },
    {
      id: "mini-actions",
      title: "Mini-actions",
      intro: [
        {
          kind: "paragraph",
          text:
            "Ce sont de toutes petites actions, faciles à enclencher même les jours sans énergie. " +
            "Inutile de viser grand : plus c'est simple, concret et léger, plus ça reste à portée " +
            "de main quand le reste paraît trop lourd.",
        },
      ],
      tables: [
        {
          id: "actions",
          label: "Mes mini-actions",
          addLabel: "Ajouter une mini-action",
          emptyLabel: "Rien pour l'instant. Tu pourras en ajouter une toute simple quand tu veux.",
          columns: [
            {
              id: "action",
              type: "shortText",
              label: "Action",
              placeholder: "Ex. Ouvrir la fenêtre et respirer un moment.",
            },
            {
              id: "quand",
              type: "shortText",
              label: "Un bon moment pour m'y mettre",
              placeholder: "Ex. Au réveil, avant de regarder mon téléphone.",
            },
          ],
        },
      ],
    },
    {
      id: "urgence",
      title: "Ressources d'urgence",
      intro: [
        {
          kind: "callout",
          tone: "attention",
          iconName: "shield-alert",
          text:
            "Ce cahier accompagne le quotidien, mais si tu es en danger immédiat ou si des " +
            "pensées de te faire du mal te traversent, ne reste pas seul : ces moments-là " +
            "demandent un soutien tout de suite. Tu peux joindre le 3114 (souffrance et " +
            "prévention du suicide, gratuit, 24h/24), le 15 (Samu) ou le 112 (urgences), et appeler " +
            "une personne de confiance. Demander de l'aide n'est jamais une faiblesse : c'est un " +
            "geste qui prend soin de ta vie.",
        },
      ],
    },
  ],
};

/* --- Segment 5 : Carnet de gratitude (worksheet) -------------------------- */
const gratitude: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Remarquer ce qui fait du bien, même de tout petits riens, c'est une façon douce de " +
        "rééquilibrer le regard les jours où le négatif prend toute la place. Ce carnet n'a rien " +
        "d'une obligation : ajoute ce qui te vient, quand ça te vient, et reviens-y librement.",
    },
  ],
  documentTitle: "Mon carnet de gratitude",
  sections: [
    {
      id: "remerciements",
      title: "Mes listes de remerciements",
      intro: [
        {
          kind: "paragraph",
          text:
            "Un objet, une personne, un instant, une qualité chez toi : tout peut y avoir sa place. " +
            "Il n'y a pas de « trop petit » pour figurer ici.",
        },
      ],
      tables: [
        {
          id: "gratitudes",
          label: "Ce envers quoi je me sens reconnaissant",
          addLabel: "Ajouter un merci",
          emptyLabel:
            "Rien pour l'instant, et c'est très bien. Le jour où ça te vient, tu pourras noter un premier merci.",
          timestamped: true,
          columns: [
            {
              id: "objet",
              type: "shortText",
              label: "Quelque chose, quelqu'un, un moment",
              placeholder: "Ex. Le soleil ce matin, un message d'un ami.",
            },
            {
              id: "pourquoi",
              type: "shortText",
              label: "En quoi ça compte pour moi",
              placeholder: "Ex. Ça m'a rappelé que je ne suis pas seul.",
            },
          ],
        },
      ],
    },
    {
      id: "espoir-bas",
      title: "Quand l'espoir baisse",
      intro: [
        {
          kind: "paragraph",
          text:
            "Les jours où tout paraît terne, relire cette liste peut aider. Et si même cela paraît " +
            "trop loin, tu peux noter ici ce qui, d'habitude, t'aide à tenir un peu.",
        },
      ],
      fields: [
        {
          id: "tenir",
          type: "longText",
          label: "Quand l'espoir faiblit, qu'est-ce qui peut m'aider à tenir, même un peu ?",
          placeholder: "Ex. Me rappeler que ça a déjà passé d'autres fois. Appeler quelqu'un.",
        },
      ],
    },
  ],
};

/* --- Segment 6 : Quand je suis dépassé (wizard) --------------------------- */
const apaiser: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Quand la tension, la colère ou le trop-plein montent, il n'y a rien à « bien » faire : " +
        "juste, peu à peu, des façons de souffler et de retrouver un peu de prise. Ces quelques " +
        "questions sont là pour préparer ces moments à froid, tranquillement. Passe ce qui ne te " +
        "parle pas, et arrête-toi dès que tu le souhaites.",
    },
  ],
  steps: [
    {
      id: "reperer",
      title: "Repérer ce qui monte",
      intro: [
        {
          kind: "paragraph",
          text:
            "Les émotions fortes s'annoncent souvent par de petits signaux dans le corps ou les " +
            "pensées. Les connaître, c'est pouvoir agir un peu plus tôt, avant que ça déborde.",
        },
      ],
      fields: [
        {
          id: "signaux",
          type: "longText",
          label: "À quoi je remarque que la tension ou la colère montent en moi ?",
          placeholder: "Ex. Ma mâchoire se serre, mes pensées s'accélèrent, je hausse le ton.",
        },
      ],
    },
    {
      id: "souffler",
      title: "Souffler avant de réagir",
      intro: [
        {
          kind: "paragraph",
          text:
            "Parfois, le geste le plus fort est de ne pas réagir tout de suite : se taire un instant, " +
            "respirer, s'éloigner. Cela n'a rien d'une fuite — c'est se laisser le temps de choisir.",
        },
      ],
      fields: [
        {
          id: "gestes-calme",
          type: "tagList",
          label: "Des gestes qui m'aident à redescendre",
          help: "Un geste par étiquette. Ex. respirer lentement, sortir marcher, boire un verre d'eau, écouter une musique.",
        },
      ],
    },
    {
      id: "choisir",
      title: "Choisir ma réaction",
      intro: [
        {
          kind: "example",
          good: "« Je suis sorti prendre l'air avant de répondre. » (une réaction qui apaise)",
          avoid: "« J'ai répondu du tac au tac et ça a envenimé les choses. » (une réaction qui amplifie)",
        },
      ],
      fields: [
        {
          id: "situation",
          type: "longText",
          label: "Une situation récente qui m'a fait sortir de mes gonds",
        },
        {
          id: "reaction-actuelle",
          type: "longText",
          label: "Comment j'ai réagi — et est-ce que ça m'a soulagé ou aggravé les choses ?",
        },
        {
          id: "autre-reaction",
          type: "longText",
          label: "Une réaction qui m'aurait fait du bien, ou que j'aimerais essayer la prochaine fois",
        },
      ],
    },
    {
      id: "dire-aux-proches",
      title: "Le dire à mes proches",
      fields: [
        {
          id: "message-proches",
          type: "shortText",
          label: "Ce que j'aimerais que mes proches sachent pour m'aider dans ces moments",
          placeholder: "Ex. Laisse-moi quelques minutes seul, je reviens plus calme.",
        },
      ],
    },
  ],
  reward: {
    confetti: true,
    message:
      "Préparer ces moments à froid, c'est déjà se donner une longueur d'avance. Sois doux avec toi.",
  },
};

/* --- Segment 7 : Liens et besoins (wizard) -------------------------------- */
const liensBesoins: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Le lien aux autres fait partie du rétablissement, mais il se construit à ta mesure. " +
        "Ces questions invitent à regarder tes appuis relationnels et à mettre des mots sur tes " +
        "besoins, sans rien forcer. Réponds à ce qui te parle, laisse le reste.",
    },
  ],
  steps: [
    {
      id: "personne-qui-compte",
      title: "Une personne qui compte",
      fields: [
        {
          id: "personne",
          type: "longText",
          label: "Une personne à qui je tiens, et ce que j'apprécie chez elle",
          help: "Un prénom ou un surnom suffit, si tu veux en nommer une.",
        },
      ],
    },
    {
      id: "bon-ami",
      title: "Être là, pour soi et pour les autres",
      intro: [
        {
          kind: "paragraph",
          text:
            "Réfléchir à ce qui fait un lien qui fait du bien aide aussi à repérer ce qu'on peut " +
            "offrir, à sa façon, sans se surcharger.",
        },
      ],
      fields: [
        {
          id: "definition-ami",
          type: "longText",
          label: "Pour moi, qu'est-ce qu'un lien qui fait du bien — et comment je peux l'être pour les autres ?",
        },
      ],
    },
    {
      id: "exprimer-besoin",
      title: "Exprimer un besoin",
      intro: [
        {
          kind: "paragraph",
          text:
            "Dire ce dont on a besoin n'est pas exiger : c'est donner aux autres une chance de nous " +
            "comprendre. Cela s'apprend, petit à petit, et une phrase simple suffit souvent.",
        },
      ],
      fields: [
        {
          id: "besoin",
          type: "longText",
          label: "Un besoin que j'ai du mal à exprimer",
        },
        {
          id: "phrase-besoin",
          type: "shortText",
          label: "Une phrase simple pour le dire",
          placeholder: "Ex. « J'ai besoin d'un peu de calme, là, tout de suite. »",
        },
      ],
    },
    {
      id: "soutien-pairs",
      title: "Le soutien entre pairs",
      intro: [
        {
          kind: "paragraph",
          text:
            "Parfois, le plus aidant est tout simple : échanger un vrai « comment ça va ? », dans les " +
            "deux sens, avec quelqu'un qui comprend. Donner du soutien fait souvent autant de bien " +
            "qu'en recevoir.",
        },
      ],
      fields: [
        {
          id: "echange-pairs",
          type: "longText",
          label: "Avec qui je pourrais échanger un vrai « comment ça va », dans les deux sens ?",
        },
      ],
    },
  ],
  reward: {
    confetti: true,
    message: "Mettre des mots sur ses liens et ses besoins, c'est déjà tisser un peu plus de soutien autour de soi.",
  },
};

/* --- Segment 8 : Avancer vers ce qui compte (wizard) ---------------------- */
const avancer: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Avancer ne veut pas dire courir : c'est repérer une direction qui te tient à cœur et un " +
        "tout petit pas vers elle. Pas de calendrier à tenir, pas de performance à viser. " +
        "Prends ce qui t'inspire et laisse le reste.",
    },
  ],
  steps: [
    {
      id: "changement",
      title: "Un changement qui me ferait du bien",
      fields: [
        {
          id: "changement-souhaite",
          type: "longText",
          label: "Un changement que j'aimerais voir dans ma vie, sans pression de délai",
        },
      ],
    },
    {
      id: "but",
      title: "Un but à ma portée",
      intro: [
        {
          kind: "paragraph",
          text:
            "Un but n'a pas besoin d'être grand pour compter. Le plus important, c'est qu'il " +
            "t'appartienne et qu'un premier pas soit réellement à ta portée.",
        },
      ],
      fields: [
        {
          id: "but-titre",
          type: "shortText",
          label: "Un but pour les mois à venir",
          placeholder: "Ex. Reprendre contact avec une personne qui me manque.",
        },
        {
          id: "y-croire",
          type: "longText",
          label: "Est-ce que j'y crois ? Qu'est-ce qui m'aiderait à y croire un peu plus ?",
        },
        {
          id: "deux-pas",
          type: "longText",
          label: "Deux tout petits pas possibles vers ce but",
        },
      ],
      pitfalls: [
        {
          id: "but-vague",
          appliesToFieldId: "but-titre",
          detector: "tooVague",
          message:
            "Plus un but est concret, plus le premier pas devient visible. Si tu le souhaites, tu peux le préciser — mais rien ne t'y oblige.",
        },
      ],
    },
    {
      id: "activites",
      title: "Des activités qui ont du sens",
      intro: [
        {
          kind: "paragraph",
          text:
            "Se sentir utile, créatif ou simplement vivant nourrit le rétablissement. " +
            "Cela peut être tout simple : un loisir, un coup de main, une habitude qui te fait du bien.",
        },
      ],
      fields: [
        {
          id: "activite-sens",
          type: "longText",
          label: "Une activité qui me donne le sentiment d'être utile ou vivant, que j'aimerais (re)trouver",
        },
      ],
    },
    {
      id: "temps",
      title: "Mon temps, à ma façon",
      intro: [
        {
          kind: "paragraph",
          text:
            "Organiser son temps n'est pas une course au rendement : c'est s'alléger le quotidien et " +
            "se laisser de la place pour souffler. Une seule petite habitude peut déjà changer une journée.",
        },
      ],
      fields: [
        {
          id: "habitude-temps",
          type: "longText",
          label: "Une petite façon d'organiser mon temps qui m'allègerait le quotidien",
          placeholder: "Ex. Préparer mes affaires la veille pour des matins plus calmes.",
        },
      ],
    },
  ],
  reward: {
    confetti: true,
    message: "Une direction et un petit pas : c'est tout ce qu'il faut pour avancer, à ton rythme.",
  },
};

/* --- Définition composite ------------------------------------------------- */
export const recoveryCraig: CompositeDefinition = {
  engine: "composite",
  dominant: "wizard",
  slug: "recovery-craig",
  title: "Betterdays",
  shortTitle: "Betterdays",
  category: "parcours",
  iconName: "sunrise",
  accent: "blue",
  summary:
    "Un cahier doux pour cheminer vers le mieux-être, à ton rythme et selon tes envies : premiers pas, ressources, gratitude, apaisement, liens, temps d'écriture et plan personnel.",
  keywords: ["rétablissement", "recovery", "pair-aidance", "mieux-être", "espoir", "journal", "plan personnel", "Craig Lewis"],
  estimatedMinutes: 45,
  sensitivity: "high",
  sourceCredit:
    "Inspiré de l'esprit de la pair-aidance et du rétablissement porté par Craig Lewis — adaptation entièrement originale",
  disclaimerKey: "retablissement",
  crisisLevel: "elevated",
  intro: [
    {
      kind: "paragraph",
      text:
        "Ce cahier t'accompagne dans une réflexion personnelle sur le rétablissement, dans " +
        "l'esprit de la pair-aidance : avec chaleur, sans jugement, et en partant du principe que " +
        "tu es la personne la mieux placée pour parler de ta vie. Il ne pose aucun diagnostic " +
        "et ne remplace pas un accompagnement. Il n'y a ni bonne réponse, ni rythme attendu : tu " +
        "peux répondre, passer une question, t'arrêter ou revenir quand tu le souhaites.",
    },
    {
      kind: "paragraph",
      text:
        "Rien de ce que tu écris ici n'est envoyé sur Internet : tout reste dans ton navigateur " +
        "et s'efface à la fermeture de l'onglet. Si tu veux en garder une trace, tu peux " +
        "exporter ton cahier à tout moment.",
    },
  ],
  segments: [
    {
      id: "premiers-pas",
      title: "Premiers pas",
      iconName: "sunrise",
      summary: "Entrer en douceur, à partir de l'instant présent.",
      optional: true,
      ref: { engine: "wizard", body: premiersPas },
    },
    {
      id: "boite-ressources",
      title: "Ma boîte à ressources",
      iconName: "heart-handshake",
      summary: "Rassembler ce qui te fait du bien, pour le garder à portée de main.",
      optional: true,
      ref: { engine: "worksheet", body: boiteRessources },
    },
    {
      id: "gratitude",
      title: "Carnet de gratitude",
      iconName: "sparkles",
      summary: "Noter, sans pression, les petites choses qui font du bien.",
      optional: true,
      ref: { engine: "worksheet", body: gratitude },
    },
    {
      id: "apaiser",
      title: "Quand je suis dépassé",
      iconName: "wind",
      summary: "Préparer à froid des façons d'apaiser et de choisir sa réaction.",
      optional: true,
      ref: { engine: "wizard", body: apaiser },
    },
    {
      id: "liens-besoins",
      title: "Liens et besoins",
      iconName: "users",
      summary: "Regarder ses appuis relationnels et mettre des mots sur ses besoins.",
      optional: true,
      ref: { engine: "wizard", body: liensBesoins },
    },
    {
      id: "temps-ecriture",
      title: "Temps d'écriture",
      iconName: "pen-line",
      summary: "Cinq courts modules pour réfléchir à ton parcours, librement.",
      optional: true,
      ref: { engine: "wizard", body: tempsEcriture },
    },
    {
      id: "avancer",
      title: "Avancer vers ce qui compte",
      iconName: "target",
      summary: "Une direction qui te tient à cœur, et un tout petit pas vers elle.",
      optional: true,
      ref: { engine: "wizard", body: avancer },
    },
    {
      id: "plan-mieux-etre",
      title: "Mon plan de mieux-être",
      iconName: "notebook-pen",
      summary: "Tes repères, tes appuis et tes personnes ressources au quotidien.",
      optional: true,
      ref: { engine: "worksheet", body: planMieuxEtre },
    },
  ],
};
