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
  blue: "bg-surface-2 text-foreground", /* neutre : l'accent rose reste sur l'icône/le filet */
  red: "bg-danger text-on-accent",      /* rouge sécurité (conservé) */
  yellow: "bg-surface-2 text-foreground",
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
  return (
    <section className="animate-bounce-in" aria-live="polite">
      {confetti ? <Confetti /> : null}
      <div className={`flex items-center gap-2 ${message ? "rounded-t-lg" : "rounded-lg"} px-4 py-3 ${BAND[accent]}`}>
        <GameIcon
          name={iconName}
          size={24}
          className={accent === "red" ? "text-on-accent" : accent === "blue" ? "text-accent" : "text-foreground"}
        />
        <h2 className="font-heading text-xl">{title}</h2>
      </div>
      {message ? (
        <div className={`rounded-b-lg border ${BORDER[accent]} border-t-0 bg-card px-4 py-3`}>
          <p>{message}</p>
        </div>
      ) : null}
    </section>
  );
}
