/**
 * ContentBlock — blocs de contenu psychoéducatif rendus par ContentRenderer.
 * Volontairement limité et non culpabilisant. Pas de HTML libre.
 */
export type ContentBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered?: boolean; items: string[] }
  | { kind: "callout"; tone: "info" | "attention"; iconName?: string; text: string }
  /** Distingue un bon exemple d'un écueil (ex. fait observable vs interprétation). */
  | { kind: "example"; good?: string; avoid?: string; note?: string }
  | { kind: "definition"; term: string; def: string }
  | { kind: "quote"; text: string; source?: string };
