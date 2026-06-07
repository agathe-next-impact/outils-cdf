import { ToolCard } from "./ToolCard";
import type { CatalogEntry } from "@/data/catalog";

export function CategoryGrid({ entries }: { entries: CatalogEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-sm text-black/60">Aucun outil dans cette catégorie pour l&apos;instant.</p>;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {entries.map((entry, i) => (
        <ToolCard key={entry.slug} entry={entry} index={i} />
      ))}
    </div>
  );
}
