/**
 * Injecte un bloc de données structurées JSON-LD (schema.org).
 *
 * Server component sans dépendance client. Le contenu provient toujours de
 * constantes statiques (config du site) — jamais d'une saisie d'outil — donc
 * `JSON.stringify` est sûr ; on échappe seulement `<` par précaution XSS.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
