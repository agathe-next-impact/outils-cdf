export interface StartPathwayCard {
  title: string;
  text: string;
  href: string;
  icon: string;
  steps: string;
}

export const START_PATHWAY_CARDS: StartPathwayCard[] = [
  {
    title: "Détecter mes triggers",
    text: "Repérer les situations, signaux ou contextes qui vous fragilisent pour mieux les anticiper.",
    href: "/outils/situations-evitees",
    icon: "footprints",
    steps: "CARNET GUIDÉ",
  },
  {
    title: "Construire mon rétablissement",
    text: "Rassembler vos ressources, vos repères et les petits pas qui soutiennent votre mieux-être.",
    href: "/outils/recovery-craig",
    icon: "sunrise",
    steps: "PARCOURS GUIDÉ",
  },
];
