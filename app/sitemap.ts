import type { MetadataRoute } from "next";
import { getCatalog, CATEGORIES } from "@/data/catalog";
import { allPathwayIds } from "@/data/pathways";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://comme-des-fous.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/parcours",
    "/ressources",
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
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
