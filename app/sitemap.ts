import type { MetadataRoute } from "next";
import { getCatalog, CATEGORIES } from "@/data/catalog";
import { allPathwayIds } from "@/data/pathways";
import { SITE } from "@/config/site";

const BASE = SITE.url;

// Daté à la génération (build) : le site est statique, sans dates par page.
const LAST_MODIFIED = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/outils",
    "/parcours",
    "/ressources",
    "/contribuer",
    "/a-propos",
    "/confidentialite",
    "/mentions-legales",
  ];
  const categoryPaths = CATEGORIES.map((c) => `/categories/${c.key}`);
  const pathwayPaths = allPathwayIds().map((id) => `/parcours/${id}`);
  const toolPaths = getCatalog()
    .filter((e) => e.available)
    .map((e) => `/outils/${e.slug}`);

  return [...staticPaths, ...categoryPaths, ...pathwayPaths, ...toolPaths].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
