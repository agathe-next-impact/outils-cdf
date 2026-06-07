import Link from "next/link";
import GameIcon from "@/components/GameIcon";
import { FOCUS_RING } from "@/lib/a11y";
import type { PathwaySummary } from "@/data/pathways";

function band(accent: PathwaySummary["accent"]): string {
  return accent === "yellow"
    ? "bg-yellow text-black"
    : accent === "red"
      ? "bg-red text-white"
      : "bg-blue text-white";
}

/** Grille de cartes-objectifs (color-blocking) menant aux parcours. */
export function PathwayCards({ pathways }: { pathways: PathwaySummary[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {pathways.map((p, i) => {
        const onYellow = p.accent === "yellow";
        return (
          <Link
            key={p.id}
            href={`/parcours/${p.id}`}
            className={`block animate-slide-up transition-transform hover:scale-[1.01] ${FOCUS_RING}`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className={`flex items-center gap-2 px-4 py-3 ${band(p.accent)}`}>
              <GameIcon
                name={p.iconName}
                size={24}
                className={onYellow ? "text-black" : "text-white"}
                aria-hidden
              />
              <h3 className="font-heading text-lg font-black uppercase tracking-tight">{p.goal}</h3>
            </div>
            <div className="border border-t-0 border-black p-4">
              <p className="text-sm text-black/70">{p.pitch}</p>
              <p className="mt-3 flex items-center justify-between text-sm">
                <span className="text-black/60">
                  {p.stepCount} étape{p.stepCount > 1 ? "s" : ""}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-red">
                  Commencer <GameIcon name="arrow-right" size={16} aria-hidden />
                </span>
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
