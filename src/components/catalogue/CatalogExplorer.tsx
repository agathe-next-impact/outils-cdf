"use client";

/**
 * Explorateur de catalogue : recherche plein-texte (client), filtres par
 * catégorie / durée, tri, et grille de résultats. 100 % côté client (aucune
 * requête réseau). Charte « Minimalisme éditorial chaleureux » : douceur
 * (arrondi + ombre basse), palette désaturée ; la puce active prend l'accent
 * terracotta, les inactives restent en texte secondaire.
 */
import { useMemo, useState } from "react";
import { ToolCard } from "./ToolCard";
import GameIcon from "@/components/GameIcon";
import { FOCUS_RING } from "@/lib/a11y";
import type { CatalogEntry, CategoryInfo } from "@/data/catalog";
import type { ToolCategory } from "@/engines/types";

type DurFilter = "all" | "court" | "moyen" | "long";
type SortKey = "default" | "duree";

const DUR_LABEL: Record<DurFilter, string> = {
  all: "Toutes durées",
  court: "≤ 10 min",
  moyen: "10–20 min",
  long: "> 20 min",
};

// Taille de la tuile selon la durée. La grille reste sur 4 colonnes (1 col = c3) ;
// une carte occupe au plus 2 de ces colonnes :
//   < 30 min → 1 col (c3, 1/4) · ≥ 30 min → 2 col (c6, 1/2).
// Durée inconnue (0) → 1 col.
function durSpan(min: number | undefined): string {
  return (min ?? 0) < 30 ? "c3" : "c6";
}

function norm(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function searchText(entry: CatalogEntry): string {
  return norm(`${entry.title} ${entry.shortTitle ?? ""} ${entry.summary} ${(entry.keywords ?? []).join(" ")}`);
}

export function CatalogExplorer({
  entries,
  categories,
}: {
  entries: CatalogEntry[];
  categories: CategoryInfo[];
}) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<ToolCategory | "all">("all");
  const [dur, setDur] = useState<DurFilter>("all");
  const [keyword, setKeyword] = useState("all");
  const [sort, setSort] = useState<SortKey>("default");
  const normalizedQuery = norm(query.trim());

  const keywordOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const entry of entries) {
      for (const kw of entry.keywords ?? []) {
        const key = norm(kw);
        if (!seen.has(key)) seen.set(key, kw);
      }
    }
    return [...seen.entries()].sort((a, b) => a[1].localeCompare(b[1], "fr"));
  }, [entries]);

  const results = useMemo(() => {
    const list = entries.filter((e) => {
      if (cat !== "all" && e.category !== cat) return false;
      const m = e.estimatedMinutes ?? 0;
      if (dur === "court" && !(m > 0 && m <= 10)) return false;
      if (dur === "moyen" && !(m > 10 && m <= 20)) return false;
      if (dur === "long" && !(m > 20)) return false;
      if (keyword !== "all" && !(e.keywords ?? []).some((kw) => norm(kw) === keyword)) return false;
      if (normalizedQuery) {
        if (!searchText(e).includes(normalizedQuery)) return false;
      }
      return true;
    });
    if (sort === "duree") {
      return [...list].sort((a, b) => (a.estimatedMinutes ?? 0) - (b.estimatedMinutes ?? 0));
    }
    return list;
  }, [entries, normalizedQuery, cat, dur, keyword, sort]);

  const suggestion = normalizedQuery
    ? results.find((entry) => norm(entry.shortTitle ?? entry.title) !== normalizedQuery)
    : undefined;

  const hasFilters = query !== "" || cat !== "all" || dur !== "all" || keyword !== "all" || sort !== "default";
  const resetFilters = () => {
    setQuery("");
    setCat("all");
    setDur("all");
    setKeyword("all");
    setSort("default");
  };

  return (
    <section aria-label="Explorer les outils">
      {/* Barre d'outils (recherche + filtres + tri) */}
      <div className="bento">
        <div className="box toolbar c12">
          <div className="search">
            <GameIcon name="search" size={18} className="shrink-0 text-accent" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un outil…"
              aria-label="Rechercher un outil"
            />
          </div>
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
          <div className="filters">
            <label>
              <GameIcon name="layout-grid" size={15} aria-hidden /> Catégorie
              <select value={cat} onChange={(e) => setCat(e.target.value as ToolCategory | "all")} aria-label="Filtrer par catégorie">
                <option value="all">Toutes</option>
                {categories.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <GameIcon name="timer" size={15} aria-hidden /> Durée
              <select value={dur} onChange={(e) => setDur(e.target.value as DurFilter)} aria-label="Filtrer par durée">
                {(Object.keys(DUR_LABEL) as DurFilter[]).map((d) => (
                  <option key={d} value={d}>
                    {DUR_LABEL[d]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <GameIcon name="tag" size={15} aria-hidden /> Mot clé
              <select value={keyword} onChange={(e) => setKeyword(e.target.value)} aria-label="Filtrer par mot clé">
                <option value="all">Tous</option>
                {keywordOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <GameIcon name="list-checks" size={15} aria-hidden /> Trier
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Trier les outils">
                <option value="default">Par défaut</option>
                <option value="duree">Durée</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <p className="count-line" aria-live="polite">
        {results.length} outil{results.length > 1 ? "s" : ""}
        {hasFilters ? " correspondant à ta recherche" : ""}
      </p>

      {/* Résultats */}
      {results.length > 0 ? (
        <section className="bento" style={{ gridAutoFlow: "row dense" }}>
          {results.map((entry, i) => {
            const span = durSpan(entry.estimatedMinutes);
            return (
              <div key={entry.slug} className={span}>
                <ToolCard entry={entry} index={i} featured={span === "c6"} />
              </div>
            );
          })}
        </section>
      ) : (
        <div className="box text-center">
          <GameIcon name="search" size={36} className="mx-auto mb-2 text-accent" aria-hidden />
          <p className="mb-3 font-semibold">Aucun outil ne correspond à ta recherche.</p>
          <button type="button" className="btn-secondary" onClick={resetFilters}>
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </section>
  );
}
