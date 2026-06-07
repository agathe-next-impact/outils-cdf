---
description: Crée un nouvel outil de la plateforme à partir de sa spécification (chaîne d'agents)
argument-hint: "<slug-ou-nom-de-spec>"
---

Crée un nouvel outil pour la plateforme « Comme des Fous » à partir d'une spécification de
`docs/outils/`. Argument reçu : `$ARGUMENTS` (slug souhaité ou nom du fichier de spec).

Orchestre la chaîne d'agents, en t'arrêtant pour validation si une décision de fond se pose :

1. **spec-adapter** — lit la spec et produit le plan de définition « session-only » (moteur, champs,
   sensibilité, garde-fous). Présente le plan.
2. **tool-builder** — écrit `src/data/tools/<slug>/definition.ts` et l'enregistre dans
   `src/engines/registry.ts` (retire le stub de `PLANNED` dans `src/data/catalog.ts`). Lance
   `npm run typecheck` + `npm run build`.
3. **content-redactor** — relit/ajuste tous les textes (ton non culpabilisant, non diagnostique).
4. **ui-ux-auditor** + **a11y-contrast-auditor** — audits charte et accessibilité.
5. **session-export-guard** — vérifie l'absence de fuite réseau et la parité état↔export.

Termine par un résumé : fichiers créés/modifiés, moteur utilisé, état des audits, et confirmation
que `npm run build`, `npm run lint` et `npm test` passent.
