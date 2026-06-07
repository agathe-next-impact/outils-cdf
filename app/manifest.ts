import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

/**
 * Manifeste PWA — permet l'installation de « Peer to Peer » sur mobile
 * (écran d'accueil, mode standalone, splash). Aucune donnée n'y transite ;
 * l'app reste 100 % front et session-only.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Boîte à outils`,
    short_name: SITE.name,
    description:
      "Outils d'auto-observation et de soutien au rétablissement, en libre accès. " +
      "Sans compte, rien n'est envoyé : tout reste dans votre navigateur.",
    lang: "fr",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#030712",
    theme_color: "#030712",
    categories: ["health", "lifestyle", "medical"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
