# Comme des Fous — Boîte à outils (plateforme en libre accès)

Plateforme web **100 % front** (Next.js App Router) d'outils psychosociaux d'auto-observation
et de soutien au rétablissement. **Aucun backend, compte, ni base de données.**

## Règles produit (NON négociables)

1. **Accès libre, sans compte, sans espace privé.** Aucune authentification, aucun profil.
2. **Persistance de session uniquement.** L'état vit dans `sessionStorage` (clé `cdf-session`)
   via Zustand `persist`. Il survit au rafraîchissement et à la navigation, et est effacé à la
   fermeture de l'onglet. **Aucune donnée n'est jamais envoyée sur le réseau** (pas de `fetch`
   de saisies, pas d'analytics sur le contenu).
3. **Garde-fous éthiques toujours présents :** ces outils ne posent **aucun diagnostic** et ne
   remplacent pas un professionnel. Afficher `DisclaimerBanner` + `CrisisResources` (3114, 15,
   112, SOS Amitié pour la France). Ton **non culpabilisant**, liberté de non-réponse et d'arrêt.
4. **Export local** (PDF via impression / Markdown / JSON) = seul moyen de conserver une trace.

## Architecture

- **3 moteurs data-driven** dans `src/engines/` : `scored` (questionnaires), `wizard` (parcours),
  `worksheet` (carnets) + `composite` (hybrides). Aucun moteur ne connaît un outil précis.
- **Ajouter un outil = écrire `src/data/tools/<slug>/{definition.ts, content.ts}`** (typé), puis
  l'enregistrer dans `src/engines/registry.ts`. On ne réécrit jamais la logique d'un moteur.
- Route dynamique `app/outils/[slug]/page.tsx` → `ToolHost` aiguille vers le bon moteur.
- Export : chaque définition expose `serialize(state) → NeutralDocument` (pivot MD/JSON/PDF),
  voir `src/lib/export/`.
- Alias d'import : `@/*` → `./src/*`. L'`app/` est à la racine.

## Charte UI/UX (obligatoire) — « Comme des Fous »

Référence complète : `.claude/design-system/DESIGN_SYSTEM.md`. Les 7 lois :

1. **Tout est carré** — `* { border-radius:0 !important }` global ; aucun angle arrondi visible.
2. **Aucune ombre** — `box-shadow:none !important` ; pas de `shadow-*`.
3. **Palette verrouillée** — noir/blanc (inversibles selon le thème) + 3 accents fixes :
   jaune `#f5c400` (progression/secondaire), rouge `#d63a3a` (action/danger), bleu `#3a6ed6`
   (info/liens). Jamais de `#000`/`#fff` en dur pour du contenu thémé → `text-black`/`bg-white`/tokens.
   ⚠️ **Contraste** : le jaune ne sert **jamais** au texte (réservé fonds/progression/`.btn-secondary`) ;
   le corps de texte reste en `text-black`/`text-foreground`.
4. **Typo** — `Belanosima` titres (UPPERCASE, tracking-tight) ; `Open Sans` corps.
5. **Icônes** — lucide-react uniquement via `<GameIcon>`. **Zéro emoji.**
6. **Mode sombre** — via `next-themes` (classe `.dark`), inversion `--background`/`--foreground`.
7. **Animations** — entrées `animate-slide-up` décalées ; décor `animate-float` ;
   récompenses `animate-bounce-in` + `<Confetti>`.

Composants : `.card`, `.btn-primary` (rouge), `.btn-secondary` (jaune), `GameIcon`, `DecodeText`,
`Confetti`, `ThemeToggle`. Wrapper de page : `min-h-[calc(100vh-80px)] px-4 py-12` + `max-w-* mx-auto`.

## Accessibilité

Cible **WCAG 2.2 AA** : navigation clavier complète, `aria-live` pour scores/progression, focus
visible (outline bleu carré, jamais d'ombre), info jamais portée par la seule couleur.

## Commandes

- `npm run dev` — serveur de dev
- `npm run build` / `npm run lint` / `npm run typecheck`
- `npm test` — Vitest (scoring pur + utilitaires)
