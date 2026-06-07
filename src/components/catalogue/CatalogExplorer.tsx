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
import { BentoGrid, bentoSpan } from "@/components/layout/Bento";
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

  const chip = (active: boolean, activeClass = "bg-accent text-white border border-accent") =>
    `px-3 py-1 text-sm font-semibold tracking-wide transition-colors ${FOCUS_RING} ${
      active ? activeClass : "border border-border text-muted hover:text-accent"
    }`;

  return (
    <section aria-label="Explorer les outils">
      {/* Recherche */}
      <div className="mb-4 flex items-center gap-2 border border-border px-3 py-2">
        <GameIcon name="search" size={20} className="shrink-0 text-info" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un outil…"
          aria-label="Rechercher un outil"
          className="w-full bg-transparent font-semibold focus:outline-none"
        />
      </div>

      {/* Filtres catégorie */}
      <div className="mb-2 flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
        <button
          type="button"
          aria-pressed={cat === "all"}
          className={chip(cat === "all")}
          onClick={() => setCat("all")}
        >
          Tous
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            aria-pressed={cat === c.key}
            className={chip(cat === c.key)}
            onClick={() => setCat(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Filtres durée + tri */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par durée">
          {(Object.keys(DUR_LABEL) as DurFilter[]).map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={dur === d}
              className={chip(dur === d)}
              onClick={() => setDur(d)}
            >
              {DUR_LABEL[d]}
            </button>
          ))}
        </div>
        <label className="ml-auto flex items-center gap-2 text-sm">
          <span className="font-semibold tracking-wide text-info">Trier</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className={`border border-border bg-card px-2 py-1 font-semibold ${FOCUS_RING}`}
          >
            <option value="default">Par défaut</option>
            <option value="duree">Plus court d&apos;abord</option>
          </select>
        </label>
      </div>

      {/* Compteur */}
      <p className="mb-4 text-sm text-muted" aria-live="polite">
        {results.length} outil{results.length > 1 ? "s" : ""}
        {hasFilters ? " correspondant à votre recherche" : ""}
      </p>

      {/* Résultats */}
      {results.length > 0 ? (
        <BentoGrid>
          {results.map((entry, i) => (
            // Premier résultat mis en avant (tuile vedette), les autres réguliers.
            // Empan porté par un wrapper afin que la ToolCard (.card h-full) le remplisse.
            <div key={entry.slug} className={bentoSpan(i === 0 ? 2 : 1)}>
              <ToolCard entry={entry} index={i} />
            </div>
          ))}
        </BentoGrid>
      ) : (
        <div className="card text-center">
          <GameIcon name="search" size={36} className="mx-auto mb-2 text-info" aria-hidden />
          <p className="mb-3 font-semibold">Aucun outil ne correspond à votre recherche.</p>
          <button type="button" className="btn-secondary" onClick={resetFilters}>
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </section>
  );
}
