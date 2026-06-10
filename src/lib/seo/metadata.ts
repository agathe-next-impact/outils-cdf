/**
 * Fabrique de métadonnées de page (titre, description, canonical, OpenGraph,
 * Twitter) — pour homogénéiser le SEO sans répéter la même structure dans
 * chaque `generateMetadata`.
 *
 * L'image OG/Twitter n'est PAS définie ici : elle est servie automatiquement
 * par les fichiers `app/opengraph-image.png` / `app/twitter-image.png` (Next
 * les injecte sur toutes les routes). Les URLs relatives (`path`) sont
 * résolues via `metadataBase`, défini dans `app/layout.tsx`.
 */
import type { Metadata } from "next";
import { SITE } from "@/config/site";

interface PageMetaInput {
  /** Titre nu (sans le nom du site) — le gabarit ajoute « — Peer to Peer ». */
  title: string;
  description?: string;
  /** Chemin absolu côté site, ex. `/outils/plan-de-crise`. Sert de canonical. */
  path: string;
}

export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const full = `${title} — ${SITE.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: full, description, url: path, type: "website" },
    twitter: { title: full, description },
  };
}
