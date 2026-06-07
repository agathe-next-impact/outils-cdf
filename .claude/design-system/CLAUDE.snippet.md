<!-- ===== À COLLER DANS LE CLAUDE.md DU PROJET CIBLE ===== -->

## Charte UI/UX (obligatoire) — « Comme des Fous »

Référence complète : `.claude/design-system/DESIGN_SYSTEM.md`. Toute UI doit respecter ces 7 lois :

1. **Tout est carré** — `* { border-radius:0 !important }` global ; aucun angle arrondi visible.
2. **Aucune ombre** — `box-shadow:none !important` ; pas de `shadow-*`.
3. **Palette verrouillée** — noir/blanc (inversibles selon le thème) + 3 accents fixes :
   jaune `#f5c400` (progression/secondaire), rouge `#d63a3a` (action/danger), bleu `#3a6ed6` (info/liens).
   Jamais de `#000`/`#fff` en dur pour du contenu thémé → utiliser `text-black`/`bg-white`/tokens.
4. **Typo** — `Belanosima` pour les titres (UPPERCASE, tracking-tight) ; `Open Sans` pour le corps.
5. **Icônes** — lucide-react uniquement, via `<GameIcon>`. **Zéro emoji.**
6. **Mode sombre** — via `next-themes` (classe `.dark`), par inversion `--background`/`--foreground`.
7. **Animations** — entrées en `animate-slide-up` décalé (`animationDelay` en cascade) ; décor en
   `animate-float` ; récompenses en `animate-bounce-in` + `<Confetti>`.

Composants réutilisables : `.card` (accents d'angle jaune/rouge), `.btn-primary` (rouge),
`.btn-secondary` (jaune), `GameIcon`, `DecodeText`, `Confetti`, `ThemeToggle`.
Wrapper de page : `min-h-[calc(100vh-80px)] px-4 py-12` + conteneur `max-w-* mx-auto`.

En cas de doute, lancer l'agent `ui-ux-auditor` avant de committer une UI.
