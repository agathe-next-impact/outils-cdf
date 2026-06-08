import type { ReactNode } from "react";
import Link from "next/link";
import GameIcon from "@/components/GameIcon";
import { FOCUS_RING } from "@/lib/a11y";
import type { CatalogEntry } from "@/data/catalog";

function CardInner({ entry }: { entry: CatalogEntry }): ReactNode {
  return (
    <>
      <div className="tico">
        <GameIcon name={entry.iconName} size={20} aria-hidden />
      </div>
      <h3>{entry.shortTitle ?? entry.title}</h3>
      <div className="meta">
        {entry.estimatedMinutes ? (
          <span className="badge">
            <GameIcon name="timer" size={12} aria-hidden /> ≈ {entry.estimatedMinutes} min
          </span>
        ) : null}
        {entry.sensitivity === "high" ? (
          <span className="badge badge--sensible">Sensible</span>
        ) : null}
      </div>
      {entry.keywords && entry.keywords.length > 0 ? (
        <ul className="tags" aria-label="Mots clés">
          {entry.keywords.slice(0, 3).map((kw) => (
            <li key={kw} className="tag">
              {kw}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="source-credit">
        <span>Source&nbsp;:</span> {entry.sourceCredit}
      </p>
      {entry.available ? (
        <span className="tlink open">
          Ouvrir <GameIcon name="arrow-right" size={16} aria-hidden />
        </span>
      ) : (
        <span className="open">
          <span className="badge">Bientôt</span>
        </span>
      )}
    </>
  );
}

export function ToolCard({
  entry,
  index = 0,
  featured = false,
}: {
  entry: CatalogEntry;
  index?: number;
  featured?: boolean;
}) {
  const base = `box tool ${featured ? "tool--big " : ""}block h-full animate-slide-up`;
  const style = { animationDelay: `${index * 0.05}s` };

  if (!entry.available) {
    return (
      <div className={`${base} opacity-80`} data-cat={entry.category} style={style} aria-disabled>
        <CardInner entry={entry} />
      </div>
    );
  }

  return (
    <Link
      href={`/outils/${entry.slug}`}
      data-cat={entry.category}
      className={`${base} link ${FOCUS_RING}`}
      style={style}
    >
      <CardInner entry={entry} />
    </Link>
  );
}
