import Link from "next/link";
import GameIcon from "@/components/GameIcon";
import { getDisclaimer } from "@/content/disclaimers";

/**
 * Bloc unique « à savoir » fusionnant l'avertissement (non-diagnostique) et la
 * note de session (confidentialité), pour éviter l'empilement de bandeaux
 * anxiogène. Ton calme et rassurant.
 */
export function ToolSafetyNote({
  disclaimerKey,
  className,
}: {
  disclaimerKey: string;
  className?: string;
}) {
  const d = getDisclaimer(disclaimerKey);
  return (
    <section
      className={`flex items-start gap-3 border border-black p-3 text-sm ${className ?? ""}`}
      role="note"
      aria-label="À savoir avant de commencer"
    >
      <GameIcon name="info" size={20} className="mt-0.5 shrink-0 text-blue" aria-hidden />
      <div className="space-y-1">
        <p>{d.long}</p>
        <p className="text-black/70">
          Vos réponses restent dans cet onglet, ne sont jamais envoyées sur Internet, et
          s&apos;effacent à sa fermeture. Pensez à <strong>exporter</strong> pour en garder une
          trace.{" "}
          <Link className="text-blue hover:underline" href="/confidentialite">
            En savoir plus
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
