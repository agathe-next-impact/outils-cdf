<!-- ===== À COLLER DANS LE CLAUDE.md DU PROJET CIBLE ===== -->

## Charte UI/UX (obligatoire) — « Peer to Peer »

Référence complète : `.claude/design-system/DESIGN_SYSTEM.md`. Système **« Minimalisme éditorial
chaleureux »**. Toute UI doit respecter ces 7 lois :

1. **Profondeur douce** — angles **arrondis** (`--radius*`) et ombres **basses/discrètes**
   (`--shadow-sm`/`--shadow`). Pas d'ombre dure ; ne pas réintroduire le reset carré/zéro-ombre.
2. **Calme avant tout** — espace négatif généreux, faible densité, aucun aplat de couleur vive
   sur grande surface.
3. **Palette chaude et désaturée** — fond sable / encre chaude (inversibles selon le thème) + accent
   de marque **terracotta** + 4 sémantiques apaisées : info `#3f6e8c`, succès `#5e7c5a`, attention
   `#b07d2b`, danger `#b23a2e`. Jamais de `#000`/`#fff` en dur pour du contenu thémé → `text-foreground`/`bg-background`/tokens.
4. **Typo** — `Newsreader` (serif) pour les titres, **casse normale** (jamais d'UPPERCASE/`font-black`) ;
   `Open Sans` pour le corps.
5. **Icônes** — lucide-react uniquement, via `<GameIcon>`. **Zéro emoji.**
6. **Mode sombre** — via `next-themes` (classe `.dark`), par inversion chaude `--background`/`--foreground`.
7. **Animations** — mouvement lent : entrées en `animate-slide-up` décalé (`animationDelay` en cascade) ;
   décor en `animate-float` ; célébrations discrètes en `animate-bounce-in` + `<Confetti>`. `prefers-reduced-motion` respecté.

Composants réutilisables : `.card` (arrondi + ombre douce, variante `.card-accent` filet terracotta),
`.btn-primary` (terracotta), `.btn-secondary` (fantôme bordé), `GameIcon`, `DecodeText`, `Confetti`, `ThemeToggle`.
Wrapper de page : `min-h-[calc(100vh-80px)] px-4 py-12` + conteneur `max-w-* mx-auto`.

En cas de doute, lancer l'agent `ui-ux-auditor` avant de committer une UI.
