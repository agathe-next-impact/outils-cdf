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
  blue: "bg-blue text-white",
  red: "bg-red text-white",
  yellow: "bg-yellow text-black",
};
const BORDER: Record<Accent, string> = {
  blue: "border-blue",
  red: "border-red",
  yellow: "border-yellow",
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
      <div className={`flex items-center gap-2 px-4 py-3 ${BAND[accent]}`}>
        <GameIcon name={iconName} size={24} className={onYellow ? "text-black" : "text-white"} />
        <h2 className="font-heading text-xl font-black uppercase tracking-tight">{title}</h2>
      </div>
      {message ? (
        <div className={`border ${BORDER[accent]} border-t-0 bg-white px-4 py-3`}>
          <p>{message}</p>
        </div>
      ) : null}
    </section>
  );
}
