import type { CompositeDefinition } from "@/engines/composite/types";
import type { WizardBody } from "@/engines/wizard/types";
import type { WorksheetBody } from "@/engines/worksheet/types";

/* ===========================================================================
 * E.S.C.A.P.E. — explorer ses fonctions cognitives
 *
 * Outil composite (dominant wizard) d'exploration et d'auto-découverte.
 * AUCUN score, AUCUN diagnostic, AUCUNE correction automatique.
 *
 * Note importante : tout le contenu (textes, anagrammes, anecdotes, scénarios,
 * exemples) est ORIGINAL, créé pour cette plateforme. Il s'inspire seulement
 * de l'esprit d'une approche de stimulation cognitive avec psychoéducation,
 * sans reproduire aucun stimulus d'une source existante.
 *
 * Principe « réponse d'abord, pistes ensuite » : l'usager écrit librement,
 * puis des pistes d'auto-comparaison apparaissent à l'étape suivante du
 * wizard, formulées comme « une façon possible de voir », jamais comme un
 * verdict ou une bonne réponse.
 * ========================================================================= */

/* --- S1 : Comprendre ses fonctions cognitives (worksheet, psychoéducation) --- */
const comprendre: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Nos « fonctions cognitives » sont les rouages de l'esprit qui nous aident, au quotidien, à " +
        "retenir une information, à comprendre une situation, à prendre une décision et à entrer en " +
        "lien avec les autres. Elles fluctuent naturellement selon la fatigue, le stress, l'humeur ou " +
        "le moment de la journée : personne ne les a toujours « à fond ». Cette première section les " +
        "présente simplement, avec des exemples de la vie courante.",
    },
    {
      kind: "callout",
      tone: "info",
      iconName: "info",
      text:
        "Ce n'est pas un test, et il n'y a rien à réussir. Lis à ton rythme, garde ce qui te " +
        "parle, laisse tranquillement le reste de côté.",
    },
  ],
  documentTitle: "Mes repères sur les fonctions cognitives",
  sections: [
    {
      id: "panorama",
      title: "Six grands domaines, en quelques mots",
      intro: [
        {
          kind: "definition",
          term: "Mémoire de travail",
          def:
            "C'est le « bloc-notes mental » de l'instant présent : garder quelques informations à " +
            "l'esprit le temps de les utiliser, parfois en les manipulant au passage.",
        },
        {
          kind: "example",
          good:
            "Retenir un numéro le temps de le composer, calculer une addition de tête, ou suivre une " +
            "recette sans la relire à chaque étape.",
        },
        {
          kind: "definition",
          term: "Mémoire épisodique",
          def:
            "C'est la mémoire des moments vécus : ce qui s'est passé, où et quand, avec son ambiance " +
            "et ses détails.",
        },
        {
          kind: "example",
          good:
            "Se rappeler ce qu'on a mangé hier soir, ou raconter une sortie récente en retrouvant le " +
            "fil des événements.",
        },
        {
          kind: "definition",
          term: "Fonctions exécutives",
          def:
            "Ce sont les « chefs d'orchestre » de l'esprit : planifier, organiser, prioriser, choisir " +
            "entre plusieurs options et s'adapter quand un imprévu surgit.",
        },
        {
          kind: "example",
          good:
            "Préparer ses courses en tenant compte d'un budget, ou réorganiser sa journée quand un " +
            "rendez-vous est déplacé à la dernière minute.",
        },
        {
          kind: "definition",
          term: "Attention",
          def:
            "C'est la capacité à orienter son esprit vers ce qui compte et à l'y maintenir, malgré les " +
            "distractions, et parfois à se partager entre deux choses à la fois.",
        },
        {
          kind: "example",
          good:
            "Lire un paragraphe dans une pièce bruyante, ou rester sur une tâche jusqu'au bout sans se " +
            "laisser happer par son téléphone.",
        },
        {
          kind: "definition",
          term: "Cognition sociale",
          def:
            "C'est ce qui nous aide à décoder les autres : leurs émotions, leurs intentions, et tout " +
            "ce qui se dit sans mots, entre les lignes.",
        },
        {
          kind: "example",
          good:
            "Sentir qu'un proche est contrarié à son ton de voix ou à sa posture, même s'il affirme " +
            "que « tout va bien ».",
        },
        {
          kind: "definition",
          term: "Métacognition",
          def:
            "C'est le regard que l'on pose sur sa propre pensée : remarquer comment on raisonne, " +
            "repérer ses automatismes et se demander, sans se juger, si l'on en est bien sûr.",
        },
        {
          kind: "example",
          good:
            "Se surprendre à penser « là, j'ai conclu un peu vite : et si je vérifiais avant de " +
            "décider ? ».",
        },
      ],
      fields: [
        {
          id: "fonction_a_explorer",
          type: "longText",
          label: "Parmi ces six domaines, lequel t'intrigue le plus, et qu'est-ce qui t'y attire ?",
          help: "Il n'y a pas de bonne réponse : note ce qui te vient, ou passe simplement cette question.",
        },
      ],
    },
  ],
};

