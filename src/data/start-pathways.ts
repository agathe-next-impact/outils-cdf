import type { ToolCategory } from "@/engines/types";

export interface StartPathwayCard {
  title: string;
  text: string;
  href: string;
  icon: string;
  steps: string;
  /** Catégorie de l'outil cible → couleur d'accent de la carte. */
  cat: ToolCategory;
}

export const START_PATHWAY_CARDS: StartPathwayCard[] = [
  {
    title: "Détecter mes triggers",
    text: "Repérer les situations, signaux ou contextes qui te fragilisent pour mieux les anticiper.",
    href: "/outils/situations-evitees",
    icon: "footprints",
    steps: "CARNET GUIDÉ",
    cat: "carnets",
  },
  {
    title: "Construire mon rétablissement",
    text: "Rassembler tes ressources, tes repères et les petits pas qui soutiennent ton mieux-être.",
    href: "/outils/recovery-craig",
    icon: "sunrise",
    steps: "PARCOURS GUIDÉ",
    cat: "parcours",
  },
];
