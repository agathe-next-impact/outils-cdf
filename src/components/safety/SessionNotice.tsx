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
        Tes réponses restent dans cet onglet et s&apos;effacent à sa fermeture. Rien ne part
        sur Internet — c&apos;est ton espace, à toi. Pour en garder une trace, pense à{" "}
        <strong>exporter</strong>.{" "}
        <Link className="text-accent hover:underline" href="/confidentialite">
          En savoir plus
        </Link>
        .
      </p>
    </div>
  );
}
