---
description: Installe / applique / audite la charte UI-UX « Comme des Fous » sur le projet courant
argument-hint: "[install|apply|audit|fix] [chemin optionnel]"
---

Applique la charte UI/UX « Comme des Fous ». Référence : `.claude/design-system/DESIGN_SYSTEM.md`.

Argument reçu : `$ARGUMENTS`

Interprète le **premier mot** comme le mode (défaut : `apply` si non précisé), le reste comme un
chemin/périmètre optionnel :

- **install** → installer uniquement le socle (deps, `globals.css`, polices + `ThemeProvider` dans le
  layout, composants `GameIcon`/`DecodeText`/`Confetti`/`ThemeToggle`/`ThemeProvider`). Voir
  `.claude/design-system/INSTALL.md`. Délègue à l'agent **ui-ux-porter** (étapes 1–2).
- **apply** (défaut) → installer le socle SI nécessaire, puis refactorer l'UI du périmètre indiqué
  pour la rendre strictement conforme. Délègue à l'agent **ui-ux-porter** (procédure complète).
- **audit** → contrôle de conformité en lecture seule + rapport (verdict, score, violations
  fichier:ligne, correctifs). Délègue à l'agent **ui-ux-auditor**.
- **fix** → lancer **ui-ux-auditor** puis **ui-ux-porter** pour corriger les violations trouvées,
  et re-auditer pour confirmer.

Si le kit `.claude/design-system/` est absent du projet courant, signale-le et propose de le copier
depuis le projet source avant de continuer.

Termine par un résumé concis de ce qui a été fait/trouvé et l'état de conformité (`npm run build` &
`npm run lint` doivent passer après un `apply`/`fix`).
