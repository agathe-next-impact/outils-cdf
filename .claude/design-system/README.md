# Kit UI/UX « Peer to Peer » — portable

Tout le nécessaire pour appliquer **strictement** cette charte UI/UX à un autre projet
Next.js + Tailwind v4.

## Contenu

| Fichier | Rôle |
|---|---|
| `DESIGN_SYSTEM.md` | **Source de vérité** : spec stricte et exhaustive (tokens, composants, animations, lois, checklist). |
| `globals.css` | Feuille de style portable (tokens `@theme`, thèmes chauds `:root`/`.dark`, arrondis + ombres douces, keyframes, `.card`/`.btn-*`). |
| `components/` | `GameIcon`, `DecodeText`, `Confetti`, `ThemeToggle`, `ThemeProvider` — copiables tels quels. |
| `INSTALL.md` | Étapes d'installation manuelle dans un projet cible. |
| `CLAUDE.snippet.md` | Bloc à coller dans le `CLAUDE.md` du projet cible (résumé des 7 lois). |

## Agents & commande associés

- `.claude/agents/ui-ux-porter.md` — installe + applique la charte (refactoring).
- `.claude/agents/ui-ux-auditor.md` — audite la conformité (lecture seule, rapport).
- `.claude/commands/charte-ui.md` — commande `/charte-ui [install|apply|audit|fix] [chemin]`.

## Démarrage rapide sur le projet cible

1. Copier `.claude/design-system/`, `.claude/agents/`, `.claude/commands/` à la racine du projet cible.
2. Lancer `/charte-ui install` (socle) puis `/charte-ui apply [chemin]` (refactoring).
3. Coller `CLAUDE.snippet.md` dans le `CLAUDE.md` du projet cible.
4. Contrôler avec `/charte-ui audit`.