/* --- S2 : Mémoire de travail (wizard) --- */
const memoireTravail: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "La mémoire de travail aime être sollicitée par de petits jeux où l'on jongle avec quelques " +
        "informations. En voici un, juste pour le plaisir d'essayer. Il n'y a ni score ni note, et " +
        "rien à prouver : c'est l'expérience qui compte.",
    },
  ],
  steps: [
    {
      id: "anagramme",
      title: "Un anagramme à démêler",
      intro: [
        {
          kind: "paragraph",
          text:
            "Voici des lettres mélangées qui, remises dans l'ordre, forment le nom d'un fruit. Prends " +
            "le temps de les réarranger mentalement, puis note le mot qui te vient.",
        },
        {
          kind: "callout",
          tone: "info",
          iconName: "search",
          text: "Lettres mélangées : E — C — R — I — S — E.",
        },
      ],
      fields: [
        {
          id: "reponse_anagramme",
          type: "shortText",
          label: "Le mot que je propose",
          placeholder: "Écris ici le fruit que tu reconstitues.",
          help: "Il n'y a pas de mauvaise réponse : si rien ne vient, passe tranquillement à la suite.",
        },
      ],
    },
    {
      id: "pistes_anagramme",
      title: "Une façon possible de le voir",
      intro: [
        {
          kind: "callout",
          tone: "info",
          iconName: "lightbulb",
          text:
            "Un mot possible avec ces lettres était « CERISE ». C'est une simple piste de comparaison, " +
            "pas un verdict : ce qui s'est passé dans ta tête vaut autant que le mot trouvé.",
        },
        {
          kind: "example",
          good:
            "Une astuce parmi d'autres : repérer d'abord les voyelles (E, I, E), puis les marier aux " +
            "consonnes, ou tâtonner à partir d'un début de mot familier (« ce- », « ci- »).",
          note:
            "Observer sa propre démarche, plutôt que de juger le résultat, est souvent le plus " +
            "intéressant.",
        },
      ],
      fields: [
        {
          id: "ressenti_anagramme",
          type: "longText",
          label: "Comment as-tu procédé ? (facultatif)",
          help: "Mettre des mots sur sa méthode en apprend souvent plus que de trouver « la » réponse.",
        },
      ],
    },
  ],
  reward: {
    confetti: true,
    message: "Merci d'avoir pris ce temps. L'expérience compte, bien plus que le résultat.",
  },
};

