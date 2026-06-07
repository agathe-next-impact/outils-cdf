import Link from "next/link";
import GameIcon from "@/components/GameIcon";

export function SessionNotice({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-3 border border-border p-3 text-sm ${className ?? ""}`}
      role="note"
    >
      <GameIcon name="info" size={20} className="mt-0.5 shrink-0 text-accent" />
      <p>
        Vos réponses restent dans cet onglet et seront effacées à sa fermeture. Rien
        n&apos;est envoyé sur Internet. Pensez à <strong>exporter</strong> pour conserver une
        trace.{" "}
        <Link className="text-accent hover:underline" href="/confidentialite">
          En savoir plus
        </Link>
        .
      </p>
    </div>
  );
}
