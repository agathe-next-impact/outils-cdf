import Link from "next/link";
import GameIcon from "@/components/GameIcon";
import { BentoGrid, bentoSpan } from "@/components/layout/Bento";
import { FOCUS_RING } from "@/lib/a11y";
import type { PathwaySummary } from "@/data/pathways";

/** Grille de cartes-objectifs menant aux parcours (traitement calme unifié). */
export function PathwayCards({ pathways }: { pathways: PathwaySummary[] }) {
  return (
    <BentoGrid>
      {pathways.map((p, i) => {
        // Première et dernière tuiles élargies (2 col) : vedette d'entrée + clôture de la grille.
        const span = i === 0 || i === pathways.length - 1 ? 2 : 1;
        return (
          <Link
            key={p.id}
            href={`/parcours/${p.id}`}
            className={`box link block h-full animate-slide-up border-l-[3px] border-l-accent ${bentoSpan(span)} ${FOCUS_RING}`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <h3 className="font-heading text-lg tracking-tight">{p.goal}</h3>
            <p className="mt-2 text-sm text-muted">{p.pitch}</p>
            <p className="mt-3 flex items-center justify-between text-sm">
              <span className="text-muted">
                {p.stepCount} étape{p.stepCount > 1 ? "s" : ""}
              </span>
              <span className="tlink">
                Commencer <GameIcon name="arrow-right" size={16} aria-hidden />
              </span>
            </p>
          </Link>
        );
      })}
    </BentoGrid>
  );
}