/* --- S3 : Mémoire épisodique (wizard) --- */
const memoireEpisodique: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Ce petit jeu explore la mémoire des moments vécus. Tu vas lire un court récit, puis, " +
        "sans le relire, répondre de mémoire à quelques questions. Là encore : aucun score, juste " +
        "le plaisir de l'essai.",
    },
  ],
  steps: [
    {
      id: "lecture",
      title: "Lis ce court récit",
      intro: [
        {
          kind: "paragraph",
          text:
            "Un mardi matin, Camille a quitté son immeuble avec un parapluie bleu, car le ciel était " +
            "gris. En chemin vers la bibliothèque, elle s'est arrêtée à la boulangerie du coin pour y " +
            "prendre deux croissants. Devant l'entrée, elle a croisé un voisin qui promenait un petit " +
            "chien roux. Finalement, le soleil est revenu avant midi.",
        },
        {
          kind: "callout",
          tone: "info",
          iconName: "eye",
          text:
            "Lis le récit une seule fois, tranquillement, puis passe à la suite sans revenir en " +
            "arrière. Pas besoin de le mémoriser mot à mot.",
        },
      ],
      fields: [],
    },
    {
      id: "rappel",
      title: "Que te reste-t-il en mémoire ?",
      intro: [
        {
          kind: "paragraph",
          text:
            "Sans relire le récit, réponds de mémoire, comme cela te revient. Si certains détails " +
            "t'échappent, c'est tout à fait normal et sans importance.",
        },
      ],
      fields: [
        {
          id: "rappel_objet",
          type: "shortText",
          label: "Quel objet la personne avait-elle emporté en sortant ?",
        },
        {
          id: "rappel_achat",
          type: "shortText",
          label: "Que s'est-elle procuré en chemin ?",
        },
        {
          id: "rappel_rencontre",
          type: "longText",
          label: "Qui a-t-elle croisé, et que faisait cette personne ?",
        },
      ],
    },
    {
      id: "pistes_rappel",
      title: "Les éléments du récit",
      intro: [
        {
          kind: "callout",
          tone: "info",
          iconName: "lightbulb",
          text:
            "Voici les détails du récit, à titre de comparaison (et non de correction) : un parapluie " +
            "bleu, un arrêt à la boulangerie pour deux croissants, un voisin promenant un petit chien " +
            "roux, et le soleil revenu avant midi.",
        },
        {
          kind: "example",
          good:
            "Si des détails t'ont échappé, c'est très courant : la mémoire retient souvent " +
            "l'essentiel (la scène générale) avant les petits détails. Se faire un film mental de la " +
            "scène aide souvent à mieux ancrer un souvenir.",
        },
      ],
      fields: [
        {
          id: "ressenti_rappel",
          type: "longText",
          label: "Qu'as-tu remarqué sur ta façon de te souvenir ? (facultatif)",
        },
      ],
    },
  ],
  reward: {
    confetti: true,
    message: "Merci pour ce moment. Observer sa mémoire avec curiosité, c'est déjà en prendre soin.",
  },
};

