import type { ReactNode } from "react";
import Link from "next/link";
import GameIcon from "@/components/GameIcon";
import { accentBorder } from "@/lib/a11y";
import type { CatalogEntry } from "@/data/catalog";

function Badge({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 border border-black px-2 py-0.5 text-xs font-bold uppercase tracking-wide">
      <GameIcon name={icon} size={12} aria-hidden />
      {children}
    </span>
  );
}

function CardInner({ entry }: { entry: CatalogEntry }) {
  return (
    <>
      <div className="mb-3">
        <GameIcon
          name={entry.iconName}
          size={36}
          className={
            entry.accent === "yellow"
              ? "text-black"
              : entry.accent === "red"
                ? "text-red"
                : "text-blue"
          }
        />
      </div>
      <h3 className="mb-2 text-xl font-black uppercase leading-tight">
        {entry.shortTitle ?? entry.title}
      </h3>
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        {entry.estimatedMinutes ? <Badge icon="timer">≈ {entry.estimatedMinutes} min</Badge> : null}
        {entry.sensitivity === "high" ? <Badge icon="shield-check">Sensible</Badge> : null}
      </div>
      <p className="text-sm text-black/70">{entry.summary}</p>
      <div className="mt-3 flex items-center justify-between">
        {entry.available ? (
          <span className="flex items-center gap-1 text-sm font-bold text-red">
            Ouvrir <GameIcon name="arrow-right" size={16} />
          </span>
        ) : (
          <span className="border border-black px-2 py-0.5 text-xs font-bold uppercase tracking-wide">
            Bientôt
          </span>
        )}
      </div>
    </>
  );
}

export function ToolCard({ entry, index = 0 }: { entry: CatalogEntry; index?: number }) {
  const base = `card block h-full border ${accentBorder(entry.accent)} animate-slide-up`;
  const style = { animationDelay: `${index * 0.05}s` };

  if (!entry.available) {
    return (
      <div className={`${base} opacity-80`} style={style} aria-disabled>
        <CardInner entry={entry} />
      </div>
    );
  }

  return (
    <Link
      href={`/outils/${entry.slug}`}
      className={`${base} transition-transform hover:scale-[1.01]`}
      style={style}
    >
      <CardInner entry={entry} />
    </Link>
  );
}
