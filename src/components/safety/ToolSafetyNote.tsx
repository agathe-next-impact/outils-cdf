import Link from "next/link";
import GameIcon from "@/components/GameIcon";
import { getDisclaimer } from "@/content/disclaimers";

/**
 * Avertissement replié par défaut pour limiter le bruit visuel sur les pages outil.
 * Le texte complet reste disponible dans un accordéon natif, accessible au clavier.
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
    <details className={`safety-accordion border border-border ${className ?? ""}`}>
      <summary className="flex cursor-pointer items-center gap-2 p-3 text-sm font-semibold text-accent">
        <GameIcon name="info" size={18} className="shrink-0" aria-hidden />
        Avertissement
      </summary>
      <section
        className="border-t border-border p-3 pt-2 text-sm"
        role="note"
        aria-label="Avertissement avant de commencer"
      >
        <div className="space-y-1">
          <p>{d.long}</p>
          <p className="text-muted">
            Vos réponses restent dans cet onglet, ne sont jamais envoyées sur Internet, et
            s&apos;effacent à sa fermeture. Pensez à <strong>exporter</strong> pour en garder une
            trace.{" "}
            <Link className="text-accent hover:underline" href="/confidentialite">
              En savoir plus
            </Link>
            .
          </p>
        </div>
      </section>
    </details>
  );
}