/* --- S4 : Fonctions exécutives (wizard) --- */
const fonctionsExecutives: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Les fonctions exécutives entrent en jeu dès qu'il faut décider avec des contraintes. Voici " +
        "une petite situation imaginaire : à toi de choisir, puis de mettre des mots sur ton " +
        "raisonnement. Il n'y a pas de choix « juste », pas de score, pas de piège.",
    },
  ],
  steps: [
    {
      id: "scenario",
      title: "Un choix à arbitrer",
      intro: [
        {
          kind: "paragraph",
          text:
            "Imagine une personne qui dispose de 30 euros pour la semaine et doit retenir UNE seule " +
            "dépense prioritaire parmi trois options : (A) renouveler un abonnement de transport pour " +
            "se rendre à ses rendez-vous, (B) acheter de quoi cuisiner plusieurs repas, (C) s'offrir " +
            "une sortie agréable qui lui ferait du bien au moral. Chaque option se défend.",
        },
        {
          kind: "callout",
          tone: "info",
          iconName: "target",
          text:
            "Retiens l'option qui te semble la plus sensée pour cette personne, puis dis ce qui " +
            "guide ton choix.",
        },
      ],
      fields: [
        {
          id: "choix_final",
          type: "select",
          label: "Mon choix prioritaire pour cette personne",
          options: [
            { value: "transport", label: "A — l'abonnement de transport" },
            { value: "provisions", label: "B — les provisions pour cuisiner" },
            { value: "sortie", label: "C — la sortie agréable" },
          ],
          help: "Tu peux aussi ne pas choisir et passer directement à la suite.",
        },
        {
          id: "justification",
          type: "longText",
          label: "Qu'est-ce qui guide ce choix ?",
          placeholder:
            "Par exemple : les besoins essentiels d'abord, l'urgence, l'impact sur le moral…",
        },
      ],
    },
    {
      id: "grille",
      title: "Une façon possible de poser le raisonnement",
      intro: [
        {
          kind: "callout",
          tone: "info",
          iconName: "lightbulb",
          text:
            "Il n'y a pas de bonne réponse unique : tout dépend de ce qui prime pour cette personne. " +
            "Voici simplement quelques critères que l'on peut mettre dans la balance.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Distinguer l'essentiel (se nourrir, se déplacer pour ses rendez-vous) de l'agréable, sans pour autant les opposer.",
            "Regarder l'urgence : qu'arriverait-il si l'on attendait une semaine de plus pour chacune des options ?",
            "Peser les conséquences : manquer un rendez-vous important ne pèse pas du même poids qu'une sortie remise à plus tard.",
            "Tenir compte du moral : le bien-être n'est pas un luxe et peut tout à fait être une priorité légitime.",
            "Chercher un compromis : parfois, dépenser un peu moins sur une option libère de quoi en honorer une autre.",
          ],
        },
        {
          kind: "example",
          good:
            "Confronter ton raisonnement à ces critères ne vise pas à le corriger : c'est juste " +
            "l'occasion d'élargir ta palette de repères pour une prochaine décision.",
        },
      ],
      fields: [
        {
          id: "apres_grille",
          type: "longText",
          label: "Ces critères changent-ils quelque chose à ton regard ? (facultatif)",
        },
      ],
    },
  ],
  reward: {
    confetti: true,
    message: "Décider, c'est arbitrer entre plusieurs logiques. Tu viens de t'y exercer en douceur.",
  },
};

/* --- S5 : Cognition sociale (worksheet) --- */
const cognitionSociale: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Comprendre les autres ne passe pas que par les mots ou les visages : le ton de la voix, la " +
        "posture, les gestes, un silence en disent souvent long. Cette section invite à explorer ces " +
        "indices, librement et sans pression. Reste sur des situations impersonnelles, sans nommer " +
        "ni rendre reconnaissable qui que ce soit.",
    },
    {
      kind: "callout",
      tone: "info",
      iconName: "users",
      text:
        "Aucun score ici, et aucune bonne lecture attendue : juste l'occasion d'observer ta propre " +
        "façon de percevoir les autres.",
    },
  ],
  documentTitle: "Mes observations sur les indices sociaux",
  sections: [
    {
      id: "indices",
      title: "Quand le ton dit autre chose que les mots",
      intro: [
        {
          kind: "example",
          good:
            "Quelques indices possibles, à titre d'exemples : une voix plus sèche ou plus basse, des " +
            "bras croisés, un regard qui se dérobe, un soupir, une réponse étonnamment courte.",
        },
      ],
      fields: [
        {
          id: "situation_decalage",
          type: "longText",
          label:
            "Repense à un moment où le ton de quelqu'un semblait dire autre chose que ses mots. Que se passait-il ?",
          help: "Parle d'« une personne », sans donner d'identité ni de détail reconnaissable.",
        },
        {
          id: "indices_percus",
          type: "longText",
          label: "À quels indices (en dehors des paroles) l'as-tu ressenti ?",
        },
        {
          id: "verification_sociale",
          type: "longText",
          label: "Aurais-tu pu vérifier ton impression ? De quelle façon ? (facultatif)",
          help: "Par exemple en posant une question ouverte, sans présumer connaître déjà la réponse.",
        },
      ],
    },
  ],
};

