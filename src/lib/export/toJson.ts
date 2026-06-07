import type { NeutralDocument } from "./neutralDocument";

export interface JsonExport {
  schemaVersion: number;
  tool: { slug: string; title: string };
  generatedAt: string;
  document: NeutralDocument;
  /** État brut (réimportable). Optionnel. */
  raw?: unknown;
}

export const EXPORT_SCHEMA_VERSION = 1;

export function toJson(doc: NeutralDocument, raw?: unknown): string {
  const payload: JsonExport = {
    schemaVersion: EXPORT_SCHEMA_VERSION,
    tool: { slug: doc.toolSlug, title: doc.toolTitle },
    generatedAt: doc.generatedAt,
    document: doc,
    raw,
  };
  return JSON.stringify(payload, null, 2);
}
