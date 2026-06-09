import { SITE } from "@/config/site";

/**
 * Logo « Peer to Peer » — mascotte « Brioche » de la charte Lagune : un carré
 * arrondi en accent framboise, deux yeux + un sourire en cream, deux joues rosées.
 * Couleurs via tokens → s'adapte au thème (clair/sombre) et au contexte.
 *
 * Purement présentationnel (aucun hook) → utilisable côté serveur et client.
 */
export function Logo({
  size = 24,
  showWordmark = true,
  className = "",
}: {
  /** Côté du carré, en pixels. */
  size?: number;
  /** Afficher le texte « Peer to Peer » à côté de la marque. */
  showWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 72 72"
        aria-hidden
        className="shrink-0"
      >
        <rect x="4" y="4" width="64" height="64" rx="20" fill="var(--accent-2)" />
        <circle cx="26" cy="30" r="4" fill="var(--on-accent)" />
        <circle cx="46" cy="30" r="4" fill="var(--on-accent)" />
        <path
          d="M22 44 Q36 56 50 44"
          stroke="var(--on-accent)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="14" cy="40" r="2.5" fill="var(--tile-peach)" opacity="0.85" />
        <circle cx="58" cy="40" r="2.5" fill="var(--tile-peach)" opacity="0.85" />
      </svg>
      {showWordmark ? (
        <span className="font-heading font-semibold leading-none tracking-tight">
          {SITE.name}
        </span>
      ) : (
        <span className="sr-only">{SITE.name}</span>
      )}
    </span>
  );
}
