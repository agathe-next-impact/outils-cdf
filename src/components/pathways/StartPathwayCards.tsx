import Link from "next/link";
import GameIcon from "@/components/GameIcon";
import { START_PATHWAY_CARDS } from "@/data/start-pathways";
import { FOCUS_RING } from "@/lib/a11y";

// Badge par position : 1re carte = carnet (pêche), 2e = parcours (poudré).
const BADGE = ["ebadge-carnet", "ebadge-parcours"];

/**
 * Deux portes d'entrée « Par où commencer ».
 * - `variant="entry"` : look maquette d'accueil (carte cream + badge mono),
 *   À RENDRE dans un conteneur `.home-lg .entries`.
 * - `variant="box"` (défaut) : tuile bento `.box` (page /parcours), span 6 colonnes.
 * Chaque carte porte `data-cat` → son accent (filet, icône, lien) suit la
 * couleur de la catégorie de l'outil cible.
 */
export function StartPathwayCards({ variant = "box" }: { variant?: "box" | "entry" }) {
  if (variant === "entry") {
    return (
      <>
        {START_PATHWAY_CARDS.map((card, i) => (
          <Link
            key={card.title}
            href={card.href}
            data-cat={card.cat}
            className={`entry ${FOCUS_RING}`}
          >
            <span className={`ebadge ${BADGE[i] ?? "ebadge-carnet"}`}>{card.steps}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <span className="go">
              Commencer <GameIcon name="arrow-right" size={15} aria-hidden />
            </span>
          </Link>
        ))}
      </>
    );
  }

  return (
    <>
      {START_PATHWAY_CARDS.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          data-cat={card.cat}
          className={`box parc parc--big link c6 box--accent ${FOCUS_RING}`}
        >
          <div className="ptitle">
            <GameIcon name={card.icon} size={24} aria-hidden /> {card.title}
          </div>
          <p className="pdesc">{card.text}</p>
          <div className="pfoot">
            <span className="steps">{card.steps}</span>
            <span className="tlink">
              Commencer <GameIcon name="arrow-right" size={15} aria-hidden />
            </span>
          </div>
        </Link>
      ))}
    </>
  );
}