/* --- S6 : Métacognition (worksheet) — le segment le plus fidèle à l'esprit --- */
const metacognition: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "La métacognition, c'est poser un regard sur sa propre pensée : comment on explique ce qui " +
        "nous arrive, et comment on en vient à se forger des convictions. Cette section propose deux " +
        "explorations douces, sans score ni jugement. Garde tes exemples impersonnels, sans nommer " +
        "personne.",
    },
  ],
  documentTitle: "Mon exploration de ma façon de penser",
  sections: [
    {
      id: "attribution",
      title: "Ma façon d'expliquer ce qui arrive",
      intro: [
        {
          kind: "paragraph",
          text:
            "Face à un même événement, on peut l'expliquer de bien des manières : par soi-même, par " +
            "les autres, ou par la situation et le hasard. Aucune n'est « la » bonne en soi : c'est le " +
            "fait de varier les hypothèses qui, souvent, ouvre le regard.",
        },
        {
          kind: "example",
          good:
            "Un ami ne répond pas à un message → une hypothèse « situation » : il est peut-être tout " +
            "simplement débordé en ce moment.",
          avoid:
            "Filer droit vers une seule explication, par exemple « c'est forcément de ma faute », sans " +
            "même envisager d'autres pistes.",
        },
      ],
      fields: [
        {
          id: "situation",
          type: "longText",
          label: "Repense à une situation récente, et décris-la sans donner d'identité.",
          help: "Par exemple : « un message resté sans réponse », « un rendez-vous annulé ».",
        },
      ],
      tables: [
        {
          id: "hypotheses",
          label: "Mes explications possibles",
          addLabel: "Ajouter une explication",
          emptyLabel:
            "Note plusieurs explications possibles, en essayant de varier les points de vue.",
          columns: [
            {
              id: "hypothese",
              type: "shortText",
              label: "Une explication possible",
            },
            {
              id: "type",
              type: "select",
              label: "Cette explication tient surtout à…",
              options: [
                { value: "moi", label: "Moi" },
                { value: "les_autres", label: "Les autres" },
                { value: "situation", label: "La situation ou le hasard" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "confirmation",
      title: "Quand l'esprit ne retient que ce qui l'arrange",
      intro: [
        {
          kind: "paragraph",
          text:
            "Nous avons tous tendance à remarquer ce qui confirme nos idées et à laisser filer ce qui " +
            "les contredit : on appelle cela le biais de confirmation. Le repérer chez soi, sans s'en " +
            "vouloir, c'est déjà reprendre un peu de recul.",
        },
        {
          kind: "callout",
          tone: "info",
          iconName: "search",
          text:
            "Le but n'est pas de « se donner tort », mais de s'offrir une vue un peu plus complète " +
            "avant de conclure.",
        },
      ],
      fields: [
        {
          id: "croyance",
          type: "longText",
          label: "Une idée ou une conviction dont tu aimerais prendre du recul.",
          help: "Reste sur du général, par exemple « j'ai l'impression que… », sans viser ni nommer personne.",
        },
        {
          id: "verification",
          type: "longText",
          label: "De quoi aurais-tu besoin pour vraiment mettre cette idée à l'épreuve ?",
          help: "Par exemple : un fait précis, le point de vue d'une autre personne, un petit essai concret.",
        },
      ],
      tables: [
        {
          id: "contre_infos",
          label: "Des éléments qui nuanceraient cette idée",
          addLabel: "Ajouter un élément",
          emptyLabel:
            "Cherche des faits ou des exemples qui iraient dans un autre sens que ton idée de départ.",
          columns: [
            {
              id: "contre_info",
              type: "shortText",
              label: "Un élément qui nuance ou contredit l'idée",
            },
          ],
        },
      ],
    },
  ],
};

/* --- Composition --- */
export const escape: CompositeDefinition = {
  engine: "composite",
  dominant: "wizard",
  slug: "escape",
  title: "E.S.C.A.P.E. — explorer ses fonctions cognitives",
  shortTitle: "E.S.C.A.P.E.",
  category: "parcours",
  iconName: "brain",
  accent: "blue",
  summary:
    "Une exploration ludique de la mémoire, de l'attention, du raisonnement et du rapport aux autres — pour mieux se connaître, en toute curiosité, sans score ni diagnostic.",
  keywords: ["cognition", "fonctions cognitives", "mémoire", "attention", "concentration", "raisonnement", "stimulation cognitive", "cognition sociale"],
  estimatedMinutes: 20,
  sensitivity: "low",
  sourceCredit:
    "Inspiré de l'esprit de l'approche E.S.C.A.P.E. (stimulation cognitive avec psychoéducation, E. Garcia & M. Cerbai, 2022, © tous droits réservés). Contenus, exercices et exemples entièrement réécrits pour cette plateforme : aucun élément de la source n'est reproduit.",
  disclaimerKey: "default",
  crisisLevel: "standard",
  intro: [
    {
      kind: "paragraph",
      text:
        "Bienvenue dans une exploration de tes fonctions cognitives : six petits modules pour " +
        "découvrir, par curiosité, comment travaillent la mémoire, l'attention, le raisonnement, la " +
        "compréhension des autres et le regard sur sa propre pensée. C'est avant tout un moment " +
        "ludique de découverte de soi, pas une épreuve.",
    },
    {
      kind: "callout",
      tone: "attention",
      iconName: "shield-alert",
      text:
        "Cet outil ne donne AUCUN score et ne pose AUCUN diagnostic. Ce n'est pas un test, et il ne " +
        "remplace en rien une évaluation neuropsychologique menée par un professionnel. Si une " +
        "question te touche ou t'inquiète au sujet de ta mémoire ou de ta concentration, " +
        "tu peux en parler avec une personne de confiance ou un professionnel. Tu es " +
        "libre de commencer par le module de ton choix, de passer une question ou de t'arrêter " +
        "à tout moment.",
    },
    {
      kind: "callout",
      tone: "info",
      iconName: "info",
      text:
        "Rien de ce que tu écris n'est envoyé sur Internet : tout reste dans ton navigateur et " +
        "s'efface à la fermeture de l'onglet.",
    },
  ],
  segments: [
    {
      id: "comprendre",
      title: "Comprendre ses fonctions cognitives",
      iconName: "book-open",
      summary: "Une présentation tout en douceur des six grands domaines.",
      optional: true,
      ref: { engine: "worksheet", body: comprendre },
    },
    {
      id: "memoire-travail",
      title: "Mémoire de travail",
      iconName: "lightbulb",
      summary: "Un anagramme à démêler, juste pour le plaisir.",
      optional: true,
      ref: { engine: "wizard", body: memoireTravail },
    },
    {
      id: "memoire-episodique",
      title: "Mémoire épisodique",
      iconName: "eye",
      summary: "Lire un court récit, puis le retrouver de mémoire.",
      optional: true,
      ref: { engine: "wizard", body: memoireEpisodique },
    },
    {
      id: "fonctions-executives",
      title: "Fonctions exécutives",
      iconName: "target",
      summary: "Arbitrer un choix sous contraintes, puis regarder son raisonnement.",
      optional: true,
      ref: { engine: "wizard", body: fonctionsExecutives },
    },
    {
      id: "cognition-sociale",
      title: "Cognition sociale",
      iconName: "users",
      summary: "Explorer les indices qui se lisent au-delà des mots.",
      optional: true,
      ref: { engine: "worksheet", body: cognitionSociale },
    },
    {
      id: "metacognition",
      title: "Métacognition",
      iconName: "search",
      summary: "Observer sa façon d'expliquer ce qui arrive et de se convaincre.",
      optional: true,
      ref: { engine: "worksheet", body: metacognition },
    },
  ],
};
