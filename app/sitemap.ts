import type { MetadataRoute } from "next";
import { getCatalog, CATEGORIES } from "@/data/catalog";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://comme-des-fous.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/ressources", "/a-propos", "/confidentialite", "/mentions-legales"];
  const categoryPaths = CATEGORIES.map((c) => `/categories/${c.key}`);
  const toolPaths = getCatalog()
    .filter((e) => e.available)
    .map((e) => `/outils/${e.slug}`);

  return [...staticPaths, ...categoryPaths, ...toolPaths].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
