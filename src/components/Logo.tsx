import { SITE } from "@/config/site";

/**
 * Logo « Peer to Peer » — adapté du monogramme Next Impact : un carré plein
 * (couleur de marque terracotta) signé d'un point clair, accolé au wordmark en
 * serif éditoriale (Newsreader). Angles doux et ombres discrètes à l'échelle UI.
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
      {/* Carré de marque orange + point blanc (écho du « . » du monogramme NI). */}
      <span
        aria-hidden
        className="relative inline-block shrink-0 bg-accent"
        style={{ width: size, height: size }}
      >
        <span
          className="absolute bg-white"
          style={{
            width: Math.max(2, size * 0.18),
            height: Math.max(2, size * 0.18),
            right: size * 0.16,
            bottom: size * 0.16,
          }}
        />
      </span>
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
