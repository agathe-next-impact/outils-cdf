"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import GameIcon from "@/components/GameIcon";
import type { CatalogEntry } from "@/data/catalog";
import { FOCUS_RING } from "@/lib/a11y";

function norm(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function searchText(entry: CatalogEntry): string {
  return norm(`${entry.title} ${entry.shortTitle ?? ""} ${entry.summary} ${(entry.keywords ?? []).join(" ")}`);
}

export function PrivateCatalogSearch({ entries }: { entries: CatalogEntry[] }) {
  const [query, setQuery] = useState("");

  const normalizedQuery = norm(query.trim());
  const results = useMemo(() => {
    if (!normalizedQuery) return [];

    return entries
      .filter((entry) => {
        if (!entry.available) return false;
        return searchText(entry).includes(normalizedQuery);
      })
      .slice(0, 4);
  }, [entries, normalizedQuery]);

  const suggestion = results.find((entry) => {
    const label = norm(entry.shortTitle ?? entry.title);
    return label !== normalizedQuery;
  });

  return (
    <div className="private-search">
      <div className="search">
        <GameIcon name="search" size={18} className="shrink-0 text-accent" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher un outil..."
          aria-label="Rechercher un outil"
        />
      </div>

      {query.trim() !== "" && (
        <div className="private-search-results" aria-live="polite">
          {suggestion ? (
            <button
              type="button"
              className={`search-suggestion ${FOCUS_RING}`}
              onClick={() => setQuery(suggestion.shortTitle ?? suggestion.title)}
            >
              <GameIcon name="sparkles" size={14} aria-hidden />
              Suggestion&nbsp;: {suggestion.shortTitle ?? suggestion.title}
            </button>
          ) : null}
          {results.length > 0 ? (
            results.map((entry) => (
              <Link
                key={entry.slug}
                href={`/outils/${entry.slug}`}
                className={`private-search-result ${FOCUS_RING}`}
              >
                <span>
                  <GameIcon name={entry.iconName} size={16} aria-hidden />
                  {entry.shortTitle ?? entry.title}
                </span>
                <GameIcon name="arrow-right" size={14} aria-hidden />
              </Link>
            ))
          ) : (
            <p className="private-search-empty">Aucun outil trouvé.</p>
          )}
        </div>
      )}
    </div>
  );
}
