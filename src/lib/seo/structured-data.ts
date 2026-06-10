/**
 * Données structurées schema.org (JSON-LD).
 *
 * Tout est construit à partir de constantes statiques (`SITE`, `EDITEUR`) : aucune
 * saisie utilisateur n'y transite, l'invariant de confidentialité est préservé.
 * Le graphe « site » (Organization + WebSite + WebApplication) est posé une fois,
 * sur l'accueil ; les pages profondes ajoutent un fil d'Ariane (BreadcrumbList).
 */
import { SITE, EDITEUR } from "@/config/site";

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

const SITE_DESCRIPTION =
  "Plateforme libre d'outils d'auto-observation et de soutien au rétablissement, " +
  "sans compte et sans envoi de données : tout reste dans le navigateur.";

function organization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: EDITEUR.brand,
    legalName: EDITEUR.legalName,
    url: SITE.url,
    email: EDITEUR.email,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/icon-512.png`,
      width: 512,
      height: 512,
    },
  };
}

function webSite() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.tagline,
    inLanguage: "fr-FR",
    publisher: { "@id": ORG_ID },
  };
}

function webApplication() {
  return {
    "@type": "WebApplication",
    name: `${SITE.name} — Boîte à outils`,
    url: SITE.url,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript.",
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    description: SITE_DESCRIPTION,
    publisher: { "@id": ORG_ID },
  };
}

/** Graphe global du site (à poser une seule fois, sur l'accueil). */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organization(), webSite(), webApplication()],
  };
}

export interface Crumb {
  name: string;
  /** Chemin absolu côté site, ex. `/outils/plan-de-crise`. */
  path: string;
}

/** Fil d'Ariane structuré pour une page profonde (outil, parcours…). */
export function breadcrumb(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}
