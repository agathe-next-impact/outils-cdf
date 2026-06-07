"use client";

/**
 * Celebration — bandeau de fin/jalon partagé par tous les moteurs.
 * Bandeau d'accent plein (color-blocking) + entrée `bounce-in` + confetti opt-in.
 * Le confetti est volontairement OPT-IN : on ne célèbre jamais un score « lourd »
 * (on remercie l'acte de prendre du temps pour soi, pas le résultat).
 */
import Confetti from "@/components/Confetti";
import GameIcon from "@/components/GameIcon";
import type { Accent } from "@/engines/types";

const BAND: Record<Accent, string> = {
  blue: "bg-info text-white",
  red: "bg-danger text-white",
  yellow: "bg-warning-soft text-foreground",
};
const BORDER: Record<Accent, string> = {
  blue: "border-info",
  red: "border-danger",
  yellow: "border-warning",
};

export function Celebration({
  title,
  message,
  confetti = false,
  iconName = "party-popper",
  accent = "blue",
}: {
  title: string;
  message?: string;
  confetti?: boolean;
  iconName?: string;
  accent?: Accent;
}) {
  const onYellow = accent === "yellow";
  return (
    <section className="animate-bounce-in" aria-live="polite">
      {confetti ? <Confetti /> : null}
      <div className={`flex items-center gap-2 ${message ? "rounded-t-lg" : "rounded-lg"} px-4 py-3 ${BAND[accent]}`}>
        <GameIcon name={iconName} size={24} className={onYellow ? "text-foreground" : "text-white"} />
        <h2 className="font-heading text-xl font-semibold">{title}</h2>
      </div>
      {message ? (
        <div className={`rounded-b-lg border ${BORDER[accent]} border-t-0 bg-card px-4 py-3`}>
          <p>{message}</p>
        </div>
      ) : null}
    </section>
  );
}
