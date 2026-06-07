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
        // Premier objectif mis en avant (tuile vedette), les autres réguliers.
        const span = i === 0 ? 2 : 1;
        return (
          <Link
            key={p.id}
            href={`/parcours/${p.id}`}
            className={`box link block h-full animate-slide-up border-l-[3px] border-l-accent ${bentoSpan(span)} ${FOCUS_RING}`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-center gap-2">
              <GameIcon name={p.iconName} size={24} className="text-accent" aria-hidden />
              <h3 className="font-heading text-lg tracking-tight">{p.goal}</h3>
            </div>
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
