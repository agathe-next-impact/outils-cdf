import { ToolCard } from "./ToolCard";
import { BentoGrid, bentoSpan } from "@/components/layout/Bento";
import type { CatalogEntry } from "@/data/catalog";

export function CategoryGrid({ entries }: { entries: CatalogEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-sm text-muted">Aucun outil dans cette catégorie pour l&apos;instant.</p>;
  }
  return (
    <BentoGrid>
      {entries.map((entry, i) => (
        // Premier outil mis en avant (tuile vedette), les autres réguliers.
        // Empan porté par un wrapper afin que la ToolCard (.card h-full) le remplisse.
        <div key={entry.slug} className={bentoSpan(i === 0 ? 2 : 1)}>
          <ToolCard entry={entry} index={i} />
        </div>
      ))}
    </BentoGrid>
  );
}
