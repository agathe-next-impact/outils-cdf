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

function norm(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
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
  const [sort, setSort] = useState<SortKey>("default");

  const results = useMemo(() => {
    const nq = norm(query.trim());
    const list = entries.filter((e) => {
      if (cat !== "all" && e.category !== cat) return false;
      const m = e.estimatedMinutes ?? 0;
      if (dur === "court" && !(m > 0 && m <= 10)) return false;
      if (dur === "moyen" && !(m > 10 && m <= 20)) return false;
      if (dur === "long" && !(m > 20)) return false;
      if (nq) {
        const hay = norm(`${e.title} ${e.shortTitle ?? ""} ${e.summary}`);
        if (!hay.includes(nq)) return false;
      }
      return true;
    });
    if (sort === "duree") {
      return [...list].sort((a, b) => (a.estimatedMinutes ?? 0) - (b.estimatedMinutes ?? 0));
    }
    return list;
  }, [entries, query, cat, dur, sort]);

  const hasFilters = query !== "" || cat !== "all" || dur !== "all" || sort !== "default";
  const resetFilters = () => {
    setQuery("");
    setCat("all");
    setDur("all");
    setSort("default");
  };

  const chipCls = (active: boolean) => `chip ${active ? "on" : ""} ${FOCUS_RING}`;

  // Empans pour le rythme éditorial : première tuile vedette (c7), 2e (c5), puis 3-up (c4).
  const spanCls = (i: number) => (i === 0 ? "c7" : i === 1 ? "c5" : "c4");

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
          <div className="filters">
            <button type="button" aria-pressed={cat === "all"} className={chipCls(cat === "all")} onClick={() => setCat("all")}>
              Tous
            </button>
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                aria-pressed={cat === c.key}
                className={chipCls(cat === c.key)}
                onClick={() => setCat(c.key)}
              >
                {c.label}
              </button>
            ))}
            <span className="sep" aria-hidden />
            {(Object.keys(DUR_LABEL) as DurFilter[]).map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={dur === d}
                className={chipCls(dur === d)}
                onClick={() => setDur(d)}
              >
                {DUR_LABEL[d]}
              </button>
            ))}
            <label className="right">
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
        {hasFilters ? " correspondant à votre recherche" : ""}
      </p>

      {/* Résultats */}
      {results.length > 0 ? (
        <section className="bento" style={{ gridAutoFlow: "row dense" }}>
          {results.map((entry, i) => (
            <div key={entry.slug} className={spanCls(i)}>
              <ToolCard entry={entry} index={i} featured={i === 0} />
            </div>
          ))}
        </section>
      ) : (
        <div className="box text-center">
          <GameIcon name="search" size={36} className="mx-auto mb-2 text-accent" aria-hidden />
          <p className="mb-3 font-semibold">Aucun outil ne correspond à votre recherche.</p>
          <button type="button" className="btn-secondary" onClick={resetFilters}>
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </section>
  );
}
