import GameIcon from "@/components/GameIcon";
import type { PitfallHit } from "./pitfalls";

/** Indices doux, jamais bloquants : invitations à préciser, sans jugement. */
export function PitfallHint({ hits }: { hits: PitfallHit[] }) {
  if (hits.length === 0) return null;
  return (
    <div className="space-y-2" aria-live="polite">
      {hits.map((h) => (
        <div
          key={h.ruleId}
          className="flex items-start gap-2 border border-border p-3 text-sm"
          role="note"
        >
          <GameIcon name="lightbulb" size={18} className="mt-0.5 shrink-0 text-blue" />
          <p>{h.message}</p>
        </div>
      ))}
    </div>
  );
}
